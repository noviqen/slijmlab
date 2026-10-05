"use strict";
// Recepten gebaseerd op vergelijking van o.a. Elmer's, Arm & Hammer, HEMA, Little Bins for Little Hands,
// One Little Project, Best Ideas for Kids, RIVM-beoordeling borax in slijm (2019). Zie README.md.

const LENS = "lenzenvloeistof met boorzuur";
const LENS_X = "Op het etiket moet 'boorzuur' of 'borax' staan (bv. Etos All-in-1 of Biotrue). Kruidvat Opticare werkt níet: daar zit geen boorzuur in";
const SODA = "baking soda (zuiveringszout)";
const SODA_X = "Geen bakpoeder! Dat is iets anders.";

const RECEPTEN = [
  {
    id: "klassiek", naam: "Klassiek slijm", emoji: "🟢", activator: "lens",
    kort: "Het gouden basisrecept. Lukt dit, dan lukt alles!",
    kleur: ["#5ef2a8", "#20c997", "#e6fff6"], moeilijk: 1, minuten: 10, leeftijd: 6,
    ingredienten: [
      { h: 120, e: "ml", n: "witte PVA-kinderlijm", x: "1 flesje witte kinderlijm (HEMA, Action, Collall). Geen lijmstift!" },
      { h: 0.5, e: "tl", n: SODA, x: SODA_X },
      { h: 1, e: "el", n: LENS, x: LENS_X + ". Houd er nog wat extra bij." },
      { h: 2, e: "druppels", n: "kleurstof (mag ook niet)" },
    ],
    stappen: [
      { i: "🥣", t: "Doe de lijm in een kom." },
      { i: "🎨", t: "Doe 1 of 2 druppels kleurstof erbij en roer.", x: "Kleur en glitter gaan er altijd in vóór de activator." },
      { i: "🧂", t: "Strooi de baking soda erover en roer goed." },
      { i: "💧", t: "Doe de lenzenvloeistof erbij en roer.", x: "Roer door tot het loslaat van de kom en een klodder wordt.", timer: 60 },
      { i: "🤲", t: "Pak het eruit en kneed het 2 minuten.", x: "Het plakt eerst. Dat is normaal! Gewoon doorkneden.", timer: 120 },
      { i: "💦", t: "Plakt het nog steeds? Doe een paar druppels lenzenvloeistof op je handen en kneed nog even.", x: "Op je handen, niet in de kom. Zo wordt het niet te hard." },
    ],
    tip: "Meer baking soda maakt slijm steviger, minder maakt het lekker vloeibaar.",
    fout: "Alle lenzenvloeistof in één keer erbij doen. Dan wordt het hard en rubberachtig. Beetje bij beetje!",
  },
  {
    id: "fluffy", naam: "Fluffy slijm", emoji: "☁️", activator: "lens",
    kort: "Super zacht en luchtig, net een marshmallow.",
    kleur: ["#ff9ad5", "#ff4fa3", "#fff0f8"], moeilijk: 1, minuten: 15, leeftijd: 6,
    ingredienten: [
      { h: 700, e: "ml", n: "scheerschuim", x: "Ongeveer 3 grote kopjes. Schuim, géén gel." },
      { h: 120, e: "ml", n: "witte PVA-kinderlijm" },
      { h: 1, e: "tl", n: SODA, x: SODA_X },
      { h: 1, e: "el", n: LENS, x: LENS_X + ". Houd er wat extra bij." },
      { h: 3, e: "druppels", n: "kleurstof" },
    ],
    stappen: [
      { i: "🫧", t: "Spuit het scheerschuim in een grote kom." },
      { i: "🥣", t: "Doe de lijm erbij en spatel het er rustig doorheen." },
      { i: "🎨", t: "Doe de kleurstof erbij en roer." },
      { i: "🧂", t: "Strooi de baking soda erover en roer." },
      { i: "💧", t: "Doe de lenzenvloeistof erbij en roer tot het loslaat van de kom.", timer: 60 },
      { i: "🤲", t: "Kneed het 2 minuten tot het lekker fluffy is.", x: "Plakt het? Een paar druppels lenzenvloeistof op je handen.", timer: 120 },
    ],
    tip: "Fluffy slijm zakt na 1 à 2 dagen een beetje in. Speel er dus meteen lekker mee!",
    fout: "Scheerschuim-gel of mentholschuim gebruiken. Pak gewoon wit scheerschuim.",
  },
  {
    id: "glitter", naam: "Glitter crystal slijm", emoji: "💎", activator: "lens",
    kort: "Helder als glas, vol glitters. Vraagt wel geduld.",
    kleur: ["#7fe7ff", "#9b5cff", "#eef9ff"], moeilijk: 2, minuten: 15, leeftijd: 6,
    ingredienten: [
      { h: 120, e: "ml", n: "transparante PVA-lijm", x: "Bv. HEMA kinderlijm transparant of Collall transparant" },
      { h: 120, e: "ml", n: "warm water" },
      { h: 0.5, e: "tl", n: SODA, x: SODA_X },
      { h: 2, e: "el", n: LENS, x: LENS_X },
      { h: 1, e: "el", n: "glitter" },
    ],
    stappen: [
      { i: "♨️", t: "Los de baking soda op in het warme water." },
      { i: "🥣", t: "Doe de lijm erbij en roer heel rustig.", x: "Rustig roeren = minder luchtbelletjes = helderder slijm." },
      { i: "✨", t: "Strooi de glitter erin en roer rustig." },
      { i: "💧", t: "Doe de lenzenvloeistof erbij en blijf rustig roeren tot het een klodder wordt.", timer: 60 },
      { i: "🤲", t: "Kneed het heel even, niet te lang." },
      { i: "📦", t: "Doe het in een afgesloten bakje en laat het 2 tot 5 dagen staan.", x: "Het is eerst troebel. Na een paar dagen zijn de belletjes weg en is het kristalhelder!" },
    ],
    tip: "Gebruik grove glitter of glitterhartjes, die zie je het mooiste in helder slijm.",
    fout: "Hard roeren of lang kneden. Dan blijft het troebel. En niet te vroeg opgeven: het rusten is de truc.",
    klaarTip: "Nu even geduld: zet het bakje 2 tot 5 dagen weg. Daarna is je slijm kristalhelder!",
  },
  {
    id: "butter", naam: "Butter slijm", emoji: "🧈", activator: "lens",
    kort: "Smeerbaar als boter, zacht en stevig tegelijk.",
    kleur: ["#ffe27a", "#ffb84d", "#fffaea"], moeilijk: 2, minuten: 20, leeftijd: 6,
    ingredienten: [
      { h: 120, e: "ml", n: "witte PVA-kinderlijm" },
      { h: 0.5, e: "tl", n: SODA, x: SODA_X },
      { h: 1, e: "el", n: LENS, x: LENS_X },
      { h: 60, e: "ml", n: "zachte luchtdrogende klei", x: "'Soft clay' of 'super light clay'. Géén harde boetseerklei." },
      { h: 1, e: "tl", n: "handcrème (mag ook niet)" },
    ],
    stappen: [
      { i: "🥣", t: "Maak eerst klassiek slijm: lijm in een kom, baking soda erdoor." },
      { i: "💧", t: "Doe de lenzenvloeistof erbij en roer tot het loslaat.", timer: 60 },
      { i: "🤲", t: "Kneed het slijm tot het niet meer plakt.", timer: 120 },
      { i: "🫓", t: "Druk de klei plat als een pannenkoekje." },
      { i: "🌀", t: "Leg het slijm erop, vouw het dicht en kneed tot alles één kleur is.", x: "Een klodder handcrème maakt het extra smeuïg." },
    ],
    tip: "Gekleurde klei geeft meteen een mooie pastelkleur, dan heb je geen kleurstof nodig.",
    fout: "Harde boetseerklei gebruiken. Dan wordt het brokkelig in plaats van boterzacht.",
  },
  {
    id: "crunchy", naam: "Crunchy slijm", emoji: "🍬", activator: "lens",
    kort: "Knispert en kraakt als je erin knijpt.",
    kleur: ["#ffd23f", "#ff6b6b", "#fff6e0"], moeilijk: 1, minuten: 15, leeftijd: 6,
    waarschuwing: "Schuimbolletjes zijn klein. Niet in de buurt van kinderen onder 3 jaar.",
    ingredienten: [
      { h: 120, e: "ml", n: "transparante PVA-lijm" },
      { h: 1, e: "tl", n: SODA, x: SODA_X },
      { h: 3, e: "druppels", n: "kleurstof" },
      { h: 1.5, e: "tl", n: LENS, x: LENS_X },
      { h: 240, e: "ml", n: "schuimbolletjes (foam beads)", x: "Ongeveer 1 kopje" },
    ],
    stappen: [
      { i: "🥣", t: "Doe lijm, baking soda en kleur in een kom en roer." },
      { i: "💧", t: "Doe de lenzenvloeistof erbij en roer tot het loslaat.", timer: 60 },
      { i: "🤲", t: "Kneed het slijm tot het niet meer plakt.", timer: 120 },
      { i: "🍬", t: "Kneed er een derde van de bolletjes door." },
      { i: "🔁", t: "Doe de rest er in 2 keer bij en kneed steeds goed door." },
    ],
    tip: "Meer bolletjes = meer crunch. Maar dan wordt het wel minder rekbaar.",
    fout: "Alle bolletjes tegelijk erbij. Dan vallen ze er weer uit.",
  },
  {
    id: "cloud", naam: "Cloud slijm", emoji: "🌨️", activator: "lens",
    kort: "Smelt als sneeuw tussen je vingers. Heel bijzonder!",
    kleur: ["#c6f0ff", "#6ab8ff", "#f0faff"], moeilijk: 2, minuten: 20, leeftijd: 8,
    ingredienten: [
      { h: 120, e: "ml", n: "witte PVA-kinderlijm" },
      { h: 0.5, e: "tl", n: SODA, x: SODA_X },
      { h: 1, e: "el", n: LENS, x: LENS_X },
      { h: 1, e: "el", n: "instant sneeuwpoeder (insta-snow)", x: "Online te koop (bol.com, Amazon). Spuitsneeuw werkt niet!" },
      { h: null, n: "water voor de sneeuw", x: "Zoveel als op de verpakking staat" },
    ],
    stappen: [
      { i: "🥣", t: "Maak eerst klassiek slijm: lijm, baking soda en lenzenvloeistof.", timer: 60 },
      { i: "🤲", t: "Kneed het tot het niet meer plakt.", timer: 120 },
      { i: "❄️", t: "Maak de sneeuw: doe water bij het poeder zoals op de verpakking staat.", x: "Kijk hoe het groeit!" },
      { i: "🌀", t: "Kneed de sneeuw in kleine beetjes door het slijm.", x: "Het wordt zacht en 'druppelt' als een wolkje." },
    ],
    tip: "Rek het langzaam uit boven een bak en zie het als sneeuw naar beneden vallen.",
    fout: "Sneeuw door slijm doen dat nog niet klaar is. Dan krijg je een plakkerige brij.",
  },
  {
    id: "glow", naam: "Glow-in-the-dark", emoji: "🌙", activator: "lens",
    kort: "Licht op in het donker. Perfect voor een slaapfeestje!",
    kleur: ["#b8ff5e", "#2fd0e0", "#f3ffe6"], moeilijk: 1, minuten: 15, leeftijd: 6,
    ingredienten: [
      { h: 120, e: "ml", n: "transparante PVA-lijm", x: "Witte lijm dempt de gloed" },
      { h: 3, e: "el", n: "glow-in-the-dark verf", x: "Of 1 theelepel glow-poeder" },
      { h: 0.5, e: "tl", n: SODA, x: SODA_X },
      { h: 1, e: "el", n: LENS, x: LENS_X },
    ],
    stappen: [
      { i: "🥣", t: "Doe de lijm in een kom en roer de glow-verf erdoor." },
      { i: "🧂", t: "Roer de baking soda erdoor." },
      { i: "💧", t: "Doe de lenzenvloeistof erbij en roer tot het loslaat.", timer: 60 },
      { i: "🤲", t: "Kneed het slijm tot het niet meer plakt.", timer: 120 },
      { i: "💡", t: "Leg het 10 minuten onder een fel lampje of in de zon om op te laden.", timer: 600 },
      { i: "🌙", t: "Doe het licht uit en kijk wat er gebeurt!" },
    ],
    tip: "Hoe langer je oplaadt onder fel licht, hoe langer het gloeit.",
    fout: "Witte lijm gebruiken of te weinig verf. Dan zie je bijna niks in het donker.",
  },
  {
    id: "kleurwissel", naam: "Kleurwissel slijm", emoji: "🦎", activator: "lens",
    kort: "Verandert van kleur als je het warm maakt met je handen.",
    kleur: ["#ff4fa3", "#9b5cff", "#fbefff"], moeilijk: 2, minuten: 15, leeftijd: 6,
    ingredienten: [
      { h: 120, e: "ml", n: "witte PVA-kinderlijm" },
      { h: 120, e: "ml", n: "water" },
      { h: 0.5, e: "tl", n: "thermochroom pigment", x: "Kleurt bij warmte. Online te koop" },
      { h: 1, e: "druppels", n: "kleurstof in een andere kleur (mag ook niet)" },
      { h: 0.5, e: "tl", n: SODA, x: SODA_X },
      { h: 1.5, e: "el", n: LENS, x: LENS_X },
    ],
    stappen: [
      { i: "🥣", t: "Roer lijm en water door elkaar." },
      { i: "🎨", t: "Roer het pigment en eventueel 1 druppel kleurstof erdoor." },
      { i: "🧂", t: "Roer de baking soda erdoor." },
      { i: "💧", t: "Doe de lenzenvloeistof erbij en roer tot het loslaat.", timer: 60 },
      { i: "🤲", t: "Kneed het tot het niet meer plakt.", timer: 120 },
      { i: "🔥", t: "Pak het stevig vast met warme handen en kijk hoe de kleur verandert!", x: "Leg het daarna even in de koelkast en probeer het opnieuw." },
    ],
    tip: "Leg het slijm op een koud bord en druk je hand erop: je ziet je handafdruk in een andere kleur!",
    fout: "Te veel kleurstof. Dan zie je de kleurwissel niet meer.",
  },
  {
    id: "jelly", naam: "Jelly cube slijm", emoji: "🧊", activator: "lens",
    kort: "Vol zachte blokjes die knijpen en ploppen.",
    kleur: ["#5ef2a8", "#2fd0e0", "#e8fffb"], moeilijk: 2, minuten: 20, leeftijd: 6,
    ingredienten: [
      { h: 120, e: "ml", n: "transparante PVA-lijm" },
      { h: 1.5, e: "tl", n: SODA, x: SODA_X },
      { h: 4, e: "druppels", n: "kleurstof" },
      { h: 2.25, e: "tl", n: LENS, x: LENS_X },
      { h: 0.25, e: "", n: "wondersponsje (melaminespons)", x: "Een kwart sponsje, in blokjes van 1 cm geknipt", vast: true },
    ],
    stappen: [
      { i: "✂️", t: "Knip het stukje spons in kleine blokjes van ongeveer 1 cm.", x: "Laat een volwassene helpen met knippen." },
      { i: "🥣", t: "Doe lijm, baking soda en kleur in een kom en roer." },
      { i: "💧", t: "Doe de lenzenvloeistof erbij en roer tot het loslaat.", timer: 60 },
      { i: "🤲", t: "Kneed het tot het niet meer plakt.", timer: 120 },
      { i: "🧊", t: "Vouw de blokjes er in kleine beetjes door." },
    ],
    tip: "Knijp de blokjes in het slijm voor dat heerlijke 'plop'-geluid.",
    fout: "Te grote blokjes of te veel tegelijk. Dan scheurt het slijm.",
  },
  {
    id: "icee", naam: "Slush slijm", emoji: "🍧", activator: "lens",
    kort: "Ziet eruit als een ijskoude slush-puppy.",
    kleur: ["#ff6b8b", "#6ab8ff", "#fff0f4"], moeilijk: 2, minuten: 20, leeftijd: 8,
    ingredienten: [
      { h: 240, e: "ml", n: "transparante PVA-lijm" },
      { h: 60, e: "ml", n: "water" },
      { h: 0.25, e: "tl", n: SODA, x: SODA_X },
      { h: 3, e: "druppels", n: "kleurstof (rood of blauw)" },
      { h: 2, e: "tl", n: LENS, x: LENS_X },
      { h: 2, e: "el", n: "aangemaakte instant sneeuw", x: "Insta-snow met water" },
    ],
    stappen: [
      { i: "🥣", t: "Roer lijm, water, baking soda en kleur door elkaar." },
      { i: "💧", t: "Doe 1 theelepel lenzenvloeistof erbij en roer." },
      { i: "💧", t: "Doe de tweede theelepel erbij en roer tot het loslaat.", timer: 60 },
      { i: "🤲", t: "Kneed het tot het niet meer plakt.", timer: 120 },
      { i: "❄️", t: "Kneed de sneeuw er luchtig door. Klaar is je slush!" },
    ],
    tip: "Doe het in een plastic bekertje met een rietje erin, dan lijkt het echt!",
    fout: "Alle lenzenvloeistof in één keer. Doe het per theelepel.",
    klaarTip: "Hij lijkt echt, maar niet opdrinken hoor! 😄 Bewaar hem in een afgesloten bakje.",
  },
  {
    id: "magnetisch", naam: "Magnetisch slijm", emoji: "🧲", activator: "lens",
    kort: "Zwart slijm dat een magneet 'opeet'. Echte wetenschap!",
    kleur: ["#4a4a6a", "#1b0b3f", "#eeeef5"], moeilijk: 3, minuten: 20, leeftijd: 8,
    waarschuwing: "Alleen met een volwassene. Sterke magneten zijn levensgevaarlijk als ze worden ingeslikt. Nooit in de buurt van kleine kinderen.",
    ingredienten: [
      { h: 120, e: "ml", n: "witte PVA-kinderlijm" },
      { h: 0.5, e: "tl", n: SODA, x: SODA_X },
      { h: 1, e: "el", n: LENS, x: LENS_X },
      { h: 2, e: "el", n: "zwart ijzeroxidepoeder", x: "Volwassene doet dit erbij, met handschoenen" },
      { h: 1, e: "", n: "sterke neodymium-magneet", vast: true },
    ],
    stappen: [
      { i: "🥣", t: "Maak klassiek slijm: lijm, baking soda en lenzenvloeistof.", timer: 60 },
      { i: "🤲", t: "Kneed het tot het niet meer plakt.", timer: 120 },
      { i: "🧤", t: "Volwassene: doe handschoenen aan, maak een kuiltje in het slijm en doe het poeder erin zonder te stuiven." },
      { i: "🌀", t: "Vouw het dicht en kneed tot alles mooi zwart is." },
      { i: "🧲", t: "Leg het slijm plat en houd de magneet er langzaam vlakbij. Kijk wat er gebeurt!" },
    ],
    tip: "Laat de magneet een nachtje in het slijm liggen: de volgende ochtend heeft het slijm hem helemaal 'opgegeten'.",
    fout: "Te weinig ijzerpoeder. Dan beweegt het slijm bijna niet.",
  },
  {
    id: "chia", naam: "Chiazaad-slijm", emoji: "🐸", activator: "geen",
    kort: "Zonder lijm en zonder activator. Veilig voor kleine kinderen.",
    kleur: ["#9be15d", "#00b37a", "#efffe6"], moeilijk: 1, minuten: 10, leeftijd: 2,
    waarschuwing: "Een hapje kan geen kwaad, maar het is geen eten. Veel chiazaad kan buikpijn geven. Na 1 dag weggooien.",
    ingredienten: [
      { h: 2, e: "el", n: "chiazaad", x: "Ongeveer 20 gram" },
      { h: 210, e: "ml", n: "water" },
      { h: 200, e: "g", n: "maizena", x: "Houd wat extra bij" },
      { h: 2, e: "druppels", n: "levensmiddelenkleurstof" },
    ],
    stappen: [
      { i: "🥣", t: "Roer het chiazaad, water en de kleurstof door elkaar in een kom." },
      { i: "🧊", t: "Zet de kom 1 uur in de koelkast en roer daarna even.", timer: 3600 },
      { i: "😴", t: "Zet het nog minstens 3 uur terug in de koelkast. Een nachtje mag ook.", x: "Hoe langer, hoe slijmeriger!" },
      { i: "🌾", t: "Doe de maizena er beetje bij beetje bij en meng het.", x: "Stop als het niet meer aan je handen plakt." },
      { i: "🐸", t: "Kneden, rekken en spelen maar!" },
    ],
    tip: "Maak het 's avonds klaar en zet het in de koelkast, dan kan er 's ochtends meteen mee gespeeld worden.",
    fout: "Te kort laten weken. Dan wordt het niet slijmerig.",
  },
  {
    id: "oobleck", naam: "Toverslijm (oobleck)", emoji: "🪄", activator: "geen",
    kort: "Hard als je erop slaat, vloeibaar als je het laat lopen!",
    kleur: ["#ffd23f", "#ff9f1c", "#fff8e0"], moeilijk: 1, minuten: 5, leeftijd: 3,
    ingredienten: [
      { h: 250, e: "g", n: "maizena" },
      { h: 125, e: "ml", n: "water", x: "Misschien iets meer, tot 150 ml" },
      { h: 2, e: "druppels", n: "levensmiddelenkleurstof (mag ook niet)" },
    ],
    stappen: [
      { i: "🌾", t: "Doe de maizena in een grote kom." },
      { i: "🎨", t: "Doe de kleurstof in het water." },
      { i: "💧", t: "Giet het water er beetje bij beetje bij en meng met je handen.", x: "Stop als het voelt als dikke vla." },
      { i: "👊", t: "Sla er snel op met je vuist: het is hard! Laat het nu langzaam door je vingers lopen.", x: "Dit heet een 'niet-newtonse vloeistof'. Echte wetenschap!" },
    ],
    tip: "Probeer een balletje te rollen. Zodra je stopt, smelt het weer weg!",
    fout: "Al het water tegelijk erbij. Dan wordt het soep. Te dun? Gewoon wat maizena erbij.",
    klaarTip: "Gooi oobleck nooit door de gootsteen, dat kan verstoppen. Laat het drogen en gooi het in de vuilnisbak.",
  },
];

