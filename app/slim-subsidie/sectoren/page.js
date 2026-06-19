import Link from "next/link";

export const metadata = {
  title: "SLIM-subsidie Per Sector — Welke Branches Komen In Aanmerking? | SLIM Subsidie Advies",
  description: "SLIM-subsidie is beschikbaar voor bijna alle MKB-sectoren. Bekijk per sector de subsidiemogelijkheden: horeca, zorg, bouw, retail, transport en meer.",
};

export default function SlimSubsidieSectorenPage() {
  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <div className="privacy-hdr">
        <div className="privacy-hdr-inner">
          <Link href="/" className="logo" style={{ textDecoration: "none" }}>
            <span className="logo-slim">SLIM</span>
            <span className="logo-sub">SUBSIDIE</span>
            <span className="logo-adv">ADVIES</span>
          </Link>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 20px 64px" }}>
        <Link href="/slim-subsidie" className="btn btn-ghost" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>← Terug</Link>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, color: "var(--navy)", marginBottom: "1rem" }}>SLIM-subsidie per sector</h1>
        <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
          De SLIM-subsidie staat open voor vrijwel alle MKB-sectoren in Nederland. Of u nu actief bent in de horeca, zorg, bouw, transport of zakelijke dienstverlening — de kans is groot dat uw bedrijf in aanmerking komt.
        </p>
        <div style={{ background: "var(--blue-pale)", border: "1px solid var(--blue-mid)", borderRadius: 12, padding: "24px", marginBottom: "2rem" }}>
          <p style={{ margin: 0, color: "var(--navy)", fontWeight: 600 }}>Pagina in aanbouw — binnenkort een sectoroverzicht met concrete voorbeelden en subsidiebedragen.</p>
        </div>
        <Link href="/quickscan" className="btn btn-primary">Doe gratis de quickscan →</Link>
      </div>
      <footer className="ftr">
        <div className="ftr-inner">
          <div className="ftr-links">
            <Link href="/privacy">Privacyverklaring</Link>
            <Link href="/av">Algemene Voorwaarden</Link>
          </div>
          <div className="ftr-company">
            <span><strong>SLIM Subsidie Advies</strong> — onderdeel van Inscentia BV</span>
            <span>KvK: 83970614 &nbsp;·&nbsp; BTW: NL863053907B01</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
