const SHELL_CACHE = "testwiz-anatomy-shell-v2";
const SHELL_ASSETS = [
  "/",
  "/index.html",
  "/seo.css",
  "/favicon.svg",
  "/models/atlas.json",
  "/models/atlas-female.json",
  "/brand/tizo-app-badge-192.png",
  "/brand/tizo-app-badge-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("testwiz-anatomy-") && key !== SHELL_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(SHELL_CACHE);
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    return (await caches.match(request)) || (await caches.match("/index.html"));
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const refresh = fetch(request)
    .then(async (response) => {
      if (response.ok) {
        const cache = await caches.open(SHELL_CACHE);
        await cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);
  return cached || refresh;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isManifest = /^\/models\/atlas(?:-female)?\.json$/.test(url.pathname);
  // The atlas already stores verified model chunks in IndexedDB. Keeping the
  // large male/female geometry out of the service-worker cache prevents an
  // install from consuming a phone's storage and avoids stale anatomy data.
  // The small edition manifests are cached so a previously downloaded edition
  // can be reconstructed while offline.
  if ((url.pathname.startsWith("/models/") && !isManifest) || url.pathname === "/sw.js") return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  if (
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/brand/") ||
    isManifest ||
    url.pathname === "/seo.css" ||
    url.pathname === "/favicon.svg" ||
    url.pathname === "/manifest.webmanifest"
  ) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
