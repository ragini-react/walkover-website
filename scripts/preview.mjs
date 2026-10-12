#!/usr/bin/env node
/**
 * Serves the static export the way GitHub Pages does, with no dependencies:
 * "/about" redirects to "/about/", folders serve index.html, unknown paths get
 * 404.html with a 404 status, and the site is mounted under BASE_PATH when the
 * build used one.
 *
 *   npm run preview                         serves ./out on http://localhost:3000
 *   node scripts/preview.mjs path/to/out    serves any copy of the export
 *   PORT=4000 BASE_PATH=/repo npm run preview
 */
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "out");
const port = Number(process.env.PORT) || 3000;
const trimmed = (process.env.BASE_PATH ?? "").trim().replace(/^\/+|\/+$/g, "");
const basePath = trimmed ? `/${trimmed}` : "";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

async function fileAt(p) {
  try {
    const s = await stat(p);
    return s.isFile() ? p : s.isDirectory() ? "dir" : null;
  } catch {
    return null;
  }
}

function send(res, status, file) {
  res.writeHead(status, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
}

async function notFound(res) {
  const page = path.join(root, "404.html");
  if (await fileAt(page)) return send(res, 404, page);
  res.writeHead(404, { "content-type": "text/plain" }).end("404 Not Found");
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    return notFound(res);
  }

  if (basePath && pathname !== basePath && !pathname.startsWith(`${basePath}/`)) {
    if (pathname === "/") return res.writeHead(302, { location: `${basePath}/` }).end();
    return notFound(res);
  }
  const rel = pathname.slice(basePath.length) || "/";
  const target = path.join(root, rel);
  if (target !== root && !target.startsWith(root + path.sep)) return notFound(res);

  const found = await fileAt(target);
  if (found === "dir") {
    if (!pathname.endsWith("/")) {
      return res.writeHead(301, { location: `${pathname}/${url.search}` }).end();
    }
    const index = path.join(target, "index.html");
    return (await fileAt(index)) ? send(res, 200, index) : notFound(res);
  }
  if (found) return send(res, 200, found);
  const html = `${target.replace(/\/$/, "")}.html`;
  if (await fileAt(html)) return send(res, 200, html);
  return notFound(res);
});

const missing = !(await fileAt(path.join(root, "index.html")));
if (missing) {
  console.error(`No index.html in ${root}. Run \`npm run build\` first.`);
  process.exit(1);
}
server.listen(port, () => {
  console.log(`Serving ${root}\n  → http://localhost:${port}${basePath}/`);
});
