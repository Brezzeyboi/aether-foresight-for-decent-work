// Generates the sequential green ramp at evenly-spaced OKLab lightness values,
// holding the accent's hue. Run once to derive tokens; output is pasted into
// tokens.css and check-tokens.mjs. Kept in the repo so the ramp is reproducible
// rather than hand-picked.
//
//   node tools/gen-ramp.mjs

const srgbToLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const linearToSrgb = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

function hexToOklch(h) {
  const s = h.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => srgbToLinear(parseInt(s.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const q = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * q;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * q;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * q;
  return { L, C: Math.hypot(A, B), h: Math.atan2(B, A) };
}

function oklchToHex(L, C, h) {
  const A = C * Math.cos(h);
  const B = C * Math.sin(h);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const q = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  const rgb = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * q,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * q,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * q,
  ].map((v) => Math.round(Math.min(1, Math.max(0, linearToSrgb(v))) * 255));
  return '#' + rgb.map((v) => v.toString(16).padStart(2, '0').toUpperCase()).join('');
}

/* Two grounds, two directions. On paper the near-zero step is the PALEST and
   magnitude grows by darkening; on the dark theme that inverts, because on an
   ink-black ground the thing that recedes is the dark step and magnitude grows
   by brightening. seq-100 always means "near zero" either way.

     node tools/gen-ramp.mjs          light ground (print)
     node tools/gen-ramp.mjs --dark   dark ground (screen, the shipped theme) */
const DARK = process.argv.includes('--dark');

const ACCENT = DARK ? '#34D399' : '#496957';
const { h: HUE, C: ACCENT_C } = hexToOklch(ACCENT);

// 7 steps, evenly spaced in L. The near-zero end sits just off the ground so a
// near-zero cell reads as "almost nothing" without vanishing; the peak end
// stays short of the extreme so text can still sit on it.
const STEPS = 7;
const L_START = DARK ? 0.28 : 0.868; // seq-100, near zero
const L_END = DARK ? 0.87 : 0.312; // seq-700, peak magnitude

/* Chroma. On paper it tapers at both ends, because pale tints and deep shades
   both hold less chroma naturally and the peak sits near the accent's own step.
   On dark it rises monotonically instead: the sRGB green gamut runs out at
   mid-lightness, so a mid-ramp chroma peak clips to the gamut wall and three
   adjacent steps collapse onto the same colour. Rising chroma keeps every step
   inside the gamut, and it stacks with lightness so magnitude reads twice. */
const chromaAt = (t) =>
  DARK ? ACCENT_C * (0.3 + 0.7 * t) : ACCENT_C * (0.55 + 0.45 * Math.sin(Math.PI * (0.15 + 0.85 * t)));

// A step outside sRGB would silently clip and flatten the ramp, so it is an error.
const inGamut = (L, C, h) => {
  const A = C * Math.cos(h);
  const B = C * Math.sin(h);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const q = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * q,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * q,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * q,
  ]
    .map(linearToSrgb)
    .every((v) => v >= -0.002 && v <= 1.002);
};

const out = [];
let clipped = 0;
for (let i = 0; i < STEPS; i++) {
  const t = i / (STEPS - 1);
  const L = L_START + (L_END - L_START) * t;
  const C = chromaAt(t);
  if (!inGamut(L, C, HUE)) clipped++;
  out.push([`seq-${(i + 1) * 100}`, oklchToHex(L, C, HUE), L, inGamut(L, C, HUE)]);
}

console.log(
  `${DARK ? 'DARK ground' : 'LIGHT ground'}  accent ${ACCENT}  ` +
    `hue ${((HUE * 180) / Math.PI).toFixed(1)}deg  C ${ACCENT_C.toFixed(4)}\n`
);
let prev = null;
for (const [name, hex, L, ok] of out) {
  const d = prev === null ? '' : `dL ${Math.abs(prev - L).toFixed(3)}`;
  console.log(`  ${name.padEnd(9)} ${hex}   L ${L.toFixed(3)}   ${d.padEnd(10)}${ok ? '' : 'CLIPPED'}`);
  prev = L;
}
console.log('\nCSS:');
for (const [name, hex] of out) console.log(`  --${name}: ${hex};`);
console.log('\nJS array:');
console.log(out.map(([n, hex]) => `  ['${n}', '${hex}'],`).join('\n'));

if (clipped) {
  console.error(`\n${clipped} step(s) fall outside sRGB and would clip. Lower the chroma curve.`);
  process.exit(1);
}
