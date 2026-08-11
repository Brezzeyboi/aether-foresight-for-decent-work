/* ============================================================================
   Tooltip.

   Replaces the native `title` attribute, which cannot be styled, waits about a
   second before appearing, never appears on keyboard focus, and is unreadable on
   touch. The basis chips and inline citations are the product's whole evidence
   apparatus, so the thing that explains them should not be the browser's
   afterthought.

   Behaviour:
     hover and focus both open it, so it is reachable without a mouse
     Escape closes it
     it flips to the other side when it would leave the viewport
     the trigger keeps its own semantics; this only wraps it

   The content is also rendered for screen readers via aria-describedby, so the
   explanation is announced rather than merely drawn.
   ============================================================================ */

import { useId, useRef, useState, type ReactNode } from 'react';
import './tip.css';

interface TipProps {
  /** The explanation. Kept short: this is a tooltip, not a panel. */
  text: string;
  /** Preferred side. Flips automatically when there is no room. */
  side?: 'top' | 'bottom';
  /**
   * Set when the child is already focusable (a link or a button). The wrapper
   * then does NOT add its own tab stop, which would otherwise put two stops on
   * one control and make the nav take twice as many presses to cross.
   */
  interactive?: boolean;
  children: ReactNode;
  className?: string;
}

/** Panel width cap, matching the max-width in tip.css. */
const PANEL_MAX = 320;
/** Keep this much clear of the viewport edge. */
const EDGE = 8;

export function Tip({ text, side = 'top', interactive = false, children, className }: TipProps) {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [shift, setShift] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const id = useId();

  /* Decide the side and the horizontal nudge at open time by measuring the
     trigger against the viewport. Doing it here rather than on every scroll keeps
     this to one measurement per open, and a tooltip does not survive a scroll
     long enough to need more. */
  const show = () => {
    const el = ref.current;
    if (el) {
      const r = el.getBoundingClientRect();
      const NEEDED = 76;
      setFlipped(side === 'top' ? r.top < NEEDED : window.innerHeight - r.bottom < NEEDED);

      /* The panel is centred on the trigger, so a trigger near either edge would
         hang off the screen. Measure the overhang and slide the panel back by
         exactly that much: it stays as close to centred as the viewport allows,
         and never clips. */
      const centre = r.left + r.width / 2;
      const half = Math.min(PANEL_MAX, window.innerWidth - EDGE * 2) / 2;
      const overRight = centre + half - (window.innerWidth - EDGE);
      const overLeft = EDGE - (centre - half);
      setShift(overRight > 0 ? -overRight : overLeft > 0 ? overLeft : 0);
    }
    setOpen(true);
  };

  const resolved = flipped ? (side === 'top' ? 'bottom' : 'top') : side;

  return (
    <span
      ref={ref}
      className={`tip${className ? ` ${className}` : ''}`}
      onMouseEnter={show}
      onMouseLeave={() => setOpen(false)}
      onFocus={show}
      onBlur={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false);
      }}
    >
      {/* tabIndex makes the explanation reachable by keyboard when the trigger is
          not itself a control, which is the case for every basis chip and inline
          citation. Omitted for interactive children, which bring their own. */}
      <span className="tip__trigger" tabIndex={interactive ? undefined : 0} aria-describedby={id}>
        {children}
      </span>

      {/* Always in the DOM so aria-describedby resolves; visibility is CSS.
          --tip-shift is the measured nudge that keeps it inside the viewport. */}
      <span
        className="tip__panel"
        id={id}
        role="tooltip"
        data-open={open || undefined}
        data-side={resolved}
        style={{ '--tip-shift': `${shift}px` } as React.CSSProperties}
      >
        {text}
      </span>
    </span>
  );
}
