/* ============================================================================
   Bar forms: horizontal comparison, and diverging (rising against declining).

   Both encode magnitude, so both use the sequential ramp or a single emphasis
   hue. Neither carries series identity, which is what keeps them clear of the
   categorical CVD gate. See docs/03-design-system.md.
   ============================================================================ */

import {
  AxisY,
  Baseline,
  ChartWithTable,
  Tooltip,
  plotArea,
  useHover,
  type ChartFrame,
} from './Chart.tsx';
import { barPath, bandScale, linearScale, niceTicks, seqColor } from './scale.ts';

export interface BarDatum {
  label: string;
  value: number;
  /** Overrides the ramp position. Use to emphasise one bar and mute the rest. */
  emphasis?: 'accent' | 'muted';
  /** Shown in the tooltip. The reason this value matters. */
  detail?: string;
}

interface HBarsProps {
  data: readonly BarDatum[];
  /** Question the chart answers, for the table caption. */
  caption: string;
  /** Axis units. "% of tasks", not "%". */
  unit?: string;
  format?: (v: number) => string;
  /** Bar height in px. Rows are sized to content, not to a fixed frame. */
  rowHeight?: number;
  max?: number;
}

/* Width of the longest label at the .mark-label size (Geist 11.5px), used to
   size the label gutter. Callers previously passed a `labelWidth` in ch and the
   gutter was derived at 7.2px/ch, which underestimated real glyph width and
   pushed two labels ~21px outside the viewBox in section 04. Measuring the data
   removes the guess: a caller can no longer get it wrong. 0.62em is a deliberate
   over-estimate of Geist's average advance, since erring wide only adds
   whitespace whereas erring narrow clips text. */
const LABEL_EM = 11.5 * 0.62;
const LABEL_PAD = 14;

function labelGutter(data: readonly BarDatum[]): number {
  const longest = data.reduce((max, d) => Math.max(max, d.label.length), 0);
  return Math.ceil(longest * LABEL_EM) + LABEL_PAD;
}

/**
 * Horizontal bars. The default for comparing named categories, because long
 * category names fit and rank order reads top to bottom.
 */
