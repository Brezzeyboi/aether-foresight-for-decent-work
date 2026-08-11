# AETHER — Workforce Intelligence 2045: Research Evidence Base

**Compiled:** August 2026
**Purpose:** Citation-backed evidence base. Every claim below was verified against a source actually retrieved during research. Claim IDs are stable and intended for direct reference from application code.

## How to read this file

Each claim carries a `Basis` classification:

| Basis | Meaning |
|---|---|
| `measured` | Observed/historical data already collected (survey results, current statistics) |
| `projection` | A modelled forward estimate published by the source |
| `scenario` | An explicitly conditional/illustrative pathway published by the source |
| `assumption` | OUR OWN design assumption, not from any source. Used very sparingly and always labelled. |

**Critical rule for the build team:** do not invent, round up, or recombine these figures. If a number you want is not here, check the "Numbers we could NOT verify" section at the end before using it. Several widely-circulated figures in this space are wrong or come from sources that do not exist.

## Documented here but not implemented in code

This file documents 100 claims. `src/data/claims.ts` implements 84. The 16 below
are documented but carry no entry in the code, so no interface surface resolves
them and they are not available to render:

CLAIM-EMP-07, CLAIM-JOB-05, CLAIM-JOB-06, CLAIM-DIV-05, CLAIM-DIV-06,
CLAIM-DIV-08, CLAIM-DIV-11, CLAIM-ECON-05, CLAIM-ECON-08, CLAIM-ECON-11,
CLAIM-SCEN-03, CLAIM-SCEN-06, CLAIM-SCEN-09, CLAIM-SCEN-10, CLAIM-SCEN-13,
CLAIM-SCEN-14.

Their research entries below stand as verified research and remain citable in
prose. A claim id referenced from application code must exist in
`src/data/claims.ts`; the ids above do not.

---

## Topic 1 — AI and employment overall

#### CLAIM-EMP-01: WEF employers project 170 million new jobs created by 2030
- **Figure:** 170 million new jobs, equivalent to 14% of today's total employment
- **Display:** 170M
- **Basis:** projection
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025)
- **URL:** https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf
- **Supporting text:** "macrotrend-driven creation of new jobs is estimated to amount to 170 million jobs, equivalent to 14% of today's total employment."
- **Notes:** This is an extrapolation from employer survey expectations, not an observed outcome and not a WEF econometric forecast. It covers macrotrends in aggregate (technology, demographics, green transition, geoeconomics, economic pressures) — NOT AI alone. The base is 1.2 billion **formal** jobs in the studied dataset, so informal employment (the majority of employment in many low-income countries) is largely outside scope.

#### CLAIM-EMP-02: WEF employers project 92 million jobs displaced by 2030
- **Figure:** 92 million jobs displaced, equivalent to 8% of today's total employment
- **Display:** 92M
- **Basis:** projection
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025)
- **URL:** https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf
- **Supporting text:** "This growth is expected to be offset by the displacement of 92 million current jobs, or 8% of total employment."
- **Notes:** Same survey-extrapolation caveat as CLAIM-EMP-01. "Displaced" means the role declines, not that a named individual becomes unemployed.

#### CLAIM-EMP-03: Net effect is positive in the WEF projection — 78 million net new jobs
- **Figure:** Net growth of 78 million jobs, 7% of today's total employment
- **Display:** +78M
- **Basis:** projection
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025)
- **URL:** https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf
- **Supporting text:** "resulting in a net growth of 78 million jobs (7% of today's total employment) by 2030."
- **Notes:** The headline most worth communicating: the most-cited employer-facing projection is net job *growth*, not net loss. But net growth conceals large gross churn (CLAIM-EMP-04) — the same person is not moved from the displaced column to the created column.

#### CLAIM-EMP-04: Total labour-market churn equals 22% of current formal jobs
- **Figure:** 22% of today's total (formal) jobs — 22% of the 1.2 billion formal jobs in the dataset
- **Display:** 22%
- **Basis:** projection
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025)
- **URL:** https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf
- **Supporting text:** "new job creation and job displacement due to macrotrends will represent a combined total of 22% of today's total (formal) jobs... a structural labour market churn of 22% of the 1.2 billion formal jobs in the dataset being studied."
- **Notes:** Churn is the more honest framing of disruption than net change. Use this alongside the net figure, never instead of it.

#### CLAIM-EMP-05: Almost 40% of global employment is exposed to AI (IMF)
- **Figure:** ~40% of global employment exposed; 60% in advanced economies, 40% in emerging markets, 26% in low-income countries
- **Display:** ~40%
- **Basis:** measured (exposure measure computed on current occupational structures)
- **Source:** International Monetary Fund, *Gen-AI: Artificial Intelligence and the Future of Work* (Staff Discussion Note SDN/2024/001) (2024)
- **URL:** https://www.imf.org/-/media/files/publications/sdn/2024/english/sdnea2024001.pdf
- **Supporting text:** "Almost 40 percent of global employment is exposed to AI... In advanced economies, about 60 percent of jobs are exposed to AI, due to prevalence of cognitive-task-oriented jobs... Overall exposure is 40 percent in emerging market economies and 26 percent in low-income countries."
- **Notes:** **"Exposed" is not "at risk" and not "will be lost."** The IMF splits exposure by complementarity: roughly half of exposed jobs in advanced economies could benefit from AI. This figure is very frequently misreported as "40% of jobs will be destroyed" — do not repeat that error. Exposure is derived from occupational task structures, not from observed job losses.

#### CLAIM-EMP-06: About half of exposed advanced-economy jobs may be negatively affected, half may benefit
- **Figure:** In the average advanced economy, 27% of employment is high-exposure/high-complementarity and 33% is high-exposure/low-complementarity. Emerging markets: 16% and 24%. Low-income countries: 8% and 18%.
- **Display:** 27% / 33%
- **Basis:** measured
- **Source:** International Monetary Fund, *Gen-AI: Artificial Intelligence and the Future of Work* (2024)
- **URL:** https://www.imf.org/-/media/files/publications/sdn/2024/english/sdnea2024001.pdf
- **Supporting text:** "In the average advanced economy, 27 percent of employment is in high-exposure, high-complementarity occupations, 33 percent in high-exposure, low-complementarity jobs. In comparison, emerging market economies have corresponding shares of 16 and 24 percent, respectively, and low-income countries have shares of 8 and 18 percent, respectively."
- **Notes:** This is the single most useful IMF breakdown for an augmentation-vs-displacement narrative, because it splits one headline exposure number into "AI likely helps" and "AI likely substitutes" halves. Complementarity is a modelled index, not an observed outcome.

#### CLAIM-EMP-07: Country-level AI exposure ranges widely
- **Figure:** Almost 70% of UK employment and 60% of US employment is in high-exposure occupations; emerging-market high-exposure employment ranges from 41% (Brazil) to 26% (India)
- **Display:** 70% UK / 60% US
- **Basis:** measured
- **Source:** International Monetary Fund, *Gen-AI: Artificial Intelligence and the Future of Work* (2024)
- **URL:** https://www.elibrary.imf.org/view/journals/006/2024/001/article-A001-en.xml
- **Supporting text:** "Almost 70 and 60 percent of UK and US employment, respectively, is in high-exposure occupations, approximately equally distributed between those that are high- and low-complementarity positions. High-exposure employment in emerging market economies ranges from 41 percent in Brazil to 26 percent in India."
- **Notes:** Uses more refined national occupational classifications than the cross-country figures, so these are not strictly comparable with CLAIM-EMP-05 numbers.

#### CLAIM-EMP-08: Global unemployment is projected stable at about 4.9% in 2026 — no AI-driven employment collapse observed
- **Figure:** Global unemployment rate ~4.9% in 2026, about 186 million people unemployed
- **Display:** 4.9%
- **Basis:** projection (near-term ILO modelled estimate)
- **Source:** International Labour Organization, *Employment and Social Trends 2026* (2026); reported via UN News
- **URL:** https://news.un.org/en/story/2026/01/1166751
- **Supporting text:** "the global unemployment rate is projected to stay stable at around 4.9 per cent this year, equivalent to some 186 million people out of work."
- **Notes:** Important counterweight to displacement narratives: as of the ILO's January 2026 flagship, headline global unemployment is stable, not spiking. The ILO's own framing is that stability is "fragile" and that job *quality*, not headline unemployment, is where deterioration shows. Do not present this as evidence that AI has no labour-market effect — it is evidence that no aggregate employment collapse has been measured.

#### CLAIM-EMP-09: Job quality, not headline unemployment, is where ILO records deficits
- **Figure:** Nearly 300 million workers in extreme poverty (earning less than US$3/day); 2.1 billion workers expected to hold informal jobs by 2026
- **Display:** 2.1B informal
- **Basis:** projection (2026 estimate) / measured (poverty count)
- **Source:** International Labour Organization, *Employment and Social Trends 2026* (2026)
- **URL:** https://www.ilo.org/resource/news/global-job-quality-stagnates-despite-resilient-growth
- **Supporting text:** "Nearly 300 million workers continue to live in extreme poverty, earning less than US$3 a day, while informality is rising, with 2.1 billion workers expected to hold informal jobs by 2026, with limited access to social protection, rights at work, and job security."
- **Notes:** Directly relevant framing: most of the world's workforce is in informal work that sits largely outside the datasets used for AI-exposure and employer-survey projections. Any 2045 narrative that treats "the workforce" as formal-sector office work is describing a minority of global workers.

#### CLAIM-EMP-10: Youth face the sharpest pressure, and the ILO explicitly flags AI as a risk factor for them
- **Figure:** Youth unemployment 12.4% in 2025; around 260 million young people not in education, employment or training (NEET); NEET rate 27.9% in low-income countries
- **Display:** 12.4%
- **Basis:** measured
- **Source:** International Labour Organization, *Employment and Social Trends 2026* (2026)
- **URL:** https://www.ilo.org/resource/news/global-job-quality-stagnates-despite-resilient-growth
- **Supporting text:** "Youth unemployment climbed to 12.4 per cent in 2025, with around 260 million young people not in education, employment or training (NEET). In low-income countries, NEET rates are a daunting 27.9 per cent. The ILO warned that artificial intelligence and automation could exacerbate challenges, particularly for educated youth in high-income countries seeking their first job in high skill occupations."
- **Notes:** The ILO's caution about first-job entry in high-skill occupations is a *warning*, not a measured AI effect. Do not present the 12.4% rate as AI-caused; it is a measured youth unemployment rate with multiple drivers.

---

## Topic 2 — Automation vs augmentation

#### CLAIM-AUG-01: ILO finds augmentation, not automation, is the dominant expected effect of generative AI
- **Figure:** Qualitative core finding — augmentation potential exceeds automation potential in every income group
- **Display:** Augmentation > automation
- **Basis:** projection (modelled potential, explicit upper bound on exposure)
- **Source:** International Labour Organization, *Generative AI and jobs: A global analysis of potential effects on job quantity and quality* (ILO Working Paper 96, Gmyrek, Berg & Bescond) (2023)
- **URL:** https://www.ilo.org/sites/default/files/2024-07/WP96_web.pdf
- **Supporting text:** "the most important impact of the technology is likely to be of augmenting work – automating some tasks within an occupation while leaving time for other duties – as opposed to fully automating occupations."
- **Notes:** This is the single most important framing claim in the whole evidence base and it comes from a primary UN source. The paper explicitly calls its exposure estimates an **upper bound**, and states "the primary value of this analysis is not the precise estimates, but rather the insights that the overall distribution of such scores provides about the nature of possible changes."

#### CLAIM-AUG-02: Only clerical work is highly exposed as a broad occupational group
- **Figure:** 24% of clerical tasks highly exposed, plus 58% at medium exposure. For all other occupational groups, highly exposed tasks range between 1% and 4%, and medium-exposed tasks do not exceed 25%.
- **Display:** 24% of clerical tasks
- **Basis:** projection
- **Source:** International Labour Organization, *ILO Working Paper 96* (2023). These figures belong to WP96 and have no equivalent in WP140, which abandoned the automation/augmentation split.
- **URL:** https://webapps.ilo.org/static/english/intserv/working-papers/wp096/index.html
- **Supporting text:** "only the broad occupation of clerical work is highly exposed to the technology with 24 per cent of clerical tasks considered highly exposed and an additional 58 percent with medium-level exposure. For the other occupational groups, the greatest share of highly exposed tasks oscillates between 1 and 4 per cent, and medium exposed tasks do not exceed 25 per cent."
- **Notes:** Scores produced by prompting GPT-4 on ISCO-08 4-digit task descriptions. The authors note GPT is "likely to reflect techno-optimism and overstate some task-level scores," and that the analysis ignores adoption constraints (electricity, internet, relative labour cost, digital literacy, finance).

#### CLAIM-AUG-03: Automation potential rises with country income; augmentation potential is large everywhere
- **Figure:** Automation-potential employment share: 0.4% in low-income countries vs 5.5% in high-income countries. Augmentation potential: 10.4% (LIC) to 13.4% (HIC), with UMIC at 13.5%.
- **Display:** 0.4% vs 5.5%
- **Basis:** projection
- **Source:** International Labour Organization, *ILO Working Paper 96* (2023)
- **URL:** https://webapps.ilo.org/static/english/intserv/working-papers/wp096/index.html
- **Supporting text:** "In low-income countries, only 0.4 per cent of total employment is potentially exposed to automation effects, whereas in high-income countries the share rises to 5.5 percent... The greater impact is from augmentation, which has the potential to affect 10.4 percent of employment in low-income countries and 13.4 percent of employment in high-income countries."
- **Notes:** The paper's own interpretation: "wealthier countries are likely to face both more disruptive effects in the technological transition and higher net gains from the process." It also warns these figures ignore infrastructure constraints, which "will impede the possibility for use in lower-income countries and likely increase the productivity gap." These automation/augmentation split figures belong to WP96 (2023) only: WP140 abandoned the split entirely and carries no equivalent numbers.

#### CLAIM-AUG-04: ILO's 2025 refined index — one in four workers globally has some GenAI exposure
- **Figure:** About one quarter of global employment falls into one of four exposure gradients; 3.3% of global employment is in the highest exposure gradient
- **Display:** 1 in 4
- **Basis:** projection
- **Source:** International Labour Organization, *Generative AI and jobs: A Refined Global Index of Occupational Exposure* (ILO Working Paper 140) (2025)
- **URL:** https://webapps.ilo.org/static/english/intserv/working-papers/wp140/index.html
- **Supporting text:** "Globally, one in four workers are in an occupation with some GenAI exposure. 3.3% of global employment falls into the highest exposure category... As most occupations consist of tasks that require human input, transformation of jobs is the most likely impact of GenAI."
- **Notes:** This is the **most recent ILO methodology (May 2025)** and should be preferred over WP96 where they overlap. Method: 29,753 tasks in Poland's 6-digit occupational classification, a survey of 1,640 workers across all ISCO-08 1-digit groups yielding 52,558 data points on 2,861 tasks, plus Delphi-style expert validation. 112 occupations fall in gradients 1-4; 13 occupations are in gradient 4, mostly clerical (data entry clerks, typists, accounting and bookkeeping clerks, general office clerks).

