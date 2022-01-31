const staticTestzentrum = "testzentrum-v-1";
const assets = [
  "/",
  "/index.html",
  "/data.html",
  "/history.html",
  "/css/style.css",
  "/js/app.js",
  "/js/data.js",
  "/js/his.js"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticTestzentrum).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
