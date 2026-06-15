import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
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

  return (
    <div className="hp">
      <Navigation />

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
              <Link href="/slim-subsidie/wat-is-slim" className="hp-btn-s">Wat is SLIM-subsidie?</Link>
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
              <div key={lbl} className="hp-l-card" style={{ background: "var(--navy)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="hp-l-num b" style={{ fontSize: 26 }}>{num}</div>
                <div className="hp-l-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DOORVERWIJSBLOK ── */}
      <div className="hp-section" style={{ background: "var(--off)" }}>
        <div className="hp-si">
          <div className="hp-slbl">Alles over de regeling</div>
          <h2 className="hp-stitle">Hoe werkt de SLIM-subsidie?</h2>
          <p className="hp-ssub" style={{ maxWidth: 640 }}>
            Voorwaarden, activiteiten, subsidiabele kosten, lotingsprocedure
            en analyse van {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} gehonoreerde
            projecten — alles op één pagina.
          </p>
          <Link
            href="/slim-subsidie/wat-is-slim"
            className="hp-btn-p"
            style={{ display: "inline-block", marginTop: 8 }}
          >
            Lees de volledige uitleg →
          </Link>
        </div>
      </div>

      {/* ── 4. TIJDVAKKEN 2026 ── */}
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

      {/* ── 5. WAAROM SLIM SUBSIDIE ADVIES? ── */}
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

      {/* ── 6. CTA ONDERAAN ── */}
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
