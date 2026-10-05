"use strict";

// ---------- opslag ----------
const OPSLAG = "slijmlab-v1";
const staat = Object.assign(
  { gemaakt: {}, sterren: {}, favorieten: [], porties: 1 },
  JSON.parse(localStorage.getItem(OPSLAG) || "{}")
);
const bewaar = () => localStorage.setItem(OPSLAG, JSON.stringify(staat));

const $ = (s, el = document) => el.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ---------- navigatie ----------
let huidigeTab = "recepten";
function toonTab(id, { scroll = true } = {}) {
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("actief", t.id === id));
  document.querySelectorAll("#nav button").forEach((b) => b.classList.toggle("actief", b.dataset.tab === id));
  huidigeTab = id;
  if (id !== "stappen") { stopTimer(); laatSchermSlapen(); }
  if (id === "mijn") renderMijn();
  if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
}
$("#nav").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-tab]");
  if (b) { toonTab(b.dataset.tab); history.replaceState(null, "", "#"); }
});
$("#naarHome").addEventListener("click", () => toonTab("recepten"));
$("#naarHome").addEventListener("keydown", (e) => { if (e.key === "Enter") toonTab("recepten"); });
$("#naarVeilig").addEventListener("click", (e) => { e.preventDefault(); toonTab("veilig"); });

// ---------- hulpjes ----------
const kleurVan = (r) => `linear-gradient(135deg, ${r.kleur[0]}, ${r.kleur[1]})`;
const sterrenTekst = (n) => "⭐".repeat(n);
const moeilijkTekst = (n) => ["", "Makkelijk", "Gemiddeld", "Uitdagend"][n];
const BREUKEN = { 0.25: "¼", 0.5: "½", 0.75: "¾", 0.33: "⅓", 0.67: "⅔" };
function getal(x) {
  if (x == null) return "";
  const heel = Math.floor(x + 1e-9);
  const rest = Math.round((x - heel) * 100) / 100;
  const br = BREUKEN[rest];
  if (rest === 0) return String(heel);
  if (br) return (heel ? heel : "") + br;
  return String(Math.round(x * 10) / 10).replace(".", ",");
}
function hoeveelheid(ing, factor) {
  if (ing.h == null) return ing.e || "";
  return `${getal(ing.h * factor)} ${ing.e || ""}`.trim();
}
function toast(tekst) {
  const t = document.createElement("div");
  t.className = "toast"; t.textContent = tekst;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2400);
}

// ---------- geluidjes (alleen effecten, geen stem) ----------
let audio;
function piep(freqs = [660, 880], duur = 0.12) {
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    freqs.forEach((f, i) => {
      const o = audio.createOscillator(), g = audio.createGain();
      o.type = "sine"; o.frequency.value = f;
      const t0 = audio.currentTime + i * duur;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.25, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + duur);
      o.connect(g).connect(audio.destination); o.start(t0); o.stop(t0 + duur + 0.02);
    });
  } catch (_) { /* geen geluid */ }
}
const slurp = () => piep([300, 220, 160], 0.09);

// ---------- scherm wakker houden tijdens het maken ----------
let wakeLock = null;
async function houdSchermWakker() {
  try { if ("wakeLock" in navigator && !wakeLock) wakeLock = await navigator.wakeLock.request("screen"); } catch (_) {}
}
function laatSchermSlapen() { if (wakeLock) { wakeLock.release().catch(() => {}); wakeLock = null; } }

// ---------- hero blob ----------
$("#heroBlob").addEventListener("click", (e) => {
  const b = e.currentTarget;
  b.classList.remove("squish"); void b.offsetWidth; b.classList.add("squish");
  slurp();
});