#### CLAIM-AUG-05: The 2025 update replaced the binary automation/augmentation split with a four-gradient spectrum
- **Figure:** Four progressive exposure gradients replacing the earlier automation / augmentation / "big unknown" categorisation
- **Display:** 4 gradients
- **Basis:** measured (methodological description)
- **Source:** International Labour Organization, *Research Brief: Generative AI and jobs — a 2025 update* (summarising Working Paper 140) (2025)
- **URL:** https://www.ilo.org/sites/default/files/2025-05/Research%20brief_GenAI%202025%20Update.pdf
- **Supporting text:** "Gradient 1 represents occupations with low overall GenAI exposure but significant variability across tasks... aligning closely with the notion of augmentation in the old framework... Gradient 4 highlights occupations with the highest share of tasks exposed to potential GenAI-driven automation... This gradient aligns closely with the notion of automation risk in our 2023 classification."
- **Notes:** Useful for product design: the authoritative source moved *away* from a binary automate/augment framing toward a spectrum, and says so explicitly. The brief also stresses "these classifications are only illustrative, since any type of task scoring system carries a degree of subjectivity, and since the abilities of GenAI and derivative technologies evolve rapidly."

#### CLAIM-AUG-06: Two years of real-world GenAI use lowered estimated automation potential for the most-exposed tasks
- **Figure:** In 2023 some task scores reached 0.9; for the 2025 estimates the highest task-level score is 0.76 and the highest occupational mean is 0.7
- **Display:** 0.9 → 0.76
- **Basis:** measured (revision of the source's own estimates)
- **Source:** International Labour Organization, *Research Brief: Generative AI and jobs — a 2025 update* (2025)
- **URL:** https://www.ilo.org/sites/default/files/2025-05/Research%20brief_GenAI%202025%20Update.pdf
- **Supporting text:** "While tasks such as taking meeting notes or scheduling appointments can significantly benefit from GenAI support, our 2023 scores, which for some tasks reached as high as 0.9, reflected an overly optimistic assessment of full automation potential. For the 2025 estimates, the highest task level score is 0.76, and the highest occupational mean is 0.7 (Gradient 4), meaning that there are still some tasks even within these higher-risk occupations that require human input."
- **Notes:** Strong, quotable evidence that early automation estimates were too aggressive and were revised *down* once practitioners had hands-on experience. Directly supports a cautious stance on long-horizon prediction. Note the partly offsetting revision in CLAIM-AUG-07.

#### CLAIM-AUG-07: The highest-exposure share rose slightly between ILO editions, despite lower task scores
- **Figure:** The 2023 study attributed 2.3% of global employment to the "automation" category; the 2025 study assigns 3.3% to gradient 4 — one percentage point higher
- **Display:** 2.3% → 3.3%
- **Basis:** measured (revision of the source's own estimates)
- **Source:** International Labour Organization, *Research Brief: Generative AI and jobs — a 2025 update* (2025)
- **URL:** https://www.ilo.org/sites/default/files/2025-05/Research%20brief_GenAI%202025%20Update.pdf
- **Supporting text:** "The previous version attributed 2.3% of global employment to the 'automation' category, one percentage point lower than the 3.3% assigned to gradient 4."
- **Notes:** Pair with CLAIM-AUG-06 — these move in opposite directions and both are true. Individual task automation scores fell, while the share of employment in the top category rose (partly because gradient 4 is defined by mean *and* dispersion, not mean alone). Presenting only one of the two would misrepresent the revision.

#### CLAIM-AUG-08: Some digitised professional and technical roles gained exposure in the 2025 update
- **Figure:** Qualitative finding — exposure expanded beyond clerical work into strongly digitised specialist roles
- **Display:** Expanding to specialists
- **Basis:** projection
- **Source:** International Labour Organization, *ILO Working Paper 140* (2025)
- **URL:** https://webapps.ilo.org/static/english/intserv/working-papers/wp140/index.html
- **Supporting text:** "Clerical occupations continue to have the highest exposure levels. Additionally, some strongly digitized occupations have increased exposure, highlighting the expanding abilities of GenAI regarding specialized tasks in professional and technical roles."
- **Notes:** Counters the assumption that only low-skill or clerical work is affected. No specific employment share was published for this expansion in the material retrieved, so do not attach a number to it.

#### CLAIM-AUG-09: Workers themselves mostly expect no or slight impact on jobs in their industry
- **Figure:** 26.5% of surveyed workers expect no impact and 30.2% expect only a slight impact from GenAI on jobs in their industry
- **Display:** 57% expect little/no impact
- **Basis:** measured (worker survey)
- **Source:** International Labour Organization, *ILO Working Paper 140* (2025)
- **URL:** https://webapps.ilo.org/static/english/intserv/working-papers/wp140/index.html
- **Supporting text:** "When considering the potential impact of GenAI on jobs within their industries, most respondents expect either no impact (26.5%) or only a slight impact (30.2%)... relatively few respondents predict a complete transformation of their occupations, with the highest share of such responses among service and sales workers (5.1%) and clerical support workers (4.2%)."
- **Notes:** The Display value 57% is the arithmetic sum of two published figures (26.5 + 30.2 = 56.7, rounded). If you prefer to avoid derived numbers, display "26.5% no impact / 30.2% slight impact" instead. Sample is 1,640 workers, drawn from Poland — **not globally representative**. This survey asked about impact on jobs in the respondent's *industry*, **not on their own job**, and the two must not be conflated. The paper notes managers (ISCO group 1) plus groups 8 and 9 were over-represented relative to national labour market patterns, while professionals (group 2) were the most under-represented.

---

## Topic 3 — The skills shift

#### CLAIM-SKILL-01: Employers expect 39% of workers' core skills to change by 2030 — and skill instability is falling
- **Figure:** 39% of workers' existing skill sets will be transformed or become outdated over 2025-2030, down from 44% in 2023 and 57% in 2020
- **Display:** 39%
- **Basis:** projection
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025)
- **URL:** https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/
- **Supporting text:** "On average, workers can expect that two-fifths (39%) of their existing skill sets will be transformed or become outdated over the 2025-2030 period. However, this measure of 'skill instability' has slowed compared to previous editions of the report, from 44% in 2023 and a high point of 57% in 2020."
- **Notes:** The *decline* from 44% to 39% is as newsworthy as the level and is usually omitted in secondary coverage. WEF attributes part of the slowdown to more workers having completed training (see CLAIM-SKILL-05). Do not describe 39% as "39% of jobs" — it is share of skill sets.

#### CLAIM-SKILL-02: 59 of every 100 workers will need training by 2030; 11 will not get it
- **Figure:** Of 100 workers: 59 need training by 2030 — 29 upskilled within current roles, 19 reskilled and redeployed, 11 unlikely to receive the training needed. 41 need no significant training.
- **Display:** 59 in 100
- **Basis:** projection
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025)
- **URL:** https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf
- **Supporting text:** "if the world's workforce was made up of 100 people, 59 would need training by 2030. Of these, employers foresee that 29 could be upskilled in their current roles and 19 could be upskilled and redeployed elsewhere within their organization. However, 11 would be unlikely to receive the reskilling or upskilling needed, leaving their employment prospects increasingly at risk."
- **Notes:** The best single statistic in the evidence base for a reskilling narrative, because it contains its own equity problem: the 11 left behind. WEF's press release converts that 11% into "over 120 million workers at medium-term risk of redundancy" (see CLAIM-SKILL-03).

#### CLAIM-SKILL-03: Over 120 million workers are at medium-term risk of redundancy
- **Figure:** More than 120 million workers
- **Display:** 120M+
- **Basis:** projection
- **Source:** World Economic Forum, *Future of Jobs Report 2025* press release (2025)
- **URL:** https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/
- **Supporting text:** "If the global workforce were represented by a group of 100 people, 59 are projected to require reskilling or upskilling by 2030 – 11 of whom are unlikely to receive it; this translates to over 120 million workers at medium-term risk of redundancy."
- **Notes:** This is WEF applying the 11-in-100 share to their formal-jobs base. It is a derived figure, published by WEF itself, so it is citable — but it inherits every caveat of the survey extrapolation and the formal-jobs-only base.

#### CLAIM-SKILL-04: Skills gaps are the top barrier to business transformation
- **Figure:** 63% of employers identify skill gaps as a major barrier over 2025-2030
- **Display:** 63%
- **Basis:** measured (employer survey)
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025)
- **URL:** https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf
- **Supporting text:** "Skill gaps are categorically considered the biggest barrier to business transformation by Future of Jobs Survey respondents, with 63% of employers identifying them as a major barrier over the 2025-2030 period."
- **Notes:** Measured employer opinion as of the late-2024 survey, not a projection. Employer-reported barriers can be self-serving (skills shortages are a common explanation for hiring difficulty that might have other causes such as pay).

#### CLAIM-SKILL-05: Half the workforce has now completed employer training, up from 41% in 2023
- **Figure:** 50% of the workforce has completed training as part of learning and development initiatives, up from 41% in 2023
- **Display:** 50%
- **Basis:** measured (employer-reported)
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025)
- **URL:** https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/
- **Supporting text:** "Future of Jobs Survey respondents indicate that 50% of their workforce has completed training as part of their learning and development initiatives. This reflects a positive global trend compared to 2023, when only 41% of the workforce had received training. The rise in training completion is evident across nearly all industries."
- **Notes:** Self-reported by employers about their own workforces, and these are large global employers — likely an optimistic upper bound relative to SMEs and informal employment.

#### CLAIM-SKILL-06: AI and big data is the fastest-growing skill; human skills remain core
- **Figure:** Top three fastest-growing skills to 2030: AI and big data; networks and cybersecurity; technological literacy. Also rising: creative thinking, resilience/flexibility/agility, curiosity and lifelong learning.
- **Display:** AI & big data #1
- **Basis:** projection
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025)
- **URL:** https://www.weforum.org/publications/the-future-of-jobs-report-2025/digest/
- **Supporting text:** "AI and big data top the list of fastest-growing skills, followed closely by networks and cybersecurity as well as technology literacy. Complementing these technology-related skills, creative thinking, resilience, flexibility and agility, along with curiosity and lifelong learning, are also expected to continue to rise in importance over the 2025-2030 period."
- **Notes:** Fastest-*growing* is not the same as most-important. WEF separately reports that analytical thinking remains the top core skill overall, with human skills such as resilience, leadership and collaboration staying critical — technology skills growing fastest does not mean they outrank human skills in absolute importance.

#### CLAIM-SKILL-07: Manual dexterity, endurance and precision are the clearest declining skills
- **Figure:** Manual dexterity, endurance and precision show notable net declines, with 24% of respondents foreseeing a decrease in their importance
- **Display:** 24%
- **Basis:** projection
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025)
- **URL:** https://www.weforum.org/publications/the-future-of-jobs-report-2025/digest/
- **Supporting text:** "manual dexterity, endurance and precision stand out with notable net declines in skills demand, with 24% of respondents foreseeing a decrease in their importance."
- **Notes:** One of very few skills categories with a clear net decline in employer expectations. Most skills in the WEF list are rising or flat.

#### CLAIM-SKILL-08: A combination of technology and human skills is what employers say growing jobs require
- **Figure:** Qualitative finding — both skill types increasingly required together
- **Display:** Tech + human skills
- **Basis:** measured (employer survey interpretation by source)
- **Source:** World Economic Forum, *Future of Jobs Report 2025* press release (2025)
- **URL:** https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/
- **Supporting text:** "Technology skills in AI, big data and cybersecurity are expected to see rapid growth in demand, but human skills, such as creative thinking, resilience, flexibility and agility, will remain critical. A combination of both skill types will be increasingly crucial in a fast-shifting job market."
- **Notes:** Supports a "both/and" rather than "learn to code" narrative. This is WEF's characterisation of its survey, not an independently measured outcome.

#### CLAIM-SKILL-09: AI shifts skill demand toward management, business and digital skills, away from some cognitive and clerical tasks
- **Figure:** Qualitative finding on direction of skill demand shift
- **Display:** Toward management & digital
- **Basis:** measured (research synthesis by OECD)
- **Source:** OECD, *OECD Employment Outlook 2023: Artificial Intelligence and the Labour Market* (2023), DOI 10.1787/08785bba-en
- **URL:** https://doi.org/10.1787/08785bba-en
- **Supporting text:** AI is shifting the demand for skills in the labour market by increasing the need for management, business, and digital skills while reducing demand for some cognitive and clerical tasks.
- **Notes:** This is the OECD Employment Outlook edition devoted to AI and the labour market, published 11 July 2023 — **the 2025 edition contains no AI chapter**, so it cannot carry this claim. Note the important asymmetry OECD draws: AI exposure is higher for highly educated cognitive workers, but *automation* risk from all technologies is higher for more routine occupations. Exposure and automation risk point at different groups. OECD countries only.

#### CLAIM-SKILL-10: Training participation collapses with age
- **Figure:** Only about one third of adults aged 60-65 participated in training in 2023, compared with over half of those aged 25-44
- **Display:** 1/3 vs 1/2
- **Basis:** measured
- **Source:** OECD, *OECD Employment Outlook 2025: Can We Get Through the Demographic Crunch?* (2025)
- **URL:** https://www.oecd.org/en/publications/2025/07/oecd-employment-outlook-2025_5345f034.html
- **Supporting text:** "adults aged 60-65 years old have significantly lower literacy and adaptive problem-solving skills than younger workers. And only a third of adults aged 60-65 years participated in training in 2023, compared to over half of those aged 25-44. There is therefore an urgent need to boost the skills of older workers and promote their participation in well-targeted training."
- **Notes:** OECD countries only — not global. Strong evidence that the reskilling burden falls unevenly by age, and that the group most likely to need retraining is least likely to receive it. OECD notes part of the skills gap reflects cohort differences in educational attainment, but also that skill levels declined with age *within* cohorts over the past decade.

---

## Topic 4 — Emerging and growing occupations

**Read this before using any list below.** "Fastest growing" (percentage change) and "largest growth" (absolute numbers) produce almost completely different lists, and conflating them is the most common error in this topic. Tech roles dominate the percentage lists; frontline, care and education roles dominate the absolute lists. Both WEF and BLS publish the two separately, and so should we.

