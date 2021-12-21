const version = 7;
const STATIC_CACHE = "static_cache_v" + version;
const DYNAMIC_CACHE = "dynamic-cache";

const staticFiles = [
  "/",
  "/index.html",
  "/images/Swastik Logo.png",
  "/images/logo/192.png",
  "/manifest.json",
  "/static/js/0.chunk.js",
  "/static/js/main.chunk.js",
  "/static/js/bundle.js",
  "/static/js/vendors~main.chunk.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(staticFiles);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => {
            return key !== STATIC_CACHE && key != DYNAMIC_CACHE;
          })
          .map((key) => {
            return caches.delete(key);
          })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) {
        return res;
      }

      return fetch(event.request).then((response) => {
        if (
          !response ||
          response.status % 100 !== 2 ||
          response.type !== "basic"
        ) {
          return response;
        }

        const responseClone = response.clone();
        caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(event.request, responseClone).catch((err) => {});
        });
        return response;
      });
    })
  );
});
