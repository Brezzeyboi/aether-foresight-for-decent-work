/* ============================================================================
   Shared chart infrastructure: axes, gridlines, hover layer, table view.

   Two rules from the design system are enforced here rather than left to each
   chart to remember:

     1. Every chart ships a TABLE VIEW. A printed chart cannot be hovered, a
        screen reader cannot read a path, and the palette's contrast relief rule
        requires values be readable another way. The toggle is a real button.
     2. The data is the darkest thing in the frame. Grid and axes are recessive.
   ============================================================================ */

import { useId, useState, type ReactNode } from 'react';
import './chart.css';

export interface ChartFrame {
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
}

/** Inner plot area, after padding. */
export function plotArea(frame: ChartFrame) {
  const { width, height, padding } = frame;
  return {
    x0: padding.left,
    y0: padding.top,
    x1: width - padding.right,
    y1: height - padding.bottom,
    w: width - padding.left - padding.right,
    h: height - padding.top - padding.bottom,
  };
}

/* --- Axes ---------------------------------------------------------------- */

interface AxisProps {
  frame: ChartFrame;
  ticks: readonly number[];
  scale: (v: number) => number;
  format?: (v: number) => string;
  /** Axis label, stating units. "% of tasks", not "%". */
  label?: string;
}

/** Horizontal gridlines with left-hand value labels. */
export function AxisY({ frame, ticks, scale, format = String, label }: AxisProps) {
  const { x0, x1 } = plotArea(frame);
  return (
    <g className="axis axis--y" aria-hidden="true">
      {ticks.map((t) => {
        const y = scale(t);
        return (
          <g key={t}>
            <line className="axis__grid" x1={x0} x2={x1} y1={y} y2={y} />
            <text className="axis__tick" x={x0 - 8} y={y} dy="0.32em" textAnchor="end">
              {format(t)}
            </text>
          </g>
        );
      })}
      {label && (
        <text className="axis__label" x={x0 - 8} y={frame.padding.top - 14} textAnchor="end">
          {label}
        </text>
      )}
    </g>
  );
}

interface CategoryAxisProps {
  frame: ChartFrame;
  categories: readonly string[];
  position: (i: number) => number;
  bandwidth: number;
  orientation?: 'bottom' | 'left';
}

export function AxisCategory({
  frame,
  categories,
  position,
  bandwidth,
  orientation = 'bottom',
}: CategoryAxisProps) {
  const { y1, x0 } = plotArea(frame);
  return (
    <g className="axis axis--category" aria-hidden="true">
      {categories.map((c, i) => {
        const centre = position(i) + bandwidth / 2;
        return orientation === 'bottom' ? (
          <text key={c} className="axis__tick" x={centre} y={y1 + 18} textAnchor="middle">
            {c}
          </text>
        ) : (
          <text key={c} className="axis__tick" x={x0 - 10} y={centre} dy="0.32em" textAnchor="end">
            {c}
          </text>
        );
      })}
    </g>
  );
}

/** The zero baseline. Drawn darker than gridlines, because bars sit on it. */
export function Baseline({ frame, y }: { frame: ChartFrame; y: number }) {
  const { x0, x1 } = plotArea(frame);
  return <line className="axis__baseline" x1={x0} x2={x1} y1={y} y2={y} aria-hidden="true" />;
}

/* --- Hover layer --------------------------------------------------------- */

export interface HoverState {
  index: number;
  x: number;
  y: number;
}

/**
 * Per-mark hover, driven by pointer events on the marks themselves rather than
 * by a mousemove listener on the document. Keyboard focus triggers the same
 * state, so the tooltip is not mouse-only.
 */
export function useHover() {
  const [hover, setHover] = useState<HoverState | null>(null);
  return {
    hover,
    show: (index: number, x: number, y: number) => setHover({ index, x, y }),
    hide: () => setHover(null),
  };
}

interface TooltipProps {
  hover: HoverState | null;
  frame: ChartFrame;
  children: ReactNode;
}

/**
 * Positioned tooltip. Flips to the left of the cursor near the right edge so it
 * never overflows the figure.
 */
export function Tooltip({ hover, frame, children }: TooltipProps) {
  if (!hover) return null;
  const flip = hover.x > frame.width * 0.62;
  return (
    <div
      className="chart-tip"
      data-flip={flip || undefined}
      style={{
        left: `${(hover.x / frame.width) * 100}%`,
        top: `${(hover.y / frame.height) * 100}%`,
      }}
      role="status"
    >
      {children}
    </div>
  );
}

/* --- Table view ---------------------------------------------------------- */

export interface TableColumn<T> {
  header: string;
  /** Numeric columns are right-aligned with tabular figures. */
  numeric?: boolean;
  cell: (row: T) => ReactNode;
}

interface ChartWithTableProps<T> {
  /** What the chart shows, used for the table's accessible caption. */
  caption: string;
  rows: readonly T[];
  columns: readonly TableColumn<T>[];
  children: ReactNode;
  /** Row key extractor. */
  rowKey: (row: T, i: number) => string;
}

/**
 * Wraps a chart with a toggleable table of the same data.
 *
 * The chart is marked `aria-hidden` and the table carries the accessible
 * content, because a table is a far better screen-reader experience than any
 * amount of ARIA on an SVG. Sighted users get the chart; everyone can get the
 * numbers. The table always prints.
 */
export function ChartWithTable<T>({
  caption,
  rows,
  columns,
  children,
  rowKey,
}: ChartWithTableProps<T>) {
  const [showTable, setShowTable] = useState(false);
  const tableId = useId();

  return (
    <div className="chart-block">
      <div className="chart-block__controls no-print">
        <button
          type="button"
          className="chart-toggle"
          aria-expanded={showTable}
          aria-controls={tableId}
          onClick={() => setShowTable((v) => !v)}
        >
          {showTable ? 'Hide data table' : 'Show data table'}
        </button>
      </div>

      <div className="chart-block__figure" aria-hidden="true">
        {children}
      </div>

      <div
        id={tableId}
        className="chart-table-wrap"
        data-open={showTable || undefined}
      >
        <table className="chart-table">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.header} scope="col" data-numeric={c.numeric || undefined}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={rowKey(row, i)}>
                {columns.map((c, ci) => {
                  const content = c.cell(row);
                  return ci === 0 ? (
                    <th key={c.header} scope="row">
                      {content}
                    </th>
                  ) : (
                    <td key={c.header} data-numeric={c.numeric || undefined}>
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* --- Texture ------------------------------------------------------------
   The accessibility channel. One directional fill at 45deg and its 135deg
   mirror, used where two fills must be told apart without relying on colour
   (the scenario small multiples, print, forced-colors). Never decorative. */

export function TextureDefs({ id }: { id: string }) {
  return (
    <defs>
      <pattern
        id={`${id}-a`}
        width="6"
        height="6"
        patternTransform="rotate(45)"
        patternUnits="userSpaceOnUse"
      >
        <line className="texture__line" x1="0" y1="0" x2="0" y2="6" />
      </pattern>
      <pattern
        id={`${id}-b`}
        width="6"
        height="6"
        patternTransform="rotate(135)"
        patternUnits="userSpaceOnUse"
      >
        <line className="texture__line" x1="0" y1="0" x2="0" y2="6" />
      </pattern>
    </defs>
  );
}
