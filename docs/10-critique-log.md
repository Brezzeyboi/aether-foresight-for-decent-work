# Critique log — Task 1 Research Board

Audit date 2026-08-11. Scope: `src/routes/Research.tsx`, `src/routes/research/*`,
`src/styles/*`, `src/components/{shell,layout}.css`, `src/viz/*`.
Judged against: originality, whether a judge understands it in 30 seconds, and
whether it reads as a human product team or as generated work.

---

## Verdict

This is well-executed generated work with unusually strong content discipline. The
research, the basis-chip mechanism, and the "what this does not say" apparatus are
genuinely original thinking, and they are the reason the project is not
embarrassing. But the visual layer is a single idea repeated twelve times. Twelve
sections share one head shape, one body grid, one emphasis device (`border-top` in
ink), one value key (ivory, no tonal event anywhere in a 20,000-word scroll), one
figure width, and roughly ninety uppercase mono micro-labels. The largest element
in every one of the twelve sections is a decorative light-weight numeral set in
`--rule-strong`, the faintest non-hairline ink in the system — that specific move,
big pale margin numeral over a sans title over a standfirst, is the single most
recognisable signature of AI-generated "premium editorial" layout, and this project
uses it as the section template rather than as an accent. The design doc argues each
decision well in isolation and never asks whether the twelfth repetition still
earns its place. A judge scrolling this will read "serious, disciplined, and I have
seen this exact page before." The originality is all in the content model and almost
none of it has been given a visual form.

---

## The strongest thing here

The epistemic content model, and the fact that it is enforced in types rather than
in editorial discipline. `Evidence`/`Cite` cannot render a number without a source
and a basis. `Caveat` makes the limit a first-class, keyboard-reachable component
rather than a footnote. `docs/06-workforce-model.md` binds verb register to
evidence status (`is` / `is projected to` / `would` / `could`). Nobody else in this
competition will have built that, and it is the actual differentiator.

Second: the palette conflict resolution in `docs/03-design-system.md`. Measuring
that the mineral green fails a 0.10 chroma floor at 0.047 and collapses against
clay at ΔE 3.2 under protanopia, then changing the *chart architecture* instead of
overruling the measurement, is a real product-team move. Keep that document; a
judge who reads it will move you up a tier.

The horizon chart is the third-strongest thing, and it is not as strong as it thinks
it is. See finding 2.

---

## Findings, ranked by severity

### 1. Twelve sections, one layout family. This is the whole problem.

**What.** `ReportSection` (`parts.tsx:37`) is the only section shell in the
document, and all twelve calls use it identically: `number` in a 12rem margin
column, `title`, `standfirst`, then `children` in a body grid where
`research.css:180` forces *every* child to `grid-column: 2`. The only escapes are
`.evidence` (used 3 times) and `.margin-note` — **which is styled at
`research.css:484` and used zero times anywhere in the codebase.** So for 9 of 12
sections the 12rem margin column is completely empty below the head. A structural
slot that is empty three-quarters of the time is not a spine, it is a template with
an unfilled field, and it reads as one.

The content inside does vary (matrix, share bar, scenario multiples, ledger), but it
all varies *inside the same 2/3-width box*, so the page silhouette never changes.
Scroll the route at 30% zoom: you get twelve identical grey rectangles with a pale
number at the top-left of each.

**Why it reads as generated.** Margin numeral + sans title + standfirst + prose,
unvaried, is the default output shape. So is "every section has a standfirst" — 12
standfirsts with no exception means the device stops functioning as emphasis and
becomes chrome.

**Fix.** Three layout families, assigned deliberately. Add a `variant` prop to
`ReportSection` (`parts.tsx:20-54`) and switch the head/body grid in
`research.css:132-208`.

- **`spine`** (current shape). Assign to **01, 06, 11** only — the three
  argument-led sections. Three uses, not twelve, and it becomes a signal again.
- **`figure`** — no margin column at all. Head collapses to one baseline: number
  and title run inline (`display: flex; align-items: baseline; gap: var(--s-4)`),
  numeral drops to `var(--t-meta)` in `--ink`, and the standfirst moves *into* the
  figure's `help` slot where it does work. Body is a single full-width column that
  breaks the `.page` gutter. Assign to **02, 05, 07** — the three sections whose
  argument is the chart.
