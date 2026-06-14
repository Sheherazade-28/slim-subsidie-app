import Link from "next/link";

export const metadata = {
  title: "SLIM-subsidie Resultaten — Wat Hebben MKB-bedrijven Bereikt? | SLIM Subsidie Advies",
  description: "Bekijk de resultaten van gehonoreerde SLIM-subsidieprojecten. Meer dan 6.200 MKB-bedrijven gingen u voor. Ontdek wat voor uw bedrijf mogelijk is.",
};

export default function SlimSubsidieResultatenPage() {
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
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, color: "var(--navy)", marginBottom: "1rem" }}>SLIM-subsidie resultaten</h1>
        <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
          Meer dan 6.200 MKB-bedrijven ontvingen al SLIM-subsidie voor hun leer- en ontwikkeltrajecten. Laat u inspireren door gehonoreerde projecten in uw sector en regio.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "2rem" }}>
          <Link href="/projecten" className="btn btn-primary">Bekijk de projectendatabase →</Link>
          <Link href="/lotingsuitslagen" className="btn btn-ghost">Lotingsuitslagen →</Link>
        </div>
        <div style={{ background: "var(--blue-pale)", border: "1px solid var(--blue-mid)", borderRadius: 12, padding: "24px" }}>
          <p style={{ margin: 0, color: "var(--navy)", fontWeight: 600 }}>Pagina in aanbouw — binnenkort meer analyses en succesverhalen van gehonoreerde SLIM-projecten.</p>
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
            <span>KvK: 83970614 &nbsp;·&nbsp; BTW: NL863053907B01</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
