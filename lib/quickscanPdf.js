// Quickscan-rapport als PDF — pure JS via pdf-lib, werkt in Vercel serverless.
// Gebruikt door /api/quickscan (gratis scan) en /api/betaling/webhook (reservering).

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const A4 = { w: 595.28, h: 841.89 };
const M = 56;                       // paginamarge
const CONTENT_W = A4.w - M * 2;

const NAVY = rgb(0.047, 0.118, 0.235);   // #0c1e3c
const BLUE = rgb(0.102, 0.337, 0.859);   // #1a56db
const GREY = rgb(0.42, 0.46, 0.51);      // #6b7280
const DARK = rgb(0.21, 0.25, 0.29);      // #374151
const LINE = rgb(0.898, 0.906, 0.922);   // #e5e7eb
const SOFT = rgb(0.976, 0.980, 0.984);   // #f9fafb
const AMBER = rgb(0.706, 0.325, 0.035);  // #b4530a

// De standaardfonts van pdf-lib kunnen alleen WinAnsi aan. Pijltjes en andere
// typografie buiten die set laten encodeText() crashen, dus normaliseren we vooraf.
const VERVANG = [
  [/[→➡➔]/g, "->"],
  [/[‘’‚′]/g, "'"],
  [/[“”„″]/g, '"'],
  [/[–—]/g, "-"],
  [/…/g, "..."],
  [/ /g, " "],
  [/[•●]/g, "-"],
  [/≥/g, ">="],
  [/≤/g, "<="],
];

function wa(input) {
  let s = String(input ?? "");
  for (const [re, to] of VERVANG) s = s.replace(re, to);
  // strip wat WinAnsi alsnog niet kent (behoudt o.a. EUR-teken en accenten)
  return s.replace(/[^\x20-\x7E\u00A0-\u00FF\u20AC]/g, "");
}

function eur(n) {
  const v = Number(n) || 0;
  return `EUR ${v.toLocaleString("nl-NL")}`;
}

const UITSLAG = {
  "kansrijk": {
    label: "Kansrijk",
    kleur: BLUE,
    tekst: "Op basis van de gegeven antwoorden lijkt uw organisatie in aanmerking te komen voor een SLIM-subsidieaanvraag.",
  },
  "mogelijk-kansrijk": {
    label: "Mogelijk kansrijk",
    kleur: AMBER,
    tekst: "Op basis van de gegeven antwoorden komt uw organisatie mogelijk in aanmerking. Tijdens de intake beoordelen wij de subsidiemogelijkheden verder voor uw specifieke situatie.",
  },
  "niet-kansrijk": {
    label: "Minder kansrijk",
    kleur: GREY,
    tekst: "Op basis van de gegeven antwoorden lijkt uw organisatie niet in aanmerking te komen voor de SLIM-subsidie.",
  },
};

/**
 * Bouwt het quickscan-rapport op en geeft het terug als base64 (formaat dat Resend
 * voor attachments verwacht).
 *
 * @param {object} data
 * @param {string} data.naam
 * @param {string} [data.bedrijf]
 * @param {string} [data.email]
 * @param {string} [data.telefoon]
 * @param {string} [data.medewerkers]
 * @param {Date}   [data.datum]
 * @param {string} [data.referentie]
 * @param {"kansrijk"|"mogelijk-kansrijk"|"niet-kansrijk"} data.uitslag
 * @param {Array<[string,string]>} [data.profielRijen]
 * @param {Array<[string,string]>} [data.antwoordRijen]
 * @param {{investering:number, subsidie:number}} [data.indicatie]
 * @param {string[]} [data.redenen]
 * @param {string}   [data.subtitel]
 * @returns {Promise<string>} base64
 */
