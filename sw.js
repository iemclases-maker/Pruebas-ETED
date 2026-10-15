// Service worker - Pruebas y Ensayos ETED
// Al publicar una version nueva de index.html, cambia CACHE (p. ej. v49) para
// forzar la renovacion en los celulares.
var CACHE = 'eted-app-v50';

var PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // Cada recurso por separado: si uno falla, los demas quedan en cache igual
      return Promise.all(PRECACHE.map(function (u) {
        return c.add(u).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) {
        return k.indexOf('eted-app-') === 0 && k !== CACHE;
      }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET') return;
  var u = new URL(r.url);

  // Nunca interceptar la sincronizacion con Apps Script / Drive
  if (u.hostname.indexOf('script.google') >= 0 ||
      u.hostname.indexOf('googleusercontent') >= 0) return;

  // La pagina: primero red (para recibir actualizaciones), cache si no hay senal
  if (r.mode === 'navigate') {
    e.respondWith(
      fetch(r).then(function (resp) {
        if (resp && resp.ok) {
          var copy = resp.clone();
          caches.open(CACHE).then(function (c) { c.put('./index.html', copy); });
        }
        return resp;
      }).catch(function () {
        return caches.match('./index.html').then(function (hit) {
          return hit || caches.match('./');
        });
      })
    );
    return;
  }

  // Librerias, fuentes e iconos: cache primero, red como respaldo
  e.respondWith(
    caches.match(r).then(function (hit) {
      if (hit) return hit;
      return fetch(r).then(function (resp) {
        if (resp && (resp.ok || resp.type === 'opaque')) {
          var copy = resp.clone();
          caches.open(CACHE).then(function (c) { c.put(r, copy); });
        }
        return resp;
      });
    })
  );
});
