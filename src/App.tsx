import { useEffect, useRef, useState } from 'react';
import { Shell } from './components/Shell.tsx';
import { ROUTES, useRouteScroll, useRouter, type Route } from './router.ts';
import { useReveal } from './useReveal.ts';
import { Overview } from './routes/Overview.tsx';
import { Skills } from './routes/Skills.tsx';
import { Careers } from './routes/Careers.tsx';
import { Safety } from './routes/Safety.tsx';
import { Learning } from './routes/Learning.tsx';
import { Economy } from './routes/Economy.tsx';
import { Assistant } from './routes/Assistant.tsx';
import { Research } from './routes/Research.tsx';

// Static map rather than dynamic import(): file:// blocks chunk loading, so the
// whole app ships as one bundle. See vite.config.ts.
const SCREENS: Record<Route, () => React.JSX.Element> = {
  overview: Overview,
  skills: Skills,
  careers: Careers,
  safety: Safety,
  learning: Learning,
  economy: Economy,
  assistant: Assistant,
  research: Research,
};

/* Route transitions.

   Navigation has a direction, so the animation has one too: moving further along
   the nav order sends the old screen out to the left and brings the new one in
   from the right, and moving back reverses it. The reader gets a sense of place
   rather than a repaint.

   It runs in two halves, because the outgoing and incoming screens are never
   mounted at once (one bundle, one screen at a time):
     OUT  the current screen slides away and fades
     IN   the new screen mounts and slides in from the opposite side

   The whole thing is skipped under reduced-motion, and skipped when only the
   anchor changed, since an in-page jump is not a change of place. */
const OUT_MS = 260;
const IN_MS = 420;

type Direction = 'forward' | 'back';

const orderOf = (r: Route) => ROUTES.indexOf(r);

export function App() {
  const { route, anchor } = useRouter();

  /* `shown` lags `route` by the length of the out-animation. Keeping them
     separate is what makes an exit animation possible at all: the old screen has
     to stay mounted while it leaves. */
  const [shown, setShown] = useState(route);
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle');
  const [dir, setDir] = useState<Direction>('forward');
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (route === shown) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setShown(route);
      setPhase('idle');
      return;
    }

    setDir(orderOf(route) > orderOf(shown) ? 'forward' : 'back');
    setPhase('out');

    /* Swap the screen at the end of the exit, then let it slide in.

       These timers are deliberately NOT cancelled when `shown` changes. An
       earlier version cleaned them up on every dependency change, which meant
       calling setShown re-ran the effect, the cleanup fired, and it cancelled the
       very timer that resets the phase to idle — leaving the screen pinned in the
       'in' phase forever. Cleanup belongs on unmount only. */
    timers.current.push(
      window.setTimeout(() => {
        setShown(route);
        setPhase('in');
        timers.current.push(window.setTimeout(() => setPhase('idle'), IN_MS));
      }, OUT_MS)
    );
  }, [route, shown]);

  // Only on unmount, so a navigation away mid-slide cannot leave a timer running.
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    []
  );

  /* Scroll and reveal follow the SHOWN screen, not the requested one. Scrolling
     to the top of a screen that has not mounted yet would jump the page while
     the old one was still visibly leaving. */
  useRouteScroll(shown, anchor);
  useReveal(shown);

  const Screen = SCREENS[shown];

  return (
    <Shell route={shown} phase={phase} dir={dir}>
      <Screen />
    </Shell>
  );
}
