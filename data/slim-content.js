// Single source of truth voor alle SLIM-subsidie content
// Wijzig subsidiepercentages, bedragen, tijdvakken etc. alleen hier

export const SUBSIDIE = {
  percentage: 60,
  maxBedrag: 25000,
  maxBedragLandbouw: 20000,
  maxBedragSamenwerking: 500000,
  maxPerPartnerSamenwerking: 200000,
  minInvestering: 8334,
  minSubsidiabeleKostenAC: 5000,
  forfaireOpslag: 0.15,
  opslagInterneLoonkosten: 0.32,
  werkbareUren: 1720,
  controleverklaringBedrag: 3000,
  voorschot: 0.5,
  looptijdMKB: 12,
  looptijdSamenwerking: 24,
};

export const PRICING = {
  reserveringsfee: 199,
  succesfee: 2500,
  btw: 0.21,
};

export const TIJDVAKKEN_2026 = [
  {
    label: "Tijdvak 1 2026",
    type: "individueel",
    open: new Date(2026, 3, 7, 9, 0),
    close: new Date(2026, 4, 4, 17, 0),
  },
  {
    label: "Samenwerking 2026",
    type: "samenwerking",
    open: new Date(2026, 5, 22, 9, 0),
    close: new Date(2026, 6, 20, 17, 0),
  },
  {
    label: "Tijdvak 2 2026",
    type: "individueel",
    open: new Date(2026, 7, 10, 9, 0),
    close: new Date(2026, 8, 7, 17, 0),
  },
  {
    label: "Tijdvak 1 2027",
    type: "individueel",
    open: new Date(2027, 3, 6),
    close: new Date(2027, 4, 4),
  },
];

export const LOTING = {
  tijdvak: "Tijdvak 1 2026",
  totaalIngediend: 3360,
  afgekeurdVoorLoting: 23,
  inLoting: 3337,
  inBehandeling: 474,
  budget: 11000000,
  kansRuw: Math.round((474 / 3360) * 100),
  kansInLoting: Math.round((474 / 3337) * 100),
};

export const LOTING_TIJDVAKKEN = [
  {
    jaar: 2026,
    tijdvakken: [
      {
        titel: "Tijdvak 1 — april / mei 2026",
        periode: "7 apr – 4 mei 2026",
        lotingsdatum: "8 mei 2026",
        budget: "€ 11 mln",
        gegarandeerd: 474,
        totaal: 3337,
        url: "https://www.uitvoeringvanbeleidszw.nl/actueel/nieuws/2026/05/08/uitkomst-loting-slim-mkb-tijdvak-1-in-2026",
      },
    ],
    komend: [
      {
        titel: "Tijdvak 2 — aug / sep 2026",
        info: "Aanvragen van 10 aug t/m 7 sep 2026. Lotingsuitslag verwacht begin oktober 2026.",
      },
      {
        titel: "Samenwerking — jun / jul 2026",
        info: "Aanvragen van 22 jun t/m 20 jul 2026. Vanaf 2026 ook via loting (nieuw beleid).",
      },
    ],
  },
  {
    jaar: 2025,
    tijdvakken: [
      {
        titel: "Tijdvak 2 — september 2025",
        periode: "1 sep – 30 sep 2025",
        lotingsdatum: "3 okt 2025",
        budget: "€ 17,5 mln",
        gegarandeerd: 758,
        totaal: 3270,
        url: "https://www.uitvoeringvanbeleidszw.nl/actueel/nieuws/2025/10/03/uitkomst-loting-slim-mkb-september-2025",
      },
      {
        titel: "Tijdvak 1 — maart 2025",
        periode: "3 mrt – 31 mrt 2025",
        lotingsdatum: "11 apr 2025",
        budget: "€ 12,5 mln",
        gegarandeerd: 557,
        totaal: 2711,
        url: "https://www.uitvoeringvanbeleidszw.nl/actueel/nieuws/2025/04/11/uitkomst-loting-slim-mkb-maart-2025",
      },
    ],
    komend: [],
  },
  {
    jaar: 2024,
    tijdvakken: [
      {
        titel: "Tijdvak 2 — september 2024",
        periode: "2 sep – 30 sep 2024",
        lotingsdatum: "10 okt 2024",
        budget: "€ 16,1 mln",
        gegarandeerd: 689,
        totaal: 3152,
        url: "https://www.uitvoeringvanbeleidszw.nl/actueel/nieuws/2024/10/10/uitkomst-loting-slim-mkb-september-2024",
        notitie: "Plafond verhoogd van € 13,5 mln naar € 16,1 mln op 26 juni 2024.",
      },
      {
        titel: "Tijdvak 1 — maart 2024",
        periode: "1 mrt – 29 mrt 2024",
        lotingsdatum: "16 apr 2024",
        budget: "€ 15 mln",
        gegarandeerd: 642,
        totaal: 2838,
        url: "https://www.uitvoeringvanbeleidszw.nl/actueel/nieuws/2024/04/16/uitkomst-loting-aanvraagtijdvak-maart-2024-slim-regeling",
        notitie:
          "Door technische problemen zijn voor 8 aanvragers KvK-nummers (laatste 3 cijfers) gebruikt i.p.v. projectnummers.",
      },
    ],
    komend: [],
  },
];

