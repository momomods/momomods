/* eslint-disable */
var cacheName = 'modsplus-1';
var filesToCache = [
  '/',
  '/timetable',
  '/module',
  '/group',
  '/material.js',
  '/material.css',
  '/assets/main.js',
  '/graphql',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  if (e.request.url.indexOf('main.js') > -1 ) {
    e.respondWith(caches.match('/assets/main.js').then(function(response) {
      return response || fetch(e.request);
    }))
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
/* eslint-enable */
