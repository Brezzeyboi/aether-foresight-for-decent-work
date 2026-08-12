/* ============================================================================
   The AETHER mark.

   A logo should say what the product does, the way a play triangle says video.
   This one is a staircase climbing left to right, and it carries the report's
   central argument in one shape:

     the solid steps     the climb where the evidence is measured
     the dashed steps    the same climb past the point published work reaches
                         — drawn, because preparing continues, but not asserted

   So the mark reads as a rise that keeps going after the ground stops being
   certain. One idea, one shape, no vignette of separate parts.

   It is drawn for the small end. An earlier version set a horizon, a dotted
   continuation, a rising step and a filled dot at a 2.4/32 stroke: four elements
   that were elegant beside the wordmark and gone by the time they reached a 16px
   browser tab. A staircase survives that reduction, which is why it is the whole
   mark now. The tab icon is the same staircase, filled, on a mint tile so the
   shape itself is what the eye catches.
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
      stroke="currentColor"
      strokeWidth="3.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {/* The measured climb: solid, and it stops where the sources stop. */}
      <path d="M5.5 26.5 H12.5 V19.5 H19.5 V12.5" />

      {/* Past that, the same climb as inference rather than fact. Long dashes:
          short ones close into a solid line the moment the mark is downscaled. */}
      <path d="M19.5 12.5 H26.5 V5.5" strokeDasharray="3.6 3.4" strokeLinecap="butt" />
    </svg>
  );
}