const PROBLEMEN = [
  {
    i: "🍯", titel: "Mijn slijm is te plakkerig",
    waarom: "Het slijm is nog niet genoeg geactiveerd, of je hebt nog niet lang genoeg gekneed.",
    doe: ["Kneed eerst nog 1 à 2 minuten door. Vaak is dat al genoeg.", "Doe een paar druppels lenzenvloeistof op je handen (niet in de kom) en kneed.", "Herhaal dit tot het niet meer plakt. Steeds een klein beetje!"],
  },
  {
    i: "🧱", titel: "Te hard, rubberachtig of het scheurt",
    waarom: "Er is te veel activator in gegaan.",
    doe: ["Dompel het slijm ongeveer 20 seconden in warm water en kneed het.", "Kneed er een klodder handcrème door.", "Nog steeds hard? Kneed er een scheutje lijm doorheen."],
  },
  {
    i: "💧", titel: "Het blijft waterig",
    waarom: "Te weinig activator, of de lijm bevat geen PVA.",
    doe: ["Doe er een halve theelepel lenzenvloeistof bij en roer goed.", "Herhaal tot het loslaat van de kom.", "Kijk op het etiket van de lijm: er moet PVA in zitten. Lijmstift werkt niet."],
  },
  {
    i: "🤷", titel: "Er gebeurt helemaal niks",
    waarom: "Bijna altijd: lenzenvloeistof zonder boorzuur, of bakpoeder in plaats van baking soda.",
    doe: ["Kijk op de lenzenvloeistof: staat er 'boorzuur', 'boric acid' of 'borax' op? Zo niet, dan werkt het niet.", "Gebruikte je bakpoeder? Dat is iets anders dan baking soda (zuiveringszout).", "Check of je lijm PVA-lijm is (witte of transparante kinderlijm)."],
  },
  {
    i: "😵", titel: "Mijn oude slijm is hard geworden",
    waarom: "Het is uitgedroogd, bijvoorbeeld omdat het bakje open stond.",
    doe: ["Kneed er wat warm water door, een beetje tegelijk.", "Of kneed er een klodder handcrème door.", "Doe er géén extra lenzenvloeistof bij: dat maakt het juist harder."],
  },
  {
    i: "🦠", titel: "Er zit schimmel op of het stinkt",
    waarom: "Bacteriën van vieze handen of het bakje stond open.",
    doe: ["Weggooien. Schimmelslijm kun je niet redden.", "Speel voortaan met schoon gewassen handen.", "Bewaar het in een goed afgesloten bakje."],
  },
  {
    i: "📦", titel: "Hoe bewaar ik mijn slijm?",
    doe: ["In een luchtdicht bakje of zakje met ritssluiting.", "Zo blijft het 1 tot 3 weken goed. In de koelkast nog langer.", "Chiaslijm en toverslijm: na 1 dag weggooien."],
  },
  {
    i: "👕", titel: "Slijm in mijn kleren",
    doe: ["Haal eerst zo veel mogelijk eraf met je vingers.", "Laat de plek 5 minuten weken in witte azijn.", "Spoel uit met warm water en was het daarna gewoon in de wasmachine."],
  },
  {
    i: "🛋️", titel: "Slijm in het tapijt of de bank",
    doe: ["Pluk de grootste stukken eraf.", "Spray een mengsel van 2 delen azijn en 1 deel water op de plek.", "Laat het even intrekken, borstel het los en dep het droog met een doek."],
  },
];

