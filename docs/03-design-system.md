# Design system

The source of truth for AETHER's visual language. Tokens live in
[`src/styles/tokens.css`](../src/styles/tokens.css); this file explains the
reasoning, and records the decisions that were forced by measurement rather than
taste.

Two automated gates enforce it. Neither is advisory:

```bash
node tools/check-tokens.mjs     # contrast + ramp monotonicity
node tools/gen-ramp.mjs         # regenerates the sequential ramp
```

---

## Design read

> An editorial research publication crossed with an analytical instrument, for
> competition judges, in a restrained mineral and press language, using
> typography and data visualisation as the primary visual devices.

Dials: `DESIGN_VARIANCE 7 / MOTION_INTENSITY 4 / VISUAL_DENSITY 6`.

Density sits above the usual landing-page default because this is an instrument,
not a marketing page. Motion sits deliberately low: the interface must look
correct with animation entirely disabled, and every animation has to justify
itself as communicating state, transition, progress, or cause and effect.

**Theme lock: light only, and deliberately so.** This is a print-emulating
publication whose Task 1 route must produce a clean PDF. No section inverts. The
one exception is `--surface-ink`, a rare inverted plate. `prefers-reduced-motion`,
`prefers-reduced-transparency`, and `forced-colors` are all honoured.

---

## The palette conflict, and how it was resolved

This is the most consequential decision in the system, so it is recorded with the
measurements that forced it.

The specified accent is `#496957`, a mineral oxidised green. Measured against the
data-visualisation gates on the ivory surface `#F3F0E8`:

| Check | Requirement | Measured | Result |
|---|---|---|---|
| OKLCH chroma floor | ≥ 0.10 for a series hue | **0.047** | fail |
| CVD separation vs clay `#9A5B41` | ΔE ≥ 8 (protanopia) | **3.2** | fail |
| WCAG contrast as text/UI | ≥ 4.5:1 | **5.36:1** | pass |

Six candidate triads were tested. The finding was structural, not a matter of
picking a better hex: **every green desaturated enough to read as "mineral" fails
the chroma floor, and every green saturated enough to pass stops looking
mineral.** Under protanopia the mineral green and the clay risk tone collapse into
each other at ΔE 3.2, against a required 8.

The resolution keeps the specified colour and changes the chart architecture so
the colour is never asked to do a job it cannot do:

1. **`--accent` is an interface colour only.** Links, active navigation, focus
   rings, selected state, emphasis marks, section rules. It passes the correct
   gate for that job comfortably (5.36:1 as text, 5.65:1 on the raised plane).
2. **Charts encode with the sequential ramp or with emphasis.** Neither form needs
   categorical series identity, so the chroma and CVD gates do not apply.
   Sequential is the safe default for magnitude anyway.
3. **The three economic scenarios render as small multiples**, one panel each.
   This is the only place the product genuinely needs to distinguish three
   things at once. Identity comes from panel position, a direct label, and
   texture angle (45°/135°) — never from hue. This sidesteps the all-pairs CVD
   gate entirely, and reads more like a research publication than a three-series
   overlay would.
4. **Risk uses a reserved status scale** in muted clay and oxblood, never reused
   as "series 4", and always shipping with a glyph and a text label so the
   meaning never rests on colour alone.

The lesson worth keeping: a colour can be excellent for interface and wrong for
data. Those are different gates, and the honest fix is usually to change what the
colour is asked to encode, not to overrule the measurement.

---

## Planes

Three levels, because more than three stops meaning anything.

| Token | Value | Use |
|---|---|---|
| `--surface` | `#F3F0E8` | the page. Warm ivory. |
| `--surface-raised` | `#F8F6F0` | figures, panels, sticky chrome |
| `--surface-sunken` | `#ECE8DD` | inset areas, table zebra, quiet blocks |
| `--surface-ink` | `#1C1E1B` | rare inverted plate |

## Ink

Four levels, all clearing WCAG AA 4.5:1 on both the page and the raised plane.

| Token | Value | On surface | Use |
|---|---|---|---|
| `--ink` | `#171816` | 15.64:1 | primary text, display |
| `--ink-secondary` | `#43443F` | 8.63:1 | body, sustained reading |
| `--ink-muted` | `#5F6058` | 5.59:1 | metadata, captions, axis labels |

