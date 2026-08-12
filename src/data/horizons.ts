/* ============================================================================
   The 2026 to 2045 transformation model.

   The structure encodes the project's central discipline: certainty degrades with
   distance, and the verb register changes with it.

     2026  measured        is, has
     2030  projection      is projected to
     2035  extrapolation   would, on current direction of travel  (OURS, no source)
     2040  scenario        could, if
     2045  scenario        could, if

   `spread` is the cone's vertical half-width in the horizon chart. It is an
   illustrative encoding of how wide the range of defensible statements becomes,
   NOT a quantitative confidence interval. Marked as an assumption wherever the
   chart is captioned.
   ============================================================================ */

import type { Horizon } from '../viz/Horizon.tsx';
import type { Basis, SourceId } from './evidence.ts';

export const HORIZONS: readonly Horizon[] = [
  {
    year: 2026,
    status: 'measured',
    spread: 0.08,
    canSay:
      'One in four workers has some generative-AI exposure. Unemployment is stable near 4.9%. Exposure concentrates in clerical work.',
    cannotSay: 'That any measured job losses are down to AI. No source measures this.',
  },
  {
    year: 2030,
    status: 'projection',
    spread: 0.3,
    canSay:
      'Employers expect 170 million jobs created and 92 million displaced, a net gain of 78 million, and 39% of core skills to change.',
    cannotSay:
      'That these figures will occur. They are survey extrapolations across 1.2 billion formal jobs.',
  },
  {
    year: 2035,
    status: 'extrapolation',
    spread: 0.58,
    canSay:
      'On current direction of travel, task reallocation within occupations would continue to outpace whole-occupation elimination.',
    cannotSay:
      'Any figure at all. No published projection reaches 2035. This horizon is our inference.',
  },
  {
    year: 2040,
    status: 'scenario',
    spread: 0.82,
    canSay:
      'Which pathway is unfolding could be identified from leading indicators observable before 2035.',
    cannotSay: 'Which pathway will occur, or that any named occupation will or will not exist.',
  },
  {
    year: 2045,
    status: 'scenario',
    spread: 1,
    canSay:
      'Three conditional pathways can be described, with the conditions each requires stated explicitly.',
    cannotSay:
      'Anything quantitative. Outcomes depend on deployment and policy choices not yet made.',
  },
];

/* --- The three scenarios -------------------------------------------------
   Rendered as small multiples, one panel each. Identity comes from panel
   position, a direct label, and texture angle, never from hue: this is what
   keeps the product clear of the categorical colour gate that the mineral
   accent cannot pass.

   Eight dimensions, and the last two are deliberate. Productivity and job counts
   are what this field usually measures; whether a worker can question a decision
   about them, and see the reasoning behind it, is what decides whether the work
   is dignified. Both are anchored to cited claims, so dignity is compared across
   pathways on evidence rather than asserted as a value. */

export interface ScenarioDimension {
  name: string;
  /** Direction relative to the other scenarios. Never an absolute figure. */
  direction: string;
  /** Which claim anchors this direction, if any. */
  anchor?: string;
}

export interface Scenario {
  id: string;
  number: string;
  name: string;
  /** One-line characterisation. */
  premise: string;
  /** The conditions this pathway requires. */
  conditions: string;
  /** What it requires that the evidence cannot support. Stated, not hidden. */
  unsupported: string;
  dimensions: readonly ScenarioDimension[];
  /** Observable before 2035, so the scenario is testable rather than decorative. */
  indicators: readonly string[];
  /** Relative evidentiary support for this as the direction of travel. */
  support: 'strongest' | 'moderate' | 'contested';
}