export const BUDGET_2026 = {
  totaal: 45000000,
  individueel: 25000000,
  samenwerking: 20000000,
};

export const STATE_OF_SLIM = {
  totaalProjecten: 6208,
  individueelMKB: 5891,
  samenwerkingsverbanden: 317,
  totaleSubsidie: 124935598,
  conversieProjecten: 19,
};

export const QUESTIONS = [
  {
    id: "employees",
    label: "Heeft uw bedrijf personeel in dienst?",
    hint: "Minimaal één werknemer met arbeidscontract (geen aandeelhouders-DGA of zzp'ers).",
    options: [
      { v: "yes", l: "Ja, wij hebben minimaal 1 werknemer in dienst" },
      { v: "no", l: "Nee, ik werk alleen / uitsluitend met zzp'ers" },
    ],
    ko: "no",
    koMsg:
      "De SLIM-subsidie is niet beschikbaar voor bedrijven zonder personeel in loondienst.",
  },
  {
    id: "size",
    label: "Valt uw bedrijf binnen het midden- en kleinbedrijf (mkb)?",
    hint: "Minder dan 250 medewerkers én jaaromzet ≤ €50 mln of balanstotaal ≤ €43 mln. Uitzondering: grootbedrijf in landbouw, horeca of recreatie mag ook aanvragen.",
    options: [
      { v: "yes", l: "Ja, wij zijn een mkb-onderneming" },
      {
        v: "groot",
        l: "Nee, maar wij zijn grootbedrijf in landbouw, horeca of recreatie",
      },
      { v: "no", l: "Nee, wij vallen buiten het mkb" },
    ],
    ko: "no",
    koMsg:
      "SLIM-subsidie is uitsluitend voor mkb-ondernemingen of grootbedrijven in de landbouw-, horeca- of recreatiesector.",
  },
  {
    id: "netherlands",
    label:
      "Is uw bedrijf in Nederland gevestigd en vinden de activiteiten in Nederland plaats?",
    hint: "Zowel vestiging als activiteiten moeten in Nederland zijn.",
    options: [
      { v: "yes", l: "Ja, wij zijn in Nederland gevestigd en actief" },
      {
        v: "no",
        l: "Nee, wij zijn (deels) buiten Nederland gevestigd",
      },
    ],
    ko: "no",
    koMsg:
      "SLIM-subsidie geldt uitsluitend voor in Nederland gevestigde ondernemingen.",
  },
  {
    id: "financial",
    label: "Verkeert uw bedrijf in financiële moeilijkheden?",
    hint: "Faillissement, surseance van betaling of schuldsanering (WSNP) zijn uitsluitingsgronden.",
    options: [
      { v: "no", l: "Nee, ons bedrijf is financieel gezond" },
      {
        v: "yes",
        l: "Ja, er spelen betalingsproblemen of faillissement",
      },
    ],
    ko: "yes",
    koMsg:
      "Bedrijven in faillissement, surseance van betaling of WSNP komen niet in aanmerking.",
  },
  {
    id: "started",
    label: "Zijn de geplande activiteiten al gestart?",
    hint: "Activiteiten mogen nog niet begonnen zijn vóór de subsidieverlening.",
    options: [
      { v: "no", l: "Nee, de activiteiten zijn nog niet gestart" },
      { v: "yes", l: "Ja, we zijn al begonnen" },
    ],
    ko: "yes",
    koMsg:
      "Activiteiten die al zijn gestart vóór subsidieverlening komen niet in aanmerking.",
  },
  {
    id: "deminimis",
    label:
      "Heeft uw bedrijf de afgelopen 3 jaar meer dan €300.000 staatssteun ontvangen?",
    hint: "Alle de-minimissteun bij elkaar opgeteld.",
    options: [
      { v: "no", l: "Nee, wij zijn ruim onder het plafond" },
      { v: "unsure", l: "Ik weet het niet zeker" },
      { v: "yes", l: "Ja, meer dan €300.000 ontvangen" },
    ],
    ko: "yes",
    koMsg: "Het Europese de-minimisplafond is overschreden.",
  },
  {
    id: "agriculture",
    label: "Is uw bedrijf actief in de landbouwsector?",
    hint: "Bepaalt het maximale subsidiebedrag (€20.000 i.p.v. €25.000) — geen uitsluitingsgrond.",
    options: [
      { v: "no", l: "Nee, wij zijn niet actief in de landbouw" },
      { v: "yes", l: "Ja, wij zijn een landbouwbedrijf" },
    ],
    ko: null,
  },
];

