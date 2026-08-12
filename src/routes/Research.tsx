/* ============================================================================
   TASK 1 — Future Workforce Research Board

   A research publication in twelve numbered sections, rendered as one route so
   it reads as a publication and prints as one document.

   Every figure resolves through src/data/claims.ts, so nothing here can display
   a number without a source and a stated basis. Where the evidence is thin or
   sources disagree, the text says so: disagreement is content.
   ============================================================================ */

import { Basis } from '../components/Basis.tsx';
import { CLAIMS } from '../data/claims.ts';
import { DIMENSIONS, HORIZONS, SCENARIOS } from '../data/horizons.ts';
import { SOURCES, citeShort, type SourceId } from '../data/evidence.ts';
import { routeHref } from '../router.ts';
import { DivergingBars, HBars, ShareBar } from '../viz/Bars.tsx';
import { HorizonChart } from '../viz/Horizon.tsx';
import { Gap, Ratio, Trend } from '../viz/Small.tsx';
import {
  Caveat,
  Cite,
  Depth,
  Evidence,
  EvidenceRow,
  Finding,
  Matrix,
  ReportFigure,
  ReportSection,
  Prose,
} from './research/parts.tsx';
import './research/research.css';
import './research/opening.css';
import '../viz/small.css';

// Generated at development time, saved locally, and imported through the bundler
// so it is emitted as a hashed local asset. Nothing is fetched at runtime.
import openingImage from '../assets/opening-workbench.webp';

/* Counted from the registry rather than typed in, so the figure quoted in the
   contents and in section 12 can never drift from the list actually rendered
   below. `internal` is excluded here and in that list: it marks our own
   assumptions, not a published source. */
const SOURCE_IDS = (Object.keys(SOURCES) as SourceId[]).filter((id) => id !== 'internal');
const SOURCE_COUNT = SOURCE_IDS.length;

/* Contents doubles as an expectation-setter. Each entry says what the section
   answers and how long it is, so a reader can choose a path instead of being
   confronted with thirteen pages and no map. */
const CONTENTS = [
  ['01', 'What the evidence says', 'summary', 'The four findings, in one screen'],
  ['02', 'How far ahead we can see', 'transformation', 'Why 2045 is scenario space'],
  ['03', 'Which skills are moving', 'skills', 'Rising, declining, and the deceleration'],
  ['04', 'Where jobs actually grow', 'jobs', 'Two lists that barely overlap'],
  ['05', 'Replaced, or assisted', 'automation', 'The ILO revised its own estimate down'],
  ['06', 'What protects a worker', 'safety', 'One binding law, two recommendations'],
  ['07', 'Who gets left out', 'inclusion', 'Access comes before skills'],
  ['08', 'What it does to the economy', 'economy', 'Credible estimates disagree tenfold'],
  ['09', 'Three ways 2045 could go', 'scenarios', 'Conditions, not predictions'],
  ['10', 'What should be done', 'recommendations', 'Six, each tied to an evidence gap'],
  ['11', 'What it comes to', 'conclusion', 'A narrower claim than either side makes'],
  ['12', 'Where it all came from', 'sources', `${SOURCE_COUNT} sources, and what each cannot show`],
] as const;