export const SCENARIOS: readonly Scenario[] = [
  {
    id: 'responsible',
    number: '01',
    name: 'Responsible AI Adoption',
    premise:
      'Adoption is deliberate and governed, and reskilling reaches the people currently excluded.',
    conditions:
      'High-risk rules spread beyond the EU. Oversight is substantive. Training reaches the 11 in 100 projected to miss out. Connectivity improves.',
    unsupported:
      'That reskilling at scale works. No outcome evaluation exists: no completion rates against earnings, no cost per transition. The largest gap here.',
    dimensions: [
      {
        name: 'Productivity',
        direction: 'Higher than Scenario 02 on welfare, plausibly lower on measured output',
        anchor: 'CLAIM-ECON-03',
      },
      {
        name: 'Job transformation',
        direction: 'Task reallocation dominant, whole-occupation displacement lower',
        anchor: 'CLAIM-AUG-01',
      },
      {
        name: 'New occupations',
        direction: 'Concentrated in governance, oversight and assurance functions',
        anchor: 'CLAIM-GOV-03',
      },
      {
        name: 'Reskilling demand',
        direction: 'Highest of the three, and continuous rather than one-time',
        anchor: 'CLAIM-RESK-10',
      },
      {
        name: 'Inequality',
        direction: 'Narrower divergence than the alternatives, but not reduced',
        anchor: 'CLAIM-ECON-04',
      },
      {
        name: 'Workplace conditions',
        direction: 'Better on transparency and recourse',
        anchor: 'CLAIM-GOV-02',
      },
      {
        name: 'Voice and recourse',
        direction: 'Override and appeal change outcomes, because compliance is enforced',
        anchor: 'CLAIM-GOV-02',
      },
      {
        name: 'Legibility of decisions',
        direction: 'A worker can inspect the logic that ranked them',
        anchor: 'CLAIM-GOV-06',
      },
    ],
    indicators: [
      'High-risk AI requirements adopted in jurisdictions beyond the EU',
      'Enforcement actions or documented remediation, not compliance paperwork alone',
      'Override and appeal rates that actually change outcomes',
      'Training completion rising among the 60-65 cohort, not just in aggregate',
      'Publication of the first credible reskilling outcome evaluations',
    ],
    support: 'moderate',
  },
  {
    id: 'automation',
    number: '02',
    name: 'High Automation',
    premise:
      'Capability advances into hard-to-learn tasks, and deployment optimises for substitution.',
    conditions:
      'Capability generalises to context-dependent tasks. Deployment targets the 33% that is high-exposure, low-complementarity. Governance stays gapped.',
    unsupported:
      'That capability generalises to hard tasks. Real-world use cut the ILO’s peak scores from 0.9 to 0.76. But top-gradient share did rise, 2.3% to 3.3%.',
    dimensions: [
      {
        name: 'Productivity',
        direction: 'Higher measured output, weaker translation into welfare',
        anchor: 'CLAIM-ECON-05',
      },
      {
        name: 'Job transformation',
        direction: 'Whole-occupation displacement highest, concentrated in clerical work',
        anchor: 'CLAIM-JOB-03',
      },
      {
        name: 'New occupations',
        direction: 'Fewer relative to displacement, more of contested social value',
        anchor: 'CLAIM-ECON-05',
      },
      {
        name: 'Reskilling demand',
        direction: 'Highest in volume, lowest in delivery',
        anchor: 'CLAIM-SKILL-03',
      },
      {
        name: 'Inequality',
        direction: 'Diverging most sharply, on capital-labour, cross-country and gender lines',
        anchor: 'CLAIM-DIV-09',
      },
      {
        name: 'Workplace conditions',
        direction: 'Worst of the three. Algorithmic management extends beyond platforms',
        anchor: 'CLAIM-GOV-09',
      },
      {
        name: 'Voice and recourse',
        direction: 'Weakest. Oversight exists on paper while the system effectively decides',
        anchor: 'CLAIM-GOV-04',
      },
      {
        name: 'Legibility of decisions',
        direction: 'Lowest. A worker cannot contest what they cannot inspect',
        anchor: 'CLAIM-GOV-09',
      },
    ],
    indicators: [
      'Skill instability rising back past 39%, breaking the 57 to 44 to 39 deceleration',
      'A second and third non-clerical occupation entering the fastest-declining list',
      'ILO’s next revision moving peak task scores back up toward 0.9',
      'Gradient-4 employment share rising materially above 3.3%',
      'Employer downsizing intentions rising above 41% while reskilling intent falls from 77%',
    ],
    support: 'contested',
  },
  {
    id: 'collaboration',
    number: '03',
    name: 'Human-AI Collaboration',
    premise: 'Work is reorganised around task-level complementarity rather than substitution.',
    conditions:
      'Deployment targets augmentation and the high-complementarity 27% of advanced-economy employment. Needs working human-AI integration.',
    unsupported:
      'That the synergy problem gets solved. The pooled effect is negative, g = −0.23, and the most-proposed fix has 3 studies. An open question.',
    dimensions: [
      {
        name: 'Productivity',
        direction: 'Gains concentrated in creation work, not decision work',
        anchor: 'CLAIM-RESK-05',
      },
      {
        name: 'Job transformation',
        direction: 'Highest role redefinition, lowest role elimination',
        anchor: 'CLAIM-AUG-04',
      },
      {
        name: 'New occupations',
        direction: 'Collaboration design, workflow integration, interaction design',
        anchor: 'CLAIM-RESK-06',
      },
      {
        name: 'Reskilling demand',
        direction: 'High, and weighted toward judgement rather than tool operation',
        anchor: 'CLAIM-RESK-06',
      },
      {
        name: 'Inequality',
        direction: 'Genuinely contested. Within-firm compression evidenced, macro-level not',
        anchor: 'CLAIM-RESK-02',
      },
      {
        name: 'Workplace conditions',
        direction: 'Better only if governance is substantive. Not automatic',
        anchor: 'CLAIM-GOV-09',
      },
      {
        name: 'Voice and recourse',
        direction: 'Depends entirely on governance. The technology does not decide this',
        anchor: 'CLAIM-GOV-04',
      },
      {
        name: 'Legibility of decisions',
        direction: 'Better where work is designed around complementarity, not substitution',
        anchor: 'CLAIM-GOV-06',
      },
    ],
    indicators: [
      'Replication of the synergy findings against post-2023 models, the most informative indicator',
      'Delegation studies moving the effect to a confidence interval excluding zero',
      'The +15% and +30% productivity findings replicating outside single-firm settings',
      'Interaction-design roles appearing by name in a WEF or BLS ranked list',
      'Whether the decision-task penalty persists',
    ],
    support: 'strongest',
  },
];

