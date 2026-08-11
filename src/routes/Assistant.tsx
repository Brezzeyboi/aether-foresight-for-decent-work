/* ============================================================================
   TASK 2 — AETHER AI.

   A scripted specialist assistant. Three decisions shape it:

   1. It does not look like a chat app. Responses are structured cards with
      figures, basis chips, and links into the dashboard, because the point is a
      workforce instrument rather than a general chatbot.
   2. It is honest about being scripted. The delay before a response is a
      deliberate pause, not fake inference, and the interface says so.
   3. Off-script queries get a designed answer, not an apology or an
      improvisation.
   ============================================================================ */

import { useEffect, useRef, useState } from 'react';
import { Basis } from '../components/Basis.tsx';
import { ScreenHeader } from '../components/Layout.tsx';
import { OPENING, findPrompt, type Block, type Response } from '../data/assistant-script.ts';
import { PROFILE } from '../data/profile.ts';
import { routeHref } from '../router.ts';
import './assistant.css';

interface Turn {
  id: number;
  /** Absent on the opening turn, which nobody asked for. */
  question?: string;
  response: Response | null;
  /** True while the scripted pause runs. */
  working: boolean;
  /** Set when the query matched nothing in the script. */
  offScript?: string;
}

let nextId = 1;

export function Assistant() {
  const [turns, setTurns] = useState<Turn[]>([
    { id: 0, response: OPENING, working: false },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  // Clear any pending scripted pause on unmount, so a navigation mid-response
  // does not set state on a gone component.
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    []
  );

  const ask = (question: string) => {
    const match = findPrompt(question);
    const id = nextId++;

    setTurns((t) => [
      ...t,
      { id, question, response: null, working: true, offScript: match ? undefined : question },
    ]);
    setInput('');

    // A deliberate pause so the interaction reads as considered. This is not a
    // simulated inference time: there is no model, and the interface says so.
    const timer = window.setTimeout(() => {
      setTurns((t) =>
        t.map((turn) =>
          turn.id === id
            ? { ...turn, working: false, response: match ? match.response : null }
            : turn
        )
      );
      endRef.current?.scrollIntoView({ block: 'nearest' });
    }, 420);

    timers.current.push(timer);
  };

  const last = turns[turns.length - 1];
  const suggestions = last.response?.next ?? OPENING.next;

  return (
    <>
      <ScreenHeader
        title="AETHER AI"
        standfirst="A workforce assistant, not a general chatbot. It answers from the same evidence base as the rest of the product, and states when something is a scenario rather than a finding."
        aside={
          <div className="stat">
            <p className="stat__value">Scripted</p>
            <p className="stat__label">
              Every response is written in advance. No model runs, nothing is fetched, and the
              prototype does not pretend otherwise.
            </p>
            <Basis basis="assumption" source="internal" />
          </div>
        }
      />

      <div className="ai page">
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
          <p className="ai__profile-note">
            Presentation profile, demo data. No account, no personal information, nothing stored.
          </p>
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

              {turn.working && (
                <div className="turn__working" role="status">
                  <span className="turn__working-bar" aria-hidden="true" />
                  <span>
                    {findPrompt(turn.question ?? '')?.response.working ?? 'Checking the script'}
                  </span>
                </div>
              )}

              {!turn.working && turn.response && (
                <div className="turn__answer">
                  <p className="turn__who turn__who--ai">AETHER</p>
                  {turn.response.blocks.map((b, i) => (
                    <BlockView block={b} key={i} />
                  ))}
                </div>
              )}

              {/* Off-script: a designed answer rather than an error. */}
              {!turn.working && !turn.response && turn.offScript && (
                <div className="turn__answer">
                  <p className="turn__who turn__who--ai">AETHER</p>
                  <div className="offscript">
                    <p className="offscript__title">Not in the demonstration script</p>
                    <p className="offscript__text">
                      This prototype answers a fixed set of workforce questions so that every answer
                      stays traceable to a source. Improvising here would mean inventing evidence,
                      which is the one thing the product is built not to do. Try one of the
                      suggestions below.
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
              Free text is matched against the script. Anything outside it gets told so, rather than
              answered from nothing.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* --- Response blocks ----------------------------------------------------
   Each block type is a different shape, which is what keeps a response reading
   as a structured answer rather than as a paragraph of chat. */

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'text':
      return <p className="ai-text">{block.text}</p>;

    case 'note':
      return (
        <p className="ai-note">
          <span className="ai-note__mark" aria-hidden="true" />
          {block.text}
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
                      style={{ insetInlineStart: `${g.now}%`, inlineSize: `${gap}%` }}
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
