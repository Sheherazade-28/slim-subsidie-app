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
    canonical: "https://www.slimsubsidieadvies.nl/slim-subsidie/wat-is-slim",
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
  lijst: { margin: "10px 0 0 0", paddingLeft: 20, fontSize: 14, color: "var(--muted)", lineHeight: 1.9 },
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
        text: "MKB-ondernemingen met minimaal één werknemer in loondienst, gevestigd en actief in Nederland. De MKB-definitie volgt de EU-norm: minder dan 250 medewerkers én een jaaromzet van maximaal €50 miljoen of een balanstotaal van maximaal €43 miljoen. Grootbedrijven in de landbouw-, horeca- en recreatiesector mogen ook zelfstandig aanvragen.",
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

function fmtDatumKort(d) {
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
}

export default function WatIsSlimPage() {
  const tv2 = TIJDVAKKEN_2026.find((t) => t.label === "Tijdvak 2 2026");
  const tvSWV = TIJDVAKKEN_2026.find((t) => t.type === "samenwerking");

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <Navigation />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ── */}
      <div style={{ background: "var(--navy)", padding: "60px 20px 52px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 12 }}>
            De SLIM-regeling
          </div>
          <h1 style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 16, marginTop: 0 }}>
            Wat is de SLIM-subsidie?
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 680, marginBottom: 8 }}>
            De SLIM-subsidie vergoedt {SUBSIDIE.percentage}% van uw investering in leren en ontwikkelen. Tot{" "}
            {fmtEur(SUBSIDIE.maxBedrag)} subsidie per aanvraag voor individuele MKB-ondernemingen.
          </p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 28, lineHeight: 1.5 }}>
            Gebaseerd op actuele regelgeving, analyse van {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} gehonoreerde projecten en openbare RVO-data.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/scan" className="hp-btn-p">Doe de gratis quickscan →</Link>
            <Link href="/projecten" className="hp-btn-s">Bekijk projectvoorbeelden</Link>
          </div>
        </div>
      </div>

      {/* ── INHOUDSOPGAVE ── */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid #e8edf3", position: "sticky", top: 64, zIndex: 20 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", overflowX: "auto" }}>
          <nav style={{ display: "flex", gap: 0, padding: "0 20px", whiteSpace: "nowrap" }}>
            {[
              ["#wat-is-slim", "Wat is SLIM?"],
              ["#voor-wie", "Voor wie?"],
              ["#individueel-of-samenwerking", "Individueel of samenwerking?"],
              ["#activiteiten", "Activiteiten"],
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

      {/* ── 1. WAT IS SLIM ── */}
      <div id="wat-is-slim" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Achtergrond</div>
          <h2 style={s.h2}>Wat is de SLIM-subsidie?</h2>

          {/* Highlight badges */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
            {[
              ["60% subsidie", "var(--blue)"],
              [`Tot ${fmtEur(SUBSIDIE.maxBedrag)}`, "var(--blue)"],
              ["Actief t/m 2029", "#1a7a4a"],
              ["Leren & ontwikkelen", "#92400e"],
            ].map(([lbl, bg]) => (
              <span
                key={lbl}
                style={{
                  background: bg,
                  color: "#fff",
                  borderRadius: 20,
                  padding: "6px 14px",
                  fontSize: 13,
                  fontWeight: 700,
                }}
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

      {/* ── 2. VOOR WIE ── */}
      <div id="voor-wie" style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Doelgroep</div>
          <h2 style={s.h2}>Voor wie is de SLIM-subsidie?</h2>
          <p style={s.tekst}>
            De MKB-definitie volgt de EU-definitie, berekend over het laatste afgesloten
            boekjaar. Verbonden en gelieerde ondernemingen worden meegeteld — een holding met
            meerdere BV's telt als geheel.
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
                tag: "Uitzondering grootbedrijf",
                cls: "c",
                items: [
                  `Landbouw, horeca & recreatie: individueel aanvragen (max. ${fmtEur(SUBSIDIE.maxBedragLandbouw)})`,
                  "Overige grootbedrijven: alleen via samenwerkingsverband",
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
              <li>Minimaal 1 werknemer met arbeidscontract — geen DGA-only of uitsluitend zzp'ers</li>
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

      {/* ── 3. VERGELIJKINGSTABEL ── */}
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

      {/* ── 4. ACTIVITEITEN (tabs) ── */}
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

      {/* ── CTA-BLOK 1 ── */}
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

      {/* ── 5. UITSLUITINGEN ── */}
      <div id="niet-subsidiabel" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Uitsluitingen</div>
          <h2 style={s.h2}>Wat is niet subsidiabel?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
            {/* Groen — Wel subsidiabel */}
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

            {/* Rood — Niet subsidiabel */}
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

      {/* ── 6. KOSTENSYSTEMATIEK ── */}
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
            {/* Rekenvoorbeeld A/C */}
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

            {/* Rekenvoorbeeld B */}
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

      {/* ── 7. LOTING ── */}
      <div id="loting" style={{ background: "var(--navy)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 8 }}>
            Hoe werkt de loting?
          </div>
          <h2 style={{ ...s.h2, color: "#fff" }}>Veel ondernemers begrijpen de loting verkeerd</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: 28 }}>
            Inloting betekent niet automatisch subsidie. Eerst volgt een inhoudelijke beoordeling door RVO.
          </p>

          {/* Data highlights */}
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

          {/* Tijdlijn */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 580, marginBottom: 28 }}>
            {[
              ["1", "Aanvraag ingediend binnen tijdvak", ""],
              ["2", "Tijdvak sluit → notariële loting", ""],
              ["3", "Ingeloot → inhoudelijke beoordeling RVO", ""],
              ["4", `Beschikking → bij toekenning ${SUBSIDIE.voorschot * 100}% voorschot direct`, ""],
            ].map(([nr, stap], i, arr) => (
              <div key={nr} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--blue)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, zIndex: 1 }}>{nr}</div>
                  {i < arr.length - 1 && <div style={{ width: 2, height: 28, background: "rgba(255,255,255,0.15)" }} />}
                </div>
                <div style={{ paddingTop: 6, paddingBottom: i < arr.length - 1 ? 0 : 0 }}>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{stap}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tip */}
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

      {/* ── 8. DATA ── */}
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

      {/* ── 9. FAQ ── */}
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
                a: `MKB-ondernemingen met minimaal één werknemer in loondienst, gevestigd en actief in Nederland. De MKB-definitie volgt de EU-norm: minder dan 250 medewerkers én een jaaromzet van maximaal €50 miljoen of een balanstotaal van maximaal €43 miljoen. Grootbedrijven in de landbouw-, horeca- en recreatiesector mogen ook zelfstandig aanvragen.`,
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
              Meer vragen? Bekijk alle FAQ →
            </Link>
          </div>
        </div>
      </div>

      {/* ── SLOTSECTIE ── */}
      <div className="hp-cta-section">
        <div className="hp-si">
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 12, textAlign: "center" }}>
            Tijdvak 2 opent 10 augustus 2026
          </div>
          <h2 className="hp-cta-title">Komt uw bedrijf in aanmerking voor SLIM-subsidie?</h2>
          <p className="hp-cta-sub">Doe de gratis quickscan en weet het binnen 2 minuten.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/scan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>
              Doe de gratis quickscan →
            </Link>
            <Link href="/slim-subsidie/aanvragen" className="hp-btn-s" style={{ fontSize: 16, padding: "15px 34px" }}>
              Meer over aanvragen →
            </Link>
          </div>
          <p className="hp-cta-note">
            Gratis quickscan · Reserveringsfee {fmtEur(PRICING.reserveringsfee)} excl. btw ·
            Succesfee €2.500 excl. btw — no cure, no pay
          </p>
        </div>
      </div>

      {/* ── BRONVERMELDING ── */}
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
    </div>
  );
}
