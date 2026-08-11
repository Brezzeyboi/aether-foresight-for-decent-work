# Product specification

## The problem

People know AI is changing work. They cannot find out what that means for them
specifically, from a source that is honest about its own uncertainty.

The available options each fail in a different way:

- **Research reports** are rigorous and unreadable. The evidence exists, in PDFs
  of 200 pages, written for policymakers.
- **Careers advice** is readable and unsourced. It confidently names the jobs of
  the future without saying how it knows.
- **General AI assistants** will answer any question about your career, with the
  same fluency whether or not there is evidence behind the answer.

The gap is not information. It is **information a person can act on, that admits
what it does not know.**

## The product promise

> Understand where work is going. Prepare for where you want to be.

AETHER is a workforce intelligence system. It connects published research to an
individual's own position, and it states the basis for every figure it shows, so
a reader can tell evidence from projection from scenario from assumption.

The philosophy the whole product argues for: **AI does not simply replace human
work.** The evidence base points the other way. Augmentation is the larger
category (CLAIM-AUG-01), only clerical work is highly exposed as a broad group
(CLAIM-AUG-02), and two years of real-world use *lowered* estimated automation
potential for the most-exposed tasks (CLAIM-AUG-06). The useful question is not
"will my job survive" but "how does my work change, and what do I learn."

## Target user

**Primary: a person deciding what to learn next.** A student choosing a
direction, or a working adult who suspects their role is shifting. They have
limited time, no research training, and a real decision to make. They need to
know what is solid and what is speculation, because they are betting years of
effort on the answer.

**Secondary: an educator or careers adviser** who needs sourced material rather
than futurist assertion.

**Immediate: a competition judge** who has never seen this before and will spend
perhaps thirty seconds deciding whether it is serious. This is not the user the
product is *for*, but it is the user it must survive first. The Overview screen
is built for that thirty seconds.

## The five questions

The product's information architecture is these five questions. Each maps to a
screen, and each screen exists to answer exactly one.

| Question | Screen | What it answers with |
|---|---|---|
| What is happening to work? | Overview, Research | measured current state, then projections |
| What skills will matter? | Skills | employer-reported demand shifts |
| What careers could emerge or grow? | Careers | ranked projections, honestly labelled |
| How can people prepare safely and inclusively? | Learning, Safety | pathways, and the risks in the system |
| What could AI adoption mean for the economy? | Economy | three scenarios, not one forecast |

## The three layers

The competition's three tasks are three layers of one system, and the navigation
says so:

```
EVIDENCE   Research board        what the published research establishes
ANALYSE    Six dashboard screens what it means at system level
ASK        AETHER AI             what it means for one person
```

Read downward it is an argument: individual guidance rests on system-level data,
which rests on published research. Read upward it is a workflow: a person asks a
question, gets an answer grounded in data, and can trace that data to its source.

Nothing in the product is orphaned. Every figure in the dashboard traces to the
research board. Every assistant response cites the dashboard data it used.

## What AETHER refuses to do

Scope is defined as much by refusals, and these are product features rather than
limitations:

- **It does not forecast 2045.** No credible institution does; the furthest
  rigorous horizon in the evidence base is about 2030 to 2034. Beyond that the
  product speaks in scenarios and says so.
- **It does not tell anyone their job will disappear.** Exposure is not job loss.
  Conflating the two is the most common misreading of the IMF and ILO figures,
  and the product is built to prevent it.
- **It does not show a number without its basis.** Enforced by types, not by
  discipline: a figure with no source cannot be given a basis and therefore
  cannot render.
- **It does not simulate intelligence it does not have.** The assistant is a
  scripted prototype and is labelled as one. It is not a chatbot pretending to
  reason.
- **It does not ask for personal data.** The profile is fictional and marked
  DEMO MODE on every screen.

## The demonstration profile

A judge should never face a login, an empty state, or a form. The product opens
fully populated with a fictional profile, and says clearly that it is fictional.

The profile is designed to be *instructive* rather than flattering: strong in some
dimensions, genuinely weak in others, so the interface has real gaps to show. A
profile scoring well everywhere would make the skill-gap and learning-path
features meaningless.

Full definition in [`07-ux-flows.md`](07-ux-flows.md).

## Responsible AI, as a mechanism

The brief asks for responsible framing. Copy alone cannot deliver that, because
copy can be forgotten at the point a new number is added. So it is structural:

1. `src/data/evidence.ts` holds a typed source registry. A source id that does not
   exist is a compile error, so a citation cannot be invented.
2. Every claim carries a `basis`, and the `<Basis>` chip renders it wherever the
   figure appears. Dropping the basis is not possible without deleting the figure.
3. Each basis has a distinct **glyph** as well as a colour, so the distinction
   survives colourblindness and greyscale printing.
4. Long-horizon language is conditional by construction: "could", "if",
   "scenario", "projected", "estimated".
5. `docs/04-research-evidence.md` ends with the figures that could **not** be
   verified. That list is load-bearing: it records what the product is not
   allowed to claim.

## Success criteria

The product works if a judge, unaided, can:

1. State what AETHER is within thirty seconds of the page loading.
2. Reach every one of the eight routes without instruction.
3. Complete the assistant flow from question to learning path.
4. Tell, for any figure on screen, whether it is measured data or a scenario.
5. Find the source of any statistic in two clicks.
6. Print the research board to a clean PDF.
7. Run all of it with the network cable unplugged.