#### CLAIM-JOB-01: WEF's fastest-growing roles by percentage are technology roles
- **Figure:** Top of the list: Big Data Specialists, FinTech Engineers, AI and Machine Learning Specialists, Software and Applications Developers. Also in the top 15: Security Management Specialists, Data Warehousing Specialists, Autonomous and Electric Vehicle Specialists, UI and UX Designers, Light Truck or Delivery Services Drivers, Internet of Things Specialists, Data Analysts and Scientists, Environmental Engineers, Information Security Analysts, DevOps Engineers, Renewable Energy Engineers.
- **Display:** Big Data Specialists #1
- **Basis:** projection
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025)
- **URL:** https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/2-jobs-outlook/
- **Supporting text:** "Leading the fastest growing jobs list are roles such as Big Data Specialist, FinTech Engineers, AI and Machine Learning Specialists and Software and Applications Developers."
- **Notes:** **Percentage growth from a small base.** A role can top this list while adding few jobs in absolute terms. Note that Light Truck or Delivery Services Drivers appears in the fastest-growing top 10 despite not being a tech specialist role. Green and energy transition roles also feature.

#### CLAIM-JOB-02: WEF's largest absolute growth is in frontline, care and education roles
- **Figure:** Largest job growth in absolute terms: farmworkers, delivery drivers, construction workers; plus care roles (nursing professionals) and education roles (secondary school teachers)
- **Display:** Frontline & care roles
- **Basis:** projection
- **Source:** World Economic Forum, *Future of Jobs Report 2025* press release (2025)
- **URL:** https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/
- **Supporting text:** "Frontline roles, including farmworkers, delivery drivers and construction workers, are poised to see the largest job growth in absolute terms by 2030. Significant increases are also projected for care jobs, such as nursing professionals, and education roles, such as secondary school teachers, with demographic trends driving growth in demand across essential sectors."
- **Notes:** This is the single most important corrective to a tech-only narrative about the future of work. The drivers here are demographic (ageing populations in richer countries driving healthcare demand; growing working-age populations in lower-income regions driving education demand), not primarily AI.

#### CLAIM-JOB-03: WEF's fastest-declining roles are clerical and secretarial, now joined by graphic designers
- **Figure:** Fastest declining: various clerical roles including Cashiers and Ticket Clerks, Administrative Assistants and Executive Secretaries, Printing Workers, Accountants and Auditors; also Postal Service Clerks, Bank Tellers, Data Entry Clerks. Graphic designers newly appear among declining roles.
- **Display:** Clerical roles declining
- **Basis:** projection
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025)
- **URL:** https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/2-jobs-outlook/
- **Supporting text:** "respondents expect the fastest-declining roles to include various clerical roles, such as Cashiers and Ticket Clerks, alongside Administrative Assistants and Executive Secretaries, Printing Workers, and Accountants and Auditors." And from the press release: "roles such as cashiers and administrative assistants remain among the fastest declining but are now joined by roles including graphic designers as generative AI rapidly reshapes the labour market."
- **Notes:** The graphic designer entry is the clearest single signal in the WEF data that generative AI is now touching creative roles, and WEF says so explicitly. Clerical and Secretarial Workers are ALSO the largest decline in absolute terms — this is the one category that tops both the fastest-declining and largest-declining lists. Drivers named include broadening digital access, AI and information processing, robotics, plus ageing/declining working-age populations and slower economic growth.

#### CLAIM-JOB-04: Broadening digital access is the most transformative trend employers name
- **Figure:** 60% of employers expect broadening digital access to transform their business by 2030; AI and information processing 86%; robotics and automation 58%; energy generation, storage and distribution 41%
- **Display:** 86% AI
- **Basis:** measured (employer survey)
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025)
- **URL:** https://www.weforum.org/publications/the-future-of-jobs-report-2025/digest/
- **Supporting text:** "Broadening digital access is expected to be the most transformative trend – both across technology-related trends and overall – with 60% of employers expecting it to transform their business by 2030. Advancements in technologies, particularly AI and information processing (86%); robotics and automation (58%); and energy generation, storage and distribution (41%), are also expected to be transformative."
- **Notes:** Careful with these two numbers: WEF calls broadening digital access the most transformative *trend overall* (60%), while AI and information processing carries the higher percentage (86%) as a technology advancement. They are reported in different framings in the source; do not present 60% and 86% as a simple ranked pair without that context.

#### CLAIM-JOB-05: Trend-level job creation and displacement figures for digital access and AI
- **Figure:** Broadening digital access: expected to create 19 million jobs and displace 9 million by 2030. AI and information processing: 11 million created, 9 million displaced.
- **Display:** 19M / 9M
- **Basis:** projection
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025), reported via WEF Stories
- **URL:** https://www.weforum.org/stories/2025/01/future-of-jobs-report-2025-the-fastest-growing-and-declining-jobs/
- **Supporting text:** "The report says growing digital access is expected to create 19 million jobs by 2030 and replace 9 million. AI and data processing alone will create 11 million roles and replace 9 million."
- **Notes:** Useful because it isolates AI's own projected contribution: net +2 million from AI and data processing specifically, a small fraction of the 78 million net total. Anyone attributing the whole 78 million net figure to AI is misreading the report. Retrieved from WEF's own editorial summary of the report rather than the report PDF body.

#### CLAIM-JOB-06: Slower economic growth is the only macrotrend WEF respondents expect to destroy more jobs than it creates
- **Figure:** Slower economic growth: 3 million jobs destroyed vs 2 million created. Price pressures and slower growth together projected to displace 6 million jobs globally by 2030.
- **Display:** −1M net
- **Basis:** projection
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025); press release
- **URL:** https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/2-jobs-outlook/
- **Supporting text:** "Slower economic growth is the only macrotrend that Future [of Jobs Survey respondents expect] to drive more job destruction (3 million jobs) than creation (2 million jobs)." Press release: "price pressures and slower economic growth are projected to displace 6 million jobs globally by 2030."
- **Notes:** Notable and under-reported: in employers' own expectations, **economic conditions are the only net-negative macrotrend — technology is not.** The 2-and-3 million figures came through as a partially truncated passage in retrieval; the direction and the "only macrotrend" claim are clear, but verify exact digits against the report PDF before putting them in a chart.

#### CLAIM-JOB-07: US BLS projects total employment growth of 5.2 million jobs, 2024-2034
- **Figure:** Total employment rising from 169,956,100 (2024) to 175,167,900 (2034); +5,211,800 jobs; +3.1%, slower than the 13.0% growth over 2014-2024
- **Display:** +5.2M (3.1%)
- **Basis:** projection
- **Source:** US Bureau of Labor Statistics, *Employment Projections — 2024-2034* (2025)
- **URL:** https://www.bls.gov/news.release/ecopro.nr0.htm
- **Supporting text:** "The U.S. economy is projected to add 5.2 million jobs from 2024 to 2034... Total employment is projected to increase to 175.2 million and grow 3.1 percent, which is slower than the 13.0-percent growth recorded over the 2014-24 decade."
- **Notes:** US-only. The deceleration from 13.0% to 3.1% is driven substantially by demographics and labour force growth, not primarily AI. This is a national statistical office projection using a formal model — methodologically stronger than employer-survey extrapolation, but single-country.

#### CLAIM-JOB-08: BLS fastest-growing occupations are dominated by green energy and healthcare, not AI
- **Figure:** Wind turbine service technicians +49.9% (13,600 → 20,500); solar photovoltaic installers +42.1% (28,600 → 40,600); nurse practitioners +40.1% (320,400 → 448,800); data scientists +33.5% (245,900 → 328,300); information security analysts +29%
- **Display:** +50% wind techs
- **Basis:** projection
- **Source:** US Bureau of Labor Statistics, *Fastest growing occupations, 2024 and projected 2034* (Table 1.3) (2025)
- **URL:** https://www.bls.gov/emp/tables/fastest-growing-occupations.htm
- **Supporting text:** From BLS Table 1.3: "Wind turbine service technicians | 49-9081 | 13.6 | 20.5 | 6.8 | 49.9 | 62,580"; "Solar photovoltaic installers | 47-2231 | 28.6 | 40.6 | 12.0 | 42.1"; "Nurse practitioners | 29-1171 | 320.4 | 448.8 | 128.4 | 40.1"; "Data scientists | 15-2051 | 245.9 | 328.3 | 82.5 | 33.5". BLS narrative: "The projected fastest growing occupations over the 2024-34 decade are wind turbine service technicians and solar photovoltaic installers. Although fast growing, the two occupations combined will add fewer than 20,000 new jobs."
- **Notes:** BLS itself supplies the caveat that makes this claim honest: the two fastest-growing occupations in percentage terms add **fewer than 20,000 jobs combined**. This is the clearest available illustration of why percentage growth alone misleads.

#### CLAIM-JOB-09: BLS largest absolute growth is home health and personal care aides, by a wide margin
- **Figure:** Home health and personal care aides +739,800 (4,347,700 → 5,087,500; +17.0%), median pay $34,900. Next: software developers +267,700; stockers and order fillers +235,000; fast food and counter workers +233,200; cooks, restaurant +217,000; registered nurses +166,100; general and operations managers +164,000.
- **Display:** +740K care aides
- **Basis:** projection
- **Source:** US Bureau of Labor Statistics, *Occupations with the most job growth, 2024 and projected 2034* (Table 1.4) (2025)
- **URL:** https://www.bls.gov/emp/tables/occupations-most-job-growth.htm
- **Supporting text:** From BLS Table 1.4: "Home health and personal care aides | 31-1120 | 4,347.7 | 5,087.5 | 739.8 | 17.0 | 34,900"; "Software developers | 15-1252 | 1,693.8 | 1,961.4 | 267.7 | 15.8 | 133,080".
- **Notes:** The pay contrast is stark and worth surfacing: the largest-growth occupation pays $34,900 while software developers (second largest) pay $133,080. Growth in jobs does not imply growth in good jobs. Care work is the largest single source of new US employment in this projection, and it is a low-wage, hard-to-automate, human-contact occupation.

#### CLAIM-JOB-10: BLS names computer and mathematical occupations the second fastest-growing group, driven partly by AI demand
- **Figure:** Computer and mathematical occupations +10.1%, more than three times the 3.1% total economy rate. Healthcare support +12.4%; healthcare practitioners and technical +7.2%; community and social service +6.6%.
- **Display:** +10.1%
- **Basis:** projection
- **Source:** US Bureau of Labor Statistics, *Employment Projections — 2024-2034* (2025)
- **URL:** https://www.bls.gov/news.release/ecopro.nr0.htm
- **Supporting text:** "Computer and mathematical occupations are projected to grow the second fastest of any occupational group (+10.1 percent), which is more than three times the average rate of growth projected for the total economy (+3.1 percent). The fast growth of these occupations is expected to stem in part from demand for continued development of AI solutions and an increasing amount of data available for analysis."
- **Notes:** A national statistical agency explicitly attributing part of projected occupational growth to AI development demand — useful because it is AI as a *job creator* in an official projection. Healthcare support still grows faster (12.4%).

---

## Topic 5 — Workplace safety, ethics, governance

#### CLAIM-GOV-01: The EU AI Act classifies employment and worker-management AI as high-risk
- **Figure:** Annex III point 4 covers recruitment/selection AI and AI making decisions on terms of work, promotion, termination, task allocation, and performance/behaviour monitoring
- **Display:** High-risk (Annex III.4)
- **Basis:** measured (legal instrument text)
- **Source:** European Union, *Regulation (EU) 2024/1689 (AI Act)*, Annex III (2024), as amended by Regulation (EU) 2026/1744
- **URL:** https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3
- **Supporting text:** "4. Employment, workers' management and access to self-employment: (a) AI systems intended to be used for the recruitment or selection of natural persons, in particular to place targeted job advertisements, to analyse and filter job applications, and to evaluate candidates; (b) AI systems intended to be used to make decisions affecting terms of work-related relationships, the promotion or termination of work-related contractual relationships, to allocate tasks based on individual behaviour or personal traits or characteristics or to monitor and evaluate the performance and behaviour of persons in such relationships."
- **Notes:** This is binding EU law, not guidance — the strongest governance claim available. Scope is EU-linked deployment. High-risk classification triggers the Section 2 requirements (risk management, data governance, technical documentation, record-keeping, transparency, human oversight, accuracy/robustness/cybersecurity), not a ban. Note Article 6(3) contains narrow exceptions, e.g. purely retrospective anonymised bias-auditing of completed human decisions. **Timing:** Regulation (EU) 2026/1744 (the Digital Omnibus on AI, in force 27 July 2026) delayed application. The Annex III high-risk obligations, including the employment category, **apply from 2 December 2027**, not 2 August 2026; Annex I embedded high-risk applies from 2 August 2028. The duties are enacted but not yet applicable, so employers are **not currently bound** by them.

#### CLAIM-GOV-02: The AI Act will require human oversight with genuine override and stop capability
- **Figure:** Article 14 — oversight persons must be able to understand capabilities/limitations, remain aware of automation bias, correctly interpret output, decide not to use or to disregard/override/reverse output, and intervene or halt the system
- **Display:** Article 14
- **Basis:** measured (legal instrument text)
- **Source:** European Union, *Regulation (EU) 2024/1689 (AI Act)*, Article 14 (2024)
- **URL:** https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-14
- **Supporting text:** "(b) to remain aware of the possible tendency of automatically relying or over-relying on the output produced by a high-risk AI system (automation bias)... (d) to decide, in any particular situation, not to use the high-risk AI system or to otherwise disregard, override or reverse the output of the high-risk AI system; (e) to intervene in the operation of the high-risk AI system or interrupt the system through a 'stop' button or a similar procedure that allows the system to come to a halt in a safe state."
- **Notes:** **Automation bias is named explicitly in binding law.** That is a strong, specific, verifiable detail for any "human in the loop" design narrative. For remote biometric identification under Annex III point 1(a), Article 14(5) additionally requires separate verification by at least two competent persons (with exceptions for law enforcement, migration, border control, asylum). The article numbers are confirmed correct; as applied to the Annex III employment category, Article 14 **applies from 2 December 2027** following the Regulation (EU) 2026/1744 delay. Write this in the future tense: employers are not yet bound.

#### CLAIM-GOV-03: Employers will have to inform workers and their representatives before deploying high-risk AI in the workplace
- **Figure:** Article 26(7) — prior information duty to workers' representatives and affected workers; Article 26(2) requires competent, trained, authorised human oversight; logs kept at least six months; Article 26(11) requires informing individuals subject to AI-assisted decisions
- **Display:** Notify workers first
- **Basis:** measured (legal instrument text)
- **Source:** European Union, *Regulation (EU) 2024/1689 (AI Act)*, Article 26 (2024)
- **URL:** https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26
- **Supporting text:** "7. Before putting into service or using a high-risk AI system at the workplace, deployers who are employers shall inform workers' representatives and the affected workers that they will be subject to the use of the high-risk AI system." And: "2. Deployers shall assign human oversight to natural persons who have the necessary competence, training and authority, as well as the necessary support."
- **Notes:** A concrete, checkable worker right: notification must come *before* deployment. Note the qualifier that oversight persons need competence, training **and authority** — nominal oversight by someone without power to override does not satisfy the Article. The article numbers are confirmed correct; as applied to the Annex III employment category, Article 26 **applies from 2 December 2027** following the Regulation (EU) 2026/1744 delay, so this is a duty employers will acquire rather than one they currently carry.

