/* TASK 3 — Job recommendations. Six careers, each labelled with how well the
   evidence actually supports it. Only one of the six is evidenced as growing,
   and the interface says so rather than presenting all six as equally solid. */

import { useState } from 'react';
import { Basis } from '../components/Basis.tsx';
import { Section } from '../components/Layout.tsx';
import { RouteHero } from '../components/RouteHero.tsx';
import { CAREERS } from '../data/profile.ts';
import { routeHref } from '../router.ts';
import './dash.css';

// Generated at development time and bundled locally; never fetched at runtime.
import heroImage from '../assets/hero-careers.webp';

export function Careers() {
  const [open, setOpen] = useState<string | null>(CAREERS[1].key);

  const growing = CAREERS.filter((c) => c.status === 'growing').length;

  return (
    <>
      <RouteHero
        src={heroImage}
        focus="34%"
        title="Which roles could actually fit me?"
        standfirst="Labelled by how strongly published projections support each one. Match scores are illustrative; the evidence labels are not."
        aside={
          <div className="stat">
            <p className="stat__value">
              {growing} of {CAREERS.length}
            </p>
            <p className="stat__label">
              appear by name in a published projection. The rest are reasoned from direction of
              travel.
            </p>
            <Basis basis="projection" source="wef-fojr-2025" />
          </div>
        }
      />

      <Section>
        <div className="cards" data-reveal-stagger>
          {CAREERS.map((c) => {
            const isOpen = open === c.key;
            return (
              <article className="card" key={c.key}>
                <div className="card__head">
                  <div>
                    <h2 className="card__title">{c.title}</h2>
                    <span className="pill" data-tone={c.status}>
                      {c.status}
                    </span>
                  </div>
                  <p className="card__score">{c.match}%</p>
                </div>

                <p className="card__text">{c.whyMatch}</p>

                <div className="card__meta">
                  <p className="card__meta-label">Skills you already have</p>
                  <div className="card__list">
                    {c.coreSkills.map((s) => (
                      <span className="tag" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="card__meta">
                  <p className="card__meta-label">Skills to develop</p>
                  <div className="card__list">
                    {c.develop.map((s) => (
                      <span className="tag" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="card__meta">
                  <p className="card__meta-label">AI exposure</p>
                  <span className="pill" data-tone={c.exposure}>
                    {c.exposure}
                  </span>
                  <p className="card__text">{c.exposureNote}</p>
                </div>

                <button
                  type="button"
                  className="card__more"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : c.key)}
                >
                  {isOpen ? '− Hide the evidence' : '+ What the evidence actually says'}
                </button>

                {isOpen && (
                  <div className="card__detail">
                    <p className="card__meta-label">Human advantage</p>
                    <p className="card__text">{c.humanAdvantage}</p>

                    <p className="card__meta-label">Nearest evidenced role</p>
                    <p className="card__text">{c.evidencedAdjacent}</p>

                    <p className="card__meta-label">Honest reading</p>
                    <p className="card__text">{c.evidenceNote}</p>

                    <a className="card__link" href={routeHref('learning')}>
                      See a learning pathway for this role →
                    </a>
                  </div>
                )}

                <Basis
                  basis={c.status === 'growing' ? 'projection' : 'assumption'}
                  source={c.status === 'growing' ? 'wef-fojr-2025' : 'internal'}
                />
              </article>
            );
          })}
        </div>
      </Section>

      <Section divided title="How to read these labels">
        <div className="figs" data-reveal-stagger>
          <div className="fig">
            <p className="fig__value">Growing</p>
            <p className="fig__statement">
              Named in a published projection. One of these six qualifies: climate technology, in
              both WEF and BLS rankings.
            </p>
          </div>
          <div className="fig">
            <p className="fig__value">Emerging</p>
            <p className="fig__statement">
              Plausible from direction of travel, but absent from every ranked list. Each card names
              the nearest evidenced role.
            </p>
          </div>
          <div className="fig">
            <p className="fig__value">Exposure</p>
            <p className="fig__statement">
              Task overlap with model capability. Not a prediction that the job disappears.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
