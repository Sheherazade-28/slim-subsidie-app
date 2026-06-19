import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import { SUBSIDIE, PRICING, BEDRIJFSINFO } from "@/data/slim-content";

export const metadata = {
  title: "SLIM-subsidie voorwaarden 2026 — Kom ik in aanmerking?",
  description:
    "Alle voorwaarden voor de SLIM-subsidie 2026. MKB-definitie, minimale subsidie, de-minimisplafond, doelgroep en uitsluitingen. Doe de gratis quickscan en weet het in 2 minuten.",
  alternates: {
    canonical: "https://www.slimsubsidieadvies.nl/slim-subsidie-voorwaarden",
  },
};

function fmtEur(n) {
  return `€${n.toLocaleString("nl-NL")}`;
}

const faqItems = [
  {
    q: "Kom ik als ZZP'er in aanmerking?",
    a: "Nee. De SLIM-subsidie vereist minimaal één werknemer met een arbeidscontract. ZZP'ers zonder personeel komen niet in aanmerking.",
  },
  {
    q: "Mijn holding heeft meerdere BV's — hoe werkt dat?",
    a: "Verbonden en gelieerde ondernemingen worden meegeteld. Een holding met meerdere BV's telt als geheel voor de MKB-definitie. De omzet en medewerkers van alle verbonden entiteiten worden opgeteld.",
  },
  {
    q: "Is er een minimale subsidie?",
    a: `Voor Activiteit A en C geldt een minimale subsidie van ${fmtEur(SUBSIDIE.minSubsidie)}, wat neerkomt op een benodigde projectomvang van minimaal ${fmtEur(SUBSIDIE.minProjectomvang)}. Voor Activiteit B geldt geen minimum.`,
  },
  {
    q: "Wat is het de-minimisplafond?",
    a: "In de afgelopen 3 belastingjaren mag uw bedrijf maximaal €300.000 aan staatssteun (de-minimissteun) hebben ontvangen. U verklaart dit bij aanvraag via de de-minimisverklaring.",
  },
  {
    q: "Kan ik elk jaar opnieuw aanvragen?",
    a: "Ja. Per tijdvak mag u één aanvraag indienen. Er zijn jaarlijks twee tijdvakken voor individueel MKB (voorjaar en najaar). Eerder verleende subsidie voor Activiteit A of C moet wel zijn vastgesteld voordat u opnieuw een vergelijkbare aanvraag indient.",
  },
  {
    q: "Geldt nog steeds 80% subsidie voor klein-MKB?",
    a: "Nee. Per 5 juli 2025 is het subsidiepercentage voor alle MKB-ondernemingen 60% — klein én middelgroot. De 80%-regeling bestaat niet meer.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const s = {
  sectie: { padding: "64px 20px" },
  inner: { maxWidth: 860, margin: "0 auto" },
  slbl: { fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--blue)", marginBottom: 10 },
  h2: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 800, color: "var(--navy)", marginTop: 0, marginBottom: 16 },
  tekst: { fontSize: 15, color: "var(--text)", lineHeight: 1.7, marginTop: 0, marginBottom: 20 },
};

