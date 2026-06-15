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
  BEDRIJFSINFO,
  fmtEur,
} from "@/data/slim-content";

export const metadata = {
  title: "Wat is SLIM-subsidie? Alles over de regeling in 2026",
  description:
    "Wat is de SLIM-subsidie en wat kunt u ermee? Activiteiten, voorwaarden, subsidiabele kosten en concrete projectvoorbeelden voor individueel MKB en samenwerkingsverbanden uitgelegd.",
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
      name: "Wat is het verschil tussen individueel en samenwerking?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Individuele MKB-aanvragen gaan via loting bij overintekening, met een maximum van tot €25.000 en een looptijd van 12 maanden. Samenwerkingsverbanden van minimaal twee MKB-ondernemingen kunnen tot €500.000 aanvragen (per partner tot €200.000), met een looptijd van 24 maanden. Per Staatscourant 31 maart 2026 gaan ook samenwerkingsverbanden via loting. Activiteit C is bij samenwerkingsverbanden een verplicht onderdeel.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik meerdere activiteiten combineren?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Artikel 2.8 lid 5 van de SLIM-regeling staat combinaties van activiteiten toe in één aanvraag. Zo kunt u activiteit A (doorlichting) combineren met activiteit C (L&O-methode), of activiteit B (loopbaanadvies) met activiteit C. Het maximale subsidiebedrag van tot €25.000 geldt voor de gecombineerde aanvraag.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik meerdere aanvragen indienen voor dezelfde onderneming in hetzelfde tijdvak?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee. Per aanvraagtijdvak wordt maximaal één aanvraag per onderneming in behandeling genomen (artikel 2.8 lid 4 SLIM-regeling). Een tweede aanvraag in hetzelfde tijdvak wordt geweigerd. Wilt u meerdere activiteiten subsidiëren? Combineer ze in één aanvraag. U kunt activiteiten A, B en C combineren binnen één aanvraag — het maximale subsidiebedrag blijft tot €25.000 voor de gecombineerde aanvraag.",
      },
    },
  ],
};

function fmtDatum(d) {
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}
function fmtTijd(d) {
  return d.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
}
function fmtDatumKort(d) {
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
}