// ---------- RECEPTEN-OVERZICHT ----------
const FILTERS = [
  { id: "alle", naam: "✨ Alles", test: () => true },
  { id: "makkelijk", naam: "🟢 Makkelijk", test: (r) => r.moeilijk === 1 },
  { id: "zonder", naam: "🌱 Zonder activator", test: (r) => r.activator === "geen" },
  { id: "kleintjes", naam: "👶 Voor kleintjes", test: (r) => r.leeftijd <= 4 },
  { id: "snel", naam: "⚡ Binnen 15 min", test: (r) => r.minuten <= 15 },
  { id: "fav", naam: "💜 Favorieten", test: (r) => staat.favorieten.includes(r.id) },
];
let actiefFilter = "alle";
function renderFilters() {
  $("#filters").innerHTML = FILTERS.map((f) =>
    `<button data-f="${f.id}" class="${f.id === actiefFilter ? "actief" : ""}">${f.naam}</button>`).join("");
}
$("#filters").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  actiefFilter = b.dataset.f; renderFilters(); renderKaarten();
});
function renderKaarten() {
  const f = FILTERS.find((x) => x.id === actiefFilter);
  const lijst = RECEPTEN.filter(f.test);
  $("#kaarten").innerHTML = lijst.length ? lijst.map((r) => `
    <button class="kaart" data-id="${r.id}">
      <div class="kaart-top" style="background:${r.kleur[2] || "#f6f1ff"}">
        ${staat.favorieten.includes(r.id) ? '<span class="hartje">💜</span>' : ""}
        <span class="label">${r.activator === "geen" ? "zonder activator" : moeilijkTekst(r.moeilijk)}</span>
        <div class="klodder" style="background:${kleurVan(r)}">${r.emoji}</div>
      </div>
      <div class="kaart-body">
        <h3>${esc(r.naam)}</h3>
        <p>${esc(r.kort)}</p>
        <div class="meta">
          <span class="pil">⏱ ${r.minuten} min</span>
          <span class="pil groen">👧 ${r.leeftijd}+</span>
          ${staat.gemaakt[r.id] ? `<span class="gemaakt-stempel">✔ ${staat.gemaakt[r.id]}× gemaakt ${staat.sterren[r.id] ? sterrenTekst(staat.sterren[r.id]) : ""}</span>` : ""}
        </div>
      </div>
    </button>`).join("")
    : `<div class="paneel">Nog geen favorieten. Tik op 🤍 bij een recept om het te bewaren.</div>`;
}
$("#kaarten").addEventListener("click", (e) => {
  const k = e.target.closest(".kaart"); if (k) openRecept(k.dataset.id);
});