export default function SlimSubsidieVoorwaardenPage() {
  return (
    <div className="hp">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navigation />

      {/* ── HERO ── */}
      <div style={{ background: "var(--navy)", padding: "56px 20px 48px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -80, top: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(26,107,191,0.12)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 10 }}>VOORWAARDEN 2026</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginTop: 0, marginBottom: 16 }}>
            Kom ik in aanmerking voor SLIM-subsidie?
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 620, marginBottom: 28 }}>
            De SLIM-subsidie is beschikbaar voor MKB-ondernemingen conform de Europese definitie. Hier leest u precies aan welke voorwaarden uw bedrijf moet voldoen.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/quickscan" className="hp-btn-p">Doe de gratis quickscan →</Link>
            <Link href="/slim-subsidie-activiteiten" className="hp-btn-s">Bekijk de activiteiten →</Link>
          </div>
        </div>
      </div>

      {/* ── SECTIE 1: DOELGROEP ── */}
      <div id="doelgroep" style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>DOELGROEP</div>
          <h2 style={s.h2}>Voor wie is de SLIM-subsidie?</h2>
          <p style={s.tekst}>
            De MKB-definitie volgt de EU-definitie, berekend over het laatste afgesloten boekjaar. Verbonden en gelieerde ondernemingen worden meegeteld — een holding met meerdere BV&apos;s telt als geheel.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 24 }}>
            {[
              {
                tag: "Kleine onderneming",
                color: "var(--blue)",
                bg: "var(--blue-pale)",
                items: [
                  "Minder dan 50 medewerkers",
                  "Jaaromzet of balanstotaal max. €10 miljoen",
                  `Subsidie: ${SUBSIDIE.percentage}% tot ${fmtEur(SUBSIDIE.maxBedrag)}`,
                ],
              },
              {
                tag: "Middelgrote onderneming",
                color: "var(--blue)",
                bg: "var(--blue-pale)",
                items: [
                  "Minder dan 250 medewerkers",
                  "Jaaromzet max. €50 miljoen OF balanstotaal max. €43 miljoen",
                  `Subsidie: ${SUBSIDIE.percentage}% tot ${fmtEur(SUBSIDIE.maxBedrag)}`,
                ],
              },
              {
                tag: "Uitzondering — MKB landbouwbedrijven",
                color: "var(--orange)",
                bg: "var(--orange-l)",
                items: [
                  "Valt onder Verordening (EU) nr. 1408/2013",
                  `Subsidie: ${SUBSIDIE.percentage}% tot ${fmtEur(SUBSIDIE.maxBedragLandbouw)} (lager plafond)`,
                  "Grootbedrijven in landbouw/horeca/recreatie: niet meer individueel subsidiabel per 2025",
                ],
              },
            ].map(({ tag, color, bg, items }) => (
              <div key={tag} style={{ background: "var(--white)", border: "1px solid var(--border-l)", borderRadius: "var(--r)", padding: "22px 20px" }}>
                <div style={{ display: "inline-block", background: bg, color, fontSize: 11, fontWeight: 700, letterSpacing: "0.5px", padding: "3px 10px", borderRadius: 20, marginBottom: 14 }}>{tag}</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: "var(--muted)", lineHeight: 1.8 }}>
                  {items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTIE 2: AANVULLENDE VOORWAARDEN ── */}
      <div id="aanvullende-voorwaarden" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>AANVULLENDE VOORWAARDEN</div>
          <h2 style={s.h2}>Aan welke voorwaarden moet u voldoen?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {[
              {
                nr: "1",
                titel: "Minimaal 1 werknemer in loondienst",
                tekst: "Uw bedrijf moet minimaal één werknemer hebben met een arbeidscontract. DGA-only ondernemingen of bedrijven met uitsluitend zzp'ers komen niet in aanmerking.",
              },
              {
                nr: "2",
                titel: "Gevestigd in Nederland",
                tekst: "Zowel de vestiging als de activiteiten moeten in Nederland zijn.",
              },
              {
                nr: "3",
                titel: "Project nog niet gestart",
                tekst: "Activiteiten mogen nog niet zijn begonnen vóór de datum van de subsidiebeschikking. Niet vóór indiening — vóór de beschikking.",
              },
              {
                nr: "4",
                titel: "Maximaal 1 aanvraag per tijdvak",
                tekst: "Per onderneming is slechts één aanvraag per opengesteld tijdvak toegestaan. Een tweede aanvraag voor soortgelijke initiatieven wordt niet meegenomen in de loting.",
              },
              {
                nr: "5",
                titel: "De-minimisplafond",
                tekst: "In de afgelopen 3 belastingjaren maximaal €300.000 staatssteun ontvangen (de-minimissteun conform Verordening EU 2023/2831).",
              },
              {
                nr: "6",
                titel: "Niet in financiële moeilijkheden",
                tekst: "Bedrijven in staat van faillissement, surseance van betaling of schuldsanering zijn uitgesloten.",
              },
            ].map(({ nr, titel, tekst }) => (
              <div key={nr} style={{ background: "var(--off)", border: "1px solid var(--border-l)", borderRadius: "var(--r)", padding: "20px" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--navy)", color: "var(--blue-light)", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{nr}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--navy)", marginBottom: 6 }}>{titel}</div>
                    <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>{tekst}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTIE 3: SUBSIDIEBEDRAGEN ── */}
      <div id="subsidiebedragen" style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>SUBSIDIEBEDRAGEN</div>
          <h2 style={s.h2}>Hoeveel subsidie kunt u krijgen?</h2>
          <div style={{ overflowX: "auto", marginBottom: 20 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 520 }}>
              <thead>
                <tr style={{ background: "var(--navy)", color: "#fff" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, borderRadius: "var(--rs) 0 0 0" }}></th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700 }}>Individueel MKB</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, borderRadius: "0 var(--rs) 0 0" }}>Samenwerkingsverband</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Subsidiepercentage", `${SUBSIDIE.percentage}% van subsidiabele kosten`, `${SUBSIDIE.percentage}% van subsidiabele kosten`],
                  ["Maximum subsidie", `Tot ${fmtEur(SUBSIDIE.maxBedrag)}`, `Tot ${fmtEur(SUBSIDIE.maxBedragSamenwerking)} (max. ${fmtEur(SUBSIDIE.maxPerPartnerSamenwerking ?? 200000)} per partner)`],
                  ["Minimum subsidie", `${fmtEur(SUBSIDIE.minSubsidie)} (act. A en C) · Geen minimum voor B`, "€125.000"],
                  ["Landbouw MKB", `Tot ${fmtEur(SUBSIDIE.maxBedragLandbouw)}`, "—"],
                  ["Voorschot", "Binnen 6 weken 50% bij toekenning", "25% bij verlening · 50% na voortgangsverslag"],
                ].map(([lbl, mkb, sw], i) => (
                  <tr key={lbl} style={{ background: i % 2 === 0 ? "var(--white)" : "var(--off)", borderBottom: "1px solid var(--border-l)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--navy)" }}>{lbl}</td>
                    <td style={{ padding: "12px 16px", color: "var(--text)" }}>{mkb}</td>
                    <td style={{ padding: "12px 16px", color: "var(--text)" }}>{sw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ background: "var(--orange-l)", border: "1px solid var(--orange-b)", borderRadius: "var(--rs)", padding: "14px 18px", fontSize: 13, color: "var(--text)", lineHeight: 1.65 }}>
            <strong style={{ color: "var(--orange)" }}>Let op:</strong> Sommige adviseurs vermelden nog een subsidie van 80% voor klein-MKB. Deze regeling bestaat niet meer. Per 5 juli 2025 geldt artikel 2.20 van de SLIM-regeling: het subsidiepercentage is {SUBSIDIE.percentage}% voor alle MKB-ondernemingen — klein én middelgroot.
          </div>
        </div>
      </div>

      {/* ── SECTIE 4: KOSTENSYSTEMATIEK ── */}
      <div id="kosten" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>SUBSIDIABELE KOSTEN</div>
          <h2 style={s.h2}>Welke kosten zijn subsidiabel?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
            <div style={{ background: "var(--green-l)", border: "1px solid var(--green-b)", borderRadius: "var(--r)", padding: "20px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--green)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>Wel subsidiabel</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: "var(--text)", lineHeight: 1.9 }}>
                <li>Externe advieskosten (max. €{SUBSIDIE.maxUurtarief} per uur excl. btw)</li>
                <li>Interne loonkosten (brutoloon + 32% opslag, basis 1.720 werkbare uren/jaar)</li>
                <li>15% forfaitaire opslag op bovenstaande kosten</li>
                <li>Controleverklaring €3.000 vast bedrag (uitsluitend bij samenwerkingsverbanden)</li>
              </ul>
            </div>
            <div style={{ background: "var(--red-l)", border: "1px solid var(--red-b)", borderRadius: "var(--r)", padding: "20px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#7f1d1d", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>Niet subsidiabel</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: "var(--text)", lineHeight: 1.9 }}>
                <li>Loonverletkosten (productiviteitsverlies tijdens activiteiten)</li>
                <li>BTW</li>
                <li>Overhead en huisvestingskosten</li>
                <li>Reguliere kantoorapparatuur of software</li>
                <li>Kosten buiten de initiatiefperiode</li>
              </ul>
            </div>
          </div>
          <div style={s.slbl}>REKENVOORBEELD</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, maxWidth: 500 }}>
              <tbody>
                {[
                  ["Externe advieskosten", "€10.000", false],
                  ["Interne loonkosten", "€3.000", false],
                  ["Subtotaal", "€13.000", false],
                  ["15% forfaitaire opslag", "€1.950", false],
                  ["Totale subsidiabele kosten", "€14.950", true],
                  ["Subsidie (60%)", "€8.970", true],
                ].map(([post, bedrag, highlight]) => (
                  <tr key={post} style={{ background: highlight ? "var(--blue-pale)" : (post === "Subtotaal" ? "var(--off)" : "var(--white)"), borderBottom: "1px solid var(--border-l)" }}>
                    <td style={{ padding: "10px 16px", color: highlight ? "var(--navy)" : "var(--text)", fontWeight: highlight ? 700 : 400 }}>{post}</td>
                    <td style={{ padding: "10px 16px", fontWeight: highlight ? 700 : 600, color: highlight ? "var(--blue)" : "var(--navy)", textAlign: "right" }}>{bedrag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── SECTIE 5: UITSLUITINGEN ── */}
      <div id="uitsluitingen" style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>UITSLUITINGEN</div>
          <h2 style={s.h2}>Wie komt niet in aanmerking?</h2>
          <div style={{ background: "var(--white)", border: "1px solid var(--border-l)", borderRadius: "var(--r)", padding: "24px", marginBottom: 20 }}>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "var(--text)", lineHeight: 2 }}>
              <li>Grootbedrijven (250+ medewerkers) — uitsluitend via samenwerkingsverband</li>
              <li>DGA-only ondernemingen zonder personeel in loondienst</li>
              <li>Bedrijven in faillissement of surseance</li>
              <li>Ondernemingen die het de-minimisplafond hebben overschreden</li>
              <li>Projecten die al gestart zijn vóór de subsidiebeschikking</li>
              <li>Activiteiten uitsluitend gericht op bestuurders of DGA&apos;s</li>
            </ul>
          </div>
          <div style={{ background: "var(--orange-l)", border: "1px solid var(--orange-b)", borderRadius: "var(--rs)", padding: "14px 18px", fontSize: 13, color: "var(--text)", lineHeight: 1.65 }}>
            <strong style={{ color: "var(--orange)" }}>⚠️ Activiteit D afgeschaft:</strong> Activiteit D (praktijkleerplaats voor BBL-deelnemers) is per 2025 afgeschaft. Aanvragen met Activiteit D worden niet gehonoreerd.
          </div>
        </div>
      </div>

      {/* ── CTA-BLOK ── */}
      <div style={{ background: "#e8f4fc", padding: "48px 20px", borderTop: "1px solid #c7d9f5", borderBottom: "1px solid #c7d9f5" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.3rem, 2.8vw, 1.8rem)", fontWeight: 800, color: "var(--navy)", marginTop: 0, marginBottom: 10 }}>
            Weet u binnen 2 minuten of u in aanmerking komt
          </h2>
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 24px" }}>
            Doe de gratis quickscan. Geen verplichtingen.
          </p>
          <Link href="/quickscan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>
            Doe de gratis quickscan →
          </Link>
          <p className="hp-cta-note" style={{ marginTop: 16 }}>
            Gratis quickscan · Reserveringsfee {fmtEur(PRICING.reserveringsfee)} excl. btw · Succesfee {fmtEur(PRICING.succesfee)} excl. btw — no cure, no pay
          </p>
        </div>
      </div>

      {/* ── SECTIE 6: FAQ ── */}
      <div id="faq" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>VEELGESTELDE VRAGEN</div>
          <h2 style={s.h2}>FAQ — SLIM-subsidie voorwaarden</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {faqItems.map(({ q, a }, i) => (
              <details key={i} style={{ background: "var(--off)", border: "1px solid var(--border-l)", borderRadius: "var(--rs)", overflow: "hidden" }}>
                <summary style={{ padding: "16px 18px", fontWeight: 600, fontSize: 15, color: "var(--navy)", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {q}
                  <span style={{ fontSize: 18, fontWeight: 300, flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <div style={{ padding: "0 18px 16px", fontSize: 14, color: "var(--muted)", lineHeight: 1.75 }}>
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* ── SLOTSECTIE ── */}
      <div style={{ background: "var(--navy)", padding: "56px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 12 }}>
            TIJDVAK 2 OPENT 10 AUGUSTUS 2026
          </div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 800, color: "#fff", marginTop: 0, marginBottom: 24 }}>
            Voldoet uw bedrijf aan de voorwaarden?
          </h2>
          <Link href="/quickscan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>
            Doe de gratis quickscan →
          </Link>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 16, lineHeight: 1.6 }}>
            Gratis quickscan · Reserveringsfee {fmtEur(PRICING.reserveringsfee)} excl. btw · Succesfee {fmtEur(PRICING.succesfee)} excl. btw — no cure, no pay
          </p>
        </div>
      </div>

      {/* ── BRONVERMELDING ── */}
      <div style={{ background: "var(--navy)", padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0, textAlign: "center", lineHeight: 1.9 }}>
          Bronnen:{" "}
          <a href="https://wetten.overheid.nl/BWBR0043015/2025-07-05" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "underline" }}>
            wetten.overheid.nl/BWBR0043015/2025-07-05
          </a>
          {" · "}
          <a href="https://www.uitvoeringvanbeleidszw.nl" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "underline" }}>
            uitvoeringvanbeleidszw.nl
          </a>
        </p>
      </div>

      {/* ── FOOTER ── */}
      <footer className="ftr">
        <div className="ftr-inner">
          <div className="ftr-links">
            <Link href="/privacy">Privacyverklaring</Link>
            <Link href="/av">Algemene Voorwaarden</Link>
          </div>
          <div className="ftr-company">
            <span><strong>SLIM Subsidie Advies</strong> — onderdeel van Inscentia BV</span>
            <span>
              KvK: {BEDRIJFSINFO.kvk} &nbsp;·&nbsp; BTW: {BEDRIJFSINFO.btw} &nbsp;·&nbsp;{" "}
              <a href={`mailto:${BEDRIJFSINFO.email}`} style={{ color: "var(--blue-light)", textDecoration: "none" }}>{BEDRIJFSINFO.email}</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
