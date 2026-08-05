/* Seeqr service worker — offline shell + PWA share target. */
const SHARED_CACHE = "seeqr-shared";
const SHARED_KEY = "/__shared-image";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (event.request.method === "POST" && url.pathname === "/share-target") {
    event.respondWith(
      (async () => {
        try {
          const formData = await event.request.formData();
          const file = formData.get("image") || formData.get("file");
          if (file) {
            const cache = await caches.open(SHARED_CACHE);
            await cache.put(
              SHARED_KEY,
              new Response(file, {
                headers: { "content-type": file.type || "image/png" },
              }),
            );
          }
        } catch {
          // fall through to the redirect; the app shows the empty upload zone
        }
        return Response.redirect("/?shared=1", 303);
      })(),
    );
  }
});