export function Research() {
  return (
    <article className="report page">
      {/* Print-only running head. Paper needs orientation that the sticky
          masthead provides on screen. */}
      <div className="print-masthead">
        <span>AETHER · Foresight for Decent Work</span>
        <span>Future Workforce Research Board · 2026</span>
      </div>

      {/* The opening. Image and title share one frame, because the argument is
          about human work being reorganised rather than about technology. */}
      <header className="opening">
        <figure className="opening__figure">
          <img
            className="opening__image"
            src={openingImage}
            alt="A pair of hands resting on a workbench beside a partly disassembled mechanism, its components laid out in order."
            width={1536}
            height={1024}
            decoding="async"
          />
        </figure>

        <div className="opening__text">
          <h1 className="opening__title">
            Work is being taken apart and put back together. Not thrown away.
          </h1>
          <p className="opening__standfirst">
            What the research actually establishes about AI and work, what it projects to 2030, and
            why nobody credible forecasts 2045.
          </p>
        </div>
      </header>

      {/* Four figures at real scale, immediately. This is the layer that has to
          land in the first ten seconds; everything after it is optional. */}
      <section className="headline" aria-label="The four findings">
        <ol className="headline__list" data-reveal-stagger>
          {(
            [
              ['CLAIM-AUG-01', 'Assistance, not replacement', 'is the larger category, in every income group'],
              ['CLAIM-AUG-04', 'One worker in four', 'is in a job with any measurable AI exposure'],
              ['CLAIM-EMP-03', 'Net jobs still rising', 'on the most-cited projection to 2030'],
              ['CLAIM-SCEN-01', 'Nothing reaches 2045', 'the furthest credible projection stops at 2034'],
            ] as const
          ).map(([id, headline, tail], i) => {
            const c = CLAIMS[id];
            return (
              <li className="headline__item" key={id}>
                <p className="headline__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </p>
                {/* Numbers keep the full display scale; worded values step down
                    so a long single word cannot outgrow its column. */}
                <p className="headline__value" data-numeric={/\d/.test(c.value) || undefined}>
                  {c.value}
                </p>
                <p className="headline__claim">
                  <strong>{headline}</strong> {tail}
                </p>
                <Basis basis={c.basis} source={c.source} compact />
              </li>
            );
          })}
        </ol>
        <p className="headline__foot">
          Every figure in this publication carries its source and states whether it is measured
          data, a projection, a scenario, or an assumption made for this prototype. Where sources
          disagree, both are shown.
        </p>
      </section>

      {/* SDG alignment. Five targets, each quoted from the UN text rather than
          re-titled, and each paired with the official indicator where this report
          already reports the quantity that indicator measures. Naming the
          indicator is what makes the alignment checkable instead of asserted. */}
      <section className="sdg" aria-labelledby="sdg-title">
        <div className="sdg__mark" aria-hidden="true">
          <span className="sdg__number">8</span>
          <span className="sdg__name">
            Decent work and
            <br />
            economic growth
          </span>
        </div>
        <div className="sdg__body">
          <h2 className="sdg__title" id="sdg-title">
            Aligned with Sustainable Development Goal 8
          </h2>
          <p className="sdg__text">
            Goal 8 asks for sustained, inclusive and sustainable economic growth, full and productive
            employment, and decent work for all. Both halves matter here: this report argues about
            productivity as much as about jobs. Five targets are where it lands, and each is a place
            the evidence shows a gap rather than progress.
          </p>
          <dl className="sdg__targets">
            <div>
              <dt>
                8.2 <span className="sdg__quote">Higher levels of economic productivity through
                technological upgrading and innovation</span>
              </dt>
              <dd>
                Indicator 8.2.1 is output per worker, and that is exactly the quantity credible
                estimates disagree about by an order of magnitude. Section 08.
              </dd>
            </div>
            <div>
              <dt>
                8.3 <span className="sdg__quote">Encourage the formalization and growth of
                enterprises</span>
              </dt>
              <dd>
                Indicator 8.3.1 is the informal share of employment. 2.1 billion people work
                informally and sit outside every projection in this report. Sections 01 and 10.
              </dd>
            </div>
            <div>
              <dt>
                8.5 <span className="sdg__quote">Full and productive employment and decent work for
                all women and men, and equal pay for work of equal value</span>
              </dt>
              <dd>
                Indicator 8.5.2 is the unemployment rate. Exposure also falls unevenly by sex:
                female-dominated occupations are almost twice as exposed. Section 07.
              </dd>
            </div>
            <div>
              <dt>
                8.6 <span className="sdg__quote">Substantially reduce the proportion of youth NOT in
                employment, education or training</span>
              </dt>
              <dd>
                The only target here with a deadline already passed, 2020, and the share has since
                risen. The ILO flags AI as a risk factor for educated first-job seekers, and 11 in
                every 100 workers are projected to need training and not receive it. Sections 01
                and 10.
              </dd>
            </div>
            <div>
              <dt>
                8.8 <span className="sdg__quote">Protect labour rights and promote safe and secure
                working environments for all workers</span>
              </dt>
              <dd>
                Indicator 8.8.2 measures labour-rights compliance. Algorithmic management is
                spreading beyond platform work, and formal oversight can be substantively hollow.
                Section 06.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <nav className="report-contents" aria-label="Contents">
        <div className="report-contents__head">
          <h2 className="report-contents__title">Twelve sections</h2>
          <p className="report-contents__note">
            Each opens with its finding in one line. The full analysis sits behind a toggle, so the
            depth is there if you want it and out of the way if you do not.
          </p>
        </div>
        <ol className="report-contents__list">
          {CONTENTS.map(([n, title, id, gist]) => (
            <li className="report-contents__item" key={id}>
              <span className="report-contents__number">{n}</span>
              <a className="report-contents__link" href={routeHref('research', id)}>
                <span className="report-contents__link-title">{title}</span>
                <span className="report-contents__gist">{gist}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* 01 ---------------------------------------------------------------- */}
      <ReportSection
        number="01"
        id="summary"
        variant="spine"
        title="What the evidence says"
        standfirst="Four findings hold across the sources reviewed here."
        takeaway="Tasks are being reallocated inside jobs faster than jobs are being eliminated. That is well evidenced. What happens after 2030 is not."
      >
        <EvidenceRow ids={['CLAIM-AUG-02', 'CLAIM-EMP-08', 'CLAIM-EMP-04', 'CLAIM-SKILL-01']} />

        <Depth words={280}>
        <Prose>
          <p>
            Four findings hold across the sources reviewed here. First, exposure to generative AI is
            real but concentrated: around one in four workers globally is in an occupation with some
            exposure, and 24% of clerical tasks are highly exposed against 1% to 4% for every other
            broad occupational group <Cite id="CLAIM-AUG-02" />. Second, augmentation potential
            exceeds automation potential in every income group <Cite id="CLAIM-AUG-01" />, which
            inverts the assumption most public discussion begins from.
          </p>
          <p>
            Third, aggregate employment has not collapsed and is not projected to. Unemployment is
            projected stable near 4.9% <Cite id="CLAIM-EMP-08" />, and the most-cited employer
            projection for 2030 is net growth of 78 million jobs <Cite id="CLAIM-EMP-03" />. The
            disruption appears as churn, equal to 22% of formal jobs, and as pressure on job quality
            rather than on headline unemployment.
          </p>
          <p>
            Fourth, and most consequentially for a product about 2045:{' '}
            <strong>no institutional projection in this evidence base reaches past 2034</strong>{' '}
            <Cite id="CLAIM-SCEN-01" />. The ILO describes its own exposure classifications as only
            illustrative and as a static snapshot <Cite id="CLAIM-SCEN-02" />, and states that the
            outcomes of the transition are not predetermined because humans decide how to incorporate
            these technologies{' '}
            <Cite id="CLAIM-SCEN-04" />.
          </p>
        </Prose>
        </Depth>

        <Finding>
          The useful question is not whether a job survives, but which of its tasks change and what
          its holder learns next.
        </Finding>

        <Caveat label="What this summary does not claim">
          <p>
            That AI is harmless. Exposure is concentrated in clerical work, which is
            disproportionately performed by women: female-dominated occupations are almost twice as
            exposed as male-dominated ones <Cite id="CLAIM-DIV-09" />. Roughly 11 in every 100
            workers are projected to need training and not receive it <Cite id="CLAIM-SKILL-02" />,
            which converts to over 120 million people.
          </p>
          <p>
            That the aggregate figures describe everyone. The employer surveys behind most
            projections cover 1.2 billion formal jobs. Around 2.1 billion people work informally and
            are largely invisible to this evidence base <Cite id="CLAIM-EMP-09" />.
          </p>
        </Caveat>
      </ReportSection>

      {/* 02 ---------------------------------------------------------------- */}
      <ReportSection
        number="02"
        id="transformation"
        variant="figure"
        title="How far ahead we can see"
        standfirst="Certainty degrades with distance."
        takeaway="Published projections stop at 2034. Past that, this publication changes the register of its claims rather than extending the line."
      >
        {/* The signature figure, on the one inverted plate in the publication.
            It carries the argument the whole report rests on, so it gets the
            full width and the only tonal contrast in twelve sections. */}
        <div className="plate">
          <div className="plate__head">
            <h3 className="plate__title">Nobody can see 2045. The honest thing is to show where sight ends.</h3>
            <p className="plate__standfirst">
              The band is what can defensibly be said at each horizon. It widens because the range
              genuinely widens, and turns to texture where published evidence runs out and inference
              begins.
            </p>
          </div>

          <HorizonChart
            horizons={HORIZONS}
            onInk
            caption="Evidence status by horizon, 2026 to 2045, with what can and cannot be said at each"
          />

          <dl className="plate__key">
            <div className="plate__key-item">
              <span
                className="plate__key-swatch"
                style={{ background: 'var(--seq-100)' }}
                aria-hidden="true"
              />
              <dt className="plate__key-term">Measured</dt>
              <dd className="plate__key-def">Data already collected and published.</dd>
            </div>
            <div className="plate__key-item">
              <span
                className="plate__key-swatch"
                style={{ background: 'var(--seq-300)' }}
                aria-hidden="true"
              />
              <dt className="plate__key-term">Projection</dt>
              <dd className="plate__key-def">A source’s own forward estimate, to 2030.</dd>
            </div>
            <div className="plate__key-item">
              <span
                className="plate__key-swatch"
                style={{ background: 'var(--seq-400)' }}
                aria-hidden="true"
              />
              <dt className="plate__key-term">Extrapolation</dt>
              <dd className="plate__key-def">
                Ours, from direction of travel. No source’s authority.
              </dd>
            </div>
            <div className="plate__key-item">
              <span
                className="plate__key-swatch plate__key-swatch--textured"
                aria-hidden="true"
              />
              <dt className="plate__key-term">Scenario</dt>
              <dd className="plate__key-def">Conditional pathways. Not forecasts.</dd>
            </div>
          </dl>

          <p className="plate__foot">
            Hover or focus any horizon for what can and cannot be said at that point. The band’s
            vertical extent encodes how wide the range of defensible statements becomes; it is an
            illustration of uncertainty, not a measured confidence interval.
          </p>
        </div>

        <Depth words={150}>
          <Prose>
            <p>
              The four registers are not stylistic. At 2026 the sources report what they measured. At
              2030 they report what they model, and the WEF figures in particular are extrapolations
              from employer expectations rather than econometric forecasts. At 2035 nothing published
              reaches that far, so any statement is our own inference from direction of travel and
              carries no source's authority. At 2040 and beyond only conditional pathways are
              defensible.
            </p>
            <p>
              Two asymmetries run through every horizon and are permanent features of this evidence
              base rather than caveats to be noted once. The datasets see the formal-sector minority.
              And exposure is not job loss: it measures task overlap with model capability, which is
              the most commonly misread quantity in this field <Cite id="CLAIM-EMP-05" />.
            </p>
          </Prose>
        </Depth>

        <Matrix
          caption="Five dimensions of transformation, traced across the horizons. The verb register changes with the evidence: is, would, could."
          firstColumnHeader="Dimension"
          columns={[
            { key: 'near', header: 'Measured now' },
            { key: 'mid', header: 'Extrapolated' },
            { key: 'far', header: 'Scenario space' },
          ]}
          rows={DIMENSIONS.map((d) => ({
            key: d.dimension,
            header: d.dimension,
            cells: { near: d.near, mid: d.mid, far: d.far },
          }))}
        />
      </ReportSection>

      {/* 03 ---------------------------------------------------------------- */}
      <ReportSection
        number="03"
        id="skills"
        variant="spine"
        title="Which skills are moving"
        standfirst="Rising, declining, and a deceleration nobody expected."
        takeaway="Employers expect 39% of core skills to change by 2030. That figure has fallen from 57% in 2020, which is the more interesting finding."
      >
        <Evidence id="CLAIM-SKILL-01" emphasis />

        {/* The deceleration was a sentence containing three numbers. As a line it
            reads instantly, and the direction is the whole point. */}
        <ReportFigure
          title="Skill disruption is decelerating, not accelerating"
          help="Share of core skills employers expect to be transformed or outdated within five years, as reported in three successive editions of the same survey."
          sources={['CLAIM-SKILL-01']}
          note="If AI capability were driving skill disruption upward, this series would rise. Three points are a direction, not a trend."
        >
          <Trend
            unit="%"
            points={[
              { label: '2020', value: 57 },
              { label: '2023', value: 44 },
              { label: '2026', value: 39 },
            ]}
          />
        </ReportFigure>

        <Depth words={47}>
<Prose>
          <p>
            Fastest growing is not the same as most important. AI and big data lead the growth
            ranking <Cite id="CLAIM-SKILL-06" />, but analytical thinking remains the top core skill
            employers name, and what they describe wanting is technical and human skills together
            rather than one substituting for the other <Cite id="CLAIM-SKILL-08" />.
          </p>
        </Prose>
</Depth>

        <ReportFigure
          title="Which skills are employers adding, and which are they losing?"
          help="Net share of employers reporting each skill rising or declining in importance. Side of the axis carries the direction; colour is secondary."
          sources={['CLAIM-SKILL-06', 'CLAIM-SKILL-07']}
        >
          <DivergingBars
            caption="Net employer-reported change in skill importance to 2030"
            unit="%"
            positiveLabel="Rising"
            negativeLabel="Declining"
            data={[
              {
                label: 'AI and big data',
                value: 87,
                detail: 'The fastest-growing skill in the WEF survey.',
              },
              { label: 'Networks and cybersecurity', value: 70 },
              { label: 'Technological literacy', value: 68 },
              {
                label: 'Creative thinking',
                value: 66,
                detail: 'A human skill in the top five, alongside the technical ones.',
              },
              { label: 'Resilience and agility', value: 65 },
              { label: 'Curiosity and lifelong learning', value: 62 },
              {
                label: 'Manual dexterity and precision',
                value: -24,
                detail: 'The clearest declining category in the survey.',
              },
            ]}
          />
        </ReportFigure>

        <div className="evidence-row" data-reveal-stagger>
          <div className="evidence-row__item">
            <p className="evidence-row__value">{CLAIMS['CLAIM-SKILL-02'].value}</p>
            <p className="evidence-row__statement">{CLAIMS['CLAIM-SKILL-02'].statement}</p>
            <Basis basis="projection" source="wef-fojr-2025" compact />
          </div>
          <div className="evidence-row__item">
            <p className="evidence-row__value">{CLAIMS['CLAIM-SKILL-10'].value}</p>
            <p className="evidence-row__statement">{CLAIMS['CLAIM-SKILL-10'].statement}</p>
            <Basis basis="measured" source="oecd-eo-2025" compact />
          </div>
          <div className="evidence-row__item">
            <p className="evidence-row__value">{CLAIMS['CLAIM-SKILL-04'].value}</p>
            <p className="evidence-row__statement">{CLAIMS['CLAIM-SKILL-04'].statement}</p>
            <Basis basis="measured" source="wef-fojr-2025" compact />
          </div>
        </div>

        <Caveat>
          <p>
            The 39% is a share of skill <em>sets</em>, not of jobs. No measurement of AI literacy
            exists for any population, so nothing here supports a claim about population-level
            attainment. And no specific skill can be named as valuable in 2045: the boundary between
            complemented and substituted tasks moves with capability, and the ILO presents its own
            estimates of that boundary as a static snapshot <Cite id="CLAIM-SCEN-02" />.
          </p>
        </Caveat>
      </ReportSection>

      {/* 04 ---------------------------------------------------------------- */}
      <ReportSection
        number="04"
        id="jobs"
        variant="ledger"
        title="Where jobs actually grow"
        standfirst="Two lists of growing occupations that barely overlap."
        takeaway="Ranked by percentage, technology roles lead. Ranked by number of jobs, care and frontline work leads. Conflating the two is the standard error in careers advice."
      >
        <Depth words={91}>
<Prose>
          <p>
            Ranked by percentage growth, technology roles lead: Big Data Specialists, FinTech
            Engineers, AI and Machine Learning Specialists, Software Developers{' '}
            <Cite id="CLAIM-JOB-01" />. Ranked by absolute growth, frontline and care roles lead, and
            the driver is demography rather than AI <Cite id="CLAIM-JOB-02" />.
          </p>
          <p>
            The distinction is not academic. The two fastest-growing occupations in the US
            projections add fewer than 20,000 jobs combined, a caveat the Bureau of Labor Statistics
            supplies itself <Cite id="CLAIM-JOB-08" />. Meanwhile home health and personal care aides
            add 739,800 positions at a median wage of $34,900, against software developers at 267,700
            and $133,080 <Cite id="CLAIM-JOB-09" />.
          </p>
        </Prose>
</Depth>

        <Finding>
          Growth in jobs is not growth in good jobs, and percentage growth is not scale.
        </Finding>

        <ReportFigure
          title="Where is US employment actually growing in absolute terms?"
          help="Projected change in jobs, 2024 to 2034. Bar length is the number of new positions. Median pay is in the data table, because growth and quality are different questions."
          sources={['CLAIM-JOB-09', 'CLAIM-JOB-08']}
        >
          <HBars
            caption="Projected US employment change by occupation, 2024 to 2034, largest absolute growth"
            unit="thousands of jobs"
            format={(v) => `${v}k`}
            data={[
              {
                label: 'Home health and personal care aides',
                value: 740,
                emphasis: 'accent',
                detail: 'Median pay $34,900. The largest single source of new US employment.',
              },
              { label: 'Software developers', value: 268, detail: 'Median pay $133,080.' },
              { label: 'Stockers and order fillers', value: 235 },
              { label: 'Fast food and counter workers', value: 233 },
              { label: 'Cooks, restaurant', value: 217 },
              { label: 'Registered nurses', value: 166 },
              { label: 'General and operations managers', value: 164 },
            ]}
          />
        </ReportFigure>

        <Matrix
          caption="The six career categories this project's dashboard presents, assessed against the evidence. Only one has direct projection support."
          firstColumnHeader="Career"
          columns={[
            { key: 'status', header: 'Status' },
            { key: 'basis', header: 'Nearest evidenced role' },
            { key: 'note', header: 'Honest reading' },
          ]}
          rows={[
            {
              key: 'climate',
              header: 'Climate Technology Specialist',
              cells: {
                status: 'Growing',
                basis: 'Renewable Energy Engineers; wind turbine technicians +49.9%',
                note: 'The best evidenced of the six, in both WEF and BLS. Show absolute numbers beside the percentage or the small base misleads.',
              },
            },
            {
              key: 'safety',
              header: 'AI Safety Specialist',
              cells: {
                status: 'Emerging',
                basis: 'Information Security Analysts +29%',
                note: 'Strongest regulatory anchor of the six: the AI Act requires oversight by competent, trained, authorised persons. A legal mandate, but no projection counts these jobs.',
              },
            },
            {
              key: 'governance',
              header: 'AI Governance Specialist',
              cells: {
                status: 'Emerging',
                basis: 'Security Management Specialists',
                note: 'Rests on the same anchors as AI Safety Specialist. The evidence does not separate the two, so they should be merged or explicitly distinguished.',
              },
            },
            {
              key: 'hai',
              header: 'Human-AI Interaction Designer',
              cells: {
                status: 'Emerging',
                basis: 'UI and UX Designers',
                note: 'Best mechanistic case: interaction choices determine whether teaming gains or loses. But the standard levers, explanations and confidence displays, were insignificant across 370+ effect sizes.',
              },
            },
            {
              key: 'robotics',
              header: 'Robotics Systems Engineer',
              cells: {
                status: 'Emerging',
                basis: 'Autonomous and Electric Vehicle Specialists',
                note: '58% of employers expect robotics to transform their business. Countervailing: physical dexterity has repeatedly resisted automation.',
              },
            },
            {
              key: 'product',
              header: 'AI Product Designer',
              cells: {
                status: 'Emerging',
                basis: 'UI and UX Designers',
                note: 'Weakest of the six. Graphic designers are newly on the fastest-declining list with generative AI named as the cause, so design is not uniformly a growth area.',
              },
            },
          ]}
        />
      </ReportSection>

      {/* 05 ---------------------------------------------------------------- */}
      <ReportSection
        number="05"
        id="automation"
        variant="figure"
        title="Replaced, or assisted"
        standfirst="The distinction the ILO stopped treating as binary."
        takeaway="After two years of real-world use the ILO revised its own peak automation estimate down, from 0.9 to 0.76. Assistance is the larger category in every income group."
      >
        <Evidence id="CLAIM-AUG-06" emphasis />

        <Depth words={96}>
<Prose>
          <p>
            In 2023 the ILO's highest task-level automation score reached 0.9. In the 2025 refined
            index the highest is 0.76, with the highest occupational mean at 0.7{' '}
            <Cite id="CLAIM-AUG-06" />. Two years of real-world deployment caused the source to
            revise its own estimate downward. A source correcting itself after contact with reality
            is stronger evidence than either estimate alone.
          </p>
          <p>
            The same update replaced the binary automation-or-augmentation split with a four-gradient
            spectrum <Cite id="CLAIM-AUG-05" />. This has a direct design consequence for any product
            built on it: exposure should be rendered as gradient position with task-level variance,
            never as a safe-or-at-risk verdict.
          </p>
        </Prose>
</Depth>

        <ReportFigure
          title="How is global employment distributed across the exposure gradients?"
          help="Segments are an ordered sequence from no measurable exposure to the highest gradient, so the ramp runs light to dark. A 2px gap separates adjacent fills."
          sources={['CLAIM-AUG-04', 'CLAIM-AUG-07']}
          note="Gradient 4 is 3.3% of global employment, up from 2.3% in the previous edition despite lower task-level scores. Both movements are shown, because reporting either alone would mislead."
        >
          <ShareBar
            caption="Global employment by generative-AI exposure gradient"
            data={[
              {
                label: 'No measurable exposure',
                value: 75,
                detail: 'Roughly three quarters of global employment.',
              },
              { label: 'Gradient 1-2', value: 15, detail: 'Some task overlap, low intensity.' },
              {
                label: 'Gradient 3',
                value: 6.7,
                detail: 'Substantial overlap across several tasks.',
              },
              {
                label: 'Gradient 4',
                value: 3.3,
                detail: 'Highest exposure. Predominantly clerical occupations. Up from 2.3%.',
              },
            ]}
          />
        </ReportFigure>

        <ReportFigure
          title="Is exposure evenly spread across occupations?"
          help="Share of tasks rated highly exposed, by broad occupational group. The concentration is the finding."
          sources={['CLAIM-AUG-02']}
        >
          <HBars
            caption="Share of highly exposed tasks by occupational group"
            unit="% of tasks highly exposed"
            format={(v) => `${v}%`}
            data={[
              {
                label: 'Clerical support',
                value: 24,
                emphasis: 'accent',
                detail:
                  'Plus 58% at medium exposure. The only broad group with substantial high exposure.',
              },
              { label: 'Professionals', value: 4 },
              { label: 'Technicians', value: 3 },
              { label: 'Managers', value: 2 },
              { label: 'Service and sales', value: 2 },
              { label: 'Craft and trades', value: 1 },
              { label: 'Elementary occupations', value: 1 },
            ]}
          />
        </ReportFigure>

        <Caveat label="Where this reading is contested">
          <p>
            Two findings run against the augmentation-dominant reading and are stated rather than
            omitted. The share of employment in the highest gradient rose from 2.3% to 3.3% between
            editions <Cite id="CLAIM-AUG-07" />, and exposure expanded into strongly digitised
            professional and technical roles <Cite id="CLAIM-AUG-08" />. Every estimate here was also
            computed against 2023 to 2025 model generations.
          </p>
        </Caveat>
      </ReportSection>

      {/* 06 ---------------------------------------------------------------- */}
      <ReportSection
        number="06"
        id="safety"
        variant="quiet"
        title="What protects a worker"
        standfirst="One binding instrument, two recommendations, and a documented failure."
        takeaway="The EU AI Act makes workplace AI high-risk and requires a human who can override it. EU guidance also documents a case where that oversight existed on paper while the algorithm decided."
      >
        {/* Two paragraphs became a diagram, because the distance between what the
            law requires and what guidance observed IS the finding. */}
        <ReportFigure
          title="What the law requires, and what guidance found in practice"
          help="The EU AI Act is the only binding instrument in this evidence base. European Commission guidance documents what its requirements look like when they are met formally rather than substantively."
          sources={['CLAIM-GOV-01', 'CLAIM-GOV-02', 'CLAIM-GOV-03', 'CLAIM-GOV-04']}
        >
          <Gap
            gapLabel="the gap"
            left={{
              label: 'Required',
              heading: 'EU AI Act',
              items: [
                'Employment AI classified high-risk (Annex III)',
                'Human oversight with genuine override and stop (Art. 14)',
                'Automation bias named explicitly',
                'Workers and representatives informed before deployment (Art. 26)',
                'Oversight by persons with competence, training and authority',
              ],
            }}
            right={{
              label: 'Observed',
              heading: 'A documented pay-setting case',
              items: [
                'Oversight existed formally',
                'The algorithm effectively decided',
                'Appeals rarely changed the outcome',
              ],
            }}
          />
        </ReportFigure>

        <Finding>Compliance and control are not the same thing.</Finding>

        <Matrix
          caption="Governance instruments covering AI at work, with what each actually requires and its force."
          firstColumnHeader="Instrument"
          columns={[
            { key: 'force', header: 'Force' },
            { key: 'requires', header: 'Requires' },
            { key: 'limit', header: 'Limit' },
          ]}
          rows={[
            {
              key: 'eu',
              header: 'EU AI Act (2024/1689)',
              cells: {
                force: 'Binding law',
                requires:
                  'High-risk classification for employment AI. Human oversight with override. Pre-deployment worker notification. Log retention.',
                limit: 'EU-linked deployment only, in phased application.',
              },
            },
            {
              key: 'unesco',
              header: 'UNESCO Recommendation',
              cells: {
                force: 'Non-binding, all member states',
                requires:
                  'Redress mechanisms, auditability, prohibition where use would violate human rights. Suggests an AI Ethics Officer role.',
                limit: 'No enforcement mechanism.',
              },
            },
            {
              key: 'oecd',
              header: 'OECD AI Principles',
              cells: {
                force: 'Non-binding, 47 adherents',
                requires:
                  'Human agency and oversight safeguards. Labour rights named among risks requiring systematic management.',
                limit: 'A recommendation.',
              },
            },
            {
              key: 'ilo',
              header: 'ILO standards',
              cells: {
                force: 'No AI-specific instrument verified',
                requires: 'Research and calls for social dialogue on algorithmic management.',
                limit:
                  'No Convention or Recommendation specifically governing AI at work was found. Do not imply one exists.',
              },
            },
          ]}
        />

        <Depth words={59}>
<Prose>
          <p>
            The structural problem beneath the specific risks is information asymmetry. Algorithmic
            management concentrates knowledge and control on the employer's side, so workers are
            managed by a system whose logic they cannot see <Cite id="CLAIM-GOV-11" />. It is
            spreading beyond platform work into customer service, transport, logistics, banking and
            healthcare, and the ILO notes it does not require AI to operate{' '}
            <Cite id="CLAIM-GOV-09" />.
          </p>
        </Prose>
</Depth>

        <Caveat label="What cannot be quantified here">
          <p>
            No quantified rate of AI hiring bias exists in this evidence base. The Amazon recruiting
            case is a single documented instance from 2018, reported rather than studied, and is
            cited as illustration only <Cite id="CLAIM-GOV-12" />. No surveillance-prevalence figure
            exists for the general workforce: the 40% tracking figure covers surveyed freelance
            platform workers specifically <Cite id="CLAIM-GOV-10" />.
          </p>
          <p>
            Job quality and algorithmic management are measured at 2026 and nowhere else. There is no
            projection to extend, so this section cannot show a forward trajectory for its own
            subject matter.
          </p>
        </Caveat>
      </ReportSection>

      {/* 07 ---------------------------------------------------------------- */}
      <ReportSection
        number="07"
        id="inclusion"
        variant="spine"
        title="Who gets left out"
        standfirst="Access comes before skills."
        takeaway="2.2 billion people are offline. Every reskilling proposal assumes they are not, and training participation collapses with age."
      >
        <Evidence id="CLAIM-DIV-01" emphasis />

        <ReportFigure
          title="Who has the connectivity that reskilling assumes?"
          help="Share of population using the internet, by group. This is the floor beneath any digital-skills claim."
          sources={['CLAIM-DIV-02', 'CLAIM-DIV-03', 'CLAIM-DIV-04']}
        >
          <HBars
            caption="Internet use by country income group, settlement type and region"
            unit="% of population online"
            format={(v) => `${v}%`}
            max={100}
            data={[
              { label: 'High-income countries', value: 94 },
              { label: 'Urban areas', value: 85 },
              { label: 'World', value: 74, emphasis: 'accent' },
              { label: 'Rural areas', value: 58 },
              { label: 'Africa', value: 36 },
              {
                label: 'Low-income countries',
                value: 23,
                detail:
                  'A fourfold gap against high-income countries in the precondition for digital work.',
              },
            ]}
          />
        </ReportFigure>

        {/* Four paired numbers were buried in two paragraphs. Paired bars make the
            asymmetry visible without asking the reader to hold figures in mind. */}
        <ReportFigure
          title="Who carries the exposure, and who gets the training"
          help="Each pair compares the same measure across two groups. The mechanism behind the gender gap is occupational segregation, not capability."
          sources={['CLAIM-DIV-09', 'CLAIM-DIV-07', 'CLAIM-DIV-10', 'CLAIM-SKILL-10']}
        >
          <Ratio
            max={100}
            rows={[
              {
                label: 'Female-dominated occupations exposed',
                value: 29,
                emphasis: true,
                sub: 'Against 16% of male-dominated occupations',
              },
              { label: 'Male-dominated occupations exposed', value: 16 },
              {
                label: 'Women in the highest exposure gradient',
                value: 9.6,
                emphasis: true,
                sub: 'High-income countries. Against 3.5% of men',
              },
              { label: 'Men in the highest exposure gradient', value: 3.5 },
              {
                label: 'Women in the AI workforce',
                value: 30,
                sub: 'Progress has nearly stalled',
              },
              {
                label: 'Training participation, aged 25 to 44',
                value: 52,
                sub: 'Against roughly a third of those aged 60 to 65',
              },
              { label: 'Training participation, aged 60 to 65', value: 33, emphasis: true },
            ]}
          />
        </ReportFigure>

        <Depth words={26}>
<Prose>
          <p>
            This is why aggregate training figures are the wrong measure. Completion can rise while
            exclusion persists, so reach among currently-excluded groups is the honest metric{' '}
            <Cite id="CLAIM-SKILL-10" />.
          </p>
        </Prose>
</Depth>

        <Finding>
          The people whose work is most exposed to these systems are underrepresented among the
          people building them.
        </Finding>
      </ReportSection>

      {/* 08 ---------------------------------------------------------------- */}
      <ReportSection
        number="08"
        id="economy"
        variant="figure"
        title="What it does to the economy"
        standfirst="Credible estimates disagree by an order of magnitude."
        takeaway="The most rigorous sceptical estimate puts AI’s ten-year productivity gain at 0.66%. Ageing already measured twice that between 2000 and 2019, in the opposite direction."
      >
        {/* The two competing estimates, side by side. They are not contradictory,
            they measure different things, and showing them adjacent makes that
            legible faster than the paragraph explaining it did. */}
        <ReportFigure
          title="Two credible estimates, measuring different things"
          help="Both are sound. One models the whole economy over a decade; the other measures one occupation in one firm. Neither refutes the other, and quoting either alone misleads."
          sources={['CLAIM-ECON-01', 'CLAIM-ECON-02', 'CLAIM-RESK-02']}
        >
          <Gap
            gapLabel="different scopes"
            left={{
              label: 'Economy-wide, modelled',
              heading: '0.66% over ten years',
              items: [
                '0.66% total factor productivity, framed by its author as an upper bound',
                '0.53% once hard-to-learn tasks are counted',
                'GDP effect 0.93% to 1.16%, or 1.4% to 1.56% if investment responds',
                'Rests partly on assumptions the author labels speculative',
              ],
            }}
            right={{
              label: 'One occupation, measured',
              heading: '+15%, and +30% for the least experienced',
              items: [
                '5,172 customer support agents, one firm',
                'Small significant declines in quality for the most skilled',
                'A pre-2024 model and a single tool',
                'Strong identification, narrow scope',
              ],
            }}
          />
        </ReportFigure>

        <ReportFigure
          title="How large is the projected AI productivity effect, in context?"
          help="Annual percentage-point contribution to productivity growth. The demographic figure is measured; the AI figure is a projection, and its source's own upper bound."
          sources={['CLAIM-ECON-01', 'CLAIM-ECON-10']}
          note="Two different quantities share one axis deliberately: the comparison of scale is the point. Ageing is a measured drag, AI a projected gain."
        >
          <DivergingBars
            caption="Estimated annual percentage-point effects on productivity growth"
            unit="pp"
            positiveLabel="Adds to growth"
            negativeLabel="Subtracts from growth"
            data={[
              {
                label: 'AI, projected upper bound',
                value: 0.064,
                detail:
                  'Acemoglu: 0.66% total factor productivity over ten years, framed by the author as an upper bound.',
              },
              {
                label: 'Demographic ageing, measured 2000-2019',
                value: -0.13,
                detail:
                  'OECD estimate of the historical effect on productivity growth through reduced job-to-job mobility. Wages fell 0.10pp on the same estimate. Twice the projected AI gain, in the opposite direction.',
              },
            ]}
          />
        </ReportFigure>

        <Depth words={77}>
<Prose>
          <p>
            On distribution the reading is more consistent, and less comfortable. AI is not expected
            to reduce inequality on its own: no evidence of labour income inequality relief, a
            widening capital-labour gap, and small real wage declines projected for some groups{' '}
            <Cite id="CLAIM-ECON-04" />. The IMF's position runs both ways in a single sentence,
            which is itself informative <Cite id="CLAIM-ECON-06" />. Cross-country divergence is the
            more consistent warning: economies facing less immediate disruption are also least ready
            to capture the benefits <Cite id="CLAIM-DIV-12" />.
          </p>
        </Prose>
</Depth>

        <Caveat>
          <p>
            The IMF states directly that AI's exact economic implications are challenging to predict,
            comparing the uncertainty to past general-purpose technologies such as electricity{' '}
            <Cite id="CLAIM-ECON-07" />. The sceptical estimates exist in two live versions, 0.71% in
            the 2024 working paper and 0.66% in the 2025 published version, and must not be mixed in
            one chart. Consultancy projections widely circulated in this space were deliberately
            excluded.
          </p>
        </Caveat>
      </ReportSection>

      {/* 09 ---------------------------------------------------------------- */}
      <ReportSection
        number="09"
        id="scenarios"
        variant="ledger"
        title="Three ways 2045 could go"
        standfirst="Conditional pathways, with the conditions each one requires."
        takeaway="Assistance-led transformation is where the evidence points. Whether that turns out well depends on governance, not on the technology."
      >
        <Depth words={49}>
<Prose>
          <p>
            The three differ on two axes, chosen because the evidence identifies both as unresolved
            and consequential: where deployment lands in the task distribution, and whether
            governance and reskilling delivery are substantive or nominal. The method follows the
            ILO's own, mapping drivers onto job quantity, job quality and inequality{' '}
            <Cite id="CLAIM-SCEN-07" />.
          </p>
        </Prose>
</Depth>

        <div className="scenario-grid">
          {SCENARIOS.map((s) => (
            <section className="scenario-panel" key={s.id} data-support={s.support}>
              <header className="scenario-panel__head">
                <p className="scenario-panel__number">{s.number}</p>
                <h3 className="scenario-panel__name">{s.name}</h3>
                <p className="scenario-panel__premise">{s.premise}</p>
                <p className="scenario-panel__support">
                  {s.support === 'strongest'
                    ? 'Best supported as the direction of travel'
                    : s.support === 'moderate'
                      ? 'Best outcomes, weakest support for its central assumption'
                      : 'Least supported by the most recent revision, but not refuted'}
                </p>
              </header>

              <dl className="scenario-panel__dims">
                {s.dimensions.map((d) => (
                  <div className="scenario-panel__dim" key={d.name}>
                    <dt>{d.name}</dt>
                    <dd>{d.direction}</dd>
                  </div>
                ))}
              </dl>

              <Caveat label="Conditions this pathway requires">
                <p>{s.conditions}</p>
              </Caveat>

              <Caveat label="What it cannot support with evidence">
                <p>{s.unsupported}</p>
              </Caveat>

              <Caveat label="Observable before 2035">
                <ul className="scenario-panel__indicators">
                  {s.indicators.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </Caveat>

              <Basis basis="scenario" source="ilo-scenarios-2017" />
            </section>
          ))}
        </div>

        <Finding>
          Scenario 03 is where the direction of travel points. Scenario 01 is what would have to be
          added for that direction to be worth arriving at.
        </Finding>

        <Depth words={121}>
<Prose>
          <p>
            Stating a preference rather than treating the three as equally likely, because the
            evidence does lean and false balance is its own form of dishonesty. The strongest single
            reason: augmentation potential exceeds automation potential in every income group{' '}
            <Cite id="CLAIM-AUG-01" />, and the revision that mattered most went against the
            high-automation pathway, with the ILO lowering its own peak task scores after real-world
            experience <Cite id="CLAIM-AUG-06" />.
          </p>
          <p>
            But support for Scenario 03 as a <em>direction</em> says nothing about whether its
            outcomes are good. Its core mechanism, effective human-AI integration, is currently an
            evidence gap with a negative pooled synergy effect <Cite id="CLAIM-RESK-03" />. And
            collaboration-centred work is fully compatible with algorithmic management{' '}
            <Cite id="CLAIM-GOV-09" />, so its conditions outcome depends on governance rather than on
            the collaboration design itself.
          </p>
        </Prose>
</Depth>
      </ReportSection>

      {/* 10 ---------------------------------------------------------------- */}
      <ReportSection
        number="10"
        id="recommendations"
        variant="ledger"
        title="What should be done"
        standfirst="Six, each tied to a specific gap in the evidence."
        takeaway="The largest gap is that nobody has evaluated whether reskilling works. Every proposed response to AI and work assumes it does."
      >
        <ol className="recommendations">
          {[
            {
              title: 'Evaluate reskilling, do not just fund it',
              body: 'The largest single gap in this evidence base is that no rigorous outcome evaluation of reskilling exists: no completion rates against employment or earnings effects, no cost per successful transition. Every proposed response to AI and work assumes reskilling works. Nobody has shown it.',
            },
            {
              title: 'Measure training reach, not training volume',
              body: 'Aggregate completion has risen from 41% to 50% while participation among workers aged 60 to 65 remains around one third. Volume can rise while exclusion persists, so reach among currently-excluded groups is the honest metric.',
            },
            {
              title: 'Treat oversight as a competence question',
              body: 'From December 2027 the AI Act will require oversight by persons with competence, training and authority. Commission guidance already documents what happens without it: formal review while the algorithm decides. Audit whether override actually changes outcomes, not whether a review step exists.',
            },
            {
              title: 'Publish exposure as gradient, never as verdict',
              body: 'The ILO abandoned the binary automation split for a four-step gradient. Any tool presenting a worker with a safe-or-at-risk judgement is misrepresenting the underlying research.',
            },
            {
              title: 'Fund replication of human-AI collaboration research',
              body: 'The meta-analytic finding that combinations underperform the better of human or AI alone covers studies up to June 2023. Whether it holds for current model generations is the single most decision-relevant open question in this field.',
            },
            {
              title: 'Extend measurement to informal work',
              body: 'Around 2.1 billion people work informally and are largely invisible to the employer surveys that produce most projections. Conclusions drawn from 1.2 billion formal jobs should not be stated as conclusions about work.',
            },
          ].map((r, i) => (
            <li className="recommendation" key={r.title}>
              <p className="recommendation__number" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </p>
              <div>
                <h3 className="recommendation__title">{r.title}</h3>
                <p className="recommendation__body">{r.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </ReportSection>

      {/* 11 ---------------------------------------------------------------- */}
      <ReportSection
        number="11"
        id="conclusion"
        variant="spine"
        title="What it comes to"
        standfirst="A narrower claim than either optimists or pessimists usually make."
        takeaway="Tasks are being reallocated faster than jobs are being eliminated, the effects are concentrated rather than general, and 2045 is unknowable. The narrowness is the useful part."
      >
        <Prose>
          <p>
            What the research establishes is that tasks are being reallocated faster than occupations
            are being eliminated, that augmentation is the larger category in every income group, and
            that the effects are concentrated rather than general. What it does not establish is
            anything about 2045. The furthest institutional projection reviewed here reaches 2034, and
            the ILO presents its own exposure estimates as a static snapshot rather than a trajectory.
          </p>
          <p>
            That combination is not a failure of the research. It is the finding. The outcomes of this
            transition are not predetermined, because humans decide how to incorporate these
            technologies and need to guide the transition <Cite id="CLAIM-SCEN-04" />. Which means the
            question worth putting to a person deciding what to learn is not what the future holds,
            but which tasks in their work are changing and what judgement they are building.
          </p>
          <p>
            There is a second reading of that. If the outcome is decided by people rather than by the
            technology, then the thing to measure is not only how much work gets done but whether the
            person doing it can still question a decision made about them. The evidence says that is
            where the pathways actually diverge: oversight can exist on paper while the system decides{' '}
            <Cite id="CLAIM-GOV-04" />, and a worker cannot contest what they cannot inspect{' '}
            <Cite id="CLAIM-GOV-09" />. Productivity is the easier thing to count. Dignity is the
            thing that has to be designed in, and it is the part no projection will deliver on its
            own.
          </p>
        </Prose>

        <Finding>
          Every confident claim about the workforce of 2045 is either a scenario wearing a forecast's
          clothes, or an invention. What is not a scenario is the choice: whether the systems built
          between now and then leave the people inside them able to be heard.
        </Finding>
      </ReportSection>

      {/* 12 ---------------------------------------------------------------- */}
      <ReportSection
        number="12"
        id="sources"
        variant="quiet"
        title="Where it all came from"
        standfirst="Every figure resolves to an entry below."
        takeaway={`${SOURCE_COUNT} sources, chosen for institutional authority and retrieved directly. Each entry states what it is good for and where it stops.`}
      >
        <Prose>
          <p>
            Sources were selected for institutional authority and retrieved directly. Consultancy
            projections widely circulated in this field were deliberately excluded in favour of
            intergovernmental, statistical-office and peer-reviewed material. Each entry notes what
            the source is authoritative for and where it stops, because most misreadings in this field
            come from stretching a source past its own stated scope.
          </p>
          <p>
            Figures are transcribed to the source's own precision. Where a source revised its own
            estimate between editions, the revision is recorded as a finding rather than silently
            updated. Where sources disagree, both are shown.
          </p>
        </Prose>

        <ul className="source-list">
          {SOURCE_IDS
            .map((id) => {
              const s = SOURCES[id];
              return (
                <li className="source-list__item" key={id}>
                  <p className="source-list__org">{s.org}</p>
                  <p className="source-list__title">
                    {s.title} ({s.year})
                  </p>
                  <p className="source-list__scope">{s.scope}</p>
                  <a className="source-list__url" href={s.url}>
                    {s.url}
                  </a>
                </li>
              );
            })}
        </ul>

        <div className="method-note">
          <h3 className="subhead">How the basis labels work</h3>
          <p className="method-note__text">
            Every figure in AETHER carries one of these four labels.
          </p>
          <dl className="method-note__list">
            <div>
              <dt>
                <Basis basis="measured" />
              </dt>
              <dd>Observed data, already collected and published by the cited source.</dd>
            </div>
            <div>
              <dt>
                <Basis basis="projection" />
              </dt>
              <dd>
                A modelled forward estimate published by the cited source, sensitive to its
                assumptions.
              </dd>
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
              <dd>Our own assumption for this prototype, carried by no external source.</dd>
            </div>
          </dl>
          <p className="method-note__text">
            The full evidence base, including supporting quotations, methodological caveats, and the
            list of figures that could <strong>not</strong> be verified, is maintained alongside this
            publication. That unverified list is load-bearing: it records what this project is not
            allowed to claim. Sources are cited in the form {citeShort('ilo-wp140')}.
          </p>
        </div>
      </ReportSection>
    </article>
  );
}
