import Navigation from "@/components/layout/Navigation";
import Link from "next/link";

export const metadata = {
  title: "Ons Team — SLIM-subsidieadviseurs | SLIM Subsidie Advies",
  description: "Drie gespecialiseerde SLIM-subsidieadviseurs met diepgaande kennis van de SLIM-regeling en het beoordelingsproces van RVO. Maak kennis met het team.",
};

export default function TeamPage() {
  return (
    <div>
      <Navigation />

      <div className="hp-section" style={{ background: "var(--navy)", padding: "56px 20px 40px" }}>
        <div className="hp-si">
          <div className="hp-slbl" style={{ color: "var(--blue-light)" }}>Ons team</div>
          <h1 className="hp-stitle" style={{ color: "#fff" }}>Uw SLIM-subsidieadviseurs</h1>
          <p className="hp-ssub" style={{ color: "rgba(255,255,255,0.6)" }}>
            Drie specialisten met diepgaande kennis van de SLIM-regeling en het beoordelingsproces van RVO.
          </p>
        </div>
      </div>

      <div className="hp-section" style={{ background: "var(--off)" }}>
        <div className="hp-si">
          <div className="hp-team-grid">
            <div className="hp-team-card">
              <div className="hp-avatar hp-av-d">DS</div>
              <div className="hp-t-name">Daniel Sharif</div>
              <div className="hp-t-role">SLIM Subsidieadviseur</div>
              <div className="hp-t-bio">Specialist in het begeleiden van MKB-aanvragen van quickscan tot succesvolle toekenning.</div>
            </div>
            <div className="hp-team-card">
              <div className="hp-avatar hp-av-e">EV</div>
              <div className="hp-t-name">Esther Valerius</div>
              <div className="hp-t-role">SLIM Subsidieadviseur</div>
              <div className="hp-t-bio">Expert in compliance en documentenverzameling. Zorgt dat elke aanvraag volledig en correct is vóór indiening.</div>
            </div>
            <div className="hp-team-card">
              <div className="hp-avatar hp-av-r">RF</div>
              <div className="hp-t-name">Rudolf Favier</div>
              <div className="hp-t-role">SLIM Subsidieadviseur</div>
              <div className="hp-t-bio">Gespecialiseerd in het screeningstraject na inloting. Begeleidt de inhoudelijke beoordeling bij RVO.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hp-cta-section">
        <div className="hp-si">
          <h2 className="hp-cta-title">Zin om samen te werken?<br />Start met de <span>gratis quickscan</span></h2>
          <p className="hp-cta-sub">Binnen 2 minuten weet u of uw bedrijf in aanmerking komt voor SLIM-subsidie.</p>
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