#### CLAIM-GOV-04: EU guidance recognises that formal human oversight can be substantively hollow
- **Figure:** Worked example — algorithmic pay-setting where "Human oversight exists formally, but in practice pay levels are determined exclusively by the algorithm and appeals rarely alter outcomes"
- **Display:** Oversight ≠ real control
- **Basis:** measured (official guidance example)
- **Source:** European Commission, *AI Act Service Desk — Employment use cases* (undated guidance, accessed August 2026)
- **URL:** https://ai-act-service-desk.ec.europa.eu/en/employment-0
- **Supporting text:** "A ride-hailing platform deploys an AI system to dynamically set driver compensation... drivers with consistently lower passenger ratings or slower completion times receive a reduced pay coefficient... Human oversight exists formally, but in practice pay levels are determined exclusively by the algorithm and appeals rarely alter outcomes. Since remuneration decisions fall within the terms of a work-related relationship, the system falls within the use case of point 4(b) of Annex III."
- **Notes:** Exceptionally useful: an official EU source acknowledging the gap between nominal and effective human oversight, and treating that gap as a reason the system still counts as high-risk. The same guidance notes elsewhere that where a system "materially influences" outcomes, formal human review does not exempt it. This is guidance/illustration, not the Regulation text itself.

#### CLAIM-GOV-05: UNESCO's Recommendation on the Ethics of AI is the first global standard, applicable to all member states
- **Figure:** Adopted 23 November 2021; applicable to all 194 UNESCO member states (193 member states adopted it)
- **Display:** 194 states
- **Basis:** measured
- **Source:** UNESCO, *Recommendation on the Ethics of Artificial Intelligence* (2021)
- **URL:** https://www.unesco.org/en/articles/recommendation-ethics-artificial-intelligence
- **Supporting text:** "UNESCO's first-ever global standard on AI ethics – the 'Recommendation on the Ethics of Artificial Intelligence', adopted in 2021, is applicable to all 194 member states of UNESCO. The protection of human rights and dignity is the cornerstone of the Recommendation, based on the advancement of fundamental principles such as transparency and fairness, always remembering the importance of human oversight of AI systems."
- **Notes:** Watch the 193/194 discrepancy: UNESCO's own pages use "193 Member States adopted" and "applicable to all 194 member states" in different places (membership changed over time). Prefer quoting the adoption date and "first global standard" framing over a headcount. Critically, a Recommendation is **not binding** like the EU AI Act — it obliges states to apply it at national level and report on progress.

#### CLAIM-GOV-06: UNESCO requires redress mechanisms, auditability, and prohibition where AI would violate human rights
- **Figure:** Policy Area 2 obligations — enforcement mechanisms, remedial actions, auditability and traceability, transparent self-assessment, prohibition of use where it would violate human rights obligations
- **Display:** Redress + auditability
- **Basis:** measured (instrument text)
- **Source:** UNESCO, *Recommendation on the Ethics of Artificial Intelligence* (2021)
- **URL:** https://unesdoc.unesco.org/ark:/48223/pf0000381137.locale=en
- **Supporting text:** "Member States should ensure that harms caused through AI systems are investigated and redressed, by enacting strong enforcement mechanisms and remedial actions... The auditability and traceability of AI systems should be promoted to this end." And: "Member States and public authorities should carry out transparent self-assessment of existing and proposed AI systems... should include further assessment to determine... whether such adoption would result in violations or abuses of Member States' human rights law obligations, and if that is the case, prohibit its use."
- **Notes:** The document also suggests an independent AI Ethics Officer role and certification mechanisms as soft governance. Note it explicitly cautions such mechanisms "should not hinder innovation or disadvantage small and medium enterprises or start-ups."

#### CLAIM-GOV-07: OECD AI Principles are the first intergovernmental AI standard, with 47 adherents
- **Figure:** Adopted 22 May 2019, amended 3 May 2024; five values-based principles plus five recommendations; 47 adherents including the EU
- **Display:** 47 adherents
- **Basis:** measured
- **Source:** OECD, *Recommendation of the Council on Artificial Intelligence* / OECD AI Principles (OECD/LEGAL/0449), adopted 22 May 2019, amended 3 May 2024
- **URL:** https://oecd.ai/en/ai-principles
- **Supporting text:** "The OECD Recommendation on AI is the first intergovernmental standard on AI. Today, there are 47 adherents to the Principles." The five values-based principles: "Inclusive growth, sustainable development and well-being"; "Human rights and democratic values, including fairness and privacy"; "Transparency and explainability"; "Robustness, security and safety"; and accountability.
- **Notes:** Two revisions matter: November 2023 (updated the definition of "AI system") and May 2024 (generative AI, safety, privacy, IP, information integrity). Adherent count is as displayed on OECD.AI at time of retrieval and may change.

#### CLAIM-GOV-08: OECD Principles name labour rights and require human agency and oversight safeguards
- **Figure:** Principle 1.2 requires safeguards including capacity for human agency and oversight; Principle 1.5 (Accountability) names harmful bias and labour rights among risks requiring systematic risk management
- **Display:** Labour rights named
- **Basis:** measured (instrument text)
- **Source:** OECD, *Recommendation of the Council on Artificial Intelligence* (OECD/LEGAL/0449), adopted 22 May 2019, amended 3 May 2024 (the 2024 text is current)
- **URL:** https://legalinstruments.oecd.org/en/instruments/oecd-legal-0449
- **Supporting text:** "AI actors should implement mechanisms and safeguards, such as capacity for human agency and oversight, including to address risks arising from uses outside of intended purpose, intentional misuse, or unintentional misuse." And: "Risks include those related to harmful bias, human rights including safety, security, and privacy, as well as labour and intellectual property rights."
- **Notes:** The explicit mention of "internationally recognised labour rights" and traceability across the AI lifecycle makes this directly relevant to workplace AI, though the instrument is non-binding on adherents.

#### CLAIM-GOV-09: ILO defines algorithmic management and identifies it as the defining feature of platform work
- **Figure:** Definition and scope — algorithmic systems that organise, assign, monitor, supervise and evaluate work; growing across customer service, transport, logistics, banking and healthcare
- **Display:** Algorithmic management
- **Basis:** measured (conceptual/definitional)
- **Source:** International Labour Organization, *Algorithmic management in the workplace* (topic resource) (2024)
- **URL:** https://www.ilo.org/algorithmic-management-workplace
- **Supporting text:** "Algorithmic management refers to algorithmic systems that use tracked data and other information to organize, assign, monitor, supervise and evaluate work. While some algorithmic systems use artificial intelligence to learn and make predictions, algorithmic management can also be based on simple, rules-based systems... Under algorithmic management, workers interact with a system rather than a human manager, thus reducing contact between workers and their managers as well as among co-workers. While the delegation of managerial functions to algorithms is growing across industries, particularly in customer service, transport, logistics, banking and health care, it is the defining feature of digital labour platforms."
- **Notes:** Important nuance for accuracy: **algorithmic management does not require AI.** Rules-based systems count. A product framing this as purely an AI phenomenon would overstate the technology's role.

#### CLAIM-GOV-10: Over 40% of surveyed freelance platform workers reported regular tracking
- **Figure:** More than 40% of workers on freelance platforms reported regularly being tracked for working hours, submitting screenshots of their work, and being required to be available at specified times
- **Display:** 40%+
- **Basis:** measured (worker survey)
- **Source:** Baiocco, Fernandez-Macias, Rani & Pesole, *The Algorithmic Management of work and its implications in different contexts*, EU-ILO Background Paper No. 9 (June 2022), citing ILO 2021 survey
- **URL:** https://www.ilo.org/sites/default/files/wcmsp5/groups/public/%40ed_emp/documents/publication/wcms_849220.pdf
- **Supporting text:** "The ILO survey of workers on freelance platforms shows that more than 40 per cent of the workers reported regularly being tracked for working hours, submitting screenshots of their work and being available at a specified time (ILO, 2021). The degree of monitoring using digital tools and the control that the platforms exercise over the workers often resembles [an employment relationship rather than the self-employment under which they are] typically classified."
- **Notes:** Freelance platform workers specifically — not the general workforce. Do not generalise this to all employees. Note the source type: this is a JRC co-publication in the EU-ILO background paper series, **not an ILO Employment Working Paper**. The paper also documents self-disciplining behaviour among monitored workers, GPS-based behavioural tracking of drivers, and pressure on delivery workers from real-time client tracking.

#### CLAIM-GOV-11: Algorithmic management concentrates knowledge and control, creating information asymmetry
- **Figure:** Qualitative mechanism — centralisation of knowledge and control, power imbalance from opacity
- **Display:** Information asymmetry
- **Basis:** measured (research analysis)
- **Source:** Baiocco, Fernandez-Macias, Rani & Pesole, *The Algorithmic Management of work and its implications in different contexts*, EU-ILO Background Paper No. 9 (June 2022)
- **URL:** https://www.ilo.org/sites/default/files/wcmsp5/groups/public/%40ed_emp/documents/publication/wcms_849220.pdf
- **Supporting text:** "pervasive monitoring and surveillance in algorithmic management leads to information asymmetries where knowledge, and thus control, over production is concentrated at the management level... management can assess performance based on real-time data and complex algorithmic processing, while workers may be unaware of these criteria, the results and the implications of these evaluations."
- **Notes:** Explains *why* transparency requirements (EU AI Act Art. 26, OECD explainability) matter concretely. Analytical argument grounded in case studies, not a quantified finding.

#### CLAIM-GOV-12: A documented real-world case of AI hiring bias — Amazon's scrapped recruiting tool
- **Figure:** Amazon built resume-screening models from 2014, found by 2015 they did not rate candidates for technical roles in a gender-neutral way, and scrapped the tool
- **Display:** Amazon, 2018
- **Basis:** measured (investigative reporting on a specific documented case)
- **Source:** Reuters (Jeffrey Dastin), *Amazon scraps secret AI recruiting tool that showed bias against women* (2018)
- **URL:** https://www.reuters.com/article/world/amazon-scraps-secret-ai-recruiting-tool-that-showed-bias-against-women-idUSKCN1MK08J/
- **Supporting text:** "by 2015, the company realized its new system was not rating candidates for software developer jobs and other technical posts in a gender-neutral way. That is because Amazon's computer models were trained to vet applicants by observing patterns in resumes submitted to the company over a 10-year period. Most came from men... In effect, Amazon's system taught itself that male candidates were preferable."
- **Notes:** **Source labelled honestly:** this is journalism based on five anonymous sources, not a peer-reviewed study or an official finding, and it concerns a pre-generative-AI system from a decade ago. It remains the most widely cited concrete example of hiring bias and is useful as an illustration of the training-data mechanism. Do not present it as current practice or as a quantified bias measurement.

---

## Topic 6 — Digital inclusion and inequality

#### CLAIM-DIV-01: 2.2 billion people remain offline in 2025
- **Figure:** 6.0 billion people online (74% of world population); 2.2 billion offline; online population grew by more than 240 million in 2025
- **Display:** 2.2B offline
- **Basis:** measured (ITU estimates)
- **Source:** International Telecommunication Union, *Measuring digital development: Facts and Figures 2025* (2025)
- **URL:** https://www.itu.int/en/mediacentre/Pages/PR-2025-11-17-Facts-and-Figures.aspx
- **Supporting text:** "Globally, an estimated 6 billion people – about three-quarters of the world's population – are using the Internet in 2025, up from a revised estimate of 5.8 billion in 2024. However, 2.2 billion people remain offline, down from a revised estimate of 2.3 billion in 2024."
- **Notes:** These are modelled estimates, and ITU **revises prior years substantially**: the 2024 figure was revised from 5.5bn online / 2.6bn offline to 5.8bn / 2.3bn. Never compare an ITU figure across editions without using the revised series. ITU also notes progress is slowing.

#### CLAIM-DIV-02: The income divide in internet use is enormous — 94% vs 23%
- **Figure:** 94% of people in high-income countries use the internet vs 23% in low-income countries; 96% of those offline live in low- and middle-income countries
- **Display:** 94% vs 23%
- **Basis:** measured
- **Source:** International Telecommunication Union, *Facts and Figures 2025* (2025)
- **URL:** https://www.itu.int/en/mediacentre/Pages/PR-2025-11-17-Facts-and-Figures.aspx
- **Supporting text:** "94 per cent of people in high-income countries use the Internet, in contrast to only 23 per cent in low-income countries; 96 per cent of those offline live in low- and middle-income countries."
- **Notes:** The foundational inclusion statistic for the whole project. Any narrative about AI-augmented work in 2045 has to reckon with the fact that roughly a quarter of humanity currently cannot get online at all. This is basic connectivity, a precondition well below AI access or AI skills.

#### CLAIM-DIV-03: Gender, urban-rural and age gaps in internet use persist
- **Figure:** 77% of men online vs 71% of women; 85% urban vs 58% rural; 82% of 15-24 year-olds vs 72% of the rest of the population
- **Display:** 77% vs 71%
- **Basis:** measured
- **Source:** International Telecommunication Union, *Facts and Figures 2025* (2025)
- **URL:** https://www.itu.int/en/mediacentre/Pages/PR-2025-11-17-Facts-and-Figures.aspx
- **Supporting text:** "77 per cent of men are online compared to 71 per cent of women; 85 per cent in urban areas are online versus 58 per cent in rural areas; 82 per cent of 15–24-year-olds use the Internet, compared with 72 per cent of the rest of the population."
- **Notes:** The urban-rural gap (27 points) is much larger than the global gender gap (6 points) — worth noting because the gender digital divide gets more attention. ITU says gender and urban-rural divides "continue to narrow but endure."

#### CLAIM-DIV-04: Regional internet use ranges from 36% in Africa to a band of 88-93% across CIS, Europe and the Americas
- **Figure:** CIS, Europe and the Americas: 88-93%. Asia-Pacific 77%, Arab States 70%. Africa 36%. Least developed countries 34%; landlocked developing countries 38%.
- **Display:** Africa 36%
- **Basis:** measured
- **Source:** International Telecommunication Union, *Facts and Figures 2025 — Internet use* (2025)
- **URL:** https://www.itu.int/itu-d/reports/statistics/2025/10/15/ff25-internet-use/
- **Supporting text:** "in the Commonwealth of Independent States (CIS), Europe, and the Americas, between 88 and 93 per cent of the population use the Internet... By contrast, the average figure for Internet use for Africa is just 36 per cent... Universal connectivity also remains a distant prospect in the least developed countries (LDCs) and landlocked developing countries (LLDCs), where only 34 and 38 per cent of the population are online."
- **Notes:** ITU reports the leading regions as a **band of 88-93% across CIS, Europe and the Americas**, not as a single highest region at 93%. ITU explicitly states that although LDC/LLDC growth rates (7.4% and 5.5% annually) exceed other groups, "the connectivity gap is not expected to close anytime soon." That is a credible institution declining to project convergence — directly relevant to our scenario framing.

