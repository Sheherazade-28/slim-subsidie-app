"use client";

import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Link from "next/link";
import { FAQ } from "@/data/slim-content";

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      <Navigation />

      <div className="hp-section" style={{ background: "var(--navy)", padding: "56px 20px 40px" }}>
        <div className="hp-si">
          <div className="hp-slbl" style={{ color: "var(--blue-light)" }}>Veelgestelde vragen</div>
          <h1 className="hp-stitle" style={{ color: "#fff" }}>Vragen over SLIM-subsidie</h1>
          <p className="hp-ssub" style={{ color: "rgba(255,255,255,0.6)" }}>
            Antwoorden op de meest gestelde vragen over de SLIM-subsidie, onze aanpak en de aanvraagprocedure.
          </p>
        </div>
      </div>

      <div className="hp-section" style={{ background: "var(--white)" }}>
        <div className="hp-si">
          <div className="hp-faq-list">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className={`hp-faq-item ${openFaq === i ? "open" : ""}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="hp-faq-q">{item.q}<span className="hp-faq-arr">+</span></div>
                <div className="hp-faq-a"><p>{item.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hp-cta-section">
        <div className="hp-si">
          <h2 className="hp-cta-title">Nog vragen? Of direct<br />starten met de <span>quickscan</span>?</h2>
          <p className="hp-cta-sub">Neem contact op via <a href="mailto:info@slimsubsidieadvies.nl" style={{ color: "var(--blue-light)" }}>info@slimsubsidieadvies.nl</a> of doe direct de gratis quickscan.</p>
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
