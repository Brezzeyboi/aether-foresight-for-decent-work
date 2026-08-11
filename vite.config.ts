import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Offline-first build config. Three things matter for competition-day reliability:
//   base './'        - relative asset URLs, so dist/ runs from file:// or any subdirectory
//   inlineLimit 0    - never inline assets as base64; keeps fonts/images as real local files
//   no manualChunks  - single bundle, no dynamic import() (file:// blocks module preloading)
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    target: 'es2020',
    // The preload polyfill calls fetch() on chunk hrefs. With a single bundle
    // there is nothing to preload, and a stray fetch() under file:// is exactly
    // the failure mode this build avoids. Off.
    modulePreload: false,
    rollupOptions: {
      output: {
        // One JS bundle, one CSS bundle. Dynamic imports are avoided project-wide
        // because file:// treats each chunk as a cross-origin request and blocks it.
        inlineDynamicImports: true,
      },
    },
  },
});