#### CLAIM-DIV-05: 5G reaches over half the global population but is concentrated in high-income countries
- **Figure:** 5G reaches more than half the global population and accounts for more than one third of all mobile broadband subscriptions; mobile broadband coverage is nearly universal
- **Display:** 5G >50%
- **Basis:** measured
- **Source:** International Telecommunication Union, *Facts and Figures 2025* (2025)
- **URL:** https://www.itu.int/itu-d/reports/statistics/facts-figures-2025/
- **Supporting text:** "Mobile broadband coverage is nearly universal, but quality and affordability gaps persist. 5G now reaches more than half of the global population and accounts for more than one third of all mobile broadband subscriptions, although coverage remains concentrated in high-income countries."
- **Notes:** Coverage is not use and not affordability. ITU stresses that the binding constraints have shifted toward quality, affordability and skills rather than raw network availability — 2.2 billion people are offline despite near-universal mobile broadband coverage.

#### CLAIM-DIV-06: Affordability gaps exist within countries, not just between them
- **Figure:** Wide gaps between the cost of a mobile broadband basket for average earners versus the poorest 40% of the population
- **Display:** Affordability gap
- **Basis:** measured
- **Source:** International Telecommunication Union, *Global Connectivity Report 2025* / ITU Statistics Update December 2025
- **URL:** https://itu.int/en/ITU-D/Statistics/Pages/StatisticsUpdate/December2025.aspx
- **Supporting text:** "There are affordability gaps not only between high- and low-income economies, but also within countries. ITU price statistics combined with inequality data from the World Bank, published in the Global Connectivity Report 2025 (figure 4.6), reveal wide gaps between how much a mobile broadband basket amounts to those earning the average income, and those among the poorest 40 per cent of the population."
- **Notes:** Cited via ITU's own statistics update referencing figure 4.6 of the Global Connectivity Report 2025; the specific ratio was not captured. Use qualitatively unless the underlying figure is retrieved.

#### CLAIM-DIV-07: Women's jobs are nearly twice as exposed to GenAI as men's in the highest-risk category
- **Figure:** 4.7% of women's employment vs 2.4% of men's in the highest exposure gradient globally. In high-income countries: 9.6% of female employment vs 3.5% of male — nearly three times.
- **Display:** 4.7% vs 2.4%
- **Basis:** projection
- **Source:** International Labour Organization, *Generative AI and jobs: A Refined Global Index of Occupational Exposure* (Working Paper 140) (2025)
- **URL:** https://webapps.ilo.org/static/english/intserv/working-papers/wp140/index.html
- **Supporting text:** "3.3% of global employment falls into the highest exposure category, albeit with significant differences between female (4.7%) and male employment (2.4%). These differences increase with countries' income (9.6% female vs 3.5% male in Gradient 4 in HICs)."
- **Notes:** ILO attributes this to occupational segregation — women's overrepresentation in clerical and administrative roles — not to anything about women's capabilities. UN News summarised it as "nearly three times the share for men" in high-income countries. Exposure is modelled potential, not measured job loss.

#### CLAIM-DIV-08: Overall GenAI exposure rises sharply with country income: 11% in LICs vs 34% in HICs
- **Figure:** 34% of total employment exposed in high-income countries (17.3% in gradients 3-4) vs 11% in low-income countries. In Europe and Central Asia, 39% of female employment vs 26% of male.
- **Display:** 11% vs 34%
- **Basis:** projection
- **Source:** International Labour Organization, *ILO Working Paper 140* (2025)
- **URL:** https://webapps.ilo.org/static/english/intserv/working-papers/wp140/index.html
- **Supporting text:** "these disparities are even more pronounced in High-Income Countries, where 34% of total employment falls within one of the four exposure gradients, with 17.3% in gradients 3 and 4... The total share of exposed employment declines significantly as income levels decrease, reaching just 11% in Low-Income Countries (LICs)... Gender disparities are also more pronounced in wealthier regions, particularly in Europe and Central Asia, where 39% of female employment falls into one of the four exposure gradients compared to 26% for men."
- **Notes:** Note the double-edged reading, which the ILO makes itself: lower exposure in poorer countries means less transformation *and* fewer productivity gains. Lower income also compresses gender disparities, but only because fewer people hold the highly exposed roles at all.

#### CLAIM-DIV-09: Female-dominated occupations are almost twice as likely to be GenAI-exposed as male-dominated ones
- **Figure:** 29% of female-dominated occupations and 28% of mixed occupations are exposed, vs 16% of male-dominated occupations. In gradients 3-4: 16% of female-dominated vs 13% mixed vs 3% male-dominated. Of 436 ISCO-08 4-digit occupations: 82 (19%) female-dominated, 89 (20%) male-dominated, 266 (61%) mixed.
- **Display:** 29% vs 16%
- **Basis:** projection
- **Source:** International Labour Organization, *Gen AI, occupational segregation and gender equality in the world of work* (research brief) (2026)
- **URL:** https://www.ilo.org/sites/default/files/2026-03/Research%20Brief%20GenAI_final0403_0.pdf
- **Supporting text:** "A significantly higher proportion of female-dominated occupations (29 per cent) and mixed occupations (28 per cent) are exposed to Gen AI, compared to just 16 per cent of male-dominated occupations... In other words, female-dominated occupations are almost twice as likely to be exposed to Gen AI as male-dominated ones... Female-dominated occupations are also more likely to have a higher degree of exposure to Gen AI with 16 per cent of occupations in gradient 3 and gradient 4, compared to 13 per cent for mixed occupations, and only 3 per cent for male dominated occupations."
- **Notes:** **This is the most recent ILO evidence in the base (March 2026)** and should be preferred for gender claims. Counts occupations, not employment — the brief itself cautions this "captures only part of total employment exposed to Gen AI." Women are more exposed than men in 88% of countries sampled; highest exposure in Pacific and Caribbean small island states, then Bosnia and Herzegovina, Switzerland, UK, Philippines (over 40% of female employment). Europe and Central Asia and Latin America and the Caribbean are highest on average; Africa and Asia lowest.

#### CLAIM-DIV-10: Women are underrepresented in STEM and the AI workforce, with progress nearly stalled
- **Figure:** Women were 29.2% of STEM workers in 2022 and about 30% of the AI workforce in 2022 — roughly 4 percentage points above 2016. A 5.9% decline in retention of women in STEM was observed one year after graduation.
- **Display:** 30% of AI workforce
- **Basis:** measured
- **Source:** International Labour Organization, *Gen AI, occupational segregation and gender equality in the world of work* (2026), citing WEF (2023)
- **URL:** https://www.ilo.org/sites/default/files/2026-03/Research%20Brief%20GenAI_final0403_0.pdf
- **Supporting text:** "only 29.2 per cent of STEM workers in 2022. Retention is also a critical concern: despite a growing number of women earning STEM degrees, a sharp 5.9 per cent decline in the retention of women in STEM was observed, just one year after graduating (WEF, 2023). Gender gaps are also prevalent in AI employment, adoption and skills acquisition. Although some progress has been made, in 2022, women represented only 30 per cent of the AI workforce, a share that is roughly only 4 percentage points higher than in 2016 (WEF, 2023)."
- **Notes:** These are ILO citing WEF 2023, so they are second-hand within a primary source and the underlying data is from 2022. The compound problem is the point worth making: women are simultaneously more exposed to GenAI disruption (CLAIM-DIV-09) and underrepresented among those building it.

#### CLAIM-DIV-11: The mechanism behind gendered exposure is task composition, not capability
- **Figure:** Qualitative mechanism — women more likely to perform routine cognitive and codifiable tasks (higher substitution risk), less likely to perform analytical and abstract tasks (more likely complemented)
- **Display:** Routine vs abstract tasks
- **Basis:** measured (research synthesis)
- **Source:** International Labour Organization, *Gen AI, occupational segregation and gender equality in the world of work* (2026)
- **URL:** https://www.ilo.org/sites/default/files/2026-03/Research%20Brief%20GenAI_final0403_0.pdf
- **Supporting text:** "Women are also more likely than men to perform routine cognitive and codifiable tasks, which are at a higher risk of substitution by Gen AI across all sectors and occupations, and less likely to have analytical and abstract tasks, which are more likely to be complemented by this technology (Brussevich et al., 2019). These disparities also reflect patterns of vertical segregation, with women less likely to occupy senior or decision-making roles within the same occupational categories."
- **Notes:** The brief adds an important framing statement: "Technologies, including Gen AI, are not inherently neutral, but are embedded within and shaped by societal structures and relations," and warns that past technological waves reproduced gendered divisions "in new forms" rather than disrupting them. Also flags that risks compound for women at intersections with race, ethnicity or disability.

#### CLAIM-DIV-12: IMF warns AI could widen the digital divide and cross-country income disparity
- **Figure:** Qualitative warning, supported by the AI Preparedness Index across 125 countries
- **Display:** Divide may widen
- **Basis:** projection / scenario (conditional institutional warning)
- **Source:** International Monetary Fund, *Gen-AI: Artificial Intelligence and the Future of Work* (2024)
- **URL:** https://www.imf.org/-/media/files/publications/sdn/2024/english/sdnea2024001.pdf
- **Supporting text:** "Although many emerging market and developing economies may experience less immediate AI-related disruptions, they are also less ready to seize AI's advantages. This could exacerbate the digital divide and cross-country income disparity."
- **Notes:** The IMF built an AI Preparedness Index covering 125 countries (digital infrastructure, human capital and labour-market policies, innovation and economic integration, regulation and ethics); Singapore, the United States and Denmark scored highest. Note "could," not "will" — this is a conditional institutional judgement, not a forecast.

---

## Topic 7 — Economic transformation

**This is the topic with the widest genuine disagreement in the evidence base.** Acemoglu's peer-reviewed estimate of AI's ten-year TFP effect is well under 1%, while firm-level experiments find double-digit productivity gains in specific tasks. Both are credible; they measure different things (economy-wide aggregate vs task-level). Present the disagreement, do not resolve it.

#### CLAIM-ECON-01: Acemoglu estimates AI's ten-year TFP gain at no more than about 0.7%
- **Figure:** No more than a 0.66% increase in total factor productivity over 10 years (~0.064% annually) in the published version; the earlier NBER working paper gives 0.71% (~0.07% annually)
- **Display:** ~0.7% TFP
- **Basis:** projection
- **Source:** Daron Acemoglu, *The simple macroeconomics of AI*, Economic Policy vol. 40(121), pp. 13-58 (2025); earlier as NBER Working Paper 32487 (2024)
- **URL:** https://economics.mit.edu/sites/default/files/2024-10/The%20Simple%20Macroeconomics%20of%20AI.pdf
- **Supporting text:** "these macroeconomic effects appear non-trivial but modest – no more than a 0.66% increase in total factor productivity (TFP) over 10 years... This calculation implies that TFP effects within the next 10 years should be no more than 0.66% in total – or approximately a 0.064% increase in TFP growth annually."
- **Notes:** **Version discrepancy you must handle carefully.** The April/May 2024 NBER working paper states 0.71% TFP and <0.55% adjusted; the later published version states 0.66% and <0.53%. Both figures are real, from the same author and paper lineage, at different revision stages. **Cite the published 2025 Economic Policy figures (0.66% / 0.53%) as current.** Method: Hulten's theorem applied to task exposure estimates from Eloundou et al. and automation feasibility from Svanberg et al., yielding 4.6% of tasks impacted within 10 years and average cost savings of 14.4%. This is one economist's upper-bound calculation, contested by others.

#### CLAIM-ECON-02: Acemoglu's adjusted estimate is lower still, once hard-to-learn tasks are accounted for
- **Figure:** TFP gains upper-bounded at 0.53% and GDP at 0.90% over ten years (published version); 0.55% and 0.90% in the working paper version
- **Display:** 0.53% TFP
- **Basis:** projection
- **Source:** Daron Acemoglu, *The simple macroeconomics of AI* (2025)
- **URL:** https://economics.mit.edu/sites/default/files/2024-10/The%20Simple%20Macroeconomics%20of%20AI.pdf
- **Supporting text:** "predicted TFP gains over the next 10 years are even more modest and are predicted to be less than 0.53%." And: "I suppose that productivity gains in hard tasks will be approximately one-quarter of the easy ones. This leads to an updated, more modest increase in TFP and GDP in the next 10 years that can be upper bounded by 0.53% and 0.90%, respectively."
- **Notes:** The reasoning is important and quotable: early productivity evidence comes from easy-to-learn tasks, whereas future effects must come from hard-to-learn tasks "where there are many context-dependent factors affecting decision-making and no objective outcome measures from which to learn successful performance." Acemoglu describes the hard-task assumptions as "speculative."

#### CLAIM-ECON-03: Acemoglu estimates a ten-year GDP effect of 0.93-1.16%, rising to 1.4-1.56% with an investment response
- **Figure:** GDP growth of 0.93-1.16% over ten years; upper bound rises to about 1.4-1.56% if investment responses match earlier automation technologies (working paper version: ~1.1%, upper bound 1.6-1.8%)
- **Display:** 0.93-1.16% GDP
- **Basis:** projection
- **Source:** Daron Acemoglu, *The simple macroeconomics of AI* (2025)
- **URL:** https://economics.mit.edu/sites/default/files/2024-10/The%20Simple%20Macroeconomics%20of%20AI.pdf
- **Supporting text:** "GDP is also estimated to grow by 0.93–1.16% over the next 10 years. When I assume that the investment response will be similar to those for earlier automation technologies and use the full framework from Acemoglu and Restrepo (2022) to estimate the increase in the capital stock, the upper bound on GDP effects rises to around 1.4–1.56%."
- **Notes:** Acemoglu adds a subtle but important point: "what is relevant for consumer welfare is TFP, rather than GDP, since the additional investment comes out of consumption." Report the published ranges as the paper states them — 0.93-1.16% baseline and 1.4-1.56% with an investment response — never a single point estimate, and **never as a combined "0.9-1.6%" range, which appears nowhere in the paper** and silently merges two different scenarios. Again, note the working-paper/published version differences.

#### CLAIM-ECON-04: Acemoglu finds no evidence AI will reduce labour income inequality, and predicts a widening capital-labour gap
- **Figure:** Qualitative findings — AI unlikely to increase inequality as much as previous automation technologies, but no evidence it reduces labour income inequality; capital-labour gap predicted to widen; some groups (notably low-education white, native-born women) predicted to see small real wage declines
- **Display:** No inequality relief
- **Basis:** projection
- **Source:** Daron Acemoglu, *The simple macroeconomics of AI* (2024/2025)
- **URL:** https://economics.mit.edu/sites/default/files/2024-04/The%20Simple%20Macroeconomics%20of%20AI.pdf
- **Supporting text:** "I show theoretically that even when AI improves the productivity of low-skill workers in certain tasks (without creating new tasks for them), this may increase rather than reduce inequality. Empirically, I find that AI advances are unlikely to increase inequality as much as previous automation technologies because their impact is more equally distributed across demographic groups, but there is also no evidence that AI will reduce labor income inequality. AI is also predicted to widen the gap between capital and labor income." The Economic Policy summary adds: "some groups, notably low-education white, native-born women, are predicted to experience small declines in real wages."
- **Notes:** Directly contradicts the popular "AI levels the playing field" narrative at the macro level, even while task-level evidence (CLAIM-RESK-02) shows compression among lower-skilled workers within a firm. That tension is genuine and worth presenting as such.

