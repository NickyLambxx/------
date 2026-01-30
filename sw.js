// Service Worker — Версия 2 (Fix Paths)
const CACHE_NAME = 'prepmate-v2';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './logo.png',
  './favicon.ico',
  './chapters/chapter1.html',
  './chapters/chapter2.html',
  './chapters/chapter3.html',
  './chapters/chapter4.html',
  './chapters/chapter5.html',
  './chapters/chapter6.html',
  './chapters/chapter7.html',
  './chapters/chapter8.html',
  './chapters/chapter9.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Возвращаем из кэша, если есть, иначе делаем запрос в сеть
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});