// Single source of truth voor de quickscanvragen, uitslaglogica en antwoordlabels.
// Gebruikt door app/quickscan/page.js (UI) en app/api/quickscan/route.js (mail + PDF),
// zodat het rapport altijd dezelfde teksten toont als de vragenlijst.

import { SUBSIDIE } from "./slim-content";

export const MIN_KANSRIJK = SUBSIDIE.minSubsidiabeleKostenAC; // €5.000
export const MIN_MOGELIJK = 3000; // quickscan drempel voor 'mogelijk kansrijk'

export const MEDEWERKERS_OPTIES = ["2–10", "11–50", "51–100", "101–250"];

export const VRAGEN = [
  {
    id: "personeel",
    vraag: "Heeft uw bedrijf personeel in dienst?",
    subtekst: "Minimaal één werknemer met arbeidscontract (geen aandeelhouders-DGA of zzp'ers).",
    opties: [
      { v: "ja", l: "Ja, wij hebben minimaal 1 werknemer in dienst" },
      { v: "nee", l: "Nee, ik werk alleen / uitsluitend met zzp'ers" },
    ],
  },
  {
    id: "mkb",
    vraag: "Valt uw bedrijf binnen het midden- en kleinbedrijf (MKB)?",
    subtekst: "Minder dan 250 medewerkers én jaaromzet ≤ €50 mln of balanstotaal ≤ €43 mln.",
    opties: [
      { v: "ja", l: "Ja, wij zijn een MKB-onderneming" },
      { v: "nee", l: "Nee, wij vallen buiten het MKB (grootbedrijf)" },
    ],
  },
  {
    id: "nederland",
    vraag: "Is uw bedrijf in Nederland gevestigd en vinden de activiteiten in Nederland plaats?",
    subtekst: "Zowel vestiging als activiteiten moeten in Nederland zijn.",
    opties: [
      { v: "ja", l: "Ja, wij zijn in Nederland gevestigd en actief" },
      { v: "nee", l: "Nee, wij zijn (deels) buiten Nederland gevestigd" },
    ],
  },
  {
    id: "gestart",
    vraag: "Zijn de geplande activiteiten al gestart?",
    subtekst: "Activiteiten mogen nog niet begonnen zijn vóór de subsidieverlening.",
    opties: [
      { v: "nee", l: "Nee, de activiteiten zijn nog niet gestart" },
      { v: "ja", l: "Ja, we zijn al begonnen" },
    ],
  },
  {
    id: "deminimis",
    vraag: "Heeft uw bedrijf de afgelopen 3 jaar meer dan €300.000 aan staatssteun ontvangen?",
    subtekst: "Alle de-minimissteun bij elkaar opgeteld.",
    opties: [
      { v: "nee", l: "Nee, wij zijn ruim onder het plafond" },
      { v: "weet-niet", l: "Ik weet het niet zeker" },
      { v: "ja", l: "Ja, meer dan €300.000 ontvangen" },
    ],
  },
];

export const LANDBOUW_VRAAG = {
  id: "landbouw",
  vraag: "Is uw bedrijf actief in de landbouwsector?",
  opties: [
    { v: "nee", l: "Nee, wij zijn geen landbouwbedrijf" },
    { v: "ja", l: "Ja, wij zijn een landbouwbedrijf" },
  ],
};

export const INVESTERING_VRAAG = {
  id: "investering",
  vraag: "Wat is de verwachte totale investering in leer- en ontwikkelactiviteiten?",
};

