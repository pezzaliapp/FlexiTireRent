// service-worker.js
const CACHE_NAME = "flexitirerent-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/icon/FlexiTireRent-192.png",
  "/icon/FlexiTireRent-512.png"
];

// Installazione Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("flexitirerent-cache-v1").then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Recupero dalla cache (offline support)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