#### CLAIM-ECON-05: Acemoglu notes some AI-created new tasks may carry negative social value
- **Figure:** Qualitative argument, with online manipulation algorithms as the named example
- **Display:** "Bad new tasks"
- **Basis:** projection (theoretical argument)
- **Source:** Daron Acemoglu, *The simple macroeconomics of AI* (2024/2025)
- **URL:** https://economics.mit.edu/sites/default/files/2024-04/The%20Simple%20Macroeconomics%20of%20AI.pdf
- **Supporting text:** "some of the new tasks created by AI may have negative social value (such as design of algorithms for online manipulation), and I discuss how to incorporate the macroeconomic effects of new tasks that may have negative social value."
- **Notes:** A rare formal treatment of the idea that measured GDP growth can overstate welfare gains. Useful counterweight to "new jobs will be created" optimism — new job creation is not automatically good.

#### CLAIM-ECON-06: IMF warns labour income inequality may rise if AI complements high earners
- **Figure:** Qualitative conditional finding
- **Display:** Conditional on complementarity
- **Basis:** scenario (explicitly conditional)
- **Source:** International Monetary Fund, *Gen-AI: Artificial Intelligence and the Future of Work* (2024)
- **URL:** https://www.imf.org/en/publications/staff-discussion-notes/issues/2024/01/14/gen-ai-artificial-intelligence-and-the-future-of-work-542379
- **Supporting text:** "Labor income inequality may increase if the complementarity between AI and high-income workers is strong, and capital returns will increase wealth inequality. However, if productivity gains are sufficiently large, income levels could surge for most workers."
- **Notes:** A textbook example of how institutions hedge: two opposite outcomes presented as conditional on parameters nobody can yet measure. Both branches must be reported together, and the "if" clauses must be preserved. Also relevant to Topic 9.

#### CLAIM-ECON-07: IMF states AI's exact economic implications are challenging to predict
- **Figure:** Qualitative statement on uncertainty, compared to past general-purpose technologies such as electricity
- **Display:** Deep uncertainty
- **Basis:** measured (institutional characterisation of uncertainty)
- **Source:** International Monetary Fund, *Gen-AI: Artificial Intelligence and the Future of Work* (2024)
- **URL:** https://www.elibrary.imf.org/view/journals/006/2024/001/article-A001-en.xml
- **Supporting text:** "The exact implications of AI for economies and societies are challenging to predict, embodying a level of uncertainty reminiscent of past introductions of general-purpose technologies, such as electricity. This uncertainty is particularly pronounced in labor markets, where AI offers productivity gains but also poses risks of job displacements."
- **Notes:** Direct quotable evidence from the IMF that confident prediction is not available. Central to Topic 9 and to the product's honesty about 2045.

#### CLAIM-ECON-08: Women and college-educated workers are more exposed but better positioned; older workers less able to adapt
- **Figure:** Qualitative pattern across demographic groups
- **Display:** Uneven by group
- **Basis:** measured (exposure analysis)
- **Source:** International Monetary Fund, *Gen-AI: Artificial Intelligence and the Future of Work* (2024)
- **URL:** https://www.imf.org/en/publications/staff-discussion-notes/issues/2024/01/14/gen-ai-artificial-intelligence-and-the-future-of-work-542379
- **Supporting text:** "There are some consistent patterns concerning AI exposure: women and college-educated individuals are more exposed but also better poised to reap AI benefits, and older workers are potentially less able to adapt to the new technology."
- **Notes:** The IMF's "more exposed but better positioned" finding for women differs in emphasis from the ILO's gendered-risk framing (CLAIM-DIV-07, CLAIM-DIV-09). Not a direct contradiction — IMF measures exposure plus complementarity across all occupations, ILO focuses on highest-exposure gradients and clerical concentration — but the resulting narratives differ and we should say so.

#### CLAIM-ECON-09: ILO finds productivity growth too weak and uneven to drive convergence
- **Figure:** Qualitative key message; employment growth projected at 0.5% in upper-middle-income countries, 1.8% in lower-middle-income, 3.1% in low-income economies in 2026
- **Display:** 0.5% / 1.8% / 3.1%
- **Basis:** projection (2026 employment growth) / measured (productivity assessment)
- **Source:** International Labour Organization, *Employment and Social Trends 2026* (2026)
- **URL:** https://www.ilo.org/publications/flagship-reports/employment-and-social-trends-2026
- **Supporting text:** Key messages include "Productivity growth is too weak and uneven to drive convergence" and "Labour market outcomes are diverging across income groups." From the news release: "Employment growth in 2026 is projected at 0.5 per cent in upper middle income countries, 1.8 per cent in lower middle income economies, and 3.1 per cent in low income ones."
- **Notes:** Important reality check against AI-productivity-boom narratives: as of the ILO's January 2026 flagship, aggregate productivity growth is weak, not surging. ILO also notes rising AI adoption alongside trade policy uncertainty and low FDI makes improvements in working conditions harder to achieve.

#### CLAIM-ECON-10: OECD finds demographic ageing already reduced wage and productivity growth over 2000-2019, through reduced job-to-job mobility
- **Figure:** Demographic ageing reduced annual wage growth by 0.10 percentage points and productivity growth by 0.13 percentage points between 2000 and 2019
- **Display:** −0.13pp
- **Basis:** measured
- **Source:** OECD, *OECD Employment Outlook 2025: Can We Get Through the Demographic Crunch?* (2025)
- **URL:** https://www.oecd.org/en/publications/oecd-employment-outlook-2025_194a947b-en/full-report/executive-summary_642932a9.html
- **Supporting text:** "demographic ageing has reduced wage and productivity annual growth rates by respectively 0.10 and 0.13 percentage points between 2000 and 2019." The mechanism: "unlike involuntary employment transitions, voluntary job-to-job mobility significantly contributes to wage and productivity growth by reallocating workers to better jobs in better firms. However, this process declines sharply with age."
- **Notes:** Valuable for scale comparison: measured demographic drag on productivity growth (0.13pp/year) is of a similar order to Acemoglu's projected AI *gain* (~0.064pp/year). Demography is not a smaller force than AI in these numbers. **This is a historical estimate for 2000-2019, not a forward projection, and the mechanism is specifically reduced voluntary job-to-job mobility, which declines sharply with age — not a general ageing drag.** OECD countries only.

#### CLAIM-ECON-11: OECD records record-high employment alongside signs of weakening
- **Figure:** OECD unemployment 4.9% in May 2025; average employment rate 72.1%; participation rate reached a high (reported as 74.6% in retrieved text)
- **Display:** 4.9% / 72.1%
- **Basis:** measured
- **Source:** OECD, *OECD Employment Outlook 2025: Can We Get Through the Demographic Crunch?* (2025)
- **URL:** https://www.oecd.org/en/publications/2025/07/oecd-employment-outlook-2025_5345f034.html
- **Supporting text:** "Employment and labour force participation have reached record highs, while unemployment remains historically low. The OECD unemployment rate remains at 4.9% in May 2025, the average employment rate in the OECD rose to 72.1%... However, there are signs of weakening labour markets, with employment growth decelerating and labour market tightness in many countries and sectors falling back to the historically high pre COVID 19 levels."
- **Notes:** The participation rate figure appeared partially truncated in retrieval ("the average participation rate reached ... .6%"); treat the 74.6% reading as unconfirmed and verify before display. Unemployment and employment rate figures are clear. OECD attributes expected further slowdown to geopolitical uncertainty and tariff hikes — not to AI.

#### CLAIM-ECON-12: OECD says AI's benefit depends on how it is used, and current regulation leaves gaps
- **Figure:** Qualitative policy finding
- **Display:** Depends on use
- **Basis:** measured (institutional assessment)
- **Source:** OECD, *OECD Employment Outlook 2025: Can We Get Through the Demographic Crunch?* (2025)
- **URL:** https://www.oecd.org/en/publications/2025/07/oecd-employment-outlook-2025_5345f034.html
- **Supporting text:** "While structural reforms can help improve productivity, promoting the adoption and good use of AI can also help. Yet support and guidance are needed, as much depends on how AI is used, and there are many loopholes and gaps in existing regulation that leave workers vulnerable to the risks of AI."
- **Notes:** OECD explicitly stating that existing regulation has gaps leaving workers vulnerable — useful alongside the EU AI Act claims, which cover only EU-linked deployment. Outcomes are treated as contingent on deployment choices, not technologically determined.

---

## Topic 8 — Reskilling and human-AI collaboration

#### CLAIM-RESK-01: Upskilling is the most common employer workforce strategy — 85% plan it
- **Figure:** 85% of employers plan to prioritise upskilling; 70% expect to hire staff with new skills; 51% intend to transition staff from declining to growing roles internally; 41% foresee staff reductions due to skills obsolescence
- **Display:** 85%
- **Basis:** projection (employer intentions)
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025)
- **URL:** https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/4-workforce-strategies/
- **Supporting text:** "Upskilling the workforce emerges as the most common workforce strategy in response to macrotrends, over the 2025-2030 period, with 85% of surveyed employers anticipating adopting this approach... 70% of organizations surveyed plan to hire new staff with emerging in-demand skills, 51% intend to transition staff from declining to growing roles internally, while 41% foresee staff reductions due to skills obsolescence."
- **Notes:** Upskilling is a top-3 priority across all geographies and income levels (high-income 87%, upper-middle 84%, lower-middle 82%). **These are stated intentions, not actions taken** — the gap between intent and delivery is exactly where the 11-in-100 who miss out (CLAIM-SKILL-02) come from. Note the WEF press release cites 40% for staff reductions while the report body says 41%; use 41%.

#### CLAIM-RESK-02: Generative AI raised customer support productivity 15% on average, 30% for novices
- **Figure:** 15% increase in issues resolved per hour on average; 30% improvement for novice and low-skilled workers, and 36% for the lowest skill quintile; for the most-skilled workers, small speed gains alongside small but statistically significant declines in resolution rate and customer satisfaction. 5,172 agents studied.
- **Display:** +15% / +30%
- **Basis:** measured (field experiment, staggered rollout)
- **Source:** Erik Brynjolfsson, Danielle Li & Lindsey R. Raymond, *Generative AI at Work*, Quarterly Journal of Economics 140(2), pp. 889-942 (2025), DOI 10.1093/qje/qjae044; earlier as NBER Working Paper 31161 (2023)
- **URL:** https://doi.org/10.1093/qje/qjae044
- **Supporting text:** "Access to AI assistance increases the number of issues resolved per hour by 15% on average, with substantial heterogeneity across workers... access to AI assistance increases the productivity of novice and low-skilled workers by 30%, with the lowest skill quintile seeing a 36% improvement. In contrast, we find that the most experienced and highest-skilled workers see small gains in the speed with which they resolve issues, alongside small but statistically significant declines in their resolution rate and customer satisfaction."
- **Notes:** Peer-reviewed in QJE — among the strongest single pieces of causal evidence available. **Single firm (a Fortune 500 business process software company), single occupation, one AI tool, pre-2024 GPT model.** Do not generalise the 15% to the economy; note that Acemoglu's macro estimate (CLAIM-ECON-01) explicitly incorporates task-level findings like this one and still yields sub-1% aggregate TFP effects. The effect on the most-skilled workers is **not merely "minimal"** — the published version reports small but statistically significant declines in resolution rate and customer satisfaction for that group, which is a stronger and less comfortable finding. Figures here are the published version's; the withdrawn NBER working paper gave 14%/34% across 5,179 agents and described the high-skill effect as minimal. Do not mix the two versions. Additional findings: improved customer sentiment, increased employee retention, reduced requests for managerial intervention, and treated agents with two months' tenure performing like untreated agents with over six months.

#### CLAIM-RESK-03: On average, human-AI combinations performed WORSE than the better of human or AI alone
- **Figure:** Pooled effect for human-AI synergy: Hedges' g = −0.23 (95% CI −0.39 to −0.07), across 106 experiments and 370 effect sizes
- **Display:** g = −0.23
- **Basis:** measured (preregistered systematic review and meta-analysis)
- **Source:** Michelle Vaccaro, Abdullah Almaatouq & Thomas W. Malone, *When combinations of humans and AI are useful: a systematic review and meta-analysis*, Nature Human Behaviour 8(12), pp. 2293-2303 (2024), DOI 10.1038/s41562-024-02024-1
- **URL:** https://www.nature.com/articles/s41562-024-02024-1
- **Supporting text:** "we found that, on average, human–AI combinations performed significantly worse than the best of humans or AI alone (Hedges' g = −0.23; 95% confidence interval, −0.39 to −0.07)."
- **Notes:** **The most important corrective in the entire evidence base.** "Human + AI beats either alone" is widely asserted and this preregistered meta-analysis of 106 experiments finds the opposite on average. Studies published Jan 2020 - Jun 2023, so they predate the most recent model generation. The authors are careful: they do not conclude combining is a bad idea, but that "future work needs to focus more specifically on finding effective processes that integrate humans and AI."

#### CLAIM-RESK-04: Human-AI systems DO beat humans alone — the augmentation effect is real and sizeable
- **Figure:** Human augmentation pooled effect g = 0.64 (95% CI 0.53 to 0.74), medium-to-large
- **Display:** g = 0.64
- **Basis:** measured (meta-analysis)
- **Source:** Vaccaro, Almaatouq & Malone, *Nature Human Behaviour* (2024)
- **URL:** https://www.nature.com/articles/s41562-024-02024-1
- **Supporting text:** "The human–AI systems performed significantly better than humans alone, and this pooled effect size was positive (g = 0.64; t98 = 11.87; two-tailed P = 0.000; 95% CI, 0.53 to 0.74) and medium to large... In other words, the human–AI systems we analysed were, on average, better than humans alone but not better than both humans alone and AI alone."
- **Notes:** **CLAIM-RESK-03 and CLAIM-RESK-04 must always be presented together.** They are not contradictory: AI makes people better than they were (g = +0.64) while the combination still underperforms the best single performer (g = −0.23). Reporting either alone is misleading. This pairing is the most intellectually honest content available on human-AI teaming.

