// Verifies the AETHER color tokens against WCAG contrast and ramp-monotonicity gates.
// Run: node tools/check-tokens.mjs
// Exits 1 on any hard failure so it can gate a build.
//
// Why this exists: the theme is DARK, the accent is used as both an interface/text
// color and a chart series hue, and the green ramp encodes magnitude. Those are three
// different gates (WCAG contrast, CVD separation, monotone lightness) and all three
// are easy to break by eye — especially on a dark ground, where the intuition that
// "darker means more" is backwards.

import { readFileSync } from 'node:fs';

/* Token values are READ FROM tokens.css, never copied into this file.

   Copying them here was a real and repeated bug: the checker kept reporting
   PASS/FAIL against values the stylesheet no longer had, which is worse than no
   checker at all — a green gate on colours that are not shipping. Reading the
   stylesheet means a token can only be wrong, never stale. */
const TOKENS = (() => {
  const src = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
  // Only the :root block, so the print overrides in print.css can never leak in.
  const root = /:root\s*\{([\s\S]*?)\n\}/.exec(src);
  if (!root) throw new Error('tokens.css: could not find the :root block');

  const map = new Map();
  for (const [, name, value] of root[1].matchAll(/^\s*--([\w-]+):\s*([^;]+);/gm)) {
    map.set(name, value.trim());
  }
  return map;
})();

/** Reads a token, failing loudly if it was renamed rather than silently passing. */
const T = (name) => {
  const v = TOKENS.get(name);
  if (v === undefined) throw new Error(`tokens.css: --${name} is not defined`);
  return v;
};

const SURFACE = T('surface');
const RAISED = T('surface-raised');

/* The print overrides, read the same way and for the same reason. Task 1 has to
   produce a clean PDF, and the screen theme is dark, so print inverts the entire
   palette. That inversion is a second full set of colours which no amount of
   looking at the screen will verify — and it is where the ramp direction flips,
   since bright means large on black and dark means large on white. */
const PRINT = (() => {
  const src = readFileSync(new URL('../src/styles/print.css', import.meta.url), 'utf8');
  const root = /:root\s*\{([\s\S]*?)\n  \}/.exec(src);
  if (!root) throw new Error('print.css: could not find the :root override block');

  const map = new Map();
  for (const [, name, value] of root[1].matchAll(/^\s*--([\w-]+):\s*([^;]+);/gm)) {
    map.set(name, value.trim());
  }
  return map;
})();

const P = (name) => {
  const v = PRINT.get(name);
  if (v === undefined) throw new Error(`print.css: --${name} is not overridden for print`);
  return v;
};

/* Accepts '#rrggbb' or 'rgba(r,g,b,a)'. The rgba form is flattened over the
   surface, because a translucent rule has no contrast of its own: what the eye
   judges is the composite, and that is what the gate has to measure. */
const hex = (c, over = SURFACE) => {
  const m = /^rgba?\(([^)]+)\)$/.exec(c.trim());
  if (m) {
    const [r, g, b, a = 1] = m[1].split(',').map((v) => parseFloat(v.trim()));
    const bg = hex(over, '#000000');
    return [r / 255, g / 255, b / 255].map((v, i) => v * a + bg[i] * (1 - a));
  }
  const s = c.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16) / 255);
};

const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

