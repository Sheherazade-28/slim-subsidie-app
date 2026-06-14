import Link from "next/link";

export const metadata = {
  title: "SLIM-subsidie Aanvragen 2026 — Stap-voor-Stap | SLIM Subsidie Advies",
  description: "Hoe vraag je SLIM-subsidie aan in 2026? Complete gids voor de aanvraagprocedure bij RVO: tijdvakken, documenten, loting en tips voor een foutloze aanvraag.",
};

export default function SlimSubsidieAanvragenPage() {
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
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, color: "var(--navy)", marginBottom: "1rem" }}>SLIM-subsidie aanvragen in 2026</h1>
        <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
          De SLIM-subsidie aanvragen doe je via het RVO e-portaal tijdens een opengesteld tijdvak. De aanvragen worden door middel van notariële loting geselecteerd voor beoordeling.
        </p>
        <div style={{ background: "var(--blue-pale)", border: "1px solid var(--blue-mid)", borderRadius: 12, padding: "24px", marginBottom: "2rem" }}>
          <p style={{ margin: 0, color: "var(--navy)", fontWeight: 600 }}>Pagina in aanbouw — binnenkort een complete stap-voor-stap aanvraaghandleiding.</p>
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