#### CLAIM-RESK-05: Human-AI teams gain on creation tasks and lose on decision tasks
- **Figure:** Decision tasks g = −0.27 (95% CI −0.44 to −0.10, significant); creation tasks g = +0.19 (95% CI −0.09 to 0.48, not significant on its own, n = 34); difference between them statistically significant
- **Display:** Create: + / Decide: −
- **Basis:** measured (meta-analysis moderator)
- **Source:** Vaccaro, Almaatouq & Malone, *Nature Human Behaviour* (2024)
- **URL:** https://www.nature.com/articles/s41562-024-02024-1
- **Supporting text:** "Among decision tasks—those in which participants decided between a finite set of options—the pooled effect size for human–AI synergy was significantly negative (g = −0.27...). In contrast, among creation tasks—those in which participants created some sort of open-response content—the pooled effect size for human–AI synergy was positive (g = 0.19...). Even though the average performance gains for creation tasks were not significantly different from 0 (presumably because of the relatively small sample size of n = 34), the difference between losses for decision tasks and gains for creation tasks was statistically significant."
- **Notes:** Report the creation-task gain honestly as **not individually statistically significant**; what is significant is the difference between the two task types. Task type is **not the only significant moderator** — data type, relative human/AI performance, AI type and publication year were also significant. This is the closest thing to an actionable design rule in the literature: pair AI with humans for generative/creative work, be far more cautious for discrete decisions.

#### CLAIM-RESK-06: Whether the human or the AI is better alone determines whether the combination helps
- **Figure:** When humans outperformed AI alone: synergy g = +0.46 (95% CI 0.28 to 0.66). When AI outperformed humans alone: g = −0.54 (95% CI −0.71 to −0.37).
- **Display:** +0.46 / −0.54
- **Basis:** measured (meta-analysis moderator)
- **Source:** Vaccaro, Almaatouq & Malone, *Nature Human Behaviour* (2024)
- **URL:** https://www.nature.com/articles/s41562-024-02024-1
- **Supporting text:** "when the human alone outperformed the AI alone, the combined human–AI system outperformed both alone with an average pooled effect size for human–AI synergy of g = 0.46... But when the AI alone outperformed the human alone, performance losses occurred in the combined system relative to the AI alone, with a negative effect size for human–AI synergy of g = −0.54."
- **Notes:** The authors' explanation: over 95% of studied systems had humans making the final decision, and humans who are better than the AI overall are also better at judging when to trust it. Where the AI is stronger, human override destroys value. This creates real tension with mandated human oversight (CLAIM-GOV-02) — a genuine, defensible point of friction between the safety literature and the performance literature that our product can surface.

#### CLAIM-RESK-07: Explanations and AI confidence displays did NOT moderate human-AI performance
- **Figure:** Presence of explanation, inclusion of AI confidence, participant type and division of labour were all insignificant moderators across 370+ effect sizes
- **Display:** No effect
- **Basis:** measured (meta-analysis)
- **Source:** Vaccaro, Almaatouq & Malone, *When combinations of humans and AI are useful* (arXiv preprint version) (2024)
- **URL:** https://arxiv.org/abs/2405.06087
- **Supporting text:** "We also investigated other moderators such as the presence of an explanation, the inclusion of the confidence of the AI output, and the type of participant evaluated... Given our result that, on average across our 300+ effect sizes, they do not impact the effectiveness of human-AI collaboration, we think researchers may wish to de-emphasize this line of inquiry."
- **Notes:** Counterintuitive and important: explainability, heavily emphasised in governance frameworks (OECD, UNESCO), did not measurably improve human-AI task performance in these experiments. This is a *performance* finding and does not undercut the accountability and rights-based case for explainability. Quoted from the arXiv version; the published paper reports the same moderator analysis.

#### CLAIM-RESK-08: Pre-determined task delegation between human and AI showed positive but non-significant results
- **Figure:** Only 3 of 100+ experiments used pre-determined delegation of separate sub-tasks; across their 4 effect sizes, g = 0.22 (95% CI −0.42 to 0.87), not statistically significant
- **Display:** 3 of 106 studies
- **Basis:** measured (meta-analysis subgroup)
- **Source:** Vaccaro, Almaatouq & Malone (arXiv preprint version) (2024)
- **URL:** https://arxiv.org/abs/2405.06087
- **Supporting text:** "Only 3 of the 100+ experiments in our analysis explore such processes with a pre-determined delegation of separate sub-tasks to humans and AI. With the 4 effect sizes from these 3 experiments, we found that, on average, human-AI synergy (g = 0.22, t(104) = 0.69, two-tailed p = 0.494, 95% CI − 0.42 to 0.87) occurred, but the result was not statistically significant."
- **Notes:** Include this precisely because it shows how thin the evidence is for the most commonly proposed fix ("just divide the work properly"). Three studies, four effect sizes, wide CI crossing zero. **This is an evidence gap, not a validated solution.** Anyone claiming task-delegation designs are proven to work is overreaching.

#### CLAIM-RESK-09: Reskilling and upskilling to work alongside AI is the top AI-response strategy in 45 of 55 economies
- **Figure:** 77% of employers plan to reskill/upskill existing workers to work with AI; 69% plan to recruit talent skilled in AI tool design; 62% plan to hire people with skills to work with AI; 49% expect to reorient business models toward AI-driven opportunities; 47% plan to transition employees from AI-disrupted roles; 41% expect to downsize as AI capabilities expand
- **Display:** 77%
- **Basis:** projection (employer intentions)
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025)
- **URL:** https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/4-workforce-strategies/
- **Supporting text:** "In response to AI disruption, reskilling and upskilling of the existing workforce to work more effectively alongside AI emerges as the most anticipated workforce strategy for companies headquartered in 45 out of the 55 economies covered by the report. By 2030, 77% of surveyed employers plan to implement this strategy... While most employers plan to hire new people with AI relevant skills, a significant share (41%) also expect to downsize their workforce as AI capabilities to replicate roles expand."
- **Notes:** The 77% reskilling and 41% downsizing figures are not alternatives — many employers intend both simultaneously. Present them together rather than choosing the more comforting one.

#### CLAIM-RESK-10: Sectors with the most training uptake still project the largest remaining training needs
- **Figure:** Telecommunications 63% and Information and Technology Services 62% of workforce expected to need further training by 2030
- **Display:** 63% / 62%
- **Basis:** projection
- **Source:** World Economic Forum, *The Future of Jobs Report 2025* (2025)
- **URL:** https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/
- **Supporting text:** "Industries, such as Telecommunications, and Information and Technology Services, which saw some of the largest uptake in reskilling and upskilling, still anticipate significant training needs, with 63% and 62% of their workforce, respectively, expected to need further training by 2030. By contrast, sectors with declining trendlines in training completion are among the sectors with the lowest projected additional training needs."
- **Notes:** Supports framing reskilling as continuous rather than a one-time transition: the most-trained sectors report the greatest ongoing need. Note WEF's implied caution in the second sentence — low projected training need may reflect low ambition rather than genuine readiness.

#### CLAIM-RESK-11: OECD calls for a shift to a career model of lifelong learning, citing measured mid-career gaps
- **Figure:** Qualitative policy conclusion, supported by CLAIM-SKILL-10 training participation data and CLAIM-ECON-10 mobility findings
- **Display:** Lifelong learning
- **Basis:** measured (institutional recommendation grounded in cited data)
- **Source:** OECD, *OECD Employment Outlook 2025: Can We Get Through the Demographic Crunch?* (2025)
- **URL:** https://www.oecd.org/en/publications/oecd-employment-outlook-2025_194a947b-en/full-report/executive-summary_642932a9.html
- **Supporting text:** "there is an urgent need to avoid skill declines and foster a culture of continuous learning, shifting to a career model where learning at work takes place throughout life. Stronger action to expand access to career guidance and lifelong learning should be considered, especially for mid-career and older workers."
- **Notes:** A recommendation, not evidence of effectiveness. OECD also documents structural barriers: low-skilled workers "face more barriers to reskilling and switching sectors," and employer bias treats older workers as less adaptable. Note the honest gap here — the evidence base establishes that reskilling is *needed* far more firmly than it establishes *which programmes work*. See the "could NOT verify" section.

---

## Topic 9 — Scenario framing: how credible institutions handle long-horizon uncertainty

**Headline finding for the product: no credible institution in this evidence base makes confident specific predictions about 2045.** The longest horizons found were 2030 (WEF), 2034 (BLS) and ten-year windows (Acemoglu). Every source consulted hedges explicitly. AETHER must not present 2045 figures as forecasts. The claims below document precisely how the institutions themselves hedge, so we can borrow their honesty rather than inventing false confidence.

#### CLAIM-SCEN-01: Institutional forecast horizons top out at about a decade — nothing reaches 2045
- **Figure:** The furthest horizon any institutional projection in this base reaches is 2034 (BLS Employment Projections, 2024-2034). WEF Future of Jobs 2025 reaches 2030; Acemoglu estimates a 10-year window; ILO Employment and Social Trends 2026 covers the year ahead.
- **Display:** 2034
- **Basis:** measured (documented scope of the sources)
- **Source:** US Bureau of Labor Statistics, *Employment Projections, 2024-2034* (2025)
- **URL:** https://www.bls.gov/news.release/ecopro.nr0.htm
- **Supporting text:** BLS: "The U.S. economy is projected to add 5.2 million jobs from 2024 to 2034."
- **Notes:** Sourced to the BLS projections, which set the outer bound. **This horizon claim is not made by ILO Working Paper 118 and must not be attributed to it.** Verified by checking the actual scope statements of each source. **Any 2045 figure in this project is either an extrapolation we invented or a fabrication — there is no institutional source for one.** Treat this constraint as a design feature: the product's credibility comes from being explicit that 2045 is beyond the forecast horizon.

#### CLAIM-SCEN-02: ILO describes its own exposure estimates as illustrative and a static snapshot
- **Figure:** Explicit statement on the standing of the ILO's own classifications
- **Display:** A static snapshot
- **Basis:** measured (institutional statement)
- **Source:** International Labour Organization, *ILO Working Paper 140* (2025)
- **URL:** https://webapps.ilo.org/static/english/intserv/working-papers/wp140/index.html
- **Supporting text:** The ILO states that its classifications are "only illustrative, since any type of task scoring system carries a degree of subjectivity, and since the abilities of GenAI and derivative technologies evolve rapidly," and that its estimates represent a "static snapshot" of exposure.
- **Notes:** This is the ILO's actual framing and it is what should be quoted: illustrative classifications, an acknowledged degree of subjectivity, and a static snapshot whose boundary moves with capability. **Do not overstate it as the ILO saying the generative-AI trajectory "cannot be predicted."** The weaker, accurate version still carries the point that no skill can be named as valuable in 2045.

#### CLAIM-SCEN-03: ILO frames its own numbers as directional, not predictive
- **Figure:** Explicit methodological disclaimer
- **Display:** Direction, not prediction
- **Basis:** measured (institutional statement)
- **Source:** International Labour Organization, *ILO Working Paper 96* (2023)
- **URL:** https://webapps.ilo.org/static/english/intserv/working-papers/wp096/index.html
- **Supporting text:** "We stress the focus of our work on the concepts of 'exposure' and 'potential', which does not imply automation... The objective of this exercise is not to derive headline figures, but rather to analyse the direction of possible changes." And: "the main value of studies such as this one is not in the precise estimates, but rather in understanding the possible direction of change."
- **Notes:** The ILO explicitly asks not to be quoted for headline figures — which is exactly what most secondary coverage does. A model for how AETHER should present its own numbers. Note the direct implication: exposure ≠ automation.

#### CLAIM-SCEN-04: ILO states outcomes are not predetermined and are shaped by human decisions
- **Figure:** Explicit statement of contingency and agency
- **Display:** Not predetermined
- **Basis:** measured (institutional statement)
- **Source:** International Labour Organization, *ILO Working Paper 96* (2023)
- **URL:** https://webapps.ilo.org/static/english/intserv/working-papers/wp096/index.html
- **Supporting text:** "While the analysis outlines potential implications for different occupational categories, the outcomes of the technological transition are not pre-determined. It is humans that are behind the decision to incorporate such technologies and it is humans that need to guide the transition process."
- **Notes:** The strongest available anti-determinism quote from a primary source, and arguably the ideal thesis statement for a project about how people can *prepare* rather than merely await an outcome.

#### CLAIM-SCEN-05: ILO warns that technology experts systematically overstate capabilities
- **Figure:** Methodological caution citing Karger et al. (2023), with a garment-production example of failed automation predictions
- **Display:** Experts overstate
- **Basis:** measured (methodological analysis)
- **Source:** International Labour Organization, *ILO Working Paper 96* (2023)
- **URL:** https://webapps.ilo.org/static/english/intserv/working-papers/wp096/index.html
- **Supporting text:** "as recently shown by Karger et al. (2023), tech experts tend to overstate technological capacities and risks in questions concerning broader applications... This is well illustrated in earlier automation studies, which often assigned high scores of displacement potential to routine tasks and even entire occupations, including in garment production. In practice, however, the work continues to be performed by humans due to the challenges of handling highly pliable fabrics and the complexity of skills and dexterity involved in the stitching process."
- **Notes:** Two useful things at once: a documented case of automation predictions failing, and the ILO's admission that its own GPT-generated scores are "likely to reflect techno-optimism and overstate some task-level scores." Reinforced empirically by CLAIM-AUG-06, where the ILO revised its own scores down.

#### CLAIM-SCEN-06: ILO's "big unknown" category — the source declines to speculate on direction
- **Figure:** A category of occupations with high mean exposure and high task-level variance that the framework could not classify
- **Display:** "The big unknown"
- **Basis:** measured (methodological description)
- **Source:** International Labour Organization, *ILO Working Paper 96* (2023)
- **URL:** https://webapps.ilo.org/static/english/intserv/working-papers/wp096/index.html
- **Supporting text:** "We refer to these jobs... as 'the big unknown', since our framework and data do not allow for a clear-cut classification of this group... Depending on the technological progress of generative AI, as well as the applications built on top of the technology, some of the tasks might become more automatable, while new tasks could emerge in these professions, pushing them closer to the augmentation or automation cluster or, the more likely scenario, having them evolve into new occupations. While we refrain from speculating on the direction of this evolution..."
- **Notes:** An institution naming an explicit uncertainty category and refusing to fill it in. Excellent precedent for a product design that can display "unknown" as a legitimate state rather than forcing every occupation into a confident bucket. Note that the 2025 update (CLAIM-AUG-05) restructured the framework partly to address the interpretive problems this category caused.

#### CLAIM-SCEN-07: ILO uses formal scenario analysis rather than single-path forecasting for the future of work
- **Figure:** A scenario framework built on driver variables (innovation, political uncertainty, rule of law, violence and social unrest, among others) mapped to labour market outcomes (job quantity, job quality, income inequality)
- **Display:** Scenario analysis
- **Basis:** measured (methodological description)
- **Source:** International Labour Organization, *The Future of Work: A Scenario Analysis* (2017)
- **URL:** https://www.ilo.org/resource/future-work-scenario-analysis-0
- **Supporting text:** The framework enumerates drivers including "Innovation... the extent to which innovations such as automation, robotization and digitalization lead to the introduction of new production processes and new products and services," "Political Uncertainty," "Rule of Law and Enforcement," "Violence and Social Unrest," mapped to outcomes: "Job quantity: Measures the rate at which jobs are being created and destroyed as well as the net growth in employment. Job quality... Income Inequality."
- **Notes:** Dated 2017 and predates generative AI, so use it for **method** rather than findings. Directly relevant as a template: the ILO's own approach to long horizons is a driver-based scenario set, not a point forecast. The outcome triad (quantity / quality / inequality) is a defensible structure for our own scenario axes.

