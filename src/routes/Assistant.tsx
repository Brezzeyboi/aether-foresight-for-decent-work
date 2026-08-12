/* ============================================================================
   AETHER AI — the career assistant.

   Three decisions shape it:

   1. Not a chat app. Answers are structured sections with figures, basis chips
      and links into the dashboard, because this is a workforce instrument.
   2. The retrieval pipeline is visible. Phases report real quantities from the
      match and the response, then the answer streams in.
   3. An unanswerable question gets a designed refusal rather than a guess.
   ============================================================================ */

import { useEffect, useRef, useState } from 'react';
import { Basis } from '../components/Basis.tsx';
import { ScreenHeader } from '../components/Layout.tsx';
import {
  OPENING,
  matchPrompt,
  pipelineFor,
  type Block,
  type Phase,
  type Response,
} from '../data/assistant-script.ts';
import { PROFILE } from '../data/profile.ts';
import { routeHref } from '../router.ts';
import './assistant.css';

interface Turn {
  id: number;
  /** Absent on the opening turn, which nobody asked for. */
  question?: string;
  response: Response | null;
  /** True while the pipeline runs. */
  working: boolean;
  /** Set when the query matched nothing on file. */
  offScript?: string;
  /** The retrieval pipeline for this turn. */
  phases?: readonly Phase[];
  /** How many phases have completed. */
  phasesDone?: number;
  /** Characters of the answer revealed so far. Infinity once complete. */
  streamed?: number;
}

let nextId = 1;

/* Pacing.

   Each phase holds long enough to be read rather than glimpsed, then the answer
   streams in at a steady character rate. Total lands between 2 and 5 seconds
   depending on answer length, which is long enough to feel like work is being
   done and short enough that nobody clicking through has to wait on it. */
const PHASE_MS = 700;
const STREAM_CPS = 220;
const FRAME_MS = 32;

