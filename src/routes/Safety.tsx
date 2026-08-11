/* TASK 3 — Safety indicators. Seven workplace risks, each with a level, why it
   matters, and what reduces it. The tone is responsibility rather than fear:
   every risk names a real mitigation, and the one binding law is cited. */

import { useState } from 'react';
import { Basis } from '../components/Basis.tsx';
import { ScreenHeader, Section } from '../components/Layout.tsx';
import { RISKS } from '../data/risks.ts';
import './dash.css';

export function Safety() {
  const [open, setOpen] = useState<string | null>(RISKS[0].key);
  const serious = RISKS.filter((r) => r.level === 'high' || r.level === 'elevated').length;

  return (
    <>
      <ScreenHeader
        title="What could go wrong for workers?"
        standfirst="Seven documented risks, each with what reduces it. The levels are our assessment; the findings under them are cited."
        aside={
          <div className="stat">
            <p className="stat__value">
              {serious} of {RISKS.length}
            </p>
            <p className="stat__label">
              rated elevated or high. The EU AI Act is the only binding protection here.
            </p>
            <Basis basis="measured" source="eu-ai-act" />
          </div>
        }
      />

      <Section>
        <ol className="rows">
          {RISKS.map((r) => {
            const isOpen = open === r.key;
            return (
              <li className="row" key={r.key} data-open={isOpen || undefined}>
                <button
                  type="button"
                  className="row__head row__head--risk"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : r.key)}
                >
                  <span className="row__name">{r.label}</span>
                  <span className="pill" data-tone={r.level}>
                    <span aria-hidden="true">{r.glyph}</span> {r.level}
                  </span>
                  <span className="row__gist">{r.gist}</span>
                  <span className="row__mark" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="row__body">
                    <div>
                      <p className="row__label">Why it matters</p>
                      <p className="row__text">{r.why}</p>
                      <Basis basis={r.basis} source={r.source} />
                    </div>
                    <div>
                      <p className="row__label">What reduces it</p>
                      <p className="row__text">{r.mitigation}</p>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </Section>

      <Section divided title="How these levels work">
        <div className="figs" data-reveal-stagger>
          <div className="fig">
            <p className="fig__value">Never colour alone</p>
            <p className="fig__statement">
              Each level carries a glyph and a word, so meaning survives colourblindness and
              greyscale.
            </p>
          </div>
          <div className="fig">
            <p className="fig__value">Our assessment</p>
            <p className="fig__statement">
              Our reading, not a published risk register. Each one cites the finding it rests on, so
              you can check it.
            </p>
          </div>
          <div className="fig">
            <p className="fig__value">Always a mitigation</p>
            <p className="fig__statement">
              Every risk here names something that reduces it.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
