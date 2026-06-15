import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import FAQAccordeon from "@/components/ui/FAQAccordeon";
import ActiviteitenTabs from "@/components/ui/ActiviteitenTabs";
import {
  SUBSIDIE,
  PRICING,
  BUDGET_2026,
  STATE_OF_SLIM,
  TIJDVAKKEN_2026,
  LOTING,
  fmtEur,
} from "@/data/slim-content";

export const metadata = {
  title: "Wat is de SLIM-subsidie? Voorwaarden, activiteiten en subsidiebedrag 2026",
  description:
    "Ontdek hoe de SLIM-subsidie werkt. Voorwaarden, activiteiten, subsidiepercentages, loting, praktijkvoorbeelden en analyse van 6.208 gehonoreerde projecten.",
  alternates: {
    canonical: "https://www.slimsubsidieadvies.nl/slim-subsidie",
  },
};

const s = {
  sectie: { padding: "56px 20px" },
  inner: { maxWidth: 860, margin: "0 auto" },
  slbl: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    color: "var(--blue)",
    marginBottom: 8,
  },
  h2: {
    fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
    fontWeight: 800,
    color: "var(--navy)",
    marginBottom: 20,
    marginTop: 0,
  },
  tekst: { fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 16 },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is de SLIM-subsidie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De SLIM-subsidie (Stimuleringsregeling Leren en Ontwikkelen in Mkb-ondernemingen) is een overheidsregeling van het Ministerie van Sociale Zaken en Werkgelegenheid. De regeling vergoedt 60% van uw investering in leren en ontwikkelen, tot €25.000 per aanvraag voor individuele MKB-ondernemingen. De regeling is actief van 2020 tot en met 2029.",
      },
    },
    {
      "@type": "Question",
      name: "Wie kan individuele SLIM-subsidie aanvragen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MKB-ondernemingen met minimaal één werknemer in loondienst, gevestigd en actief in Nederland. De MKB-definitie volgt de EU-norm: minder dan 250 medewerkers én een jaaromzet van maximaal €50 miljoen of een balanstotaal van maximaal €43 miljoen. Grootbedrijven kunnen per 2025 niet meer individueel aanvragen; deelname is uitsluitend mogelijk als partner in een samenwerkingsverband.",
      },
    },
    {
      "@type": "Question",
      name: "Hoeveel subsidie kan ik krijgen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Individuele MKB-ondernemingen ontvangen 60% van de subsidiabele kosten, tot €25.000 per aanvraag. Landbouwbedrijven: tot €20.000. Voor activiteiten A en C geldt een minimale subsidie van €5.000, wat een projectomvang van minimaal €8.334 vereist. Activiteit B vergoedt €700 per afgerond loopbaantraject, zonder minimumdrempel.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik meerdere activiteiten combineren in één aanvraag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, dat is mogelijk. Een SLIM-subsidieaanvraag kan bestaan uit meerdere activiteiten (artikel 2.8 lid 5 SLIM-regeling). U kunt bijvoorbeeld activiteit A combineren met activiteit C, of activiteit B met activiteit C. Het maximale subsidiebedrag blijft tot €25.000 voor de gecombineerde aanvraag.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik meerdere aanvragen indienen voor dezelfde onderneming in hetzelfde tijdvak?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee. Per aanvraagtijdvak wordt maximaal één aanvraag per onderneming in behandeling genomen (artikel 2.8 lid 4 SLIM-regeling). Een tweede aanvraag in hetzelfde tijdvak wordt geweigerd. Combineer meerdere activiteiten in één aanvraag.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is het verschil tussen individueel en samenwerking?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Individuele MKB-aanvragen gaan via loting bij overintekening, met een maximum van tot €25.000 en een looptijd van 12 maanden. Samenwerkingsverbanden van minimaal twee MKB-ondernemingen kunnen tot €500.000 aanvragen (per partner tot €200.000), met een looptijd van 24 maanden. Per Staatscourant 31 maart 2026 gaan ook samenwerkingsverbanden via loting. Activiteit C is bij samenwerkingsverbanden een verplicht onderdeel.",
      },
    },
  ],
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

function fmtDatumKort(d) {
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
}