export function Assistant() {
  const [turns, setTurns] = useState<Turn[]>([{ id: 0, response: OPENING, working: false }]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const intervals = useRef<number[]>([]);

  /* Clear every pending timer and the streaming interval on unmount. Navigating
     away mid-answer would otherwise leave an interval running forever, setting
     state on a component that no longer exists. */
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      intervals.current.forEach(clearInterval);
    },
    [],
  );

  const ask = (question: string) => {
    const m = matchPrompt(question);
    const match = m.prompt;
    const phases = pipelineFor(m);
    const id = nextId++;

    const update = (patch: Partial<Turn>) =>
      setTurns((t) => t.map((x) => (x.id === id ? { ...x, ...patch } : x)));

    setTurns((t) => [
      ...t,
      {
        id,
        question,
        response: null,
        working: true,
        offScript: match ? undefined : question,
        phases,
        phasesDone: 0,
        streamed: 0,
      },
    ]);
    setInput('');

    /* Reduced-motion gets the finished answer immediately. Staged phases and a
       character stream are both motion, and someone who has asked for less of it
       should not be made to sit through either. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      update({
        working: false,
        phasesDone: phases.length,
        response: match?.response ?? null,
        streamed: Infinity,
      });
      return;
    }

    phases.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => update({ phasesDone: i + 1 }), PHASE_MS * (i + 1)),
      );
    });

    const afterPhases = PHASE_MS * phases.length;

    timers.current.push(
      window.setTimeout(() => {
        update({
          working: false,
          response: match?.response ?? null,
          streamed: 0,
        });
        endRef.current?.scrollIntoView({ block: 'nearest' });

        if (!match) {
          update({ streamed: Infinity });
          return;
        }

        /* Stream the answer in by character count. A single interval advancing one
           counter is enough: each block renders only the slice of itself that has
           arrived, so the whole response fills in as one continuous pass rather
           than block by block. */
        const total = answerLength(match.response);
        let shown = 0;
        const step = Math.max(1, Math.round((STREAM_CPS * FRAME_MS) / 1000));

        const tick = window.setInterval(() => {
          shown += step;
          if (shown >= total) {
            window.clearInterval(tick);
            update({ streamed: Infinity });
          } else {
            update({ streamed: shown });
          }
        }, FRAME_MS);

        intervals.current.push(tick);
      }, afterPhases),
    );
  };

  const last = turns[turns.length - 1];
  const suggestions = last.response?.next ?? OPENING.next;

  return (
    <>
      <ScreenHeader
        title="AETHER AI"
        standfirst="A career assistant for the 2045 workforce. It answers from published research, names the source for every figure, and says when something is a scenario rather than a finding."
        aside={
          <div className="stat">
            <p className="stat__value">Prototype</p>
            <p className="stat__label">
              Runs on a local evidence base. Every answer shows the sources it used.
            </p>
            <Basis basis="assumption" source="internal" />
          </div>
        }
      />

      {/* .page supplies the gutter; .ai is the console inset within it. */}
      <div className="ai-frame page">
        <div className="ai">
          <aside className="ai__profile">
            <p className="ai__profile-label">Working from</p>
            <p className="ai__profile-name">{PROFILE.name}</p>
            <p className="ai__profile-context">{PROFILE.position}</p>
            <dl className="ai__profile-stats">
              <div>
                <dt>Readiness</dt>
                <dd>{PROFILE.readiness}/100</dd>
              </div>
              {PROFILE.dimensions.slice(-2).map((d) => (
                <div key={d.key}>
                  <dt>{d.label}</dt>
                  <dd>{d.score}</dd>
                </div>
              ))}
            </dl>
            <p className="ai__profile-note">{PROFILE.framing} No account, nothing stored.</p>
          </aside>

          <div className="ai__thread">
            {turns.map((turn) => (
              <div className="turn" key={turn.id}>
                {turn.question && (
                  <p className="turn__question">
                    <span className="turn__who">You asked</span>
                    {turn.question}
                  </p>
                )}

                {turn.phases && turn.phases.length > 0 && (
                  <Pipeline
                    phases={turn.phases}
                    done={turn.phasesDone ?? 0}
                    working={turn.working}
                  />
                )}

                {!turn.working && turn.response && (
                  <div className="turn__answer">
                    <p className="turn__who turn__who--ai">AETHER</p>
                    {turn.response.blocks.map((b, i) => {
                      const budget = (turn.streamed ?? Infinity) - offsetBefore(turn.response!, i);
                      if (budget <= 0) return null;
                      return <BlockView block={b} reveal={budget} key={i} />;
                    })}
                  </div>
                )}

                {!turn.working && !turn.response && turn.offScript && (
                  <div className="turn__answer">
                    <p className="turn__who turn__who--ai">AETHER</p>
                    <div className="offscript">
                      <p className="offscript__title">Nothing on file answers this</p>
                      <p className="offscript__text">
                        I only answer where the evidence base can back me up. Guessing here would
                        mean inventing a statistic, so I would rather say no. Try one of these.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />

            <div className="ai__ask">
              <p className="ai__ask-label">Suggested questions</p>
              <div className="ai__suggestions">
                {suggestions.map((s) => (
                  <button key={s} type="button" className="ai__chip" onClick={() => ask(s)}>
                    {s}
                  </button>
                ))}
              </div>

              <form
                className="ai__form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (input.trim()) ask(input);
                }}
              >
                <label className="sr-only" htmlFor="ai-input">
                  Ask a workforce question
                </label>
                <input
                  id="ai-input"
                  className="ai__input"
                  type="text"
                  value={input}
                  placeholder="Ask about skills, careers, exposure, or safety"
                  onChange={(e) => setInput(e.target.value)}
                  autoComplete="off"
                />
                <button className="ai__send" type="submit" disabled={!input.trim()}>
                  Ask
                </button>
              </form>
              <p className="ai__ask-note">
                Free text is matched against the topics on file. Anything outside them is refused
                rather than answered from nothing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* --- Streaming -----------------------------------------------------------
   One counter drives the whole response. Each block asks how many characters
   were spent by the blocks before it, then reveals only its own share, so text
   fills in continuously across the answer instead of block by block.

   Only prose streams. Figures, bars and pills appear whole once reached: a
   number revealed one digit at a time is unreadable, and a bar that grows from a
   partial value would misrepresent the data while it animated. */

const textOf = (b: Block): string => (b.kind === 'text' || b.kind === 'note' ? b.text : '');

/** Total streamable characters in a response. */
function answerLength(r: Response): number {
  return r.blocks.reduce((n, b) => n + (textOf(b).length || NON_TEXT_COST), 0);
}

/* Non-prose blocks still take time off the clock, so a response made mostly of
   figures does not snap in instantly. Roughly a line of text each. */
const NON_TEXT_COST = 60;

/** Characters spent by blocks before index `i`. */
function offsetBefore(r: Response, i: number): number {
  return r.blocks.slice(0, i).reduce((n, b) => n + (textOf(b).length || NON_TEXT_COST), 0);
}

/* --- The reasoning pipeline ---------------------------------------------
   Four phases, each reporting a real quantity from the match and the response:
   how the question parsed, what was retrieved and from which sources, how each
   figure is known, and what was composed.

   Live while running, so a screen reader hears progress; afterwards it collapses
   to a summary that can be reopened, because how an answer was reached should
   stay checkable after the answer arrives. */
function Pipeline({
  phases,
  done,
  working,
}: {
  phases: readonly Phase[];
  done: number;
  working: boolean;
}) {
  const rows = (list: readonly Phase[], live: boolean) => (
    <ol className="pipe__steps">
      {list.map((p, i) => {
        const state = !live || i < done - 1 ? 'done' : i === done - 1 ? 'active' : 'waiting';
        return (
          <li className="pipe__step" key={p.kind} data-state={state}>
            <span className="pipe__mark" aria-hidden="true" />
            <span className="pipe__label">{p.label}</span>
            <span className="pipe__detail">{p.detail}</span>
            {p.hits && p.hits.length > 0 && (
              <span className="pipe__hits">
                {p.hits.map((h) => (
                  <span className="pipe__hit" key={h}>
                    {h}
                  </span>
                ))}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );

  if (working) {
    return (
      <div className="pipe pipe--live" role="status" aria-live="polite">
        {rows(phases.slice(0, Math.max(done, 1)), true)}
      </div>
    );
  }

  return (
    <details className="pipe">
      <summary className="pipe__summary">
        <span className="pipe__summary-text">
          How this answer was reached
          <span className="pipe__count">{phases.length} steps</span>
        </span>
      </summary>
      {rows(phases, false)}
    </details>
  );
}

/* --- Response blocks ----------------------------------------------------
   Each block type is a different shape, which is what keeps a response reading
   as a structured answer rather than as a paragraph of chat. */

function BlockView({ block, reveal }: { block: Block; reveal: number }) {
  /* Prose is sliced to the character budget; a caret marks the cursor while the
     slice is still short of the full string. Non-prose blocks ignore the budget
     and render whole, since a half-drawn figure or bar would misread. */
  const slice = (text: string) => {
    const shown = reveal >= text.length ? text : text.slice(0, Math.max(0, Math.floor(reveal)));
    const streaming = shown.length < text.length;
    return (
      <>
        {shown}
        {streaming && <span className="ai-caret" aria-hidden="true" />}
      </>
    );
  };

  switch (block.kind) {
    case 'text':
      return <p className="ai-text">{slice(block.text)}</p>;

    case 'note':
      return (
        <p className="ai-note">
          <span className="ai-note__mark" aria-hidden="true" />
          {slice(block.text)}
        </p>
      );

    case 'figures':
      return (
        <div className="ai-figs">
          {block.items.map((f) => (
            <div className="ai-fig" key={f.label}>
              <p className="ai-fig__value">{f.value}</p>
              <p className="ai-fig__label">{f.label}</p>
              <Basis basis={f.basis} source={f.source} compact />
            </div>
          ))}
        </div>
      );

    case 'matches':
      return (
        <ol className="ai-matches">
          {block.items.map((m, i) => (
            <li className="ai-match" key={m.title}>
              <p className="ai-match__rank" aria-hidden="true">
                {i + 1}
              </p>
              <div className="ai-match__body">
                <p className="ai-match__title">{m.title}</p>
                <p className="ai-match__why">{m.why}</p>
              </div>
              <div className="ai-match__meta">
                <p className="ai-match__score">{m.score}%</p>
                <span className="pill" data-tone={m.status.toLowerCase()}>
                  {m.status}
                </span>
              </div>
            </li>
          ))}
        </ol>
      );

    case 'gaps':
      return (
        <ul className="ai-gaps">
          {block.items.map((g) => {
            const gap = g.needed - g.now;
            return (
              <li className="ai-gap" key={g.skill}>
                <p className="ai-gap__name">{g.skill}</p>
                <span className="bar">
                  <span className="bar__fill" style={{ inlineSize: `${g.now}%` }} />
                  {gap > 0 && (
                    <span
                      className="bar__gap"
                      style={{
                        insetInlineStart: `${g.now}%`,
                        inlineSize: `${gap}%`,
                      }}
                    />
                  )}
                  <span className="bar__need" style={{ insetInlineStart: `${g.needed}%` }} />
                </span>
                <p className="ai-gap__num">
                  {g.now} <span aria-hidden="true">→</span> {g.needed}
                </p>
              </li>
            );
          })}
        </ul>
      );

    case 'steps':
      return (
        <ol className="ai-steps">
          {block.items.map((s, i) => (
            <li className="ai-step" key={s.name}>
              <span className="ai-step__num" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <p className="ai-step__name">{s.name}</p>
                <p className="ai-step__detail">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      );

    case 'risks':
      return (
        <ul className="ai-risks">
          {block.items.map((r) => (
            <li className="ai-risk" key={r.label}>
              <div className="ai-risk__head">
                <p className="ai-risk__label">{r.label}</p>
                <span className="pill" data-tone={r.level}>
                  {r.level}
                </span>
              </div>
              <p className="ai-risk__note">{r.note}</p>
            </li>
          ))}
        </ul>
      );

    case 'link':
      return (
        <a className="ai-link" href={routeHref(block.route)}>
          {block.label} <span aria-hidden="true">→</span>
        </a>
      );
  }
}