const BASIS = [
  { i: "🍝", titel: "Lijm is spaghetti", tekst: "PVA-lijm zit vol lange, glibberige sliertjes (polymeren). Ze glijden langs elkaar, daarom is lijm vloeibaar." },
  { i: "🔗", titel: "De activator knoopt ze vast", tekst: "Boorzuur uit de lenzenvloeistof maakt bruggetjes tussen de sliertjes. Zo wordt de vloeibare lijm een rekbaar netwerk: slijm!" },
  { i: "🧂", titel: "Waarom baking soda?", tekst: "Baking soda zorgt dat het boorzuur zijn werk kan doen. Zonder baking soda werkt lenzenvloeistof bijna niet." },
  { i: "⚖️", titel: "Beetje bij beetje", tekst: "Te weinig activator = plakkerig. Te veel = rubber. Daarom doe je de laatste beetjes op je handen, dan kun je het precies goed krijgen." },
  { i: "🤲", titel: "Kneden is toveren", tekst: "Slijm plakt altijd eerst. Door 2 minuten te kneden maken de sliertjes meer bruggetjes en wordt het vanzelf mooier." },
  { i: "🪄", titel: "Toverslijm is anders", tekst: "Maizena met water is geen netwerk maar een 'niet-newtonse vloeistof': hard als je hard duwt, vloeibaar als je zacht bent." },
];