export default function SlimSubsidiePage() {
  const tijdvakken2026 = TIJDVAKKEN_2026.filter((tv) => tv.open.getFullYear() === 2026);
  const tv2 = TIJDVAKKEN_2026.find((t) => t.label === "Tijdvak 2 2026");
  const tvSWV = TIJDVAKKEN_2026.find((t) => t.type === "samenwerking");

  return (
    <div className="hp">
      <Navigation />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 16, alignItems: "flex-start" }}>
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
              <div key={lbl} className="hp-l-card" style={{ background: "var(--navy)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="hp-l-num b" style={{ fontSize: 26 }}>{num}</div>
                <div className="hp-l-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. STICKY INHOUDSOPGAVE ── */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid #e8edf3", position: "sticky", top: 64, zIndex: 20 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", overflowX: "auto" }}>
          <nav style={{ display: "flex", gap: 0, padding: "0 20px", whiteSpace: "nowrap" }}>
            {[
              ["#wat-is-slim", "Wat is SLIM?"],
              ["#voor-wie", "Voor wie?"],
              ["#individueel-of-samenwerking", "Individueel of samenwerking?"],
              ["#activiteiten", "Activiteiten"],
              ["#aanvraagproces", "Hoe werkt de aanvraag?"],
              ["#niet-subsidiabel", "Uitsluitingen"],
              ["#berekening", "Berekening"],
              ["#loting", "Loting"],
              ["#data", "Data & projecten"],
              ["#faq", "FAQ"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                style={{
                  display: "inline-block",
                  padding: "14px 14px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--navy)",
                  textDecoration: "none",
                  borderBottom: "2px solid transparent",
                  transition: "border-color .15s",
                  flexShrink: 0,
                }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ── 5. WAT IS SLIM ── */}
      <div id="wat-is-slim" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Achtergrond</div>
          <h2 style={s.h2}>Wat is de SLIM-subsidie?</h2>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
            {[
              ["60% subsidie", "var(--blue)"],
              [`Tot ${fmtEur(SUBSIDIE.maxBedrag)}`, "var(--blue)"],
              ["Actief t/m 2029", "#1a7a4a"],
              ["Leren & ontwikkelen", "#92400e"],
            ].map(([lbl, bg]) => (
              <span
                key={lbl}
                style={{ background: bg, color: "#fff", borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: 700 }}
              >
                {lbl}
              </span>
            ))}
          </div>

          <p style={s.tekst}>
            De SLIM-subsidie is een overheidsregeling van het Ministerie van Sociale Zaken en
            Werkgelegenheid, ingevoerd in 2020 en actief tot en met 2029. Het doel: leren en
            ontwikkelen in het MKB vanzelfsprekend maken. Veel MKB-bedrijven investeren
            onvoldoende in de ontwikkeling van hun medewerkers — niet omdat ze dat niet willen,
            maar omdat de directe kosten hoog zijn en de opbrengsten op lange termijn moeilijk
            zichtbaar zijn. De SLIM-subsidie verlaagt die drempel door {SUBSIDIE.percentage}% van
            de subsidiabele kosten te vergoeden.
          </p>
          <p style={s.tekst}>
            De regeling kent twee varianten: individuele aanvragen door MKB-ondernemingen en
            aanvragen door samenwerkingsverbanden van minimaal twee MKB-ondernemingen. SLIM
            Subsidie Advies richt zich op individuele MKB-aanvragen. Voor samenwerkingsverbanden
            is begeleiding op aanvraag beschikbaar.
          </p>
          <p style={s.tekst}>
            Met de SLIM-subsidie investeert u in de toekomstbestendigheid van uw organisatie.
            Medewerkers ontwikkelen nieuwe vaardigheden, blijven gemotiveerd en kunnen beter
            inspelen op veranderingen in uw branche. Veranderingen door digitalisering,
            robotisering en een krapper wordende arbeidsmarkt vragen om periodieke heroriëntatie
            op kennis en competenties van uw team.
          </p>
          <p style={s.tekst}>
            De subsidie wordt verdeeld via gesloten aanvraagtijdvakken. Wanneer meer aanvragen
            binnenkomen dan het budget toelaat, bepaalt een notariële loting welke aanvragen in
            behandeling worden genomen. Een complete, foutloze aanvraag is daarmee de
            minimumeis om überhaupt mee te kunnen doen aan de loting.
          </p>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 24, paddingTop: 16, borderTop: "1px solid #e8edf3" }}>
            Bron:{" "}
            <a href="https://wetten.overheid.nl/BWBR0043015/2025-07-05" target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)" }}>
              wetten.overheid.nl/BWBR0043015/2025-07-05
            </a>
          </div>
        </div>
      </div>

      {/* ── 6. VOOR WIE ── */}
      <div id="voor-wie" style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Doelgroep</div>
          <h2 style={s.h2}>Voor wie is de SLIM-subsidie?</h2>
          <p style={s.tekst}>
            De MKB-definitie volgt de EU-definitie, berekend over het laatste afgesloten
            boekjaar. Verbonden en gelieerde ondernemingen worden meegeteld — een holding met
            meerdere BV&apos;s telt als geheel.
          </p>

          <div className="hp-req-grid" style={{ marginBottom: 24 }}>
            {[
              {
                tag: "Kleine onderneming",
                cls: "a",
                items: [
                  "Minder dan 50 medewerkers",
                  "Jaaromzet of balanstotaal max. €10 miljoen",
                  `Subsidie: ${SUBSIDIE.percentage}% tot ${fmtEur(SUBSIDIE.maxBedrag)}`,
                ],
              },
              {
                tag: "Middelgrote onderneming",
                cls: "b",
                items: [
                  "Minder dan 250 medewerkers",
                  "Jaaromzet max. €50 miljoen OF balanstotaal max. €43 miljoen",
                  `Subsidie: ${SUBSIDIE.percentage}% tot ${fmtEur(SUBSIDIE.maxBedrag)}`,
                ],
              },
              {
                tag: "Grootbedrijven",
                cls: "c",
                items: [
                  "Kunnen per 2025 niet meer individueel aanvragen",
                  "Deelname uitsluitend als partner in samenwerkingsverband (minimaal 2 MKB-partners)",
                ],
              },
            ].map(({ tag, cls, items }) => (
              <div key={tag} className="hp-req-card">
                <div className={`hp-act-tag ${cls}`}>{tag}</div>
                <ul className="hp-req-list" style={{ marginTop: 12 }}>
                  {items.map((item) => (
                    <li key={item} className="hp-req-item">
                      <span className="hp-req-dot" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ background: "var(--white)", border: "1px solid #e8edf3", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--navy)", marginBottom: 12 }}>Aanvullende voorwaarden:</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "var(--muted)", lineHeight: 1.9 }}>
              <li>Minimaal 1 werknemer met arbeidscontract — geen DGA-only of uitsluitend zzp&apos;ers</li>
              <li>Zowel vestiging als activiteiten moeten in Nederland zijn</li>
              <li>Activiteiten mogen nog niet gestart zijn vóór de datum van de subsidiebeschikking</li>
              <li>Maximaal 1 aanvraag per tijdvak per onderneming</li>
              <li>De-minimisplafond: max. €300.000 staatssteun in afgelopen 3 belastingjaren</li>
            </ul>
          </div>

          <Link href="/scan" className="hp-btn-p" style={{ display: "inline-block" }}>
            Controleer of uw bedrijf in aanmerking komt →
          </Link>
        </div>
      </div>

      {/* ── 7. VERGELIJKINGSTABEL ── */}
      <div id="individueel-of-samenwerking" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Twee varianten</div>
          <h2 style={s.h2}>Individueel MKB of samenwerkingsverband?</h2>
          <p style={s.tekst}>
            De meeste ondernemers kiezen voor een individuele MKB-aanvraag. Samenwerkingsverbanden
            zijn bedoeld voor grotere gezamenlijke leer- en ontwikkeltrajecten.
          </p>
          <div style={{ overflowX: "auto", marginTop: 24 }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
                background: "var(--white)",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <thead>
                <tr>
                  <th style={{ background: "var(--navy)", color: "#fff", padding: "14px 16px", textAlign: "left", fontWeight: 700, fontSize: 13, width: "28%" }}>
                    Kenmerk
                  </th>
                  <th style={{ background: "var(--navy)", color: "#fff", padding: "14px 16px", textAlign: "left", fontWeight: 700, fontSize: 13, width: "36%", borderLeft: "2px solid var(--blue)" }}>
                    Individueel MKB
                    <span style={{ display: "block", fontSize: 10, fontWeight: 500, color: "var(--blue-light)", marginTop: 2 }}>
                      Ons specialisme
                    </span>
                  </th>
                  <th style={{ background: "#1a3c6b", color: "rgba(255,255,255,0.65)", padding: "14px 16px", textAlign: "left", fontWeight: 700, fontSize: 13, width: "36%" }}>
                    Samenwerkingsverband
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Wie kan aanvragen?", "Individuele MKB-onderneming", "Minimaal 2 MKB-ondernemingen, eventueel aangevuld met brancheorganisatie, O&O-fonds of onderwijsinstelling"],
                  ["Subsidiebedrag", `Tot ${fmtEur(SUBSIDIE.maxBedrag)} (landbouw: tot ${fmtEur(SUBSIDIE.maxBedragLandbouw)})`, `Tot ${fmtEur(SUBSIDIE.maxBedragSamenwerking)} totaal · Tot ${fmtEur(SUBSIDIE.maxPerPartnerSamenwerking)} per partner`],
                  ["Subsidiepercentage", `${SUBSIDIE.percentage}% van subsidiabele kosten`, `${SUBSIDIE.percentage}% van subsidiabele kosten`],
                  ["Minimale subsidiabele kosten", `${fmtEur(SUBSIDIE.minSubsidie)} (act. A en C) · Geen minimum voor B`, "€210.000 totaal"],
                  ["Verplichte activiteit", "Vrije keuze uit A, B of C — combinaties mogelijk", "Activiteit C (L&O-methode) is verplicht onderdeel"],
                  ["Looptijd", `Maximaal ${SUBSIDIE.looptijdMKB} maanden`, `Maximaal ${SUBSIDIE.looptijdSamenwerking} maanden`],
                  ["Voorschot bij toekenning", `${SUBSIDIE.voorschot * 100}% direct uitbetaald`, "25% bij verlening · 50% aanvullend na voortgangsverslag"],
                  [
                    "Tijdvak 2026",
                    tv2 ? `Tijdvak 2: ${fmtDatumKort(tv2.open)} t/m ${fmtDatumKort(tv2.close)}` : "Tijdvak 2: 10 aug t/m 7 sep 2026",
                    tvSWV ? `${fmtDatumKort(tvSWV.open)} t/m ${fmtDatumKort(tvSWV.close)}` : "22 jun t/m 20 jul 2026",
                  ],
                  ["Behandeling aanvragen", "Loting bij overintekening", "Loting (gewijzigd per 31 maart 2026) *"],
                  ["Begeleiding door ons", "Volledig — dit is ons specialisme", "Op aanvraag — neem contact op"],
                ].map(([kenmerk, individueel, samenwerking], i) => (
                  <tr key={kenmerk} style={{ background: i % 2 === 0 ? "var(--white)" : "#f7f9fc" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--navy)", fontSize: 13, borderBottom: "1px solid #e8edf3", verticalAlign: "top" }}>
                      {kenmerk}
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--navy)", fontSize: 13, borderBottom: "1px solid #e8edf3", verticalAlign: "top", borderLeft: "2px solid var(--blue)" }}>
                      {individueel}
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--muted)", fontSize: 13, borderBottom: "1px solid #e8edf3", verticalAlign: "top" }}>
                      {samenwerking}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 14, lineHeight: 1.65 }}>
            * Per Staatscourant 31 maart 2026 gewijzigd van volgorde van binnenkomst naar loting,
            omdat het budget voor samenwerkingsverbanden in 2025 binnen enkele minuten was uitgeput.
            Bron:{" "}
            <a href="https://zoek.officielebekendmakingen.nl/stcrt-2026-13249" target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)" }}>
              stcrt-2026-13249
            </a>
          </p>
        </div>
      </div>

      {/* ── 8. ACTIVITEITEN ── */}
      <div id="activiteiten" style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Subsidiabele activiteiten — individuele MKB-aanvragen</div>
          <h2 style={s.h2}>Welke activiteiten zijn subsidiabel?</h2>
          <p style={s.tekst}>
            De SLIM-regeling kent drie subsidiabele activiteiten. U kunt één activiteit aanvragen
            of meerdere combineren in één aanvraag (art. 2.8 lid 5 SLIM-regeling). Het maximale
            subsidiebedrag van tot {fmtEur(SUBSIDIE.maxBedrag)} geldt voor de gecombineerde
            aanvraag.
          </p>
          <ActiviteitenTabs
            minSubsidie={SUBSIDIE.minSubsidie}
            minProjectomvang={SUBSIDIE.minProjectomvang}
            maxUurtarief={SUBSIDIE.maxUurtarief}
            loopbaanVergoeding={SUBSIDIE.loopbaanVergoeding}
            maxBedrag={SUBSIDIE.maxBedrag}
          />
        </div>
      </div>

      {/* ── 9. CTA-BLOK LICHTBLAUW ── */}
      <div style={{ background: "#e8f4fc", padding: "40px 20px", borderTop: "1px solid #c7d9f5", borderBottom: "1px solid #c7d9f5" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 800, color: "var(--navy)", marginBottom: 10, marginTop: 0 }}>
            Welke activiteit past bij uw organisatie?
          </h2>
          <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 20, maxWidth: 580, margin: "0 auto 20px" }}>
            Doe de gratis quickscan en ontvang een eerste indicatie van de meest kansrijke aanvraagrichting.
          </p>
          <Link href="/scan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>
            Start gratis quickscan →
          </Link>
        </div>
      </div>

      {/* ── 10. UITSLUITINGEN ── */}
      <div id="niet-subsidiabel" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Uitsluitingen</div>
          <h2 style={s.h2}>Wat is niet subsidiabel?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
            <div className="hp-req-card" style={{ background: "#f0fdf4", borderColor: "#a8d8bc" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#1a7a4a", marginBottom: 12 }}>
                ✓ Wel subsidiabel
              </div>
              <ul className="hp-req-list">
                {[
                  `Externe advieskosten (max. €${SUBSIDIE.maxUurtarief} per uur excl. btw)`,
                  `Interne loonkosten (brutoloon + ${SUBSIDIE.opslagInterneLoonkosten * 100}% opslag)`,
                  `${SUBSIDIE.forfaireOpslag * 100}% forfaitaire opslag op bovenstaande kosten`,
                  "Structurele leer- en ontwikkelmethoden",
                  "Loopbaanadviezen via gecertificeerde adviseur",
                ].map((item) => (
                  <li key={item} className="hp-req-item">
                    <span className="hp-req-dot" style={{ background: "#1a7a4a" }} />
                    <span style={{ fontSize: 13 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hp-req-card" style={{ background: "#fef2f2", borderColor: "#fca5a5" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#dc2626", marginBottom: 12 }}>
                ✗ Niet subsidiabel
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#7f1d1d", marginBottom: 6 }}>Uitgesloten activiteiten:</div>
              <ul className="hp-req-list" style={{ marginBottom: 14 }}>
                {[
                  "Reguliere opleidingen en cursussen",
                  "Praktijkleerplaatsen (afgeschaft per 2025)",
                  "Projecten gestart vóór subsidiebeschikking",
                  "Activiteiten uitsluitend gericht op bestuurders of DGA's",
                  "Coachingstrajecten als losstaande dienst",
                  "Standaard onboarding als losstaand programma",
                ].map((item) => (
                  <li key={item} className="hp-req-item">
                    <span className="hp-req-dot" style={{ background: "#dc2626" }} />
                    <span style={{ fontSize: 13 }}>{item}</span>
                  </li>
                ))}
              </ul>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#7f1d1d", marginBottom: 6 }}>Niet-subsidiabele kosten:</div>
              <ul className="hp-req-list">
                {[
                  "Loonverletkosten (productiviteitsverlies tijdens activiteiten)",
                  "BTW",
                  "Overhead en huisvestingskosten",
                  "Reguliere kantoorapparatuur of software",
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

      {/* ── 11. KOSTENSYSTEMATIEK ── */}
      <div id="berekening" style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Kostensystematiek</div>
          <h2 style={s.h2}>Hoe wordt de subsidie berekend?</h2>
          <p style={s.tekst}>De subsidie bedraagt {SUBSIDIE.percentage}% van de subsidiabele kosten.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 32 }}>
            {[
              ["Externe advieskosten", `Tot €${SUBSIDIE.maxUurtarief} per uur excl. btw`],
              ["Interne loonkosten", `Brutoloon + ${SUBSIDIE.opslagInterneLoonkosten * 100}% opslag · basis ${SUBSIDIE.werkbareUren} werkbare uren/jaar`],
              ["Forfaitaire opslag", `${SUBSIDIE.forfaireOpslag * 100}% op bovenstaande kosten (hoeft niet gespecificeerd)`],
            ].map(([titel, tekst]) => (
              <div key={titel} style={{ background: "var(--white)", border: "1px solid #e8edf3", borderRadius: 10, padding: "16px 18px" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: "var(--navy)", marginBottom: 6 }}>{titel}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65 }}>{tekst}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            <div style={{ background: "#f0fdf4", border: "1px solid #a8d8bc", borderRadius: 12, padding: "20px 24px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#1a7a4a", marginBottom: 14 }}>
                Rekenvoorbeeld — Activiteit A of C
              </div>
              {[
                ["Externe advieskosten", "€10.000"],
                ["Interne loonkosten", "€3.000"],
                ["Subtotaal", "€13.000"],
                [`${SUBSIDIE.forfaireOpslag * 100}% forfaitaire opslag`, "€1.950"],
                ["Totale subsidiabele kosten", "€14.950"],
                [`Subsidie (${SUBSIDIE.percentage}%)`, "€8.970"],
              ].map(([label, bedrag], i) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: i < 5 ? "1px solid #d1fae5" : "2px solid #059669", fontWeight: i === 5 ? 800 : 400, color: i === 5 ? "#059669" : "var(--navy)", fontSize: i === 5 ? 15 : 13 }}>
                  <span>{label}</span>
                  <span>{bedrag}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#f0fdf4", border: "1px solid #a8d8bc", borderRadius: 12, padding: "20px 24px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#1a7a4a", marginBottom: 14 }}>
                Rekenvoorbeeld — Activiteit B
              </div>
              {[
                ["Aantal medewerkers", "10"],
                ["Vergoeding per traject", fmtEur(SUBSIDIE.loopbaanVergoeding)],
                ["Totale subsidie", fmtEur(10 * SUBSIDIE.loopbaanVergoeding)],
              ].map(([label, bedrag], i) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: i < 2 ? "1px solid #d1fae5" : "2px solid #059669", fontWeight: i === 2 ? 800 : 400, color: i === 2 ? "#059669" : "var(--navy)", fontSize: i === 2 ? 15 : 13 }}>
                  <span>{label}</span>
                  <span>{bedrag}</span>
                </div>
              ))}
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 16, lineHeight: 1.6 }}>
                Elke medewerker ontvangt minimaal 4 uur individuele begeleiding. De vergoeding is
                een vast bedrag — de daadwerkelijke advieskosten zijn niet relevant voor de
                subsidieberekening.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 12. AANVRAAGPROCES ── */}
      <div id="aanvraagproces" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Aanvraagproces</div>
          <h2 style={s.h2}>Hoe werkt de aanvraag?</h2>
          <div className="hp-how-grid" style={{ gap: 16, marginTop: 28, gridTemplateColumns: "repeat(5, 1fr)" }}>
            {[
              [
                "1",
                "Quickscan & analyse",
                "Doe de gratis quickscan. Positief resultaat? Reserveer uw aanvraagplaats en wij nemen binnen 8 werkdagen contact met u op.",
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
              <div key={num} className="hp-how-card" style={{ height: "auto" }}>
                <div className="hp-how-num">{num}</div>
                <div className="hp-how-title">{title}</div>
                <div className="hp-how-text">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 13. LOTING ── */}
      <div id="loting" style={{ background: "var(--navy)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 8 }}>
            Hoe werkt de loting?
          </div>
          <h2 style={{ ...s.h2, color: "#fff" }}>Veel ondernemers begrijpen de loting verkeerd</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: 28 }}>
            Inloting betekent niet automatisch subsidie. Eerst volgt een inhoudelijke beoordeling door RVO.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: 14, marginBottom: 32 }}>
            {[
              [`${LOTING.totaalIngediend.toLocaleString("nl-NL")} aanvragen`, "ingediend tijdvak 1 2026", "var(--blue-light)"],
              [`${LOTING.inBehandeling} van ${LOTING.totaalIngediend.toLocaleString("nl-NL")}`, `ingeloot (~${LOTING.kansRuw}%)`, "#60e0a0"],
              [`${LOTING.afgekeurdVoorLoting} aanvragen`, "afgewezen vóór loting door fouten", "#ff8080"],
              ["13 weken", "behandeltermijn na sluiting", "rgba(255,255,255,0.65)"],
            ].map(([num, lbl, clr]) => (
              <div key={lbl} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "18px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: clr, lineHeight: 1.1, marginBottom: 6 }}>{num}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>{lbl}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 580, marginBottom: 28 }}>
            {[
              ["1", "Aanvraag ingediend binnen tijdvak"],
              ["2", "Tijdvak sluit → notariële loting"],
              ["3", "Ingeloot → inhoudelijke beoordeling RVO"],
              ["4", `Beschikking → bij toekenning ${SUBSIDIE.voorschot * 100}% voorschot direct`],
            ].map(([nr, stap], i, arr) => (
              <div key={nr} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--blue)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, zIndex: 1 }}>{nr}</div>
                  {i < arr.length - 1 && <div style={{ width: 2, height: 28, background: "rgba(255,255,255,0.15)" }} />}
                </div>
                <div style={{ paddingTop: 6 }}>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{stap}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "18px 22px", marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: "#fff" }}>Tip:</strong> Begin minimaal 4 weken vóór de sluiting met de voorbereiding.
                Er is geen voordeel aan vroeg indienen — de loting is aselect. Wat telt: een complete, foutloze aanvraag.
              </p>
            </div>
          </div>

          <Link href="/lotingsuitslagen" style={{ fontSize: 14, color: "var(--blue-light)", textDecoration: "none", fontWeight: 600 }}>
            Bekijk alle lotingsuitslagen 2024–2026 →
          </Link>
        </div>
      </div>

      {/* ── 14. STATE OF SLIM ── */}
      <div id="data" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>State of SLIM 2026 — data-analyse</div>
          <h2 style={s.h2}>Wat leren we van {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} gehonoreerde projecten?</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 24 }}>
            {[
              [`${STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")}`, "gehonoreerde projecten 2020–2024", "#1a56db"],
              [`${STATE_OF_SLIM.conversieProjecten} van ${STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")}`, "conversie-/omscholingsprojecten (0,3%)", "#1a56db"],
              ["−80%", "dalende trend conversie t.o.v. 2020", "#1a56db"],
              [`~${LOTING.kansRuw}%`, "effectieve kans tijdvak 1 2026", "#1a7a4a"],
            ].map(([num, lbl, clr]) => (
              <div key={lbl} style={{ background: "#f7f9fc", border: "1px solid #e8edf3", borderRadius: 12, padding: "18px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: clr, lineHeight: 1.1, marginBottom: 6 }}>{num}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.4 }}>{lbl}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#f0f4ff", border: "1px solid #c7d9f5", borderRadius: 12, padding: "20px 24px", marginBottom: 20 }}>
            <p style={{ fontSize: 15, color: "var(--navy)", lineHeight: 1.75, margin: 0 }}>
              <strong>Conversie en omscholing</strong> is de meest onderbenutte SLIM-categorie: slechts{" "}
              {STATE_OF_SLIM.conversieProjecten} van de{" "}
              {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} gehonoreerde projecten (0,3%)
              betreft dit type. Dit segment heeft structureel minder concurrentie bij de loting —
              een kans voor ondernemers die actief medewerkers willen omscholen.
            </p>
          </div>

          <Link href="/slim-subsidie/resultaten" style={{ fontSize: 14, color: "var(--blue)", textDecoration: "none", fontWeight: 600 }}>
            Lees het State of SLIM 2026 whitepaper →
          </Link>
        </div>
      </div>

      {/* ── 15. TIJDVAKKEN 2026 ── */}
      <div className="hp-section" style={{ background: "var(--off)" }}>
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
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>
                      {tv.type === "samenwerking" ? "Samenwerkingsverbanden" : "Individueel MKB"}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>
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

      {/* ── 16. WAAROM SLIM SUBSIDIE ADVIES ── */}
      <div className="hp-section" style={{ background: "var(--white)" }}>
        <div className="hp-si">
          <div className="hp-slbl">Onze aanpak</div>
          <h2 className="hp-stitle">Waarom SLIM Subsidie Advies?</h2>
          <p className="hp-why-intro">Geen ingewikkeld subsidietraject, wel een kansrijke aanvraag.</p>
          <div className="hp-why-grid">
            {[
              [
                "🔄",
                "Herindienen tot inloting",
                "Niet ingeloot? Wij actualiseren ieder tijdvak uw aanvraag en dienen opnieuw in — kosteloos, totdat u ingeloot wordt.",
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

      {/* ── 17. FAQ ── */}
      <div id="faq" style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Veelgestelde vragen</div>
          <h2 style={s.h2}>FAQ — SLIM-subsidie</h2>
          <FAQAccordeon
            items={[
              {
                q: "Wat is de SLIM-subsidie?",
                a: `De SLIM-subsidie (Stimuleringsregeling Leren en Ontwikkelen in Mkb-ondernemingen) is een overheidsregeling van het Ministerie van Sociale Zaken en Werkgelegenheid. De regeling vergoedt ${SUBSIDIE.percentage}% van uw investering in leren en ontwikkelen, tot ${fmtEur(SUBSIDIE.maxBedrag)} per aanvraag voor individuele MKB-ondernemingen. De regeling is actief van 2020 tot en met 2029.`,
              },
              {
                q: "Wie kan individuele SLIM-subsidie aanvragen?",
                a: `MKB-ondernemingen met minimaal één werknemer in loondienst, gevestigd en actief in Nederland. De MKB-definitie volgt de EU-norm: minder dan 250 medewerkers én een jaaromzet van maximaal €50 miljoen of een balanstotaal van maximaal €43 miljoen. Grootbedrijven kunnen per 2025 niet meer individueel aanvragen. Deelname is uitsluitend mogelijk als partner in een samenwerkingsverband.`,
              },
              {
                q: "Hoeveel subsidie kan ik krijgen?",
                a: `Individuele MKB-ondernemingen ontvangen ${SUBSIDIE.percentage}% van de subsidiabele kosten, tot ${fmtEur(SUBSIDIE.maxBedrag)} per aanvraag. Landbouwbedrijven: tot ${fmtEur(SUBSIDIE.maxBedragLandbouw)}. Voor activiteiten A en C geldt een minimale subsidie van ${fmtEur(SUBSIDIE.minSubsidie)}, wat een projectomvang van minimaal ${fmtEur(SUBSIDIE.minProjectomvang)} vereist. Activiteit B vergoedt ${fmtEur(SUBSIDIE.loopbaanVergoeding)} per afgerond loopbaantraject, zonder minimumdrempel.`,
              },
              {
                q: "Kan ik meerdere activiteiten combineren in één aanvraag?",
                a: `Ja, dat is mogelijk. Een SLIM-subsidieaanvraag kan bestaan uit meerdere activiteiten (artikel 2.8 lid 5 SLIM-regeling). U kunt bijvoorbeeld activiteit A combineren met activiteit C, of activiteit B met activiteit C. U mag per tijdvak maximaal één aanvraag indienen, maar die aanvraag mag meerdere activiteiten bevatten. Het maximale subsidiebedrag blijft tot ${fmtEur(SUBSIDIE.maxBedrag)} voor de gecombineerde aanvraag.`,
              },
              {
                q: "Kan ik meerdere aanvragen indienen voor dezelfde onderneming in hetzelfde tijdvak?",
                a: `Nee. Per aanvraagtijdvak wordt maximaal één aanvraag per onderneming in behandeling genomen (artikel 2.8 lid 4 SLIM-regeling). Een tweede aanvraag in hetzelfde tijdvak wordt geweigerd. Wilt u meerdere activiteiten subsidiëren? Combineer ze in één aanvraag. U kunt activiteiten A, B en C combineren binnen één aanvraag — het maximale subsidiebedrag blijft tot ${fmtEur(SUBSIDIE.maxBedrag)} voor de gecombineerde aanvraag.`,
              },
              {
                q: "Wat is het verschil tussen individueel en samenwerking?",
                a: `Individuele MKB-aanvragen gaan via loting bij overintekening, met een maximum van tot ${fmtEur(SUBSIDIE.maxBedrag)} en een looptijd van ${SUBSIDIE.looptijdMKB} maanden. Samenwerkingsverbanden van minimaal twee MKB-ondernemingen kunnen tot ${fmtEur(SUBSIDIE.maxBedragSamenwerking)} aanvragen (per partner tot ${fmtEur(SUBSIDIE.maxPerPartnerSamenwerking)}), met een looptijd van ${SUBSIDIE.looptijdSamenwerking} maanden. Per Staatscourant 31 maart 2026 gaan ook samenwerkingsverbanden via loting. Activiteit C is bij samenwerkingsverbanden een verplicht onderdeel.`,
              },
            ]}
          />
          <div style={{ marginTop: 20, fontSize: 14 }}>
            <Link href="/faq" style={{ color: "var(--blue)", textDecoration: "none", fontWeight: 600 }}>
              Meer vragen? Bekijk alle veelgestelde vragen →
            </Link>
          </div>
        </div>
      </div>

      {/* ── 18. CTA ONDERAAN ── */}
      <div className="hp-cta-section">
        <div className="hp-si">
          <div className="hp-slbl" style={{ color: "var(--blue-light)", textAlign: "center" }}>
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
            <Link href="/scan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>
              Doe eerst de gratis quickscan →
            </Link>
          </div>
          <p className="hp-cta-note">
            Gratis quickscan · Reserveringsfee €{PRICING.reserveringsfee} excl. btw ·
            Succesfee €{PRICING.succesfee.toLocaleString("nl-NL")} excl. btw — no cure, no pay
          </p>
        </div>
      </div>

      {/* ── 19. BRONVERMELDING ── */}
      <div style={{ background: "var(--navy)", padding: "24px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0, textAlign: "center", lineHeight: 1.9 }}>
          Bronnen:{" "}
          <a href="https://wetten.overheid.nl/BWBR0043015/2025-07-05" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "underline" }}>
            wetten.overheid.nl/BWBR0043015/2025-07-05
          </a>
          {" · "}
          <a href="https://www.uitvoeringvanbeleidszw.nl/subsidies-en-regelingen/algemene-informatie/slim-mkb-individuele-aanvragen--samenwerkingsverbanden-2025---2029/over-slim-mkb-individuele-mkb-ondernemingen--samenwerkingsverbanden-2025---2029" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "underline" }}>
            uitvoeringvanbeleidszw.nl
          </a>
          {" · State of SLIM 2026, SLIM Subsidie Advies (analyse "}
          {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")}
          {" projecten 2020–2024)"}
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
              <a href="mailto:info@slimsubsidieadvies.nl" style={{ color: "var(--blue-light)", textDecoration: "none" }}>
                info@slimsubsidieadvies.nl
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
