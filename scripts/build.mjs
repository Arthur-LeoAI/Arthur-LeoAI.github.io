import { spawnSync } from 'node:child_process';
import {
  mkdirSync,
  copyFileSync,
  cpSync,
  existsSync,
  writeFileSync,
  rmSync,
} from 'node:fs';
import { resolve } from 'node:path';
const edition = process.argv[2] || 'story';
if (!['story', 'archive'].includes(edition))
  throw new Error('Use story or archive');
const result = spawnSync(
  process.execPath,
  ['node_modules/vinext/dist/cli.js', 'build'],
  { stdio: 'inherit', env: { ...process.env, PORTFOLIO_EDITION: edition } },
);
if (result.status !== 0) process.exit(result.status || 1);
// vinext beta exports flat case files; directory entries make native static-host links portable.
for (const id of ['mcda', 'drone', 'motai', 'connoisseur']) {
  const target = `dist/client/work/${id}`;
  mkdirSync(target, { recursive: true });
  copyFileSync(`dist/client/work/${id}.html`, `${target}/index.html`);
}
writeFileSync('dist/client/.nojekyll', '');
const target = resolve(`outputs/${edition}`);
if (
  !target.startsWith(resolve('outputs') + '/') &&
  !target.startsWith(resolve('outputs') + '\\')
)
  throw new Error('Invalid output path');
if (existsSync(target)) rmSync(target, { recursive: true });
mkdirSync(target, { recursive: true });
cpSync('dist/client', target, { recursive: true });
console.log(`Ready: outputs/${edition}`);