## Accent

| Token | Value | Use |
|---|---|---|
| `--accent` | `#496957` | links, active nav, focus, emphasis marks |
| `--accent-deep` | `#324A3B` | hover, pressed, accented headings |
| `--accent-wash` | `#E4EBE4` | selected row, active tab bed |
| `--accent-wash-strong` | `#D3DED6` | hover on an already-selected surface |

## Rules

Hairlines are decorative separators and are exempt from the 3:1 requirement by
design. `--rule-strong` is for real UI boundaries and clears it.

| Token | Value | Contrast | Use |
|---|---|---|---|
| `--rule-soft` | `#E6E1D4` | 1.15:1 | faintest division, inside figures |
| `--rule` | `#DAD4C4` | 1.30:1 | default hairline |
| `--rule-strong` | `#8A8271` | **3.35:1** | input borders, table head, UI boundaries |

`--rule-strong` was originally `#ADA695` and measured 2.13:1, failing the non-text
contrast requirement. The token checker caught it; it was corrected rather than
excused.

## Sequential ramp

Generated by `tools/gen-ramp.mjs` at the accent's own hue (159.4°), evenly spaced
in OKLab lightness at ΔL 0.093. **Do not hand-edit these values** — re-run the
generator, or the even spacing that makes the ramp readable is lost.

| Step | Value | Contrast |
|---|---|---|
| `--seq-100` | `#C1DBCB` | 1.29:1 |
| `--seq-200` | `#9FBFAC` | 1.75:1 |
| `--seq-300` | `#81A28F` | 2.46:1 |
| `--seq-400` | `#668673` | 3.53:1 |
| `--seq-500` | `#4E6A5A` | 5.22:1 |
| `--seq-600` | `#394F42` | 7.78:1 |
| `--seq-700` | `#25352C` | 11.35:1 |

**Two different floors apply, depending on the encoding.** Conflating them was a
real bug during setup, so it is spelled out:

- **Sequential** (continuous magnitude: heatmaps, intensity) may start at
  `seq-100`. The lightest step means "near zero" and is *supposed* to recede
  toward the surface.
- **Ordinal** (discrete ordered categories: tiers, stages, gradients) must start
  no lighter than `seq-300`, so every step clears 2:1 and reads as a real
  category rather than as blank space.

`seqColor(t, 'ordinal')` enforces this in code and is covered by a test.

## Risk status

A fixed, reserved four-step scale. Never used as a series colour. Always paired
with a glyph and a text label, so meaning never rests on colour alone.

| Token | Value | Contrast |
|---|---|---|
| `--risk-low` | `#5E6B57` | 4.96:1 |
| `--risk-moderate` | `#8A6A3B` | 4.38:1 |
| `--risk-elevated` | `#8F4E2F` | 5.59:1 |
| `--risk-high` | `#7A322A` | 7.96:1 |

## Basis chips

The visible half of the responsible-AI mechanism. Four epistemic states, each
with a distinct **glyph** as well as a colour, so the distinction survives
colourblindness, greyscale printing, and forced-colors mode.

| Basis | Glyph | Meaning |
|---|---|---|
| `measured` | ■ filled square | observed data, already collected and published |
| `projection` | ○ open circle | a modelled forward estimate from the source |
| `scenario` | ◧ half-filled | a conditional pathway, not a forecast |
| `assumption` | ▢ open square | ours, carried by no source, illustrative only |

---

## Typography

| Role | Face | Rationale |
|---|---|---|
| UI, display, all chart text | **Geist Variable** | neutral, precise, excellent at small sizes |
| Long-form report body | **Newsreader Variable** | genuine editorial publication brief |
| Metadata, section numbers, figures | **Geist Mono Variable** | tabular alignment |

All three are self-hosted through `@fontsource` and bundled locally. No remote
font requests, which is part of what keeps the build offline-safe.

Newsreader is used **only** for sustained reading in the research route. Serif is
not a decorative default; it earns its place where there are paragraphs to read.
Neither Fraunces nor Instrument Serif is used, both being AI-default display
serifs. (An early draft of `package.json` did reach for Fraunces; it was caught
and replaced before install.)