const ACTIVATORS = [
  { naam: "✅ Lenzenvloeistof + baking soda", hoe: "1 el lenzenvloeistof + ½ tl baking soda per flesje lijm", voor: "Alle recepten. Onze favoriet!", let: "Er moet 'boorzuur' of 'borax' op het etiket staan. Bv. Etos All-in-1 of Biotrue. Kruidvat Opticare heeft géén boorzuur." },
  { naam: "🟡 Kant-en-klare slime activator", hoe: "Volgens de verpakking", voor: "Handig, zit ook in slijmpakketjes", let: "Kies een product met CE-keurmerk." },
  { naam: "🔴 Boraxpoeder", hoe: "Niet aanbevolen", voor: "-", let: "In de EU aangemerkt als schadelijk. De meeste huidproblemen door slijm komen van borax." },
  { naam: "🔴 Wasmiddel", hoe: "Niet aanbevolen", voor: "-", let: "Werkt alleen als er borax in zit (vaak niet meer). Kan de huid irriteren." },
];

const LIJM = [
  "Witte of transparante PVA-kinderlijm werkt het beste.",
  "Witte kinderlijm of schoollijm van HEMA, Action of Collall wordt het meest gebruikt.",
  "HEMA kinderlijm transparant en Collall kinderlijm transparant zijn goed voor helder slijm.",
  "Lijmstiften en secondelijm werken NIET.",
  "Witte lijm = romig slijm. Transparante lijm = helder slijm.",
];

