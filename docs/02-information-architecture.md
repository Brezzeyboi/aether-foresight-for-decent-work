# Information architecture

## Route tree

Eight flat routes. Hash-based (`#/route`), because the production build must run
from `file://` and from a static server with no rewrite rules; history routing
404s in both cases.

```
#/overview     Where do I stand?              Task 3 entry point, and the 30-second screen
#/skills       What skills will matter?       Task 3
#/careers      Which roles could fit?         Task 3
#/safety       What are the risks?            Task 3
#/learning     How do I prepare?              Task 3
#/economy      What could change?             Task 3
#/assistant    Guidance for my profile        Task 2
#/research     What does the evidence say?    Task 1
```

Deep links carry an optional anchor: `#/research#sources`. Used for
cross-references, so any figure can link to the section of the research board
that establishes it.

`src/components/Shell.tsx` asserts at module load (in dev) that every route in
`ROUTES` appears exactly once in the navigation. A screen that exists but cannot
be reached is a bug that would otherwise ship silently.

## Navigation model

Grouped into three, and the grouping is the product's argument rather than a
convenience:

```
ANALYSE    Overview  Skills  Careers  Safety  Learning  Economy
ASK        AETHER AI
EVIDENCE   Research board
```

Persistent across every screen, single line at desktop, capped at 64px. Below
1000px it moves to its own row and scrolls horizontally rather than collapsing
into a hamburger: seven destinations *are* the product's structure, and hiding
them hides the argument.

Each nav item carries the question its screen answers as a `title`, so hovering
the navigation is itself an explanation of the product.

The demo-mode flag sits in the masthead on every screen. A judge should never
have to wonder whether they are looking at real personal data.

## How the three tasks interlock

The relationship is directional and each direction is navigable:

```
                    RESEARCH BOARD (Task 1)
                 published evidence, 12 sections
                            |
                    every figure sourced
                            v
                    DASHBOARD (Task 3)
              six screens, system-level analysis
                            |
                  applied to one profile
                            v
                    AETHER AI (Task 2)
                individual guidance, scripted
```

Downward: guidance rests on data, data rests on research.
Upward: any assistant answer traces to dashboard data, which traces to a source.

Concretely:

- Overview introduces the five dashboard areas and links into each.
- Every dashboard figure carries a `<Basis>` chip whose source resolves to the
  research board's source list.
- The assistant's career matches link to the Careers screen; its learning paths
  link to Learning; its exposure analysis links to Safety.
- The research board's scenario section is the evidentiary backing for the
  Economy screen's three scenarios; they share one data module.

Sharing data modules rather than duplicating content is what makes the three
tasks one system instead of three that merely look alike.

## Screen anatomy

Every dashboard screen follows the same skeleton, so a reader learns the pattern
once:

```
ScreenHeader     the question as h1, a standfirst, and one key figure
Section          one analytical question per section
  FigureFrame    a chart, with its question as the title
    chart        SVG
    table view   toggleable equivalent
    footnote     basis chip and source
```

`FigureFrame` requires a title, which is the mechanism preventing decorative
charts: if a chart has no question to answer, there is nothing to put in the
required field.

## The research board's internal structure

Twelve sections, as the brief specifies. Long single route with a sticky section
index, rather than twelve sub-routes: it reads as a publication and prints as one
document.

```
01 Executive summary          08 Economic transformation
02 The workforce transformation 09 Three 2045 scenarios
03 The skills shift            10 Recommendations
04 Jobs of the future          11 Conclusion
05 Automation vs augmentation  12 Sources
06 Safety and ethics
07 Inclusive workforce
```

`print.css` breaks each section onto a fresh page, so Ctrl+P produces a
paginated publication from the same components.

## Progressive disclosure

The rule: a screen shows what a reader needs at that moment, and holds detail one
interaction away.

- **Skills** shows current level and future relevance per skill; the reasoning and
  suggested improvement expand on selection.
- **Careers** shows match and status; core skills, gaps, exposure, human
  advantage, and pathway expand per career.
- **Safety** shows a risk matrix; why-it-matters and mitigation expand per risk.
- **Learning** shows a pathway spine; skills, effort, prerequisites, project, and
  outcome expand per node.
- **Economy** shows three scenarios side by side; dimensions expand per scenario.
- **Research** shows the argument; supporting quotations and caveats expand.

Nothing important is *only* available on hover. Every disclosure is
keyboard-reachable and works on touch.

## Entry and first thirty seconds

The judge lands on `#/overview`, already populated. In order of what they see:

1. **What this is.** The name, the descriptor, and one sentence stating the
   product's purpose.
2. **The headline figure.** Workforce readiness, 78/100, with its five dimensions.
3. **That it is a demo.** Stated in the masthead, not hidden.
4. **Where to go.** The five dashboard areas introduced with the question each
   answers.

No login, no empty state, no configuration, no typing. Detailed walkthrough in
[`07-ux-flows.md`](07-ux-flows.md).
