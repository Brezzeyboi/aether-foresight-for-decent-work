/* ============================================================================
   TASK 3 — Dashboard entry point.

   This screen decides whether a judge takes the project seriously, so it answers
   three questions in order and then stops:

     1. What is this?                   the name, and one sentence
     2. Where does this person stand?   the readiness figure and its five parts
     3. What else can it tell me?       the five areas, each with its question

   Nothing here is decorative. The five area cards are the competition's five
   required dashboard features, introduced by what they answer rather than by
   what they are called.
   ============================================================================ */

import { Basis, EvidenceFigure } from '../components/Basis.tsx';
import { Grid, Panel, ScreenHeader, Section } from '../components/Layout.tsx';
import { CLAIMS } from '../data/claims.ts';
import { PROFILE } from '../data/profile.ts';
import { routeHref, type Route } from '../router.ts';
import { Readiness } from '../viz/Readiness.tsx';
import './overview.css';

/* Employer-reported demand per readiness dimension, 0-100.

   These are our own translation of the evidence onto a comparable scale, so they
   carry the assumption basis: the underlying claims are real, but converting
   "fastest-growing skill" into a number on a 100-point axis is a modelling
   choice of ours, not something any source publishes. */
const DEMAND: Record<string, number> = {
  ai: 92, // AI and big data is the fastest-growing skill (CLAIM-SKILL-06)
  human: 88, // growing roles need technical AND human skills (CLAIM-SKILL-08)
  adaptability: 86, // 39% of core skills expected to change (CLAIM-SKILL-01)
  digital: 80, // demand shifting toward digital (CLAIM-SKILL-09)
  career: 74, // 59 in 100 need training by 2030 (CLAIM-SKILL-02)
};

const AREAS: {
  route: Route;
  label: string;
  question: string;
  answer: string;
  metric: string;
}[] = [
  {
    route: 'skills',
    label: 'Skill tracker',
    question: 'Which of my skills will still matter?',
    answer: 'Eight skills, capability now against employer demand. Largest gap: AI literacy.',
    metric: '8 skills tracked',
  },
  {
    route: 'careers',
    label: 'Job recommendations',
    question: 'Which roles could actually fit me?',
    answer: 'Six careers, each labelled by how well the evidence supports it. One is evidenced as growing.',
    metric: '6 careers, 1 evidenced growing',
  },
  {
    route: 'safety',
    label: 'Safety indicators',
    question: 'What could go wrong for workers?',
    answer: 'Seven risks by likelihood and severity, each with what the law requires and what mitigates it.',
    metric: '7 risks assessed',
  },
  {
    route: 'learning',
    label: 'Learning pathways',
    question: 'What do I actually do next?',
    answer: 'A staged route to a chosen career, with a project at each stage.',
    metric: '7 stages per pathway',
  },
  {
    route: 'economy',
    label: 'Economic impact',
    question: 'What could all this mean at scale?',
    answer: 'Three 2045 pathways across six dimensions, with the conditions each requires.',
    metric: '3 scenarios',
  },
];

export function Overview() {
  return (
    <>
      <ScreenHeader
        title="Understand where work is going. Prepare for where you want to be."
        standfirst="AETHER connects published workforce research to one person's position, and states the basis for every figure."
        aside={
          <div className="overview__aside">
            <p className="overview__aside-label">
              Enters work {PROFILE.entersWork} &middot; mid-career {PROFILE.midCareerBy}
            </p>
            <p className="overview__aside-name">{PROFILE.name}</p>
            <p className="overview__aside-context">
              {PROFILE.position}. {PROFILE.context}.
            </p>
            <p className="overview__aside-framing">{PROFILE.framing}</p>
            <Basis basis="assumption" source="internal" />
          </div>
        }
      />

      <Section id="readiness">
        <Readiness score={PROFILE.readiness} dimensions={PROFILE.dimensions} demand={DEMAND} />
      </Section>

      {/* The evidence this profile sits inside. Three figures, so a judge sees
          immediately that the product is grounded in research rather than in
          invented scoring. */}
      <Section
        divided
        title="The workforce this profile is entering"
        standfirst="Three findings that set the context for everything on this screen."
      >
        <Grid cols={3} min="17rem">
          {(['CLAIM-AUG-01', 'CLAIM-SKILL-02', 'CLAIM-SCEN-01'] as const).map((id) => {
            const c = CLAIMS[id];
            return (
              <EvidenceFigure
                key={id}
                value={c.value}
                label={c.statement}
                basis={c.basis}
                source={c.source}
                note={c.note}
                size="md"
              />
            );
          })}
        </Grid>
      </Section>

      <Section
        divided
        id="areas"
        title="What this system can tell you"
        standfirst="Five areas, each answering one question. Every figure in them carries its source."
      >
        <ul className="areas" data-reveal-stagger>
          {AREAS.map((a, i) => (
            <li className="area" key={a.route}>
              <a className="area__link" href={routeHref(a.route)}>
                <span className="area__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="area__body">
                  <span className="area__question">{a.question}</span>
                  <span className="area__label">{a.label}</span>
                  <span className="area__answer">{a.answer}</span>
                  <span className="area__metric">{a.metric}</span>
                </span>
                <span className="area__go" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {/* The honesty statement, on the entry screen rather than buried in a
          footer. It is the product's main claim to credibility. */}
      <Section divided>
        <Panel tone="sunken">
          <div className="honesty">
            <div>
              <h2 className="subhead">Every number here says how it is known</h2>
              <p className="honesty__text">
                Four labels, one on every figure in the product.
              </p>
            </div>
            <dl className="honesty__list">
              <div>
                <dt>
                  <Basis basis="measured" />
                </dt>
                <dd>Data already collected and published.</dd>
              </div>
              <div>
                <dt>
                  <Basis basis="projection" />
                </dt>
                <dd>A source's own forward estimate. Sensitive to its assumptions.</dd>
              </div>
              <div>
                <dt>
                  <Basis basis="scenario" />
                </dt>
                <dd>A conditional pathway. Not a forecast.</dd>
              </div>
              <div>
                <dt>
                  <Basis basis="assumption" />
                </dt>
                <dd>Ours, for this prototype. Carried by no source.</dd>
              </div>
            </dl>
          </div>
        </Panel>
      </Section>
    </>
  );
}