const VEILIG = [
  { i: "🧑‍🍳", titel: "Altijd met een volwassene", tekst: "Een volwassene doet de activator erbij. Kinderen vanaf 6 jaar mogen zelf maken met iemand in de buurt." },
  { i: "👶", titel: "Kleine kinderen", tekst: "Onder de 3 jaar alleen chiazaad-slijm of toverslijm. Tussen 3 en 5 jaar doet de volwassene de activator erbij." },
  { i: "🚫", titel: "Niet eten", tekst: "Slijm met lijm is nooit eetbaar, ook al ruikt of lijkt het lekker. Houd het weg bij kleine broertjes, zusjes en huisdieren." },
  { i: "🧼", titel: "Handen wassen", tekst: "Was je handen voor én na het spelen. Dan blijft je slijm ook langer mooi." },
  { i: "🩹", titel: "Pas op je huid", tekst: "Niet spelen met eczeem of wondjes aan je handen. Rode of jeukende handen? Stoppen en goed afspoelen met water." },
  { i: "🧪", titel: "Lenzenvloeistof, geen borax", tekst: "Het RIVM onderzocht zelfgemaakt slijm met lenzenvloeistof en zag geen risico. Boraxpoeder en wasmiddel raden we af." },
  { i: "🧲", titel: "Magneten en bolletjes", tekst: "Sterke magneten en schuimbolletjes zijn gevaarlijk als ze worden ingeslikt. Niet in de buurt van jonge kinderen." },
  { i: "🗑️", titel: "Weggooien", tekst: "Slijm in de vuilnisbak, niet door de gootsteen of wc. Schimmel of vieze geur? Meteen weggooien." },
];