/* --- Transformation dimensions across horizons -------------------------- */

export interface DimensionTrace {
  dimension: string;
  question: string;
  near: string;
  mid: string;
  far: string;
}

export const DIMENSIONS: readonly DimensionTrace[] = [
  {
    dimension: 'Automation',
    question: 'Which tasks get done by machines?',
    near: 'Clerical work: 24% of clerical tasks highly exposed, against 1-4% elsewhere.',
    mid: 'Would extend into digitised professional and technical roles.',
    far: 'Could reach context-dependent judgement, or stall there. The ILO offers its estimates as a static snapshot, not a trajectory.',
  },
  {
    dimension: 'Augmentation',
    question: 'Where do humans work with AI?',
    near: 'Larger in every income group: 10.4% to 13.4% potential against 0.4% to 5.5% for automation.',
    mid: 'Would stay the dominant effect.',
    far: 'Could become the organising principle of work, if integration methods are found.',
  },
  {
    dimension: 'Human-AI collaboration',
    question: 'Does the combination actually work?',
    near: 'Combinations beat humans alone, g = +0.64, but underperform the better of the two, g = −0.23.',
    mid: 'Depends on solving the synergy problem. Currently unsolved.',
    far: 'Could deliver broad gains, or stay confined to creative work if the decision penalty holds.',
  },
  {
    dimension: 'Skill demand',
    question: 'What is worth learning?',
    near: 'AI and big data fastest-growing. Analytical thinking still the top core skill.',
    mid: 'Would shift further toward judgement about when to rely on a system.',
    far: 'No skill can be named as valuable in 2045. The boundary moves with capability.',
  },
  {
    dimension: 'Work quality',
    question: 'What are conditions like?',
    near: 'Algorithmic management spreading beyond platforms. 2.1 billion in informal work. Stability called fragile.',
    mid: 'No published projection exists. Measured at 2026 and nowhere else.',
    far: 'Could improve with real oversight, or worsen under nominal compliance. Governance decides, not technology.',
  },
];

/* --- Report figure helper ------------------------------------------------ */

export interface ReportFigure {
  value: string;
  label: string;
  basis: Basis;
  source: SourceId;
  note?: string;
}
