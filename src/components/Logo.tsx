/* ============================================================================
   The AETHER mark.

   A logo should say what the product does, the way a play triangle says video.
   This one is built from the report's central argument, which is about how far
   ahead anyone can honestly see:

     a solid horizon line     what is measured, and can be stated plainly
     the line breaks          the point where published evidence stops
     a dotted continuation    scenario space, drawn but not asserted
     a rising step over it    the work of preparing, which carries on anyway
     one filled dot           the present moment, sitting on the solid part

   So the mark reads as a horizon with a step rising across it: sight ends,
   effort does not. That is the whole thesis in nine strokes.

   Drawn as inline SVG on a 32x32 grid, currentColor throughout, no external
   file. The favicon is the same geometry re-exported at 32px, so the tab icon
   and the wordmark can never drift apart.
   ============================================================================ */

interface LogoProps {
  /** Height in em, so the mark scales with the type it sits beside. */
  size?: number;
  className?: string;
  /** Set when the mark stands alone and needs its own accessible name. */
  title?: string;
}

export function Logo({ size = 1, className, title }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      width={`${size}em`}
      height={`${size}em`}
      fill="none"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {/* The measured horizon: solid, and it stops. */}
      <path
        d="M2 21h11"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Scenario space: the same line, drawn as inference rather than fact. */}
      <path
        d="M19 21h11"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="1.5 3.5"
        opacity="0.55"
      />

      {/* The step rising across the break: work continues past the evidence. */}
      <path
        d="M11 25.5 L11 16 L21 16 L21 6.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Now. On the solid half, because the present is the one measured point. */}
      <circle cx="6.5" cy="21" r="2.6" fill="currentColor" />
    </svg>
  );
}
