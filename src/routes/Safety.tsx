/* TASK 3 — Safety indicators. Seven workplace risks, each with a level, why it
   matters, and what reduces it. The tone is responsibility rather than fear:
   every risk names a real mitigation, and the one binding law is cited. */

import { useState } from 'react';
import { Basis } from '../components/Basis.tsx';
import { Section } from '../components/Layout.tsx';
import { RouteHero } from '../components/RouteHero.tsx';
import { RISKS } from '../data/risks.ts';
import './dash.css';

// Generated at development time and bundled locally; never fetched at runtime.
import heroImage from '../assets/hero-safety.webp';

export function Safety() {
  const [open, setOpen] = useState<string | null>(RISKS[0].key);
  const serious = RISKS.filter((r) => r.level === 'high' || r.level === 'elevated').length;

  return (
    <>
      <RouteHero
        src={heroImage}
        focus="32%"
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

      {/* Four of the risks above describe systems that profile and rank people.
          AETHER is one of those systems, so the same list is turned on it here.
          Listing risks in other people's software while exempting your own is the
          failure this section exists to avoid. */}
      <Section divided title="These risks apply to AETHER too">
        <p className="lead">
          This product scores a person out of 100 and ranks careers by a match percentage. Four risks
          on this page describe exactly that kind of system, so here is where each one lands.
        </p>
        <ul className="rows">
          <li className="row">
            <div className="row__body">
              <div>
                <p className="row__label">Hiring and evaluation bias</p>
                <p className="row__text">
                  A readiness score invites being read as a verdict on a person. Every score here is
                  labelled a design assumption rather than a measurement, and the match percentages
                  are illustrative. What is not illustrative is the growing or emerging label: that
                  one is tied to whether a projection names the role.
                </p>
              </div>
              <div>
                <p className="row__label">Information asymmetry</p>
                <p className="row__text">
                  Being ranked by logic you cannot see is the risk. Every figure states its basis and
                  names its source, the scoring weights are in the open, and the assistant shows the
                  retrieval steps behind each answer.
                </p>
              </div>
              <div>
                <p className="row__label">Hollow oversight</p>
                <p className="row__text">
                  A tool that cannot be argued with has no real oversight. Nothing here decides
                  anything about anyone. It has no authority over a real application, no employer
                  sees it, and disagreeing with a ranking costs the reader nothing.
                </p>
              </div>
              <div>
                <p className="row__label">Over-reliance on AI output</p>
                <p className="row__text">
                  The evidence on this page says human-AI pairs often do worse than the better of the
                  two alone, and worst on decision tasks. Choosing a career is a decision task, which
                  is why this is written to inform a choice rather than make one.
                </p>
              </div>
              <div>
                <p className="row__label">What it never collects</p>
                <p className="row__text">
                  No account, no login, no analytics, no network requests. The profile is composite
                  and fictional. Nothing is stored, because there is nothing to store.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </Section>
    </>
  );
}
