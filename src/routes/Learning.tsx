/* TASK 3 — Learning pathways. Pick a target career, get a staged route. Each
   stage expands to skills, prerequisites, a project, and an outcome. */

import { useState } from 'react';
import { Basis } from '../components/Basis.tsx';
import { Section } from '../components/Layout.tsx';
import { RouteHero } from '../components/RouteHero.tsx';
import { PATHWAYS } from '../data/learning.ts';
import './dash.css';

// Generated at development time and bundled locally; never fetched at runtime.
import heroImage from '../assets/hero-learning.webp';

export function Learning() {
  const [career, setCareer] = useState(PATHWAYS[0].career);
  const [stage, setStage] = useState<number | null>(0);

  const path = PATHWAYS.find((p) => p.career === career) ?? PATHWAYS[0];
  const totalWeeks = path.stages.reduce((n, s) => n + s.weeks, 0);

  return (
    <>
      <RouteHero
        src={heroImage}
        focus="40%"
        title="What do I actually do next?"
        standfirst="A staged route to a chosen role. Each stage makes the next possible, and each ends in something built."
        aside={
          <div className="stat">
            <p className="stat__value">{Math.round(totalWeeks / 4)} months</p>
            <p className="stat__label">
              part-time for {path.career}. Illustrative, not a promise.
            </p>
            <Basis basis="assumption" source="internal" />
          </div>
        }
      />

      <Section>
        <div className="picker" role="group" aria-label="Choose a target career">
          {PATHWAYS.map((p) => (
            <button
              key={p.career}
              type="button"
              className="picker__btn"
              data-active={p.career === career || undefined}
              aria-pressed={p.career === career}
              onClick={() => {
                setCareer(p.career);
                setStage(0);
              }}
            >
              {p.career}
            </button>
          ))}
        </div>

        <ol className="path">
          {path.stages.map((s, i) => {
            const isOpen = stage === i;
            return (
              <li className="path__stage" key={s.name} data-open={isOpen || undefined}>
                <button
                  type="button"
                  className="path__head"
                  aria-expanded={isOpen}
                  onClick={() => setStage(isOpen ? null : i)}
                >
                  <span className="path__index" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="path__name">{s.name}</span>
                  <span className="path__weeks">{s.weeks} weeks</span>
                  <span className="row__mark" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="path__body">
                    <div>
                      <p className="row__label">Skills built</p>
                      <div className="card__list">
                        {s.skills.map((k) => (
                          <span className="tag" key={k}>
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="row__label">Needs first</p>
                      <p className="row__text">{s.prerequisite}</p>
                    </div>
                    <div>
                      <p className="row__label">Build this</p>
                      <p className="row__text">{s.project}</p>
                    </div>
                    <div>
                      <p className="row__label">You can then</p>
                      <p className="row__text">{s.outcome}</p>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </Section>

      <Section divided title="One thing the evidence does not support">
        <div className="figs" data-reveal-stagger>
          <div className="fig">
            <p className="fig__value">No proof</p>
            <p className="fig__statement">
              No evaluation of reskilling outcomes exists here: no completion rates against
              earnings, no cost per transition. The need is evidenced. The solutions are not.
            </p>
          </div>
          <div className="fig">
            <p className="fig__value">59 in 100</p>
            <p className="fig__statement">
              Workers projected to need training by 2030, of whom 11 are unlikely to receive it.
            </p>
          </div>
          <div className="fig">
            <p className="fig__value">Continuous</p>
            <p className="fig__statement">
              The most-trained sectors report the largest remaining need. A career habit, not a
              one-time course.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
