import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import FAQAccordeon from "@/components/ui/FAQAccordeon";
import {
  SUBSIDIE,
  PRICING,
  LOTING,
  TIJDVAKKEN_2026,
} from "@/data/slim-content";

export const metadata = {
  title: "SLIM-subsidie aanvragen in 2026 — Stappenplan en deadlines",
  description:
    "Hoe vraagt u SLIM-subsidie aan in 2026? Stappenplan, verplichte documenten, tijdvakken en tips voor een foutloze aanvraag. Tijdvak 2 opent 10 augustus 2026.",
  alternates: {
    canonical: "https://www.slimsubsidieadvies.nl/slim-subsidie-aanvragen",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wanneer kan ik SLIM-subsidie aanvragen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tijdvak 2 2026 opent op 10 augustus 2026 om 09:00 en sluit op 7 september 2026 om 17:00. Voor samenwerkingsverbanden was het tijdvak 22 juni t/m 20 juli 2026.",
      },
    },
    {
      "@type": "Question",
      name: "Welke documenten heb ik nodig voor de SLIM-subsidie aanvraag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Activiteitenplan (RVO-model), begroting (RVO-model), MKB-verklaring, de-minimisverklaring en kopie bankafschrift. Alle formats zijn beschikbaar via uitvoeringvanbeleidszw.nl.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe lang duurt het invullen van de SLIM-subsidie aanvraag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reken op 4-8 uur voor voorbereiding en invullen, afhankelijk van de complexiteit van uw project. Begin minimaal 4 weken voor de sluiting.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik meerdere SLIM-aanvragen indienen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee. Per onderneming is maximaal één aanvraag per tijdvak toegestaan.",
      },
    },
    {
      "@type": "Question",
      name: "Wat als mijn aanvraag niet volledig is bij sluiting van het tijdvak?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "U mag de aanvraag nog aanvullen na sluiting, maar deze komt dan achteraan in de lotingsvolgorde. Een complete aanvraag bij sluiting is sterk aanbevolen.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe weet ik of mijn project subsidiabel is?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Doe de gratis quickscan op slimsubsidieadvies.nl. U weet binnen 2 minuten of uw bedrijf in aanmerking komt.",
      },
    },
    {
      "@type": "Question",
      name: "Wanneer ontvang ik het geld na toekenning van de SLIM-subsidie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bij toekenning ontvangt u binnen 6 weken 50% voorschot. RVO beslist binnen 13 weken na sluiting van het tijdvak.",
      },
    },
    {
      "@type": "Question",
      name: "Wat als ik niet word ingeloot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wij dienen uw aanvraag in het volgende tijdvak opnieuw in — kosteloos, totdat u ingeloot wordt.",
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

const STAPPEN = [
  {
    nr: "1",
    titel: "Bepaal uw doel en activiteit",
    tekst: "Kies welke activiteit u aanvraagt: A (doorlichting), B (loopbaanadviezen) of C (L&O-methode). Combinaties zijn mogelijk. Het maximale subsidiebedrag van tot €25.000 geldt voor de gecombineerde aanvraag.",
    link: { label: "Welke activiteit past bij u? →", href: "/slim-subsidie#activiteiten" },
  },
  {
    nr: "2",
    titel: "Controleer of u in aanmerking komt",
    tekst: "MKB-onderneming, minimaal 1 werknemer in loondienst, gevestigd in Nederland, project nog niet gestart, maximaal 1 aanvraag per tijdvak, de-minimisplafond niet overschreden (max. €300.000 staatssteun in 3 jaar).",
    link: { label: "Doe de gratis quickscan →", href: "/scan" },
  },
  {
    nr: "3",
    titel: "Bereid de verplichte documenten voor",
    tekst: null,
    docs: [
      "Activiteitenplan (RVO-model verplicht)",
      "Begroting (RVO-model verplicht)",
      "MKB-verklaring",
      "De-minimisverklaring",
      "Kopie bankafschrift",
    ],
    tip: "Download de formats ruim vóór het tijdvak. De portal kan vlak voor sluiting traag zijn.",
    link: null,
  },
  {
    nr: "4",
    titel: "Maak een account aan op mijnuitvoering",
    tekst: "Registreer op mijnuitvoeringvanbeleidszw.nl. Ga naar 'Mijn regelingen' en voeg de SLIM-regeling toe. Let op: registreer voor het juiste type aanvrager (individueel MKB of samenwerkingsverband). DigiD of eHerkenning vereist.",
    link: null,
  },
  {
    nr: "5",
    titel: "Dien in binnen het tijdvak",
    tekst: "Het e-formulier invullen duurt even. U kunt tussentijds opslaan. Voeg alle verplichte bijlagen toe voordat u afrondt. Een onvolledige aanvraag die na sluiting wordt hersteld, komt achteraan in de lotingsvolgorde.",
    link: null,
  },
  {
    nr: "6",
    titel: "Loting bij overintekening",
    tekst: `Na sluiting van het tijdvak bepaalt een notariële loting de behandelvolgorde. In tijdvak 1 2026: ${LOTING.totaalIngediend.toLocaleString("nl-NL")} aanvragen ingediend, ${LOTING.inBehandeling} ingeloot (~${LOTING.kansRuw}%). Inloting is een noodzakelijke voorwaarde voor inhoudelijke beoordeling — geen garantie op toekenning.`,
    link: { label: "Hoe werkt de loting precies? →", href: "/slim-subsidie-loting" },
  },
  {
    nr: "7",
    titel: "Beoordeling en beschikking",
    tekst: `RVO beoordeelt uw aanvraag inhoudelijk binnen 13 weken na sluiting. Bij toekenning ontvangt u binnen 6 weken ${SUBSIDIE.voorschot * 100}% voorschot. Subsidies tot €25.000 worden ambtshalve vastgesteld — u hoeft geen verzoek tot vaststelling in te dienen.`,
    link: null,
  },
];

const FOUTEN = [
  {
    titel: "Verkeerd RVO-format",
    tekst: "Gebruik altijd het actuele activiteitenplan en begrotingsformat van uitvoeringvanbeleidszw.nl. Verouderde formats worden afgewezen.",
  },
  {
    titel: "Project al gestart",
    tekst: "Activiteiten mogen nog niet zijn begonnen vóór de datum van de subsidiebeschikking. Niet vóór indiening, maar vóór de beschikking.",
  },
  {
    titel: "Onvolledige bijlagen",
    tekst: "Alle vijf verplichte documenten moeten aanwezig zijn bij indiening.",
  },
  {
    titel: "Meerdere aanvragen per tijdvak",
    tekst: "Per onderneming is slechts één aanvraag per tijdvak toegestaan. Een tweede aanvraag wordt niet meegenomen in de loting.",
  },
  {
    titel: "Onjuiste MKB-verklaring",
    tekst: "De EU-definitie telt verbonden en gelieerde ondernemingen mee. Een holding met meerdere BV's telt als geheel.",
  },
  {
    titel: "De-minimisplafond overschreden",
    tekst: "Controleer of u in de afgelopen 3 belastingjaren meer dan €300.000 staatssteun heeft ontvangen.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Wanneer kan ik SLIM-subsidie aanvragen?",
    a: "Tijdvak 2 2026 opent op 10 augustus 2026 om 09:00 en sluit op 7 september 2026 om 17:00. Voor samenwerkingsverbanden was het tijdvak 22 juni t/m 20 juli 2026.",
  },
  {
    q: "Welke documenten heb ik nodig?",
    a: "Activiteitenplan (RVO-model), begroting (RVO-model), MKB-verklaring, de-minimisverklaring en kopie bankafschrift. Alle formats zijn beschikbaar via uitvoeringvanbeleidszw.nl.",
  },
  {
    q: "Hoe lang duurt het invullen van de aanvraag?",
    a: "Reken op 4-8 uur voor voorbereiding en invullen, afhankelijk van de complexiteit van uw project. Begin minimaal 4 weken voor de sluiting.",
  },
  {
    q: "Kan ik meerdere aanvragen indienen?",
    a: "Nee. Per onderneming is maximaal één aanvraag per tijdvak toegestaan.",
  },
  {
    q: "Wat als mijn aanvraag niet volledig is bij sluiting?",
    a: "U mag de aanvraag nog aanvullen na sluiting, maar deze komt dan achteraan in de lotingsvolgorde. Een complete aanvraag bij sluiting is sterk aanbevolen.",
  },
  {
    q: "Hoe weet ik of mijn project subsidiabel is?",
    a: "Doe de gratis quickscan op slimsubsidieadvies.nl. U weet binnen 2 minuten of uw bedrijf in aanmerking komt.",
  },
  {
    q: "Wanneer ontvang ik het geld?",
    a: "Bij toekenning ontvangt u binnen 6 weken 50% voorschot. RVO beslist binnen 13 weken na sluiting van het tijdvak.",
  },
  {
    q: "Wat als ik niet word ingeloot?",
    a: "Wij dienen uw aanvraag in het volgende tijdvak opnieuw in — kosteloos, totdat u ingeloot wordt.",
  },
];

const tijdvakken2026 = TIJDVAKKEN_2026.filter((tv) => tv.open.getFullYear() === 2026);

export default function SlimSubsidieAanvragenPage() {
  return (
    <div className="hp">
      <Navigation />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ── */}
      <div className="hp-hero" style={{ paddingBottom: 40 }}>
        <div className="hp-hero-inner" style={{ gridTemplateColumns: "1fr", maxWidth: 760 }}>
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(42,170,226,0.15)",
              border: "1px solid rgba(42,170,226,0.35)",
              borderRadius: 20,
              padding: "5px 14px",
              marginBottom: 18,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--blue-light)", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--blue-light)" }}>
                TIJDVAK 2 OPENT 10 AUGUSTUS 2026
              </span>
            </div>

            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 10 }}>
              AANVRAAGPROCES
            </div>

            <h1 className="hp-h1" style={{ marginBottom: 16 }}>
              SLIM-subsidie aanvragen in 2026
            </h1>

            <p className="hp-sub" style={{ maxWidth: 620, marginBottom: 28 }}>
              Tijdvak 2 opent op 10 augustus 2026. Hier leest u precies hoe u een correcte aanvraag
              indient — van voorbereiding tot indiening via mijnuitvoeringvanbeleidszw.nl.
            </p>

            <div className="hp-ctas">
              <Link href="/quickscan" className="hp-btn-p">
                Doe de gratis quickscan →
              </Link>
              <Link href="/slim-subsidie#voor-wie" className="hp-btn-s">
                Bekijk de voorwaarden →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── 1. TIJDVAKKEN ── */}
      <div id="tijdvakken" className="hp-section" style={{ background: "var(--off)" }}>
        <div className="hp-si">
          <div className="hp-slbl">PLANNING 2026</div>
          <h2 className="hp-stitle">Wanneer kunt u aanvragen?</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 760, marginTop: 28 }}>
            {tijdvakken2026.map((tv) => {
              const status = getTijdvakStatus(tv);
              const isGesloten = status === "Gesloten";
              const isOpen = status === "Open";
              const borderColor = isGesloten ? "#e8edf3" : isOpen ? "#a8d8bc" : "var(--blue)";
              const bg = isGesloten ? "#f7f9fc" : isOpen ? "#f0fdf4" : "#eff6ff";

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
                    className={`hp-tl-badge ${isOpen ? "open" : isGesloten ? "closed" : ""}`}
                    style={{
                      fontSize: 13,
                      padding: "5px 14px",
                      borderRadius: 20,
                      flexShrink: 0,
                      ...((!isOpen && !isGesloten) ? {
                        background: "var(--blue)",
                        color: "#fff",
                        fontWeight: 700,
                      } : {}),
                    }}
                  >
                    {status}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="alert-info" style={{ marginTop: 20, maxWidth: 760 }}>
            💡 <strong>Advies:</strong> Begin minimaal 4 weken vóór de sluiting met de voorbereiding.
            Er is geen voordeel aan vroeg indienen — de loting is aselect. Wat telt: een complete,
            foutloze aanvraag. Van de {LOTING.totaalIngediend.toLocaleString("nl-NL")} aanvragen in
            tijdvak 1 2026 werden {LOTING.afgekeurdVoorLoting} al vóór de loting afgekeurd door vermijdbare fouten.
          </div>
        </div>
      </div>

      {/* ── 2. STAPPENPLAN ── */}
      <div id="stappenplan" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>STAPPENPLAN</div>
          <h2 style={s.h2}>Hoe verloopt de aanvraag?</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 28 }}>
            {STAPPEN.map((stap, i) => (
              <div
                key={stap.nr}
                style={{
                  display: "flex",
                  gap: 24,
                  paddingBottom: i < STAPPEN.length - 1 ? 32 : 0,
                  position: "relative",
                }}
              >
                {/* Tijdlijn lijn */}
                {i < STAPPEN.length - 1 && (
                  <div style={{
                    position: "absolute",
                    left: 19,
                    top: 40,
                    bottom: 0,
                    width: 2,
                    background: "#e8edf3",
                  }} />
                )}

                {/* Nummer */}
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "var(--navy)",
                  color: "#fff",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  zIndex: 1,
                  position: "relative",
                }}>
                  {stap.nr}
                </div>

                {/* Inhoud */}
                <div style={{ paddingTop: 8 }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
                    {stap.titel}
                  </div>

                  {stap.tekst && (
                    <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75, marginBottom: stap.link || stap.docs ? 10 : 0 }}>
                      {stap.tekst}
                    </p>
                  )}

                  {stap.docs && (
                    <ul style={{ margin: "0 0 10px", paddingLeft: 18, fontSize: 14, color: "var(--muted)", lineHeight: 1.8 }}>
                      {stap.docs.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                  )}

                  {stap.tip && (
                    <div style={{
                      background: "#fffbe6",
                      border: "1px solid #fde68a",
                      borderRadius: 8,
                      padding: "10px 14px",
                      fontSize: 13,
                      color: "#78350f",
                      marginBottom: stap.link ? 10 : 0,
                    }}>
                      💡 {stap.tip}
                    </div>
                  )}

                  {stap.link && (
                    <Link
                      href={stap.link.href}
                      style={{ fontSize: 13, fontWeight: 600, color: "var(--blue)", textDecoration: "none" }}
                    >
                      {stap.link.label}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. VEELGEMAAKTE FOUTEN ── */}
      <div id="fouten" style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>LET OP</div>
          <h2 style={s.h2}>
            {LOTING.afgekeurdVoorLoting} aanvragen afgewezen vóór de loting — dit zijn de meest voorkomende fouten
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginTop: 8 }}>
            {FOUTEN.map((fout) => (
              <div
                key={fout.titel}
                style={{
                  background: "var(--white)",
                  border: "1px solid #fca5a5",
                  borderLeft: "4px solid #ef4444",
                  borderRadius: 10,
                  padding: "18px 20px",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: "#7f1d1d", marginBottom: 6 }}>
                  ✕ {fout.titel}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>
                  {fout.tekst}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA-BLOK ── */}
      <div style={{ background: "#e8f4fc", padding: "48px 20px", borderTop: "1px solid #c7d9f5", borderBottom: "1px solid #c7d9f5" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 800, color: "var(--navy)", marginBottom: 10, marginTop: 0 }}>
            Wilt u zeker weten dat uw aanvraag foutloos is?
          </h2>
          <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 24, lineHeight: 1.7, maxWidth: 560, marginInline: "auto" }}>
            Wij begeleiden u van quickscan tot indiening. Reserveer uw aanvraagplaats voor
            €{PRICING.reserveringsfee} excl. btw — succesfee alleen bij toekenning.
          </p>
          <Link href="/quickscan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>
            Doe eerst de gratis quickscan →
          </Link>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 14, marginBottom: 0 }}>
            Gratis quickscan · Reserveringsfee €{PRICING.reserveringsfee} excl. btw · Succesfee
            €{PRICING.succesfee.toLocaleString("nl-NL")} excl. btw — no cure, no pay
          </p>
        </div>
      </div>

      {/* ── 4. FAQ ── */}
      <div id="faq" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>VEELGESTELDE VRAGEN</div>
          <h2 style={s.h2}>FAQ — SLIM-subsidie aanvragen</h2>
          <FAQAccordeon items={FAQ_ITEMS} />
        </div>
      </div>

      {/* ── SLOTSECTIE ── */}
      <div className="hp-cta-section">
        <div className="hp-cta-inner">
          <div className="hp-cta-label">TIJDVAK 2 OPENT 10 AUGUSTUS 2026</div>
          <h2 className="hp-cta-title">Reserveer uw aanvraagplaats</h2>
          <p className="hp-cta-sub">
            Doe eerst de gratis quickscan en weet binnen 2 minuten of uw bedrijf in aanmerking komt.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/quickscan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>
              Doe de gratis quickscan →
            </Link>
          </div>
          <p className="hp-cta-note">
            Gratis quickscan · Reserveringsfee €{PRICING.reserveringsfee} excl. btw · Succesfee
            €{PRICING.succesfee.toLocaleString("nl-NL")} excl. btw — no cure, no pay
          </p>
        </div>
      </div>

      {/* ── BRONVERMELDING ── */}
      <div style={{ background: "var(--navy)", padding: "20px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
          Bronnen: wetten.overheid.nl/BWBR0043015/2025-07-05 · uitvoeringvanbeleidszw.nl · RVO lotingsuitslag tijdvak 1 2026
        </div>
      </div>
    </div>
  );
}
