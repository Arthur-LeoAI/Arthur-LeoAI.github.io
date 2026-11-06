// Static build: copies site/ into outputs/<edition>/.
// Cloudflare Pages runs `node scripts/build.mjs story` and serves outputs/story,
// so the command and output folder match the settings used by the old version.
import { cpSync, rmSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const edition = process.argv[2] || 'story';
const src = path.join(root, 'site');
const out = path.join(root, 'outputs', edition);

if (!existsSync(path.join(src, 'index.html'))) {
  console.error('site/index.html is missing');
  process.exit(1);
}
rmSync(out, { recursive: true, force: true });
cpSync(src, out, { recursive: true });
console.log(`Copied site/ to outputs/${edition}/`);
