"use strict";
// Recepten gebaseerd op vergelijking van o.a. Elmer's, Arm & Hammer, HEMA, Little Bins for Little Hands,
// One Little Project, Best Ideas for Kids, RIVM-beoordeling borax in slijm (2019). Zie README.md.

const LENS = "lenzenvloeistof met boorzuur";
const LENS_X = "Op het etiket moet 'boorzuur' of 'borax' staan (bv. Etos All-in-1 of Biotrue). Kruidvat Opticare en de Jumbo all-in-one (zachte én harde lenzen) werken níet: daar zit geen boorzuur in";
const SODA = "baking soda (zuiveringszout)";
const SODA_X = "Geen bakpoeder! Dat is iets anders.";

const RECEPTEN = [
  {
    id: "klassiek", naam: "Klassiek slijm", emoji: "🟢", activator: "lens",
    kort: "Het officiële basisrecept van lijmmaker Elmer's. Lukt dit, dan lukt alles!",
    kleur: ["#5ef2a8", "#20c997", "#e6fff6"], moeilijk: 1, minuten: 10, leeftijd: 6,
    bron: [{ naam: "Elmer's (officieel recept)", url: "https://www.survivingateacherssalary.com/diy-worry-free-slime-recipe-kids-elmers-recipe/" }],
    bewijs: "114 reacties, veel 'werkte perfect'. Mislukte het, dan zat er geen boorzuur in de lenzenvloeistof",
    ingredienten: [
      { h: 118, e: "ml", n: "witte PVA-kinderlijm", x: "Moet PVA zijn, anders wordt het geen slijm. Wit geeft romig slijm. 1 flesje van ± 120 ml." },
      { h: 0.5, e: "el", n: SODA, x: SODA_X },
      { h: 1, e: "el", n: LENS, x: LENS_X + ". Houd er nog wat extra bij." },
      { h: 2, e: "druppels", n: "kleurstof (mag ook niet)" },
    ],
    stappen: [
      { i: "🥣", t: "Doe de lijm in een kom." },
      { i: "🧂", t: "Roer er een halve eetlepel baking soda door." },
      { i: "🎨", t: "Roer de kleurstof erdoor (mag ook niet)." },
      { i: "💧", t: "Doe 1 eetlepel lenzenvloeistof erbij en roer tot het stug wordt.", timer: 60 },
      { i: "🤲", t: "Haal het uit de kom en kneed het met twee handen.", x: "Het plakt eerst. Dat is normaal! Gewoon doorkneden.", timer: 120 },
      { i: "💦", t: "Nog te plakkerig? Doe er een kwart eetlepel lenzenvloeistof bij en kneed opnieuw.", x: "Herhaal tot het niet meer plakt. Steeds een klein beetje!" },
    ],
    tip: "Te plakkerig? Steeds een kwart eetlepel lenzenvloeistof erbij en goed kneden.",
    fout: "Lenzenvloeistof zonder boorzuur gebruiken. Dan wordt het nooit slijm. En niet alles in één keer erbij doen.",
  },
  {
    id: "fluffy", naam: "Fluffy slijm", emoji: "☁️", activator: "lens",
    kort: "Super zacht en luchtig, net een marshmallow.",
    kleur: ["#ff9ad5", "#ff4fa3", "#fff0f8"], moeilijk: 1, minuten: 15, leeftijd: 6,
    bron: [{ naam: "Best Ideas for Kids", url: "https://www.thebestideasforkids.com/fluffy-slime-recipe/" }],
    bewijs: "4,95 van 5 sterren uit 128 beoordelingen en 234 reacties",
    ingredienten: [
      { h: 160, e: "ml", n: "witte PVA-kinderlijm", x: "Moet PVA zijn. Dit recept is getest met witte lijm, dat geeft romig slijm." },
      { h: 60, e: "ml", n: "water" },
      { h: 0.5, e: "tl", n: SODA, x: SODA_X },
      { h: 600, e: "ml", n: "scheerschuim", x: "480 tot 720 ml (2 à 3 kopjes). Schuim, géén gel." },
      { h: 1.5, e: "el", n: LENS, x: LENS_X },
      { h: 3, e: "druppels", n: "kleurstof" },
    ],
    stappen: [
      { i: "🥣", t: "Doe de lijm in een grote kom." },
      { i: "🚰", t: "Doe het water en de baking soda erbij en roer." },
      { i: "🫧", t: "Spuit het scheerschuim erbij en roer het er rustig door." },
      { i: "🎨", t: "Roer de kleurstof erdoor." },
      { i: "💧", t: "Doe 1 eetlepel lenzenvloeistof erbij en roer tot het een klodder wordt." },
      { i: "🤲", t: "Kneed het 5 minuten.", x: "Plakken tijdens het kneden is normaal.", timer: 300 },
      { i: "💦", t: "Doe de laatste halve eetlepel lenzenvloeistof erbij en kneed tot het niet meer plakt." },
    ],
    tip: "Plakt het nog? Een beetje babyolie of handcrème op je handen helpt. Of 1 theelepel lenzenvloeistof extra.",
    fout: "Te veel lenzenvloeistof. Dan wordt het hard. En scheerschuim-gel werkt niet, pak gewoon wit scheerschuim.",
  },
  {
    id: "glitter", naam: "Glitterslijm", emoji: "💎", activator: "lens",
    kort: "Doorzichtig slijm vol glitters.",
    kleur: ["#7fe7ff", "#9b5cff", "#eef9ff"], moeilijk: 1, minuten: 15, leeftijd: 6,
    bron: [
      { naam: "Little Bins for Little Hands", url: "https://littlebinsforlittlehands.com/how-to-make-saline-solution-slime-recipe/" },
      { naam: "hun glitterversie", url: "https://littlebinsforlittlehands.com/how-to-make-glitter-slime-recipe/" },
    ],
    bewijs: "257 reacties, waaronder 'this worked perfectly for us'",
    ingredienten: [
      { h: 120, e: "ml", n: "transparante PVA-lijm", x: "Moet PVA zijn. Transparant geeft doorzichtig slijm, mooi met glitter. Bv. HEMA kinderlijm (2 flesjes van 100 ml)." },
      { h: 120, e: "ml", n: "water" },
      { h: 0.5, e: "tl", n: SODA, x: SODA_X + " Een kwart theelepel mag ook." },
      { h: 1, e: "el", n: LENS, x: LENS_X },
      { h: null, n: "glitter", x: "Zoveel als je mooi vindt" },
    ],
    stappen: [
      { i: "🥣", t: "Roer de lijm en het water goed door elkaar." },
      { i: "✨", t: "Roer de glitter erdoor." },
      { i: "🧂", t: "Roer de baking soda erdoor." },
      { i: "💧", t: "Doe langzaam 1 eetlepel lenzenvloeistof erbij en roer.", timer: 60 },
      { i: "🤲", t: "Kneed het 3 à 5 minuten.", timer: 240 },
    ],
    tip: "Nog te plakkerig? Een klein beetje extra lenzenvloeistof en goed doorkneden.",
    fout: "Te snel te veel lenzenvloeistof. Dan wordt het rubber. Beetje bij beetje!",
  },
  {
    id: "glow", naam: "Glow-in-the-dark", emoji: "🌙", activator: "lens",
    kort: "Licht op in het donker. Perfect voor een slaapfeestje!",
    kleur: ["#b8ff5e", "#2fd0e0", "#f3ffe6"], moeilijk: 1, minuten: 10, leeftijd: 6,
    bron: [
      { naam: "Elmer's (officieel recept)", url: "https://www.elmers.com/glow-dark-slime-recipe.html" },
      { naam: "One Crazy Mom", url: "https://www.onecrazymom.com/glow-in-the-dark-slime/" },
    ],
    bewijs: "Het officiële recept van de lijmmaker, met dezelfde verhouding als het klassieke Elmer's-recept",
    ingredienten: [
      { h: 148, e: "ml", n: "Elmer's Glow in the Dark lijm", x: "1 fles. In Nederland online te koop via bol.com", vast: true },
      { h: 0.5, e: "el", n: SODA, x: SODA_X, vast: true },
      { h: 1, e: "el", n: LENS, x: LENS_X + ". Houd er nog wat extra bij.", vast: true },
    ],
    stappen: [
      { i: "🥣", t: "Doe de hele fles glow-lijm in een kom." },
      { i: "🧂", t: "Roer er een halve eetlepel baking soda door." },
      { i: "💧", t: "Doe 1 eetlepel lenzenvloeistof erbij en meng tot het slijm wordt.", timer: 60 },
      { i: "🤲", t: "Kneed het met twee handen.", timer: 120 },
      { i: "💦", t: "Nog te plakkerig? Doe er een kwart eetlepel lenzenvloeistof bij en kneed opnieuw." },
      { i: "🌙", t: "Leg het even onder een lamp, doe het licht uit en kijk wat er gebeurt!" },
    ],
    tip: "Niet elk merk lenzenvloeistof werkt even goed. Werkt het niet? Kijk of er boorzuur in zit.",
    fout: "Gewone lijm met glowverf gebruiken. Daar is geen bewezen recept voor, gebruik echt de glow-lijm.",
  },
  {
    id: "chia", naam: "Chiazaad-slijm", emoji: "🐸", activator: "geen",
    kort: "Zonder lijm en zonder activator. Proefveilig voor kleine kinderen.",
    kleur: ["#9be15d", "#00b37a", "#efffe6"], moeilijk: 1, minuten: 15, leeftijd: 2,
    bron: [
      { naam: "The Craft at Home Family", url: "https://thecraftathomefamily.com/taste-safe-chia-seed-slime/" },
      { naam: "Mothercould", url: "https://www.mothercould.com/posts/chiaseedslime" },
    ],
    bewijs: "Positieve reacties van ouders en een kinderopvang, zelfde verhouding bij Mothercould",
    waarschuwing: "Proefveilig, maar geen eten: het smaakt niet lekker en veel chiazaad kan buikpijn geven.",
    ingredienten: [
      { h: 60, e: "ml", n: "chiazaad", x: "¼ kopje" },
      { h: 420, e: "ml", n: "water" },
      { h: 15, e: "druppels", n: "levensmiddelenkleurstof", x: "10 tot 20 druppels" },
      { h: 840, e: "ml", n: "maizena", x: "720 tot 840 ml (3 à 3½ kopje). Afmeten met een maatbeker." },
    ],
    stappen: [
      { i: "🥣", t: "Roer het chiazaad en het water door elkaar." },
      { i: "🎨", t: "Doe de kleurstof erbij en roer." },
      { i: "🧊", t: "Dek het af en zet het 3 à 4 uur (of een nacht) in de koelkast.", x: "Het is klaar als het dik en slijmerig is." },
      { i: "🌾", t: "Doe er 240 ml maizena bij en roer met een lepel. Daarna nog eens 240 ml en weer roeren." },
      { i: "🤲", t: "Doe er twee keer 120 ml maizena bij en kneed het met je handen." },
      { i: "⚖️", t: "Te plakkerig? Een paar eetlepels maizena erbij. Te droog? Een beetje water." },
    ],
    tip: "Maak het 's avonds klaar, dan kan er 's ochtends meteen mee gespeeld worden. Kneed er bij elk gebruik een beetje water door.",
    fout: "Te kort laten weken. Dan wordt het niet slijmerig.",
    klaarTip: "Afgedekt in de koelkast blijft het maximaal 5 dagen goed.",
  },
  {
    id: "oobleck", naam: "Toverslijm (oobleck)", emoji: "🪄", activator: "geen",
    kort: "Hard als je erop drukt, vloeibaar als je het laat lopen!",
    kleur: ["#ffd23f", "#ff9f1c", "#fff8e0"], moeilijk: 1, minuten: 5, leeftijd: 4,
    bron: [
      { naam: "C3 – centrum voor chemie-onderwijs", url: "https://www.c3.nl/ontdekchemie/proefjes/vreemd-mengsel/" },
      { naam: "Museum Sonnenborgh", url: "https://www.sonnenborgh.nl/experiment-maizena-in-water-een-raar-goedje" },
    ],
    bewijs: "Een getest wetenschapsproefje voor kinderen van 4 tot 12 jaar",
    ingredienten: [
      { h: 75, e: "g", n: "maizena", x: "Grotere portie? 200 g maizena op 150 ml water" },
      { h: 50, e: "ml", n: "water" },
      { h: 2, e: "druppels", n: "levensmiddelenkleurstof (mag ook niet)" },
    ],
    stappen: [
      { i: "⚖️", t: "Weeg de maizena af in een diep bord." },
      { i: "💧", t: "Giet het water erbij (met eventueel de kleurstof erin)." },
      { i: "🥄", t: "Roer goed met een eetlepel." },
      { i: "👉", t: "Druk er snel met je vinger in. En nu heel langzaam. Merk je het verschil?" },
      { i: "⚽", t: "Probeer er met je handen een bal van te maken. Zodra je stopt, smelt hij weg!", x: "Dit heet een 'niet-newtonse vloeistof'. Echte wetenschap!" },
    ],
    tip: "Van je handen gaat het af met warm water. Uit kleding borstel je het als het droog is.",
    fout: "Het door de gootsteen spoelen. Dat verstopt de afvoer!",
    klaarTip: "Gooi oobleck nooit door de gootsteen of wc. Gooi het bij het restafval of in de tuin.",
  },
  // ---------- EETBAAR (bronnen: Little Bins, Fun with Mama, How To Cook That, Busy Little Kiddies) ----------
  {
    id: "spekjes", naam: "Marshmallowslijm", emoji: "🍡", activator: "geen", eetbaar: true,
    kort: "Van gesmolten marshmallows. Rekken, kneden én proeven!",
    kleur: ["#ffb3d1", "#ff7eb6", "#fff0f6"], moeilijk: 2, minuten: 10, leeftijd: 5,
    bron: [
      { naam: "Busy Little Kiddies", url: "https://www.busylittlekiddies.com/edible-marshmallow-slime-recipe/" },
      { naam: "Little Bins for Little Hands", url: "https://littlebinsforlittlehands.com/make-marshmallow-edible-slime-recipe-taste-safe/" },
    ],
    bewijs: "Dezelfde methode bij Little Bins for Little Hands en Fun with Mama",
    allergenen: "gelatine (meestal varken, kijk op de zak). Niet vegetarisch.",
    waarschuwing: "Gesmolten marshmallows zijn heet. De volwassene doet de magnetron en voelt eerst. Niet voor peuters.",
    ingredienten: [
      { h: 57, e: "g", n: "witte marshmallows (spekjes)", x: "Witte marshmallows geven wit slijm" },
      { h: 1, e: "el", n: "zonnebloemolie" },
      { h: 3, e: "el", n: "poedersuiker" },
    ],
    stappen: [
      { i: "🧑‍🍳", t: "Volwassene: doe de marshmallows in een magnetronkom en verwarm ze 30 seconden op 900 watt.", x: "Stop als ze opgezwollen zijn." },
      { i: "🥄", t: "Doe de olie erbij en roer." },
      { i: "🍚", t: "Roer er per eetlepel poedersuiker door tot het steviger en minder plakkerig is." },
      { i: "✋", t: "Pas met je handen kneden als het niet meer heet is. De volwassene voelt eerst." },
      { i: "😋", t: "Rekken, spelen en een hapje proeven!" },
    ],
    tip: "Na zo'n 20 minuten wordt het hard. Dat is normaal. 10 seconden in de magnetron en eerst met een lepel roeren maakt het weer zacht.",
    fout: "Meteen met je handen erin terwijl het nog heet is.",
    klaarTip: "Vandaag opeten of weggooien, en daarna tanden poetsen!",
  },
  {
    id: "fluffeetbaar", naam: "Eetbaar wolkenslijm", emoji: "🍦", activator: "geen", eetbaar: true,
    kort: "Zonder magnetron, zonder hitte. Perfect voor kleine smulpapen.",
    kleur: ["#fff3b0", "#ffc6e0", "#fffbea"], moeilijk: 1, minuten: 10, leeftijd: 4,
    bron: [
      { naam: "Little Bins for Little Hands", url: "https://littlebinsforlittlehands.com/edible-marshmallow-fluff-slime/" },
      { naam: "Posh in Progress", url: "https://poshinprogress.com/2020/08/05/how-to-make-edible-slime/" },
    ],
    bewijs: "Getest met 6 kinderen van 6 tot 9 jaar: 'a major hit'",
    allergenen: "ei-eiwit (kijk op de pot).",
    ingredienten: [
      { h: 1, e: "pot", n: "Marshmallow Fluff", x: "Bij AH en Jumbo, bij het broodbeleg" },
      { h: 240, e: "ml", n: "poedersuiker", x: "1 kopje, plus extra zolang het plakt" },
      { h: 2, e: "druppels", n: "kleurstof (mag ook niet)" },
    ],
    stappen: [
      { i: "🧼", t: "Was je handen goed en maak het aanrecht schoon." },
      { i: "🎨", t: "Roer de kleurstof door de Fluff." },
      { i: "🍚", t: "Strooi de poedersuiker op het schone aanrecht." },
      { i: "🍦", t: "Schep de Fluff op de poedersuiker." },
      { i: "🤲", t: "Kneed de poedersuiker erdoor tot het niet meer plakt.", x: "Plakt het nog? Strooi er wat extra poedersuiker bij." },
    ],
    tip: "Een paar druppels olie op je handen helpt tegen plakken. Na lang spelen moet er meer poedersuiker bij.",
    fout: "Stoppen met poedersuiker terwijl het nog plakt.",
    klaarTip: "Afgedekt bewaren. Na een dag verandert het. Het is bijna puur suiker, dus een paar hapjes is genoeg!",
  },
  {
    id: "beertjes", naam: "Gummibeertjesslijm", emoji: "🐻", activator: "geen", eetbaar: true,
    kort: "Van gesmolten beertjes. Het meest rekbare eetbare slijm.",
    kleur: ["#ff6b6b", "#ffd23f", "#fff2ea"], moeilijk: 2, minuten: 15, leeftijd: 6,
    bron: [
      { naam: "Little Bins for Little Hands", url: "https://littlebinsforlittlehands.com/gummy-bear-edible-slime-recipe/" },
      { naam: "How To Cook That (Ann Reardon)", url: "https://www.howtocookthat.net/public_html/5-best-edible-slime-recipes/" },
    ],
    bewijs: "Reacties als 'your recipe worked very well' en 'so easy'. In de vergelijkingstest van How To Cook That het meest rekbaar",
    allergenen: "gelatine (vaak varken, kijk op de zak). Niet vegetarisch. Suikervrije of vegan beertjes werken niet.",
    waarschuwing: "Gesmolten beertjes worden heel heet en blijven lang heet. Alleen de volwassene doet de magnetron.",
    ingredienten: [
      { h: 240, e: "ml", n: "gummibeertjes", x: "1 kopje vol. Liefst één kleur, anders wordt het bruin" },
      { h: 2, e: "el", n: "maizena" },
      { h: 1, e: "el", n: "poedersuiker" },
      { h: 0.5, e: "el", n: "zonnebloemolie", x: "Alleen als het nodig is" },
    ],
    stappen: [
      { i: "🐻", t: "Zoek de beertjes uit per kleur en doe ze in een magnetronkom." },
      { i: "🧑‍🍳", t: "Volwassene: 30 seconden in de magnetron." },
      { i: "🥄", t: "Volwassene: roer en verwarm opnieuw tot het helemaal glad is, zonder klontjes." },
      { i: "⏳", t: "Volwassene: roer het af en toe om af te koelen. Niet aankomen, het is heet!" },
      { i: "🍚", t: "Meng de maizena en poedersuiker en strooi de helft op een schoon aanrecht." },
      { i: "🤲", t: "Giet de massa erop als je hem kunt aanraken en kneed de rest van het poeder erdoor." },
      { i: "💧", t: "Kneed er beetje bij beetje olie door voor meer rek. Meestal heb je niet alles nodig." },
    ],
    tip: "Het is eerst plakkerig en wordt beter door te kneden.",
    fout: "Te vroeg aanraken. Gesmolten snoep blijft heel lang heet.",
    klaarTip: "Je kunt het één keer gebruiken, en hooguit nog één keer opwarmen. Proeven mag, maar door de rauwe maizena is het geen snack.",
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
    doe: ["In een luchtdicht bakje of zakje met ritssluiting.", "Zo blijft het 1 tot 3 weken goed. In de koelkast nog langer.", "Chiaslijm: afgedekt in de koelkast maximaal 5 dagen. Eetbaar slijm: dezelfde dag opeten of weggooien."],
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
  { naam: "✅ Lenzenvloeistof + baking soda", hoe: "1 el lenzenvloeistof + ½ el baking soda per flesje lijm (Elmer's)", voor: "Alle recepten. Onze favoriet!", let: "Er moet 'boorzuur' of 'borax' op het etiket staan. Bv. Etos All-in-1 of Biotrue. Kruidvat Opticare en de Jumbo all-in-one (zachte én harde lenzen) hebben géén boorzuur." },
  { naam: "🟡 Kant-en-klare slime activator", hoe: "Volgens de verpakking", voor: "Handig, zit ook in slijmpakketjes", let: "Kies een product met CE-keurmerk." },
  { naam: "🔴 Boraxpoeder", hoe: "Niet aanbevolen", voor: "-", let: "In de EU aangemerkt als schadelijk. De meeste huidproblemen door slijm komen van borax." },
  { naam: "🔴 Wasmiddel", hoe: "Niet aanbevolen", voor: "-", let: "Werkt alleen als er borax in zit (vaak niet meer). Kan de huid irriteren." },
];

const LIJM = [
  "Het moet PVA-lijm zijn. PVA zit vol lange sliertjes die de lenzenvloeistof aan elkaar knoopt. Zo wordt lijm slijm.",
  "Herken je PVA aan 'PVA' of 'op waterbasis' op het etiket. Kinderlijm en schoollijm zijn bijna altijd PVA.",
  "Witte PVA-lijm geeft romig slijm met zachte pastelkleuren (bv. Elmer's of Collall Schoollijm wit, online via bol.com).",
  "Transparante PVA-lijm geeft doorzichtig slijm, mooi met glitter (bv. HEMA kinderlijm of Collall transparant).",
  "Gebruik de lijm die bij het recept staat: zo is het recept getest.",
  "Lijmstift, secondelijm, houtlijm en lijm uit een lijmpistool werken NIET.",
];

const VEILIG = [
  { i: "🧑‍🍳", titel: "Altijd met een volwassene", tekst: "Een volwassene doet de activator erbij. Kinderen vanaf 6 jaar mogen zelf maken met iemand in de buurt." },
  { i: "👶", titel: "Kleine kinderen", tekst: "Onder de 3 jaar alleen chiazaad-slijm of toverslijm. Tussen 3 en 5 jaar doet de volwassene de activator erbij." },
  { i: "🚫", titel: "Niet eten", tekst: "Slijm met lijm is nooit eetbaar, ook al ruikt of lijkt het lekker. Houd het weg bij kleine broertjes, zusjes en huisdieren." },
  { i: "🧼", titel: "Handen wassen", tekst: "Was je handen voor én na het spelen. Dan blijft je slijm ook langer mooi." },
  { i: "🩹", titel: "Pas op je huid", tekst: "Niet spelen met eczeem of wondjes aan je handen. Rode of jeukende handen? Stoppen en goed afspoelen met water." },
  { i: "🧪", titel: "Lenzenvloeistof, geen borax", tekst: "Het RIVM onderzocht zelfgemaakt slijm met lenzenvloeistof en zag geen risico. Boraxpoeder en wasmiddel raden we af." },
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
    naam: "Witte PVA-kinderlijm", emoji: "🧴", winkels: [], zoek: "witte pva lijm",
    let: "In de winkel vonden we geen witte PVA-lijm: HEMA, Action en Xenos hebben alleen doorzichtige lijm. Elmer's is precies de lijm uit het recept.",
    links: [
      { w: "bol", url: "https://www.bol.com/nl/nl/p/elmer-s-witte-pva-lijm-946-ml-uitwasbaar-en-kindvriendelijk-geweldig-voor-het-maken-van-slijm-en-om-mee-te-knutselen/9200000103624034/", prijs: "Elmer's 946 ml · € 19,38" },
      { w: "bol", url: "https://www.bol.com/nl/nl/p/lijm-wit-op-waterbasis-1-liter-ook-voor-drakenslijm-of-smurfensnot/9200000090032706/", prijs: "Collall 1 liter" },
    ],
  },
  lijm_helder: {
    naam: "Transparante PVA-lijm", emoji: "🫙", winkels: ["hema"], zoek: "kinderlijm transparant",
    let: "HEMA kinderlijm (de doorzichtige 'Water Basis'-fles) werkt: HEMA gebruikt hem zelf in hun slijmrecept. Van de fles van 100 ml heb je er 2 nodig.",
    links: [
      { w: "hema", url: "https://www.hema.nl/speelgoed-hobby/knutselen/lijm/kinderlijm-200ml-15900626.html", prijs: "200 ml · € 3,69" },
      { w: "hema", url: "https://www.hema.nl/speelgoed-hobby/knutselen/lijm/lijm-waterbasis-100ml-15900426.html", prijs: "100 ml · € 1,99" },
      { w: "bol", url: "https://www.bol.com/nl/nl/p/collall-kinderlijm-transparant-1000-ml-geschikt-voor-het-maken-van-slijm/9200000066094139/", prijs: "Collall 1 liter" },
    ],
  },
  soda: {
    naam: "Baking soda (zuiveringszout)", emoji: "🧂", winkels: ["ah", "jumbo", "kruidvat"], zoek: "baking soda",
    let: "Niet verwarren met bakpoeder, kristalsoda of zilversoda! Arm & Hammer is de bekendste.",
    links: [
      { w: "jumbo", url: "https://www.jumbo.com/producten/arm-hammer-pure-baksoda-454-g-580764DS", prijs: "€ 1,89" },
      { w: "ah", url: "https://www.ah.nl/producten/product/wi386329/pure-baking-soda" },
      { w: "kruidvat", url: "https://www.kruidvat.nl/arm-hammer-pure-baking-soda/p/6558662" },
    ],
  },
  lens: {
    naam: "Lenzenvloeistof met boorzuur", emoji: "💧", winkels: ["etos", "ah"], zoek: "lenzenvloeistof all-in-1",
    let: "Etos All-in-1 heeft boorzuur (ook bij AH te koop). Kruidvat Opticare en Jumbo all-in-one (zacht én hard) NIET. Twijfel? Doe de Lenzencheck in de app.",
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
    naam: "Glitter", emoji: "✨", winkels: ["action"], zoek: "glitter",
    links: [{ w: "action", url: "https://www.action.com/nl-nl/p/3210785/decotime-glitterbuisjes/", prijs: "€ 1,99" }],
  },
  scheerschuim: {
    naam: "Scheerschuim (wit, geen gel)", emoji: "🫧", winkels: ["action", "etos", "kruidvat", "jumbo", "ah"], zoek: "scheerschuim",
    links: [
      { w: "action", url: "https://www.action.com/nl-nl/p/3223019/silea-scheerschuim/", prijs: "€2,22" },
      { w: "etos", url: "https://www.etos.nl/producten/de-vergulde-hand-scheerschuim-250-ml-120351121.html", prijs: "€4,29" },
    ],
  },
  glow: {
    naam: "Elmer's Glow in the Dark lijm", emoji: "🌙", winkels: [], zoek: "elmers glow in the dark lijm",
    let: "Niet in Nederlandse winkels te koop, wel online. Kijk of hij op voorraad is.",
    links: [{ w: "bol", url: "https://www.bol.com/nl/nl/p/glow-in-the-dark-lijm-naturel/9200000092106574/", prijs: "± €15,99" }],
  },
  spekjes: {
    naam: "Spekjes of witte marshmallows", emoji: "🍡", winkels: ["ah", "jumbo", "action", "hema"], zoek: "marshmallows",
    let: "Haribo Chamallows zijn met rundergelatine. Witte marshmallows geven wit slijm.",
    links: [{ w: "jumbo", url: "https://www.jumbo.com/producten/haribo-chamallows-70-g-603672ZK" }],
    zoekIn: ["ah"],
  },
  fluff: {
    naam: "Marshmallow Fluff", emoji: "🍦", winkels: ["ah", "jumbo"], zoek: "marshmallow fluff",
    links: [{ w: "jumbo", url: "https://www.jumbo.com/producten/fluff-marshmallow-213-g-589493POT" }],
    zoekIn: ["ah"],
  },
  poedersuiker: {
    naam: "Poedersuiker", emoji: "🍚", winkels: ["ah", "jumbo"], zoek: "poedersuiker", zoekIn: ["ah", "jumbo"],
  },
  beertjes: {
    naam: "Gummibeertjes", emoji: "🐻", winkels: ["ah", "jumbo", "action", "kruidvat"], zoek: "haribo goudbeertjes", zoekIn: ["ah", "jumbo"],
  },
  olie: {
    naam: "Zonnebloemolie", emoji: "🌻", winkels: ["ah", "jumbo"], zoek: "zonnebloemolie", zoekIn: ["ah", "jumbo"],
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
  [/chiazaad/i, "chia"], [/maizena/i, "maizena"], [/marshmallows/i, "spekjes"], [/Fluff/, "fluff"],
  [/poedersuiker/i, "poedersuiker"], [/gummibeertjes/i, "beertjes"],
  [/zonnebloemolie/i, "olie"],
];
const artikelVan = (naam) => (ARTIKEL_VAN.find(([re]) => re.test(naam)) || [])[1] || null;

const PAKKETTEN = [
  { naam: "Slijmset 4 kleuren + activator", w: "ecotastisch", url: "https://www.ecotastisch.nl/products/slijmset-4-kleuren-en-activator", prijs: "€18,95", uitleg: "Lijm en activator in één doos, genoeg voor een middag met vriendjes." },
  { naam: "Kant-en-klare slime activator", w: "ecotastisch", url: "https://www.ecotastisch.nl/products/slijm-activator", prijs: "€3,95", uitleg: "Als je geen goede lenzenvloeistof kunt vinden." },
  { naam: "Slijmpakketten bij Intertoys", w: "intertoys", url: "https://www.intertoys.nl/knutselartikelen/slijm", uitleg: "Ook in de winkel te koop." },
];

// Link naar het Slijmfeestje-pakket (Etsy). Leeg = knop verborgen.
const FEESTPAKKET_URL = "";

// Lenzenvloeistof: werkt hij voor slijm? Alleen merken waarvan we het etiket zelf hebben gezien.
const LENZEN = [
  { merk: "Etos All-in-1 zachte lenzen", winkel: "Etos, Albert Heijn", werkt: true, bewijs: "Op het etiket staat 'borax/boorzuur'.", url: "https://www.etos.nl/producten/etos-zachte-lenzen-all-in-1-vloeistof-360-ml-120288475.html" },
  { merk: "Biotrue (Bausch + Lomb)", winkel: "Kruidvat, online", werkt: true, bewijs: "Bevat boorzuur en boraatzout.", url: "https://www.kruidvat.nl/bausch-lomb-biotrue-multi-purpose-solution-lenzenvloeistof/p/6356215" },
  { merk: "Kruidvat Opticare", winkel: "Kruidvat", werkt: false, bewijs: "Op de productpagina van Kruidvat staat geen boorzuur." },
  { merk: "Jumbo all-in-one zachte lenzen", winkel: "Jumbo", werkt: false, bewijs: "Etiket: Pluronic, PVP, EDTA. Geen boorzuur (gecontroleerd 6 okt 2026)." },
  { merk: "Jumbo all-in-one harde lenzen", winkel: "Jumbo", werkt: false, bewijs: "Etiket: HPMC, PVP, Pluronic, EDTA, PHMB. Geen boorzuur gezien (gecontroleerd 6 okt 2026)." },
];
