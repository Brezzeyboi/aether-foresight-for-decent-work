/* ============================================================================
   The horizon chart: 2026 to 2045 as a widening cone of uncertainty.

   This is the most important visualisation in the product, because it encodes
   the argument the whole project rests on: certainty degrades with distance, and
   the honest response is to say so rather than to extend the line confidently.

   The encoding, and why each part earns its place:

     - HORIZONTAL position is time. Non-linear spacing, because the intervals are
       not epistemically equal: the gap from measured 2026 to projected 2030 is a
       smaller leap than the gap from extrapolated 2035 to scenario 2045.
     - VERTICAL extent is the range of defensible statements. It widens because
       the range genuinely widens, not for visual effect.
     - FILL DENSITY decreases with distance. Near-term is solid; the scenario
       band is textured, so "we are guessing here" is visible without reading.
     - The BOUNDARY between projection and extrapolation is drawn as a hard rule,
       because it marks where published evidence stops and our inference begins.

   No numeric value is plotted past 2030, because none can be sourced. The cone's
   vertical extent is an illustrative encoding of uncertainty width, declared as
   an assumption, not a quantitative claim.
   ============================================================================ */

import { useId } from 'react';
import { ChartWithTable, Tooltip, plotArea, useHover, type ChartFrame } from './Chart.tsx';
import { linearScale } from './scale.ts';

export type EvidenceStatus = 'measured' | 'projection' | 'extrapolation' | 'scenario';

export interface Horizon {
  year: number;
  status: EvidenceStatus;
  /** The defensible statement at this horizon. */
  canSay: string;
  /** The honest limit at this horizon. */
  cannotSay: string;
  /** Uncertainty half-width, 0 to 1. An illustrative encoding, not a measurement. */
  spread: number;
}

const STATUS_LABEL: Record<EvidenceStatus, string> = {
  measured: 'Measured',
  projection: 'Projection',
  extrapolation: 'Extrapolation',
  scenario: 'Scenario',
};

const STATUS_NOTE: Record<EvidenceStatus, string> = {
  measured: 'Observed data, already collected and published.',
  projection: 'Published forward estimates exist for this horizon.',
  extrapolation: 'No published projection reaches here. Inference from direction of travel.',
  scenario: 'Conditional pathways only. Not a forecast.',
};

interface HorizonChartProps {
  horizons: readonly Horizon[];
  caption: string;
  /**
   * Renders for the inverted plate. The sequential ramp INVERTS here, because it
   * was built for the ivory surface: measured against the ink plate, seq-500
   * falls to 2.82:1 and the accent to 2.75:1, both under the 3:1 floor for marks.
   * On dark the light end of the ramp has to carry the data instead. This is a
   * value flip, not a hue change: the same single hue is doing the same work.
   */
  onInk?: boolean;
}

