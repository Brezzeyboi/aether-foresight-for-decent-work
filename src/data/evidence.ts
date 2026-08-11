/* ============================================================================
   The evidence layer.

   This file is the reason AETHER can be trusted. Every number shown anywhere in
   the product resolves through here, and the types make an unsourced figure
   unrenderable rather than merely discouraged:

     - A `Claim` cannot be constructed without a `source` and a `basis`.
     - `source` must be a key of the SOURCES registry, so a typo is a type error
       and an invented citation cannot compile.
     - The <Basis> component renders the epistemic status next to every figure,
       so "measured fact" never visually impersonates "our own assumption".

   The four bases are not decoration. They are the honest answer to "how do you
   know that?", and the competition brief requires them kept separate:

     measured    observed data already collected and published
     projection  a modelled forward estimate published by a source
     scenario    an explicitly conditional pathway, not a prediction
     assumption  our own design assumption, carried by no source

   Rule for contributors: if you cannot fill in `source`, you may not add the
   number. Delete it instead. An empty slot costs nothing; a fabricated
   statistic costs the entire project its credibility.
   ============================================================================ */

export type Basis = 'measured' | 'projection' | 'scenario' | 'assumption';

export interface BasisMeta {
  readonly label: string;
  /** Shown in the chip tooltip and in the methodology note. */
  readonly definition: string;
  readonly cssVar: string;
}

export const BASIS_META: Record<Basis, BasisMeta> = {
  measured: {
    label: 'Measured',
    definition: 'Observed data already collected and published by the cited source.',
    cssVar: 'var(--basis-measured)',
  },
  projection: {
    label: 'Projection',
    definition:
      'A modelled forward estimate published by the cited source. Sensitive to its assumptions.',
    cssVar: 'var(--basis-projection)',
  },
  scenario: {
    label: 'Scenario',
    definition:
      'A conditional pathway, not a forecast. Describes what could follow if stated conditions hold.',
    cssVar: 'var(--basis-scenario)',
  },
  assumption: {
    label: 'Design assumption',
    definition:
      'Our own assumption for this prototype, carried by no external source. Illustrative only.',
    cssVar: 'var(--basis-assumption)',
  },
};

/** Institutional authority, used to order and group the reference list. */
export type SourceKind =
  | 'intergovernmental'
  | 'statistical-office'
  | 'academic'
  | 'regulatory'
  | 'industry'
  | 'prototype';

export interface Source {
  readonly id: string;
  readonly org: string;
  readonly title: string;
  readonly year: number;
  readonly url: string;
  readonly kind: SourceKind;
  /** One line on what this source is authoritative for, and its limits. */
  readonly scope: string;
}

/* ---------------------------------------------------------------------------
   SOURCE REGISTRY

   Populated from docs/04-research-evidence.md and docs/05-sources.md, which are
   produced by the research workstream against primary sources only. Every entry
   here was retrieved and verified; nothing is added from memory.

   `internal` is the single permitted non-external source. It exists so that
   demo-profile values and illustrative model parameters must still declare
   themselves as assumptions rather than hiding among cited figures.
   --------------------------------------------------------------------------- */
