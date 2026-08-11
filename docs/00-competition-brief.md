# Competition brief, decomposed

**Event** AI Workforce Lab
**Entry** AETHER, Workforce Intelligence 2045
**Theme** "The best way to predict the future is to create it, ensuring that
innovation and human dignity walk hand in hand."

The brief asks how AI can create a safe, inclusive, and sustainable work
environment for 2045. Below, every requirement is decomposed into a checkable
item, traceable to where it is satisfied. This is the file to audit against before
submission.

Status keys: `[ ]` not started, `[~]` in progress, `[x]` done and verified.

---

## Task 1, Future Workforce Research Board

A polished research publication, twelve numbered sections.

| # | Section | Status | Location |
|---|---|---|---|
| 01 | Executive summary | `[ ]` | `routes/research/` |
| 02 | The workforce transformation | `[ ]` | |
| 03 | The skills shift | `[ ]` | |
| 04 | Jobs of the future | `[ ]` | |
| 05 | Automation vs augmentation | `[ ]` | |
| 06 | Safety and ethics | `[ ]` | |
| 07 | Inclusive workforce | `[ ]` | |
| 08 | Economic transformation | `[ ]` | |
| 09 | Three 2045 scenarios | `[ ]` | |
| 10 | Recommendations | `[ ]` | |
| 11 | Conclusion | `[ ]` | |
| 12 | Sources | `[ ]` | |

Required treatment:

- `[ ]` timelines
- `[ ]` comparison matrices
- `[ ]` evidence callouts
- `[ ]` charts
- `[ ]` diagrams
- `[ ]` research annotations
- `[ ]` section numbering
- `[ ]` editorial typography
- `[ ]` source citations on every factual statistic
- `[ ]` research turned into visual communication, not pages of text
- `[x]` no invented numbers (enforced by `src/data/evidence.ts` types)
- `[ ]` printable to a clean multi-page PDF from the same source content

---

## Task 2, AETHER AI assistant

A specialist workforce assistant, not a general chatbot.

Specialisations:

- `[ ]` skill analysis
- `[ ]` career discovery
- `[ ]` AI exposure analysis
- `[ ]` learning paths
- `[ ]` workplace safety
- `[ ]` future workforce questions

Required flow, fully clickable:

- `[ ]` open AETHER
- `[ ]` view demo profile
- `[ ]` ask for career recommendation
- `[ ]` view matches
- `[ ]` open a career
- `[ ]` view skill gaps
- `[ ]` generate learning path
- `[ ]` analyse AI exposure
- `[ ]` view safety considerations

Constraints:

- `[x]` fictional profile preloaded, no account creation
- `[x]` no API, no real inference, no waiting
- `[ ]` DEMO MODE clearly labelled
- `[ ]` locked data reads as intentional ("Presentation profile, demo data")
- `[ ]` feels complete despite simulated intelligence
- `[ ]` does not look like ChatGPT

---

## Task 3, Interactive workforce dashboard

Seven areas.

### Overview
- `[ ]` immediately communicates what AETHER is, why it exists, what it can tell you
- `[ ]` workforce readiness figure (78/100)
- `[ ]` five dimensions: skills, career readiness, adaptability, AI literacy, human skills
- `[ ]` a sophisticated visualisation, not a progress bar
- `[ ]` introduces the five areas below

### Skill tracker
- `[ ]` eight demo skills
- `[ ]` current capability and future relevance
- `[ ]` interaction reveals: current level, future relevance, why it matters, suggested improvement

### Job recommendations
- `[ ]` six example careers
- `[ ]` per career: match score, why it matches, core skills, skills to develop, AI exposure, human advantage, learning path
- `[ ]` EMERGING / GROWING / SCENARIO / PROJECTED clearly distinguished
- `[ ]` speculation never presented as fact

### Safety indicators
- `[ ]` seven risks: AI bias, privacy, surveillance, automation risk, human oversight, digital inclusion, AI reliability
- `[ ]` per risk: risk level, why it matters, mitigation
- `[ ]` interactive matrix
- `[ ]` communicates responsibility, not fear

### Learning pathways
- `[ ]` select a target career
- `[ ]` visual pathway generated
- `[ ]` expandable nodes: skills, effort, prerequisites, project idea, outcome

### Economic impact
- `[ ]` three scenarios: responsible adoption, high automation, human-AI collaboration
- `[ ]` per scenario: productivity, job transformation, new occupations, reskilling demand, inequality, workplace conditions
- `[ ]` evidence where available, scenario labels where not

### AETHER AI
- `[ ]` integrated natively into the dashboard
- `[ ]` predefined demo interactions
- `[ ]` reads as a workforce intelligence system

---

## Cross-cutting requirements

### Design
- `[x]` not a school project, Canva template, AI dashboard, ChatGPT clone, cyberpunk site, neon interface, crypto dashboard, SaaS admin panel, or random card collection
- `[x]` futuristic through information architecture, not glowing graphics
- `[x]` restrained accent (single mineral green, verified)
- `[x]` warm off-white base, graphite type
- `[x]` typography as a major design element
- `[ ]` looks excellent with all animation disabled
- `[ ]` visual originality audit performed and weakest elements redesigned

### Motion
- `[x]` tokens defined, all collapse under reduced-motion
- `[ ]` page transitions, section reveals, chart drawing, count-ups
- `[ ]` nothing loops, floats, or bounces
- `[ ]` no scroll-jacking

### Responsible AI
- `[x]` structural, not just copy (typed source registry, basis on every claim)
- `[x]` measured / projection / scenario / assumption kept separate
- `[ ]` no pretence of knowing 2045
- `[ ]` encourages human judgement, continuous learning, ethical use, oversight, inclusive access

### Accessibility
- `[x]` semantic HTML, focus states, contrast verified by gate
- `[x]` reduced-motion support
- `[ ]` keyboard navigation verified end to end
- `[ ]` ARIA where appropriate, logical tab order

### Engineering
- `[x]` reusable components, design tokens, clean structure
- `[x]` local demo data, no backend, no auth, no database, no fake API calls
- `[x]` minimal dependencies (React, three font packages)
- `[ ]` responsive layouts verified

### Offline and portability
- `[x]` production build self-contained (7-check gate passing)
- `[x]` no CDN, no remote fonts, no external images, no analytics, no API
- `[x]` hash routing for `file://` compatibility
- `[x]` single bundle, no dynamic chunks
- `[ ]` verified with networking disabled
- `[ ]` verified portable to another Windows machine
- `[x]` Python static-server fallback documented (`npm run serve:dist`)

### Presentation
- `[ ]` unified identity across all three tasks
- `[ ]` consistent typography, colour, terminology, iconography, data language
- `[ ]` the three tasks tell one story
- `[ ]` demo flow documented
- `[ ]` problem, solution, and innovation stated concisely
- `[ ]` judge understands the concept within 30 seconds
- `[ ]` judge can explore without instructions
- `[ ]` no dead interactions, no broken states, no console errors

---

## The quality gate

Before finalising, the brief requires answering these honestly. Recorded in
[`10-critique-log.md`](10-critique-log.md) with what changed in response.

- Does this look like something a talented human design team would make?
- Does it look generic? Does it look AI-generated?
- Is the visual hierarchy excellent?
- Is the information architecture understandable?
- Are the animations meaningful?
- Are the charts actually useful?
- Does it clearly satisfy all three tasks?
- Can a judge understand it in 30 seconds, and explore it without instructions?
- Are the claims scientifically responsible? Are sources credible?
- Is the interface accessible?
- Are there dead interactions or visual inconsistencies?
- Is anything unnecessarily complicated?
- Is anything decoration rather than communication?