export const ACTIVITEITEN = [
  {
    id: "A",
    tag: "Activiteit A",
    tagClass: "a",
    title: "Doorlichting onderneming → Opleidings- of ontwikkelplan",
    desc: "Een externe adviseur analyseert uw organisatie en brengt de scholingsbehoefte in kaart. Resultaat: een concreet opleidings- of ontwikkelplan. (Art. 2.4 lid 1a SLIM-regeling)",
    examples: [
      "Leercultuurscan",
      "Opleidingsbehoefteanalyse",
      "Strategisch HR-plan",
      "Competentiescan",
    ],
    min: "Minimale investering: €8.334 · Minimale subsidie: €5.000",
  },
  {
    id: "B",
    tag: "Activiteit B",
    tagClass: "b",
    title: "Loopbaan- of ontwikkeladviezen voor werknemers",
    desc: "Individuele loopbaan- of ontwikkeladviezen via een gecertificeerde loopbaanadviseur (Noloc of gelijkwaardig). (Art. 2.4 lid 1b + Art. 2.5 SLIM-regeling)",
    examples: [
      "Loopbaangesprekken",
      "Persoonlijk ontwikkelplan (POP)",
      "Talentassessment",
      "Vaardighedenanalyse",
    ],
    min: "Max. subsidie per advies: €700 · Adviseur moet Noloc-gecertificeerd zijn",
  },
  {
    id: "C",
    tag: "Activiteit C",
    tagClass: "c",
    title: "Ontwikkelen of invoeren van een L&O-methode",
    desc: "Ontwikkel of implementeer een structurele methode die werknemers stimuleert kennis en vaardigheden te blijven ontwikkelen op de werkvloer. (Art. 2.4 lid 1c SLIM-regeling)",
    examples: [
      "Online leerportal / e-learning",
      "Bedrijfsschool opzetten",
      "Videoserie intern leren",
      "Systeem van ontwikkelgesprekken",
      "Workshops en kennissessies",
      "Cursusmateriaal en -modules",
    ],
    min: "Minimale investering: €8.334 · Minimale subsidie: €5.000",
  },
];

export const RECHTSVORMEN = [
  "Eenmanszaak",
  "VOF (Vennootschap onder firma)",
  "Maatschap",
  "BV (Besloten vennootschap)",
  "NV (Naamloze vennootschap)",
  "Coöperatie",
  "Stichting",
  "Vereniging",
  "Anders",
];

export const SECTOREN = [
  "Bouw & installatie",
  "Detailhandel",
  "Gezondheidszorg & welzijn",
  "Groothandel",
  "Horeca",
  "ICT & technologie",
  "Industrie & productie",
  "Landbouw & agri",
  "Logistiek & transport",
  "Onderwijs",
  "Overige dienstverlening",
  "Recreatie & toerisme",
  "Zakelijke dienstverlening",
  "Anders",
];