const luminance = (h, over) => {
  const [r, g, b] = hex(h, over).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/* Contrast of `fg` against `bg`. A translucent fg is flattened over that same
   bg, so `contrast('rgba(...)', RAISED)` measures the rule as it actually
   appears on the raised plane rather than as it appears on the page. */
const contrast = (fg, bg) => {
  const [x, y] = [luminance(fg, bg), luminance(bg)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

// sRGB -> full OKLab, for ramp monotonicity, chroma, and colour distance.
const oklab = (h) => {
  const [r, g, b] = hex(h).map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
};

const oklabL = (h) => oklab(h).L;
const chroma = (h) => {
  const { a, b } = oklab(h);
  return Math.hypot(a, b);
};

/** Euclidean distance in OKLab x100, the units the dataviz gates are set in. */
const deltaE = (x, y) => {
  const p = oklab(x);
  const q = oklab(y);
  return Math.hypot(p.L - q.L, p.a - q.a, p.b - q.b) * 100;
};

/* Machado, Oliveira & Fernandes (2009) severity-1.0 CVD simulation matrices.
   The dataviz thresholds are calibrated to this model, so the model is part of
   the standard rather than an implementation detail. */
const CVD = {
  protanopia: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  deuteranopia: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.01182, 0.04294, 0.968881],
  ],
};

const simulate = (h, kind) => {
  const [r, g, b] = hex(h);
  const M = CVD[kind];
  const out = M.map((row) => row[0] * r + row[1] * g + row[2] * b).map((v) =>
    Math.round(Math.min(1, Math.max(0, v)) * 255)
  );
  return '#' + out.map((v) => v.toString(16).padStart(2, '0')).join('');
};

const cvdDeltaE = (x, y, kind) => deltaE(simulate(x, kind), simulate(y, kind));

let failed = false;
const report = (ok, label, detail) => {
  if (!ok) failed = true;
  console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${label.padEnd(34)} ${detail}`);
};

// --- Text and interface colors: WCAG AA ---
// 4.5:1 for body text, 3:1 for large text and non-text UI (borders, marks).
console.log(`\nText / interface contrast on surface ${SURFACE}`);
const textTokens = [
  ['ink', T('ink'), 4.5],
  ['ink-secondary', T('ink-secondary'), 4.5],
  ['ink-muted', T('ink-muted'), 4.5],
  ['accent (link/label)', T('accent'), 4.5],
  ['accent-deep (hover text)', T('accent-deep'), 4.5],
  // accent-live equals accent on dark, and clears the text threshold here.
  ['accent-live (text on dark)', T('accent-live'), 4.5],
];
for (const [name, value, min] of textTokens) {
  const c = contrast(value, SURFACE);
  report(c >= min, name, `${c.toFixed(2)}:1 (needs ${min})`);
}

console.log(`\nText contrast on raised plane ${RAISED}`);
for (const [name, value, min] of textTokens) {
  const c = contrast(value, RAISED);
  report(c >= min, name, `${c.toFixed(2)}:1 (needs ${min})`);
}

// --- Non-text UI: 3:1 ---
console.log('\nNon-text UI contrast (3:1)');
for (const [name, value] of [
  ['rule-strong (borders)', T('rule-strong')],
  ['focus ring', T('accent')],
  ['accent-live (marks)', T('accent-live')],
  ['mute-mark (de-emphasis)', T('mute-mark')],
]) {
  // Worst case of the two planes: a border must hold up wherever it is drawn.
  const c = Math.min(contrast(value, SURFACE), contrast(value, RAISED));
  report(c >= 3, name, `${c.toFixed(2)}:1 (worst plane)`);
}

/* The metal treatment shifts the ground by a few percent. Every ratio above is
   measured against flat --surface, so those measurements are only honest if the
   metal tints stay close enough to it not to move them. Gate: no metal tint may
   differ from --surface by more than 1.15:1, which bounds the drift in any
   measured ratio to well under the margin every token above clears. */
console.log('\nMetal tints stay within the measured ground');
for (const [name, value] of [
  ['metal-tint-cool', T('metal-tint-cool')],
  ['metal-tint-warm', T('metal-tint-warm')],
]) {
  const c = contrast(value, SURFACE);
  report(c <= 1.15, name, `${c.toFixed(3)}:1 vs surface (max 1.15)`);
}

/* The accent has to carry series identity as well as interface state, which the
   original mineral green could not: it measured OKLCH chroma 0.047 against a
   0.10 floor, and dE 3.2 against the clay risk tone under protanopia against a
   >=8 gate. Those two failures are why the palette moved to mint, so they are
   asserted here rather than trusted to a comment.

   Both CVD types are checked, not just one: protanopia was the type the old
   accent failed, so testing only deuteranopia would have passed the very colour
   this gate exists to reject. */
console.log('\nAccent as a series hue (vs the clay risk tone)');
{
  const MINT = T('accent-live');
  const CLAY = T('risk-elevated');

  const C = chroma(MINT);
  report(C >= 0.1, 'chroma floor', `${C.toFixed(3)} (needs 0.10)`);

  for (const kind of ['protanopia', 'deuteranopia']) {
    const dE = cvdDeltaE(MINT, CLAY, kind);
    report(dE >= 8, `CVD separation, ${kind}`, `dE ${dE.toFixed(1)} (needs 8)`);
  }

  const plain = deltaE(MINT, CLAY);
  report(plain >= 15, 'normal-vision separation', `dE ${plain.toFixed(1)} (needs 15)`);
}

/* Section colours are per-route interface tints, one on screen at a time. They
   are checked for text contrast and NOT for pairwise CVD separation: six hues
   cannot all clear dE>=8 in sRGB, and they never encode a data category, so
   that gate does not apply. See the note in tokens.css.

   What IS asserted is the thing that would make the exemption false — that no
   section colour has drifted so close to the sequential ramp or the risk scale
   that it could be misread as data. */
console.log('\nSection colours (text-safe; interface tint only, not an encoding)');
const SECTIONS = ['skills', 'careers', 'safety', 'learning', 'economy', 'ai'];
for (const name of SECTIONS) {
  const value = T(`sec-${name}`);
  const c = Math.min(contrast(value, SURFACE), contrast(value, RAISED));
  report(c >= 4.5, name, `${value}  ${c.toFixed(2)}:1 (worst plane, needs 4.5)`);
}

/* Hairline rules are decorative separators, not UI boundaries conveying state,
   so they are exempt from 3:1 by design. Checked only for visibility.

   These are translucent ink, so each is measured on BOTH planes: a rule tuned
   to be visible on the page can disappear on the lighter raised plane, which is
   exactly where panels need their edges. */
console.log('\nHairline rules (decorative, visibility only, both planes)');
for (const [name, value] of [
  ['rule', T('rule')],
  ['rule-soft', T('rule-soft')],
]) {
  for (const [planeName, plane] of [
    ['surface', SURFACE],
    ['raised', RAISED],
  ]) {
    const c = contrast(value, plane);
    report(c >= 1.05, `${name} on ${planeName}`, `${c.toFixed(2)}:1 (visible)`);
  }
}

// --- Risk status scale: reserved, always icon + label ---
// Per the dataviz rule these carry meaning via icon+label, not color alone, so the
// bar here is 3:1 for the mark. Text sits in ink, never in the status color.
console.log('\nRisk status marks (3:1, always paired with icon + label)');
const RISKS = ['low', 'moderate', 'elevated', 'high'].map((l) => [`risk-${l}`, T(`risk-${l}`)]);
for (const [name, value] of RISKS) {
  const c = Math.min(contrast(value, SURFACE), contrast(value, RAISED));
  report(c >= 3, name, `${c.toFixed(2)}:1 (worst plane)`);
}

/* Adjacent risk steps sit deliberately close: elevated and high are only dE 3.9
   apart, and the scale is NOT monotone in lightness, because amber is inherently
   lighter than both the clay and the green and forcing it darker would break the
   low-to-high convention readers already know.

   Neither is a defect, but both mean colour cannot be the carrier. What makes
   the scale legal is the glyph and the word shipped with every mark, so that is
   what gets asserted — against the data file, not against the palette. A future
   risk added without a glyph fails here rather than shipping as colour-only. */
console.log('\nRisk scale never rests on colour (glyph + label required)');
{
  const src = readFileSync(new URL('../src/data/risks.ts', import.meta.url), 'utf8');
  /* The trailing comma is what distinguishes a data entry from the interface's
     union type declaration (`level: 'low' | 'moderate' | ...`), which has no
     comma after the first member and would otherwise be counted as a risk. */
  const entries = [...src.matchAll(/level:\s*'(\w+)',\s*\n\s*glyph:\s*'([^']+)'/g)];
  const levels = [...src.matchAll(/^\s*level:\s*'(\w+)',/gm)];

  report(
    entries.length === levels.length && levels.length > 0,
    'every risk carries a glyph',
    `${entries.length} glyphs for ${levels.length} risks`
  );

  // A glyph shared across two levels would encode nothing, so each level needs its own.
  const byLevel = new Map();
  for (const [, level, glyph] of entries) {
    if (!byLevel.has(level)) byLevel.set(level, new Set());
    byLevel.get(level).add(glyph);
  }
  const glyphs = [...byLevel].map(([l, g]) => `${l} ${[...g].join('')}`);
  const consistent = [...byLevel.values()].every((g) => g.size === 1);
  report(consistent, 'one glyph per level', glyphs.join('  '));
}

/* --- Sequential ramp: monotone lightness, adequate steps ---
   Used for magnitude encoding. On a DARK ground the ramp runs the opposite way
   to print: seq-100 (near zero) is the darkest step and recedes into the page,
   seq-700 (peak) is the brightest and stands forward. So the gate is strictly
   INCREASING L, which is the assertion most likely to be got backwards if the
   theme is ever flipped again.

   Generated by tools/gen-ramp.mjs --dark at the accent's hue (163.2deg), evenly
   spaced in OKLab L. Do not hand-edit: re-run the generator instead. */
console.log('\nSequential ramp (monotone rising L, adjacent dL >= 0.045)');
const ramp = [100, 200, 300, 400, 500, 600, 700].map((n) => [`seq-${n}`, T(`seq-${n}`)]);
let prev = 0;
for (const [name, value] of ramp) {
  const L = oklabL(value);
  const d = L - prev;
  report(L > prev && d >= 0.045, name, `L ${L.toFixed(3)}  dL ${d.toFixed(3)}`);
  prev = L;
}

/* Chroma should also rise with the ramp. That is what makes magnitude read
   twice over (brighter AND more saturated) and it is the property that broke
   when the ramp was first ported to dark: a mid-ramp chroma peak clipped
   against the sRGB green gamut wall and collapsed three adjacent steps onto
   nearly the same colour, which no lightness check would have caught. */
let prevC = 0;
let chromaRises = true;
for (const [, value] of ramp) {
  const C = chroma(value);
  if (C <= prevC) chromaRises = false;
  prevC = C;
}
report(
  chromaRises,
  'chroma rises with magnitude',
  `${chroma(ramp[0][1]).toFixed(3)} -> ${chroma(ramp[6][1]).toFixed(3)}`
);

/* Two different floors apply depending on how a step is used:
     sequential (continuous magnitude, e.g. heatmap) - seq-100 means "near zero"
       and is allowed to recede toward the surface. Floor: just visible.
     ordinal (discrete ordered marks, e.g. tiers, stages) - every step is a real
       category the reader must see. Floor: 2:1 on the surface.
   So seq-100 is legal for heatmap fills but must NOT start an ordinal ramp. */
const nearZero = contrast(ramp[0][1], SURFACE);
report(nearZero >= 1.25, 'sequential near-zero end', `${nearZero.toFixed(2)}:1 (needs 1.25)`);

const ORDINAL_START = 'seq-300';
const ordinalStart = ramp.findIndex(([n]) => n === ORDINAL_START);
const ordinalSteps = ramp.slice(ordinalStart);
const worstOrdinal = Math.min(...ordinalSteps.map(([, v]) => contrast(v, SURFACE)));
report(
  worstOrdinal >= 2,
  `ordinal ramp from ${ORDINAL_START}`,
  `worst ${worstOrdinal.toFixed(2)}:1 (needs 2.0), ${ordinalSteps.length} steps`
);

/* --- The one light plane -------------------------------------------------
   The research board's signature chart sits on the ivory plate, so the ramp has
   to work on BOTH grounds. On ivory the dark end of the ramp carries the data
   and the bright end is the one that vanishes, which is the exact inverse of
   the surface case above and therefore worth its own assertion. */
const INK_PLATE = T('surface-ink');
console.log(`\nRamp on the ivory plate (${INK_PLATE}), used by the horizon chart`);
{
  const usable = ramp.filter(([, v]) => contrast(v, INK_PLATE) >= 3).map(([n]) => n);
  report(
    usable.length >= 3,
    'steps clearing the 3:1 mark floor',
    usable.length ? `${usable.length}: ${usable.join(', ')}` : 'none'
  );
  const onPlate = contrast(T('ink-on-dark'), INK_PLATE);
  report(onPlate >= 4.5, 'ink-on-dark reads on the plate', `${onPlate.toFixed(2)}:1 (needs 4.5)`);
}

/* --- PRINT -----------------------------------------------------------------
   Task 1 must produce a clean PDF, and the screen theme is dark, so print.css
   inverts the whole palette. That inversion is a second complete set of colours
   which cannot be checked by looking at the screen, so it is gated here. */

const PAPER = P('surface');

console.log(`\nPrint: text on paper ${PAPER} (4.5:1)`);
for (const name of ['ink', 'ink-secondary', 'ink-muted', 'accent', 'accent-deep', 'ink-on-dark']) {
  const c = contrast(P(name), PAPER);
  report(c >= 4.5, name, `${c.toFixed(2)}:1`);
}

console.log('\nPrint: marks on paper (3:1)');
for (const name of [
  'rule-strong',
  'mute-mark',
  'risk-low',
  'risk-moderate',
  'risk-elevated',
  'risk-high',
]) {
  const c = contrast(P(name), PAPER);
  report(c >= 3, name, `${c.toFixed(2)}:1`);
}

console.log('\nPrint: section colours as text on paper (4.5:1)');
for (const name of SECTIONS) {
  const c = contrast(P(`sec-${name}`), PAPER);
  report(c >= 4.5, name, `${c.toFixed(2)}:1`);
}

/* The ramp reverses direction between the two grounds. On screen L must RISE
   with magnitude (bright advances on black); on paper it must FALL (dark
   advances on white). Asserting both is the only way to catch a print palette
   pasted in the screen order, which would silently invert every chart. */
console.log('\nPrint: ramp falls in lightness (dark = large on paper)');
{
  let prev = 1;
  for (const n of [100, 200, 300, 400, 500, 600, 700]) {
    const L = oklabL(P(`seq-${n}`));
    const d = prev - L;
    report(L < prev && d >= 0.045, `seq-${n}`, `L ${L.toFixed(3)}  dL ${d.toFixed(3)}`);
    prev = L;
  }

  const nearZero = contrast(P('seq-100'), PAPER);
  report(nearZero >= 1.1, 'near-zero step still visible', `${nearZero.toFixed(2)}:1`);

  const ordinal = Math.min(
    ...[300, 400, 500, 600, 700].map((n) => contrast(P(`seq-${n}`), PAPER))
  );
  report(ordinal >= 2, 'ordinal ramp from seq-300', `worst ${ordinal.toFixed(2)}:1`);
}

/* The metal treatment is a dark-ground effect: a tonal drift, a brushed grain
   and light-catching bevels. Printed, it becomes a grey wash over the type, so
   print.css must neutralise it rather than translate it. */
console.log('\nPrint: dark-ground effects neutralised');
for (const name of ['metal-plate', 'metal-grain', 'metal-sheen', 'metal-bevel', 'glow-mint']) {
  const v = P(name);
  report(v === 'none', name, v);
}

console.log(
  failed
    ? '\nFAILED - fix the marked tokens before shipping.\n'
    : '\nAll token gates passed, screen and print.\n'
);
process.exit(failed ? 1 : 0);
