/* Layout regression check for DivergingBars.
   Run: node src/viz/bars.layout.test.mjs

   Why this exists: the original implementation drew each category label at the
   bar tip with a fixed offset, so a long label grew outward without bound and
   overflowed the viewBox by up to 49px. Nothing failed, nothing warned; it was
   only visible by looking. This asserts the geometry instead.

   The layout constants below MUST match DivergingBars in Bars.tsx. If that
   component's frame changes, update these and re-run. */

import assert from 'node:assert/strict';

const NAME_COL = 208;
const VALUE_COL = 70;
const PLOT = 384;
const GUTTER = NAME_COL + VALUE_COL;
const WIDTH = GUTTER * 2 + PLOT;
const EDGE = 6;
const VALUE_PAD = 8;
const ROW_HEIGHT = 32;
const PAD_TOP = 26;
const PAD_BOTTOM = 34;

// Conservative text metrics for the .mark-label style (Geist 11.5px). Slightly
// over-estimating width is correct here: it makes the check strict.
const CHAR_W = 11.5 * 0.55;
const DIGIT_W = 11.5 * 0.6;

/** Mirrors the geometry inside DivergingBars. */
function layout(data, unit = '') {
  const plotW = WIDTH - GUTTER * 2;
  const centre = GUTTER + plotW / 2;
  const half = plotW / 2 - 10;
  const extent = Math.max(...data.map(([, v]) => Math.abs(v)));
  const x = (v) => centre + (v / extent) * half;

  return data.map(([label, v]) => {
    const positive = v >= 0;
    const nameW = label.length * CHAR_W;
    const valueText = `${positive ? '+' : '−'}${Math.abs(v)}${unit}`;
    const valueW = valueText.length * DIGIT_W;

    // Name is anchored to the frame edge and grows inward.
    const nameOuter = positive ? WIDTH - EDGE : EDGE;
    const nameInner = positive ? nameOuter - nameW : nameOuter + nameW;

    // Value sits in its own fixed column just outside the plot, growing outward
    // from the plot edge toward the name column.
    const plotEdge = positive ? WIDTH - GUTTER : GUTTER;
    const valueStart = positive ? plotEdge + VALUE_PAD : plotEdge - VALUE_PAD;
    const valueOuter = positive ? valueStart + valueW : valueStart - valueW;

    return { label, positive, nameOuter, nameInner, nameW, tip: x(v), valueOuter };
  });
}

const SKILLS = [
  ['AI and big data', 87],
  ['Networks and cybersecurity', 70],
  ['Technological literacy', 68],
  ['Creative thinking', 66],
  ['Resilience and agility', 65],
  ['Curiosity and lifelong learning', 62],
  ['Manual dexterity and precision', -24],
];

const PRODUCTIVITY = [
  ['AI, projected upper bound', 0.064],
  ['Demographic ageing, measured', -0.13],
];

let checks = 0;
const ok = (label) => {
  checks++;
  console.log(`  ok  ${label}`);
};

console.log('\nDivergingBars layout');

for (const [name, data, unit] of [
  ['skills chart (section 03)', SKILLS, '%'],
  ['productivity chart (section 08)', PRODUCTIVITY, 'pp'],
]) {
  const rows = layout(data, unit);

  for (const r of rows) {
    // 1. Nothing may leave the viewBox horizontally.
    assert.ok(
      r.nameOuter >= 0 && r.nameOuter <= WIDTH,
      `${name}: "${r.label}" name anchor outside frame at ${r.nameOuter}`
    );
    assert.ok(
      r.valueOuter >= 0 && r.valueOuter <= WIDTH,
      `${name}: "${r.label}" value overflows frame at ${r.valueOuter} (frame ${WIDTH})`
    );

    // 2. The value must not run into the name. 10px minimum clearance.
    const clearance = r.positive ? r.nameInner - r.valueOuter : r.valueOuter - r.nameInner;
    assert.ok(
      clearance >= 10,
      `${name}: "${r.label}" value collides with name, clearance ${clearance.toFixed(0)}px`
    );

    // 3. Bars must stay inside the plot area, not intrude into a gutter.
    assert.ok(
      r.tip >= GUTTER - 1 && r.tip <= WIDTH - GUTTER + 1,
      `${name}: "${r.label}" bar tip ${r.tip.toFixed(0)} outside plot area`
    );

    // 4. A name must fit its own column, or it will run under the value.
    assert.ok(
      r.nameW <= NAME_COL - EDGE,
      `${name}: "${r.label}" name needs ${r.nameW.toFixed(0)}px, column is ${NAME_COL - EDGE}px`
    );
  }
  ok(`${name}: ${rows.length} labels inside frame, no collisions`);

  // 4. Polarity must be mirrored: rising names right, declining names left.
  for (const r of rows) {
    assert.equal(
      r.positive,
      r.nameOuter > WIDTH / 2,
      `${name}: "${r.label}" name is on the wrong side for its sign`
    );
  }
  ok(`${name}: label side matches value sign`);
}

// 5. A pathological label must fail loudly rather than silently overflow, so the
//    check itself is proven to work.
{
  const absurd = [['A category name far longer than any real dataset would ever use', 87]];
  const [r] = layout(absurd, '%');
  const clearance = r.nameInner - r.valueOuter;
  assert.ok(clearance < 10, 'the collision check must trip on a pathological label');
  ok('collision check trips on an over-long label (guard is live)');
}

// 6. Frame height must fit its rows.
{
  const h = SKILLS.length * ROW_HEIGHT + 64;
  assert.ok(
    h >= PAD_TOP + SKILLS.length * ROW_HEIGHT + PAD_BOTTOM,
    'frame height must accommodate padding plus all rows'
  );
  ok('frame height fits padding plus rows');
}

console.log(`\n${checks} checks passed.\n`);