export const PROVINCIES = [
  "Drenthe",
  "Flevoland",
  "Friesland",
  "Gelderland",
  "Groningen",
  "Limburg",
  "Noord-Brabant",
  "Noord-Holland",
  "Overijssel",
  "Utrecht",
  "Zeeland",
  "Zuid-Holland",
];

export const FAQ = [
  {
    q: "Ik ben ZZP-er. Kom ik in aanmerking?",
    a: "Nee. Alleen mkb-bedrijven mét personeel in loondienst kunnen SLIM-subsidie aanvragen.",
  },
  {
    q: "Mijn bedrijf heeft 5 medewerkers. Kom ik in aanmerking?",
    a: "Ja! Als MKB-ondernemer ontvangt u 60% subsidie op uw investering, tot een maximum van € 25.000. Landbouwbedrijven hebben een maximum van € 20.000.",
  },
  {
    q: "Ik heb geen opleidingsbudget. Kan ik dan toch SLIM-subsidie aanvragen?",
    a: "Ja! De SLIM-subsidie dekt 60% van uw investering in opleiding en scholing van medewerkers. Het minimum is € 8.334 investering (= € 5.000 subsidie).",
  },
  {
    q: "Wat betekent inloting precies?",
    a: "Inloting betekent dat uw aanvraag in behandeling wordt genomen — niet dat subsidie is toegekend. Na inloting beoordeelt RVO uw aanvraag inhoudelijk.",
  },
  {
    q: "Wat kost SLIM-subsidie aanvragen via SLIM Subsidie Advies?",
    a: "De quickscan is gratis. De reserveringsfee bedraagt € 199 excl. btw (€ 240,79 incl. btw). Bij toekenning betaalt u € 2.500 succesfee excl. btw, en wordt de reserveringsfee terugbetaald. Geen toekenning = geen succesfee.",
  },
];

export const BEDRIJFSINFO = {
  naam: "SLIM Subsidie Advies",
  handelsnaam: "SLIM Subsidie Advies",
  rechtspersoon: "Inscentia BV",
  kvk: "83970614",
  btw: "NL863053907B01",
  adres: "Floridadreef 100",
  postcode: "3565 AM",
  stad: "Utrecht",
  email: "info@slimsubsidieadvies.nl",
  telefoon: "(030) 88 99 045",
  website: "https://www.slimsubsidieadvies.nl",
  instagram: "https://www.instagram.com/slimsubsidieadvies",
};

export const AI_PROMPT_RICHTLIJNEN = `STRIKTE RICHTLIJNEN:
- Bespreek UITSLUITEND de SLIM-subsidie (Stimulering Leren en Ontwikkelen in het MKB, SLIM-regeling SZW)
- Noem NOOIT andere subsidies, innovatieprogramma's, groeifondsen of regelingen — ook niet als suggestie
- Focus op leren en ontwikkelen van medewerkers en de RVO-aanvraagprocedure
- Max 380 woorden · geen markdown · alinea's gescheiden door een witregel · spreek ondernemer aan met "u"

VERMIJD deze formuleringen:
- Gebruik NOOIT "vergroot uw inlotkans" — gebruik in plaats daarvan "zorgt ervoor dat u aan de loting kunt deelnemen"
- Gebruik NOOIT "erkend staat in de SLIM-database" — gebruik "in het bezit is van de juiste certificering en als erkend vermeld staat in de SLIM-database"
- Gebruik NOOIT vage termen als "demonstreert ernst" — gebruik "versterkt de kwaliteit van uw aanvraag"
- Schrijf ALTIJD grammaticaal correct Nederlands, controleer werkwoordsvervoegingen
- Sluit ALTIJD af met een concrete, bemoedigende zin over tijdvak 2 2026 met correcte werkwoordsvorm "voorbereiden" niet "voorbereiding"`;

export function calcSubsidy(investering, isLandbouw) {
  return Math.min(
    investering * (SUBSIDIE.percentage / 100),
    isLandbouw ? SUBSIDIE.maxBedragLandbouw : SUBSIDIE.maxBedrag
  );
}

export function nextDeadline() {
  const now = new Date();
  const individueel = TIJDVAKKEN_2026.filter((d) => d.type !== "samenwerking");
  return individueel.find((d) => now < d.close) || individueel[individueel.length - 1];
}

export function fmtEur(n) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function fmtEur2(n) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}