export const SOURCES = {
  /* --- International Labour Organization ------------------------------- */
  'ilo-wp140': {
    id: 'ilo-wp140',
    org: 'International Labour Organization',
    title: 'Generative AI and jobs: A Refined Global Index of Occupational Exposure (Working Paper 140)',
    year: 2025,
    url: 'https://webapps.ilo.org/static/english/intserv/working-papers/wp140/index.html',
    kind: 'intergovernmental',
    scope:
      'The methodological backbone for occupational exposure. Builds a graded exposure index rather than a binary automatable/safe split. Exposure measures task overlap with model capability, not employment outcomes. Its worker survey is Polish (1,640 respondents), not global.',
  },
  'ilo-brief-2025': {
    id: 'ilo-brief-2025',
    org: 'International Labour Organization',
    title: 'Research Brief: Generative AI and jobs, a 2025 update',
    year: 2025,
    url: 'https://www.ilo.org/sites/default/files/2025-05/Research%20brief_GenAI%202025%20Update.pdf',
    kind: 'intergovernmental',
    scope: 'Accessible summary of Working Paper 140. Cite the working paper for method.',
  },
  'ilo-wp96': {
    id: 'ilo-wp96',
    org: 'International Labour Organization',
    title:
      'Generative AI and jobs: A global analysis of potential effects on job quantity and quality (Working Paper 96)',
    year: 2023,
    url: 'https://www.ilo.org/sites/default/files/2024-07/WP96_web.pdf',
    kind: 'intergovernmental',
    scope:
      'The earlier global exposure analysis and origin of the augmentation-exceeds-automation finding. Predates current model generations; superseded on exposure figures by WP140.',
  },
  'ilo-est-2026': {
    id: 'ilo-est-2026',
    org: 'International Labour Organization',
    title: 'Employment and Social Trends 2026',
    year: 2026,
    url: 'https://www.ilo.org/publications/flagship-reports/employment-and-social-trends-2026',
    kind: 'intergovernmental',
    scope:
      'ILO flagship. Current global employment conditions, job quality, and informality. The authoritative baseline for the state of work as it is now.',
  },
  'ilo-gender-2026': {
    id: 'ilo-gender-2026',
    org: 'International Labour Organization',
    title: 'Gen AI, occupational segregation and gender equality in the world of work',
    year: 2026,
    url: 'https://www.ilo.org/sites/default/files/2026-03/Research%20Brief%20GenAI_final0403_0.pdf',
    kind: 'intergovernmental',
    scope:
      'The gendered distribution of AI exposure, driven by occupational segregation rather than by technology alone.',
  },
  'ilo-algo-mgmt': {
    id: 'ilo-algo-mgmt',
    org: 'International Labour Organization',
    title: 'The Algorithmic Management of work and its implications in different contexts',
    year: 2022,
    url: 'https://www.ilo.org/sites/default/files/wcmsp5/groups/public/%40ed_emp/documents/publication/wcms_849220.pdf',
    kind: 'intergovernmental',
    scope: 'Algorithmic management and workplace monitoring as a labour issue.',
  },
  'ilo-algo-topic': {
    id: 'ilo-algo-topic',
    org: 'International Labour Organization',
    title: 'Algorithmic management in the workplace',
    year: 2024,
    url: 'https://www.ilo.org/algorithmic-management-workplace',
    kind: 'intergovernmental',
    scope:
      "ILO's framing of algorithmic management and calls for social dialogue. Not a binding standard: no ILO Convention specifically governing AI at work was verified.",
  },
  'ilo-scenarios-2017': {
    id: 'ilo-scenarios-2017',
    org: 'International Labour Organization',
    title: 'The Future of Work: A Scenario Analysis',
    year: 2017,
    url: 'https://www.ilo.org/resource/future-work-scenario-analysis-0',
    kind: 'intergovernmental',
    scope:
      'Precedent for how the ILO itself handles long-horizon uncertainty: scenario sets, not forecasts.',
  },
  'ilo-wp118': {
    id: 'ilo-wp118',
    org: 'International Labour Organization',
    title: 'Using foresight to think and act upon an uncertain future world of work (Working Paper 118)',
    year: 2024,
    url: 'https://www.ilo.org/sites/default/files/2024-07/118_web.pdf',
    kind: 'intergovernmental',
    scope:
      'The discipline of labour-market foresight, and why point predictions about the distant future are not credible.',
  },

  /* --- World Economic Forum -------------------------------------------- */
  'wef-fojr-2025': {
    id: 'wef-fojr-2025',
    org: 'World Economic Forum',
    title: 'The Future of Jobs Report 2025',
    year: 2025,
    url: 'https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf',
    kind: 'industry',
    scope:
      'The most-cited source for employer expectations on jobs and skills to 2030. Figures are extrapolations from a survey of just over 1,000 employers across 55 economies, scaled against 1.2 billion formal jobs. Not a census and not an econometric forecast; informal employment is largely out of scope.',
  },

  /* --- International Monetary Fund ------------------------------------- */
  'imf-genai-2024': {
    id: 'imf-genai-2024',
    org: 'International Monetary Fund',
    title: 'Gen-AI: Artificial Intelligence and the Future of Work (Staff Discussion Note SDN/2024/001)',
    year: 2024,
    url: 'https://www.imf.org/-/media/files/publications/sdn/2024/english/sdnea2024001.pdf',
    kind: 'intergovernmental',
    scope:
      'Cross-country AI exposure, including the advanced versus emerging economy split. The widely-quoted 40% figure is occupational exposure, not predicted job loss. Staff views, not official IMF position.',
  },

  /* --- OECD ------------------------------------------------------------ */
  'oecd-eo-2025': {
    id: 'oecd-eo-2025',
    org: 'OECD',
    title: 'OECD Employment Outlook 2025',
    year: 2025,
    url: 'https://www.oecd.org/en/publications/2025/07/oecd-employment-outlook-2025_5345f034.html',
    kind: 'intergovernmental',
    scope:
      'OECD flagship labour analysis: AI adoption and effects across member economies. OECD-country focused; does not generalise to low-income economies.',
  },
  'oecd-ai-principles': {
    id: 'oecd-ai-principles',
    org: 'OECD',
    title: 'Recommendation of the Council on Artificial Intelligence (OECD/LEGAL/0449)',
    year: 2024,
    url: 'https://legalinstruments.oecd.org/en/instruments/oecd-legal-0449',
    kind: 'regulatory',
    scope:
      'The OECD AI Principles, the most widely adopted intergovernmental AI governance instrument. A recommendation, not legally binding.',
  },

  /* --- European Union -------------------------------------------------- */
  'eu-ai-act': {
    id: 'eu-ai-act',
    org: 'European Union',
    title: 'Regulation (EU) 2024/1689 (AI Act)',
    year: 2024,
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3',
    kind: 'regulatory',
    scope:
      'Binding law, and the strongest verified legal requirement in this evidence base. Annex III classifies employment and worker-management AI as high-risk; Article 14 mandates human oversight; Article 26 sets deployer obligations. EU jurisdiction, phased application.',
  },

  /* --- UNESCO ---------------------------------------------------------- */
  'unesco-ethics': {
    id: 'unesco-ethics',
    org: 'UNESCO',
    title: 'Recommendation on the Ethics of Artificial Intelligence',
    year: 2021,
    url: 'https://unesdoc.unesco.org/ark:/48223/pf0000381137.locale=en',
    kind: 'regulatory',
    scope:
      'The first global standard-setting instrument on AI ethics, adopted by all member states. Non-binding.',
  },

  /* --- ITU ------------------------------------------------------------- */
  'itu-ff-2025': {
    id: 'itu-ff-2025',
    org: 'International Telecommunication Union',
    title: 'Measuring digital development: Facts and Figures 2025',
    year: 2025,
    url: 'https://www.itu.int/itu-d/reports/statistics/facts-figures-2025/',
    kind: 'intergovernmental',
    scope:
      'The authoritative source for global connectivity and the digital divide. ITU revises historical estimates substantially between editions; never compare across editions without the revised series.',
  },

  /* --- US Bureau of Labor Statistics ----------------------------------- */
  'bls-ep-2034': {
    id: 'bls-ep-2034',
    org: 'US Bureau of Labor Statistics',
    title: 'Employment Projections, 2024-2034',
    year: 2025,
    url: 'https://www.bls.gov/news.release/ecopro.nr0.htm',
    kind: 'statistical-office',
    scope:
      'The most rigorous official occupational projections available, and the only source here with per-occupation numeric detail. US only and model-based. Fastest growing by percentage and largest absolute growth are different lists.',
  },

  /* --- Peer-reviewed --------------------------------------------------- */
  'vaccaro-2024': {
    id: 'vaccaro-2024',
    org: 'Vaccaro, Almaatouq & Malone',
    title:
      'When combinations of humans and AI are useful: a systematic review and meta-analysis (Nature Human Behaviour 8)',
    year: 2024,
    url: 'https://www.nature.com/articles/s41562-024-02024-1',
    kind: 'academic',
    scope:
      'The key peer-reviewed evidence on human-AI collaboration, notable for finding that human-AI combinations often underperform the better of the two alone. Covers studies from January 2020 to June 2023, predating current model generations.',
  },
  'acemoglu-2025': {
    id: 'acemoglu-2025',
    org: 'Daron Acemoglu',
    title: 'The simple macroeconomics of AI (Economic Policy 40(121))',
    year: 2025,
    url: 'https://economics.mit.edu/sites/default/files/2024-10/The%20Simple%20Macroeconomics%20of%20AI.pdf',
    kind: 'academic',
    scope:
      "The most rigorous published sceptical estimate of AI's macroeconomic effect, included so the Economy section represents genuine expert disagreement. One model with contested assumptions; others estimate substantially larger effects.",
  },
  'brynjolfsson-2025': {
    id: 'brynjolfsson-2025',
    org: 'Brynjolfsson, Li & Raymond',
    title: 'Generative AI at Work (Quarterly Journal of Economics 140(2))',
    year: 2025,
    url: 'https://www.nber.org/papers/w31161',
    kind: 'academic',
    scope:
      "Among the best-identified field evidence on AI's productivity effect on real workers, and the source of the finding that gains concentrate among less experienced workers. One firm, one occupation, one tool, pre-2024 model. Do not extrapolate.",
  },

  /* --- Journalism ------------------------------------------------------ */
  'reuters-amazon-2018': {
    id: 'reuters-amazon-2018',
    org: 'Reuters',
    title: 'Amazon scraps secret AI recruiting tool that showed bias against women',
    year: 2018,
    url: 'https://www.reuters.com/article/world/amazon-scraps-secret-ai-recruiting-tool-that-showed-bias-against-women-idUSKCN1MK08J/',
    kind: 'industry',
    scope:
      'The canonical documented case of hiring-algorithm bias. Journalism, not a study: one company, now dated. An illustrative case, never evidence of prevalence.',
  },

  /* --- Ours ------------------------------------------------------------ */
  internal: {
    id: 'internal',
    org: 'AETHER prototype',
    title: 'Demonstration profile and illustrative model parameters',
    year: 2026,
    url: '',
    kind: 'prototype',
    scope:
      'Fictional demonstration data created for this prototype. Carries no external evidence and is never presented as a finding.',
  },
} as const satisfies Record<string, Source>;

