// ═══════════════════════════════════════════════════
// SERVICE WORKER — Offline support & caching
// ═══════════════════════════════════════════════════
const CACHE_NAME = 'wh40k-tracker-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/data.js',
  '/js/supabase.js',
  '/js/app.js',
  '/js/mfm.js',
  '/js/ui.js',
  '/manifest.json',
];

// Install: cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: clear old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache, fall back to network
// For Supabase API calls and GitHub raw content — network first, cache as fallback
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Always go network-first for API/data calls
  if (url.hostname.includes('supabase.co') || url.hostname.includes('githubusercontent.com')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache successful GET responses for offline fallback
          if (event.request.method === 'GET' && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // For everything else: cache first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
