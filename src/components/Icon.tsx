/* ============================================================================
   Icons.

   Drawn here as inline SVG paths rather than pulled from a library, for one
   hard reason: the production build must run from file:// with no network, so an
   icon font or a CDN sprite is not an option. Inlining also means an icon
   inherits currentColor and the surrounding font size, so it sits on the
   baseline of the text it labels instead of being a fixed-size image.

   Every icon is drawn on a 24x24 grid with a 1.6 stroke and no fill, matching
   the hairline weight of the rest of the interface. They are deliberately plain:
   geometric marks, not illustrations, because the product's visual language is
   drawn rules and measured type.

   Icons here are ALWAYS decorative. Each one sits beside a real text label, so
   they carry aria-hidden and never become the only carrier of meaning. That is
   also what keeps the risk and basis scales legal: those use their own glyphs
   plus a word, and this component is not involved.
   ============================================================================ */

export type IconName =
  | 'trend'
  | 'skills'
  | 'careers'
  | 'shield'
  | 'path'
  | 'economy'
  | 'spark'
  | 'document'
  | 'arrow-right'
  | 'external'
  | 'search'
  | 'check'
  | 'alert'
  | 'target';

/* Path data only. Shared attributes live on the <svg>, so adding an icon means
   adding one line here rather than a new element. */
const PATHS: Record<IconName, string> = {
  // Rising line with a step, for growth and projections.
  trend: 'M3 17l5-5 4 3 6-8M15 7h5v5',
  // Ascending bars, for a skill profile.
  skills: 'M4 20V13M10 20V8M16 20v-9M22 20V4',
  // Branching routes, for career options.
  careers: 'M6 3v6a3 3 0 003 3h9M18 9l3 3-3 3M6 12v9',
  // Shield, for workplace safety.
  shield: 'M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z',
  // Stepped route, for a learning pathway.
  path: 'M4 20h4v-5h4V9h4V4h4',
  // Scales, for economic trade-offs.
  economy: 'M12 4v16M6 8l-3 6h6l-3-6zM18 8l-3 6h6l-3-6zM7 6h10',
  // Four-point star, for the assistant.
  spark: 'M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3z',
  // Page with lines, for the research board.
  document: 'M6 3h8l4 4v14H6V3zM14 3v4h4M9 12h6M9 16h6',
  'arrow-right': 'M4 12h15M13 6l6 6-6 6',
  external: 'M14 4h6v6M20 4l-8 8M18 14v5H5V6h5',
  search: 'M11 4a7 7 0 107 7 7 7 0 00-7-7zM16 16l4 4',
  check: 'M4 12l5 5L20 6',
  alert: 'M12 4l9 16H3l9-16zM12 10v4M12 17h.01',
  target: 'M12 3a9 9 0 109 9 9 9 0 00-9-9zM12 8a4 4 0 104 4 4 4 0 00-4-4zM12 12h.01',
};

interface IconProps {
  name: IconName;
  /** Multiplier on the current font size, so an icon scales with its label. */
  size?: number;
  className?: string;
}

export function Icon({ name, size = 1, className }: IconProps) {
  return (
    <svg
      className={`icon${className ? ` ${className}` : ''}`}
      viewBox="0 0 24 24"
      width={`${size}em`}
      height={`${size}em`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