export type SourceId = keyof typeof SOURCES;

export interface Claim {
  /** Stable id matching docs/04-research-evidence.md, e.g. 'CLAIM-SKILL-03'. */
  readonly id: string;
  /** The figure as it should be displayed, pre-formatted. */
  readonly value: string;
  /** What the figure measures, in plain language. */
  readonly statement: string;
  readonly basis: Basis;
  readonly source: SourceId;
  /** Caveats, methodology limits, and explicitly what this does NOT say. */
  readonly note?: string;
}

export function source(id: SourceId): Source {
  return SOURCES[id];
}

/* Abbreviations for inline use. A full organisation name inside a sentence
   swamps the prose it is supporting, so running text gets the initialism and the
   full name is carried by the source list and the chip tooltip. */
const ORG_SHORT: Record<string, string> = {
  'International Labour Organization': 'ILO',
  'World Economic Forum': 'WEF',
  'International Monetary Fund': 'IMF',
  'International Telecommunication Union': 'ITU',
  'US Bureau of Labor Statistics': 'BLS',
  'European Union': 'EU',
  'Vaccaro, Almaatouq & Malone': 'Vaccaro et al.',
  'Brynjolfsson, Li & Raymond': 'Brynjolfsson et al.',
};

/** Formats a citation for inline display: "ILO 2025". */
export function citeShort(id: SourceId): string {
  const s = SOURCES[id];
  if (s.kind === 'prototype') return s.org;
  return `${ORG_SHORT[s.org] ?? s.org} ${s.year}`;
}

/** Full attribution, for source lists and figure footnotes. */
export function citeFull(id: SourceId): string {
  const s = SOURCES[id];
  return s.kind === 'prototype' ? s.org : `${s.org}, ${s.year}`;
}