export async function buildQuickscanPdf(data) {
  const {
    naam = "",
    bedrijf = "",
    email = "",
    telefoon = "",
    medewerkers = "",
    datum = new Date(),
    referentie = "",
    uitslag = "mogelijk-kansrijk",
    profielRijen = [],
    antwoordRijen = [],
    indicatie = null,
    redenen = [],
    subtitel = "Resultaat gratis quickscan",
  } = data;

  const pdf = await PDFDocument.create();
  const reg = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  pdf.setTitle(wa(`Quickscan SLIM-subsidie - ${bedrijf || naam}`));
  pdf.setAuthor("SLIM Subsidie Advies");
  pdf.setCreator("slimsubsidieadvies.nl");
  pdf.setProducer("SLIM Subsidie Advies");

  let page = pdf.addPage([A4.w, A4.h]);
  let y = A4.h;

  const paginas = [page];

  function nieuwePagina() {
    page = pdf.addPage([A4.w, A4.h]);
    paginas.push(page);
    y = A4.h - M;
  }

  // Reserveer ruimte; breek af naar een nieuwe pagina als het niet meer past.
  function ruimte(nodig) {
    if (y - nodig < M + 40) nieuwePagina();
  }

  function wrap(tekst, font, size, maxW) {
    const woorden = wa(tekst).split(/\s+/).filter(Boolean);
    const regels = [];
    let huidig = "";
    for (const w of woorden) {
      const kandidaat = huidig ? `${huidig} ${w}` : w;
      if (font.widthOfTextAtSize(kandidaat, size) <= maxW) {
        huidig = kandidaat;
      } else {
        if (huidig) regels.push(huidig);
        huidig = w;
      }
    }
    if (huidig) regels.push(huidig);
    return regels.length ? regels : [""];
  }

  function tekst(str, { font = reg, size = 10.5, kleur = DARK, x = M, maxW = CONTENT_W, lh = 15 } = {}) {
    for (const regel of wrap(str, font, size, maxW)) {
      ruimte(lh);
      page.drawText(regel, { x, y: y - size, size, font, color: kleur });
      y -= lh;
    }
  }

  // ── Briefhoofd ──────────────────────────────────────────────────────────
  page.drawRectangle({ x: 0, y: A4.h - 96, width: A4.w, height: 96, color: NAVY });
  page.drawText("SLIM", { x: M, y: A4.h - 50, size: 21, font: bold, color: rgb(0.376, 0.647, 0.98) });
  page.drawText("SUBSIDIE ADVIES", {
    x: M + bold.widthOfTextAtSize("SLIM", 21) + 7,
    y: A4.h - 50, size: 21, font: bold, color: rgb(1, 1, 1),
  });
  page.drawText(wa(subtitel), { x: M, y: A4.h - 72, size: 10, font: reg, color: rgb(0.72, 0.78, 0.86) });

  const datumLabel = datum.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
  const datumW = reg.widthOfTextAtSize(wa(datumLabel), 10);
  page.drawText(wa(datumLabel), { x: A4.w - M - datumW, y: A4.h - 50, size: 10, font: reg, color: rgb(1, 1, 1) });
  if (referentie) {
    const refW = reg.widthOfTextAtSize(wa(referentie), 9);
    page.drawText(wa(referentie), { x: A4.w - M - refW, y: A4.h - 72, size: 9, font: reg, color: rgb(0.72, 0.78, 0.86) });
  }

  y = A4.h - 96 - 34;

  // ── Aanhef ──────────────────────────────────────────────────────────────
  tekst(`Quickscan SLIM-subsidie${bedrijf ? ` - ${bedrijf}` : ""}`, { font: bold, size: 16, kleur: NAVY, lh: 24 });
  y -= 4;
  tekst(
    `Dit rapport bevat de uitkomst van de quickscan die op ${datumLabel} is ingevuld${naam ? ` door ${naam}` : ""}. ` +
    "De uitslag is een indicatie op basis van de gegeven antwoorden en vormt geen toekenning of afwijzing van subsidie.",
    { size: 10.5, kleur: GREY, lh: 15 }
  );
  y -= 14;

  // ── Uitslagblok ─────────────────────────────────────────────────────────
  const u = UITSLAG[uitslag] || UITSLAG["mogelijk-kansrijk"];
  const uitslagRegels = wrap(u.tekst, reg, 10.5, CONTENT_W - 32);
  // 63 = kop + label + ondermarge; elke tekstregel 15pt; de indicatieregel nog eens 19pt.
  const blokH = 63 + uitslagRegels.length * 15 + (indicatie ? 19 : 0);
  ruimte(blokH + 10);
  page.drawRectangle({
    x: M, y: y - blokH, width: CONTENT_W, height: blokH,
    color: SOFT, borderColor: LINE, borderWidth: 1,
  });
  page.drawRectangle({ x: M, y: y - blokH, width: 4, height: blokH, color: u.kleur });

  page.drawText("UITSLAG QUICKSCAN", { x: M + 18, y: y - 22, size: 8.5, font: bold, color: GREY });
  page.drawText(wa(u.label), { x: M + 18, y: y - 44, size: 17, font: bold, color: u.kleur });
  let by = y - 64;
  for (const regel of uitslagRegels) {
    page.drawText(regel, { x: M + 18, y: by, size: 10.5, font: reg, color: DARK });
    by -= 15;
  }
  if (indicatie) {
    page.drawText(
      wa(`Opgegeven investering: ${eur(indicatie.investering)}     Indicatief subsidiebedrag: tot ${eur(indicatie.subsidie)}`),
      { x: M + 18, y: by - 4, size: 10, font: bold, color: NAVY }
    );
  }
  y -= blokH + 26;

  // ── Tabellen ────────────────────────────────────────────────────────────
  function tabel(titel, rijen) {
    if (!rijen || rijen.length === 0) return;
    ruimte(40);
    page.drawText(wa(titel).toUpperCase(), { x: M, y: y - 10, size: 8.5, font: bold, color: GREY });
    y -= 22;

    const labelW = CONTENT_W * 0.62;
    for (const [label, waarde] of rijen) {
      const labelRegels = wrap(label, reg, 10, labelW - 10);
      const waardeRegels = wrap(waarde ?? "-", bold, 10, CONTENT_W - labelW - 10);
      const rijH = Math.max(labelRegels.length, waardeRegels.length) * 14 + 9;
      ruimte(rijH);

      let ry = y - 12;
      for (const regel of labelRegels) {
        page.drawText(regel, { x: M, y: ry, size: 10, font: reg, color: GREY });
        ry -= 14;
      }
      let wy = y - 12;
      for (const regel of waardeRegels) {
        const w = bold.widthOfTextAtSize(regel, 10);
        page.drawText(regel, { x: A4.w - M - w, y: wy, size: 10, font: bold, color: NAVY });
        wy -= 14;
      }
      y -= rijH;
      page.drawLine({ start: { x: M, y }, end: { x: A4.w - M, y }, thickness: 0.5, color: LINE });
    }
    y -= 22;
  }

  tabel("Gegevens aanvrager", [
    ["Naam", naam || "-"],
    ["Organisatie", bedrijf || "-"],
    ["E-mailadres", email || "-"],
    ["Telefoonnummer", telefoon || "-"],
    ...(medewerkers ? [["Aantal medewerkers", medewerkers]] : []),
  ]);

  tabel("Bedrijfsprofiel", profielRijen);
  tabel("Antwoorden quickscan", antwoordRijen);

  // ── Aandachtspunten ─────────────────────────────────────────────────────
  if (redenen && redenen.length > 0) {
    ruimte(40);
    page.drawText("AANDACHTSPUNTEN", { x: M, y: y - 10, size: 8.5, font: bold, color: GREY });
    y -= 24;
    for (const reden of redenen) {
      const regels = wrap(reden, reg, 10, CONTENT_W - 16);
      ruimte(regels.length * 14 + 8);
      page.drawText("-", { x: M, y: y - 10, size: 10, font: bold, color: u.kleur });
      let ry = y - 10;
      for (const regel of regels) {
        page.drawText(regel, { x: M + 14, y: ry, size: 10, font: reg, color: DARK });
        ry -= 14;
      }
      y -= regels.length * 14 + 8;
    }
    y -= 14;
  }

  // ── Vervolgstap ─────────────────────────────────────────────────────────
  ruimte(60);
  page.drawText("VERVOLGSTAP", { x: M, y: y - 10, size: 8.5, font: bold, color: GREY });
  y -= 24;
  tekst(
    uitslag === "niet-kansrijk"
      ? "Heeft u vragen over uw situatie of wilt u weten of er alternatieve regelingen zijn? Neem contact op via info@slimsubsidieadvies.nl."
      : "Reserveer uw aanvraagplaats via www.slimsubsidieadvies.nl/reserveren. Wij nemen daarna contact met u op voor de intake en verzorgen de volledige aanvraag.",
    { size: 10.5, kleur: DARK, lh: 15 }
  );

  // ── Voettekst op elke pagina ────────────────────────────────────────────
  const totaal = paginas.length;
  paginas.forEach((p, i) => {
    p.drawLine({ start: { x: M, y: M + 26 }, end: { x: A4.w - M, y: M + 26 }, thickness: 0.5, color: LINE });
    p.drawText(
      wa("SLIM Subsidie Advies - onderdeel van Inscentia BV - KvK 83970614 - info@slimsubsidieadvies.nl"),
      { x: M, y: M + 12, size: 8, font: reg, color: GREY }
    );
    const nr = wa(`${i + 1} / ${totaal}`);
    const nrW = reg.widthOfTextAtSize(nr, 8);
    p.drawText(nr, { x: A4.w - M - nrW, y: M + 12, size: 8, font: reg, color: GREY });
  });

  const bytes = await pdf.save();
  return Buffer.from(bytes).toString("base64");
}

/** Bestandsnaam zonder rare tekens, bv. Quickscan-SLIM-Acme-BV-2026-09-05.pdf */
export function quickscanBestandsnaam({ bedrijf, naam, datum = new Date() }) {
  const basis = (bedrijf || naam || "rapport")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "rapport";
  const d = `${datum.getFullYear()}-${String(datum.getMonth() + 1).padStart(2, "0")}-${String(datum.getDate()).padStart(2, "0")}`;
  return `Quickscan-SLIM-${basis}-${d}.pdf`;
}
