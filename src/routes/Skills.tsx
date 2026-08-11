/* TASK 3 — Skill tracker. Eight skills ordered by gap, largest first: the order
   is the advice. Capability is fictional; relevance traces to the evidence. */

import { useState } from 'react';
import { Basis } from '../components/Basis.tsx';
import { ScreenHeader, Section } from '../components/Layout.tsx';
import { CLAIMS, type ClaimId } from '../data/claims.ts';
import { SKILLS, type Skill } from '../data/profile.ts';
import './dash.css';

// Employer demand on a 0-100 axis. Our translation, hence the assumption basis.
const RELEVANCE: Record<Skill['relevance'], number> = {
  'very high': 92,
  high: 80,
  rising: 68,
  stable: 55,
};

export function Skills() {
  const [open, setOpen] = useState<string | null>(SKILLS[0].key);

  const rows = SKILLS.map((s) => ({
    ...s,
    need: RELEVANCE[s.relevance],
    gap: RELEVANCE[s.relevance] - s.level,
  }));

  return (
    <>
      <ScreenHeader
        title="Which of my skills will still matter?"
        standfirst="Ordered by the distance between capability now and where employer demand is heading. Start at the top."
        aside={
          <div className="stat">
            <p className="stat__value">{rows[0].gap}</p>
            <p className="stat__label">
              point gap in {rows[0].label}, the largest here
            </p>
            <Basis basis="assumption" source="internal" />
          </div>
        }
      />

      <Section>
        <ol className="rows">
          {rows.map((s) => {
            const isOpen = open === s.key;
            return (
              <li className="row" key={s.key} data-open={isOpen || undefined}>
                <button
                  type="button"
                  className="row__head"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : s.key)}
                >
                  <span className="row__name">{s.label}</span>
                  <span className="bar">
                    <span className="bar__fill" style={{ inlineSize: `${s.level}%` }} />
                    {s.gap > 0 && (
                      <span
                        className="bar__gap"
                        style={{ insetInlineStart: `${s.level}%`, inlineSize: `${s.gap}%` }}
                      />
                    )}
                    <span className="bar__need" style={{ insetInlineStart: `${s.need}%` }} />
                  </span>
                  <span className="row__num">{s.level}</span>
                  <span className="pill" data-tone={s.relevance.replace(' ', '-')}>
                    {s.relevance}
                  </span>
                  <span className="row__mark" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="row__body">
                    <div>
                      <p className="row__label">Why it matters</p>
                      <p className="row__text">{s.why}</p>
                      <Basis
                        basis={CLAIMS[s.relevanceBasis as ClaimId].basis}
                        source={CLAIMS[s.relevanceBasis as ClaimId].source}
                      />
                    </div>
                    <div>
                      <p className="row__label">One concrete next step</p>
                      <p className="row__text">{s.improve}</p>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <p className="key">
          <span className="key__item">
            <span className="key__swatch key__swatch--fill" /> Capability now
          </span>
          <span className="key__item">
            <span className="key__swatch key__swatch--gap" /> Gap to demand
          </span>
          <span className="key__item">
            <span className="key__swatch key__swatch--need" /> Employer demand
          </span>
        </p>
      </Section>

      <Section divided title="What the evidence says about skills generally">
        <div className="figs" data-reveal-stagger>
          {(['CLAIM-SKILL-01', 'CLAIM-SKILL-06', 'CLAIM-SKILL-10'] as const).map((id) => {
            const c = CLAIMS[id];
            return (
              <div className="fig" key={id}>
                <p className="fig__value">{c.value}</p>
                <p className="fig__statement">{c.statement}</p>
                <Basis basis={c.basis} source={c.source} />
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
