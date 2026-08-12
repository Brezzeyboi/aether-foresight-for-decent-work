/* TASK 3 — Economic impact. Three 2045 pathways, compared across six dimensions.

   Outcomes are directional and comparative, never absolute figures, because no
   source publishes 2045 economics. Selecting a scenario switches the whole
   comparison, so the reader compares pathways rather than reading three lists. */

import { useState } from 'react';
import { Basis } from '../components/Basis.tsx';
import { Section } from '../components/Layout.tsx';
import { RouteHero } from '../components/RouteHero.tsx';
import { SCENARIOS } from '../data/horizons.ts';
import { routeHref } from '../router.ts';
import './dash.css';

// Generated at development time and bundled locally; never fetched at runtime.
import heroImage from '../assets/hero-economy.webp';

export function Economy() {
  const [active, setActive] = useState(SCENARIOS[2].id);
  const scenario = SCENARIOS.find((s) => s.id === active) ?? SCENARIOS[2];

  return (
    <>
      <RouteHero
        src={heroImage}
        focus="56%"
        title="What could all this mean at scale?"
        standfirst="Three pathways to 2045, each with the conditions it needs and what it cannot support. Conditional routes, not forecasts."
        aside={
          <div className="stat">
            <p className="stat__value">2034</p>
            <p className="stat__label">
              is as far as any published projection reaches. Past it is scenario space.
            </p>
            <Basis basis="measured" source="ilo-wp118" />
          </div>
        }
      />

      <Section>
        <div className="picker" role="group" aria-label="Choose a scenario">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              className="picker__btn"
              data-active={s.id === active || undefined}
              aria-pressed={s.id === active}
              onClick={() => setActive(s.id)}
            >
              <span className="picker__num">{s.number}</span> {s.name}
            </button>
          ))}
        </div>

        <div className="scenario">
          <header className="scenario__head">
            <div>
              <h2 className="scenario__name">{scenario.name}</h2>
              <p className="scenario__premise">{scenario.premise}</p>
            </div>
            <p className="scenario__support" data-support={scenario.support}>
              {scenario.support === 'strongest'
                ? 'Best supported as the direction of travel'
                : scenario.support === 'moderate'
                  ? 'Best outcomes, weakest support for its central assumption'
                  : 'Least supported by the most recent revision, but not refuted'}
            </p>
          </header>

          <dl className="scenario__dims">
            {scenario.dimensions.map((d) => (
              <div className="scenario__dim" key={d.name}>
                <dt>{d.name}</dt>
                <dd>{d.direction}</dd>
              </div>
            ))}
          </dl>

          <div className="scenario__notes">
            <div>
              <p className="row__label">Conditions this pathway requires</p>
              <p className="row__text">{scenario.conditions}</p>
            </div>
            <div>
              <p className="row__label">What it cannot support with evidence</p>
              <p className="row__text">{scenario.unsupported}</p>
            </div>
          </div>

          <div className="scenario__indicators">
            <p className="row__label">Observable before 2035, so this is testable</p>
            <ul className="ind">
              {scenario.indicators.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>

          <Basis basis="scenario" source="ilo-scenarios-2017" />
        </div>
      </Section>

      <Section divided title="Why there are no numbers on this screen">
        <div className="figs" data-reveal-stagger>
          <div className="fig">
            <p className="fig__value">0.66%</p>
            <p className="fig__statement">
              The most rigorous sceptical estimate of AI productivity gain over ten years, framed by
              its author as an upper bound.
            </p>
            <Basis basis="projection" source="acemoglu-2025" />
          </div>
          <div className="fig">
            <p className="fig__value">−0.13pp</p>
            <p className="fig__statement">
              Annual drag on OECD productivity from ageing, measured over 2000 to 2019 through
              reduced job mobility. Twice the projected AI gain, in the opposite direction.
            </p>
            <Basis basis="measured" source="oecd-eo-2025" />
          </div>
          <div className="fig">
            <p className="fig__value">Hard to predict</p>
            <p className="fig__statement">
              The IMF says so directly, comparing the uncertainty to electricity.
            </p>
            <Basis basis="measured" source="imf-genai-2024" />
          </div>
        </div>
        <p className="scenario__foot">
          Full reasoning, including which pathway the evidence favours and why, is in{' '}
          <a href={routeHref('research', 'scenarios')}>section 09 of the research board</a>.
        </p>
      </Section>
    </>
  );
}
