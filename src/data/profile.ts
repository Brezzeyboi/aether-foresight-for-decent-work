/* ============================================================================
   The demonstration profile.

   Fictional. Every value here carries basis 'assumption' and source 'internal',
   so nothing in this file can be mistaken for a research finding.

   It is designed to be INSTRUCTIVE rather than flattering. A profile scoring
   well everywhere would make the skill-gap, learning-path, and recommendation
   features meaningless: there would be nothing to show. So the weakest dimension
   is AI literacy, which is exactly the dimension the evidence base says matters
   most (CLAIM-SKILL-06 puts AI and big data as the fastest-growing skill). The
   largest gap sits where the research says it hurts.
   ============================================================================ */

export interface ReadinessDimension {
  key: string;
  label: string;
  score: number;
  /** What this dimension measures, in the product's own terms. */
  meaning: string;
  /** Why it is at this level for this profile. */
  reading: string;
}

export interface DemoProfile {
  name: string;
  position: string;
  context: string;
  readiness: number;
  dimensions: readonly ReadinessDimension[];
}

export const PROFILE: DemoProfile = {
  name: 'Amara Okonjo-Lindqvist',
  position: 'Third-year undergraduate, information systems',
  context: 'Two internships, one in public-sector service design',
  readiness: 78,
  dimensions: [
    {
      key: 'human',
      label: 'Human skills',
      score: 86,
      meaning: 'Communication, collaboration, judgement under ambiguity.',
      reading:
        'Strongest dimension. Employers say growing roles need technical and human skills together.',
    },
    {
      key: 'adaptability',
      label: 'Adaptability',
      score: 82,
      meaning: 'Changing direction and absorbing new ways of working.',
      reading:
        'Strong. Has already changed academic direction once, and worked across two unrelated sectors.',
    },
    {
      key: 'digital',
      label: 'Digital skills',
      score: 79,
      meaning: 'Fluency with the tools and systems that current work runs on.',
      reading: 'Solid and unremarkable. Sufficient rather than distinguishing.',
    },
    {
      key: 'career',
      label: 'Career readiness',
      score: 74,
      meaning: 'Clarity of direction, and evidence of relevant experience.',
      reading: 'Middling, because no direction has been chosen yet. Normal at this stage.',
    },
    {
      key: 'ai',
      label: 'AI literacy',
      score: 68,
      meaning: 'What these systems do, where they fail, and when to rely on them.',
      reading:
        'Weakest dimension, and worth attention first. It is also the fastest-growing skill in employer demand.',
    },
  ],
};

/* --- Skills -------------------------------------------------------------- */

export interface Skill {
  key: string;
  label: string;
  /** Current capability, 0-100. Fictional. */
  level: number;
  /** Future relevance rating, traced to employer-reported demand. */
  relevance: 'very high' | 'high' | 'rising' | 'stable';
  /** Which claim supports the relevance rating. */
  relevanceBasis: string;
  /** Why this skill matters, in the product's voice. */
  why: string;
  /** A concrete next step, not a generic exhortation. */
  improve: string;
}