// ---------- WINKELS & WEBSHOPS (gecontroleerd 05-10-2026) ----------
const q = (t) => encodeURIComponent(t).replace(/%20/g, "+");
const WINKELS = {
  action: { naam: "Action", zoek: (t) => `https://www.action.com/nl-nl/search/?q=${q(t)}` },
  hema: { naam: "HEMA", zoek: (t) => `https://www.hema.nl/search?q=${q(t)}` },
  etos: { naam: "Etos", zoek: (t) => `https://www.etos.nl/search/?q=${q(t)}` },
  kruidvat: { naam: "Kruidvat", zoek: (t) => `https://www.kruidvat.nl/search?q=${q(t)}&text=${q(t)}` },
  ah: { naam: "Albert Heijn", zoek: (t) => `https://www.ah.nl/zoeken?query=${q(t)}` },
  jumbo: { naam: "Jumbo", zoek: (t) => `https://www.jumbo.com/producten/?searchType=keyword&searchTerms=${q(t)}` },
  xenos: { naam: "Xenos", zoek: (t) => `https://www.xenos.nl/search?q=${q(t)}` },
  intertoys: { naam: "Intertoys", zoek: (t) => `https://www.intertoys.nl/search?text=${q(t)}` },
  bol: { naam: "bol.com", zoek: (t) => `https://www.bol.com/nl/nl/s/?searchtext=${q(t)}` },
  amazon: { naam: "Amazon", zoek: (t) => `https://www.amazon.nl/s?k=${q(t)}` },
  ecotastisch: { naam: "Ecotastisch", zoek: (t) => `https://www.ecotastisch.nl/search?q=${q(t)}` },
};

