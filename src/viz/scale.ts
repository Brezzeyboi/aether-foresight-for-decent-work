/* ============================================================================
   Chart primitives: scales, ticks, geometry, and the shared chart grammar.

   Charts here are hand-built SVG rather than a chart library. Reason: the
   design spec (rounded data-ends anchored to the baseline, 2px surface gaps
   between adjacent fills, selective direct labels, ordered texture rotation,
   sequential-only encoding) is a fight against every chart library's defaults.
   The set of forms is small and fixed, so primitives are less code than
   configuring and overriding a library, and there is no runtime dependency.
   ============================================================================ */

export interface LinearScale {
  (value: number): number;
  readonly domain: readonly [number, number];
  readonly range: readonly [number, number];
  /** Inverse mapping, for pointer position to data value. */
  readonly invert: (px: number) => number;
}

export function linearScale(
  domain: readonly [number, number],
  range: readonly [number, number],
): LinearScale {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const span = d1 - d0;

  // A zero-width domain would divide by zero; collapse to the range start so a
  // single-value dataset renders at the baseline instead of producing NaN paths.
  const scale = ((value: number) => (span === 0 ? r0 : r0 + ((value - d0) / span) * (r1 - r0))) as {
    (value: number): number;
    domain: readonly [number, number];
    range: readonly [number, number];
    invert: (px: number) => number;
  };

  scale.domain = domain;
  scale.range = range;
  scale.invert = (px: number) => {
    const t = r1 === r0 ? 0 : (px - r0) / (r1 - r0);
    return d0 + t * span;
  };

  return scale as LinearScale;
}

/** Evenly spaced band positions, for categorical axes. */
export interface BandScale {
  (index: number): number;
  readonly bandwidth: number;
  readonly step: number;
}

export function bandScale(
  count: number,
  range: readonly [number, number],
  paddingRatio = 0.28,
): BandScale {
  const [r0, r1] = range;
  const total = r1 - r0;
  const step = count === 0 ? 0 : total / count;
  const bandwidth = step * (1 - paddingRatio);
  const offset = (step - bandwidth) / 2;

  const scale = ((index: number) => r0 + index * step + offset) as {
    (index: number): number;
    bandwidth: number;
    step: number;
  };

  scale.bandwidth = bandwidth;
  scale.step = step;
  return scale as BandScale;
}

/**
 * "Nice" axis ticks: rounded to human-readable intervals (1, 2, 5, 10 x 10^n)
 * so axis labels read as 0/25/50/75/100 rather than 0/23.4/46.8.
 */
export function niceTicks(min: number, max: number, target = 5): number[] {
  if (min === max) return [min];
  const span = max - min;
  const rawStep = span / target;
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const normalized = rawStep / magnitude;
  const stepMultiple = normalized >= 7.5 ? 10 : normalized >= 3.5 ? 5 : normalized >= 1.5 ? 2 : 1;
  const step = stepMultiple * magnitude;

  const start = Math.ceil(min / step) * step;
  const ticks: number[] = [];
  // Epsilon guards against floating-point drift dropping the final tick
  // (e.g. 0.30000000000000004 > 0.3 excluding the top of the axis).
  for (let v = start; v <= max + step * 1e-9; v += step) {
    ticks.push(Math.round(v / step) * step);
  }
  return ticks;
}

/** Domain padded to the next nice tick, so bars never touch the frame edge. */
export function niceDomain(
  values: readonly number[],
  { includeZero = true, target = 5 } = {},
): [number, number] {
  const finite = values.filter((v) => Number.isFinite(v));
  if (finite.length === 0) return [0, 1];

  let min = Math.min(...finite);
  let max = Math.max(...finite);
  if (includeZero) {
    min = Math.min(0, min);
    max = Math.max(0, max);
  }
  if (min === max) return min === 0 ? [0, 1] : [Math.min(0, min), max * 1.1];

  const ticks = niceTicks(min, max, target);
  const step = ticks.length > 1 ? ticks[1] - ticks[0] : (max - min) / target;
  return [
    Math.min(min, ticks[0]),
    Math.max(max, ticks[ticks.length - 1] + (max > ticks[ticks.length - 1] ? step : 0)),
  ];
}

/* --- Paths --------------------------------------------------------------- */

/**
 * A bar with rounded corners on the DATA END only. The baseline end stays
 * square so the bar reads as anchored to the axis rather than floating.
 * `orientation` is which way the value grows.
 */
