import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 8787);

const mimeTypes = {
  ".cmd": "text/plain; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jsonl": "application/x-ndjson; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const requested = decoded === "/" ? "/viewer.html" : decoded;
  const candidate = normalize(join(root, requested));
  if (!candidate.startsWith(resolve(root))) return null;
  return candidate;
}

const server = createServer(async (request, response) => {
  try {
    const path = safePath(request.url || "/");
    if (!path || !existsSync(path)) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const info = await stat(path);
    if (!info.isFile()) {
      response.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
      response.end("This resource cannot be served");
      return;
    }

    response.writeHead(200, {
      "content-type": mimeTypes[extname(path).toLowerCase()] || "application/octet-stream",
      "content-length": info.size,
      "cache-control": "no-store"
    });
    createReadStream(path).pipe(response);
  } catch (error) {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end(error.message);
  }
});

server.listen(port, () => {
  console.log(`openHASP Editor ready: http://localhost:${port}/viewer.html`);
  console.log("Press Ctrl+C to stop the server.");
});
