import Link from "next/link";

export const metadata = {
  title: "SLIM-subsidie 2026 — Tijdvakken, Bedragen & Loting | SLIM Subsidie Advies",
  description: "Alles over de SLIM-subsidie in 2026. Tijdvak 2 opent 10 augustus t/m 7 september 2026. Subsidiebedrag tot €24.999. Actuele lotingscijfers en kansen.",
};

export default function SlimSubsidie2026Page() {
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
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, color: "var(--navy)", marginBottom: "1rem" }}>SLIM-subsidie 2026</h1>
        <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
          In 2026 zijn er twee aanvraagtijdvakken voor de SLIM-subsidie. Tijdvak 1 liep van 7 april t/m 4 mei 2026. Tijdvak 2 opent op 10 augustus en sluit op 7 september 2026.
        </p>
        <div style={{ background: "var(--green-pale)", border: "1px solid var(--green)", borderRadius: 12, padding: "24px", marginBottom: "2rem" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--green)", marginBottom: 8 }}>Tijdvak 2 2026 — Aankomend tijdvak</div>
          <p style={{ margin: 0, color: "var(--navy)" }}><strong>10 augustus – 7 september 2026</strong> · Subsidieplafond: € 11 miljoen · Begin tijdig met de voorbereiding.</p>
        </div>
        <div style={{ background: "var(--blue-pale)", border: "1px solid var(--blue-mid)", borderRadius: 12, padding: "24px", marginBottom: "2rem" }}>
          <p style={{ margin: 0, color: "var(--navy)", fontWeight: 600 }}>Pagina in aanbouw — binnenkort complete tijdvakinformatie voor 2026 inclusief lotingscijfers en tips.</p>
        </div>
        <Link href="/scan" className="btn btn-primary">Doe gratis de quickscan →</Link>
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
