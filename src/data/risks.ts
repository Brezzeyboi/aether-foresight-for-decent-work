/* Workplace risks for the Safety screen.

   Levels are our assessment; every one cites the finding it rests on. Each risk
   names a real mitigation, because listing risks without mitigations is alarming
   rather than useful. The glyph means the level never rests on colour alone. */

import type { Basis, SourceId } from './evidence.ts';

export interface Risk {
  key: string;
  label: string;
  level: 'low' | 'moderate' | 'elevated' | 'high';
  /** Distinct mark per level, so meaning survives greyscale and colourblindness. */
  glyph: string;
  /** One line, visible in the collapsed row. */
  gist: string;
  why: string;
  mitigation: string;
  basis: Basis;
  source: SourceId;
}

export const RISKS: readonly Risk[] = [
  {
    key: 'oversight',
    label: 'Hollow human oversight',
    level: 'high',
    glyph: '▲',
    gist: 'Oversight that exists on paper while the system decides',
    why: 'EU guidance documents a pay-setting case where oversight was formally in place, the algorithm decided, and appeals rarely changed anything.',
    mitigation:
      'Audit whether override changes outcomes, not whether a review step exists.',
    basis: 'measured',
    source: 'eu-ai-act',
  },
  {
    key: 'surveillance',
    label: 'Workplace surveillance',
    level: 'elevated',
    glyph: '▲',
    gist: 'Monitoring spreading from platform work into standard employment',
    why: 'Over 40% of surveyed platform workers reported regular tracking. Algorithmic management is documented in transport, logistics, banking and healthcare.',
    mitigation:
      'Article 26 requires notifying workers before deployment. Be clear what is collected, and limit what may be inferred.',
    basis: 'measured',
    source: 'ilo-algo-mgmt',
  },
  {
    key: 'asymmetry',
    label: 'Information asymmetry',
    level: 'elevated',
    glyph: '▲',
    gist: 'Being managed by a system whose logic you cannot see',
    why: 'Knowledge and control concentrate on the employer side. A worker cannot contest a decision they cannot inspect.',
    mitigation:
      'Auditability and traceability obligations, log retention, and the right to be informed that a decision was AI-assisted.',
    basis: 'measured',
    source: 'ilo-algo-mgmt',
  },
  {
    key: 'bias',
    label: 'Hiring and evaluation bias',
    level: 'elevated',
    glyph: '▲',
    gist: 'Documented in one well-known case, unquantified in general',
    why: 'A recruiting tool downgraded CVs containing indications of women, and was scrapped. No prevalence rate exists, so the scale is unknown.',
    mitigation:
      'Annex III makes employment AI high-risk, triggering testing, documentation and human review. UNESCO requires redress.',
    basis: 'measured',
    source: 'reuters-amazon-2018',
  },
  {
    key: 'inclusion',
    label: 'Digital exclusion',
    level: 'high',
    glyph: '▲',
    gist: '2.2 billion people offline, before any skills question arises',
    why: 'Internet use runs 94% in high-income countries against 23% in low-income ones, 85% urban against 58% rural. Reskilling assumes access.',
    mitigation:
      'Measure training reach among excluded groups, not aggregate completion. Affordability and access policy, not just curriculum.',
    basis: 'measured',
    source: 'itu-ff-2025',
  },
  {
    key: 'automation',
    label: 'Task displacement',
    level: 'moderate',
    glyph: '◆',
    gist: 'Concentrated in clerical work, not general',
    why: 'Real but narrow: 24% of clerical tasks are highly exposed, against 1% to 4% elsewhere. The ILO also cut its peak estimate from 0.9 to 0.76.',
    mitigation:
      'Reskill at task level, not whole occupations. Augmentation potential beats automation potential in every income group.',
    basis: 'projection',
    source: 'ilo-wp140',
  },
  {
    key: 'reliability',
    label: 'Over-reliance on AI output',
    level: 'moderate',
    glyph: '◆',
    gist: 'Human plus AI often underperforms the better of the two alone',
    why: 'Across 106 experiments, human-AI combinations performed worse than the stronger of the two alone. Gains on creation, losses on decisions.',
    mitigation:
      'Judgement about when to rely on a system is learnable. People who outperform a model are also better at knowing when to trust it.',
    basis: 'measured',
    source: 'vaccaro-2024',
  },
];
