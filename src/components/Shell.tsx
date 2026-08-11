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
import { ROUTES, routeHref, type Route } from '../router.ts';
import './shell.css';

interface NavItem {
  route: Route;
  label: string;
  /** Shown in the nav as a one-line description of what the screen answers. */
  question: string;
}

const NAV_GROUPS: { group: string; items: NavItem[] }[] = [
  {
    group: 'Analyse',
    items: [
      { route: 'overview', label: 'Overview', question: 'Where do I stand?' },
      { route: 'skills', label: 'Skills', question: 'What skills will matter?' },
      { route: 'careers', label: 'Careers', question: 'Which roles could fit?' },
      { route: 'safety', label: 'Safety', question: 'What are the risks?' },
      { route: 'learning', label: 'Learning', question: 'How do I prepare?' },
      { route: 'economy', label: 'Economy', question: 'What could change?' },
    ],
  },
  {
    group: 'Ask',
    items: [{ route: 'assistant', label: 'AETHER AI', question: 'Guidance for my profile' }],
  },
  {
    group: 'Evidence',
    items: [{ route: 'research', label: 'Research board', question: 'What does the evidence say?' }],
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
  children: ReactNode;
}

export function Shell({ route, children }: ShellProps) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="masthead">
        <div className="masthead__inner page">
          <a className="wordmark" href={routeHref('overview')} aria-label="AETHER, workforce intelligence, home">
            <span className="wordmark__name">AETHER</span>
            <span className="wordmark__descriptor">Workforce Intelligence</span>
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
                        <a
                          className="nav__link"
                          href={routeHref(item.route)}
                          data-current={current || undefined}
                          aria-current={current ? 'page' : undefined}
                          title={item.question}
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Demo mode is stated plainly rather than hidden. The profile is
              fictional and the product says so, which is part of the honesty
              the brief asks for. */}
          <p className="demo-flag">
            <span className="demo-flag__dot" aria-hidden="true" />
            <span>
              <span className="demo-flag__title">Demo mode</span>
              <span className="demo-flag__detail">Presentation profile, fictional data</span>
            </span>
          </p>
        </div>
      </header>

      {/* data-route drives the per-screen colour in shell.css, so each area has
          its own identity without every component needing an override. */}
      <main id="main" className="main" data-route={route}>
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
          </p>
        </div>
      </footer>
    </>
  );
}