/** Ordered by gap size, largest first: the ordering is itself the advice. */
export const SKILLS: readonly Skill[] = [
  {
    key: 'ai-literacy',
    label: 'AI literacy',
    level: 42,
    relevance: 'very high',
    relevanceBasis: 'CLAIM-SKILL-06',
    why: 'The fastest-growing skill in employer demand to 2030. What matters is not tool operation but judging when output can be relied on.',
    improve:
      'Find one task where an AI system is measurably wrong. Document how you caught it.',
  },
  {
    key: 'data-literacy',
    label: 'Data literacy',
    level: 58,
    relevance: 'high',
    relevanceBasis: 'CLAIM-SKILL-06',
    why: 'The precondition for AI literacy. Most misuse of AI output is a misreading of what the numbers represent.',
    improve:
      'Take one published statistic in your field and trace it to its source, then write down what it does not say.',
  },
  {
    key: 'ethical-reasoning',
    label: 'Ethical reasoning',
    level: 71,
    relevance: 'rising',
    relevanceBasis: 'CLAIM-GOV-03',
    why: 'The EU AI Act requires oversight by people with competence, training and authority. A legal demand for judgement, not paperwork.',
    improve:
      'Read Article 14 of the AI Act and identify one system you have used that would fall under it.',
  },
  {
    key: 'creative',
    label: 'Creative problem-solving',
    level: 76,
    relevance: 'high',
    relevanceBasis: 'CLAIM-RESK-05',
    why: 'The one significant moderator in collaboration research: teams gain on creation tasks and lose on decision tasks.',
    improve: 'Take a project where you used AI for a decision and redo it using AI for generation instead.',
  },
  {
    key: 'digital',
    label: 'Digital skills',
    level: 79,
    relevance: 'high',
    relevanceBasis: 'CLAIM-SKILL-09',
    why: 'Demand is shifting toward management, business and digital skills. Baseline fluency is assumed rather than rewarded.',
    improve: 'Depth in one system beats familiarity with five.',
  },
  {
    key: 'critical-thinking',
    label: 'Critical thinking',
    level: 81,
    relevance: 'very high',
    relevanceBasis: 'CLAIM-SKILL-06',
    why: 'Still the top core skill employers name, ahead of every technical skill. AI has made it more load-bearing, not less.',
    improve: 'Already strong. Apply it to AI output specifically, which is where it is least practised.',
  },
  {
    key: 'adaptability',
    label: 'Adaptability',
    level: 82,
    relevance: 'very high',
    relevanceBasis: 'CLAIM-SKILL-01',
    why: 'Employers expect 39% of core skills to change by 2030. Adaptability makes that survivable, and it is a skill, not a temperament.',
    improve: 'Already strong. Re-skill on a schedule rather than in reaction.',
  },
  {
    key: 'communication',
    label: 'Communication',
    level: 88,
    relevance: 'high',
    relevanceBasis: 'CLAIM-SKILL-08',
    why: 'Growing roles need technology and human skills together. The hardest human skill to automate, and the easiest to underrate.',
    improve: 'Already strong. Practise explaining a technical constraint to someone who does not share your vocabulary.',
  },
];

/* --- Careers ------------------------------------------------------------- */

export type CareerStatus = 'growing' | 'emerging';

export interface Career {
  key: string;
  title: string;
  status: CareerStatus;
  /** Which ranked list, if any. Percentage growth and absolute growth differ. */
  list?: 'percentage' | 'absolute' | 'both';
  /** Match against the demo profile. Fictional, so basis is assumption. */
  match: number;
  /** Why it matches this profile specifically. */
  whyMatch: string;
  /** Skills the profile already has that transfer. */
  coreSkills: readonly string[];
  /** Skills that would need building, largest gap first. */
  develop: readonly string[];
  /** Task-level exposure, expressed as gradient position rather than a verdict. */
  exposure: 'low' | 'moderate' | 'elevated';
  exposureNote: string;
  /** Where the human contribution is hardest to substitute. */
  humanAdvantage: string;
  /** The nearest role that appears in a published projection. */
  evidencedAdjacent: string;
  /** Honest statement of the evidence behind the status label. */
  evidenceNote: string;
}

