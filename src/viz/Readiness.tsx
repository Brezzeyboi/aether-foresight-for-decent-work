/* ============================================================================
   The workforce readiness visualisation.

   This is the first thing a judge sees, so it has one job: show a composite
   score AND immediately explain what it is made of.

   Why not a donut or a gauge: a single ring can show 78/100 but it cannot show
   WHY, and the why is the useful part. This form plots each dimension against
   the demand for it, so the reader sees the shape of a person rather than a
   grade. The widest gap is the advice.

   Encoding:
     bar length   current capability
     notch        how much the evidence says that dimension matters
     gap fill     the distance between them, in clay where capability trails
   ============================================================================ */

import { useState } from 'react';
import { Basis } from '../components/Basis.tsx';
import type { ReadinessDimension } from '../data/profile.ts';
import './readiness.css';

interface ReadinessProps {
  score: number;
  dimensions: readonly ReadinessDimension[];
  /** Demand level per dimension key, 0-100, from employer-reported evidence. */
  demand: Record<string, number>;
}

export function Readiness({ score, dimensions, demand }: ReadinessProps) {
  const [open, setOpen] = useState<string | null>(dimensions[dimensions.length - 1]?.key ?? null);

  return (
    <div className="readiness">
      <div className="readiness__score">
        <p className="readiness__figure">
          {score}
          <span className="readiness__denominator">/100</span>
        </p>
        <p className="readiness__label">Workforce readiness</p>
        <p className="readiness__note">
          A composite of the five dimensions below, weighted evenly. Illustrative:
          it describes this demonstration profile, not a measured population.
        </p>
        <Basis basis="assumption" source="internal" />
      </div>

      <ul className="readiness__dims">
        {dimensions.map((d) => {
          const need = demand[d.key] ?? 0;
          const gap = need - d.score;
          const isOpen = open === d.key;

          return (
            <li className="readiness__dim" key={d.key} data-open={isOpen || undefined}>
              <button
                type="button"
                className="readiness__row"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : d.key)}
              >
                <span className="readiness__name">{d.label}</span>

                <span className="readiness__track">
                  {/* Capability. */}
                  <span
                    className="readiness__bar"
                    style={{ inlineSize: `${d.score}%` }}
                    aria-hidden="true"
                  />
                  {/* The shortfall, drawn only where demand exceeds capability, so
                      a gap is visible as a thing rather than inferred from two
                      numbers. */}
                  {gap > 0 && (
                    <span
                      className="readiness__gap"
                      style={{
                        insetInlineStart: `${d.score}%`,
                        inlineSize: `${gap}%`,
                      }}
                      aria-hidden="true"
                    />
                  )}
                  {/* Demand notch. */}
                  <span
                    className="readiness__need"
                    style={{ insetInlineStart: `${need}%` }}
                    aria-hidden="true"
                  />
                </span>

                <span className="readiness__value">{d.score}</span>
              </button>

              {isOpen && (
                <div className="readiness__detail">
                  <dl className="readiness__facts">
                    <div>
                      <dt>What it measures</dt>
                      <dd>{d.meaning}</dd>
                    </div>
                    <div>
                      <dt>This profile</dt>
                      <dd>{d.reading}</dd>
                    </div>
                    <div>
                      <dt>Demand</dt>
                      <dd>
                        {need >= 85
                          ? 'Very high in employer-reported demand'
                          : need >= 70
                            ? 'High in employer-reported demand'
                            : 'Rising in employer-reported demand'}
                        {gap > 0 ? `. Capability trails demand by ${gap} points.` : '. Capability meets demand.'}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <p className="readiness__key">
        <span className="readiness__key-item">
          <span className="readiness__key-bar" aria-hidden="true" /> Current capability
        </span>
        <span className="readiness__key-item">
          <span className="readiness__key-gap" aria-hidden="true" /> Shortfall against demand
        </span>
        <span className="readiness__key-item">
          <span className="readiness__key-need" aria-hidden="true" /> Employer-reported demand
        </span>
      </p>
    </div>
  );
}
