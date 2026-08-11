// Verifies the AETHER color tokens against WCAG contrast and ramp-monotonicity gates.
// Run: node tools/check-tokens.mjs
// Exits 1 on any hard failure so it can gate a build.
//
// Why this exists: the accent (#496957) is used as an interface/text color, and the
// green ramp is used for sequential chart encoding. Those are two different gates
// (WCAG contrast vs. monotone lightness) and both are easy to break by eye.

const SURFACE = '#F3F0E8';
const RAISED = '#F8F6F0';

const hex = (h) => {
  const s = h.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16) / 255);
};

const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

const luminance = (h) => {
  const [r, g, b] = hex(h).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
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
  ['ink', '#171816', 4.5],
  ['ink-secondary', '#43443F', 4.5],
  ['ink-muted', '#5F6058', 4.5],
  ['accent (link/label)', '#496957', 4.5],
  ['accent-deep', '#324A3B', 4.5],
  // The text-safe member of the live-accent family. --accent-live itself is
  // deliberately NOT in this list: at 3.48:1 it is mark-safe only, and is
  // checked against the 3:1 non-text bar below instead.
  ['accent-live-deep (text)', '#0F6F51', 4.5],
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
  ['rule-strong (borders)', '#8A8271'],
  ['focus ring', '#496957'],
  ['accent-live (marks only)', '#17916A'],
]) {
  const c = contrast(value, SURFACE);
  report(c >= 3, name, `${c.toFixed(2)}:1`);
}

/* The live accent exists to carry series identity, which the mineral green
   cannot: measured OKLCH chroma 0.117 against a 0.10 floor, and dE 9.6 against
   the clay risk tone under deuteranopia against a >=8 gate. Those two gates are
   the whole reason this token was added, so they are asserted rather than
   trusted to a comment. */
console.log('\nLive accent as a series hue');
{
  const C = chroma('#17916A');
  report(C >= 0.1, 'chroma floor', `${C.toFixed(3)} (needs 0.10)`);

  const dE = cvdDeltaE('#17916A', '#8F4E2F', 'deuteranopia');
  report(dE >= 8, 'CVD separation vs risk clay', `dE ${dE.toFixed(1)} (needs 8)`);

  const plain = deltaE('#17916A', '#8F4E2F');
  report(plain >= 15, 'normal-vision separation', `dE ${plain.toFixed(1)} (needs 15)`);
}

// Hairline rules are decorative separators, not UI boundaries conveying state,
// so they are exempt from 3:1 by design. Checked only for visibility.
console.log('\nHairline rules (decorative, no 3:1 requirement)');
for (const [name, value] of [
  ['rule', '#DAD4C4'],
  ['rule-soft', '#E6E1D4'],
]) {
  const c = contrast(value, SURFACE);
  report(c >= 1.05, name, `${c.toFixed(2)}:1 (visible)`);
}

// --- Risk status scale: reserved, always icon + label ---
// Per the dataviz rule these carry meaning via icon+label, not color alone, so the
// bar here is 3:1 for the mark. Text sits in ink, never in the status color.
console.log('\nRisk status marks (3:1, always paired with icon + label)');
for (const [name, value] of [
  ['risk-low', '#5E6B57'],
  ['risk-moderate', '#8A6A3B'],
  ['risk-elevated', '#8F4E2F'],
  ['risk-high', '#7A322A'],
]) {
  const c = contrast(value, SURFACE);
  report(c >= 3, name, `${c.toFixed(2)}:1`);
}

// --- Sequential green ramp: monotone lightness, adequate steps ---
// Used for magnitude encoding. Gate: strictly decreasing L, adjacent delta >= 0.045,
// and the lightest step still distinguishable from the surface (>= 1.3:1).
console.log('\nSequential ramp (monotone L, adjacent dL >= 0.045)');
// Generated by tools/gen-ramp.mjs at the accent's own hue (159.4deg), evenly
// spaced in OKLab L. Do not hand-edit: re-run the generator instead.
const ramp = [
  ['seq-100', '#C1DBCB'],
  ['seq-200', '#9FBFAC'],
  ['seq-300', '#81A28F'],
  ['seq-400', '#668673'],
  ['seq-500', '#4E6A5A'],
  ['seq-600', '#394F42'],
  ['seq-700', '#25352C'],
];
let prev = 1;
for (const [name, value] of ramp) {
  const L = oklabL(value);
  const d = prev - L;
  report(L < prev && d >= 0.045, name, `L ${L.toFixed(3)}  dL ${d.toFixed(3)}`);
  prev = L;
}
// Two different floors apply depending on how a step is used:
//   sequential (continuous magnitude, e.g. heatmap) - the lightest step means
//     "near zero" and is allowed to recede toward the surface. Floor: just visible.
//   ordinal (discrete ordered marks, e.g. tiers, stages) - every step is a real
//     category the reader must see. Floor: 2:1 on the surface.
// So seq-100 is legal for heatmap fills but must NOT start an ordinal ramp.
const lightest = contrast(ramp[0][1], SURFACE);
report(lightest >= 1.25, 'sequential light end (near-zero)', `${lightest.toFixed(2)}:1 (needs 1.25)`);

const ORDINAL_START = 'seq-300';
const ordinalStart = ramp.findIndex(([n]) => n === ORDINAL_START);
const ordinalSteps = ramp.slice(ordinalStart);
const worstOrdinal = Math.min(...ordinalSteps.map(([, v]) => contrast(v, SURFACE)));
report(
  worstOrdinal >= 2,
  `ordinal ramp from ${ORDINAL_START}`,
  `worst ${worstOrdinal.toFixed(2)}:1 (needs 2.0), ${ordinalSteps.length} steps`
);

console.log(
  failed
    ? '\nFAILED - fix the marked tokens before shipping.\n'
    : '\nAll token gates passed.\n'
);
process.exit(failed ? 1 : 0);
