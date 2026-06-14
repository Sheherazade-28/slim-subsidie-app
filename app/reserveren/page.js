import Navigation from "@/components/layout/Navigation";
import Link from "next/link";
import { PRICING, SUBSIDIE, TIJDVAKKEN_2026, BEDRIJFSINFO, STATE_OF_SLIM } from "@/data/slim-content";
import ReserverenForm from "./ReserverenForm";

export const metadata = {
  title: "Reserveer uw SLIM-subsidie aanvraagplaats | €199",
  description:
    "Reserveer uw aanvraagplaats voor tijdvak 2 2026. Beperkt aantal plaatsen beschikbaar. Inclusief intakegesprek, volledige begeleiding en garantie: wij blijven indienen tot inloting. Succesfee €2.500 bij toekenning.",
  alternates: { canonical: "https://www.slimsubsidieadvies.nl/reserveren" },
};

const INCLUSIEF = [
  {
    icon: "✓",
    titel: "Gereserveerde aanvraagcapaciteit",
    tekst: "Wij reserveren capaciteit specifiek voor uw aanvraag in het komende tijdvak.",
  },
  {
    icon: "✓",
    titel: "Persoonlijk intakegesprek",
    tekst: "We bespreken uw situatie, activiteit en projectidee en beoordelen de slaagkansen.",
  },
  {
    icon: "✓",
    titel: "Beoordeling van uw projectidee",
    tekst: "We toetsen uw idee aan de RVO-criteria voordat we de aanvraag opstellen.",
  },
  {
    icon: "✓",
    titel: "Volledige aanvraagvoorbereiding",
    tekst: "Activiteitenplan, begroting en alle benodigde documenten — wij stellen alles op.",
  },
  {
    icon: "✓",
    titel: "Begeleiding tijdens het subsidieproces",
    tekst: "Van indiening tot toekenning. Bij vragen van RVO staan wij u bij.",
  },
];

const FAQ_ITEMS = (tv2CloseLabel) => [
  {
    v: "Wat gebeurt er na betaling?",
    a: "U ontvangt direct een bevestigingsmail en wordt gebeld voor het intakegesprek binnen 5 werkdagen.",
  },
  {
    v: "Kan ik de reserveringsfee terugkrijgen?",
    a: "De reserveringsfee wordt verrekend bij toekenning van de subsidie.",
  },
  {
    v: "Wat als ik niet word ingeloot?",
    a: "Wij dienen kosteloos opnieuw in het volgende tijdvak. Dit herhalen wij totdat u ingeloot wordt.",
  },
  {
    v: "Wanneer sluit tijdvak 2?",
    a: `Tijdvak 2 sluit op ${tv2CloseLabel}. Begin minimaal 4 weken voor sluiting.`,
  },
  {
    v: "Is mijn betaling veilig?",
    a: "Ja, betaling verloopt via Mollie. Wij slaan geen betaalgegevens op.",
  },
];

