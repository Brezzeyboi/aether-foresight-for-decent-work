/* ============================================================================
   TASK 2 — AETHER AI script.

   A scripted assistant, and honest about it. Every response is written here in
   advance; nothing is generated, nothing is fetched, nothing waits on a model.

   The design goal is that it should NOT look like a chat app. Responses are
   structured cards with figures, basis chips, and links into the dashboard,
   because the point is a specialised workforce instrument rather than a
   general-purpose chatbot.

   The flow follows the required demo path:
     open -> career recommendation -> matches -> a career -> skill gaps
       -> learning path -> AI exposure -> safety considerations
   ============================================================================ */

import type { Basis, SourceId } from './evidence.ts';
import type { Route } from '../router.ts';

/** A block inside a response. The variety is what keeps it from reading as chat. */
export type Block =
  | { kind: 'text'; text: string }
  | { kind: 'figures'; items: readonly { value: string; label: string; basis: Basis; source: SourceId }[] }
  | {
      kind: 'matches';
      items: readonly { title: string; score: number; status: string; why: string }[];
    }
  | { kind: 'gaps'; items: readonly { skill: string; now: number; needed: number }[] }
  | { kind: 'steps'; items: readonly { name: string; detail: string }[] }
  | { kind: 'risks'; items: readonly { label: string; level: string; note: string }[] }
  | { kind: 'note'; text: string }
  | { kind: 'link'; route: Route; label: string };

export interface Response {
  /** What the assistant is doing, shown while the scripted delay runs. */
  working: string;
  blocks: readonly Block[];
  /** Follow-up prompts offered as buttons after this response. */
  next: readonly string[];
}

export interface Prompt {
  id: string;
  /** The question as the user would ask it. */
  text: string;
  response: Response;
}

export const OPENING: Response = {
  working: 'Loading demonstration profile',
  blocks: [
    {
      kind: 'text',
      text: 'I work from one profile at a time. This session uses a demonstration profile, so nothing here is a real person.',
    },
    {
      kind: 'figures',
      items: [
        { value: '78/100', label: 'Workforce readiness', basis: 'assumption', source: 'internal' },
        { value: '68', label: 'AI literacy, the weakest dimension', basis: 'assumption', source: 'internal' },
        { value: '86', label: 'Human skills, the strongest', basis: 'assumption', source: 'internal' },
      ],
    },
    {
      kind: 'note',
      text: 'Skills, careers, AI exposure, learning paths, workplace safety. I answer from published research, and I flag scenarios as scenarios.',
    },
  ],
  next: [
    'What careers fit my current skills?',
    'Which of my skills is furthest behind?',
    'Is my field at risk from AI?',
  ],
};