// ---------- RECEPT-DETAIL ----------
let recept = null;
let afgevinkt = new Set();
function openRecept(id) {
  recept = RECEPTEN.find((r) => r.id === id);
  if (!recept) return;
  afgevinkt = new Set();
  renderDetail();
  toonTab("detail");
  history.replaceState(null, "", "#" + id);
}
function renderDetail() {
  const r = recept, f = staat.porties;
  const fav = staat.favorieten.includes(r.id);
  $("#detailInhoud").innerHTML = `
    <button class="terug" data-actie="terug">← Alle recepten</button>
    <div class="detail-kop" style="background:${kleurVan(r)}">
      <button class="fav-knop" data-actie="fav" title="Favoriet">${fav ? "💜" : "🤍"}</button>
      <div class="klodder">${r.emoji}</div>
      <div>
        <h2>${esc(r.naam)}</h2>
        <p>${esc(r.kort)}</p>
        <div class="meta">
          <span class="pil">⏱ ${r.minuten} min</span>
          <span class="pil">${"🟣".repeat(r.moeilijk)}${"⚪".repeat(3 - r.moeilijk)} ${moeilijkTekst(r.moeilijk)}</span>
          <span class="pil">👧 vanaf ${r.leeftijd} jaar</span>
        </div>
      </div>
    </div>
    ${r.waarschuwing ? `<div class="waarschuwing">⚠️ ${esc(r.waarschuwing)}</div>` : ""}
    <div class="detail-grid">
      <div class="paneel">
        <h3>🛒 Wat heb je nodig?</h3>
        <div class="porties">Hoeveel slijm?
          ${[[0.5, "Klein"], [1, "Normaal"], [2, "Dubbel"]].map(([x, n]) =>
            `<button data-portie="${x}" class="${x === f ? "actief" : ""}">${n}</button>`).join("")}
        </div>
        <ul class="ingredienten">
          ${r.ingredienten.map((ing, i) => `
            <li data-ing="${i}" class="${afgevinkt.has(i) ? "af" : ""}">
              <span class="vink">✓</span>
              <span class="hoeveel">${esc(hoeveelheid(ing, ing.vast ? 1 : f))}</span>
              <span class="naam">${esc(ing.n)}${ing.x ? `<span class="extra">${esc(ing.x)}</span>` : ""}</span>
            </li>`).join("")}
        </ul>
        <p class="klein" style="color:var(--zacht);font-size:.9rem">Tik een spulletje aan als je het klaar hebt staan.</p>
      </div>
      <div class="paneel">
        <h3>📋 Zo maak je het</h3>
        <ol class="stappen-lijst">${r.stappen.map((s) => `<li><span>${esc(s.t)}</span></li>`).join("")}</ol>
        <div class="tipkaart tip"><b>💡 Tip</b>${esc(r.tip)}</div>
        <div class="tipkaart fout"><b>🙈 Meest gemaakte fout</b>${esc(r.fout)}</div>
      </div>
    </div>
    <div class="knoprij"><button class="grote-knop" data-actie="start">🚀 Start stap voor stap</button></div>`;
}
$("#detailInhoud").addEventListener("click", (e) => {
  const li = e.target.closest("li[data-ing]");
  if (li) {
    const i = +li.dataset.ing;
    afgevinkt.has(i) ? afgevinkt.delete(i) : afgevinkt.add(i);
    li.classList.toggle("af");
    piep([afgevinkt.has(i) ? 880 : 440], 0.08);
    if (afgevinkt.size === recept.ingredienten.length) toast("Alles klaar? Druk op Start! 🚀");
    return;
  }
  const p = e.target.closest("[data-portie]");
  if (p) { staat.porties = +p.dataset.portie; bewaar(); renderDetail(); return; }
  const a = e.target.closest("[data-actie]");
  if (!a) return;
  if (a.dataset.actie === "terug") { toonTab("recepten"); renderKaarten(); history.replaceState(null, "", "#"); }
  if (a.dataset.actie === "fav") {
    const i = staat.favorieten.indexOf(recept.id);
    i >= 0 ? staat.favorieten.splice(i, 1) : staat.favorieten.push(recept.id);
    bewaar(); renderDetail(); renderKaarten();
  }
  if (a.dataset.actie === "start") startStappen();
});

