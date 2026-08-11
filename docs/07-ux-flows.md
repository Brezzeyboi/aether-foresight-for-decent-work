# UX flows, states, and the demonstration profile

## The demonstration profile

One fictional profile, preloaded, marked DEMO MODE on every screen.

It is designed to be **instructive rather than flattering**. A profile scoring well
everywhere would make the skill-gap, learning-path, and recommendation features
meaningless: there would be nothing to show. So it has genuine weaknesses, and the
interface has real work to do.

```
Name          Amara Okonjo-Lindqvist
Position      Third-year undergraduate, information systems
Context       Two internships, one in public-sector service design
Readiness     78 / 100
```

The name is specific rather than generic. "Jane Doe" and "Sarah Chan" are tells;
a believable name signals the profile was designed rather than filled in.

### Readiness dimensions

Deliberately uneven, so the visualisation shows shape rather than a flat ring:

| Dimension | Score | Why this value |
|---|---|---|
| Human skills | 86 | strongest. Communication, collaboration, judgement |
| Adaptability | 82 | strong. Has changed direction once already |
| Digital skills | 79 | solid, unremarkable |
| Career readiness | 74 | middling. Direction not yet chosen |
| AI literacy | 68 | **weakest, and the point of the profile** |

The composite is 78. AI literacy being the weakest dimension is intentional: it is
the dimension the evidence base says matters most (CLAIM-SKILL-06 has AI and big
data as the fastest-growing skill), so the profile's largest gap sits exactly
where the research says it hurts. That gives the assistant something worth saying
and the learning pathway somewhere worth starting.

Every profile number carries `basis: 'assumption'` and source `internal`. It is
fictional, and the interface never lets it look like a finding.

### Skill profile

Eight skills, each with a current level and a future-relevance rating. Current
levels come from the profile (assumption); future relevance traces to the evidence
base (projection, WEF employer expectations).

```
                    current   future relevance
AI literacy            42          very high
Digital skills         79          high
Critical thinking      81          very high
Communication          88          high
Adaptability           82          very high
Data literacy          58          high
Creative problem-solving 76        high
Ethical reasoning       71         rising
```

The interesting cases are the mismatches: AI literacy at 42 against very high
relevance is the largest gap, and data literacy at 58 the second. Those two drive
the learning pathway.

## The first thirty seconds

The judge has not been briefed and will decide quickly whether this is serious.

| Time | What they see | What they should conclude |
|---|---|---|
| 0-3s | Wordmark, descriptor, a one-sentence purpose | "This is a workforce intelligence product" |
| 3-10s | Readiness figure 78/100 and its five dimensions | "It analyses a person against something" |
| 10-20s | The five areas, each with the question it answers | "It covers skills, careers, safety, learning, economy" |
| 20-30s | Basis chips and the demo flag | "It knows the difference between data and speculation" |

The last row is the one that distinguishes the project. A judge who notices the
basis chips in the first thirty seconds has understood the central idea without
reading a word of explanation.

**No login. No empty state. No configuration. No typing.**

## The judge demo path

The intended click-through, and the order the presentation follows:

```
1. Overview      the readiness figure and its five dimensions
2. Skills        select AI literacy, see the gap and why it matters
3. Careers       open AI Product Designer, see match reasoning and status label
4. Assistant     ask for recommendations, walk to a learning path
5. Learning      expand a pathway node
6. Safety        open a risk in the matrix, see mitigation
7. Economy       compare the three scenarios
8. Research      the evidence, then Ctrl+P for the PDF
```

Every step is reachable from the navigation, so a judge who wanders off the path
never gets lost. The path is a suggestion, not a rail.

## The assistant flow (Task 2)

Scripted, deterministic, and honest about being scripted. Nine steps, each a
structured response rather than a wall of chat text:

```
open              profile summary, three suggested questions
  v
"What careers fit my current skills?"
  v
matches           three careers with match scores and reasoning
  v
open a career     AI Product Designer
  v
skill gaps        which skills, current vs required, ranked by gap
  v
learning path     generated pathway, seven stages
  v
AI exposure       task-level exposure for that career, with the caveat
  v
safety            the risks specific to that role
  v
next              back into the dashboard at the relevant screen
```

Suggested prompts are offered as buttons. Free text input is present but
constrained: it matches against the scripted intents and, when nothing matches,
says so plainly rather than improvising. The failure message is designed rather
than apologetic:

> Not in the demonstration script. This prototype answers a fixed set of
> workforce questions. Try one of the suggestions above.

The assistant is not styled as a chat app. Responses are structured cards with
figures, basis chips, and links into the dashboard. It should read as a
specialised instrument, not a general chatbot.

## States

Every interactive surface needs all four. The default of "successful state only"
is what makes prototypes feel thin.

**Loading.** Not applicable to most of the product: data is bundled, so there is
no fetch to wait for. Where a chart draws in on scroll, its final layout is
reserved first, so nothing reflows. The assistant uses a deliberate short delay
before responses (≈400ms) so the interaction reads as considered rather than
instant, with a typing indicator. This is honest: it is a scripted pause, not a
fake inference.

**Empty.** The product ships populated, so empty states are edge cases rather than
first impressions: a career filter matching nothing, an assistant query outside
the script. Each says what happened and what to do, and offers a way back.

**Error.** No network means no network errors. Real cases are an unknown route
(falls back to Overview rather than blanking) and an unmatched query (handled
above). A malformed hash never produces a blank screen.

**Locked / unavailable.** Where the prototype cannot go deeper, the reason is
stated as intentional:

> Presentation profile, demo data

never:

> Feature unavailable

## Keyboard map

Full operation without a mouse:

| Key | Action |
|---|---|
| `Tab` / `Shift+Tab` | move through interactive elements in document order |
| `Enter` / `Space` | activate a link, button, or disclosure |
| `Arrow` keys | move within a tab list or matrix |
| `Esc` | close an expanded panel or dismiss a tooltip |

- Skip link is the first focusable element on every screen.
- Focus rings are 2px in the accent and never removed.
- Focus is never trapped, since there are no modals.
- Disclosures use real `<button>` elements with `aria-expanded`.
- The chart table toggle is a real control, not a hover affordance, so chart data
  is reachable by keyboard and by screen reader.

## Responsive behaviour

| Range | Behaviour |
|---|---|
| ≥ 1240px | full layout, grouped nav on one line, asymmetric grids |
| 1000-1240px | nav group labels drop, demo-flag detail drops |
| 640-1000px | nav moves to its own row and scrolls horizontally |
| < 640px | single column throughout, charts reflow to taller aspects, matrices become stacked lists |

The risk matrix and scenario small-multiples are the two layouts that genuinely
cannot survive a narrow viewport as-is. Both restructure rather than shrink: the
matrix becomes a grouped list ordered by severity, the small multiples stack
vertically with their labels inline.

## Reduced motion

Under `prefers-reduced-motion: reduce`, every duration collapses to 1ms and the
pre-reveal state is never applied, so content is fully formed on arrival rather
than waiting for an animation that will not come. Chart draw-in becomes an
immediate final state; count-ups show the final figure.

The interface is designed to look correct this way. If it looks better with motion
than without, the motion was carrying weight the layout should have carried.
