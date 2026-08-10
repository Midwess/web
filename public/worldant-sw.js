self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) =>
  event.waitUntil(self.clients.claim()),
);

const roots = ["/worldant-packages/", "/worldant-modules/"];
const isolationHeaders = {
  "Cross-Origin-Embedder-Policy": "require-corp",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "X-Content-Type-Options": "nosniff",
};

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (
    url.origin !== self.location.origin ||
    !roots.some((root) => url.pathname.startsWith(root))
  ) {
    return;
  }
  event.respondWith(serveFromOpfs(url.pathname));
});

function mediaType(pathname) {
  if (pathname.endsWith(".wasm")) return "application/wasm";
  if (pathname.endsWith(".json") || pathname.endsWith(".map"))
    return "application/json";
  return "text/javascript";
}

async function serveFromOpfs(pathname) {
  try {
    const parts = pathname
      .slice(1)
      .split("/")
      .filter(Boolean)
      .map(decodeURIComponent);
    let directory = await navigator.storage.getDirectory();
    for (let index = 0; index < parts.length - 1; index += 1) {
      directory = await directory.getDirectoryHandle(parts[index]);
    }
    const handle = await directory.getFileHandle(parts[parts.length - 1]);
    const file = await handle.getFile();
    return new Response(await file.arrayBuffer(), {
      headers: {
        ...isolationHeaders,
        "Content-Type": mediaType(pathname),
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return new Response(`/* Worldant OPFS miss: ${String(error)} */`, {
      status: 404,
      headers: {
        ...isolationHeaders,
        "Content-Type": mediaType(pathname),
        "Cache-Control": "no-store",
      },
    });
  }
}
