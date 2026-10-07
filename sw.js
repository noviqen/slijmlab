// Gegenereerd door tools/maak_sw.py — niet met de hand aanpassen.
const CACHE = "slijmlab-4a2099969f";
const BESTANDEN = ['./', 'index.html', 'manifest.webmanifest', 'fonts/baloo2-latin.woff2', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'logo.svg?v=1', 'style.css?v=7', 'data.js?v=10', 'app.js?v=7', 'audio/beertjes-0.mp3?v=1', 'audio/beertjes-1.mp3?v=1', 'audio/beertjes-2.mp3?v=1', 'audio/beertjes-3.mp3?v=1', 'audio/beertjes-4.mp3?v=1', 'audio/beertjes-5.mp3?v=1', 'audio/beertjes-6.mp3?v=1', 'audio/chia-0.mp3?v=1', 'audio/chia-1.mp3?v=1', 'audio/chia-2.mp3?v=1', 'audio/chia-3.mp3?v=1', 'audio/chia-4.mp3?v=1', 'audio/chia-5.mp3?v=1', 'audio/fluffeetbaar-0.mp3?v=1', 'audio/fluffeetbaar-1.mp3?v=1', 'audio/fluffeetbaar-2.mp3?v=1', 'audio/fluffeetbaar-3.mp3?v=1', 'audio/fluffeetbaar-4.mp3?v=1', 'audio/fluffy-0.mp3?v=1', 'audio/fluffy-1.mp3?v=1', 'audio/fluffy-2.mp3?v=1', 'audio/fluffy-3.mp3?v=1', 'audio/fluffy-4.mp3?v=1', 'audio/fluffy-5.mp3?v=1', 'audio/fluffy-6.mp3?v=1', 'audio/glitter-0.mp3?v=1', 'audio/glitter-1.mp3?v=1', 'audio/glitter-2.mp3?v=1', 'audio/glitter-3.mp3?v=1', 'audio/glitter-4.mp3?v=1', 'audio/glow-0.mp3?v=1', 'audio/glow-1.mp3?v=1', 'audio/glow-2.mp3?v=1', 'audio/glow-3.mp3?v=1', 'audio/glow-4.mp3?v=1', 'audio/glow-5.mp3?v=1', 'audio/klaar.mp3?v=1', 'audio/klassiek-0.mp3?v=1', 'audio/klassiek-1.mp3?v=1', 'audio/klassiek-2.mp3?v=1', 'audio/klassiek-3.mp3?v=1', 'audio/klassiek-4.mp3?v=1', 'audio/klassiek-5.mp3?v=1', 'audio/oobleck-0.mp3?v=1', 'audio/oobleck-1.mp3?v=1', 'audio/oobleck-2.mp3?v=1', 'audio/oobleck-3.mp3?v=1', 'audio/oobleck-4.mp3?v=1', 'audio/spekjes-0.mp3?v=1', 'audio/spekjes-1.mp3?v=1', 'audio/spekjes-2.mp3?v=1', 'audio/spekjes-3.mp3?v=1', 'audio/spekjes-4.mp3?v=1', 'audio/tijd-om.mp3?v=1'];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(BESTANDEN)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k.startsWith("slijmlab-") && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  if (req.mode === "navigate") {
    // pagina: eerst internet (nieuwste versie), anders uit de cache
    e.respondWith(fetch(req).catch(() => caches.match("index.html")));
    return;
  }
  // bestanden met ?v= veranderen nooit: eerst cache
  e.respondWith(caches.match(req).then((r) => r || fetch(req).then((res) => {
    if (res.ok) { const kopie = res.clone(); caches.open(CACHE).then((c) => c.put(req, kopie)); }
    return res;
  })));
});
