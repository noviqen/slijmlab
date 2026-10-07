"""Schrijft sw.js met de lijst bestanden die offline beschikbaar moeten zijn.
Draai dit na elke wijziging (na het ophogen van ?v= in index.html):  python3 tools/maak_sw.py"""
import hashlib, pathlib, re

hier = pathlib.Path(__file__).resolve().parent.parent
index = (hier / "index.html").read_text()
appjs = (hier / "app.js").read_text()
audio_v = re.search(r"AUDIO_V = (\d+)", appjs).group(1)

bestanden = ["./", "index.html", "manifest.webmanifest", "fonts/baloo2-latin.woff2",
             "icon-180.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png"]
bestanden += re.findall(r'(?:href|src)="([^"#:]+\?v=\d+)"', index)  # style.css?v=, data.js?v=, app.js?v=, logo.svg?v=
bestanden += [f"audio/{f.name}?v={audio_v}" for f in sorted((hier / "audio").glob("*.mp3"))]
bestanden = list(dict.fromkeys(bestanden))

h = hashlib.sha1()
for b in bestanden:
    pad = hier / ("index.html" if b == "./" else b.split("?")[0])
    h.update(b.encode()); h.update(pad.read_bytes())
versie = h.hexdigest()[:10]

(hier / "sw.js").write_text(f"""// Gegenereerd door tools/maak_sw.py — niet met de hand aanpassen.
const CACHE = "slijmlab-{versie}";
const BESTANDEN = {bestanden!r};

self.addEventListener("install", (e) => {{
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(BESTANDEN)).then(() => self.skipWaiting()));
}});
self.addEventListener("activate", (e) => {{
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k.startsWith("slijmlab-") && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
}});
self.addEventListener("fetch", (e) => {{
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  if (req.mode === "navigate") {{
    // pagina: eerst internet (nieuwste versie), anders uit de cache
    e.respondWith(fetch(req).catch(() => caches.match("index.html")));
    return;
  }}
  // bestanden met ?v= veranderen nooit: eerst cache
  e.respondWith(caches.match(req).then((r) => r || fetch(req).then((res) => {{
    if (res.ok) {{ const kopie = res.clone(); caches.open(CACHE).then((c) => c.put(req, kopie)); }}
    return res;
  }})));
}});
""")
print("sw.js:", len(bestanden), "bestanden, cache", versie)