export function barPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  orientation: 'up' | 'right' = 'up',
): string {
  const r = Math.max(
    0,
    Math.min(
      radius,
      orientation === 'up' ? height : width,
      (orientation === 'up' ? width : height) / 2,
    ),
  );

  if (r === 0) return `M${x},${y}h${width}v${height}h${-width}Z`;

  if (orientation === 'up') {
    // Data end is the top edge.
    return [
      `M${x},${y + height}`,
      `V${y + r}`,
      `Q${x},${y} ${x + r},${y}`,
      `H${x + width - r}`,
      `Q${x + width},${y} ${x + width},${y + r}`,
      `V${y + height}`,
      'Z',
    ].join(' ');
  }

  // Data end is the right edge.
  return [
    `M${x},${y}`,
    `H${x + width - r}`,
    `Q${x + width},${y} ${x + width},${y + r}`,
    `V${y + height - r}`,
    `Q${x + width},${y + height} ${x + width - r},${y + height}`,
    `H${x}`,
    'Z',
  ].join(' ');
}

/** Straight-segment polyline through points. */
export function linePath(points: readonly (readonly [number, number])[]): string {
  if (points.length === 0) return '';
  return points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ');
}

/**
 * Monotone cubic path. Used only for genuinely continuous quantities where a
 * smooth reading is honest; never for sparse or stepped data, where smoothing
 * would invent values between the points.
 */
export function smoothPath(points: readonly (readonly [number, number])[]): string {
  if (points.length < 2) return linePath(points);
  const segments: string[] = [`M${points[0][0].toFixed(2)},${points[0][1].toFixed(2)}`];

  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const dx = (x1 - x0) * 0.38;
    segments.push(
      `C${(x0 + dx).toFixed(2)},${y0.toFixed(2)} ${(x1 - dx).toFixed(2)},${y1.toFixed(2)} ${x1.toFixed(2)},${y1.toFixed(2)}`,
    );
  }
  return segments.join(' ');
}

/** Closes a line path down to a baseline, for area fills. */
export function areaPath(
  points: readonly (readonly [number, number])[],
  baselineY: number,
  smooth = false,
): string {
  if (points.length === 0) return '';
  const top = smooth ? smoothPath(points) : linePath(points);
  const lastX = points[points.length - 1][0];
  const firstX = points[0][0];
  return `${top} L${lastX.toFixed(2)},${baselineY.toFixed(2)} L${firstX.toFixed(2)},${baselineY.toFixed(2)} Z`;
}

/** Point on a circle, for radial charts. Angle 0 is 12 o'clock. */
export function polar(
  cx: number,
  cy: number,
  radius: number,
  angleIndex: number,
  angleCount: number,
): [number, number] {
  const angle = (angleIndex / angleCount) * Math.PI * 2 - Math.PI / 2;
  return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
}

/** Closed polygon through radial points, for the skill radar. */
export function radarPath(points: readonly (readonly [number, number])[]): string {
  if (points.length === 0) return '';
  return `${linePath(points)} Z`;
}

/* --- Sequential encoding ------------------------------------------------- */

/** The sequential ramp, light to dark. Every step is defined in tokens.css. */
export const SEQ_RAMP = [
  'var(--seq-100)',
  'var(--seq-200)',
  'var(--seq-300)',
  'var(--seq-400)',
  'var(--seq-500)',
  'var(--seq-600)',
  'var(--seq-700)',
] as const;

/**
 * Maps a normalised value (0..1) to a ramp step.
 *
 * `mode` picks the floor:
 *   'sequential' - continuous magnitude (heatmaps). May use the palest step,
 *      where near-zero is allowed to recede toward the surface.
 *   'ordinal' - discrete ordered categories. Starts at seq-300 so every step
 *      clears 2:1 contrast and reads as a real category rather than as blank.
 */
export function seqColor(t: number, mode: 'sequential' | 'ordinal' = 'sequential'): string {
  const floor = mode === 'ordinal' ? 2 : 0;
  const usable = SEQ_RAMP.length - floor;
  const clamped = Math.max(0, Math.min(1, Number.isFinite(t) ? t : 0));
  const index = floor + Math.min(usable - 1, Math.floor(clamped * usable));
  return SEQ_RAMP[index];
}

export const formatPercent = (v: number, digits = 0): string => `${v.toFixed(digits)}%`;

/** Compact figures for axis ticks: 1200 -> "1.2k". */
export function formatCompact(v: number): string {
  const abs = Math.abs(v);
  if (abs >= 1e9) return `${(v / 1e9).toFixed(abs >= 1e10 ? 0 : 1)}bn`;
  if (abs >= 1e6) return `${(v / 1e6).toFixed(abs >= 1e7 ? 0 : 1)}m`;
  if (abs >= 1e3) return `${(v / 1e3).toFixed(abs >= 1e4 ? 0 : 1)}k`;
  return String(v);
}