**Emphasis rule:** italic or weight within the *same* family. Never a second
family injected into a headline for visual interest. Italic display type reserves
descender clearance (`line-height: 1.1` plus padding) so a `g` or `y` never clips.

### Scale

Fluid where it must survive 360px to 1600px; fixed where predictability matters
more than fluidity (metadata, labels, table cells). Large analytical figures are
a primary design element and have their own scale (`--t-figure-*`).

Tabular figures are used **only** where digits must align vertically in a column.
Large standalone numbers use proportional figures so they look drawn rather than
typeset into a grid.

### The one uppercase label

`.label` is the single uppercase treatment, at one tracking value
(`--tr-label: 0.09em`). It is rationed: **at most one per three sections**, and it
names structure rather than decorating it. Anything more and every section starts
wearing the same templated hat.

---

## Space, grid, radius

4px base scale (`--s-1` … `--s-10`). Section rhythm via `--section-y`; page
gutters via `--gutter`; reading measures via `--measure` (68ch) and
`--measure-tight` (54ch).

Radius is a **near-square system**: `--r-1: 2px` for chips and controls,
`--r-2: 3px` for panels and figures, `--r-mark: 1.5px` for chart bar data-ends.
The publication should read as pressed paper and precision instrument; soft
corners fight that. One scale, applied everywhere, no exceptions.

Grouping is done with rules and space before it is done with cards. Elevation
(`--shadow-1..3`) is tinted to the surface hue, never pure black, and used
sparingly.

---

## Motion

`MOTION_INTENSITY 4`. Durations `--dur-1` (120ms) through `--dur-4` (620ms), with
three easings: default, reveal, and reversible.

Permitted, because each communicates something:

- route and section transitions (spatial continuity)
- chart draw-in and figure count-up (progressive disclosure of data)
- panel expand and collapse (cause and effect)
- hover and focus feedback (state)

Not permitted: anything that loops, floats, bounces, or moves without being asked
to. No scroll-jacking. No `window.addEventListener('scroll')` anywhere — reveal
uses IntersectionObserver.

Under `prefers-reduced-motion: reduce`, every duration collapses to 1ms and the
pre-reveal state is never applied, so a reduced-motion reader sees fully-formed
content rather than blank space waiting for an animation that will not come.

---

## Charts

Hand-built SVG. No chart library: the specifications below are all fights against
a library's defaults, the set of forms is small and fixed, and avoiding one
removes a runtime dependency from an offline build.

Rules, enforced in `src/viz/`:

- **Every chart states the question it answers.** `FigureFrame` requires a title.
  A chart without a question is decoration.
- **One axis.** Never two y-scales.
- **Bars are measured from zero**, or their lengths lie. `niceDomain` includes
  zero by default.
- **Rounded data-end, square baseline.** The bar reads as anchored to the axis
  rather than floating.
- **Sequential or emphasis encoding**, per the palette resolution above.
- **Selective direct labels.** Never a number on every point.
- **A table view accompanies every chart**, which is also what satisfies the
  contrast relief rule and makes printed charts readable.
- **Recessive grid and axes.** The data is the darkest thing in the frame.
- Smoothing is only used for genuinely continuous quantities; smoothing sparse or
  stepped data invents values between the points.

23 self-checks cover the primitives, including NaN guards, zero-width domains,
and floating-point tick drift: `node src/viz/scale.test.mjs`.

---

## Accessibility

- Semantic HTML; landmarks; one `h1` per screen.
- `:focus-visible` rings at 2px in the accent, never removed, with an inverted
  variant for dark plates.
- Skip link to main content.
- Colour never the sole carrier of meaning: risk has glyphs and labels, basis has
  glyphs, the current nav item has weight and a rule as well as colour.
- All motion gated on `prefers-reduced-motion`; transparency on
  `prefers-reduced-transparency`; `forced-colors` handled for chart fills and
  rules.
- Charts have table equivalents rather than relying on hover.

---

## Print

`src/styles/print.css` drives Task 1's PDF from the same components the screen
uses. No duplicated content. It removes interface chrome, restores paper
apparatus (running head, folio, printed source URLs), forces page breaks between
report sections, prevents figures and tables from splitting across pages, sets
widow and orphan control, collapses multi-column grids to a single column, and
prints the chart data tables since a printed chart cannot be hovered.