// ---------- STAP-VOOR-STAP ----------
let stapIndex = 0;
let timer = null, timerRest = 0, timerTotaal = 0;
function startStappen() {
  stapIndex = 0;
  houdSchermWakker();
  renderStap();
  toonTab("stappen");
}
function stopTimer() { if (timer) clearInterval(timer); timer = null; }
function mmss(s) { return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }
function renderStap() {
  stopTimer();
  const r = recept, s = r.stappen[stapIndex], n = r.stappen.length;
  const pct = Math.round((stapIndex / n) * 100);
  timerTotaal = timerRest = s.timer || 0;
  $("#stapInhoud").innerHTML = `
    <div class="stapmodus">
      <button class="terug" data-actie="stoppen">✕ Stoppen</button>
      <h2 style="text-align:center;margin:0">${r.emoji} ${esc(r.naam)}</h2>
      <div class="voortgang"><div style="width:${pct}%"></div></div>
      <div class="stapkaart" style="border-top:8px solid ${r.kleur[0]}">
        <div class="stapnr">Stap ${stapIndex + 1} van ${n}</div>
        <div class="stapicoon">${s.i || "👉"}</div>
        <div class="staptekst">${esc(s.t)}</div>
        ${s.x ? `<div class="stapextra">${esc(s.x)}</div>` : ""}
        ${s.timer ? `
          <div class="timer">
            <div class="timer-ring">
              <svg width="120" height="120"><circle cx="60" cy="60" r="52" stroke="#eee5ff" stroke-width="10" fill="none"/>
              <circle id="timerBoog" cx="60" cy="60" r="52" stroke="${r.kleur[0]}" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="326.7" stroke-dashoffset="0"/></svg>
              <div class="tijd" id="timerTijd">${mmss(timerRest)}</div>
            </div>
            <button data-actie="timer" id="timerKnop">▶ Start timer</button>
          </div>` : ""}
      </div>
      <div class="stapnav">
        <button class="grote-knop vorige" data-actie="vorige" ${stapIndex === 0 ? "disabled style='opacity:.4'" : ""}>← Terug</button>
        <button class="grote-knop" data-actie="volgende">${stapIndex === n - 1 ? "Klaar! 🎉" : "Volgende →"}</button>
      </div>
    </div>`;
}
function tikTimer() {
  timerRest--;
  $("#timerTijd").textContent = mmss(Math.max(timerRest, 0));
  $("#timerBoog").setAttribute("stroke-dashoffset", String(326.7 * (1 - timerRest / timerTotaal)));
  if (timerRest <= 0) {
    stopTimer();
    $("#timerKnop").textContent = "✔ Klaar!";
    piep([660, 880, 1100, 880, 1100], 0.15);
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    toast("⏰ Tijd is om! Ga door naar de volgende stap.");
  }
}
$("#stapInhoud").addEventListener("click", (e) => {
  const a = e.target.closest("[data-actie]"); if (!a) return;
  const act = a.dataset.actie;
  if (act === "stoppen") { openRecept(recept.id); return; }
  if (act === "timer") {
    if (timer) { stopTimer(); a.textContent = "▶ Verder"; }
    else if (timerRest > 0) { timer = setInterval(tikTimer, 1000); a.textContent = "⏸ Pauze"; piep([520], 0.08); }
    else { timerRest = timerTotaal; $("#timerTijd").textContent = mmss(timerRest); a.textContent = "▶ Start timer"; }
    return;
  }
  if (act === "vorige" && stapIndex > 0) { stapIndex--; renderStap(); slurp(); }
  if (act === "volgende") {
    if (stapIndex < recept.stappen.length - 1) { stapIndex++; renderStap(); slurp(); }
    else klaar();
  }
  if (act === "ster") {
    staat.sterren[recept.id] = +a.dataset.n; bewaar();
    document.querySelectorAll(".sterren button").forEach((b) => b.classList.toggle("aan", +b.dataset.n <= +a.dataset.n));
    piep([700 + 80 * a.dataset.n], 0.1);
  }
  if (act === "dokter") toonTab("hulp");
  if (act === "nog") { toonTab("recepten"); renderKaarten(); }
});

function klaar() {
  stopTimer(); laatSchermSlapen();
  const oudeBadges = verdiendeBadges().length;
  staat.gemaakt[recept.id] = (staat.gemaakt[recept.id] || 0) + 1;
  bewaar();
  const nieuw = verdiendeBadges().slice(oudeBadges);
  const s = staat.sterren[recept.id] || 0;
  $("#stapInhoud").innerHTML = `
    <div class="stapmodus klaar">
      <div class="groot">${recept.emoji}</div>
      <h2>Wauw, je ${esc(recept.naam)} is klaar!</h2>
      <p>${esc(recept.klaarTip || "Bewaar je slijm in een afgesloten bakje en speel met schone handen.")}</p>
      ${nieuw.map((b) => `<div class="paneel" style="color:var(--tekst)">🎖️ Nieuwe badge: <b>${b.icoon} ${esc(b.naam)}</b></div>`).join("")}
      <p><b>Hoe goed is hij gelukt?</b></p>
      <div class="sterren">${[1, 2, 3, 4, 5].map((n) => `<button data-actie="ster" data-n="${n}" class="${n <= s ? "aan" : ""}">⭐</button>`).join("")}</div>
      <div class="knoprij">
        <button class="grote-knop roze" data-actie="dokter">🚑 Niet helemaal goed?</button>
        <button class="grote-knop" data-actie="nog">🫧 Nog een maken</button>
      </div>
    </div>`;
  updateScore();
  confetti();
  piep([523, 659, 784, 1047], 0.13);
}

