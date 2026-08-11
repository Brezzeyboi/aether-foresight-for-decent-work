import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Fonts are imported through the bundler so they are emitted as local files and
// hashed. No remote font requests, which is what keeps the build offline-safe.
import '@fontsource-variable/geist/index.css';
import '@fontsource-variable/geist-mono/index.css';
import '@fontsource-variable/newsreader/index.css';

import './styles/tokens.css';
import './styles/base.css';
import './styles/motion.css';
import './styles/print.css';
import { App } from './App.tsx';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found in index.html');

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
