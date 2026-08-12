/* ============================================================================
   SDG 8 badge.

   Drawn here rather than loaded, for the same reason as everything else in this
   product: the build must run with no network. The UN publishes an official
   badge asset, but embedding a remote image would break offline delivery, and
   redistributing the UN emblem has its own conditions. This is a typographic
   badge in the official colour instead — recognisable, and ours to ship.

   The colour is the point. Each Goal has an assigned UN colour, and Goal 8's is
   #A21942, a dark red-maroon. It is NOT blue: blue belongs to Goal 6 (clean
   water) and Goal 14 (life below water). Getting this right is the difference
   between a badge that reads as the real thing and one that reads as decoration.

   Because #A21942 is dark, white text sits on it rather than the page ink, and
   the badge carries its own light-on-dark scope.
   ============================================================================ */

import { routeHref } from '../router.ts';
import './sdg-badge.css';

interface SdgBadgeProps {
  /** `compact` is the chrome version: number and short name only. */
  variant?: 'full' | 'compact';
  /** Links into the alignment section of the research board. */
  href?: string;
  className?: string;
}

export function SdgBadge({ variant = 'full', href, className }: SdgBadgeProps) {
  const target = href ?? routeHref('research', 'sdg-title');

  return (
    <a
      className={`sdg-badge sdg-badge--${variant}${className ? ` ${className}` : ''}`}
      href={target}
    >
      <span className="sdg-badge__num" aria-hidden="true">
        8
      </span>
      <span className="sdg-badge__text">
        <span className="sdg-badge__eyebrow">Sustainable Development Goal</span>
        <span className="sdg-badge__name">Decent work and economic growth</span>
      </span>
      {/* The visible text is split for layout, so the accessible name is stated
          once, in full, here. */}
      <span className="sr-only">
        This project is aligned with United Nations Sustainable Development Goal 8, decent work and
        economic growth. Read the alignment.
      </span>
    </a>
  );
}