// ---------- confetti ----------
function confetti() {
  const c = $("#confetti"), ctx = c.getContext("2d");
  c.width = innerWidth; c.height = innerHeight;
  const kleuren = ["#5ef2a8", "#2fd0e0", "#ff4fa3", "#ffd23f", "#9b5cff"];
  const deeltjes = Array.from({ length: 160 }, () => ({
    x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.5,
    r: 4 + Math.random() * 7, vy: 2 + Math.random() * 4, vx: -2 + Math.random() * 4,
    k: kleuren[(Math.random() * kleuren.length) | 0], w: Math.random() * Math.PI,
  }));
  let frames = 0;
  (function teken() {
    ctx.clearRect(0, 0, c.width, c.height);
    deeltjes.forEach((d) => {
      d.y += d.vy; d.x += d.vx + Math.sin((d.w += 0.05)) * 0.8;
      ctx.fillStyle = d.k; ctx.beginPath();
      ctx.ellipse(d.x, d.y, d.r, d.r * 0.75, d.w, 0, Math.PI * 2); ctx.fill();
    });
    if (++frames < 200) requestAnimationFrame(teken); else ctx.clearRect(0, 0, c.width, c.height);
  })();
}

// ---------- SLIJM-DOKTER ----------
function renderProblemen() {
  $("#problemen").innerHTML = PROBLEMEN.map((p, i) => `
    <div class="probleem" data-p="${i}">
      <button>${p.i} ${esc(p.titel)} <span class="pijl">▾</span></button>
      <div class="oplossing">
        ${p.waarom ? `<p><b>Waarom?</b> ${esc(p.waarom)}</p>` : ""}
        <ol>${p.doe.map((d) => `<li>${esc(d)}</li>`).join("")}</ol>
      </div>
    </div>`).join("");
}
$("#problemen").addEventListener("click", (e) => {
  const b = e.target.closest(".probleem > button"); if (b) b.parentElement.classList.toggle("open");
});

// ---------- ZO WERKT SLIJM + VEILIGHEID ----------
function renderBasis() {
  $("#basisInhoud").innerHTML = `
    <h2>🧠 Zo werkt slijm</h2>
    <p class="hint">Een beetje wetenschap, zodat elk recept lukt.</p>
    <div class="uitleg-grid">${BASIS.map((b) => `
      <div class="paneel"><div class="groot">${b.i}</div><h3>${esc(b.titel)}</h3><p>${esc(b.tekst)}</p></div>`).join("")}
    </div>
    <div class="paneel" style="margin-top:16px">
      <h3>🧪 Welke activator kies je?</h3>
      <div style="overflow-x:auto"><table class="activators">
        <tr><th>Activator</th><th>Hoe</th><th>Goed voor</th><th>Let op</th></tr>
        ${ACTIVATORS.map((a) => `<tr><td><b>${esc(a.naam)}</b></td><td>${esc(a.hoe)}</td><td>${esc(a.voor)}</td><td>${esc(a.let)}</td></tr>`).join("")}
      </table></div>
    </div>
    <div class="paneel">
      <h3>🛍️ Welke lijm werkt?</h3>
      <ul>${LIJM.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
    </div>`;
}
function renderVeilig() {
  $("#veiligInhoud").innerHTML = `
    <h2>🛡️ Veilig slijm maken</h2>
    <p class="hint">Lees dit samen met een volwassene voordat je begint.</p>
    <div class="uitleg-grid">${VEILIG.map((b) => `
      <div class="paneel"><div class="groot">${b.i}</div><h3>${esc(b.titel)}</h3><p>${esc(b.tekst)}</p></div>`).join("")}
    </div>`;
}