export default function ReserverenPage() {
  const tv2 = TIJDVAKKEN_2026.find((t) => t.label === "Tijdvak 2 2026");
  const fmt = (d, metTijd = false) => {
    const datum = d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
    if (!metTijd) return datum;
    const tijd = d.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
    return `${datum} om ${tijd} uur`;
  };

  const tv2OpenLabel = fmt(tv2.open, true);
  const tv2CloseLabel = fmt(tv2.close, true);

  const totaalFee = PRICING.reserveringsfee + PRICING.succesfee;
  const voorbeeldProjectkosten = 20000;
  const voorbeeldSubsidie = Math.round(voorbeeldProjectkosten * SUBSIDIE.percentage / 100);
  const voorbeeldNetto = voorbeeldSubsidie - totaalFee;

  const faq = FAQ_ITEMS(tv2CloseLabel);

  return (
    <div>
      <Navigation />

      {/* ── HERO ── */}
      <div className="hp-section" style={{ background: "var(--navy)", padding: "56px 20px 48px" }}>
        <div className="hp-si" style={{ textAlign: "center" }}>
          <div className="hp-slbl" style={{ color: "var(--blue-light)" }}>Tijdvak 2 2026</div>
          <h1 className="hp-stitle" style={{ color: "#fff" }}>
            Reserveer uw aanvraagplaats<br />voor tijdvak 2 2026
          </h1>
          <p className="hp-ssub" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 580, margin: "0 auto" }}>
            Wij werken met een beperkt aantal aanvraagplaatsen per subsidieronde om kwaliteit te garanderen.
            Tijdvak 2 opent {tv2OpenLabel}.
          </p>
        </div>
      </div>

      {/* ── URGENTIE ── */}
      <div style={{ background: "#fef3c7", borderTop: "3px solid #f59e0b", padding: "18px 20px" }}>
        <div className="hp-si" style={{ textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#92400e" }}>
            ⏰ Tijdvak 2 sluit op {tv2CloseLabel}. Begin minimaal 4 weken van tevoren met de voorbereiding.
          </p>
        </div>
      </div>

      {/* ── WAT KRIJGT U ── */}
      <div className="hp-section" style={{ background: "var(--white)" }}>
        <div className="hp-si">
          <div className="hp-slbl">Inbegrepen</div>
          <h2 className="hp-stitle">Wat krijgt u voor €{PRICING.reserveringsfee} reserveringsfee?</h2>
          <div style={{ display: "grid", gap: 16, marginTop: 32 }}>
            {INCLUSIEF.map((item) => (
              <div
                key={item.titel}
                style={{
                  display: "flex", gap: 16, alignItems: "flex-start",
                  background: "var(--blue-pale)", border: "1px solid var(--blue-mid)",
                  borderRadius: 10, padding: "18px 20px",
                }}
              >
                <span style={{
                  flexShrink: 0, width: 28, height: 28, background: "var(--blue)",
                  color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", fontWeight: 800, fontSize: 14,
                }}>✓</span>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--navy)", marginBottom: 3 }}>{item.titel}</div>
                  <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>{item.tekst}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── GARANTIE ── */}
      <div className="hp-section" style={{ background: "var(--navy)" }}>
        <div className="hp-si" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔄</div>
          <h2 className="hp-stitle" style={{ color: "#fff" }}>
            Wij blijven kosteloos opnieuw indienen tot inloting
          </h2>
          <p className="hp-ssub" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 560, margin: "0 auto" }}>
            Wordt uw aanvraag niet ingeloot, dan actualiseren wij alle documenten en dienen opnieuw in het volgende tijdvak.
            Geen extra kosten. Tot u ingeloot wordt.
          </p>
        </div>
      </div>

      {/* ── PRIJSOVERZICHT ── */}
      <div className="hp-section" style={{ background: "#f8fafc" }}>
        <div className="hp-si">
          <div className="hp-slbl">Transparante prijs</div>
          <h2 className="hp-stitle">Prijsoverzicht</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 32 }}>
            {/* Kosten */}
            <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: "24px" }}>
              <div style={{ fontWeight: 700, color: "var(--navy)", marginBottom: 16, fontSize: 16 }}>Kosten</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ color: "var(--muted)", fontSize: 15 }}>Reserveringsfee</span>
                <span style={{ fontWeight: 700, color: "var(--navy)" }}>€{PRICING.reserveringsfee} excl. btw</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ color: "var(--muted)", fontSize: 15 }}>Succesfee bij toekenning</span>
                <span style={{ fontWeight: 700, color: "var(--navy)" }}>€{PRICING.succesfee.toLocaleString("nl-NL")} excl. btw</span>
              </div>
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 10, marginTop: 10, fontSize: 13, color: "var(--muted)" }}>
                Geen toekenning = geen succesfee.
              </div>
            </div>
            {/* Rekenvoorbeeld */}
            <div style={{ background: "var(--navy)", borderRadius: 12, padding: "24px", color: "#fff" }}>
              <div style={{ fontWeight: 700, color: "var(--blue-light)", marginBottom: 16, fontSize: 16 }}>Rekenvoorbeeld</div>
              {[
                ["Projectkosten", `€${voorbeeldProjectkosten.toLocaleString("nl-NL")}`],
                [`Subsidie (${SUBSIDIE.percentage}%)`, `€${voorbeeldSubsidie.toLocaleString("nl-NL")}`],
                [`Kosten SLIM Subsidie Advies`, `€${PRICING.reserveringsfee} + €${PRICING.succesfee.toLocaleString("nl-NL")} = €${totaalFee.toLocaleString("nl-NL")}`],
              ].map(([label, waarde]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 14 }}>
                  <span style={{ color: "rgba(255,255,255,0.65)" }}>{label}</span>
                  <span style={{ fontWeight: 600 }}>{waarde}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 12, marginTop: 4, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, color: "var(--blue-light)" }}>Netto opbrengst</span>
                <span style={{ fontWeight: 800, fontSize: 18, color: "var(--blue-light)" }}>€{voorbeeldNetto.toLocaleString("nl-NL")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BETAALFORMULIER ── */}
      <div className="hp-section" style={{ background: "var(--white)" }}>
        <div className="hp-si" style={{ maxWidth: 560, margin: "0 auto" }}>
          <ReserverenForm prijs={PRICING.reserveringsfee} />

          {/* Vertrouwenselementen */}
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: "10px 24px", justifyContent: "center" }}>
            {[
              `KvK: ${BEDRIJFSINFO.kvk}`,
              `BTW: ${BEDRIJFSINFO.btw}`,
              `Gebaseerd op analyse van ${STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} gehonoreerde projecten`,
              "Betaling via Mollie (veilig en vertrouwd)",
            ].map((item) => (
              <span key={item} style={{ fontSize: 12, color: "var(--muted)" }}>· {item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="hp-section" style={{ background: "#f8fafc" }}>
        <div className="hp-si">
          <div className="hp-slbl">Veelgestelde vragen</div>
          <h2 className="hp-stitle">FAQ</h2>
          <div style={{ display: "grid", gap: 12, marginTop: 32 }}>
            {faq.map((item) => (
              <div
                key={item.v}
                style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: "18px 20px" }}
              >
                <div style={{ fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{item.v}</div>
                <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>
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