// winkels: fysieke winkels, beste eerst. links: gecontroleerde productpagina's. zoekIn: extra zoeklinks.
const ARTIKELEN = {
  lijm_wit: {
    naam: "Witte PVA-kinderlijm", emoji: "🧴", winkels: ["hema", "action", "xenos"], zoek: "kinderlijm wit",
    let: "Op het etiket moet PVA of 'op waterbasis' staan. Groot gezin? Een literfles is voordeliger.",
    links: [
      { w: "bol", url: "https://www.bol.com/nl/nl/p/lijm-wit-op-waterbasis-1-liter-ook-voor-drakenslijm-of-smurfensnot/9200000090032706/", prijs: "1 liter" },
    ],
    zoekIn: ["hema", "action"],
  },
  lijm_helder: {
    naam: "Transparante PVA-lijm", emoji: "🫙", winkels: ["hema"], zoek: "kinderlijm transparant",
    links: [
      { w: "hema", url: "https://www.hema.nl/speelgoed-hobby/knutselen/lijm/kinderlijm-200ml-15900626.html", prijs: "€3,69" },
      { w: "bol", url: "https://www.bol.com/nl/nl/p/collall-kinderlijm-transparant-1000-ml-geschikt-voor-het-maken-van-slijm/9200000066094139/", prijs: "± €15 / liter" },
    ],
  },
  soda: {
    naam: "Baking soda (zuiveringszout)", emoji: "🧂", winkels: ["ah", "jumbo"], zoek: "baking soda",
    let: "Niet verwarren met bakpoeder, kristalsoda of zilversoda! Arm & Hammer is de bekendste.",
    links: [
      { w: "jumbo", url: "https://www.jumbo.com/producten/arm-hammer-pure-baksoda-454-g-580764DS", prijs: "€1,89" },
      { w: "ah", url: "https://www.ah.nl/producten/product/wi386329/arm-en-hammer-pure-baking-soda" },
    ],
  },
  lens: {
    naam: "Lenzenvloeistof met boorzuur", emoji: "💧", winkels: ["etos", "ah"], zoek: "lenzenvloeistof all-in-1",
    let: "Etos All-in-1 heeft boorzuur (ook bij AH te koop). Kruidvat Opticare NIET. Twijfel? Kijk of er 'boorzuur' of 'borax' op staat.",
    links: [
      { w: "etos", url: "https://www.etos.nl/producten/etos-zachte-lenzen-all-in-1-vloeistof-360-ml-120288475.html", prijs: "€5,12" },
      { w: "kruidvat", url: "https://www.kruidvat.nl/bausch-lomb-biotrue-multi-purpose-solution-lenzenvloeistof/p/6356215", prijs: "Biotrue ± €15" },
    ],
  },
  kleur: {
    naam: "Kleurstof", emoji: "🎨", winkels: ["jumbo", "ah"], zoek: "kleurstof dr oetker",
    let: "Levensmiddelenkleurstof uit de bakafdeling werkt prima.",
    links: [{ w: "jumbo", url: "https://www.jumbo.com/producten/dr-oetker-kleurstofstiften-rood-geel-blauw-45-g-515060DS", prijs: "€2,99" }],
    zoekIn: ["ah"],
  },
  glitter: {
    naam: "Glitter", emoji: "✨", winkels: ["action", "hema"], zoek: "glitter",
    links: [{ w: "action", url: "https://www.action.com/nl-nl/p/3210785/decotime-glitterbuisjes/", prijs: "€1,99" }],
    zoekIn: ["hema"],
  },
  scheerschuim: {
    naam: "Scheerschuim (wit, geen gel)", emoji: "🫧", winkels: ["action", "etos", "kruidvat", "jumbo", "ah"], zoek: "scheerschuim",
    links: [
      { w: "action", url: "https://www.action.com/nl-nl/p/3223019/silea-scheerschuim/", prijs: "€2,22" },
      { w: "etos", url: "https://www.etos.nl/producten/de-vergulde-hand-scheerschuim-250-ml-120351121.html", prijs: "€4,29" },
    ],
  },
  klei: {
    naam: "Zachte luchtdrogende klei", emoji: "🧈", winkels: ["action", "hema"], zoek: "air clay",
    let: "Neem zachte 'air clay'. Geen polymeerklei (die moet de oven in) en geen harde boetseerklei.",
    links: [{ w: "hema", url: "https://www.hema.nl/speelgoed-hobby/knutselen/klei/zachte-klei-pastel---4-stuks-15930037.html" }],
    zoekIn: ["action"],
  },
  bolletjes: {
    naam: "Schuimbolletjes (foam beads)", emoji: "🍬", winkels: [], zoek: "slijm foam beads",
    zoekIn: ["amazon", "bol"],
  },
  sneeuw: {
    naam: "Instant sneeuwpoeder", emoji: "❄️", winkels: [], zoek: "instant snow poeder",
    let: "Spuitsneeuw uit de winkel werkt niet, het moet poeder zijn dat opzwelt met water.",
    links: [
      { w: "amazon", url: "https://www.amazon.nl/dp/B081QNRW5S", prijs: "€11,99" },
      { w: "bol", url: "https://www.bol.com/nl/nl/p/tuban-tuban-valse-sneeuw-500-ml/9300000164078373/", prijs: "€14,50" },
    ],
  },
  glow: {
    naam: "Glow-in-the-dark poeder of verf", emoji: "🌙", winkels: [], zoek: "glow in the dark poeder",
    links: [{ w: "bol", url: "https://www.bol.com/nl/nl/p/s-d-glow-in-the-dark-poeder-50-gram-groen-geel-mengbasis-verf-fluorescerend/9300000232354102/", prijs: "€14,95" }],
    zoekIn: ["amazon"],
  },
  thermo: {
    naam: "Thermochroom pigment", emoji: "🦎", winkels: [], zoek: "thermochroom pigment",
    links: [{ w: "amazon", url: "https://www.amazon.nl/dp/B0CDXN91FV", prijs: "€9,29" }],
    zoekIn: ["bol"],
  },
  ijzer: {
    naam: "Zwart ijzeroxidepoeder", emoji: "⚫", winkels: [], zoek: "ijzeroxide zwart poeder",
    links: [{ w: "amazon", url: "https://www.amazon.nl/dp/B096W9HJZ6", prijs: "€3,11" }],
  },
  magneet: {
    naam: "Neodymium-magneet", emoji: "🧲", winkels: [], zoek: "neodymium magneet",
    let: "Bewaar hem altijd buiten bereik van kleine kinderen.",
    links: [{ w: "amazon", url: "https://www.amazon.nl/dp/B0BXM2K6S7", prijs: "€6,49" }],
  },
  spons: {
    naam: "Wondersponsje (melaminespons)", emoji: "🧽", winkels: ["action", "ah", "jumbo", "kruidvat"], zoek: "wonderspons",
    links: [{ w: "action", url: "https://www.action.com/nl-nl/p/3217021/mr-proper-wondersponzen/", prijs: "€2,99" }],
  },
  chia: {
    naam: "Chiazaad", emoji: "🌱", winkels: ["action", "jumbo", "ah"], zoek: "chiazaad",
    links: [
      { w: "action", url: "https://www.action.com/nl-nl/p/2572286/natural-happiness-chiazaad/", prijs: "€1,33" },
      { w: "jumbo", url: "https://www.jumbo.com/producten/jumbo-chiazaad-biologisch-275-g-483735ZK", prijs: "€3,99" },
    ],
  },
  maizena: {
    naam: "Maizena", emoji: "🌾", winkels: ["ah", "jumbo"], zoek: "maizena",
    links: [{ w: "jumbo", url: "https://www.jumbo.com/producten/koopmans-maizena-250-g-430613PAK", prijs: "€1,49" }],
    zoekIn: ["ah"],
  },
};