// ---------- MIJN LAB + BADGES ----------
const aantalGemaakt = () => Object.values(staat.gemaakt).reduce((a, b) => a + b, 0);
const BADGES = [
  { icoon: "🐣", naam: "Eerste slijm", uitleg: "Maak je eerste slijm", test: () => aantalGemaakt() >= 1 },
  { icoon: "🧪", naam: "Labassistent", uitleg: "Maak 3 keer slijm", test: () => aantalGemaakt() >= 3 },
  { icoon: "🌈", naam: "Ontdekker", uitleg: "Maak 5 verschillende recepten", test: () => Object.keys(staat.gemaakt).length >= 5 },
  { icoon: "☁️", naam: "Wolkenmaker", uitleg: "Maak fluffy of cloud slime", test: () => staat.gemaakt.fluffy || staat.gemaakt.cloud },
  { icoon: "💎", naam: "Kristalhelder", uitleg: "Maak glitter- of clear slime", test: () => staat.gemaakt.glitter },
  { icoon: "🌱", naam: "Groene held", uitleg: "Maak een recept zonder activator", test: () => RECEPTEN.some((r) => r.activator === "geen" && staat.gemaakt[r.id]) },
  { icoon: "🏆", naam: "Uitdaging!", uitleg: "Maak een uitdagend recept", test: () => RECEPTEN.some((r) => r.moeilijk === 3 && staat.gemaakt[r.id]) },
  { icoon: "⭐", naam: "Perfectie", uitleg: "Geef een slijm 5 sterren", test: () => Object.values(staat.sterren).includes(5) },
  { icoon: "👑", naam: "Slijmkoning(in)", uitleg: "Maak 10 verschillende recepten", test: () => Object.keys(staat.gemaakt).length >= 10 },
];
const verdiendeBadges = () => BADGES.filter((b) => b.test());
function updateScore() {
  $("#aantalGemaakt").textContent = aantalGemaakt();
  $("#aantalBadges").textContent = verdiendeBadges().length;
}
function renderMijn() {
  const gemaakt = RECEPTEN.filter((r) => staat.gemaakt[r.id]);
  $("#mijnInhoud").innerHTML = `
    <h2>🏅 Mijn lab</h2>
    <p class="hint">${aantalGemaakt()} keer slijm gemaakt · ${verdiendeBadges().length} van ${BADGES.length} badges</p>
    <div class="badges">${BADGES.map((b) => `
      <div class="badge ${b.test() ? "" : "uit"}"><div class="groot">${b.icoon}</div><b>${esc(b.naam)}</b><small>${esc(b.uitleg)}</small></div>`).join("")}
    </div>
    <div class="paneel" style="margin-top:16px">
      <h3>📒 Mijn slijm-dagboek</h3>
      ${gemaakt.length ? `<ul>${gemaakt.map((r) => `<li>${r.emoji} <b>${esc(r.naam)}</b> – ${staat.gemaakt[r.id]}× ${staat.sterren[r.id] ? sterrenTekst(staat.sterren[r.id]) : ""}</li>`).join("")}</ul>`
        : "<p>Nog leeg. Maak je eerste slijm en hij komt hier te staan!</p>"}
    </div>`;
}

// ---------- start ----------
renderFilters();
renderKaarten();
renderProblemen();
renderBasis();
renderVeilig();
updateScore();
const start = location.hash.slice(1);
if (start && RECEPTEN.some((r) => r.id === start)) openRecept(start);
