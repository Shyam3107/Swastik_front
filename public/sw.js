const version = 23
const STATIC_CACHE = "static_cache_v" + version
const DYNAMIC_CACHE = "dynamic-cache_v" + version

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
  "https://use.fontawesome.com/releases/v5.0.7/js/all.js",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css",
  "https://code.jquery.com/jquery-3.2.1.slim.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
  "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache
        .addAll(staticFiles)
        .catch((err) => console.log("Failed to add static Files ", err))
    })
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => {
            return key !== STATIC_CACHE && key != DYNAMIC_CACHE
          })
          .map((key) => {
            return caches.delete(key)
          })
      )
    })
  )
})

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return

  event.respondWith(
    (async () => {
      try {
        // If exist in Static files return it
        const urlPath = new URL(event.request.url)
        if (staticFiles.includes(urlPath.pathname)) {
          return caches.match(event.request.url)
        }

        // fetch from url, store in cache and return it
        const res = await fetch(event.request)
        const cache = await caches.open(DYNAMIC_CACHE)
        cache
          .put(event.request, res.clone())
          .catch((err) => console.log("Failed to add in cache " + err))
        return res
      } catch (error) {
        // if failed to fetch from url, means user is offline
        // return cache if exist else return offline page
        return caches.match(event.request)
      }
    })()
  )
})
