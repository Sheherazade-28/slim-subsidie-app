import Link from "next/link";

export const metadata = {
  title: "Afspraak Reserveren — SLIM Subsidie Advies",
  description: "Plan een gratis kennismakingsgesprek met een SLIM-subsidieadviseur. Wij beoordelen uw kansen en begeleiden uw aanvraag van A tot Z.",
  robots: { index: true },
};

export default function ReserverenPage() {
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
        <Link href="/" className="btn btn-ghost" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>← Terug naar home</Link>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, color: "var(--navy)", marginBottom: "1rem" }}>Afspraak reserveren</h1>
        <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
          Plan een gratis kennismakingsgesprek met een van onze SLIM-subsidieadviseurs. Wij bespreken uw situatie en beoordelen uw subsidiekansen.
        </p>
        <div style={{ background: "var(--blue-pale)", border: "1px solid var(--blue-mid)", borderRadius: 12, padding: "24px", marginBottom: "2rem" }}>
          <p style={{ margin: 0, color: "var(--navy)", fontWeight: 600 }}>Agendatool wordt binnenkort hier geïntegreerd. Neem voor nu contact op via onderstaand formulier of e-mail.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: "24px", marginBottom: "2rem" }}>
          <p style={{ margin: "0 0 12px", color: "var(--navy)", fontWeight: 600 }}>Direct contact</p>
          <p style={{ margin: "0 0 8px", color: "var(--muted)" }}>📧 <a href="mailto:info@slimsubsidieadvies.nl" style={{ color: "var(--blue)" }}>info@slimsubsidieadvies.nl</a></p>
          <p style={{ margin: 0, color: "var(--muted)" }}>📞 <a href="tel:0308899045" style={{ color: "var(--blue)" }}>(030) 88 99 045</a></p>
        </div>
        <Link href="/scan" className="btn btn-primary">Of doe eerst gratis de quickscan →</Link>
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
