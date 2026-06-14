import Navigation from "@/components/layout/Navigation";
import Link from "next/link";

export const metadata = {
  title: "Waarom SLIM Subsidie Advies? No Cure, No Pay | SLIM Subsidie Advies",
  description: "100% SLIM-specialist. Herindienen tot inloting. No cure, no pay succesfee van €2.500. Ontdek waarom MKB-ondernemers kiezen voor SLIM Subsidie Advies.",
};

export default function WaaromWijPage() {
  return (
    <div>
      <Navigation />

      <div className="hp-section" style={{ background: "var(--navy)", padding: "56px 20px 40px" }}>
        <div className="hp-si">
          <div className="hp-slbl" style={{ color: "var(--blue-light)" }}>Onze aanpak</div>
          <h1 className="hp-stitle" style={{ color: "#fff" }}>Waarom via SLIM Subsidie Advies?</h1>
          <p className="hp-ssub" style={{ color: "rgba(255,255,255,0.6)" }}>
            De specialist in SLIM-subsidie aanvragen voor MKB-ondernemers. Van gratis quickscan tot toekenning — én het volledige screeningstraject bij RVO.
          </p>
        </div>
      </div>

      <div className="hp-section" style={{ background: "var(--white)" }}>
        <div className="hp-si">
          <p className="hp-why-intro">Geen ingewikkeld subsidietraject, wel een kansrijke aanvraag.</p>
          <div className="hp-why-grid">
            {[
              ["🔄", "Herindienen tot inloting", "Niet ingeloot? Wij actualiseren ieder tijdvak uw aanvraag en dienen opnieuw in — totdat u ingeloot wordt. Inclusief documentactualisatie, zonder extra kosten."],
              ["🎯", "100% SLIM-specialist", "Wij doen niets anders dan SLIM-subsidie. Diepgaande kennis van de wet- en regelgeving, de valkuilen én de kansen voor uw situatie."],
              ["🛡️", "Succesfee: no cure, no pay", "De reserveringsfee bedraagt €199 excl. btw. De succesfee van € 2.500 (excl. btw) betaalt u uitsluitend bij toekenning — en de reserveringsfee wordt dan terugbetaald."],
              ["✅", "Foutloze indiening", "23 aanvragen vielen vóór de loting af door fouten in tijdvak 1 2026. Wij zorgen voor een correcte aanvraag — zodat u überhaupt meedoet."],
              ["📋", "Van A tot Z begeleiding", "Quickscan, activiteitenplan, begroting, documentenverzameling, indiening én screeningstraject bij RVO. Alles inbegrepen."],
              ["💰", "Scherpste fee-garantie", "Vindt u een subsidieadviseur met een lagere fee? Wij duiken eronder."],
              ["⚡", "Direct starten", "Via onze gratis online quickscan weet u binnen 2 minuten of uw bedrijf in aanmerking komt."],
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

      <div className="hp-cta-section">
        <div className="hp-si">
          <h2 className="hp-cta-title">Overtuigd? Start met de<br /><span>gratis quickscan</span></h2>
          <p className="hp-cta-sub">Binnen 2 minuten weet u of uw bedrijf in aanmerking komt. Geen verplichtingen.</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/scan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>Doe de gratis quickscan →</Link>
          </div>
        </div>
      </div>

      <footer className="ftr">
        <div className="ftr-inner">
          <div className="ftr-links">
            <Link href="/privacy">Privacyverklaring</Link>
            <Link href="/av">Algemene Voorwaarden</Link>
          </div>
          <div className="ftr-company">
            <span><strong>SLIM Subsidie Advies</strong> — onderdeel van Inscentia BV</span>
            <span>KvK: 83970614 &nbsp;·&nbsp; BTW: NL863053907B01 &nbsp;·&nbsp; <a href="mailto:info@slimsubsidieadvies.nl" style={{ color: "var(--blue-light)", textDecoration: "none" }}>info@slimsubsidieadvies.nl</a></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