export function HorizonChart({ horizons, caption, onInk = false }: HorizonChartProps) {
  const { hover, show, hide } = useHover();
  const patternId = useId().replace(/:/g, '');

  const frame: ChartFrame = onInk
    ? { width: 1180, height: 460, padding: { top: 74, right: 56, bottom: 96, left: 56 } }
    : { width: 860, height: 340, padding: { top: 52, right: 32, bottom: 76, left: 32 } };
  const { x0, y0, w, h } = plotArea(frame);

  // Non-linear time spacing: later horizons get more room, because the
  // uncertainty they carry needs the space to be legible, and because equal
  // spacing would imply the intervals are epistemically equivalent.
  const positions = horizons.map((_, i) => {
    const t = i / (horizons.length - 1);
    // Ease-out: early intervals compressed, later ones expanded.
    const eased = 1 - (1 - t) ** 1.7;
    return x0 + eased * w;
  });

  const midY = y0 + h / 2;
  const maxSpread = h / 2 - 8;
  const y = linearScale([0, 1], [0, maxSpread]);

  // Upper and lower cone boundaries.
  const upper = horizons.map((hz, i) => [positions[i], midY - y(hz.spread)] as const);
  const lower = horizons.map((hz, i) => [positions[i], midY + y(hz.spread)] as const);

  const conePath = (from: number, to: number) => {
    const up = upper.slice(from, to + 1);
    const down = lower.slice(from, to + 1).reverse();
    return [
      `M${up[0][0].toFixed(1)},${up[0][1].toFixed(1)}`,
      ...up.slice(1).map(([px, py]) => `L${px.toFixed(1)},${py.toFixed(1)}`),
      ...down.map(([px, py]) => `L${px.toFixed(1)},${py.toFixed(1)}`),
      'Z',
    ].join(' ');
  };

  // Each band is drawn as its own segment so fill treatment can differ by
  // evidence status. Segments overlap by one index so there is no visual seam.
  const bands = horizons.slice(0, -1).map((hz, i) => ({
    from: i,
    to: i + 1,
    status: horizons[i + 1].status,
    key: `${hz.year}-${horizons[i + 1].year}`,
  }));

  // Certainty reads as density: solid where measured, thinning as evidence runs
  // out, textured once only scenarios remain. On the ink plate the ramp inverts,
  // because the ramp's dark end is what recedes there rather than what advances.
  const fillFor = (status: EvidenceStatus) => {
    switch (status) {
      case 'measured':
        // Certainty reads as prominence, and prominence inverts with the ground:
        // brightest on the ink plate, darkest on ivory. Measured against #1C1E1B,
        // the ink steps run 11.4:1, 6.0:1, 4.2:1, so every band clears the 3:1
        // mark floor while still stepping down in presence.
        return onInk ? 'var(--seq-100)' : 'var(--seq-500)';
      case 'projection':
        return onInk ? 'var(--seq-300)' : 'var(--seq-300)';
      case 'extrapolation':
        return onInk ? 'var(--seq-400)' : 'var(--seq-200)';
      case 'scenario':
        return `url(#${patternId}-scen)`;
    }
  };

  // Where published evidence stops. Drawn as a hard rule because it is the most
  // important boundary in the chart.
  const evidenceEdge = horizons.findIndex((hz) => hz.status === 'extrapolation');

  return (
    <ChartWithTable
      caption={caption}
      rows={horizons}
      rowKey={(hz) => String(hz.year)}
      columns={[
        { header: 'Horizon', cell: (hz) => String(hz.year) },
        { header: 'Evidence status', cell: (hz) => STATUS_LABEL[hz.status] },
        { header: 'What can be said', cell: (hz) => hz.canSay },
        { header: 'What cannot be said', cell: (hz) => hz.cannotSay },
      ]}
    >
      <svg
        className="chart-svg"
        data-on-ink={onInk || undefined}
        viewBox={`0 0 ${frame.width} ${frame.height}`}
        preserveAspectRatio="xMinYMin meet"
      >
        <defs>
          {/* Texture for the scenario band. The accessibility channel doing real
              work: it marks "conditional" in a way that survives greyscale,
              colourblindness, and forced-colors. */}
          <pattern
            id={`${patternId}-scen`}
            width="7"
            height="7"
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <rect
              width="7"
              height="7"
              fill={onInk ? 'var(--seq-500)' : 'var(--seq-100)'}
              opacity={onInk ? 0.9 : 0.55}
            />
            <line className="texture__line" x1="0" y1="0" x2="0" y2="7" />
          </pattern>
        </defs>

        {/* The cone, band by band. */}
        <g aria-hidden="true">
          {bands.map((b) => (
            <path
              key={b.key}
              className="chart-fill"
              d={conePath(b.from, b.to)}
              fill={fillFor(b.status)}
            />
          ))}
        </g>

        {/* Centre line: the median reading, drawn solid where evidence exists and
            dashed where it does not. */}
        <g aria-hidden="true">
          <line
            className="horizon__spine"
            x1={x0}
            x2={positions[Math.max(0, evidenceEdge - 1)]}
            y1={midY}
            y2={midY}
          />
          <line
            className="horizon__spine horizon__spine--inferred"
            x1={positions[Math.max(0, evidenceEdge - 1)]}
            x2={x0 + w}
            y1={midY}
            y2={midY}
          />
        </g>

        {/* The evidence boundary. */}
        {evidenceEdge > 0 && (
          <g aria-hidden="true">
            <line
              className="horizon__edge"
              x1={positions[evidenceEdge - 1]}
              x2={positions[evidenceEdge - 1]}
              y1={y0 - 30}
              y2={y0 + h + 8}
            />
            <text
              className="horizon__edge-label"
              x={positions[evidenceEdge - 1] - 8}
              y={y0 - 36}
              textAnchor="end"
            >
              Published projections end
            </text>
            <text
              className="horizon__edge-label horizon__edge-label--right"
              x={positions[evidenceEdge - 1] + 8}
              y={y0 - 36}
              textAnchor="start"
            >
              Inference and scenarios
            </text>
          </g>
        )}

        {/* Horizon markers. */}
        <g className="marks" data-hovering={hover ? true : undefined}>
          {horizons.map((hz, i) => (
            <g
              key={hz.year}
              className="mark"
              data-active={hover?.index === i || undefined}
              data-interactive
              onPointerEnter={() => show(i, positions[i], midY - y(hz.spread))}
              onPointerLeave={hide}
            >
              {/* Generous invisible hit target: the visible dot is 5px, which is
                  too small to hit comfortably. */}
              <rect
                x={positions[i] - 26}
                y={y0 - 12}
                width={52}
                height={h + 24}
                fill="transparent"
              />
              <line
                className="horizon__tick"
                x1={positions[i]}
                x2={positions[i]}
                y1={midY - y(hz.spread)}
                y2={midY + y(hz.spread)}
              />
              <circle className="horizon__dot" cx={positions[i]} cy={midY} r={4.5} />
              <text className="horizon__year" x={positions[i]} y={y0 + h + 30} textAnchor="middle">
                {hz.year}
              </text>
              <text
                className="horizon__status"
                x={positions[i]}
                y={y0 + h + 48}
                textAnchor="middle"
              >
                {STATUS_LABEL[hz.status]}
              </text>
            </g>
          ))}
        </g>
      </svg>

      <Tooltip hover={hover} frame={frame}>
        {hover && (
          <>
            <p className="chart-tip__title">
              {horizons[hover.index].year} · {STATUS_LABEL[horizons[hover.index].status]}
            </p>
            <p className="chart-tip__detail">{STATUS_NOTE[horizons[hover.index].status]}</p>
            <p className="chart-tip__detail">
              <strong>Can say:</strong> {horizons[hover.index].canSay}
            </p>
            <p className="chart-tip__detail">
              <strong>Cannot say:</strong> {horizons[hover.index].cannotSay}
            </p>
          </>
        )}
      </Tooltip>
    </ChartWithTable>
  );
}
