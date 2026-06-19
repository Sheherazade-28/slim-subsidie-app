import Link from "next/link";

export const metadata = {
  title: "Benchmark aangevraagd | SLIM Subsidie Advies",
  robots: { index: false },
};

export default function SectorbenchmarkBedanktPage() {
  return (
    <div className="wp-page">
      <div className="wp-hdr">
        <div className="wp-hdr-inner">
          <Link href="/" className="logo" style={{ textDecoration: "none", marginBottom: 20 }}>
            <span className="logo-slim">SLIM</span>
            <span className="logo-sub">SUBSIDIE</span>
            <span className="logo-adv">ADVIES</span>
          </Link>
        </div>
      </div>
      <div className="wp-body" style={{ textAlign: "center", paddingTop: 60 }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>✓</div>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(26px,5vw,38px)", fontWeight: 800, color: "var(--navy)", marginBottom: 16 }}>
          Uw benchmark is aangevraagd
        </h1>
        <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 36px" }}>
          U ontvangt uw persoonlijke SLIM-sectorbenchmark binnen 1 werkdag op uw e-mailadres. Heeft u vragen?{" "}
          Mail naar{" "}
          <a href="mailto:info@slimsubsidieadvies.nl" style={{ color: "var(--blue)" }}>
            info@slimsubsidieadvies.nl
          </a>
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/whitepaper" className="hp-btn-p">
            Lees alvast de volledige whitepaper →
          </Link>
          <Link href="/quickscan" className="hp-btn-s">
            Doe de gratis quickscan →
          </Link>
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
