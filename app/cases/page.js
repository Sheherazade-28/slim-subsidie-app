import Navigation from "@/components/layout/Navigation";
import Link from "next/link";

export const metadata = {
  title: "Praktijkvoorbeelden SLIM-subsidie — Succesvolle MKB-aanvragen | SLIM Subsidie Advies",
  description: "Drie voorbeelden van succesvolle SLIM-subsidieaanvragen begeleid door SLIM Subsidie Advies. Zorgvervoer, interieurverzorging en AI-ontwikkeling.",
};

export default function CasesPage() {
  return (
    <div>
      <Navigation />

      <div className="hp-loting" style={{ padding: "56px 20px 72px" }}>
        <div className="hp-si">
          <div className="hp-slbl" style={{ color: "var(--blue-light)" }}>Praktijkvoorbeelden</div>
          <h1 className="hp-stitle" style={{ color: "#fff" }}>Wat wij voor ondernemers realiseerden</h1>
          <p className="hp-ssub" style={{ color: "rgba(255,255,255,0.5)" }}>
            Drie voorbeelden van succesvolle SLIM-subsidie aanvragen die wij van begin tot eind begeleid hebben.
          </p>
          <div className="hp-cases-grid">
            <div className="hp-case-card">
              <div className="hp-case-sector">Zorgvervoer</div>
              <div className="hp-case-title">Ingebedde leermethodiek voor taxibedrijf in zorgvervoer</div>
              <div className="hp-case-desc">Kritische operationele kennis structureel borgen bij alle chauffeurs.</div>
              <div className="hp-case-act">Activiteit C — L&amp;O-methode</div>
            </div>
            <div className="hp-case-card">
              <div className="hp-case-sector">Interieurverzorging</div>
              <div className="hp-case-title">Leerwerkplek methodiek voor luxe interieurverzorgingsbedrijf</div>
              <div className="hp-case-desc">Vakkennis van ervaren medewerkers overdragen aan nieuwe collega&apos;s.</div>
              <div className="hp-case-act">Activiteit C — Leerwerkplek</div>
            </div>
            <div className="hp-case-card">
              <div className="hp-case-sector">AI &amp; Robotisering</div>
              <div className="hp-case-title">Leermethodiek voor AI-app- en robotiseringsontwikkelaar</div>
              <div className="hp-case-desc">Snel veranderende AI-kennis continu beschikbaar houden voor het team.</div>
              <div className="hp-case-act">Activiteit A + C — Scan &amp; methode</div>
            </div>
          </div>
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link href="/projecten" className="hp-btn-s">Bekijk alle 6.208 gehonoreerde projecten →</Link>
          </div>
        </div>
      </div>

      <div className="hp-cta-section">
        <div className="hp-si">
          <h2 className="hp-cta-title">Wil jij ook een succesvol<br /><span>SLIM-project</span>?</h2>
          <p className="hp-cta-sub">Doe de gratis quickscan en weet binnen 2 minuten of uw bedrijf in aanmerking komt.</p>
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
