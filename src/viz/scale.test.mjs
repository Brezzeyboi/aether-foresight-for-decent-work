/* Self-check for the chart primitives. No test framework by design.
   Run: node src/viz/scale.test.mjs
   Fails loudly if the scale/tick/path logic breaks. */

import assert from 'node:assert/strict';

// Node 24 strips TypeScript types natively, so the real source is imported
// directly with no build step.
import {
  linearScale,
  bandScale,
  niceTicks,
  niceDomain,
  barPath,
  linePath,
  areaPath,
  polar,
  seqColor,
  formatCompact,
} from './scale.ts';

let checks = 0;
const check = (label, fn) => {
  fn();
  checks++;
  console.log(`  ok  ${label}`);
};

console.log('\nviz/scale primitives');

check('linearScale maps domain to range', () => {
  const s = linearScale([0, 100], [0, 200]);
  assert.equal(s(0), 0);
  assert.equal(s(50), 100);
  assert.equal(s(100), 200);
});

check('linearScale handles inverted range (SVG y-axis)', () => {
  // The common case: value 0 sits at the BOTTOM of the plot, not the top.
  const y = linearScale([0, 100], [300, 0]);
  assert.equal(y(0), 300);
  assert.equal(y(100), 0);
  assert.equal(y(50), 150);
});

check('linearScale.invert round-trips', () => {
  const s = linearScale([10, 50], [0, 400]);
  assert.equal(s.invert(s(37)), 37);
});

check('zero-width domain does not produce NaN', () => {
  // A single-value dataset must render at the baseline, not vanish.
  const s = linearScale([5, 5], [0, 100]);
  assert.equal(s(5), 0);
  assert.ok(Number.isFinite(s(5)));
});

check('bandScale centres bands and fills the range', () => {
  const b = bandScale(4, [0, 400]);
  assert.equal(b.step, 100);
  assert.ok(b.bandwidth < b.step, 'bandwidth must leave a gap');
  assert.ok(b(0) > 0, 'first band offset from range start');
  assert.ok(b(3) + b.bandwidth <= 400.001, 'last band inside range');
});

check('bandScale with zero categories does not divide by zero', () => {
  const b = bandScale(0, [0, 100]);
  assert.ok(Number.isFinite(b.bandwidth));
});

check('niceTicks produces human-readable intervals', () => {
  assert.deepEqual(niceTicks(0, 100, 5), [0, 20, 40, 60, 80, 100]);
  assert.deepEqual(niceTicks(0, 10, 5), [0, 2, 4, 6, 8, 10]);
});

check('niceTicks includes the top tick despite float drift', () => {
  // 0.1 steps are the classic case where accumulated error drops the last tick.
  const ticks = niceTicks(0, 0.5, 5);
  assert.ok(Math.abs(ticks[ticks.length - 1] - 0.5) < 1e-9, `got ${ticks}`);
});

check('niceTicks handles a flat domain', () => {
  assert.deepEqual(niceTicks(7, 7), [7]);
});

check('niceDomain includes zero for bar charts', () => {
  // Bars must be measured from zero or their lengths lie.
  const [min] = niceDomain([40, 55, 70]);
  assert.equal(min, 0);
});

check('niceDomain covers the maximum value', () => {
  const [, max] = niceDomain([40, 55, 73]);
  assert.ok(max >= 73, `domain top ${max} must cover 73`);
});

check('niceDomain survives an empty series', () => {
  assert.deepEqual(niceDomain([]), [0, 1]);
});

check('barPath rounds the data end and squares the baseline', () => {
  const up = barPath(10, 20, 40, 100, 4, 'up');
  // Baseline (y=120) present, and a curve exists for the top corners.
  assert.ok(up.includes('120'), 'baseline edge present');
  assert.ok(up.includes('Q'), 'rounded data end present');
  assert.ok(up.trim().endsWith('Z'), 'path closed');
});

check('barPath radius never exceeds the bar', () => {
  // A 2px-tall bar with an 8px radius must not invert into a bowtie.
  const tiny = barPath(0, 0, 30, 2, 8, 'up');
  assert.ok(!tiny.includes('NaN'));
  assert.ok(tiny.trim().endsWith('Z'));
});

check('barPath zero height stays valid', () => {
  const flat = barPath(0, 100, 30, 0, 4, 'up');
  assert.ok(!flat.includes('NaN'), flat);
});

check('barPath horizontal orientation rounds the right edge', () => {
  const right = barPath(0, 0, 120, 24, 4, 'right');
  assert.ok(right.includes('Q'));
  assert.ok(!right.includes('NaN'));
});

check('linePath and areaPath build valid geometry', () => {
  const pts = [
    [0, 100],
    [50, 60],
    [100, 20],
  ];
  assert.ok(linePath(pts).startsWith('M0.00,100.00'));
  const area = areaPath(pts, 120);
  assert.ok(area.trim().endsWith('Z'), 'area must close');
  assert.ok(area.includes('120.00'), 'area must close to the baseline');
});

check('empty series produce empty paths, not "MNaN"', () => {
  assert.equal(linePath([]), '');
  assert.equal(areaPath([], 100), '');
});

check('polar places index 0 at twelve o clock', () => {
  const [x, y] = polar(100, 100, 50, 0, 6);
  assert.ok(Math.abs(x - 100) < 1e-9, `x ${x}`);
  assert.ok(Math.abs(y - 50) < 1e-9, `y ${y}`);
});

check('seqColor ordinal mode never uses the palest steps', () => {
  // Ordinal categories must all clear 2:1 contrast, so seq-100/200 are excluded.
  for (const t of [0, 0.2, 0.5, 1]) {
    const c = seqColor(t, 'ordinal');
    assert.ok(c !== 'var(--seq-100)' && c !== 'var(--seq-200)', `${t} -> ${c}`);
  }
});

check('seqColor clamps out-of-range and non-finite input', () => {
  assert.equal(seqColor(-5), 'var(--seq-100)');
  assert.equal(seqColor(9), 'var(--seq-700)');
  assert.ok(seqColor(NaN).startsWith('var(--seq-'));
});

check('seqColor is monotone across the ramp', () => {
  const seen = [0, 0.25, 0.5, 0.75, 1].map((t) => SEQ_INDEX(seqColor(t)));
  for (let i = 1; i < seen.length; i++) {
    assert.ok(seen[i] >= seen[i - 1], `not monotone: ${seen}`);
  }
});
function SEQ_INDEX(varName) {
  return Number(varName.match(/seq-(\d+)/)[1]);
}

check('formatCompact abbreviates without lying', () => {
  assert.equal(formatCompact(950), '950');
  assert.equal(formatCompact(1200), '1.2k');
  assert.equal(formatCompact(15000), '15k');
  assert.equal(formatCompact(2_400_000), '2.4m');
});

console.log(`\n${checks} checks passed.\n`);
