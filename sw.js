/* Service worker mínimo: hace la app instalable y guarda la página de arranque.
   No toca el Centro de Herramientas (vive en Google y siempre se carga en vivo). */
const CACHE = 'herramientas-prolub-v2';
const ARCHIVOS = ['./', './index.html', './config.js', './manifest.webmanifest',
                  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Solo archivos propios: primero la red (para tomar cambios), y si no hay conexión, la copia guardada.
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(r)
      .then((res) => { const copia = res.clone(); caches.open(CACHE).then((c) => c.put(r, copia)); return res; })
      .catch(() => caches.match(r, { ignoreSearch: true }).then((m) => m || caches.match('./index.html')))
  );
});
