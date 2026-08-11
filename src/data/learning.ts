/* Learning pathways for the Learning screen.

   Stage ordering is the substance: each stage exists because it makes the next
   one possible, and each ends in something built rather than something watched.

   Week counts are illustrative and carry the assumption basis. No source
   publishes reskilling durations, and the evidence base explicitly contains no
   evaluation of reskilling outcomes at all. */

export interface Stage {
  name: string;
  weeks: number;
  skills: readonly string[];
  prerequisite: string;
  project: string;
  outcome: string;
}

export interface Pathway {
  career: string;
  stages: readonly Stage[];
}

export const PATHWAYS: readonly Pathway[] = [
  {
    career: 'AI Safety Specialist',
    stages: [
      {
        name: 'Foundations',
        weeks: 4,
        skills: ['Systems thinking', 'Technical writing'],
        prerequisite: 'None. Start here.',
        project: 'Document how one system you use makes a decision that affects someone.',
        outcome: 'Describe a system as a set of decisions, not a black box.',
      },
      {
        name: 'AI fundamentals',
        weeks: 6,
        skills: ['AI literacy', 'Model limitations'],
        prerequisite: 'Foundations. Describe a system before critiquing one.',
        project: 'Find three cases where a model is confidently wrong. Record how you caught each.',
        outcome: 'Judge when a model output can be relied on. The core skill of this role.',
      },
      {
        name: 'Data literacy',
        weeks: 5,
        skills: ['Data literacy', 'Statistical reasoning'],
        prerequisite: 'AI fundamentals.',
        project: 'Trace a published statistic to source. Write down what it does not say.',
        outcome: 'Read a claim and name the evidence it would need.',
      },
      {
        name: 'Governance and law',
        weeks: 6,
        skills: ['Regulatory knowledge', 'Ethical reasoning'],
        prerequisite: 'Data literacy.',
        project: 'Assess a real workplace system against Article 14 of the EU AI Act.',
        outcome: 'Say what a specific law requires of a specific system.',
      },
      {
        name: 'Audit methods',
        weeks: 6,
        skills: ['Audit design', 'Evidence handling'],
        prerequisite: 'Governance and law.',
        project: 'Design an audit testing whether human override changes outcomes.',
        outcome: 'Test a system instead of trusting its documentation.',
      },
      {
        name: 'Project experience',
        weeks: 10,
        skills: ['Applied judgement', 'Communication'],
        prerequisite: 'Audit methods.',
        project: 'Review one system fully. Present findings to someone who can act.',
        outcome: 'Show work, not a certificate.',
      },
      {
        name: 'Career ready',
        weeks: 4,
        skills: ['Portfolio', 'Interviewing'],
        prerequisite: 'A completed project.',
        project: 'Write up two reviews as a portfolio, with what you would change.',
        outcome: 'Apply to oversight roles with evidence you can defend.',
      },
    ],
  },
  {
    career: 'Climate Technology Specialist',
    stages: [
      {
        name: 'Foundations',
        weeks: 4,
        skills: ['Systems thinking', 'Energy basics'],
        prerequisite: 'None.',
        project: 'Map where your building’s electricity comes from and what it costs.',
        outcome: 'Explain an energy system end to end.',
      },
      {
        name: 'Energy systems',
        weeks: 8,
        skills: ['Generation and storage', 'Grid fundamentals'],
        prerequisite: 'Foundations.',
        project: 'Size a solar and storage system for a real building using its usage data.',
        outcome: 'Do the arithmetic this work mostly consists of.',
      },
      {
        name: 'Data literacy',
        weeks: 5,
        skills: ['Data literacy', 'Measurement'],
        prerequisite: 'Energy systems.',
        project: 'Analyse a year of consumption data. Find the three biggest inefficiencies.',
        outcome: 'Back a recommendation with measurement, not intuition.',
      },
      {
        name: 'Deployment practice',
        weeks: 8,
        skills: ['Installation basics', 'Site assessment'],
        prerequisite: 'Data literacy.',
        project: 'Document a real installation. Record what differed from the plan.',
        outcome: 'Know why site reality beats specification. The part AI cannot do.',
      },
      {
        name: 'Coordination',
        weeks: 6,
        skills: ['Stakeholder coordination', 'Communication'],
        prerequisite: 'Deployment practice.',
        project: 'Write a proposal persuading a non-technical decision maker to fund a retrofit.',
        outcome: 'Move a project through an organisation, not just design it.',
      },
      {
        name: 'Project experience',
        weeks: 10,
        skills: ['Delivery', 'Applied judgement'],
        prerequisite: 'Coordination.',
        project: 'Take one small retrofit from assessment to measured result.',
        outcome: 'Point at a finished thing with numbers attached.',
      },
      {
        name: 'Career ready',
        weeks: 4,
        skills: ['Portfolio', 'Certification'],
        prerequisite: 'A delivered project.',
        project: 'Assemble measured before-and-after results into a portfolio.',
        outcome: 'Apply into the fastest-growing US occupational group.',
      },
    ],
  },
  {
    career: 'Human-AI Interaction Designer',
    stages: [
      {
        name: 'Foundations',
        weeks: 4,
        skills: ['Design fundamentals', 'Observation'],
        prerequisite: 'None.',
        project: 'Watch three people use the same tool. Record where each hesitates.',
        outcome: 'See a workflow, not an interface.',
      },
      {
        name: 'AI fundamentals',
        weeks: 6,
        skills: ['AI literacy', 'Failure modes'],
        prerequisite: 'Foundations.',
        project: 'Catalogue how one AI feature fails, and how a user would find out.',
        outcome: 'Design around what a model does, not what it claims.',
      },
      {
        name: 'Task allocation',
        weeks: 6,
        skills: ['Task analysis', 'Judgement design'],
        prerequisite: 'AI fundamentals.',
        project: 'Split a real task between person and model. Test whether the split helped.',
        outcome: 'Decide who holds final say. The research says that variable decides everything.',
      },
      {
        name: 'Evaluation methods',
        weeks: 6,
        skills: ['Evaluation', 'Data literacy'],
        prerequisite: 'Task allocation.',
        project: 'Measure whether your split beat person-alone and model-alone. Report it either way.',
        outcome: 'Test a collaboration claim. Pooled evidence currently shows combinations losing.',
      },
      {
        name: 'Interface craft',
        weeks: 6,
        skills: ['Interaction design', 'Prototyping'],
        prerequisite: 'Evaluation methods.',
        project: 'Build a working prototype of the better-performing split.',
        outcome: 'Ship something usable, not a mockup.',
      },
      {
        name: 'Project experience',
        weeks: 10,
        skills: ['Applied design', 'Communication'],
        prerequisite: 'Interface craft.',
        project: 'Run one design through to measured outcomes with real users.',
        outcome: 'Show that a design decision improved a result.',
      },
      {
        name: 'Career ready',
        weeks: 4,
        skills: ['Portfolio', 'Case writing'],
        prerequisite: 'A measured project.',
        project: 'Write two cases showing your allocation decisions and their measured effects.',
        outcome: 'Apply into UX and product roles, the nearest evidenced category.',
      },
    ],
  },
];