export function HBars({
  data,
  caption,
  unit,
  format = (v) => `${v}`,
  rowHeight = 34,
  max,
}: HBarsProps) {
  const { hover, show, hide } = useHover();

  // Gutter is derived from the data, and the frame widens to match so the plot
  // area does not shrink when labels are long.
  const leftPad = labelGutter(data);
  const frame: ChartFrame = {
    width: leftPad + 464,
    height: data.length * rowHeight + 44,
    padding: { top: 8, right: 56, bottom: 28, left: leftPad },
  };
  const { x0, y0, w } = plotArea(frame);

  const domainMax = max ?? Math.max(...data.map((d) => d.value));
  const x = linearScale([0, domainMax], [x0, x0 + w]);
  const band = bandScale(data.length, [y0, y0 + data.length * rowHeight], 0.34);
  const ticks = niceTicks(0, domainMax, 4);

  return (
    <ChartWithTable
      caption={caption}
      rows={data}
      rowKey={(d) => d.label}
      columns={[
        { header: 'Category', cell: (d) => d.label },
        { header: unit ?? 'Value', numeric: true, cell: (d) => format(d.value) },
      ]}
    >
      <svg
        className="chart-svg"
        viewBox={`0 0 ${frame.width} ${frame.height}`}
        preserveAspectRatio="xMinYMin meet"
      >
        {/* Vertical gridlines, drawn first so bars sit on top. */}
        <g aria-hidden="true">
          {ticks.map((t) => (
            <g key={t}>
              <line
                className="axis__grid"
                x1={x(t)}
                x2={x(t)}
                y1={y0}
                y2={y0 + data.length * rowHeight}
              />
              <text
                className="axis__tick"
                x={x(t)}
                y={y0 + data.length * rowHeight + 16}
                textAnchor="middle"
              >
                {format(t)}
              </text>
            </g>
          ))}
          {unit && (
            <text
              className="axis__label"
              x={x0 + w}
              y={y0 + data.length * rowHeight + 32}
              textAnchor="end"
            >
              {unit}
            </text>
          )}
        </g>

        <g className="marks" data-hovering={hover ? true : undefined}>
          {data.map((d, i) => {
            const y = band(i);
            const barW = Math.max(0, x(d.value) - x0);
            const fill =
              d.emphasis === 'accent'
                ? 'var(--accent-live)'
                : d.emphasis === 'muted'
                  ? 'var(--mute-mark)'
                  : seqColor(d.value / domainMax);

            return (
              <g
                key={d.label}
                className="mark"
                data-active={hover?.index === i || undefined}
                data-interactive
                onPointerEnter={() => show(i, x(d.value), y + band.bandwidth / 2)}
                onPointerLeave={hide}
              >
                {/* Category label sits in the left gutter, in ink. */}
                <text
                  className="mark-label mark-label--muted"
                  x={x0 - 12}
                  y={y + band.bandwidth / 2}
                  dy="0.32em"
                  textAnchor="end"
                >
                  {d.label}
                </text>

                <path
                  className="chart-fill"
                  d={barPath(x0, y, barW, band.bandwidth, 4, 'right')}
                  fill={fill}
                />

                {/* Direct value label at the data end. Selective by design: every
                    bar carries one here because there are few bars and the value
                    is the point. */}
                <text
                  className="mark-label"
                  x={x0 + barW + 8}
                  y={y + band.bandwidth / 2}
                  dy="0.32em"
                >
                  {format(d.value)}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <Tooltip hover={hover} frame={frame}>
        {hover && (
          <>
            <p className="chart-tip__title">{data[hover.index].label}</p>
            <p className="chart-tip__value">{format(data[hover.index].value)}</p>
            {data[hover.index].detail && (
              <p className="chart-tip__detail">{data[hover.index].detail}</p>
            )}
          </>
        )}
      </Tooltip>
    </ChartWithTable>
  );
}

/* --- Diverging ----------------------------------------------------------- */

export interface DivergingDatum {
  label: string;
  /** Positive grows, negative declines. */
  value: number;
  detail?: string;
}

interface DivergingProps {
  data: readonly DivergingDatum[];
  caption: string;
  unit?: string;
  positiveLabel: string;
  negativeLabel: string;
}

/**
 * Diverging bars around a zero baseline. The correct form for
 * rising-against-declining, because the polarity is the finding.
 *
 * Two hues plus a neutral centre, per the diverging rule. The green arm is the
 * accent family; the declining arm is clay. They are told apart by side of the
 * axis first, colour second, so the encoding survives colourblindness.
 */
export function DivergingBars({
  data,
  caption,
  unit,
  positiveLabel,
  negativeLabel,
}: DivergingProps) {
  const { hover, show, hide } = useHover();

  const rowHeight = 32;

  // Five fixed columns, mirrored about the centre:
  //   [name gutter][value col][ plot ][value col][name gutter]
  //
  // Both label kinds are anchored to fixed columns rather than to the bar tip.
  // Drawing a label at the tip lets it grow outward without bound, which produced
  // two real failures: category names overflowed the viewBox by up to 49px, and
  // in the productivity chart the value label collided with the name by 26px.
  // Fixed columns make both geometrically impossible at any label length, and the
  // mirroring carries the polarity: rising names right, declining names left.
  // Verified by src/viz/bars.layout.test.mjs.
  const NAME_COL = 208;
  const VALUE_COL = 70;
  const EDGE = 6;
  const VALUE_PAD = 8;
  const GUTTER = NAME_COL + VALUE_COL;

  const frame: ChartFrame = {
    width: GUTTER * 2 + 384,
    height: data.length * rowHeight + 64,
    padding: { top: 26, right: GUTTER, bottom: 34, left: GUTTER },
  };
  const { x0, y0, w } = plotArea(frame);

  const extent = Math.max(...data.map((d) => Math.abs(d.value)));
  const centre = x0 + w / 2;
  const half = w / 2 - 10;
  const x = linearScale([-extent, extent], [centre - half, centre + half]);
  const band = bandScale(data.length, [y0, y0 + data.length * rowHeight], 0.36);

  const fmt = (v: number) => `${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v)}${unit ?? ''}`;

  return (
    <ChartWithTable
      caption={caption}
      rows={data}
      rowKey={(d) => d.label}
      columns={[
        { header: 'Skill', cell: (d) => d.label },
        { header: 'Net change', numeric: true, cell: (d) => fmt(d.value) },
        {
          header: 'Direction',
          cell: (d) => (d.value >= 0 ? positiveLabel : negativeLabel),
        },
      ]}
    >
      <svg
        className="chart-svg"
        viewBox={`0 0 ${frame.width} ${frame.height}`}
        preserveAspectRatio="xMinYMin meet"
      >
        {/* Arm labels, so the reader knows which side means what without a legend. */}
        <g aria-hidden="true">
          <text className="axis__label" x={centre - 12} y={y0 - 12} textAnchor="end">
            {negativeLabel}
          </text>
          <text className="axis__label" x={centre + 12} y={y0 - 12} textAnchor="start">
            {positiveLabel}
          </text>
        </g>

        {/* The neutral centre line. Darker than a gridline: it is the reference. */}
        <line
          className="axis__baseline"
          x1={centre}
          x2={centre}
          y1={y0 - 4}
          y2={y0 + data.length * rowHeight + 4}
          aria-hidden="true"
        />

        <g className="marks" data-hovering={hover ? true : undefined}>
          {data.map((d, i) => {
            const y = band(i);
            const positive = d.value >= 0;
            const barX = positive ? centre : x(d.value);
            const barW = Math.abs(x(d.value) - centre);

            return (
              <g
                key={d.label}
                className="mark"
                data-active={hover?.index === i || undefined}
                data-interactive
                onPointerEnter={() => show(i, positive ? centre + barW : centre - barW, y + band.bandwidth / 2)}
                onPointerLeave={hide}
              >
                <rect
                  className="chart-fill"
                  x={barX}
                  y={y}
                  width={barW}
                  height={band.bandwidth}
                  rx={2.5}
                  fill={positive ? 'var(--accent-live)' : 'var(--risk-elevated)'}
                />
                {/* Name in the outer gutter, value at the bar tip. Splitting the
                    two keeps names on a fixed left/right edge the eye can scan,
                    and puts the number where the length is read. */}
                {/* Name at the frame edge, value in its own column just outside
                    the plot. Both anchored, so neither can overflow or collide. */}
                <text
                  className="mark-label"
                  x={positive ? frame.width - EDGE : EDGE}
                  y={y + band.bandwidth / 2}
                  dy="0.32em"
                  textAnchor={positive ? 'end' : 'start'}
                >
                  {d.label}
                </text>
                <text
                  className="mark-label mark-label--muted"
                  x={
                    positive
                      ? frame.width - GUTTER + VALUE_PAD
                      : GUTTER - VALUE_PAD
                  }
                  y={y + band.bandwidth / 2}
                  dy="0.32em"
                  textAnchor={positive ? 'start' : 'end'}
                >
                  {fmt(d.value)}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <Tooltip hover={hover} frame={frame}>
        {hover && (
          <>
            <p className="chart-tip__title">{data[hover.index].label}</p>
            <p className="chart-tip__value">{fmt(data[hover.index].value)}</p>
            {data[hover.index].detail && (
              <p className="chart-tip__detail">{data[hover.index].detail}</p>
            )}
          </>
        )}
      </Tooltip>
    </ChartWithTable>
  );
}

/* --- Stacked share ------------------------------------------------------- */

export interface ShareSegment {
  label: string;
  value: number;
  detail?: string;
}

/**
 * A single stacked bar showing parts of a whole, with a 2px surface gap between
 * segments so adjacent fills never appear to merge.
 *
 * Ordinal encoding: the segments are an ordered sequence (here, exposure
 * gradients), so the ramp starts at seq-300 and every step clears 2:1.
 */
export function ShareBar({
  data,
  caption,
  unit = '%',
}: {
  data: readonly ShareSegment[];
  caption: string;
  unit?: string;
}) {
  const { hover, show, hide } = useHover();

  const frame: ChartFrame = {
    width: 720,
    height: 132,
    padding: { top: 30, right: 8, bottom: 58, left: 8 },
  };
  const { x0, y0, w, h } = plotArea(frame);

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const GAP = 2;

  let cursor = x0;
  const segments = data.map((d, i) => {
    const width = (d.value / total) * (w - GAP * (data.length - 1));
    const seg = { ...d, x: cursor, width, index: i };
    cursor += width + GAP;
    return seg;
  });

  return (
    <ChartWithTable
      caption={caption}
      rows={data}
      rowKey={(d) => d.label}
      columns={[
        { header: 'Segment', cell: (d) => d.label },
        { header: `Share (${unit})`, numeric: true, cell: (d) => `${d.value}${unit}` },
      ]}
    >
      <svg
        className="chart-svg"
        viewBox={`0 0 ${frame.width} ${frame.height}`}
        preserveAspectRatio="xMinYMin meet"
      >
        <g className="marks" data-hovering={hover ? true : undefined}>
          {segments.map((s) => (
            <g
              key={s.label}
              className="mark"
              data-active={hover?.index === s.index || undefined}
              data-interactive
              onPointerEnter={() => show(s.index, s.x + s.width / 2, y0 + h / 2)}
              onPointerLeave={hide}
            >
              <rect
                className="chart-fill"
                x={s.x}
                y={y0}
                width={Math.max(0, s.width)}
                height={h}
                fill={seqColor(s.index / Math.max(1, data.length - 1), 'ordinal')}
              />
              {/* Label above, value inside, but only where the segment is wide
                  enough to hold text. Narrow segments rely on the tooltip and
                  the table rather than overlapping labels. */}
              {s.width > 54 && (
                <text
                  className="mark-label"
                  x={s.x + s.width / 2}
                  y={y0 - 10}
                  textAnchor="middle"
                >
                  {s.value}
                  {unit}
                </text>
              )}
            </g>
          ))}
        </g>

        {/* Segment names below the bar, angled only if they would collide. */}
        <g aria-hidden="true">
          {segments.map((s) =>
            s.width > 54 ? (
              <text
                key={s.label}
                className="axis__tick"
                x={s.x + s.width / 2}
                y={y0 + h + 20}
                textAnchor="middle"
              >
                {s.label}
              </text>
            ) : null
          )}
        </g>
      </svg>

      <Tooltip hover={hover} frame={frame}>
        {hover && (
          <>
            <p className="chart-tip__title">{data[hover.index].label}</p>
            <p className="chart-tip__value">
              {data[hover.index].value}
              {unit}
            </p>
            {data[hover.index].detail && (
              <p className="chart-tip__detail">{data[hover.index].detail}</p>
            )}
          </>
        )}
      </Tooltip>
    </ChartWithTable>
  );
}

export { AxisY, Baseline };
