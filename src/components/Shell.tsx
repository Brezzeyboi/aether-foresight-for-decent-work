/* ============================================================================
   Application shell: masthead, navigation, demo-mode indicator, footer.

   Navigation is grouped to make the product's structure legible at a glance,
   because the three competition tasks are three layers of one system:

     ANALYSE   Overview, Skills, Careers, Safety, Learning, Economy  (Task 3)
     ASSISTANT AETHER AI                                             (Task 2)
     RESEARCH  The evidence the whole system rests on                (Task 1)

   The grouping is the argument: individual guidance sits on top of system-level
   data, which sits on top of published research.
   ============================================================================ */

import type { ReactNode } from 'react';
import { CLAIMS } from '../data/claims.ts';
import { SOURCES } from '../data/evidence.ts';
import { ROUTES, routeHref, type Route } from '../router.ts';
import { Icon, type IconName } from './Icon.tsx';
import { Tip } from './Tip.tsx';
import './shell.css';

/* Counted from the registries, never typed in by hand. A readout that claims
   21 sources while the file holds 20 is worse than showing no number at all,
   and the whole point of this indicator is that the figures are checkable.
   `internal` is excluded: it is the marker for our own assumptions, not a
   published source, so counting it would overstate the evidence base. */
const SOURCE_COUNT = Object.keys(SOURCES).filter((id) => id !== 'internal').length;
const CLAIM_COUNT = Object.keys(CLAIMS).length;

interface NavItem {
  route: Route;
  label: string;
  /** Shown in the nav as a one-line description of what the screen answers. */
  question: string;
  /** Decorative. The label is always present, so the icon never carries meaning. */
  icon: IconName;
}

const NAV_GROUPS: { group: string; items: NavItem[] }[] = [
  {
    group: 'Analyse',
    items: [
      { route: 'overview', label: 'Overview', question: 'Where do I stand?', icon: 'target' },
      { route: 'skills', label: 'Skills', question: 'What skills will matter?', icon: 'skills' },
      { route: 'careers', label: 'Careers', question: 'Which roles could fit?', icon: 'careers' },
      { route: 'safety', label: 'Safety', question: 'What are the risks?', icon: 'shield' },
      { route: 'learning', label: 'Learning', question: 'How do I prepare?', icon: 'path' },
      { route: 'economy', label: 'Economy', question: 'What could change?', icon: 'economy' },
    ],
  },
  {
    group: 'Ask',
    items: [
      { route: 'assistant', label: 'AETHER AI', question: 'Guidance for my profile', icon: 'spark' },
    ],
  },
  {
    group: 'Evidence',
    items: [
      {
        route: 'research',
        label: 'Research board',
        question: 'What does the evidence say?',
        icon: 'document',
      },
    ],
  },
];

// Every route must appear exactly once in the nav, or a screen becomes
// unreachable. Checked at module load so a missing route fails loudly in dev
// rather than silently stranding a page.
if (import.meta.env.DEV) {
  const navRoutes = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.route));
  const missing = ROUTES.filter((r) => !navRoutes.includes(r));
  if (missing.length > 0) {
    throw new Error(`Routes missing from navigation: ${missing.join(', ')}`);
  }
}

interface ShellProps {
  route: Route;
  /** Route-transition phase, driving the slide in shell.css. */
  phase?: 'idle' | 'out' | 'in';
  /** Which way the reader is moving through the nav order. */
  dir?: 'forward' | 'back';
  children: ReactNode;
}

export function Shell({ route, phase = 'idle', dir = 'forward', children }: ShellProps) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="masthead">
        <div className="masthead__inner page">
          <a className="wordmark" href={routeHref('overview')} aria-label="AETHER, workforce intelligence, home">
            <span className="wordmark__name">AETHER</span>
            <span className="wordmark__descriptor">Foresight for Decent Work</span>
          </a>

          <nav className="nav" aria-label="Main">
            {NAV_GROUPS.map(({ group, items }) => (
              <div className="nav__group" key={group}>
                <span className="nav__group-label label" aria-hidden="true">
                  {group}
                </span>
                <ul className="nav__list">
                  {items.map((item) => {
                    const current = item.route === route;
                    return (
                      <li key={item.route}>
                        <Tip text={item.question} side="bottom" interactive>
                          <a
                            className="nav__link"
                            href={routeHref(item.route)}
                            data-current={current || undefined}
                            aria-current={current ? 'page' : undefined}
                          >
                            <Icon name={item.icon} size={0.95} />
                            {item.label}
                          </a>
                        </Tip>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* A live readout rather than a warning label. It still discloses that
              the profile is fictional, which the brief requires, but it earns its
              place in the chrome by reporting the real size of the evidence base
              and linking to it, so the numbers can be checked rather than
              taken on trust. Counts come from the registries themselves. */}
          <Tip
            className="status-tip"
            text={`Every figure traces to one of ${SOURCE_COUNT} published sources. Open the reference list.`}
            side="bottom"
            interactive
          >
            <a className="status" href={routeHref('research', 'sources')}>
              <span className="status__pulse" aria-hidden="true" />
              <span className="status__stack">
                <span className="status__line">
                  <span className="status__value">{SOURCE_COUNT}</span> sources
                  <span className="status__sep" aria-hidden="true" />
                  <span className="status__value">{CLAIM_COUNT}</span> claims
                </span>
                <span className="status__detail">Local evidence base &middot; demonstration profile</span>
              </span>
            </a>
          </Tip>
        </div>
      </header>

      {/* data-route drives the per-screen colour in shell.css, so each area has
          its own identity without every component needing an override.
          data-phase and data-dir drive the route slide. */}
      <main id="main" className="main" data-route={route} data-phase={phase} data-dir={dir}>
        {children}
      </main>

      <footer className="colophon">
        <div className="colophon__inner page">
          <div className="colophon__block">
            <p className="label">About this prototype</p>
            <p className="colophon__text">
              AETHER is a concept prototype built for the AI Workforce Lab. The demonstration
              profile is fictional. Every figure drawn from published research carries its source
              and states whether it is measured data, a projection, a scenario, or an assumption
              made for this prototype.
            </p>
          </div>
          <div className="colophon__block">
            <p className="label">On predicting 2045</p>
            <p className="colophon__text">
              No credible source forecasts the labour market of 2045 with confidence, and AETHER
              does not either. Long-horizon material here is framed as scenarios: conditional
              pathways that show what could follow if stated conditions hold.
            </p>
          </div>
          <p className="colophon__foot meta">
            <a href={routeHref('research', 'sources')}>Sources and method</a>
            <span className="colophon__credit">
              Made by{' '}
              <a href="https://maxfortpitampura.com/" target="_blank" rel="noreferrer noopener">
                Maxfortian
              </a>
            </span>
          </p>
        </div>
      </footer>
    </>
  );
}
