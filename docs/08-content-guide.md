# Content guide

Voice, banned phrasings, and terminology lock. The interface has to sound like a
real product: precise, informative, and quiet.

## Voice

**Analytical, not promotional.** State what is known, how it is known, and what
follows. The reader is deciding what to spend years learning; they need accuracy,
not encouragement.

**Plain about uncertainty.** Hedging is not weakness here, it is the product's
main claim to credibility. "Employers expect" is better than "by 2030 there will
be". But hedge *once* and precisely, rather than draping every sentence in
qualifiers.

**Short.** Section standfirsts run one or two sentences. If a paragraph needs
three clauses to make its point, the point is not yet clear.

**Second person for guidance, third person for evidence.** "Your strongest current
matches are" in the assistant. "Employers report that 39% of core skills will
change" in the research board. Never mix the registers inside one block.

## Banned phrasings

Not stylistic preferences. These are the phrases that make a product read as
generated rather than written.

**Marketing filler.** unlock, unleash, empower, elevate, revolutionise, transform
your future, seamless, cutting-edge, next-generation, game-changing, harness the
power of, in today's fast-paced world, the future is here.

**Hollow futurism.** "Empowering tomorrow." "The future of work is now." "Shape
your destiny." Anything that could be printed on a conference tote bag.

**False confidence about the future.** "will be", "is going to", "the jobs of 2045
are" when discussing anything past about 2030. Use "could", "may", "on current
trends", "in this scenario".

**Fake precision.** A number with more significant figures than its source
supports. If the ILO says "around one in four", do not render 24.7%.

**Em-dashes and en-dashes as separators.** Use a comma, a colon, parentheses, or
two sentences. Ranges use a plain hyphen. This is a hard ban, checked
mechanically before ship, and it applies to every visible string: headlines,
labels, buttons, body, captions, alt text, and the research prose.

**Apologetic locked states.** "Feature unavailable", "Coming soon", "Not
implemented". Where the prototype stops, say what it is: "Presentation profile,
demo data".

## Terminology lock

One term per concept, everywhere. Drift between synonyms makes a small product
feel like several.

| Use | Never |
|---|---|
| workforce readiness | career score, employability index |
| AI exposure | AI risk, automation risk, threat level |
| human advantage | irreplaceable skills, human edge, what AI cannot do |
| learning pathway | course, curriculum, roadmap, journey |
| skill gap | deficiency, weakness, shortfall |
| scenario | prediction, forecast, outlook |
| projection | forecast, prediction |
| emerging | future, upcoming, next-gen |
| growing | in-demand, hot, booming |
| demonstration profile | sample user, test account, persona |

**"Exposure" is the load-bearing term** and the most important one to get right.
Exposure means task overlap with model capability. It does not mean predicted job
loss, and conflating the two is the most common misreading of both the IMF and ILO
figures. Wherever exposure appears with a figure, the distinction is stated in the
same view, not buried in a footnote.

## Status labels

Four labels for career and occupation claims, used consistently:

| Label | Means | Requires |
|---|---|---|
| `GROWING` | evidenced growth in a published projection | a CLAIM- id from WEF or BLS |
| `EMERGING` | plausible from direction of travel, not in a ranked list | reasoning stated |
| `PROJECTED` | a specific published forward estimate | a CLAIM- id |
| `SCENARIO` | only meaningful under a particular 2045 pathway | which scenario |

A career with no evidence gets `EMERGING` and says what the nearest evidenced
adjacent role is. It never gets `GROWING` because it sounds better.

## Basis chip language

The four bases, as the interface defines them:

- **Measured.** Observed data already collected and published by the cited source.
- **Projection.** A modelled forward estimate published by the cited source.
  Sensitive to its assumptions.
- **Scenario.** A conditional pathway, not a forecast. Describes what could follow
  if stated conditions hold.
- **Design assumption.** Our own assumption for this prototype, carried by no
  external source. Illustrative only.

The fourth is worded to be unmistakable. A reader must never think a demo number
is a research finding.

## Numbers

- Round to the precision the source uses. "One in four" stays "1 in 4".
- Percentages need their base: 39% *of core skills*, not a bare 39%.
- Millions as "170M" in figures, "170 million" in prose.
- Ranges with a plain hyphen: "2026-2045".
- A figure with no source does not appear. This is enforced by the type system.

## Chart text

- **Titles are questions or findings**, not labels. "Where is exposure
  concentrated?" or "Exposure concentrates in clerical work", never "Exposure by
  occupation".
- **Axis labels state units.** "% of tasks", not "%".
- **Direct labels are selective.** Label the endpoints and the point being made,
  not every value.
- **Reading help** where the encoding is not self-evident, in one sentence.

## Assistant copy

Structured, brief, and never pretending to more than it is.

- Opens by summarising the profile, so the user knows what it is working from.
- Answers lead with the finding, then the reasoning.
- Every figure carries its basis chip, same as the rest of the product.
- Suggested prompts are specific: "What careers fit my current skills?" not "Tell
  me about careers".
- Off-script queries get the designed message, not an apology or an improvisation.

Never: "Great question!", "I'd be happy to help", "As an AI", "Let me analyse
that for you", or any simulation of enthusiasm.
