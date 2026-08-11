/* Reports user-facing strings that have grown too long to skim.
   Run: node tools/prose-length.mjs [maxChars]

   Long strings are the failure mode this project keeps returning to: a sentence
   that reads fine in a source file becomes a wall in a card. Block comments are
   stripped first, so internal notes are never counted as copy. */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const MAX = Number(process.argv[2] ?? 160);
const ROOT = new URL('../src/', import.meta.url).pathname.replace(/^\//, '');

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.tsx?$/.test(entry)) files.push(full);
  }
})(ROOT);

const found = [];
for (const file of files) {
  let src = readFileSync(file, 'utf8');
  src = src.replace(/\/\*[\s\S]*?\*\//g, '');

  // Single-quoted strings, template literals, and JSX text runs.
  const patterns = [/'((?:[^'\\\n]|\\.)+)'/g, /`((?:[^`\\]|\\.)+)`/g];
  for (const re of patterns) {
    for (const m of src.matchAll(re)) {
      const text = m[1];
      if (text.length < MAX) continue;
      if (text.includes('http')) continue; // citation URLs are not prose
      if (!/\s/.test(text)) continue; // identifiers, class lists
      found.push({ len: text.length, file: file.replace(ROOT, ''), text });
    }
  }
}

found.sort((a, b) => b.len - a.len);

console.log(`\n${found.length} user-facing strings at or over ${MAX} characters\n`);
for (const f of found.slice(0, 20)) {
  console.log(`  ${String(f.len).padStart(4)}  ${f.file}`);
  console.log(`        ${f.text.slice(0, 150)}${f.text.length > 150 ? '...' : ''}`);
}
if (found.length > 20) console.log(`\n  ...and ${found.length - 20} more\n`);