export const PROMPTS: readonly Prompt[] = [
  {
    id: 'careers',
    text: 'What careers fit my current skills?',
    response: {
      working: 'Matching profile against six career profiles',
      blocks: [
        {
          kind: 'text',
          text: 'Your strongest matches, ranked on transferable skills you already have. Each one is labelled by how well published projections support it.',
        },
        {
          kind: 'matches',
          items: [
            {
              title: 'AI Safety Specialist',
              score: 84,
              status: 'Emerging',
              why: 'Ethical reasoning plus systems knowledge. The work is auditing and judgement, not model building.',
            },
            {
              title: 'Human-AI Interaction Designer',
              score: 81,
              status: 'Emerging',
              why: 'Service design plus strong communication. Deciding which tasks go to whom is a design problem first.',
            },
            {
              title: 'Climate Technology Specialist',
              score: 79,
              status: 'Growing',
              why: 'The only one of the six that appears by name in both WEF and BLS projections.',
            },
          ],
        },
        {
          kind: 'note',
          text: 'Match scores are illustrative. The labels are not: Growing means a projection names the role, Emerging means it does not.',
        },
        { kind: 'link', route: 'careers', label: 'See all six careers with the full evidence' },
      ],
      next: [
        'Why is AI Safety Specialist my top match?',
        'What skills am I missing for it?',
        'Is Climate Technology a safer bet?',
      ],
    },
  },
  {
    id: 'why-top',
    text: 'Why is AI Safety Specialist my top match?',
    response: {
      working: 'Comparing profile strengths against role requirements',
      blocks: [
        {
          kind: 'text',
          text: 'Three reasons. Your ethical reasoning is 71 and this role is mostly judgement. Your systems background suits auditing. The demand is law, not a trend.',
        },
        {
          kind: 'figures',
          items: [
            { value: 'Article 26', label: 'Requires oversight by a person with competence, training and authority', basis: 'measured', source: 'eu-ai-act' },
            { value: 'High-risk', label: 'How the AI Act classifies employment AI', basis: 'measured', source: 'eu-ai-act' },
          ],
        },
        {
          kind: 'note',
          text: 'The limit: no projection counts these jobs. The nearest counted role is Information Security Analyst, growing 29% in the US.',
        },
      ],
      next: ['What skills am I missing for it?', 'What are the risks in this field?'],
    },
  },
  {
    id: 'gaps',
    text: 'What skills am I missing for it?',
    response: {
      working: 'Comparing current capability against role requirements',
      blocks: [
        {
          kind: 'text',
          text: 'Four gaps, largest first. The top one is where effort pays most.',
        },
        {
          kind: 'gaps',
          items: [
            { skill: 'AI literacy', now: 42, needed: 85 },
            { skill: 'Data literacy', now: 58, needed: 80 },
            { skill: 'Regulatory knowledge', now: 35, needed: 75 },
            { skill: 'Ethical reasoning', now: 71, needed: 85 },
          ],
        },
        {
          kind: 'note',
          text: 'AI literacy here is not tool operation. It is judging when output can be relied on, which decides whether human-AI teams gain or lose.',
        },
        { kind: 'link', route: 'skills', label: 'Open the full skill tracker' },
      ],
      next: ['Build me a learning path', 'How exposed is this role to AI?'],
    },
  },
  {
    id: 'path',
    text: 'Build me a learning path',
    response: {
      working: 'Sequencing stages by prerequisite',
      blocks: [
        {
          kind: 'text',
          text: 'Seven stages, about ten months part-time. Each stage makes the next possible, and each ends in something built.',
        },
        {
          kind: 'steps',
          items: [
            { name: 'Foundations', detail: '4 weeks. Document how one system you use makes a decision that affects someone.' },
            { name: 'AI fundamentals', detail: '6 weeks. Find three cases where a model is confidently wrong and record how you caught it.' },
            { name: 'Data literacy', detail: '5 weeks. Trace a published statistic to source and write what it does not say.' },
            { name: 'Governance and law', detail: '6 weeks. Assess a real workplace system against Article 14.' },
            { name: 'Audit methods', detail: '6 weeks. Design an audit testing whether override changes outcomes.' },
            { name: 'Project experience', detail: '10 weeks. Review one system end to end and present to someone who can act.' },
            { name: 'Career ready', detail: '4 weeks. Two written reviews as a portfolio.' },
          ],
        },
        {
          kind: 'note',
          text: 'Straight answer: no rigorous evaluation of reskilling outcomes exists in my sources. The need is well evidenced. Whether any given path works is not.',
        },
        { kind: 'link', route: 'learning', label: 'Open the full pathway view' },
      ],
      next: ['How exposed is this role to AI?', 'What are the risks in this field?'],
    },
  },
  {
    id: 'exposure',
    text: 'How exposed is this role to AI?',
    response: {
      working: 'Reading task-level exposure against occupational gradients',
      blocks: [
        {
          kind: 'text',
          text: 'Low, for a structural reason: the role exists because a human has to hold responsibility, and the law names a person.',
        },
        {
          kind: 'figures',
          items: [
            { value: '1 in 4', label: 'Workers globally in a job with any measurable exposure', basis: 'projection', source: 'ilo-wp140' },
            { value: '24%', label: 'Share of clerical tasks highly exposed, against 1-4% elsewhere', basis: 'projection', source: 'ilo-wp140' },
            { value: '0.9 to 0.76', label: 'The ILO lowered its own peak estimate after real-world use', basis: 'measured', source: 'ilo-wp140' },
          ],
        },
        {
          kind: 'note',
          text: 'The most misread number in this field. Exposure is task overlap with model capability, not a job disappearing. I will not call your job safe or doomed.',
        },
        { kind: 'link', route: 'safety', label: 'See the workplace risk assessment' },
      ],
      next: ['What are the risks in this field?', 'What careers fit my current skills?'],
    },
  },
  {
    id: 'risks',
    text: 'What are the risks in this field?',
    response: {
      working: 'Retrieving documented workplace risks',
      blocks: [
        {
          kind: 'text',
          text: 'Three that matter most for oversight work. Each has a documented mitigation, so treat them as things to manage.',
        },
        {
          kind: 'risks',
          items: [
            {
              label: 'Hollow oversight',
              level: 'high',
              note: 'EU guidance documents a case where oversight existed on paper and appeals changed nothing. The failure you would be employed to prevent.',
            },
            {
              label: 'Over-reliance on AI output',
              level: 'moderate',
              note: 'Across 106 experiments, human-AI combinations often underperform the better of the two alone. Explanations and confidence displays did not help.',
            },
            {
              label: 'Information asymmetry',
              level: 'elevated',
              note: 'Algorithmic management concentrates knowledge on the employer side. Workers cannot contest what they cannot inspect.',
            },
          ],
        },
        {
          kind: 'note',
          text: 'What I cannot give you: a prevalence rate for AI hiring bias, or a surveillance figure for the general workforce. Those numbers do not exist.',
        },
      ],
      next: ['What careers fit my current skills?', 'Which of my skills is furthest behind?'],
    },
  },
  {
    id: 'weakest',
    text: 'Which of my skills is furthest behind?',
    response: {
      working: 'Ranking capability against employer-reported demand',
      blocks: [
        {
          kind: 'text',
          text: 'AI literacy, 42 against demand of about 92. The largest gap here, and it sits where the evidence says it costs most.',
        },
        {
          kind: 'gaps',
          items: [
            { skill: 'AI literacy', now: 42, needed: 92 },
            { skill: 'Data literacy', now: 58, needed: 80 },
            { skill: 'Ethical reasoning', now: 71, needed: 68 },
          ],
        },
        {
          kind: 'figures',
          items: [
            { value: 'AI and big data', label: 'The fastest-growing skill in employer demand to 2030', basis: 'projection', source: 'wef-fojr-2025' },
            { value: '39%', label: 'Share of core skills employers expect to change by 2030', basis: 'projection', source: 'wef-fojr-2025' },
          ],
        },
        { kind: 'link', route: 'skills', label: 'Open the skill tracker' },
      ],
      next: ['Build me a learning path', 'What careers fit my current skills?'],
    },
  },
  {
    id: 'field-risk',
    text: 'Is my field at risk from AI?',
    response: {
      working: 'Checking occupational exposure gradients',
      blocks: [
        {
          kind: 'text',
          text: 'The honest answer is not yes or no. The evidence supports which of your tasks change, not whether your field survives.',
        },
        {
          kind: 'figures',
          items: [
            { value: 'Assistance leads', label: 'Augmentation potential exceeds automation potential in every income group', basis: 'projection', source: 'ilo-wp140' },
            { value: '+78M', label: 'Net job change in the most-cited projection to 2030', basis: 'projection', source: 'wef-fojr-2025' },
            { value: '2034', label: 'The furthest any credible projection reaches', basis: 'measured', source: 'ilo-wp118' },
          ],
        },
        {
          kind: 'note',
          text: 'Nobody credible forecasts 2045, including me. The ILO says capability cannot be predicted, and that outcomes are not predetermined.',
        },
        { kind: 'link', route: 'research', label: 'Read the evidence behind this' },
      ],
      next: ['What careers fit my current skills?', 'Which of my skills is furthest behind?'],
    },
  },
];

