const SW_URL = "/sw.js";
const SHARED_CACHE = "seeqr-shared";
const SHARED_KEY = "/__shared-image";

/** Register the service worker that powers offline use + the PWA share target. */
export function registerServiceWorker() {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register(SW_URL).catch(() => {
    // registration is best-effort; the app works without it
  });
}

/**
 * When the OS shares an image to Seeqr, the service worker stashes it in a cache
 * and redirects to /?shared=1. Pull it back out here.
 */
export async function consumeSharedImage(): Promise<File | null> {
  if (typeof window === "undefined" || !("caches" in window)) return null;
  try {
    const cache = await caches.open(SHARED_CACHE);
    const response = await cache.match(SHARED_KEY);
    if (!response) return null;
    const blob = await response.blob();
    await cache.delete(SHARED_KEY);
    const type = blob.type || "image/png";
    const ext = type.split("/")[1] ?? "png";
    return new File([blob], `shared.${ext}`, { type });
  } catch {
    return null;
  }
}

export function hasSharedImageFlag() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).has("shared");
}

export function clearSharedImageFlag() {
  if (typeof window === "undefined") return;
  window.history.replaceState({}, "", window.location.pathname);
}