export const CAREERS: readonly Career[] = [
  {
    key: 'climate-tech',
    title: 'Climate Technology Specialist',
    status: 'growing',
    list: 'both',
    match: 79,
    whyMatch:
      'Systems background plus public-sector service design. This work is mostly delivery and coordination, not pure engineering.',
    coreSkills: ['Digital skills', 'Adaptability', 'Communication'],
    develop: ['Data literacy', 'Domain knowledge in energy systems'],
    exposure: 'low',
    exposureNote:
      'Physical and site-based tasks show consistently low exposure. Exposure concentrates in clerical work.',
    humanAdvantage:
      'Physical installation, on-site judgement, and coordination across organisations.',
    evidencedAdjacent: 'Renewable Energy Engineers (WEF top 15); wind turbine service technicians (BLS +49.9%)',
    evidenceNote:
      'Best evidenced of the six, in both WEF and BLS projections. But those BLS occupations add fewer than 20,000 jobs combined.',
  },
  {
    key: 'ai-safety',
    title: 'AI Safety Specialist',
    status: 'emerging',
    match: 84,
    whyMatch:
      'Ethical reasoning at 71 plus systems knowledge. The role is auditing and judgement, not model building.',
    coreSkills: ['Ethical reasoning', 'Critical thinking', 'Communication'],
    develop: ['AI literacy', 'Data literacy', 'Regulatory knowledge'],
    exposure: 'low',
    exposureNote:
      'Oversight work is defined by needing human judgement. The EU AI Act puts the responsibility on a person.',
    humanAdvantage:
      'Accountability cannot be delegated to the system being overseen.',
    evidencedAdjacent: 'Information Security Analysts (BLS +29%); Security Management Specialists (WEF top 15)',
    evidenceNote:
      'No projection counts these jobs, so the status is emerging. But the demand comes from binding law, which beats most emerging-role claims.',
  },
  {
    key: 'hai-design',
    title: 'Human-AI Interaction Designer',
    status: 'emerging',
    match: 81,
    whyMatch:
      'Service design experience plus strong communication. Deciding which tasks go to whom is a design problem first.',
    coreSkills: ['Communication', 'Creative problem-solving', 'Critical thinking'],
    develop: ['AI literacy', 'Evaluation methods'],
    exposure: 'moderate',
    exposureNote:
      'Design roles show mixed exposure. Graphic designers newly appear on the fastest-declining list, generative AI named as the cause.',
    humanAdvantage:
      'Dividing work between a person and a system is a judgement about human capability, which the system cannot see.',
    evidencedAdjacent: 'UI and UX Designers (WEF fastest-growing top 15)',
    evidenceNote:
      'Strongest mechanism of the emerging roles: interaction choices decide whether teaming gains or loses. The standard levers showed no effect.',
  },
  {
    key: 'ai-governance',
    title: 'AI Governance Specialist',
    status: 'emerging',
    match: 77,
    whyMatch: 'Public-sector experience transfers directly: the work is institutional as much as technical.',
    coreSkills: ['Ethical reasoning', 'Communication', 'Critical thinking'],
    develop: ['AI literacy', 'Regulatory knowledge', 'Audit methods'],
    exposure: 'low',
    exposureNote: 'Institutional and accountability work shows low task-level exposure.',
    humanAdvantage:
      'Negotiating between organisations with different incentives, and holding responsibility.',
    evidencedAdjacent: 'Security Management Specialists (WEF top 15)',
    evidenceNote:
      'Overlaps with AI Safety Specialist on the same anchors. Read the two as one function with two emphases.',
  },
  {
    key: 'robotics',
    title: 'Robotics Systems Engineer',
    status: 'emerging',
    match: 62,
    whyMatch:
      'Systems background transfers, but the weakest match: it needs mechanical and control engineering depth this profile lacks.',
    coreSkills: ['Digital skills', 'Critical thinking'],
    develop: ['Control systems', 'Mechanical engineering fundamentals', 'AI literacy'],
    exposure: 'low',
    exposureNote: 'Physical engineering tasks show low generative-AI exposure.',
    humanAdvantage: 'Physical world interaction, where confident automation predictions have repeatedly failed.',
    evidencedAdjacent: 'Autonomous and Electric Vehicle Specialists (WEF top 15)',
    evidenceNote:
      '58% of employers expect robotics to transform their business, but it is not a named role in any growth list. Physical dexterity resists automation.',
  },
  {
    key: 'ai-product',
    title: 'AI Product Designer',
    status: 'emerging',
    match: 74,
    whyMatch: 'Service design experience and creative problem-solving transfer directly.',
    coreSkills: ['Creative problem-solving', 'Communication', 'Adaptability'],
    develop: ['AI literacy', 'Data literacy'],
    exposure: 'moderate',
    exposureNote:
      'Design work shows mixed and changing exposure. The one career here with countervailing evidence in its own field.',
    humanAdvantage: 'Understanding what a person is actually trying to do, which is not inferable from usage data alone.',
    evidencedAdjacent: 'UI and UX Designers (WEF fastest-growing top 15)',
    evidenceNote:
      'Weakest evidence of the six. Graphic designers are newly on the fastest-declining list, generative AI named as the cause. Not a safe bet.',
  },
];
