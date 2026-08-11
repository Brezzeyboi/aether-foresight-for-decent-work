import { Shell } from './components/Shell.tsx';
import { useRouteScroll, useRouter, type Route } from './router.ts';
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

export function App() {
  const { route, anchor } = useRouter();
  useRouteScroll(route, anchor);
  // Keyed on the route: a route change replaces the DOM, so the previous
  // observer would be watching elements that no longer exist.
  useReveal(route);

  const Screen = SCREENS[route];

  return (
    <Shell route={route}>
      <Screen />
    </Shell>
  );
}
