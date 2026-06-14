import Link from "next/link";

export const metadata = {
  title: "SLIM-subsidie: Wat Is Het & Wie Komt In Aanmerking? | SLIM Subsidie Advies",
  description: "Alles over de SLIM-subsidie (Stimuleringsregeling Leren en Ontwikkelen in het MKB). Subsidiebedragen, voorwaarden, tijdvakken en aanvraagprocedure bij RVO.",
};

export default function SlimSubsidiePage() {
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
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, color: "var(--navy)", marginBottom: "1rem" }}>Wat is de SLIM-subsidie?</h1>
        <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
          De SLIM-subsidie (Stimuleringsregeling Leren en Ontwikkelen in het MKB) is een subsidieregeling van de Nederlandse overheid voor MKB-bedrijven die willen investeren in de ontwikkeling van hun medewerkers.
        </p>
        <div style={{ background: "var(--blue-pale)", border: "1px solid var(--blue-mid)", borderRadius: 12, padding: "24px", marginBottom: "2rem" }}>
          <p style={{ margin: 0, color: "var(--navy)", fontWeight: 600 }}>Pagina in aanbouw — binnenkort meer informatie over de SLIM-subsidie voorwaarden, bedragen en aanvraagprocedure.</p>
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
            <span>KvK: 83970614 &nbsp;·&nbsp; BTW: NL863053907B01 &nbsp;·&nbsp; <a href="mailto:info@slimsubsidieadvies.nl" style={{ color: "var(--blue-light)", textDecoration: "none" }}>info@slimsubsidieadvies.nl</a></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