- **`ledger`** — head sits as a horizontal band across the top (number / title /
  standfirst as three cells of one row, `grid-template-columns: 4rem 22ch 1fr`,
  bottom rule in `--ink`), body is the table or list at full width and continuous
  with the head so head and body read as one ruled object. Assign to **04, 10, 12**
  and **03, 08, 09** keep `spine` but with real marginalia (finding 5).

That is 6 spine / 3 figure / 3 ledger, and the page silhouette now changes three
times.

### 2. The horizon chart is a fan chart wearing an argument, and it is not staged as a signature.

**What.** `src/viz/Horizon.tsx` does four things a generic fan chart does not:
non-linear time spacing (`Horizon.tsx:75-80`), per-band fill keyed to epistemic
status (`fillFor`, line 110), a hard "Published projections end / Inference and
scenarios" boundary at line 192, and a spine that goes dashed where evidence stops
(`chart.css:256`). That is real thinking.

**But.** The cone is symmetric about a midline that encodes nothing — there is no
quantity on the y axis at all, `spread` is declared illustrative, so the shape is a
metaphor rendered as a chart. That is defensible only if the frame makes the
metaphor unmissable. It doesn't: it renders at 860×340 into `grid-column: 2` inside
the same `border-top: 1px solid var(--ink)` `.report-figure` frame as the six bar
charts, at effectively the same rendered width, in the same three faint sequential
greens. Seven figures, one weight, one size, one frame. The intended signature is
visually indistinguishable from a survey bar chart about clerical exposion.

**Fix.** Promote it to the poster and stop pretending it is one figure among seven.

1. Move the `ReportFigure`+`HorizonChart` block (`Research.tsx:166-176`) out of
   section 02 and place it between `.report-masthead` and `.report-contents`, as the
   publication's opening image.
2. Full-bleed: `width: 100vw; margin-inline: calc(50% - 50vw);` with the SVG frame
   raised to `width: 1440, height: 560` and `padding.top: 96` so the boundary labels
   have air.
3. Put it on the inverted plate. `--surface-ink` is defined at `tokens.css:23`, the
   design doc calls it "a rare inverted plate", `.on-ink` focus handling exists at
   `base.css:89` — **and neither is used anywhere in the product.** This is the one
   sanctioned tonal event in the system and it is sitting unused while the document
   runs 12 sections at a single value. Use it here: ink plate, cone in `--seq-300`
   through `--seq-600`, spine and boundary in `--ink-on-dark`, scenario texture in
   ivory at 0.5. One dark band, once, at the top. That is the memorable image.
4. Keep a compact reference to it in section 02 — a 3-line prose pointer, not a
   second render.

Section 02 then becomes a `figure`-variant section led by the `Matrix`, which is
fine: the five-dimension matrix with the changing verb register is a better second
figure than a duplicate cone.

### 3. There is exactly one emphasis device, and it is `border-top`.

**What.** Count the ink-weight top rules: `.report-masthead` 2px ink
(`research.css:23`), `.evidence` 2px ink (248), `.scenario-grid` 2px ink (549),
`.recommendations` 2px ink (679), `.source-list` 2px ink (728), `.evidence-row` 1px
ink (283), `.report-figure` 1px ink (425), `.matrix thead th` 1px ink (396). Every
single block that wants to say "I am important" says it by growing a line on top.
Add `.caveat`, `.margin-note`, `.report-figure__foot`, `.method-note__list`,
`.scenario-panel__dim`, `.source-list__item`, `.report-contents__item` at hairline
weight and the document is ~40 stacked horizontal rules with no other structural
vocabulary.

**Why it reads as generated.** "Hairline + top rule + generous space" is the safe
default that a model reaches for when it has been told not to use cards. It is
tasteful and it is also the reason nothing on the page has a shape.

**Fix.** Keep the rule as the *default* and give three specific objects a different
structural device each, so the rule stops being the only answer:

- **`.evidence-row`** (`research.css:278`): drop both borders, set
  `background: var(--surface-sunken)`, break the gutter to full-bleed, and raise
  `.evidence-row__value` from its current 1.95rem cap to `var(--t-figure-lg)`
  (3.5rem). See finding 4.
- **`.scenario-grid`** (`research.css:545`): implement the texture channel the design
  doc promises. `docs/03-design-system.md` says scenario identity comes from
  "texture angle (45°/135°)" — **that is documented and not implemented**; the
  panels currently differentiate by position, numeral, and one accent colour on the
  `strongest` panel. Add a 10px-tall SVG texture band at the top of each panel at
  0° / 45° / 135°. This costs ~15 lines, delivers the doc's own promise, and gives
  the section a texture that no other section has.
