"use strict";

// ---------- opslag ----------
const OPSLAG = "slijmlab-v1";
const staat = Object.assign(
  { gemaakt: {}, sterren: {}, favorieten: [], porties: 1, lijst: [], heb: {}, voorlezen: true },
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
  if (id !== "stappen") { stopTimer(); laatSchermSlapen(); stem.pause(); }
  if (id === "mijn") renderMijn();
  if (id === "boodschappen") renderBoodschappen();
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
function gram(x) { return x < 10 ? String(Math.round(x * 10) / 10).replace(".", ",") : String(Math.round(x)); }
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

// ---------- voorlezen (vooraf gemaakte mp3's, ElevenLabs-stem Roos) ----------
const AUDIO_V = 2;
const stem = new Audio();
function spreek(naam) {
  if (!staat.voorlezen) return;
  stem.pause();
  stem.src = `audio/${naam}.mp3?v=${AUDIO_V}`;
  stem.play().catch(() => {});
}

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
  { id: "eetbaar", naam: "😋 Eetbaar", test: (r) => r.eetbaar },
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
function renderFeestBanner() {
  const el = $("#feestBanner");
  if (!FEESTPAKKET_URL) { el.hidden = true; return; }
  el.hidden = false;
  el.innerHTML = `<div class="feest-banner"><span class="groot">🎉</span><div><b>Slijmfeestje geven?</b><br>Compleet draaiboek met boodschappenlijst, uitnodigingen en diploma's om te printen.</div>
    <a class="grote-knop roze" href="${esc(FEESTPAKKET_URL)}" target="_blank" rel="noopener noreferrer">Bekijk het pakket ↗</a></div>`;
}
function renderKaarten() {
  const f = FILTERS.find((x) => x.id === actiefFilter);
  const lijst = RECEPTEN.filter(f.test);
  $("#kaarten").innerHTML = lijst.length ? lijst.map((r) => `
    <button class="kaart" data-id="${r.id}">
      <div class="kaart-top" style="background:${r.kleur[2] || "#f6f1ff"}">
        ${staat.favorieten.includes(r.id) ? '<span class="hartje">💜</span>' : ""}
        <span class="label ${r.eetbaar ? "eetbaar" : ""}">${r.eetbaar ? "😋 eetbaar" : r.activator === "geen" ? "zonder activator" : moeilijkTekst(r.moeilijk)}</span>
        <div class="klodder" style="background:${kleurVan(r)}">${r.emoji}</div>
      </div>
      <div class="kaart-body">
        <h3>${esc(r.naam)}</h3>
        <p>${esc(r.kort)}</p>
        <div class="meta">
          <span class="pil">⏱ ${r.minuten} min</span>
          <span class="pil groen">👧 ${r.leeftijd}+</span>
          ${r.getest ? '<span class="pil getest">🧪 getest</span>' : ""}
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
    ${r.eetbaar ? `<div class="waarschuwing eetbaar-info">😋 <b>Eetbaar slijm!</b> Gebruik een schone kom en schone handen, en houd het ver weg van gewoon lijmslijm. Opeten of weggooien op dezelfde dag.${r.allergenen ? ` <br>🏷️ <b>Let op, bevat:</b> ${esc(r.allergenen)}` : ""}</div>` : ""}
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
              <span class="hoeveel">${esc(hoeveelheid(ing, ing.vast ? 1 : f))}${ing.g ? `<small class="gram">± ${gram(ing.g * (ing.vast ? 1 : f))} g</small>` : ""}</span>
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
        ${r.getest ? `<div class="tipkaart getest"><b>🧪 Zelf getest</b>${esc(r.getest)}</div>` : ""}
        ${r.bron ? `<div class="tipkaart bron"><b>✅ Bewezen recept</b>Overgenomen uit ${r.bron.map((b) => `<a href="${esc(b.url)}" target="_blank" rel="noopener noreferrer">${esc(b.naam)}</a>`).join(" en ")}${r.bewijs ? `. ${esc(r.bewijs)}` : ""}. Alleen de maten zijn omgerekend naar ml en lepels.</div>` : ""}
      </div>
    </div>
    ${winkelPaneel(r)}
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
  if (a.dataset.actie === "oplijst") {
    if (!staat.lijst.includes(recept.id)) staat.lijst.push(recept.id);
    bewaar(); updateLijstTeller(); renderDetail(); toast("🛒 Op je boodschappenlijst gezet!");
  }
  if (a.dataset.actie === "naarlijst") toonTab("boodschappen");
});

// ---------- STAP-VOOR-STAP ----------
// welke ingrediënten noemt deze stap? (dan tonen we de hoeveelheid erbij)
const STAP_WOORD = { lijm_wit: /lijm/i, lijm_helder: /lijm/i, glow: /lijm/i, soda: /baking soda/i, lens: /lenzenvloeistof/i,
  kleur: /kleur/i, glitter: /glitter/i, scheerschuim: /scheerschuim/i, chia: /chiazaad/i, maizena: /maizena/i,
  poedersuiker: /poedersuiker/i, olie: /olie/i, modelmagic: /klei/i, babyolie: /babyolie/i, lotion: /lotion/i, spekjes: /marshmallows/i, fluff: /fluff/i, beertjes: /beertjes/i };
function stapIngredienten(r, s) {
  if (/\d|halve|kwart|anderhalve/i.test(s.t)) return [];   // stap noemt zelf al een hoeveelheid
  if (/^(te |nog te |plakt)/i.test(s.t)) return [];          // bijstuur-tip, geen hoofdhoeveelheid
  return r.ingredienten.filter((ing) => {
    const k = artikelVan(ing.n);
    const woord = k ? STAP_WOORD[k] : /^water$|^warm water$/i.test(ing.n) ? /water/i : null;
    return woord && woord.test(s.t) && ing.h != null;
  });
}
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
      <div class="stapbalk">
        <button class="terug" data-actie="stoppen">✕ Stoppen</button>
        <span>
          <button class="terug" data-actie="opnieuw" title="Nog een keer voorlezen">🔁</button>
          <button class="terug" data-actie="stem" title="Voorlezen aan/uit">${staat.voorlezen ? "🔊 Voorlezen aan" : "🔇 Voorlezen uit"}</button>
        </span>
      </div>
      <h2 style="text-align:center;margin:0">${r.emoji} ${esc(r.naam)}</h2>
      <div class="voortgang"><div style="width:${pct}%"></div></div>
      <div class="stapkaart" data-actie="volgende" style="border-top:8px solid ${r.kleur[0]}">
        <div class="stapnr">Stap ${stapIndex + 1} van ${n}</div>
        <div class="stapicoon">${s.i || "👉"}</div>
        <div class="staptekst">${esc(s.t)}</div>
        ${s.x ? `<div class="stapextra">${esc(s.x)}</div>` : ""}
        ${(() => { const f = staat.porties, lijst = stapIngredienten(r, s); return lijst.length ? `<div class="stapnodig">${lijst.map((ing) =>
          `<span>${esc(hoeveelheid(ing, ing.vast ? 1 : f))}${ing.g ? ` · ± ${gram(ing.g * (ing.vast ? 1 : f))} g` : ""} <b>${esc(ing.n.replace(/ \(.*\)$/, ""))}</b></span>`).join("")}</div>` : ""; })()}
        ${s.timer ? `
          <div class="timer">
            <div class="timer-ring">
              <svg width="120" height="120"><circle cx="60" cy="60" r="52" stroke="#eee5ff" stroke-width="10" fill="none"/>
              <circle id="timerBoog" cx="60" cy="60" r="52" stroke="${r.kleur[0]}" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="326.7" stroke-dashoffset="0"/></svg>
              <div class="tijd" id="timerTijd">${mmss(timerRest)}</div>
            </div>
            <button data-actie="timer" id="timerKnop">▶ Start timer</button>
          </div>` : ""}
        <div class="tikhint">👆 Plakhanden? Tik ergens op de kaart (mag met je elleboog!) voor de volgende stap</div>
      </div>
      <div class="stapnav">
        <button class="grote-knop vorige" data-actie="vorige" ${stapIndex === 0 ? "disabled style='opacity:.4'" : ""}>← Terug</button>
        <button class="grote-knop" data-actie="volgende">${stapIndex === n - 1 ? "Klaar! 🎉" : "Volgende →"}</button>
      </div>
    </div>`;
  spreek(`${r.id}-${stapIndex}`);
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
    setTimeout(() => spreek("tijd-om"), 900);
  }
}
$("#stapInhoud").addEventListener("click", (e) => {
  const a = e.target.closest("[data-actie]"); if (!a) return;
  const act = a.dataset.actie;
  if (act === "stoppen") { stem.pause(); openRecept(recept.id); return; }
  if (act === "opnieuw") { const v = staat.voorlezen; staat.voorlezen = true; spreek(`${recept.id}-${stapIndex}`); staat.voorlezen = v; return; }
  if (act === "stem") {
    staat.voorlezen = !staat.voorlezen; bewaar();
    a.textContent = staat.voorlezen ? "🔊 Voorlezen aan" : "🔇 Voorlezen uit";
    staat.voorlezen ? spreek(`${recept.id}-${stapIndex}`) : stem.pause();
    return;
  }
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
  spreek("klaar");
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

// ---------- LENZENCHECK ----------
const BOOR = /bor(ax|aat|ate|ic|zuur|iumzout)|boorzuur|natriumboraat|sodium borate/i;
function renderLenzen() {
  $("#lenzenInhoud").innerHTML = `
    <h2>🔍 Werkt mijn lenzenvloeistof?</h2>
    <p class="hint">De nummer 1 reden dat slijm mislukt: lenzenvloeistof zonder boorzuur. Check het hier.</p>
    <div class="paneel">
      <h3>Staat er een woord met <span class="boor">bor</span> op het etiket?</h3>
      <p>Kijk bij <b>Samenstelling</b> of <b>Ingrediënten</b>. Zoek naar: <b>boorzuur</b>, <b>borax</b>, <b>boric acid</b>, <b>borate</b> of <b>natriumboraat</b>.</p>
      <div class="knoprij">
        <button class="grote-knop" data-lens="ja">✅ Ja, ik zie 'bor'</button>
        <button class="grote-knop roze" data-lens="nee">❌ Nee, niet te vinden</button>
      </div>
      <div id="lensUitslag"></div>
      <details class="overtypen"><summary>Of typ de samenstelling over</summary>
        <textarea id="lensTekst" rows="3" placeholder="Bijvoorbeeld: Pluronic, PVP, EDTA, pH 7.2"></textarea>
        <div id="lensTekstUitslag"></div>
      </details>
    </div>
    <div class="paneel">
      <h3>📋 Merken die we hebben gecheckt</h3>
      ${LENZEN.map((l) => `
        <div class="lens ${l.werkt ? "ja" : "nee"}">
          <span class="lens-icoon">${l.werkt ? "✅" : "❌"}</span>
          <div><b>${esc(l.merk)}</b> <small>· ${esc(l.winkel)}</small><br><small>${esc(l.bewijs)}</small>
          ${l.url ? `<div class="koopknoppen"><a class="koop" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">Bekijk ↗</a></div>` : ""}</div>
        </div>`).join("")}
      <p class="sub" style="margin-top:10px">Let op: of het voor zachte of harde lenzen is, maakt niet uit. Het gaat alleen om boorzuur.</p>
    </div>`;
}
const UITSLAG_JA = `<div class="tipkaart tip"><b>✅ Deze werkt!</b>Boorzuur zorgt dat de lijm slijm wordt. Veel plezier!</div>`;
const UITSLAG_NEE = `<div class="tipkaart fout"><b>❌ Deze werkt niet voor slijm</b>Zonder boorzuur blijft het waterige lijm. Neem Etos All-in-1 zachte lenzen (Etos of AH) of Biotrue.</div>`;
$("#lenzenInhoud").addEventListener("click", (e) => {
  const b = e.target.closest("[data-lens]"); if (!b) return;
  $("#lensUitslag").innerHTML = b.dataset.lens === "ja" ? UITSLAG_JA : UITSLAG_NEE;
  piep(b.dataset.lens === "ja" ? [660, 880] : [330, 220], 0.12);
});
$("#lenzenInhoud").addEventListener("input", (e) => {
  if (e.target.id !== "lensTekst") return;
  const t = e.target.value.trim();
  $("#lensTekstUitslag").innerHTML = t.length < 6 ? "" : BOOR.test(t) ? UITSLAG_JA : UITSLAG_NEE;
});

// ---------- MIJN LAB + BADGES ----------
const aantalGemaakt = () => Object.values(staat.gemaakt).reduce((a, b) => a + b, 0);
const BADGES = [
  { icoon: "🐣", naam: "Eerste slijm", uitleg: "Maak je eerste slijm", test: () => aantalGemaakt() >= 1 },
  { icoon: "🧪", naam: "Labassistent", uitleg: "Maak 3 keer slijm", test: () => aantalGemaakt() >= 3 },
  { icoon: "🌈", naam: "Ontdekker", uitleg: "Maak 5 verschillende recepten", test: () => Object.keys(staat.gemaakt).length >= 5 },
  { icoon: "☁️", naam: "Wolkenmaker", uitleg: "Maak fluffy slijm", test: () => staat.gemaakt.fluffy },
  { icoon: "💎", naam: "Glitterster", uitleg: "Maak glitterslijm", test: () => staat.gemaakt.glitter },
  { icoon: "🌙", naam: "Nachtlicht", uitleg: "Maak glow-in-the-dark slijm", test: () => staat.gemaakt.glow },
  { icoon: "🌱", naam: "Groene held", uitleg: "Maak een recept zonder activator", test: () => RECEPTEN.some((r) => r.activator === "geen" && staat.gemaakt[r.id]) },
  { icoon: "😋", naam: "Smulpaap", uitleg: "Maak een eetbaar slijm", test: () => RECEPTEN.some((r) => r.eetbaar && staat.gemaakt[r.id]) },
  { icoon: "⭐", naam: "Perfectie", uitleg: "Geef een slijm 5 sterren", test: () => Object.values(staat.sterren).includes(5) },
  { icoon: "👑", naam: "Slijmkoning(in)", uitleg: "Maak alle recepten", test: () => RECEPTEN.every((r) => staat.gemaakt[r.id]) },
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

// ---------- BOODSCHAPPEN ----------
// unieke artikelen van een recept (water, handcrème e.d. hebben geen artikel)
function artikelenVan(r) {
  const uit = [];
  r.ingredienten.forEach((ing) => {
    const k = artikelVan(ing.n);
    if (k && !uit.some((x) => x.k === k)) uit.push({ k, ing });
  });
  return uit;
}
function koopKnoppen(k) {
  const a = ARTIKELEN[k];
  const links = (a.links || []).map((l) =>
    `<a class="koop" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(WINKELS[l.w]?.naam || l.w)}${l.prijs ? ` · ${esc(l.prijs)}` : ""} ↗</a>`);
  const zoek = (a.zoekIn || []).map((w) =>
    `<a class="koop zoek" href="${esc(WINKELS[w].zoek(a.zoek))}" target="_blank" rel="noopener noreferrer">🔎 ${esc(WINKELS[w].naam)} ↗</a>`);
  return links.concat(zoek).join("");
}
function winkelChips(k) {
  const w = ARTIKELEN[k].winkels || [];
  return w.length ? `<span class="winkels">🏪 ${w.map((x) => esc(WINKELS[x].naam)).join(" · ")}</span>` : `<span class="winkels">🌐 Alleen online</span>`;
}
function artikelRij(k, extra = "", vink = false) {
  const a = ARTIKELEN[k], heb = staat.heb[k];
  return `
    <div class="artikel ${vink && heb ? "heb" : ""}" data-art="${k}">
      ${vink ? `<button class="vink" data-actie="heb" title="Heb ik al">${heb ? "✓" : ""}</button>` : `<span class="art-emoji">${a.emoji}</span>`}
      <div class="art-info">
        <b>${vink ? a.emoji + " " : ""}${esc(a.naam)}</b>${extra}
        ${winkelChips(k)}
        ${a.let ? `<small>💡 ${esc(a.let)}</small>` : ""}
        <div class="koopknoppen">${koopKnoppen(k)}</div>
      </div>
    </div>`;
}
function winkelPaneel(r) {
  const opLijst = staat.lijst.includes(r.id);
  return `
    <div class="paneel winkelpaneel">
      <h3>🛒 Boodschappen voor ${esc(r.naam)}</h3>
      <p class="sub">Waar koop je het? Tik op een winkel om meteen online te bestellen.</p>
      ${artikelenVan(r).map(({ k }) => artikelRij(k)).join("")}
      <div class="knoprij">
        ${opLijst
          ? `<button class="grote-knop roze" data-actie="naarlijst">✔ Staat op je lijst – bekijk lijst</button>`
          : `<button class="grote-knop roze" data-actie="oplijst">➕ Zet op mijn boodschappenlijst</button>`}
      </div>
    </div>`;
}
function updateLijstTeller() {
  const n = staat.lijst.length;
  $("#lijstTeller").textContent = n ? n : "";
  $("#lijstTeller").hidden = !n;
}
function lijstData() {
  const recepten = staat.lijst.map((id) => RECEPTEN.find((r) => r.id === id)).filter(Boolean);
  const per = {};
  recepten.forEach((r) => artikelenVan(r).forEach(({ k, ing }) => {
    (per[k] = per[k] || { k, voor: [], h: 0, e: ing.e, optel: true }).voor.push(r.naam);
    if (ing.h != null && ing.e === per[k].e) per[k].h += ing.h; else per[k].optel = false;
  }));
  return { recepten, items: Object.values(per) };
}
function hoeveelTekst(it) {
  if (!it.optel || !it.h || !it.e) return "";
  if (it.e === "ml" && it.k === "lijm_helder") return `${getal(it.h)} ml (${Math.ceil(it.h / 100)} HEMA-flesje${it.h > 100 ? "s" : ""} van 100 ml)`;
  if (it.e === "ml" && it.k === "lijm_wit") return `${getal(it.h)} ml (1 grote fles is genoeg voor ${Math.floor(946 / it.h)}×)`;
  if (it.e === "druppels") return "";
  return `${getal(it.h)} ${it.e}`;
}
function renderBoodschappen() {
  const { recepten, items } = lijstData();
  const el = $("#boodschappenInhoud");
  if (!recepten.length) {
    el.innerHTML = `
      <h2>🛒 Boodschappenlijst</h2>
      <div class="paneel"><p>Je lijst is nog leeg. Kies hieronder welk slijm je wilt maken, dan komt alles wat je nodig hebt op je lijst.</p>
      <div class="kies-recepten">${RECEPTEN.map((r) => `<button data-kies="${r.id}">${r.emoji} ${esc(r.naam)}</button>`).join("")}</div></div>
      ${pakketPaneel()}`;
    return;
  }
  // groeperen per beste winkel
  const groepen = {};
  items.forEach((it) => {
    const w = (ARTIKELEN[it.k].winkels || [])[0] || "online";
    (groepen[w] = groepen[w] || []).push(it);
  });
  const volgorde = Object.keys(groepen).sort((a, b) => (a === "online") - (b === "online") || groepen[b].length - groepen[a].length);
  const nogNodig = items.filter((it) => !staat.heb[it.k]).length;
  el.innerHTML = `
    <h2>🛒 Boodschappenlijst</h2>
    <p class="hint">Voor ${recepten.length} recept${recepten.length > 1 ? "en" : ""} · nog ${nogNodig} van ${items.length} spullen halen. Vink af wat je al in huis hebt.</p>
    <div class="paneel">
      <div class="kies-recepten">
        ${RECEPTEN.map((r) => `<button data-kies="${r.id}" class="${staat.lijst.includes(r.id) ? "aan" : ""}">${r.emoji} ${esc(r.naam)}</button>`).join("")}
      </div>
    </div>
    ${volgorde.map((w) => `
      <div class="paneel">
        <h3>${w === "online" ? "🌐 Online bestellen" : `🏪 Bij de ${esc(WINKELS[w].naam)}`}</h3>
        ${groepen[w].map((it) => artikelRij(it.k,
          `${hoeveelTekst(it) ? ` <span class="pil">${esc(hoeveelTekst(it))}</span>` : ""}<span class="voor">voor: ${esc(it.voor.join(", "))}</span>`, true)).join("")}
      </div>`).join("")}
    <div class="paneel"><p class="sub">🏠 Heb je thuis vast al: een kom, een lepel, water en een afsluitbaar bakje of zakje.</p></div>
    <div class="knoprij">
      <a class="grote-knop" id="deelWhatsapp" href="${esc("https://wa.me/?text=" + encodeURIComponent(lijstTekst()))}" target="_blank" rel="noopener noreferrer">📲 Deel via WhatsApp</a>
      <button class="grote-knop roze" data-actie="kopieer">📋 Kopieer lijst</button>
      <button class="grote-knop vorige" data-actie="leeg">🗑️ Leegmaken</button>
    </div>
    ${pakketPaneel()}`;
}
function pakketPaneel() {
  if (!PAKKETTEN.length) return "";
  return `
    <div class="paneel">
      <h3>📦 Liever alles in één keer?</h3>
      <p class="sub">Een slijmpakket heeft lijm, activator en versiering samen. Handig als cadeautje of om mee te beginnen.</p>
      ${PAKKETTEN.map((p) => `
        <div class="artikel"><span class="art-emoji">📦</span><div class="art-info"><b>${esc(p.naam)}</b>
        ${p.uitleg ? `<small>${esc(p.uitleg)}</small>` : ""}
        <div class="koopknoppen"><a class="koop" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${esc(WINKELS[p.w]?.naam || p.w)}${p.prijs ? ` · ${esc(p.prijs)}` : ""} ↗</a></div></div></div>`).join("")}
    </div>`;
}
function lijstTekst() {
  const { recepten, items } = lijstData();
  const regels = ["🛒 Slijm-boodschappen (SlijmLab)", "Voor: " + recepten.map((r) => r.naam).join(", "), ""];
  items.filter((it) => !staat.heb[it.k]).forEach((it) => {
    const a = ARTIKELEN[it.k], h = hoeveelTekst(it);
    const w = (a.winkels || []).map((x) => WINKELS[x].naam).join("/") || "online";
    regels.push(`- ${a.naam}${h ? ": " + h : ""} – ${w}`);
  });
  regels.push("", "Tip: lenzenvloeistof moet boorzuur bevatten. Baking soda, geen bakpoeder!", location.origin + location.pathname);
  return regels.join("\n");
}
$("#boodschappenInhoud").addEventListener("click", async (e) => {
  const kies = e.target.closest("[data-kies]");
  if (kies) {
    const id = kies.dataset.kies, i = staat.lijst.indexOf(id);
    i >= 0 ? staat.lijst.splice(i, 1) : staat.lijst.push(id);
    bewaar(); updateLijstTeller(); renderBoodschappen(); piep([i >= 0 ? 440 : 880], 0.08);
    return;
  }
  const a = e.target.closest("[data-actie]"); if (!a) return;
  if (a.dataset.actie === "heb") {
    const k = a.closest("[data-art]").dataset.art;
    staat.heb[k] = !staat.heb[k]; bewaar(); renderBoodschappen(); piep([staat.heb[k] ? 880 : 440], 0.08);
  }
  if (a.dataset.actie === "kopieer") {
    try { await navigator.clipboard.writeText(lijstTekst()); toast("📋 Gekopieerd! Plak hem waar je wilt."); }
    catch (_) { toast("Kopiëren lukte niet, gebruik WhatsApp delen."); }
  }
  if (a.dataset.actie === "leeg") {
    staat.lijst = []; staat.heb = {}; bewaar(); updateLijstTeller(); renderBoodschappen();
  }
});

// ---------- start ----------
renderFilters();
renderFeestBanner();
renderKaarten();
renderProblemen();
renderBasis();
renderVeilig();
renderLenzen();
updateScore();
updateLijstTeller();
const start = location.hash.slice(1);
if (start && RECEPTEN.some((r) => r.id === start)) openRecept(start);

// ---------- offline + installeerbaar ----------
if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
