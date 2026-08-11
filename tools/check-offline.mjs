// Verifies the production build has no runtime dependency on the network.
// Run after `npm run build`:  node tools/check-offline.mjs
//
// This is the competition-day gate. The presentation machine may have no
// internet, so any remote URL, CDN reference, or dynamic chunk is a failure.

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIST = 'dist';
let failed = false;

const fail = (msg) => {
  failed = true;
  console.log(`  [FAIL] ${msg}`);
};
const pass = (msg) => console.log(`  [PASS] ${msg}`);

if (!existsSync(DIST)) {
  console.error(`\n${DIST}/ not found. Run \`npm run build\` first.\n`);
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const files = walk(DIST);
const textFiles = files.filter((f) => ['.html', '.js', '.css'].includes(extname(f)));

console.log('\nOffline build verification');

// --- 1. No remote resource URLs -------------------------------------------
// Matches http(s):// and protocol-relative //host in anything the browser
// would actually fetch. Allowed: URLs inside strings that are only ever
// rendered as citation link text, so those are checked separately below.
const REMOTE = /(?:https?:)?\/\/(?![/*])[a-z0-9.-]+\.[a-z]{2,}/gi;

/* What actually matters is WHERE a remote URL sits, not which host it names.
   A citation in a bibliography href is a reference for a human to follow later;
   it loads nothing and its failure to resolve offline is expected and correct.
   A URL in a src, an @import, or a CSS url() is a resource the browser fetches
   during render, and offline that leaves a hole in the page.

   The earlier version of this check used an allowlist of research organisations,
   which was the wrong test twice over: it would have passed a stylesheet loaded
   from ilo.org, and it failed the build for legitimately citing nature.com.
   These patterns test the loading position instead. */
const LOADING_POSITIONS = [
  [/\bsrc\s*=\s*["'](https?:)?\/\//gi, 'src attribute'],
  [/\bsrcset\s*=\s*["'][^"']*(https?:)?\/\//gi, 'srcset attribute'],
  [/<link[^>]+href\s*=\s*["'](https?:)?\/\//gi, '<link href>'],
  [/@import\s+(?:url\()?["']?(https?:)?\/\//gi, 'CSS @import'],
  [/url\(\s*["']?(https?:)?\/\/(?!\/)/gi, 'CSS url()'],
  [/<script[^>]+src\s*=\s*["'](https?:)?\/\//gi, '<script src>'],
];

let remoteLoads = 0;
for (const file of textFiles) {
  const text = readFileSync(file, 'utf8');
  for (const [pattern, label] of LOADING_POSITIONS) {
    for (const m of text.matchAll(pattern)) {
      // Data URIs and the SVG namespace are not network loads.
      if (/^(?:data|blob):/i.test(m[0]) || m[0].includes('www.w3.org')) continue;
      fail(`${file}: remote resource in ${label} — ${m[0].slice(0, 70)}`);
      remoteLoads++;
    }
  }
}
if (remoteLoads === 0) pass('no remote resources loaded during render');

/* Citations are reported for visibility, never failed. Their presence is a
   feature of a sourced research publication. */
const citationHosts = new Set();
for (const file of textFiles) {
  for (const m of readFileSync(file, 'utf8').matchAll(REMOTE)) {
    const host = m[0].replace(/^https?:/, '').replace(/^\/\//, '');
    if (host !== 'www.w3.org' && host !== 'react.dev') citationHosts.add(host);
  }
}
console.log(
  `  [note] ${citationHosts.size} remote hosts appear as citation links (not loaded): ` +
    `${[...citationHosts].slice(0, 4).join(', ')}${citationHosts.size > 4 ? ', …' : ''}`
);

// --- 2. No fetch / XHR at runtime -----------------------------------------
// Data must be bundled as modules. fetch() of a local JSON file fails under
// file:// with an opaque CORS error, which is the classic offline break.
const jsFiles = files.filter((f) => extname(f) === '.js');
let networkApi = false;
for (const file of jsFiles) {
  const text = readFileSync(file, 'utf8');
  for (const [pattern, label] of [
    [/\bfetch\s*\(/, 'fetch('],
    [/new\s+XMLHttpRequest/, 'XMLHttpRequest'],
    [/new\s+WebSocket/, 'WebSocket'],
    [/new\s+EventSource/, 'EventSource'],
    [/navigator\.sendBeacon/, 'sendBeacon'],
  ]) {
    if (pattern.test(text)) {
      fail(`${file} contains ${label} - would fail offline or under file://`);
      networkApi = true;
    }
  }
}
if (!networkApi) pass('no fetch / XHR / WebSocket / beacon in bundle');

// --- 3. Assets referenced relatively --------------------------------------
// base:'./' means every asset URL must be relative, or file:// resolves it
// against the filesystem root and 404s.
const html = readFileSync(join(DIST, 'index.html'), 'utf8');
const absoluteRefs = [...html.matchAll(/(?:src|href)="(\/[^"/][^"]*)"/g)].map((m) => m[1]);
if (absoluteRefs.length > 0) {
  fail(`index.html has root-absolute asset paths: ${absoluteRefs.join(', ')}`);
} else {
  pass('all asset paths are relative');
}

// --- 4. No dynamic chunks -------------------------------------------------
// file:// treats each chunk as cross-origin and blocks it, so the build must
// be a single bundle.
if (/import\s*\(/.test(jsFiles.map((f) => readFileSync(f, 'utf8')).join(''))) {
  fail('bundle contains dynamic import() - chunks fail to load under file://');
} else {
  pass('no dynamic import() in bundle');
}

if (jsFiles.length > 1) {
  fail(`${jsFiles.length} JS files emitted; expected 1 (inlineDynamicImports)`);
} else {
  pass('single JS bundle');
}

// --- 5. Fonts present locally --------------------------------------------
const fonts = files.filter((f) => ['.woff2', '.woff', '.ttf'].includes(extname(f)));
if (fonts.length === 0) {
  fail('no font files in dist - fonts would fall back to system faces');
} else {
  pass(`${fonts.length} font files emitted locally`);
}

// --- 6. Every asset the CSS/JS references actually exists ----------------
const emitted = new Set(files.map((f) => f.replace(/\\/g, '/').replace(`${DIST}/`, '')));
let missing = 0;
for (const file of textFiles) {
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(/(?:url\(|["'`])\.?\.?\/?(assets\/[A-Za-z0-9._-]+)/g)) {
    if (!emitted.has(m[1])) {
      fail(`${file} references missing asset ${m[1]}`);
      missing++;
    }
  }
}
if (missing === 0) pass('every referenced asset exists in dist');

console.log(
  failed
    ? '\nFAILED - the build would break without internet access.\n'
    : '\nBuild is self-contained and safe to present offline.\n'
);
process.exit(failed ? 1 : 0);
