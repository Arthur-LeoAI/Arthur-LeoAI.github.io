import http from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
const root = path.resolve(process.argv[2] || 'outputs/story');
const port = Number(process.argv[3] || 4173);
http
  .createServer((req, res) => {
    let p = path.resolve(
      root,
      '.' + decodeURIComponent(new URL(req.url, 'http://local').pathname),
    );
    if (p !== root && !p.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    if (existsSync(p) && statSync(p).isDirectory())
      p = path.join(p, 'index.html');
    let status = 200;
    if (!existsSync(p)) {
      p = path.join(root, '404.html');
      status = 404;
    }
    const types = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.svg': 'image/svg+xml',
      '.jpg': 'image/jpeg',
      '.webp': 'image/webp',
      '.png': 'image/png',
      '.mp4': 'video/mp4',
      '.pdf': 'application/pdf',
      '.rsc': 'text/x-component',
    };
    res.writeHead(status, {
      'Content-Type': types[path.extname(p)] || 'application/octet-stream',
    });
    res.end(readFileSync(p));
  })
  .listen(port, '127.0.0.1', () => console.log(`http://localhost:${port}`));