// koppelt een ingrediëntnaam uit de recepten aan een artikel
const ARTIKEL_VAN = [
  [/witte PVA/i, "lijm_wit"], [/transparante PVA/i, "lijm_helder"], [/baking soda/i, "soda"],
  [/lenzenvloeistof/i, "lens"], [/kleurstof/i, "kleur"], [/glitter/i, "glitter"], [/scheerschuim/i, "scheerschuim"],
  [/klei/i, "klei"], [/schuimbolletjes/i, "bolletjes"], [/instant sneeuw/i, "sneeuw"], [/glow/i, "glow"],
  [/thermochroom/i, "thermo"], [/ijzeroxide/i, "ijzer"], [/magneet/i, "magneet"], [/spons/i, "spons"],
  [/chiazaad/i, "chia"], [/maizena/i, "maizena"],
];
const artikelVan = (naam) => (ARTIKEL_VAN.find(([re]) => re.test(naam)) || [])[1] || null;

const PAKKETTEN = [
  { naam: "Slijmset 4 kleuren + activator", w: "ecotastisch", url: "https://www.ecotastisch.nl/products/slijmset-4-kleuren-en-activator", prijs: "€18,95", uitleg: "Lijm en activator in één doos, genoeg voor een middag met vriendjes." },
  { naam: "Kant-en-klare slime activator", w: "ecotastisch", url: "https://www.ecotastisch.nl/products/slijm-activator", prijs: "€3,95", uitleg: "Als je geen goede lenzenvloeistof kunt vinden." },
  { naam: "Slijmpakketten bij Intertoys", w: "intertoys", url: "https://www.intertoys.nl/knutselartikelen/slijm", uitleg: "Ook in de winkel te koop." },
];
