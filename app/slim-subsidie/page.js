import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import FAQAccordeon from "@/components/ui/FAQAccordeon";
import {
  SUBSIDIE,
  PRICING,
  BUDGET_2026,
  STATE_OF_SLIM,
  TIJDVAKKEN_2026,
  LOTING,
  ACTIVITEITEN,
  FAQ_SLIM_SUBSIDIE,
  fmtEur,
} from "@/data/slim-content";

export const metadata = {
  title: "SLIM-subsidie aanvragen in 2026 | Gratis quickscan voor MKB",
  description:
    "Kom in aanmerking voor tot €25.000 SLIM-subsidie. Gratis quickscan in 2 minuten. SLIM Subsidie Advies begeleidt MKB van A tot Z. Tijdvak 2 opent 10 augustus 2026.",
  alternates: {
    canonical: "https://www.slimsubsidieadvies.nl/slim-subsidie",
  },
};

function getTijdvakStatus(tv) {
  const now = new Date();
  if (now > tv.close) return "Gesloten";
  if (now >= tv.open) return "Open";
  return "Binnenkort open";
}

function fmtDatum(d) {
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

function fmtTijd(d) {
  return d.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
}

export default function SlimSubsidiePage() {
  const tijdvakken2026 = TIJDVAKKEN_2026.filter((tv) => tv.open.getFullYear() === 2026);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_SLIM_SUBSIDIE.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div className="hp">
      <Navigation />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. HERO ── */}
      <div className="hp-hero">
        <div className="hp-hero-inner">
          <div>
            <div className="hp-badge">
              <span className="phase-dot" />&nbsp;Gratis quickscan · Tijdvak 2 opent 10 augustus 2026
            </div>
            <h1 className="hp-h1">
              SLIM-subsidie<br />aanvragen<br />in <span>2026</span>
            </h1>
            <p className="hp-sub">
              {SUBSIDIE.percentage}% subsidie voor leren en ontwikkelen in uw MKB. Tot{" "}
              {fmtEur(SUBSIDIE.maxBedrag)} per aanvraag. Voor alle MKB-ondernemingen met
              personeel in loondienst.
            </p>
            <div className="hp-ctas">
              <Link href="/scan" className="hp-btn-p">Doe de gratis quickscan →</Link>
              <Link href="#wat-is-slim" className="hp-btn-s">Wat is SLIM-subsidie?</Link>
            </div>
            <div className="hp-stats">
              <div>
                <div className="hp-stat-num">
                  {SUBSIDIE.percentage}<em>%</em>
                </div>
                <div className="hp-stat-lbl">Subsidie op uw investering</div>
              </div>
              <div>
                <div className="hp-stat-num">
                  €<em>{SUBSIDIE.maxBedrag.toLocaleString("nl-NL")}</em>
                </div>
                <div className="hp-stat-lbl">Maximum per aanvraag</div>
              </div>
              <div>
                <div className="hp-stat-num">
                  <em>{STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")}</em>
                </div>
                <div className="hp-stat-lbl">Gehonoreerde projecten 2020–2024</div>
              </div>
            </div>
          </div>

          <div>
            <div className="hp-card">
              <div className="hp-card-title">SLIM 2026 — snel overzicht</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  ["Subsidiepercentage", `${SUBSIDIE.percentage}% (alle MKB)`],
                  ["Max. individueel MKB", fmtEur(SUBSIDIE.maxBedrag)],
                  ["Max. samenwerking", fmtEur(SUBSIDIE.maxBedragSamenwerking)],
                  ["Budget 2026 totaal", `€ ${BUDGET_2026.totaal / 1_000_000} mln`],
                  ["Looptijd MKB", `${SUBSIDIE.looptijdMKB} maanden`],
                  ["Voorschot bij toekenning", `${SUBSIDIE.voorschot * 100}%`],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      background: "rgba(255,255,255,0.07)",
                      borderRadius: 8,
                      padding: "9px 14px",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{value}</span>
                  </div>
                ))}
              </div>

              <div className="hp-card-title" style={{ marginTop: 16 }}>Tijdvakken 2026</div>
              <div className="hp-tl">
                {tijdvakken2026.map((tv) => {
                  const status = getTijdvakStatus(tv);
                  const dotClass = status === "Gesloten" ? "done" : status === "Open" ? "active" : "future";
                  const badgeClass = status === "Open" ? "open" : "closed";
                  return (
                    <div key={tv.label} className="hp-tl-item">
                      <div className={`hp-tl-dot ${dotClass}`} />
                      <div className="hp-tl-text">
                        <strong>{tv.label}</strong>
                        {tv.type === "samenwerking" && (
                          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginLeft: 6 }}>SWV</span>
                        )}
                        {" — "}
                        {tv.open.toLocaleDateString("nl-NL", { day: "numeric", month: "short" })} t/m{" "}
                        {tv.close.toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                      <span className={`hp-tl-badge ${badgeClass}`}>{status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. CORRECTIEBALK ── */}
      <div
        style={{
          background: "#fffbe6",
          borderTop: "3px solid #f59e0b",
          borderBottom: "3px solid #f59e0b",
          padding: "18px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: 22, flexShrink: 0, lineHeight: 1.4 }}>⚠️</span>
          <div>
            <strong style={{ fontSize: 15, color: "#92400e" }}>
              Let op: sommige adviseurs vermelden nog een subsidie van 80% voor klein-MKB.
              Deze regeling bestaat niet meer.
            </strong>
            <p style={{ fontSize: 14, color: "#92400e", margin: "6px 0 0", lineHeight: 1.6 }}>
              Per 5 juli 2025 geldt artikel 2.20 van de SLIM-regeling: het subsidiepercentage
              is <strong>{SUBSIDIE.percentage}%</strong> voor alle MKB-ondernemingen — klein én
              middelgroot. Controleer of uw adviseur met actuele regelgeving werkt.{" "}
              <a
                href="https://wetten.overheid.nl/BWBR0043015/2025-07-05"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1a6bbf", fontSize: 12 }}
              >
                [Bron: wetten.overheid.nl — artikel 2.20 SLIM-regeling, 5 juli 2025]
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* ── 3. SLIM IN HET KORT ── */}
      <div className="hp-section" style={{ background: "var(--white)" }}>
        <div className="hp-si">
          <div className="hp-slbl">Subsidie op een rij</div>
          <h2 className="hp-stitle">SLIM in het kort</h2>
          <div className="hp-l-grid">
            {[
              [`${SUBSIDIE.percentage}%`, "Subsidiepercentage voor alle MKB"],
              [fmtEur(SUBSIDIE.maxBedrag), "Maximum individuele aanvraag"],
              [fmtEur(SUBSIDIE.maxBedragSamenwerking), "Maximum samenwerkingsverband"],
              [`€ ${BUDGET_2026.totaal / 1_000_000} mln`, "Budget 2026 totaal"],
              [`${SUBSIDIE.looptijdMKB} maanden`, "Maximale looptijd MKB"],
              [`${SUBSIDIE.voorschot * 100}%`, "Voorschot bij toekenning"],
            ].map(([num, lbl]) => (
              <div key={lbl} className="hp-l-card">
                <div className="hp-l-num b" style={{ fontSize: 26 }}>{num}</div>
                <div className="hp-l-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. WAT IS SLIM? ── */}
      <div id="wat-is-slim" className="hp-section" style={{ background: "var(--off)" }}>
        <div className="hp-si">
          <div className="hp-slbl">Achtergrond</div>
          <h2 className="hp-stitle">Wat is de SLIM-subsidie?</h2>
          <div style={{ maxWidth: 800 }}>
            <p className="hp-ssub">
              De SLIM-subsidie — voluit de Stimuleringsregeling Leren en Ontwikkelen in
              Mkb-ondernemingen — is een subsidieregeling van het Ministerie van Sociale Zaken
              en Werkgelegenheid, uitgevoerd door de Rijksdienst voor Ondernemend Nederland
              (RVO).
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--muted)", marginBottom: 18 }}>
              De regeling is in 2020 ingevoerd met één doel: leren en ontwikkelen in het
              Nederlandse midden- en kleinbedrijf structureel bevorderen. Veel MKB-bedrijven
              investeren te weinig in de ontwikkeling van hun medewerkers — niet omdat ze dat
              niet willen, maar omdat de directe kosten hoog zijn en de opbrengsten op lange
              termijn moeilijk zichtbaar zijn. De SLIM-subsidie verlaagt die drempel door{" "}
              {SUBSIDIE.percentage}% van de subsidiabele kosten te vergoeden, tot maximaal{" "}
              {fmtEur(SUBSIDIE.maxBedrag)} per aanvraag voor individuele MKB-ondernemingen.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--muted)", marginBottom: 18 }}>
              De regeling richt zich op drie typen activiteiten. <strong>Activiteit A</strong>{" "}
              financiert het doorlichten van de onderneming op leerbehoefte, uitmondend in een
              concreet opleidings- of ontwikkelplan. <strong>Activiteit B</strong> vergoedt
              individuele loopbaan- en ontwikkeladviezen voor werknemers, uitgevoerd door
              gecertificeerde loopbaanadviseurs (Noloc-geregistreerd). <strong>Activiteit C</strong>{" "}
              ondersteunt het structureel inbedden van een leer- en ontwikkelmethodiek in de
              bedrijfsvoering — van een bedrijfsschool tot een mentorprogramma, e-learningplatform
              of systeem van periodieke ontwikkelgesprekken.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--muted)", marginBottom: 18 }}>
              <strong>Activiteit D</strong> (praktijkleerplaats voor BBL-deelnemers) is per 2025
              afgeschaft en kan niet meer worden aangevraagd. Adviseurs die Activiteit D nog
              noemen, werken met verouderde informatie.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--muted)", marginBottom: 18 }}>
              De subsidie wordt verdeeld via gesloten aanvraagtijdvakken. Wanneer meer
              ondernemers aanvragen dan het beschikbare budget toelaat, bepaalt een notariële
              loting welke aanvragen in behandeling worden genomen. Inloting is daarmee een
              noodzakelijke voorwaarde om een inhoudelijke beoordeling te krijgen — geen
              garantie op toekenning. Na inloting beoordeelt RVO de aanvraag inhoudelijk.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--muted)", marginBottom: 18 }}>
              In 2026 is voor individuele MKB-aanvragen{" "}
              €{BUDGET_2026.individueel / 1_000_000} miljoen beschikbaar, en voor
              samenwerkingsverbanden €{BUDGET_2026.samenwerking / 1_000_000} miljoen. Het
              totale budget bedraagt €{BUDGET_2026.totaal / 1_000_000} miljoen.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--muted)" }}>
              Analyse van {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} gehonoreerde
              SLIM-projecten (2020–2024) toont aan dat de meeste MKB-ondernemers kiezen voor
              Activiteit A of C. Loopbaanadviezen (Activiteit B) en omscholingsprojecten worden
              structureel onderbenut — slechts{" "}
              {STATE_OF_SLIM.conversieProjecten} van de{" "}
              {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} gehonoreerde projecten
              betreft conversie of omscholing. Dit segment heeft daarmee structureel minder
              concurrentie bij de loting.
            </p>
          </div>
        </div>
      </div>

      {/* ── 5. TIJDVAKKEN 2026 ── */}
      <div className="hp-section" style={{ background: "var(--white)" }}>
        <div className="hp-si">
          <div className="hp-slbl">Planning</div>
          <h2 className="hp-stitle">Aanvraagtijdvakken 2026</h2>
          <p className="hp-ssub">
            Begin minimaal 4 weken vóór sluiting met de voorbereiding. Bij overintekening
            bepaalt loting de behandelvolgorde. Onvolledige aanvragen die na sluiting worden
            hersteld, komen achteraan in de rij.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 760, marginTop: 28 }}>
            {tijdvakken2026.map((tv) => {
              const status = getTijdvakStatus(tv);
              const isGesloten = status === "Gesloten";
              const isOpen = status === "Open";
              const borderColor = isGesloten ? "#e8edf3" : isOpen ? "#a8d8bc" : "#f59e0b";
              const bg = isGesloten ? "#f7f9fc" : isOpen ? "#f0fdf4" : "#fffbe6";

              return (
                <div
                  key={tv.label}
                  style={{
                    background: bg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: 12,
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 14,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        marginBottom: 4,
                      }}
                    >
                      {tv.type === "samenwerking"
                        ? "Samenwerkingsverbanden"
                        : "Individueel MKB"}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "var(--navy)",
                        marginBottom: 6,
                      }}
                    >
                      {tv.label}
                    </div>
                    <div style={{ fontSize: 14, color: "var(--muted)" }}>
                      {fmtDatum(tv.open)} om {fmtTijd(tv.open)}{" "}
                      t/m {fmtDatum(tv.close)} om {fmtTijd(tv.close)}
                    </div>
                  </div>
                  <span
                    className={`hp-tl-badge ${isOpen ? "open" : "closed"}`}
                    style={{ fontSize: 13, padding: "5px 14px", borderRadius: 20, flexShrink: 0 }}
                  >
                    {status}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="alert-info" style={{ marginTop: 20, maxWidth: 760 }}>
            💡 <strong>Advies:</strong> Er is geen voordeel aan vroeg indienen binnen het
            tijdvak zelf — de loting is aselect. Wat wél telt: een complete, foutloze aanvraag.
            Van de {LOTING.totaalIngediend.toLocaleString("nl-NL")} aanvragen in tijdvak 1
            2026 werden {LOTING.afgekeurdVoorLoting} al vóór de loting afgekeurd wegens
            vermijdbare fouten.
          </div>
        </div>
      </div>

      {/* ── 6. WIE KOMT IN AANMERKING? ── */}
      <div className="hp-section" style={{ background: "var(--off)" }}>
        <div className="hp-si">
          <div className="hp-slbl">Voorwaarden</div>
          <h2 className="hp-stitle">Wie komt in aanmerking?</h2>
          <p className="hp-ssub">
            De SLIM-subsidie is beschikbaar voor MKB-ondernemingen conform de Europese
            definitie, berekend over het laatste afgesloten boekjaar.
          </p>

          <div className="hp-req-grid" style={{ marginTop: 24 }}>
            {[
              {
                tag: "Kleine onderneming",
                tagClass: "a",
                items: [
                  "Minder dan 50 medewerkers",
                  "Jaaromzet of balanstotaal max. €10 miljoen",
                  `Subsidie: ${SUBSIDIE.percentage}% tot ${fmtEur(SUBSIDIE.maxBedrag)}`,
                ],
              },
              {
                tag: "Middelgrote onderneming",
                tagClass: "b",
                items: [
                  "Minder dan 250 medewerkers",
                  "Jaaromzet max. €50 miljoen OF balanstotaal max. €43 miljoen",
                  `Subsidie: ${SUBSIDIE.percentage}% tot ${fmtEur(SUBSIDIE.maxBedrag)}`,
                ],
              },
              {
                tag: "Grootbedrijf / Uitzondering",
                tagClass: "c",
                items: [
                  `Landbouw, horeca & recreatie: individueel aanvragen (max. ${fmtEur(SUBSIDIE.maxBedragLandbouw)})`,
                  `Via samenwerkingsverband: max. ${fmtEur(SUBSIDIE.maxBedragSamenwerking)} per aanvraag`,
                  `Per partner max. ${fmtEur(SUBSIDIE.maxPerPartnerSamenwerking)}`,
                ],
              },
            ].map((cat) => (
              <div key={cat.tag} className="hp-req-card">
                <div className={`hp-act-tag ${cat.tagClass}`}>{cat.tag}</div>
                <ul className="hp-req-list" style={{ marginTop: 12 }}>
                  {cat.items.map((item) => (
                    <li key={item} className="hp-req-item">
                      <span className="hp-req-dot" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 24,
              background: "var(--white)",
              border: "1px solid #e8edf3",
              borderRadius: 10,
              padding: "16px 22px",
              maxWidth: 760,
            }}
          >
            <strong style={{ color: "var(--navy)", display: "block", marginBottom: 8 }}>
              Aanvullende voorwaarden:
            </strong>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "var(--muted)", lineHeight: 1.85 }}>
              <li>Activiteiten mogen nog niet gestart zijn vóór de datum van subsidiebeschikking.</li>
              <li>Maximaal 1 aanvraag per tijdvak per onderneming.</li>
              <li>Bedrijven in financiële moeilijkheden (faillissement, surseance) zijn uitgesloten.</li>
              <li>De-minimisplafond mag niet overschreden zijn (max. €300.000 staatssteun in 3 belastingjaren).</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── 7. ACTIVITEITEN ── */}
      <div className="hp-section" style={{ background: "var(--white)" }}>
        <div className="hp-si">
          <div className="hp-slbl">Subsidiabele activiteiten</div>
          <h2 className="hp-stitle">Welke activiteiten komen in aanmerking?</h2>

          <div className="hp-act-grid">
            {ACTIVITEITEN.map((act) => (
              <div key={act.id} className="hp-act-card">
                <div className={`hp-act-tag ${act.tagClass}`}>{act.tag}</div>
                <div className="hp-act-title">{act.title}</div>
                <div className="hp-act-desc">{act.desc}</div>
                <div className="hp-act-tags">
                  {act.examples.map((ex) => (
                    <span key={ex} className="hp-act-tag-sm">{ex}</span>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 10, fontStyle: "italic" }}>
                  {act.min}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 28,
              background: "#fef2f2",
              border: "1px solid #fca5a5",
              borderRadius: 10,
              padding: "16px 20px",
              maxWidth: 760,
            }}
          >
            <strong style={{ color: "#dc2626" }}>⚠️ Activiteit D bestaat niet meer</strong>
            <p style={{ fontSize: 14, color: "#7f1d1d", margin: "6px 0 0", lineHeight: 1.65 }}>
              Activiteit D (praktijkleerplaats voor BBL-deelnemers) is per 2025 afgeschaft.
              Aanvragen met Activiteit D worden niet gehonoreerd. Controleer of uw adviseur
              hiervan op de hoogte is.
            </p>
          </div>
        </div>
      </div>

      {/* ── 8. SUBSIDIABELE KOSTEN ── */}
      <div className="hp-section" style={{ background: "var(--off)" }}>
        <div className="hp-si">
          <div className="hp-slbl">Kostensystematiek</div>
          <h2 className="hp-stitle">Subsidiabele kosten</h2>

          <div
            className="hp-req-grid"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginTop: 24 }}
          >
            <div
              className="hp-req-card"
              style={{ background: "#f0fdf4", borderColor: "#a8d8bc" }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "#1a7a4a",
                  marginBottom: 12,
                }}
              >
                ✓ Subsidiabel
              </div>
              <ul className="hp-req-list">
                {[
                  "Externe advieskosten (max. €135 per uur excl. BTW)",
                  `Interne loonkosten: brutoloon + ${SUBSIDIE.opslagInterneLoonkosten * 100}% opslag, basis ${SUBSIDIE.werkbareUren} werkbare uren per jaar`,
                  `${SUBSIDIE.forfaireOpslag * 100}% forfaitaire opslag op bovenstaande kosten`,
                  `Controleverklaring ${fmtEur(SUBSIDIE.controleverklaringBedrag)} vast bedrag (uitsluitend bij samenwerkingsverbanden)`,
                ].map((item) => (
                  <li key={item} className="hp-req-item">
                    <span className="hp-req-dot" style={{ background: "#1a7a4a" }} />
                    <span style={{ fontSize: 13 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="hp-req-card"
              style={{ background: "#fef2f2", borderColor: "#fca5a5" }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "#dc2626",
                  marginBottom: 12,
                }}
              >
                ✗ Niet subsidiabel
              </div>
              <ul className="hp-req-list">
                {[
                  "Reguliere opleidingen, cursussen en trainingen",
                  "Loonverletkosten (productiviteitsverlies medewerker)",
                  "BTW",
                  "Overhead en huisvestingskosten",
                  "Kosten buiten de initiatiefperiode",
                ].map((item) => (
                  <li key={item} className="hp-req-item">
                    <span className="hp-req-dot" style={{ background: "#dc2626" }} />
                    <span style={{ fontSize: 13 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── 9. HOE VERLOOPT DE AANVRAAG? ── */}
      <div className="hp-section" style={{ background: "var(--white)" }}>
        <div className="hp-si">
          <div className="hp-slbl">Aanvraagproces</div>
          <h2 className="hp-stitle">Hoe verloopt de aanvraag?</h2>

          <div className="hp-how-grid" style={{ gap: 20, marginTop: 28 }}>
            {[
              [
                "1",
                "Quickscan & analyse",
                "Doe de gratis quickscan. Positief resultaat? Reserveer uw aanvraagplaats en ontvang direct een persoonlijke AI-diepteanalyse.",
              ],
              [
                "2",
                "Aanvraagdocumenten",
                "Activiteitenplan (RVO-model verplicht), begroting (RVO-model verplicht), MKB-verklaring, de-minimisverklaring en kopie bankafschrift.",
              ],
              [
                "3",
                "Indienen via mijnuitvoering",
                "Via mijnuitvoeringvanbeleidszw.nl, binnen het openstaande tijdvak. DigiD of eHerkenning vereist.",
              ],
              [
                "4",
                "Loting bij overintekening",
                `Notariële loting bepaalt de behandelvolgorde. Van de ${LOTING.totaalIngediend.toLocaleString("nl-NL")} aanvragen tijdvak 1 2026 werd ~${LOTING.kansRuw}% ingeloot.`,
              ],
              [
                "5",
                "Beoordeling & beschikking",
                `RVO beoordeelt binnen 13 weken na sluiting. Bij toekenning ontvangt u direct ${SUBSIDIE.voorschot * 100}% voorschot.`,
              ],
            ].map(([num, title, text]) => (
              <div key={num} className="hp-how-card">
                <div className="hp-how-num">{num}</div>
                <div className="hp-how-title">{title}</div>
                <div className="hp-how-text">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 10. STATE OF SLIM CIJFERS ── */}
      <div className="hp-loting">
        <div className="hp-si">
          <div className="hp-slbl" style={{ color: "var(--blue-light)" }}>State of SLIM 2026</div>
          <h2 className="hp-stitle" style={{ color: "#fff" }}>Wat zeggen de cijfers?</h2>
          <p className="hp-ssub" style={{ color: "rgba(255,255,255,0.5)" }}>
            NLP-analyse van {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} gehonoreerde
            SLIM-projecten (2020–2024). Tijdvak 1 2026:{" "}
            {LOTING.totaalIngediend.toLocaleString("nl-NL")} aanvragen ingediend.
          </p>

          <div className="hp-l-grid">
            <div className="hp-l-card">
              <div className="hp-l-num w">{STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")}</div>
              <div className="hp-l-lbl">gehonoreerde projecten 2020–2024</div>
            </div>
            <div className="hp-l-card">
              <div className="hp-l-num b">{LOTING.totaalIngediend.toLocaleString("nl-NL")}</div>
              <div className="hp-l-lbl">aanvragen tijdvak 1 2026</div>
            </div>
            <div className="hp-l-card">
              <div className="hp-l-num r">{LOTING.afgekeurdVoorLoting}</div>
              <div className="hp-l-lbl">afgewezen vóór loting door fouten</div>
            </div>
            <div className="hp-l-card">
              <div className="hp-l-num g">~{LOTING.kansRuw}%</div>
              <div className="hp-l-lbl">effectieve kans tijdvak 1 2026</div>
            </div>
          </div>

          <div className="hp-l-insight">
            <span style={{ fontSize: 22, flexShrink: 0 }}>🔍</span>
            <p>
              <strong>Meest onderbenut segment:</strong> Van de{" "}
              {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} gehonoreerde projecten
              gaan slechts {STATE_OF_SLIM.conversieProjecten} over omscholing of conversie —
              minder dan 0,3%. Dit segment heeft daarmee structureel minder concurrentie bij de
              loting. Vraag ons naar de mogelijkheden voor uw situatie.
            </p>
          </div>

          <div style={{ marginTop: 20, textAlign: "center" }}>
            <Link href="/lotingsuitslagen" className="hp-btn-s">
              Bekijk alle lotingsuitslagen 2024–2026 →
            </Link>
          </div>
        </div>
      </div>

      {/* ── 11. WAAROM SLIM SUBSIDIE ADVIES? ── */}
      <div className="hp-section" style={{ background: "var(--off)" }}>
        <div className="hp-si">
          <div className="hp-slbl">Onze aanpak</div>
          <h2 className="hp-stitle">Waarom SLIM Subsidie Advies?</h2>
          <p className="hp-why-intro">Geen ingewikkeld subsidietraject, wel een kansrijke aanvraag.</p>
          <div className="hp-why-grid">
            {[
              [
                "🔄",
                "Herindienen tot inloting",
                `Niet ingeloot? Wij actualiseren ieder tijdvak uw aanvraag en dienen opnieuw in — kosteloos, totdat u ingeloot wordt.`,
              ],
              [
                "📊",
                `Gebaseerd op ${STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} projecten`,
                `Ons advies is gebaseerd op NLP-analyse van ${STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} gehonoreerde SLIM-projecten (2020–2024). Geen giswerk — data.`,
              ],
              [
                "🎯",
                "100% SLIM-specialist",
                "Wij doen niets anders dan SLIM-subsidie. Actuele kennis van de regelgeving, inclusief alle wijzigingen per 2025.",
              ],
              [
                "🛡️",
                "No cure, no pay succesfee",
                `De reserveringsfee bedraagt €${PRICING.reserveringsfee} excl. btw. De succesfee van €${PRICING.succesfee.toLocaleString("nl-NL")} is uitsluitend verschuldigd bij toekenning — en wordt de reserveringsfee terugbetaald.`,
              ],
            ].map(([icon, title, text]) => (
              <div key={title} className="hp-why-card">
                <span className="hp-why-icon">{icon}</span>
                <div className="hp-why-title">{title}</div>
                <div className="hp-why-text">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 12. FAQ ── */}
      <div className="hp-section" style={{ background: "var(--white)" }}>
        <div className="hp-si">
          <div className="hp-slbl">Veelgestelde vragen</div>
          <h2 className="hp-stitle">SLIM-subsidie FAQ</h2>
          <FAQAccordeon items={FAQ_SLIM_SUBSIDIE} />
        </div>
      </div>

      {/* ── 13. CTA ONDERAAN ── */}
      <div className="hp-cta-section">
        <div className="hp-si">
          <div
            className="hp-slbl"
            style={{ color: "var(--blue-light)", textAlign: "center" }}
          >
            Tijdvak 2 2026 — opening 10 augustus
          </div>
          <h2 className="hp-cta-title">
            Reserveer uw aanvraagplaats<br />voor <span>€{PRICING.reserveringsfee}</span>
          </h2>
          <p className="hp-cta-sub">
            Doe eerst de gratis quickscan en weet binnen 2 minuten of uw bedrijf in aanmerking
            komt. Positief resultaat? Start de reservering en ontvang direct uw persoonlijke
            SLIM-subsidieanalyse.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link
              href="/scan"
              className="hp-btn-p"
              style={{ fontSize: 16, padding: "15px 34px" }}
            >
              Doe eerst de gratis quickscan →
            </Link>
          </div>
          <p className="hp-cta-note">
            Gratis quickscan · Reserveringsfee €{PRICING.reserveringsfee} excl. btw ·
            Succesfee €{PRICING.succesfee.toLocaleString("nl-NL")} excl. btw — no cure, no pay
          </p>
        </div>
      </div>

      {/* ── BRONVERMELDINGEN ── */}
      <div
        style={{
          background: "var(--navy)",
          padding: "16px 20px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0, textAlign: "center", lineHeight: 1.8 }}>
          Bronnen:{" "}
          <a
            href="https://wetten.overheid.nl/BWBR0043015/2025-07-05"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.3)", textDecoration: "underline" }}
          >
            wetten.overheid.nl/BWBR0043015/2025-07-05
          </a>
          {" · "}
          <a
            href="https://www.uitvoeringvanbeleidszw.nl/subsidies-en-regelingen/slim"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.3)", textDecoration: "underline" }}
          >
            uitvoeringvanbeleidszw.nl
          </a>
          {" · "}
          State of SLIM 2026, SLIM Subsidie Advies (analyse {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} projecten 2020–2024)
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
              KvK: 83970614 &nbsp;·&nbsp; BTW: NL863053907B01 &nbsp;·&nbsp;{" "}
              <a
                href="mailto:info@slimsubsidieadvies.nl"
                style={{ color: "var(--blue-light)", textDecoration: "none" }}
              >
                info@slimsubsidieadvies.nl
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