export const NIET_KANSRIJK_REDEN = {
  personeel: "De SLIM-subsidie vereist minimaal één werknemer met een arbeidscontract. ZZP'ers en DGA's zonder personeel komen niet in aanmerking.",
  mkb: "De SLIM-subsidie is uitsluitend voor MKB-ondernemingen. Grootbedrijven kunnen per 2025 niet meer individueel aanvragen. Deelname is uitsluitend mogelijk als partner in een samenwerkingsverband.",
  nederland: "Uw bedrijf en activiteiten moeten in Nederland gevestigd en actief zijn.",
  gestart: "Activiteiten die al zijn gestart vóór subsidieverlening komen niet in aanmerking. U kunt wel aanvragen voor toekomstige activiteiten.",
  deminimis: "Bij meer dan €300.000 staatssteun in de afgelopen 3 jaar kunt u mogelijk geen de-minimissteun meer ontvangen.",
  investering: `Voor activiteiten A en C geldt een minimale subsidie van €${MIN_KANSRIJK.toLocaleString("nl-NL")}, wat een projectomvang van minimaal €${SUBSIDIE.minProjectomvang.toLocaleString("nl-NL")} vereist.`,
};

export function bepaalUitslag(antwoorden) {
  if (antwoorden.personeel === "nee") return "niet-kansrijk";
  if (antwoorden.mkb === "nee") return "niet-kansrijk";
  if (antwoorden.nederland === "nee") return "niet-kansrijk";
  if (antwoorden.gestart === "ja") return "niet-kansrijk";
  if (antwoorden.deminimis === "ja") return "niet-kansrijk";
  const inv = parseInt(antwoorden.investering, 10) || 0;
  if (inv < MIN_MOGELIJK) return "niet-kansrijk";
  if (antwoorden.deminimis === "weet-niet" || inv < MIN_KANSRIJK) return "mogelijk-kansrijk";
  return "kansrijk";
}

export function getUitsluitingsRedenen(antwoorden) {
  const redenen = [];
  if (antwoorden.personeel === "nee") redenen.push("personeel");
  if (antwoorden.mkb === "nee") redenen.push("mkb");
  if (antwoorden.nederland === "nee") redenen.push("nederland");
  if (antwoorden.gestart === "ja") redenen.push("gestart");
  if (antwoorden.deminimis === "ja") redenen.push("deminimis");
  // investering alleen controleren als Q7 zichtbaar was (geen vroege uitsluitingsgrond)
  if ((antwoorden.investering ?? "") !== "") {
    const inv = parseInt(antwoorden.investering, 10) || 0;
    if (inv < MIN_MOGELIJK) redenen.push("investering");
  }
  return redenen;
}

/** Indicatief subsidiebedrag op basis van de opgegeven investering. */
export function berekenIndicatie(antwoorden) {
  const investering = parseInt(antwoorden?.investering, 10) || 0;
  if (investering <= 0) return null;
  const max = antwoorden?.landbouw === "ja" ? SUBSIDIE.maxBedragLandbouw : SUBSIDIE.maxBedrag;
  return {
    investering,
    subsidie: Math.min(Math.round((investering * SUBSIDIE.percentage) / 100), max),
  };
}

/** Zet de opgeslagen antwoorden om naar leesbare [vraag, antwoord]-paren voor het PDF-rapport. */
export function antwoordRijen(antwoorden = {}) {
  const rijen = [];

  for (const v of VRAGEN) {
    const gekozen = antwoorden[v.id];
    if (gekozen === undefined || gekozen === "") continue;
    const optie = v.opties.find((o) => o.v === gekozen);
    rijen.push([v.vraag, optie ? optie.l : String(gekozen)]);
  }

  const landbouw = antwoorden[LANDBOUW_VRAAG.id];
  if (landbouw) {
    const optie = LANDBOUW_VRAAG.opties.find((o) => o.v === landbouw);
    rijen.push([LANDBOUW_VRAAG.vraag, optie ? optie.l : String(landbouw)]);
  }

  const investering = parseInt(antwoorden[INVESTERING_VRAAG.id], 10);
  if (!Number.isNaN(investering)) {
    rijen.push([INVESTERING_VRAAG.vraag, `€ ${investering.toLocaleString("nl-NL")}`]);
  }

  return rijen;
}
