"use client";

import { useState } from "react";
import Link from "next/link";

const FAQ = [
  {
    v: "Wat gebeurt er met mijn gegevens?",
    a: "Uw gegevens zijn veilig bewaard. Bij een nieuwe poging hoeft u ze niet opnieuw in te voeren.",
  },
  {
    v: "Kan ik later alsnog reserveren?",
    a: "Ja, tijdvak 2 opent op 10 augustus 2026. U kunt tot 7 september 2026 reserveren.",
  },
  {
    v: "Heeft u een vraag over de betaling?",
    a: "Neem contact op via info@slimsubsidieadvies.nl of bel ons. Wij helpen u graag.",
  },
];

export default function GeannuleerdPage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="app">
      <header className="hdr">
        <div className="hdr-inner">
          <Link href="/" className="logo" style={{ textDecoration: "none" }}>
            <span className="logo-slim">SLIM</span>
            <span className="logo-sub">SUBSIDIE</span>
            <span className="logo-adv">ADVIES</span>
          </Link>
          <p className="hdr-title">Komt uw bedrijf in aanmerking voor <span>SLIM-subsidie</span>?</p>
          <p className="hdr-sub">Gratis quickscan · Bedrijfsprofiel · Betaling · Bevestiging</p>
          <div className="prog-bar"><div className="prog-fill" style={{ width: "75%" }} /></div>
        </div>
        <div className="steps-bar">
          {["Quickscan", "Resultaat", "Profiel", "Betaling", "Bevestiging"].map((l, i) => (
            <div key={i} className={`step-tab ${i < 3 ? "done" : i === 3 ? "active" : ""}`}>{l}</div>
          ))}
        </div>
      </header>

      <main className="main">
        <div className="phase-lbl"><span className="phase-dot" style={{ background: "var(--muted)" }} />Betaling geannuleerd</div>

        <div className="card">
          <div style={{
            background: "#f7f9fc",
            border: "1px solid #e0e8f0",
            borderRadius: "10px 10px 0 0",
            padding: "28px 28px 24px",
            margin: "-24px -24px 24px",
            textAlign: "center",
          }}>
            <span style={{ fontSize: 48, display: "block", marginBottom: 12 }}>↩</span>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1.4px",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 10,
            }}>
              BETALING GEANNULEERD
            </div>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(22px, 4vw, 28px)",
              fontWeight: 800,
              color: "var(--navy)",
              margin: "0 0 10px",
            }}>
              Uw betaling is niet voltooid
            </h1>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, margin: 0, maxWidth: 480, marginInline: "auto" }}>
              Geen zorgen — uw gegevens zijn bewaard. U kunt het opnieuw proberen of contact met ons opnemen als u vragen heeft.
            </p>
          </div>

          <div className="btn-row" style={{ justifyContent: "center" }}>
            <Link href="/reserveren" className="btn-primary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
              Opnieuw proberen →
            </Link>
            <a href="mailto:info@slimsubsidieadvies.nl" className="btn-ghost" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, padding: "11px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}>
              Neem contact op
            </a>
          </div>
        </div>

        <div className="next-steps">
          <div className="next-steps-title" style={{ marginBottom: 14 }}>Veelgestelde vragen</div>
          {FAQ.map((item, i) => (
            <div key={i} className="hp-faq-item" style={{ marginBottom: 8 }} onClick={() => setOpen(open === i ? null : i)}>
              <div className="hp-faq-q">
                {item.v}
                <span className="hp-faq-arr">{open === i ? "×" : "+"}</span>
              </div>
              {open === i && (
                <div className="hp-faq-a" style={{ maxHeight: "none", padding: "0 22px 16px" }}>
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
