/* Production-build cleanliness gate.
   Run: node tools/check-build-clean.mjs

   The shipped bundle is read by other people. Source comments explain decisions
   to whoever maintains the code, and none of that belongs in a build handed to
   an audience. Minification already drops them, but "already does" is not a
   guarantee, so this asserts it. */

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/assets/', import.meta.url);

let failed = false;
const report = (ok, label, detail) => {
  if (!ok) failed = true;
  console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${label.padEnd(38)} ${detail}`);
};

let files;
try {
  files = readdirSync(DIST);
} catch {
  console.error('\nNo dist/assets. Run `npm run build` first.\n');
  process.exit(1);
}

const bundles = files.filter((f) => f.endsWith('.js') || f.endsWith('.css'));
const read = (f) => readFileSync(join(DIST.pathname.replace(/^\//, ''), f), 'utf8');

console.log('\nProduction bundle carries no source commentary');

for (const file of bundles) {
  const src = read(file);

  /* Block comments. A minified bundle should have none: the only ones that
     normally survive are /*! legal banners, which this build has no need for. */
  const blocks = src.match(/\/\*[\s\S]*?\*\//g) ?? [];
  report(blocks.length === 0, `${file}: no block comments`, `${blocks.length} found`);

  /* Line comments are checked only in CSS, where they are invalid anyway. In JS
     a bare `//` appears legitimately inside string literals (every source URL in
     the citation registry contains one), so counting them there would be noise. */
  if (file.endsWith('.css')) {
    const lines = src.match(/(^|[^:])\/\/[^\n]*/g) ?? [];
    report(lines.length === 0, `${file}: no line comments`, `${lines.length} found`);
  }
}

/* Words that would only ever appear in a note to ourselves. If one of these
   reaches the bundle it means internal commentary leaked into shipped strings,
   which minification cannot catch because it is real content. */
console.log('\nNo internal notes in shipped strings');
const FORBIDDEN = [
  'TODO',
  'FIXME',
  'HACK',
  'XXX',
  'ponytail:',
  'wtf',
  'my son',
  'the judges',
  'competition machine',
  'school project',
  'lorem ipsum',
  /* Not the bare word "placeholder": that is a legitimate HTML attribute and a
     real CSS pseudo-element, both of which this build uses. What must never ship
     is stub CONTENT, so the phrases are matched instead. */
  'placeholder text',
  'placeholder copy',
  'TBD',
  'coming soon',
];

for (const term of FORBIDDEN) {
  const hits = bundles.flatMap((f) => {
    const src = read(f);
    const re = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    return (src.match(re) ?? []).map(() => f);
  });
  report(hits.length === 0, `"${term}"`, hits.length ? `${hits.length} in ${[...new Set(hits)].join(', ')}` : 'absent');
}

console.log(
  failed
    ? '\nFAILED - the build is leaking internal commentary.\n'
    : '\nBuild is clean.\n'
);
process.exit(failed ? 1 : 0);
