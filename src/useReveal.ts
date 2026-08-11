/* ============================================================================
   Reveal-on-arrival.

   IntersectionObserver, never a scroll listener: a scroll handler runs on every
   frame of every scroll for the life of the page, and this needs to fire once
   per element.

   Elements opt in with `data-reveal` or `data-reveal-stagger` in the markup, and
   this adds `data-shown` when they arrive. All the actual motion lives in
   styles/motion.css, so a reader with reduced-motion enabled sees fully-formed
   content and this hook does nothing visible.
   ============================================================================ */

import { useEffect } from 'react';

/**
 * Watches for reveal targets and marks them shown as they enter the viewport.
 *
 * Re-runs on `key` (the route) because a route change swaps the whole document
 * body, and the previous observer is watching elements that no longer exist.
 */
export function useReveal(key: string): void {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      '[data-reveal]:not([data-shown]), [data-reveal-stagger]:not([data-shown])'
    );
    if (targets.length === 0) return;

    // With motion suppressed there is nothing to reveal, so mark everything
    // shown immediately and skip the observer entirely.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.setAttribute('data-shown', ''));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-shown', '');
          // One-shot: a block that has arrived should not re-animate when the
          // reader scrolls back up past it.
          observer.unobserve(entry.target);
        }
      },
      {
        // Fire slightly before the element is fully in view, so the motion is
        // finishing as the reader reaches it rather than starting.
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.08,
      }
    );

    targets.forEach((el) => observer.observe(el));

    /* Anything already above the fold on load is revealed on the next frame
       rather than waiting for a scroll that may never happen. Without this, a
       screen short enough to need no scrolling would stay blank. */
    const raf = requestAnimationFrame(() => {
      targets.forEach((el) => {
        const box = el.getBoundingClientRect();
        if (box.top < window.innerHeight) {
          el.setAttribute('data-shown', '');
          observer.unobserve(el);
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [key]);
}
