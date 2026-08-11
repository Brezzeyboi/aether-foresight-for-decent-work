/* ============================================================================
   Small visual forms that replace paragraphs.

   Each exists because a specific piece of prose in the research board was doing
   work a reader would absorb faster from a picture. They are deliberately small
   and unornamented: the point is a higher ratio of information to text, not more
   decoration.
   ============================================================================ */

import './small.css';

/* --- Trend --------------------------------------------------------------
   Three or four points where the DIRECTION is the finding.

   Replaces: the sentence explaining that employer-reported skill disruption ran
   57% in 2020, 44% in 2023 and 39% now. Read as a line, the deceleration is
   instant; read as a sentence, it takes a paragraph and is easy to miss. */

export interface TrendPoint {
  label: string;
  value: number;
}

export function Trend({
  points,
  unit = '%',
  note,
}: {
  points: readonly TrendPoint[];
  unit?: string;
  note?: string;
}) {
  const W = 460;
  const H = 148;
  const PAD = { top: 30, right: 26, bottom: 34, left: 26 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const max = Math.max(...points.map((p) => p.value));
  const min = Math.min(...points.map((p) => p.value));
  // Pad the domain so the line never touches the frame edge.
  const lo = Math.max(0, min - (max - min) * 0.55);
  const hi = max + (max - min) * 0.25;

  const x = (i: number) => PAD.left + (i / (points.length - 1)) * plotW;
  const y = (v: number) => PAD.top + plotH - ((v - lo) / (hi - lo)) * plotH;

  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(p.value)}`).join(' ');

  return (
    <figure className="trend">
      <svg
        className="trend__svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={points.map((p) => `${p.label}: ${p.value}${unit}`).join('. ')}
      >
        {/* Baseline only. A grid would add nothing to three points. */}
        <line
          className="trend__base"
          x1={PAD.left}
          x2={W - PAD.right}
          y1={PAD.top + plotH}
          y2={PAD.top + plotH}
        />
        <path className="trend__line" d={line} />
        {points.map((p, i) => (
          <g key={p.label}>
            <circle className="trend__dot" cx={x(i)} cy={y(p.value)} r={4} />
            <text className="trend__value" x={x(i)} y={y(p.value) - 13} textAnchor="middle">
              {p.value}
              {unit}
            </text>
            <text
              className="trend__label"
              x={x(i)}
              y={PAD.top + plotH + 18}
              textAnchor="middle"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
      {note && <figcaption className="trend__note">{note}</figcaption>}
    </figure>
  );
}

/* --- Gap ----------------------------------------------------------------
   Two states of the same thing, side by side, with the distance between them
   labelled.

   Replaces: the paragraph explaining that the AI Act requires human oversight
   while EU guidance documents a case where that oversight existed on paper and
   changed nothing. The gap between requirement and practice IS the finding, so
   it is drawn as a gap. */

export function Gap({
  left,
  right,
  gapLabel,
}: {
  left: { heading: string; label: string; items: readonly string[] };
  right: { heading: string; label: string; items: readonly string[] };
  gapLabel: string;
}) {
  return (
    <div className="gap">
      <section className="gap__side" data-side="required">
        <p className="gap__label">{left.label}</p>
        <h4 className="gap__heading">{left.heading}</h4>
        <ul className="gap__items">
          {left.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </section>

      <div className="gap__divide" aria-hidden="true">
        <span className="gap__divide-line" />
        <span className="gap__divide-label">{gapLabel}</span>
        <span className="gap__divide-line" />
      </div>

      <section className="gap__side" data-side="observed">
        <p className="gap__label">{right.label}</p>
        <h4 className="gap__heading">{right.heading}</h4>
        <ul className="gap__items">
          {right.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* --- Ratio --------------------------------------------------------------
   Two proportions compared as stacked area, where the comparison is the point
   and the absolute values are secondary.

   Replaces: the prose comparing exposure in female-dominated against
   male-dominated occupations. Two numbers in a sentence invite the reader to
   skim past; two bars of visibly different length do not. */

export function Ratio({
  rows,
  unit = '%',
  max,
}: {
  rows: readonly { label: string; value: number; sub?: string; emphasis?: boolean }[];
  unit?: string;
  max?: number;
}) {
  const ceiling = max ?? Math.max(...rows.map((r) => r.value));
  return (
    <div className="ratio">
      {rows.map((r) => (
        <div className="ratio__row" key={r.label} data-emphasis={r.emphasis || undefined}>
          <p className="ratio__label">{r.label}</p>
          <div className="ratio__track">
            <div
              className="ratio__fill"
              style={{ inlineSize: `${(r.value / ceiling) * 100}%` }}
            />
          </div>
          <p className="ratio__value">
            {r.value}
            {unit}
          </p>
          {r.sub && <p className="ratio__sub">{r.sub}</p>}
        </div>
      ))}
    </div>
  );
}
