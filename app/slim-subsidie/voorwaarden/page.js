import Link from "next/link";

export const metadata = {
  title: "SLIM-subsidie Voorwaarden 2026 — Kom Jij In Aanmerking? | SLIM Subsidie Advies",
  description: "Wat zijn de voorwaarden voor de SLIM-subsidie? MKB-criteria, minimale investering, toegestane activiteiten en uitsluitingsgronden. Check of jouw bedrijf in aanmerking komt.",
};

export default function SlimSubsidieVoorwaardenPage() {
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
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, color: "var(--navy)", marginBottom: "1rem" }}>SLIM-subsidie voorwaarden</h1>
        <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
          Om in aanmerking te komen voor de SLIM-subsidie moet uw bedrijf aan een aantal voorwaarden voldoen. De minimale investering is € 8.334 (excl. BTW) en uw bedrijf moet als MKB-onderneming in Nederland gevestigd zijn.
        </p>
        <div style={{ background: "var(--blue-pale)", border: "1px solid var(--blue-mid)", borderRadius: 12, padding: "24px", marginBottom: "2rem" }}>
          <p style={{ margin: 0, color: "var(--navy)", fontWeight: 600 }}>Pagina in aanbouw — binnenkort een volledig overzicht van alle SLIM-subsidie voorwaarden.</p>
        </div>
        <Link href="/scan" className="btn btn-primary">Check gratis of u in aanmerking komt →</Link>
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
