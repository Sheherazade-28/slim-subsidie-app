import Link from "next/link";

export const metadata = {
  title: "Bedankt voor uw download",
  description: "U ontvangt het whitepaper State of SLIM 2026 direct. Download hieronder.",
  robots: { index: false },
};

export default function BedanktPage() {
  return (
    <div className="bt-page">
      <div className="privacy-hdr">
        <div className="privacy-hdr-inner">
          <Link href="/" className="logo" style={{ textDecoration: "none" }}>
            <span className="logo-slim">SLIM</span>
            <span className="logo-sub">SUBSIDIE</span>
            <span className="logo-adv">ADVIES</span>
          </Link>
        </div>
      </div>
      <div className="bt-body">
        <span className="bt-icon">📄</span>
        <h1 className="bt-h1">Goed besluit.</h1>
        <p className="bt-sub">U bent een van de eersten met inzicht in 5.891 gehonoreerde SLIM-projecten.</p>
        <div className="bt-actions">
          <a className="bt-download" href="/State_of_SLIM_2026.pdf" download="State_of_SLIM_2026.pdf">
            ⬇ Download State of SLIM 2026.pdf
          </a>
          <Link className="bt-cta" href="/quickscan">
            Doe ook de gratis quickscan →
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
            <span>KvK: 83970614 &nbsp;·&nbsp; BTW: NL863053907B01 &nbsp;·&nbsp; <a href="mailto:info@slimsubsidieadvies.nl" style={{ color: "var(--blue-light)", textDecoration: "none" }}>info@slimsubsidieadvies.nl</a></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
