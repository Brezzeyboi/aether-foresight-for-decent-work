# Demo script

How to run AETHER on the day, what to say, and what to do if something goes wrong.

---

## Before you start

**Open the build, not the dev server.** Double-click `dist/index.html`. That is the
whole application: no internet, no Node, no terminal.

If the browser blocks anything when opened directly, use the fallback:

```bash
python -m http.server 8080 --directory dist
```

Then open `http://localhost:8080`. This is verified working: all assets returned
HTTP 200 from a copy with no source tree present.

**Check before presenting:** the page loads, the top-right says DEMO MODE, and the
navigation shows eight destinations.

---

## The 30-second answer

If a judge asks only one question, this is the answer:

> AETHER is a workforce intelligence system. It takes published research on AI and
> work, connects it to one person's skills, and states for every single number
> whether it is measured data, a projection, a scenario, or our own assumption.
>
> The reason that last part matters: most AI careers advice confidently tells you
> what jobs will exist in 2045. No credible institution forecasts that far. The
> furthest real projection reaches 2034. So this product shows exactly where the
> evidence stops.

---

## The walkthrough, in order

Seven minutes if uninterrupted. Each step has one thing to point at.

### 1. Overview
**Point at:** the readiness bars.

"Each bar has three parts: the green is current capability, the black line is what
employers actually want, and the hatched red is the gap. AI literacy is the biggest
gap, which matters because AI literacy is the fastest-growing skill in employer
demand. So the weakness sits exactly where the research says it costs most."

### 2. Skills
**Point at:** the ordering.

"These are sorted by gap size, not alphabetically. The order is the advice: the top
row is what to work on first. Open any row and it says why it matters and gives one
concrete next step."

### 3. Careers
**Point at:** the status labels.

"Six careers, and only one is labelled Growing. That one, climate technology,
actually appears by name in both the WEF and US government projections. The other
five are Emerging, which means they are reasonable guesses that no projection
counts yet. Most careers advice would present all six as equally certain."

### 4. AETHER AI
**Point at:** the structured answer, then type something off-topic.

"This is scripted, and it says so. Ask it something outside workforce questions and
it tells you it will not improvise, because improvising would mean inventing
evidence."

Type: `what is the capital of France` → shows the designed refusal.

### 5. Safety
**Point at:** the top risk.

"The highest risk here is not robots taking jobs. It is oversight that exists on
paper while the algorithm actually decides. The EU documented a real case where
appeals almost never changed the outcome."

### 6. Economy
**Point at:** the scenario picker, then the missing numbers.

"Three pathways to 2045. Notice there are no economic figures on the scenario
cards, because nobody publishes 2045 economics. Each pathway states what it needs
to be true, and what it cannot prove."

### 7. Research board
**Point at:** the horizon chart on the dark band, then Ctrl+P.

"This is the argument of the whole project. The band is what can be said at each
point in time. It widens because uncertainty widens, and it turns to hatching where
published evidence runs out. And the whole report prints to a clean PDF."

---

## If a judge pushes back

**"Did you actually read all this research?"**
Honest answer: the figures were assembled from primary sources, each one traced
back and recorded with its exact quote and caveat. The evidence file lists 100
claims with sources, and it also lists the numbers that could **not** be verified,
which is the part most projects would leave out.

**"Isn't the AI fake?"**
Yes, and the product says so on the screen. It is a scripted prototype. Simulating
inference would have meant generating answers with no source, which is the one
thing the whole project is built to avoid.

**"How do you know these career predictions?"**
We do not, and the labels say which is which. One of the six is evidenced; five are
labelled Emerging with the nearest evidenced role named. That distinction is the
product.

**"Why does it say 2034 and not 2045?"**
Because that is the furthest any institutional projection reaches. The competition
asks about 2045, so everything past 2034 is presented as scenario space with
conditions attached, rather than as prediction.

---

## Talking points that land

- **The three reading depths.** One line per section, then charts, then full
  analysis behind a toggle. Depth is available, not compulsory.
- **The basis chips.** Enforced by the code: a figure with no source cannot be
  given a basis, and a figure with no basis cannot render. Honesty as a mechanism.
- **The colour discipline.** Every colour was measured for contrast and for
  colourblind separation before use. The risk levels carry a glyph and a word as
  well as a colour, so they work in greyscale.
- **SDG 8.** Three specific targets named, mapped to the sections where the
  evidence bears on them.

---

## If something breaks

| Problem | Fix |
|---|---|
| Blank page from `file://` | Use the Python server command above |
| A screen looks wrong | Reload. The router falls back to Overview on any bad URL |
| PDF looks wrong | Print to PDF from Chrome, A4, background graphics ON |
| Someone asks for the source files | `docs/` has the evidence base and every planning file |

**Never** run `npm run dev` in front of judges. Present the built version.