/** Matches free text against the script. Deliberately simple keyword overlap. */
export function findPrompt(input: string): Prompt | null {
  const q = input.toLowerCase().trim();
  if (!q) return null;

  const exact = PROMPTS.find((p) => p.text.toLowerCase() === q);
  if (exact) return exact;

  const KEYS: Record<string, string[]> = {
    careers: ['career', 'job', 'role', 'fit', 'match', 'work as'],
    gaps: ['missing', 'gap', 'need to learn', 'lack'],
    path: ['learning path', 'how do i', 'study', 'plan', 'roadmap', 'prepare'],
    exposure: ['exposure', 'exposed', 'automat', 'replace'],
    risks: ['risk', 'danger', 'safety', 'harm', 'bias'],
    weakest: ['weakest', 'behind', 'worst', 'lowest skill'],
    'field-risk': ['at risk', 'my field', 'will i lose', 'safe'],
    'why-top': ['why', 'top match', 'best match'],
  };

  let best: { id: string; score: number } | null = null;
  for (const [id, keys] of Object.entries(KEYS)) {
    const score = keys.filter((k) => q.includes(k)).length;
    if (score > 0 && (!best || score > best.score)) best = { id, score };
  }

  return best ? (PROMPTS.find((p) => p.id === best.id) ?? null) : null;
}