- **`.method-note`** (`research.css:771`): currently the *only* object in the whole
  document with a background, a border on all four sides, and a radius. It reads as
  a callout imported from a different design system. Either strip it to rules like
  everything else, or make it the second inverted plate and close the publication
  on ink the way it opened.

### 4. The 30-second read is set at 1.95rem in a two-thirds-width column.

**What.** A judge lands, reads the masthead, and hits section 01. The first
quantitative thing they see is `.evidence-row` — four verified figures, the
project's whole claim in one band — capped at
`clamp(1.4rem, 1.2rem + 0.8vw, 1.95rem)` (`research.css:295`) and confined to
`grid-column: 2`. Meanwhile `--t-figure-hero` (7rem) and `--t-figure-lg` (3.5rem)
are defined at `tokens.css:118-119` and used nowhere in this route, and the largest
rendered element in the section is the pale `01` at 3.5rem in `--rule-strong`.

The type system's own hierarchy is inverted: decoration is set larger than the data.

**Fix.** In `Research.tsx:110`, make the section-01 `EvidenceRow` full-bleed and
give it its own class (`.evidence-row--opening`): four figures at
`var(--t-figure-lg)`, statements at `--t-meta`, sunken plane, no top rule, spanning
both grid columns. Then cut the section numeral to `var(--t-meta)` in `--ink` in the
`figure` and `ledger` variants, and cap it at 2rem in `spine`. Nothing decorative
should out-size the data.

While there: `Research.tsx:270-286` hand-rolls `.evidence-row` markup instead of
calling `<EvidenceRow ids={[...]} />`. Same visual band appears twice (01 and 03)
which is part of why section 03 feels like a repeat. Replace the hand-rolled block
with three stacked `<Evidence>` callouts in the margin column — which is what the
margin column is for and what would finally fill it.

### 5. The uppercase mono micro-label rule is honoured in the letter and broken in the spirit.

**What.** `docs/03-design-system.md` claims `.label` is "the single uppercase
treatment… rationed: at most one per three sections." Literally true — `.label`
appears once in this route ("Contents"). But the *visual unit* — mono, `--t-micro`,
`letter-spacing: 0.09em`, uppercase, `--ink-muted` — is reproduced under eight other
class names: `.report-masthead__kind`, `.report-masthead__meta-label`,
`.caveat__trigger`, `.matrix thead th`, `.scenario-panel__dim dt`,
`.source-list__org`, `.chart-toggle`, plus `.axis__label`, `.horizon__edge-label`,
`.horizon__status` in the charts. Rendered instances on this one page: 8 caveat
triggers, 26 source orgs, ~23 scenario dimension terms, ~16 matrix column headers,
7 chart toggles, 4 masthead meta labels, plus chart internals. **Call it ninety.**

Ninety wide-tracked uppercase mono labels is not a rationed accent, it is the most
repeated visual element in the document, and it is the second-most reliable tell of
generated "editorial technical" work after the margin numeral.

**Fix.** Cut roughly 60% by demoting the three highest-count offenders, none of which
need uppercase to function:

- `.caveat__trigger` (`research.css:329`): sentence case, `--t-small`, sans, with the
  `+`/`−` marker in `--accent`. These are *sentences* ("What this summary does not
  claim") shouted in 11px caps — the worst offender both aesthetically and for
  legibility. −8 instances and the caveats read as authored rather than as chrome.
- `.scenario-panel__dim dt` (`research.css:635`): sentence case, `font-weight: 550`,
  `--ink`, run-in with the `dd` on one line (`display: flex; gap: var(--s-3)`)
  rather than stacked. −23 instances, and the panels get denser, which suits them.
- `.source-list__org` (`research.css:738`): sans, `--t-meta`, `--ink`, `font-weight:
  550`. −26 instances.

Keep uppercase mono for: `.label`, `.matrix thead th`, chart axis labels, basis
chips. Those are structural table/chart apparatus where the convention is real.

Also drop `.report-prose > p:first-child { font-size: 1.08em }` (`research.css:218`).
There are 14 `<Prose>` blocks, several of them mid-section, so this "old editorial
device" fires on paragraphs that open nothing. It currently reads as an
inconsistency, not a device. Keep it only on the first `Prose` of a section.

### 6. Seven figures, one size, one weight, one frame.

**What.** `HBars` and `DivergingBars` are `width: 720`, `ShareBar` 720, `Horizon`
860, all `preserveAspectRatio` into `width: 100%` inside the same column, all
wrapped in the same `.report-figure` top-ruled frame with title/help/foot. There is
no small figure and no large figure — no visual statement that figure 3 matters more
than figure 6.

**Fix.** Introduce two figure scales and use them.

- `.report-figure--bleed`: breaks the gutter, full page width. Use for the promoted
  horizon (finding 2) and for section 04's absolute-growth `HBars`, which is the
  single best "aha" chart in the document (740k care aides at $34,900 against 268k
  developers at $133,080) and currently gets the same box as everything else.
- `.report-figure--inset`: sits in the *margin* column at ~12rem wide as a true
  marginal figure. Use for section 05's `ShareBar`, which is one stacked bar of four
  segments and does not need 700px.

That also fixes section 05, which currently stacks two identically-framed figures
back to back — the clearest "we had two datasets so we made two charts" moment on
the page. Composite them: `ShareBar` as an inset strip, `HBars` as the main figure,
one shared `ReportFigure` with two sub-captions.

### 7. Section 10 is a styled `<ol>` and section 12 is a styled `<ul>`.

**What.** `.recommendation` (`research.css:682`) is a 3rem numeral column in accent
at 1.125rem plus a title and body. That is the default ordered-list treatment with
tokens applied. `.source-list__item` is the same shape without the numeral. Both are
the weakest-designed blocks in the document and they are the last two things a judge
sees.

**Fix (10).** The recommendations already have the interesting structure and it is
being thrown away: each one is tied to *a specific gap in the evidence*. Make the
left column carry the gap, not a number — mono, `--ink-muted`, 2 lines, e.g. "No
outcome evaluation exists" / "Volume measured, reach not" / "Oversight untested" —
against the recommendation on the right. `grid-template-columns: 16ch minmax(0,1fr)`,
rule between rows. Now the section is an argument mapped to evidence instead of a
numbered list, and it visually rhymes with the `Matrix` sections rather than with
the contents list.

**Fix (12).** Set the 26 sources as a two-column ledger with `--surface-sunken`
zebra striping (matching `.matrix`), org and year in a fixed left column, title and
scope right. Drop `.source-list__url`'s full URL from screen — `word-break:
break-all` on 26 URLs is ~26 blocks of ragged mono noise closing the publication.
`print.css` already restores printed URLs, per the design doc; that is where they
belong.

### 8. The masthead is the generated-hero shape, verbatim.

**What.** `Research.tsx:57-87`: uppercase mono kind label → 5.25rem sans title
capped at 26ch → serif standfirst at 54ch → a flex row of four label/value metadata
pairs → 2px ink rule → two-column contents list. Every element of that stack is
defensible and the stack as a whole is the exact composition a model produces when
asked for "editorial research publication cover."

**Fix.** Two changes, both cheap. Put the promoted horizon chart immediately below
the title so the cover is *title + the image*, which no template does because it
requires having a signature chart. And move "Furthest evidenced horizon — 2034" out
of the metadata row and into the chart, labelling the boundary line itself; it is the
publication's thesis and it is currently a 13px value in a row of four. Two metadata
pairs ("100 verified claims", "8 primary sources") are enough beside the chart.

### 9. Smaller, still worth fixing

- **`DivergingBars` label overflow.** `Bars.tsx:233` sets `half = w/2 - 46 = 294`
  with `w = 680`, so the longest bar ends at x≈654 and its label starts at 662 in a
  720 viewBox. "AI and big data" at 11.5px is ~90px — it paints ~70px outside the
  frame. `.chart-svg` has `overflow: visible` so it will not clip, but it will
  collide with the figure foot or the gutter. Reserve `half = w/2 - 140`, or move
  labels inside the bar for the longest entries.
- **`.reveal` is defined at `base.css:315` and used in no `.tsx` file.** The design
  doc describes an IntersectionObserver reveal; the research route has no motion at
  all beyond hover. Either wire it to `.report-section` or delete the CSS — an
  unused documented behaviour is a thing a judge might ask about.
- **Double row spacing.** `.report-section__body` has `gap: var(--report-gap)` *and*
  `> * + * { margin-top: var(--s-6) }` (`research.css:206`). Row spacing is
  gap+2rem, so vertical rhythm is inconsistent with the head's. Pick one.
- **`.scenario-panel__support` prose is computed in the JSX** with a nested ternary
  at `Research.tsx:776-782`. Move the three strings into `SCENARIOS` in
  `src/data/horizons.ts`; the route should not hold copy.

---

## The three highest impact-to-effort fixes

Deadline is tomorrow. In this order.

**1. Promote the horizon chart to a full-bleed opening image on the inverted plate.**
(Finding 2. ~1.5 hours: move one JSX block, one new CSS class, bump the frame
dimensions, add an `--on-ink` fill branch to `fillFor`.) This is the highest-leverage
change available. It creates the one memorable image the project currently lacks, it
introduces the single tonal contrast event in a 12-section ivory scroll, and it uses
a token and a focus-handling class that already exist and are unused. Right now the
project's signature visualisation is buried at position 14 of a scroll, at the same
size as a bar chart about clerical exposure. After this change the first thing a
judge sees is a dark band containing an argument no other entry will have.

**2. Break the twelve-section monotony into three layout families.** (Finding 1.
~2 hours: one `variant` prop, two extra head/body grid blocks, twelve one-word call
sites.) This is the difference between "template" and "design". Six spine, three
figure-led with no margin column, three ledger. Even if you only ship two families
(spine + figure-led) and only convert sections 02, 05, and 07, the page silhouette
changes three times instead of zero, and the margin column stops looking like an
unfilled field.

**3. Raise the opening evidence band and cut the numeral, then strip ~60% of the
uppercase mono labels.** (Findings 4 and 5. ~1 hour: three class edits, one new
full-bleed class, three CSS blocks demoted to sentence case.) The 30-second test is
decided in the first screen and a half. Currently the biggest thing there after the
title is a pale decorative `01`, and the project's four headline verified figures
are set at 1.95rem in a two-thirds column. Invert that, and simultaneously stop
shouting 90 micro-labels, and the page stops looking like it was generated by
something that had read about editorial design.

If you only get one done, do #1. If you get two, do #1 and #3 — they are cheaper
together and both land in the first screen, which is where the judging actually
happens.

---

## What NOT to change

**Do not add colour.** The palette resolution in `docs/03-design-system.md` is the
most defensible document in the project. No categorical series hues, no second
accent, no risk colours reused as decoration. The inverted plate in fix #1 is a
*value* change, not a hue change — keep the sequential ramp doing the work.

**Do not add motion.** `MOTION_INTENSITY 4` with hover-only feedback is correct for
a research publication that must print. Do not fix the unused `.reveal` by adding
scroll animation to twelve sections; delete it instead. Stagger-reveal on a research
board is precisely the generated tell you are trying to escape.

**Do not vary the type families or the radius.** One sans, one serif confined to
sustained reading, one mono, `2px/3px/1.5px`. The serif/sans split is predictable but
it is *correctly scoped* — Newsreader appears only where there are paragraphs, which
is more discipline than most entries will show. Changing this buys nothing and risks
incoherence with Tasks 2 and 3.

**Do not turn anything into a card.** The instinct after reading finding 3 will be
to give blocks backgrounds and borders. Resist it for everything except the two
named objects (`.evidence-row--opening` on sunken, the inverted plate). "Grouping by
rules and space before cards" is right; the problem is that the rule is the *only*
device, not that rules are wrong. Fix it by adding texture and one plate, not by
adding twelve panels.

**Do not touch the `Caveat` mechanism, the `Basis` chips, or the chart table views.**
Collapsed-by-default limits behind a real `aria-expanded` button, four epistemic
states with glyphs that survive greyscale, and a table equivalent for every chart are
the substance of the entry. Restyle the caveat *trigger* (finding 5); leave the
behaviour alone.

**Do not vary the standfirsts away entirely.** Cutting all twelve would lose the
scannability that makes a 12-section publication navigable. Cut them to eight: keep
them on the `spine` and `ledger` sections, and fold them into the figure `help` slot
on the three `figure` sections. Variation with a reason, not absence.

**Do not restructure the twelve-section content order.** It builds correctly:
evidence → what it establishes → where it stops → what follows. The problem is
never the argument, it is that the argument is wearing the same suit twelve times.