#### CLAIM-SCEN-08: ILO promotes strategic foresight, explicitly distinguished from forecasting
- **Figure:** Methodological distinction — foresight explores multiple plausible pathways; forecasting extrapolates historical data
- **Display:** Foresight ≠ forecast
- **Basis:** measured (methodological description)
- **Source:** Rafael Peels & Aida Ponce del Castillo, *Using foresight to think and act upon an uncertain future world of work: Trade unions' experiences*, ILO Working Paper 118 (2024)
- **URL:** https://www.ilo.org/sites/default/files/2024-07/118_web.pdf
- **Supporting text:** "Strategic foresight puts emphasis on seeking to explore multiple, plausible and contingent pathways that can shape and work upon an uncertain future. It differs from forecasting, which uses historical data to estimate or predict the direction of future trends." And: "It is not predictive and encourages 'all plausible options, alternatives or pathways to be treated as more or less equal given the complexity of future realities, and consequences and risks of adhering to simple predictions'."
- **Notes:** The clearest available articulation of the epistemic stance AETHER should adopt, from an ILO working paper. Also documents union foresight exercises reaching 2040 — the longest horizon located in this research — and notably those are *roadmaps and scenarios*, not predictions. Quoting Pezzulo and Rigoli, the paper notes "the role of strategic foresight is not to anticipate the future as 'it exactly will be', but to prepare the organization to think about future challenges."

#### CLAIM-SCEN-09: The IMF hedges with conditional both-ways statements rather than point predictions
- **Figure:** See CLAIM-ECON-06 — inequality may rise if complementarity is strong, or incomes could surge for most workers if productivity gains are large enough
- **Display:** Conditional pathways
- **Basis:** measured (institutional hedging pattern)
- **Source:** International Monetary Fund, *Gen-AI: Artificial Intelligence and the Future of Work* (2024)
- **URL:** https://www.imf.org/en/publications/staff-discussion-notes/issues/2024/01/14/gen-ai-artificial-intelligence-and-the-future-of-work-542379
- **Supporting text:** "Labor income inequality may increase if the complementarity between AI and high-income workers is strong... However, if productivity gains are sufficiently large, income levels could surge for most workers."
- **Notes:** Documents the hedging *pattern* itself: modal verbs plus explicit conditions plus opposite branches presented together. When AETHER presents a range, this is the register to use. Overlaps deliberately with CLAIM-ECON-06 — cited here as evidence about method, there as evidence about economics.

#### CLAIM-SCEN-10: Acemoglu frames his central figures as upper bounds and labels his assumptions speculative
- **Figure:** Repeated upper-bound language and explicit acknowledgement of speculative parameters
- **Display:** Upper bounds
- **Basis:** measured (methodological framing)
- **Source:** Daron Acemoglu, *The simple macroeconomics of AI* (2025)
- **URL:** https://economics.mit.edu/sites/default/files/2024-10/The%20Simple%20Macroeconomics%20of%20AI.pdf
- **Supporting text:** "these considerations make me conclude that even the 0.66% increase in TFP within the next 10 years due to AI is likely to be an upper bound on this technology's medium-run effects." And: "Using a range of (speculative) assumptions, I estimate an upper bound of 74% easy tasks among Eloundou et al.'s exposed tasks."
- **Notes:** Even the most-cited sceptical macro estimate is presented as a bound with self-labelled speculative inputs, not a forecast. Pair with the version discrepancy in CLAIM-ECON-01: the numbers themselves moved between drafts, which is itself evidence about how provisional these figures are.

#### CLAIM-SCEN-11: ITU declines to project convergence on the connectivity gap
- **Figure:** Explicit refusal to project closure despite above-average growth rates in the least connected country groups
- **Display:** Gap won't close soon
- **Basis:** measured (institutional statement)
- **Source:** International Telecommunication Union, *Facts and Figures 2025 — Internet use* (2025)
- **URL:** https://www.itu.int/itu-d/reports/statistics/2025/10/15/ff25-internet-use/
- **Supporting text:** "While the annual growth rate in 2025 in these economies averages 7.4 and 5.5 per cent, respectively, which is higher than in most of the other groups or regions, the connectivity gap is not expected to close anytime soon."
- **Notes:** A statistical agency explicitly declining to forecast convergence even where trend growth is favourable. Also relevant that ITU revises its own historical estimates substantially between editions (CLAIM-DIV-01) — even *measured* connectivity figures carry real uncertainty, let alone projections.

#### CLAIM-SCEN-12: ILO characterises current labour market stability as "fragile"
- **Figure:** Key message language — "Labour markets remain stable, but this stability is fragile"
- **Display:** "Fragile" stability
- **Basis:** measured (institutional characterisation)
- **Source:** International Labour Organization, *Employment and Social Trends 2026* (2026)
- **URL:** https://www.ilo.org/publications/flagship-reports/employment-and-social-trends-2026
- **Supporting text:** Key messages: "Labour markets remain stable, but this stability is fragile"; "The global jobs gap and job quality deficits remain very large"; "Labour market outcomes are diverging across income groups"; "Trade and global risks are reshaping labour market prospects"; "Closing decent work deficits will increasingly rely on domestic action."
- **Notes:** The ILO's most recent flagship framing, from January 2026. Useful for the present-day baseline: stable headline numbers, fragile foundations, diverging outcomes. Explicitly avoids both alarmism and complacency — the tone AETHER should aim for.

#### CLAIM-SCEN-13: OUR ASSUMPTION — 2045 must be presented as scenario space, not forecast
- **Figure:** No figure. This is a design principle, not a finding.
- **Display:** n/a
- **Basis:** assumption
- **Source:** AETHER project design decision, derived from CLAIM-SCEN-01 through CLAIM-SCEN-12
- **URL:** n/a
- **Supporting text:** Our own reasoning: since no source in this evidence base forecasts beyond ~2034, and every source hedges explicitly, any AETHER content addressing 2045 must be framed as conditional scenario space with visible reasoning, clearly separated from cited evidence.
- **Notes:** **This is one of only two `assumption`-basis entries in this document.** It is included because the build team needs an explicit, referenceable rule. It carries no external authority — do not cite it as a finding. If the product displays a 2045 figure, it must be visibly marked as our extrapolation, with the underlying near-term claim ID shown alongside.

#### CLAIM-SCEN-14: OUR ASSUMPTION — display near-term evidence and long-horizon scenarios in visually distinct registers
- **Figure:** No figure. Design principle.
- **Display:** n/a
- **Basis:** assumption
- **Source:** AETHER project design decision
- **URL:** n/a
- **Supporting text:** Our own reasoning: the `measured` / `projection` / `scenario` / `assumption` classification on every claim in this file exists so the interface can render each basis differently. Collapsing them into undifferentiated "facts" would misrepresent the evidence base regardless of citation accuracy.
- **Notes:** Second and last `assumption` entry. Correct citation is necessary but not sufficient — a correctly cited projection displayed as measured fact is still a misrepresentation. The basis field is machine-readable for exactly this reason.

---

## Numbers we could NOT verify

**Read this section before adding any figure not already in this document.** Everything below was looked for and either could not be sourced, does not exist, or exists only in a form too weak to cite. Do not use any of these numbers.

### Things that do not exist

**A WEF Future of Jobs Report 2026.** There isn't one. The WEF publications series page lists exactly **5 editions**: 2016, 2018, 2020, 2023 and 2025 (7 January 2025). The report is described by WEF as "bi-annual," so the next edition would be expected in 2027. During research an SEO blog (collegevidya.com, dated 12 January 2026) surfaced titled "Future of Jobs Report 2026: 92M Jobs Lost & 170M Created," claiming publication on 7 January 2026 — it is **recycling the 2025 figures under a false date**. Verified against https://www.weforum.org/publications/series/future-of-jobs/. Do not cite a 2026 edition, and do not describe the 170M/92M figures as 2026 data.

**Any credible institutional forecast for 2045.** Nothing was found. Longest horizons located: BLS 2034, WEF 2030, Acemoglu 10 years, and union foresight roadmaps to 2040 (which are explicitly non-predictive scenarios). See CLAIM-SCEN-01.

### Figures we deliberately did not chase because they originate in consultancy work

Widely circulated figures such as McKinsey's "375 million workers may need to switch occupational categories" and PwC's "$15.7 trillion added to global GDP by 2030" were **not verified and are not included**. The brief permits consultancy sources with honest labelling, but primary-source coverage of every topic proved sufficient, and these figures are old, heavily recycled, and frequently detached from their original assumptions. If the build team wants either, fetch the original report first and label the source as a consultancy.

### Specific figures within verified sources that need re-checking before display

**WEF slower-economic-growth job numbers (2 million created / 3 million destroyed).** Retrieved text was partially truncated in the search snippet. The direction and the "only macrotrend with net destruction" framing are solid; the exact digits are not confirmed against the report body. See CLAIM-JOB-06. Verify against the PDF before charting.

**OECD labour force participation rate (74.6%).** The retrieved passage read "the average participation rate reached ... .6%" with the leading digits cut off. Treat as unconfirmed. See CLAIM-ECON-11. Unemployment (4.9%) and employment rate (72.1%) in the same passage are confirmed.

**ITU mobile broadband affordability ratio.** ITU states wide gaps between average earners and the poorest 40% and points to figure 4.6 of the Global Connectivity Report 2025, but the specific ratio or price multiple was not retrieved. CLAIM-DIV-06 is therefore qualitative only.

**UNESCO member state count (193 vs 194).** UNESCO's own pages use both — "193 Member States adopted" and "applicable to all 194 member states." Both statements are on UNESCO domains. We could not determine which is correct as of August 2026. Prefer citing the adoption date and "first global standard on AI ethics" framing over a headcount. See CLAIM-GOV-05.

**OECD AI Principles adherent count (47).** Correct as displayed on oecd.ai at time of retrieval, but this number changes as jurisdictions adhere. Re-check before publication rather than treating as static. See CLAIM-GOV-07.

**Acemoglu TFP/GDP figures — two live versions.** 0.71%/0.55% (NBER WP 32487, 2024) vs 0.66%/0.53% (Economic Policy, 2025). Both real, same paper lineage. We resolved this by preferring the published 2025 figures, but the build team must not mix figures from the two versions in the same chart. See CLAIM-ECON-01, CLAIM-ECON-02, CLAIM-ECON-03.

### Things we looked for and could not find adequate evidence on

**Which reskilling programmes actually work.** This is the most significant gap in the entire evidence base and it materially limits Topic 8. We verified extensively that reskilling is *needed* (CLAIM-SKILL-02, CLAIM-SKILL-03), that employers *intend* it (CLAIM-RESK-01, CLAIM-RESK-09), and that participation is *unequal* (CLAIM-SKILL-10). We found **no rigorous outcome evaluation** — no completion rates, no employment-outcome or earnings-effect estimates for large-scale reskilling programmes, no cost-per-successful-transition figures. OECD offers recommendations (CLAIM-RESK-11), not effectiveness evidence. **Do not claim any reskilling approach is proven effective.** The honest statement is that the need is well evidenced and the solutions are not.

**Employer spending on training in currency terms.** No verified figure for global or regional employer training expenditure. WEF reports participation shares (CLAIM-SKILL-05) but no monetary investment figure was verified.

**Quantified AI hiring-bias rates.** Beyond the Amazon case (CLAIM-GOV-12, which is journalism about a decade-old system with no published bias magnitude), no rigorous quantified measurement of AI hiring discrimination rates was verified. Do not attach a percentage to AI hiring bias.

**Prevalence of workplace surveillance among employees generally.** The 40%+ tracking figure (CLAIM-GOV-10) covers **freelance platform workers only**, from a 2021 ILO survey. No verified figure for surveillance prevalence across the general employed workforce was found. Do not generalise the platform figure.

**Observed net AI job displacement to date.** No source provided a measured count of jobs actually lost to AI globally. All displacement figures in this document are projections or exposure estimates. The nearest measured evidence is that headline global unemployment is stable (CLAIM-EMP-08). Anyone asserting a measured global AI job-loss count is going beyond the evidence.

**AI literacy rates.** No verified measurement of AI literacy or AI skills prevalence in any population. WEF covers employer demand for AI skills (CLAIM-SKILL-06), not population-level attainment.

**ILO instruments specifically governing AI at work.** We verified ILO *research* on algorithmic management (CLAIM-GOV-09, CLAIM-GOV-11) and the ILO's calls for social dialogue, but did **not** verify any binding ILO Convention or Recommendation specifically addressing AI or algorithmic management. Do not imply an ILO AI standard exists comparable to the EU AI Act. ILO Working Paper 144 on "Global case studies of social dialogue on AI and algorithmic management" was seen referenced but not retrieved.

**Gender exposure figures by region beyond those listed.** CLAIM-DIV-09 lists the regions and countries named in the ILO 2026 brief. Country-level percentages beyond "over 40% of total female employment" for the highest group were not retrieved.

**ILO WP140 exposure gradient counts by occupational group.** The retrieved tables were heavily fragmented in extraction. We verified the headline shares and the gradient-4 occupation examples, but per-group gradient breakdowns were not reliably captured. Verify against the working paper before building any detailed occupational visualisation.

### Methodological warnings that must travel with the figures

- **Exposure is not job loss.** IMF's 40% and ILO's "one in four" measure occupational task exposure, not predicted unemployment. This is the most common misreading of both sources.
- **WEF figures are employer survey extrapolations,** covering 1.2 billion **formal** jobs from just over 1,000 employers in 55 economies — not a global census, and largely excluding informal work, which accounts for a projected 2.1 billion workers (CLAIM-EMP-09).
- **ILO WP140's worker survey is Polish** (1,640 respondents), not global, and the ILO notes managers (group 1) plus groups 8 and 9 were over-represented relative to national labour market patterns, with professionals (group 2) the most under-represented. It asks about jobs in the respondent's *industry*, not their own job. CLAIM-AUG-09 should not be presented as a global worker sentiment finding.
- **The Brynjolfsson et al. 15% result is one firm, one occupation, one tool, pre-2024 model.** Do not extrapolate to the economy.
- **The Vaccaro et al. meta-analysis covers studies from Jan 2020 to Jun 2023,** predating current model generations. Its findings may not hold for newer systems.
- **BLS projections are US-only** and model-based; they do not transfer to other economies.
- **ITU revises historical estimates substantially between editions.** Never compare figures across editions without the revised series.