export default function WatIsSlimPage() {
  const tv1 = TIJDVAKKEN_2026.find((t) => t.label === "Tijdvak 1 2026");
  const tv2 = TIJDVAKKEN_2026.find((t) => t.label === "Tijdvak 2 2026");
  const tvSWV = TIJDVAKKEN_2026.find((t) => t.type === "samenwerking");

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <Navigation />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── 1. HERO ── */}
      <div style={{ background: "var(--navy)", padding: "60px 20px 52px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              color: "var(--blue-light)",
              marginBottom: 12,
            }}
          >
            De SLIM-regeling
          </div>
          <h1
            style={{
              fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: 16,
              marginTop: 0,
            }}
          >
            Wat is de SLIM-subsidie?
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              maxWidth: 680,
              marginBottom: 28,
            }}
          >
            De SLIM-subsidie (Stimuleringsregeling Leren en Ontwikkelen in Mkb-ondernemingen) vergoedt{" "}
            {SUBSIDIE.percentage}% van uw investering in leren en ontwikkelen. Tot{" "}
            {fmtEur(SUBSIDIE.maxBedrag)} subsidie per aanvraag voor individuele MKB-ondernemingen.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/scan" className="hp-btn-p">
              Doe de gratis quickscan →
            </Link>
            <Link href="/slim-subsidie" className="hp-btn-s">
              Meer over aanvragen
            </Link>
          </div>
        </div>
      </div>

      {/* ── 2. CONVERSIE-ELEMENT A ── */}
      <div className="hp-cta-section">
        <div className="hp-si">
          <h2 className="hp-cta-title">Komt uw bedrijf in aanmerking voor SLIM-subsidie?</h2>
          <p className="hp-cta-sub">Doe de gratis quickscan en weet het binnen 2 minuten.</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/scan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>
              Doe de gratis quickscan →
            </Link>
          </div>
        </div>
      </div>

      {/* ── 3. WAT IS SLIM ── */}
      <div style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Achtergrond</div>
          <h2 style={s.h2}>Wat is de SLIM-subsidie?</h2>
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
            Subsidie Advies richt zich op individuele MKB-aanvragen. Voor
            samenwerkingsverbanden is begeleiding op aanvraag beschikbaar.
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
          <div
            style={{
              fontSize: 11,
              color: "var(--muted)",
              marginTop: 24,
              paddingTop: 16,
              borderTop: "1px solid #e8edf3",
            }}
          >
            Bron:{" "}
            <a
              href="https://wetten.overheid.nl/BWBR0043015/2025-07-05"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--blue)" }}
            >
              wetten.overheid.nl/BWBR0043015/2025-07-05
            </a>
          </div>
        </div>
      </div>

      {/* ── 4. VERGELIJKINGSTABEL ── */}
      <div style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Twee varianten</div>
          <h2 style={s.h2}>Individueel MKB of samenwerkingsverband?</h2>
          <p style={s.tekst}>
            De SLIM-regeling kent twee aparte trajecten met eigen subsidiegrenzen, voorwaarden
            en tijdvakken. Hieronder het verschil op een rij.
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
                  <th
                    style={{
                      background: "var(--navy)",
                      color: "#fff",
                      padding: "14px 16px",
                      textAlign: "left",
                      fontWeight: 700,
                      fontSize: 13,
                      width: "28%",
                    }}
                  >
                    Kenmerk
                  </th>
                  <th
                    style={{
                      background: "var(--navy)",
                      color: "#fff",
                      padding: "14px 16px",
                      textAlign: "left",
                      fontWeight: 700,
                      fontSize: 13,
                      width: "36%",
                      borderLeft: "2px solid var(--blue)",
                    }}
                  >
                    Individueel MKB
                    <span
                      style={{
                        display: "block",
                        fontSize: 10,
                        fontWeight: 500,
                        color: "var(--blue-light)",
                        marginTop: 2,
                      }}
                    >
                      Ons specialisme
                    </span>
                  </th>
                  <th
                    style={{
                      background: "#1a3c6b",
                      color: "rgba(255,255,255,0.65)",
                      padding: "14px 16px",
                      textAlign: "left",
                      fontWeight: 700,
                      fontSize: 13,
                      width: "36%",
                    }}
                  >
                    Samenwerkingsverband
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Wie kan aanvragen?",
                    "Individuele MKB-onderneming",
                    "Minimaal 2 MKB-ondernemingen, eventueel aangevuld met brancheorganisatie, O&O-fonds of onderwijsinstelling",
                  ],
                  [
                    "Subsidiebedrag",
                    `Tot ${fmtEur(SUBSIDIE.maxBedrag)} (landbouw: tot ${fmtEur(SUBSIDIE.maxBedragLandbouw)})`,
                    `Tot ${fmtEur(SUBSIDIE.maxBedragSamenwerking)} totaal · Tot ${fmtEur(SUBSIDIE.maxPerPartnerSamenwerking)} per partner`,
                  ],
                  [
                    "Subsidiepercentage",
                    `${SUBSIDIE.percentage}% van subsidiabele kosten`,
                    `${SUBSIDIE.percentage}% van subsidiabele kosten`,
                  ],
                  [
                    "Minimale subsidiabele kosten",
                    `${fmtEur(SUBSIDIE.minSubsidie)} (act. A en C) · Geen minimum voor B`,
                    "€210.000 totaal",
                  ],
                  [
                    "Verplichte activiteit",
                    "Vrije keuze uit A, B of C — combinaties mogelijk",
                    "Activiteit C (L&O-methode) is verplicht onderdeel",
                  ],
                  [
                    "Looptijd",
                    `Maximaal ${SUBSIDIE.looptijdMKB} maanden`,
                    `Maximaal ${SUBSIDIE.looptijdSamenwerking} maanden`,
                  ],
                  [
                    "Voorschot bij toekenning",
                    `${SUBSIDIE.voorschot * 100}% direct uitbetaald`,
                    "25% bij verlening · 50% aanvullend na voortgangsverslag",
                  ],
                  [
                    "Tijdvak 2026",
                    tv2
                      ? `Tijdvak 2: ${fmtDatumKort(tv2.open)} t/m ${fmtDatumKort(tv2.close)}`
                      : "Tijdvak 2: 10 aug t/m 7 sep 2026",
                    tvSWV
                      ? `${fmtDatumKort(tvSWV.open)} t/m ${fmtDatumKort(tvSWV.close)}`
                      : "22 jun t/m 20 jul 2026",
                  ],
                  [
                    "Behandeling aanvragen",
                    "Loting bij overintekening",
                    "Loting (gewijzigd per 31 maart 2026) *",
                  ],
                  [
                    "Begeleiding door ons",
                    "Volledig — dit is ons specialisme",
                    "Op aanvraag — neem contact op",
                  ],
                ].map(([kenmerk, individueel, samenwerking], i) => (
                  <tr key={kenmerk} style={{ background: i % 2 === 0 ? "var(--white)" : "#f7f9fc" }}>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontWeight: 600,
                        color: "var(--navy)",
                        fontSize: 13,
                        borderBottom: "1px solid #e8edf3",
                        verticalAlign: "top",
                      }}
                    >
                      {kenmerk}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--navy)",
                        fontSize: 13,
                        borderBottom: "1px solid #e8edf3",
                        verticalAlign: "top",
                        borderLeft: "2px solid var(--blue)",
                      }}
                    >
                      {individueel}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--muted)",
                        fontSize: 13,
                        borderBottom: "1px solid #e8edf3",
                        verticalAlign: "top",
                      }}
                    >
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
            <a
              href="https://zoek.officielebekendmakingen.nl/stcrt-2026-13249"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--blue)" }}
            >
              stcrt-2026-13249
            </a>
          </p>
        </div>
      </div>

      {/* ── 5. SUBSIDIABELE ACTIVITEITEN ── */}
      <div style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Subsidiabele activiteiten — individuele MKB-aanvragen</div>
          <h2 style={s.h2}>Drie activiteiten om subsidie voor aan te vragen</h2>
          <p style={s.tekst}>
            De SLIM-regeling kent drie subsidiabele activiteiten. U kunt één activiteit aanvragen
            of meerdere combineren in één aanvraag (art. 2.8 lid 5 SLIM-regeling). Het maximale
            subsidiebedrag van tot {fmtEur(SUBSIDIE.maxBedrag)} geldt voor de gecombineerde
            aanvraag.
          </p>

          {/* Activiteit A */}
          <div
            style={{
              marginTop: 32,
              border: "1px solid #c7d9f5",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "#e8f0fd",
                borderBottom: "1px solid #c7d9f5",
                padding: "18px 24px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span className="hp-act-tag a" style={{ margin: 0 }}>
                Activiteit A
              </span>
              <strong style={{ fontSize: 16, color: "var(--navy)" }}>
                Doorlichting van de onderneming
              </strong>
            </div>
            <div style={{ padding: "24px", background: "var(--white)" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: 24,
                }}
              >
                <div>
                  <p style={{ ...s.tekst, marginBottom: 12 }}>
                    Breng de ontwikkelbehoefte van uw organisatie in kaart via een externe
                    deskundige. De adviseur analyseert uw organisatie en stelt een concreet
                    opleidings- en ontwikkelplan op maat op.
                  </p>
                  <p style={{ ...s.tekst, marginBottom: 12 }}>
                    <strong style={{ color: "var(--navy)" }}>Waarom:</strong> Veranderingen op de
                    arbeidsmarkt — digitalisering, robotisering, toenemende concurrentie op
                    talent — vragen om periodieke heroriëntatie op kennis en vaardigheden van uw
                    medewerkers.
                  </p>
                  <p style={{ ...s.tekst, marginBottom: 0 }}>
                    <strong style={{ color: "var(--navy)" }}>Eindproduct:</strong>{" "}
                    opleidings- of ontwikkelplan (verplicht als bijlage bij aanvraag)
                  </p>
                </div>
                <div>
                  <div
                    style={{
                      background: "#f7f9fc",
                      borderRadius: 10,
                      padding: "16px 18px",
                      marginBottom: 14,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        color: "var(--blue)",
                        marginBottom: 10,
                      }}
                    >
                      Subsidievoorwaarden
                    </div>
                    <ul className="hp-req-list">
                      <li className="hp-req-item">
                        <span className="hp-req-dot" />
                        <span>
                          Minimale subsidie: <strong>{fmtEur(SUBSIDIE.minSubsidie)}</strong>
                        </span>
                      </li>
                      <li className="hp-req-item">
                        <span className="hp-req-dot" />
                        <span>
                          Benodigde projectomvang: vanaf{" "}
                          <strong>{fmtEur(SUBSIDIE.minProjectomvang)}</strong>
                        </span>
                      </li>
                      <li className="hp-req-item">
                        <span className="hp-req-dot" />
                        <span>
                          Max. uurtarief adviseur:{" "}
                          <strong>€{SUBSIDIE.maxUurtarief}</strong> excl. btw
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div style={{ background: "#f7f9fc", borderRadius: 10, padding: "16px 18px" }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        color: "var(--blue)",
                        marginBottom: 10,
                      }}
                    >
                      Concrete voorbeelden
                    </div>
                    <ul className="hp-req-list">
                      {[
                        "Leercultuurscan door externe HR-adviseur",
                        "Strategische personeelsplanning gekoppeld aan bedrijfsontwikkeling",
                        "Analyse van digitaliserings- of robotiseringsimpact op functies",
                        "HR-strategie voor toekomstbestendige organisatie",
                      ].map((ex) => (
                        <li key={ex} className="hp-req-item">
                          <span className="hp-req-dot" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activiteit B */}
          <div
            style={{
              marginTop: 20,
              border: "1px solid #fde9a0",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "#fef9ee",
                borderBottom: "1px solid #fde9a0",
                padding: "18px 24px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span className="hp-act-tag b" style={{ margin: 0 }}>
                Activiteit B
              </span>
              <strong style={{ fontSize: 16, color: "var(--navy)" }}>
                Loopbaan- en ontwikkeladviezen voor werknemers
              </strong>
            </div>
            <div style={{ padding: "24px", background: "var(--white)" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: 24,
                }}
              >
                <div>
                  <p style={{ ...s.tekst, marginBottom: 12 }}>
                    Medewerkers ontvangen individueel loopbaan- of ontwikkeladvies van een
                    gecertificeerde adviseur. Per afgerond traject ontvangt u{" "}
                    {fmtEur(SUBSIDIE.loopbaanVergoeding)} subsidie — ongeacht de daadwerkelijke
                    kosten van de adviseur.
                  </p>
                  <p style={{ ...s.tekst, marginBottom: 12 }}>
                    <strong style={{ color: "var(--navy)" }}>Waarom:</strong> Inzicht in wensen en
                    ambities helpt bij het vitaal houden van personeel, strategische planning en
                    het voorkomen van uitstroom.
                  </p>
                  <p style={{ ...s.tekst, marginBottom: 0 }}>
                    <strong style={{ color: "var(--navy)" }}>Eindproduct:</strong>{" "}
                    tweezijdig getekende prestatieverklaring per deelnemer
                  </p>
                </div>
                <div>
                  <div
                    style={{
                      background: "#f7f9fc",
                      borderRadius: 10,
                      padding: "16px 18px",
                      marginBottom: 14,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        color: "var(--blue)",
                        marginBottom: 10,
                      }}
                    >
                      Subsidievoorwaarden
                    </div>
                    <ul className="hp-req-list">
                      <li className="hp-req-item">
                        <span className="hp-req-dot" />
                        <span>
                          Vaste vergoeding: <strong>{fmtEur(SUBSIDIE.loopbaanVergoeding)}</strong>{" "}
                          per afgerond traject
                        </span>
                      </li>
                      <li className="hp-req-item">
                        <span className="hp-req-dot" />
                        <span>
                          Minimale gespreksduur: <strong>4 uur</strong> per deelnemer
                        </span>
                      </li>
                      <li className="hp-req-item">
                        <span className="hp-req-dot" />
                        <span>
                          Vereiste adviseur: Noloc Register Loopbaanprofessional of gelijkwaardig
                          (HBO+, min. 3 jaar ervaring)
                        </span>
                      </li>
                      <li className="hp-req-item">
                        <span className="hp-req-dot" />
                        <span>Geen minimale projectomvang</span>
                      </li>
                    </ul>
                  </div>
                  <div style={{ background: "#f7f9fc", borderRadius: 10, padding: "16px 18px" }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        color: "var(--blue)",
                        marginBottom: 10,
                      }}
                    >
                      Concrete voorbeelden
                    </div>
                    <ul className="hp-req-list">
                      {[
                        "POP-traject (Persoonlijk Ontwikkelplan)",
                        "Loopbaangesprekken bij reorganisatie of functiewijziging",
                        "Talentassessment gekoppeld aan doorgroeipad",
                        "Outplacement-voorbereiding voor medewerkers",
                      ].map((ex) => (
                        <li key={ex} className="hp-req-item">
                          <span className="hp-req-dot" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activiteit C */}
          <div
            style={{
              marginTop: 20,
              border: "1px solid #a8d8bc",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "#edf7f0",
                borderBottom: "1px solid #a8d8bc",
                padding: "18px 24px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span className="hp-act-tag c" style={{ margin: 0 }}>
                Activiteit C
              </span>
              <strong style={{ fontSize: 16, color: "var(--navy)" }}>
                Ontwikkelen of invoeren van een L&amp;O-methode
              </strong>
            </div>
            <div style={{ padding: "24px", background: "var(--white)" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: 24,
                }}
              >
                <div>
                  <p style={{ ...s.tekst, marginBottom: 12 }}>
                    Implementeer een structurele methode die leren en ontwikkelen verankert in uw
                    organisatie. Activiteit C kent drie subcategorieën die ook gecombineerd kunnen
                    worden binnen één aanvraag.
                  </p>
                  <p style={{ ...s.tekst, marginBottom: 16 }}>
                    <strong style={{ color: "var(--navy)" }}>Waarom:</strong> Een leerrijke
                    werkomgeving trekt talent aan, bindt medewerkers en maakt uw organisatie
                    wendbaarder voor toekomstige veranderingen.
                  </p>
                  <p style={{ ...s.tekst, marginBottom: 16 }}>
                    <strong style={{ color: "var(--navy)" }}>Eindproduct:</strong>{" "}
                    documentatie van de gerealiseerde methode (verplicht als bijlage)
                  </p>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "var(--navy)", marginBottom: 10 }}>
                    Drie subcategorieën:
                  </div>
                  {[
                    [
                      "Systeem van periodieke ontwikkelgesprekken",
                      [
                        "Ontwikkelen en invoeren van gestructureerde ontwikkelgesprekken",
                        "Training van leidinggevenden in het voeren van ontwikkelgesprekken",
                      ],
                    ],
                    [
                      "Leerrijke werkomgeving",
                      [
                        "Ontwikkelen van een e-learning programma op maat",
                        "Opzetten van een digitaal kennis- en leerportaal",
                        "Introductie van leerambassadeurs",
                        "Implementeren van taakroulatie of taakverbreding",
                      ],
                    ],
                    [
                      "Bedrijfsschool",
                      [
                        "Aansluiten bij een bestaande bedrijfsschool",
                        "Oprichten van een eigen bedrijfsschool",
                        "Combineren van leren en werken",
                      ],
                    ],
                  ].map(([titel, items]) => (
                    <div key={titel} style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--blue)", marginBottom: 4 }}>
                        {titel}
                      </div>
                      <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>
                        {items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div>
                  <div
                    style={{ background: "#f7f9fc", borderRadius: 10, padding: "16px 18px", marginBottom: 14 }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        color: "var(--blue)",
                        marginBottom: 10,
                      }}
                    >
                      Subsidievoorwaarden
                    </div>
                    <ul className="hp-req-list">
                      <li className="hp-req-item">
                        <span className="hp-req-dot" />
                        <span>
                          Minimale subsidie: <strong>{fmtEur(SUBSIDIE.minSubsidie)}</strong>
                        </span>
                      </li>
                      <li className="hp-req-item">
                        <span className="hp-req-dot" />
                        <span>
                          Benodigde projectomvang: vanaf{" "}
                          <strong>{fmtEur(SUBSIDIE.minProjectomvang)}</strong>
                        </span>
                      </li>
                      <li className="hp-req-item">
                        <span className="hp-req-dot" />
                        <span>
                          Max. uurtarief adviseur:{" "}
                          <strong>€{SUBSIDIE.maxUurtarief}</strong> excl. btw
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div
                    style={{
                      background: "#fff8e6",
                      border: "1px solid #fde68a",
                      borderRadius: 10,
                      padding: "14px 16px",
                      marginBottom: 14,
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>
                      Combinaties mogelijk
                    </div>
                    <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.65, margin: 0 }}>
                      Een aanvraag mag meerdere activiteiten bevatten (art. 2.8 lid 5). Bijv.
                      A + C of B + C. Het maximum van tot {fmtEur(SUBSIDIE.maxBedrag)} geldt
                      voor de gecombineerde aanvraag.
                    </p>
                  </div>
                  <div style={{ background: "#f7f9fc", borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>
                      Niet subsidiabel als L&amp;O-methode (wel als ondersteuning):
                    </div>
                    <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>
                      DISC-analyse, Profile Dynamics, Baarda-model, SMART, PDCA,
                      70-20-10 leermethode, IMWR-cirkel, train-de-trainer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 6. WAT IS NIET SUBSIDIABEL ── */}
      <div style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Uitsluitingen</div>
          <h2 style={s.h2}>Wat is NIET subsidiabel?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
            <div className="hp-req-card" style={{ background: "#fef2f2", borderColor: "#fca5a5" }}>
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
                ✗ Uitgesloten activiteiten
              </div>
              <ul className="hp-req-list">
                {[
                  "Reguliere opleidingen en cursussen — de SLIM-subsidie is voor structuren die leren mogelijk maken, niet voor individuele trainingen",
                  "Praktijkleerplaatsen — afgeschaft per 2025, valt nu onder Subsidieregeling Praktijkleren (OCW)",
                  "Projecten die al gestart zijn vóór de datum van subsidieverlening",
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
            </div>
            <div className="hp-req-card" style={{ background: "#fef2f2", borderColor: "#fca5a5" }}>
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
                ✗ Niet-subsidiabele kosten
              </div>
              <ul className="hp-req-list">
                {[
                  "Loonverletkosten (productiviteitsverlies tijdens activiteiten)",
                  "BTW",
                  "Overhead en huisvestingskosten",
                  "Reguliere kantoorapparatuur of software",
                  "Kosten buiten de initiatiefperiode (vóór beschikking of na afloop)",
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

      {/* ── 7. BEREKENING ── */}
      <div style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Kostensystematiek</div>
          <h2 style={s.h2}>Hoe wordt de subsidie berekend?</h2>
          <p style={s.tekst}>
            De subsidie bedraagt {SUBSIDIE.percentage}% van de subsidiabele kosten. Welke kosten
            tellen mee?
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 14,
              marginBottom: 32,
            }}
          >
            {[
              [
                "Externe advieskosten",
                `Tot €${SUBSIDIE.maxUurtarief} per uur excl. btw`,
              ],
              [
                "Interne loonkosten",
                `Brutoloon + ${SUBSIDIE.opslagInterneLoonkosten * 100}% opslag · Basis: ${SUBSIDIE.werkbareUren} werkbare uren/jaar`,
              ],
              [
                "Forfaitaire opslag",
                `${SUBSIDIE.forfaireOpslag * 100}% op bovenstaande kosten (hoeft niet gespecificeerd)`,
              ],
              [
                "Controleverklaring",
                `${fmtEur(SUBSIDIE.controleverklaringBedrag)} vast bedrag (uitsluitend samenwerkingsverbanden)`,
              ],
            ].map(([titel, tekst]) => (
              <div
                key={titel}
                style={{
                  background: "#f7f9fc",
                  border: "1px solid #e8edf3",
                  borderRadius: 10,
                  padding: "16px 18px",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 13, color: "var(--navy)", marginBottom: 6 }}>
                  {titel}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65 }}>{tekst}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {/* Rekenvoorbeeld A/C */}
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #a8d8bc",
                borderRadius: 12,
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "#1a7a4a",
                  marginBottom: 14,
                }}
              >
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
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "7px 0",
                    borderBottom: i < 5 ? "1px solid #d1fae5" : "2px solid #059669",
                    fontWeight: i === 5 ? 800 : 400,
                    color: i === 5 ? "#059669" : "var(--navy)",
                    fontSize: i === 5 ? 15 : 13,
                  }}
                >
                  <span>{label}</span>
                  <span>{bedrag}</span>
                </div>
              ))}
            </div>

            {/* Rekenvoorbeeld B */}
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #a8d8bc",
                borderRadius: 12,
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "#1a7a4a",
                  marginBottom: 14,
                }}
              >
                Rekenvoorbeeld — Activiteit B
              </div>
              {[
                ["Aantal medewerkers", "10"],
                ["Vergoeding per traject", fmtEur(SUBSIDIE.loopbaanVergoeding)],
                ["Totale subsidie", fmtEur(10 * SUBSIDIE.loopbaanVergoeding)],
              ].map(([label, bedrag], i) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "7px 0",
                    borderBottom: i < 2 ? "1px solid #d1fae5" : "2px solid #059669",
                    fontWeight: i === 2 ? 800 : 400,
                    color: i === 2 ? "#059669" : "var(--navy)",
                    fontSize: i === 2 ? 15 : 13,
                  }}
                >
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

      {/* ── 8. WIE KAN AANVRAGEN ── */}
      <div style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Doelgroep individuele aanvragen</div>
          <h2 style={s.h2}>Wie kan individuele SLIM-subsidie aanvragen?</h2>
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
                  "Landbouw-, horeca- en recreatiesector mogen zelfstandig aanvragen",
                  `Maximum: tot ${fmtEur(SUBSIDIE.maxBedragLandbouw)}`,
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

          <div style={{ fontWeight: 700, fontSize: 15, color: "var(--navy)", marginBottom: 14 }}>
            Aanvullende voorwaarden:
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {[
              [
                "Minimaal 1 werknemer",
                "Minimaal één werknemer met arbeidscontract — geen DGA-only of uitsluitend zzp'ers.",
              ],
              [
                "In Nederland gevestigd",
                "Zowel vestiging als activiteiten moeten in Nederland zijn.",
              ],
              [
                "Project nog niet gestart",
                "Activiteiten mogen nog niet zijn begonnen vóór de datum van de subsidiebeschikking.",
              ],
              [
                "Maximaal 1 aanvraag per tijdvak",
                "Per onderneming is slechts één aanvraag per opengesteld tijdvak toegestaan.",
              ],
              [
                "De-minimisplafond",
                "Afgelopen 3 belastingjaren maximaal €300.000 staatssteun ontvangen.",
              ],
            ].map(([titel, tekst]) => (
              <div
                key={titel}
                style={{
                  background: "var(--white)",
                  border: "1px solid #e8edf3",
                  borderRadius: 10,
                  padding: "14px 18px",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--blue)",
                    marginTop: 5,
                  }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "var(--navy)", marginBottom: 3 }}>
                    {titel}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65 }}>{tekst}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 9. TIJDVAKKEN 2026 ── */}
      <div style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Planning individueel MKB</div>
          <h2 style={s.h2}>Tijdvakken en budget 2026</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: 14,
              marginBottom: 28,
            }}
          >
            {[
              [fmtEur(BUDGET_2026.individueel), "Budget individueel MKB 2026"],
              [`~${LOTING.kansRuw}%`, "Slaagkans tijdvak 1 2026"],
              [
                `${LOTING.inBehandeling} van ${LOTING.totaalIngediend.toLocaleString("nl-NL")}`,
                "Ingeloot tijdvak 1 2026",
              ],
              [`${LOTING.afgekeurdVoorLoting} aanvragen`, "Afgewezen vóór loting door fouten"],
            ].map(([num, lbl]) => (
              <div
                key={lbl}
                style={{
                  background: "#f7f9fc",
                  border: "1px solid #e8edf3",
                  borderRadius: 12,
                  padding: "18px 16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: "var(--blue)",
                    lineHeight: 1.1,
                    marginBottom: 6,
                  }}
                >
                  {num}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.4 }}>{lbl}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 680 }}>
            {[
              {
                label: "Tijdvak 1 2026",
                status: "Gesloten",
                periode: tv1
                  ? `${fmtDatum(tv1.open)} t/m ${fmtDatum(tv1.close)}`
                  : "7 april t/m 4 mei 2026",
                isOpen: false,
              },
              {
                label: "Tijdvak 2 2026",
                status: "Opent binnenkort",
                periode: tv2
                  ? `${fmtDatum(tv2.open)} om ${fmtTijd(tv2.open)} t/m ${fmtDatum(tv2.close)} om ${fmtTijd(tv2.close)}`
                  : "10 aug t/m 7 sep 2026",
                isOpen: true,
              },
            ].map(({ label, status, periode, isOpen }) => (
              <div
                key={label}
                style={{
                  background: isOpen ? "#f0fdf4" : "#f7f9fc",
                  border: `1px solid ${isOpen ? "#a8d8bc" : "#e8edf3"}`,
                  borderRadius: 12,
                  padding: "18px 22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "var(--navy)", marginBottom: 4 }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>{periode}</div>
                </div>
                <span className={`hp-tl-badge ${isOpen ? "open" : "closed"}`}>{status}</span>
              </div>
            ))}
          </div>

          <div className="alert-info" style={{ marginTop: 20, maxWidth: 680 }}>
            💡 <strong>Tip:</strong> Begin minimaal 4 weken vóór de sluiting met de voorbereiding.
            Er is geen voordeel aan vroeg indienen — de loting is aselect. Wat telt: een complete,
            foutloze aanvraag.
          </div>

          <div style={{ marginTop: 16, fontSize: 13 }}>
            <Link
              href="/slim-subsidie/2026"
              style={{ color: "var(--blue)", textDecoration: "none", fontWeight: 600 }}
            >
              Bekijk alle tijdvakken en loting-uitslagen →
            </Link>
          </div>
        </div>
      </div>

      {/* ── 10. SAMENWERKINGSVERBANDEN ── */}
      <div style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Werkt u samen met andere MKB-bedrijven?</div>
          <h2 style={s.h2}>SLIM-subsidie voor samenwerkingsverbanden</h2>
          <p style={s.tekst}>
            De SLIM-regeling kent ook een variant voor samenwerkingsverbanden van minimaal twee
            MKB-ondernemingen. Dit is een apart traject met eigen voorwaarden, een hoger
            subsidiebedrag en een andere behandelingsprocedure (loting — per Staatscourant
            31 maart 2026 gewijzigd).
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 14,
              marginBottom: 24,
            }}
          >
            {[
              [`Tot ${fmtEur(SUBSIDIE.maxBedragSamenwerking)}`, "Subsidie per samenwerking"],
              [`Tot ${fmtEur(SUBSIDIE.maxPerPartnerSamenwerking)}`, "Subsidie per deelnemende partij"],
              ["€210.000", "Minimale subsidiabele kosten"],
              [`${SUBSIDIE.looptijdSamenwerking} maanden`, "Maximale looptijd"],
            ].map(([num, lbl]) => (
              <div
                key={lbl}
                style={{
                  background: "var(--white)",
                  border: "1px solid #e8edf3",
                  borderRadius: 10,
                  padding: "16px 18px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 900,
                    color: "var(--navy)",
                    lineHeight: 1.1,
                    marginBottom: 5,
                  }}
                >
                  {num}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.4 }}>{lbl}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
              marginBottom: 24,
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "var(--navy)", marginBottom: 10 }}>
                Belangrijkste kenmerken:
              </div>
              <ul style={{ ...s.lijst, marginTop: 0 }}>
                <li>Activiteit C (L&amp;O-methode) is verplicht onderdeel</li>
                <li>Behandeling via loting (gewijzigd per 31 maart 2026, stcrt-2026-13249)</li>
                <li>
                  Tijdvak 2026:{" "}
                  {tvSWV
                    ? `${fmtDatum(tvSWV.open)} t/m ${fmtDatum(tvSWV.close)}`
                    : "22 juni t/m 20 juli 2026"}
                </li>
                <li>25% voorschot bij verlening, 50% aanvullend na voortgangsverslag</li>
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "var(--navy)", marginBottom: 10 }}>
                Wie kan deelnemen als partner:
              </div>
              <ul style={{ ...s.lijst, marginTop: 0 }}>
                <li>MKB-ondernemingen (minimaal 2 verplicht)</li>
                <li>Brancheorganisaties</li>
                <li>Onderwijsinstellingen</li>
                <li>O&amp;O-fondsen</li>
                <li>Werknemers- of werkgeversverenigingen</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              background: "var(--white)",
              border: "1px solid #e8edf3",
              borderRadius: 12,
              padding: "20px 24px",
            }}
          >
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, margin: "0 0 16px" }}>
              SLIM Subsidie Advies richt zich primair op individuele MKB-aanvragen. Begeleiding
              bij samenwerkingsverbanden is beschikbaar op aanvraag, gezien het maatwerk karakter
              van deze trajecten.
            </p>
            <Link
              href={`mailto:${BEDRIJFSINFO.email}`}
              className="hp-btn-s"
              style={{ display: "inline-block" }}
            >
              Neem contact op →
            </Link>
          </div>
        </div>
      </div>

      {/* ── 11. STATE OF SLIM ── */}
      <div style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>State of SLIM 2026 — data-analyse</div>
          <h2 style={s.h2}>Wat zeggen de data?</h2>
          <p style={s.tekst}>
            Op basis van NLP/AI-analyse van{" "}
            {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} gehonoreerde
            SLIM-projecten (2020–2024) zijn opmerkelijke trends zichtbaar in de aanvraagpatronen.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 14,
              marginBottom: 24,
            }}
          >
            {[
              [
                `${STATE_OF_SLIM.conversieProjecten} van ${STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")}`,
                "Conversie- en omscholingsprojecten (0,3%)",
                "#1a56db",
              ],
              ["−80%", "Dalende trend conversie t.o.v. 2020", "#1a56db"],
              [`~${LOTING.kansRuw}%`, "Slaagkans tijdvak 1 2026", "#1a7a4a"],
              [
                `${LOTING.afgekeurdVoorLoting}`,
                "Aanvragen afgewezen vóór loting door fouten",
                "#dc2626",
              ],
            ].map(([num, lbl, clr]) => (
              <div
                key={lbl}
                style={{
                  background: "#f7f9fc",
                  border: "1px solid #e8edf3",
                  borderRadius: 12,
                  padding: "18px 16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: clr,
                    lineHeight: 1.1,
                    marginBottom: 6,
                  }}
                >
                  {num}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.4 }}>{lbl}</div>
              </div>
            ))}
          </div>

          <p style={s.tekst}>
            Conversie en omscholing is de meest onderbenutte SLIM-categorie: slechts{" "}
            {STATE_OF_SLIM.conversieProjecten} van de{" "}
            {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} gehonoreerde projecten (0,3%)
            betreft dit type. Deze categorie heeft structureel minder concurrentie bij de loting —
            een kans voor ondernemers die actief medewerkers willen omscholen.
          </p>

          <Link
            href="/slim-subsidie/resultaten"
            style={{ fontSize: 14, color: "var(--blue)", textDecoration: "none", fontWeight: 600 }}
          >
            Lees het State of SLIM whitepaper →
          </Link>
        </div>
      </div>

      {/* ── 12. FAQ ── */}
      <div style={{ background: "var(--off)", ...s.sectie }}>
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
                a: "MKB-ondernemingen met minimaal één werknemer in loondienst, gevestigd en actief in Nederland. De MKB-definitie volgt de EU-norm: minder dan 250 medewerkers én een jaaromzet van maximaal €50 miljoen of een balanstotaal van maximaal €43 miljoen. Grootbedrijven in de landbouw-, horeca- en recreatiesector mogen ook zelfstandig aanvragen.",
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

      {/* ── 13. CONVERSIE-ELEMENT B ── */}
      <div className="hp-cta-section">
        <div className="hp-si">
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              color: "var(--blue-light)",
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            Tijdvak 2 opent 10 augustus 2026
          </div>
          <h2 className="hp-cta-title">Komt uw bedrijf in aanmerking voor SLIM-subsidie?</h2>
          <p className="hp-cta-sub">
            Doe de gratis quickscan en weet het binnen 2 minuten. Tijdvak 2 opent 10 augustus
            2026.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/scan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>
              Doe de gratis quickscan →
            </Link>
            <Link
              href="/slim-subsidie/aanvragen"
              className="hp-btn-s"
              style={{ fontSize: 16, padding: "15px 34px" }}
            >
              Meer over aanvragen →
            </Link>
          </div>
          <p className="hp-cta-note">
            Gratis quickscan · Reserveringsfee {fmtEur(PRICING.reserveringsfee)} excl. btw ·
            Succesfee €2.500 excl. btw — no cure, no pay
          </p>
        </div>
      </div>

      {/* ── INTERNE LINKS ── */}
      <div style={{ background: "var(--navy)", padding: "28px 20px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: 14,
            }}
          >
            Meer informatie
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              ["/slim-subsidie", "SLIM-subsidie aanvragen"],
              ["/slim-subsidie/aanvragen", "Hoe aanvragen?"],
              ["/slim-subsidie/voorwaarden", "Alle voorwaarden"],
              ["/slim-subsidie/resultaten", "State of SLIM whitepaper"],
              ["/scan", "Gratis quickscan"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  padding: "6px 14px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 20,
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── BRONVERMELDING ── */}
      <div
        style={{
          background: "var(--navy)",
          padding: "16px 20px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <p
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            margin: 0,
            textAlign: "center",
            lineHeight: 1.8,
          }}
        >
          Bron:{" "}
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
            href="https://www.uitvoeringvanbeleidszw.nl/subsidies-en-regelingen/algemene-informatie/slim-mkb-individuele-aanvragen--samenwerkingsverbanden-2025---2029/over-slim-mkb-individuele-mkb-ondernemingen--samenwerkingsverbanden-2025---2029"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.3)", textDecoration: "underline" }}
          >
            uitvoeringvanbeleidszw.nl
          </a>
          {" · "}
          <Link
            href="/slim-subsidie"
            style={{ color: "rgba(255,255,255,0.3)", textDecoration: "underline" }}
          >
            ← SLIM-subsidie overzicht
          </Link>
        </p>
      </div>
    </div>
  );
}
