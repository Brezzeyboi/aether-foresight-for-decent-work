/* ============================================================================
   Hash router.

   Hash-based, not history-based, because the production build must run from
   file:// and from a bare static server with no rewrite rules. History routing
   404s in both cases; a hash never leaves the document.

   ponytail: 8 flat routes, no nested layouts or data loading. Swap for
   react-router if nested routes or per-route code splitting ever appear.
   ============================================================================ */

import { useCallback, useEffect, useState } from 'react';

export const ROUTES = [
  'overview',
  'skills',
  'careers',
  'safety',
  'learning',
  'economy',
  'assistant',
  'research',
] as const;

export type Route = (typeof ROUTES)[number];

export const DEFAULT_ROUTE: Route = 'overview';

function isRoute(value: string): value is Route {
  return (ROUTES as readonly string[]).includes(value);
}

/**
 * Reads the current route and any anchor from the hash.
 * Format: `#/route` or `#/route#section-id` for deep links within long routes.
 */function parseHash(hash: string): { route: Route; anchor: string | null } {
  const raw = hash.replace(/^#\/?/, '');
  const [routePart, anchorPart] = raw.split('#');
  const route = isRoute(routePart) ? routePart : DEFAULT_ROUTE;
  return { route, anchor: anchorPart || null };
}

export function routeHref(route: Route, anchor?: string): string {
  return anchor ? `#/${route}#${anchor}` : `#/${route}`;
}

export function useRouter() {
  const [{ route, anchor }, setState] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setState(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    // Normalise a bare or unrecognised hash so the address bar always reflects
    // a real route, including on first load from file://.
    if (!window.location.hash.startsWith('#/')) {
      window.location.replace(routeHref(DEFAULT_ROUTE));
    }
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((next: Route, nextAnchor?: string) => {
    window.location.hash = routeHref(next, nextAnchor);
  }, []);

  return { route, anchor, navigate };
}

/**
 * Scrolls to top on route change, or to the anchor when one is present.
 * Runs after paint so the target element exists.
 */
export function useRouteScroll(route: Route, anchor: string | null) {
  useEffect(() => {
    if (anchor) {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [route, anchor]);
}
