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

const ACCENT = '#496957';
const { h: HUE, C: ACCENT_C } = hexToOklch(ACCENT);

// 7 steps, evenly spaced in L. Light end sits just off the ivory surface so a
// near-zero heatmap cell reads as "almost nothing" without vanishing; dark end
// stays short of black so text can still sit on it.
const STEPS = 7;
const L_LIGHT = 0.868;
const L_DARK = 0.312;

// Chroma tapers toward both ends (pale tints and deep shades both hold less
// chroma naturally); peak sits near the accent's own step.
const chromaAt = (t) => ACCENT_C * (0.55 + 0.45 * Math.sin(Math.PI * (0.15 + 0.85 * t)));

const out = [];
for (let i = 0; i < STEPS; i++) {
  const t = i / (STEPS - 1);
  const L = L_LIGHT + (L_DARK - L_LIGHT) * t;
  out.push([`seq-${(i + 1) * 100}`, oklchToHex(L, chromaAt(t), HUE), L]);
}

console.log(`accent ${ACCENT}  hue ${((HUE * 180) / Math.PI).toFixed(1)}deg  C ${ACCENT_C.toFixed(4)}\n`);
let prev = null;
for (const [name, hex, L] of out) {
  const d = prev === null ? '' : `dL ${(prev - L).toFixed(3)}`;
  console.log(`  ${name.padEnd(9)} ${hex}   L ${L.toFixed(3)}   ${d}`);
  prev = L;
}
console.log('\nCSS:');
for (const [name, hex] of out) console.log(`  --${name}: ${hex};`);
console.log('\nJS array:');
console.log(out.map(([n, hex]) => `  ['${n}', '${hex}'],`).join('\n'));
