"use client";

import Link from "next/link";
import { LOTING_TIJDVAKKEN } from "@/data/slim-content";

export default function LotingsuitslagenPage() {
  const allTv = LOTING_TIJDVAKKEN.flatMap((j) => j.tijdvakken);
  const gemAanvragen = Math.round(allTv.reduce((s, t) => s + t.totaal, 0) / allTv.length);

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh", padding: "24px 20px" }}>
      <div className="lp-page">
        <Link href="/" className="btn btn-ghost" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>← Terug naar home</Link>
        <div className="lp-hero">
          <p className="lp-overline">Overzicht lotingsuitslagen</p>
          <h1 className="lp-h1">SLIM-subsidie lotingsuitslagen 2024 – 2026</h1>
          <p className="lp-intro">Per tijdvak vind je het subsidieplafond, het totale aantal aanvragen dat heeft meegeloot, hoeveel aanvragen gegarandeerd worden beoordeeld, en wat dat betekent voor je kans.</p>
        </div>
        <div className="lp-stats">
          {[
            { label: "Tijdvakken gedocumenteerd", value: "5", sub: "2024 t/m tv1 2026" },
            { label: "Gem. aanvragen per tijdvak", value: gemAanvragen.toLocaleString("nl-NL"), sub: "mkb individueel" },
            { label: "Gem. directe kans", value: "~20%", sub: "gegarandeerde beoordeling" },
            { label: "Regeling loopt tot", value: "2029", sub: "verlengd dec 2024" },
          ].map((s) => (
            <div key={s.label} className="lp-stat">
              <div className="lp-stat-label">{s.label}</div>
              <div className="lp-stat-value">{s.value}</div>
              <div className="lp-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
        <div className="lp-infobox"><span style={{ flexShrink: 0 }}>ℹ️</span><span>Elk tijdvak was zwaar overvraagd. Gemiddeld deden ruim 3.000 bedrijven mee, terwijl slechts 15–25% direct wordt beoordeeld.</span></div>

        {LOTING_TIJDVAKKEN.map((jaar, ji) => (
          <div key={jaar.jaar} style={{ marginBottom: "2rem" }}>
            <h2 className="lp-section-title">{jaar.jaar}</h2>
            {jaar.tijdvakken.map((tv) => {
              const pct = ((tv.gegarandeerd / tv.totaal) * 100).toFixed(1);
              const barColor = parseFloat(pct) >= 22 ? "var(--green)" : parseFloat(pct) >= 18 ? "var(--orange)" : "var(--red)";
              const rest = tv.totaal - tv.gegarandeerd;
              return (
                <div key={tv.titel} className="lp-card">
                  <div className="lp-card-top">
                    <div className="lp-card-left">
                      <div className="lp-card-header">
                        <span className="lp-card-title">{tv.titel}</span>
                        <span className="lp-badge-green">Uitslag bekend</span>
                        <span className="lp-badge-blue">mkb individueel</span>
                      </div>
                      <div className="lp-card-meta"><span style={{ marginRight: "1rem" }}>📅 {tv.periode}</span><span>⚖️ Loting: {tv.lotingsdatum}</span></div>
                      {tv.notitie && <p className="lp-card-notitie">{tv.notitie}</p>}
                    </div>
                    <div className="lp-card-right">
                      <div className="lp-budget">{tv.budget}</div>
                      <div className="lp-budget-label">subsidieplafond</div>
                      <div className="lp-guaranteed">{tv.gegarandeerd.toLocaleString("nl-NL")} gegarandeerd</div>
                    </div>
                  </div>
                  <div className="lp-kans-wrap">
                    <div className="lp-kans-labels">
                      <span className="lp-kans-title">Lotingskansen</span>
                      <span className="lp-kans-numbers"><strong style={{ color: "var(--navy)" }}>{tv.gegarandeerd.toLocaleString("nl-NL")}</strong> van <strong style={{ color: "var(--navy)" }}>{tv.totaal.toLocaleString("nl-NL")}</strong> · <strong style={{ color: "var(--navy)" }}>{pct}%</strong> directe kans</span>
                    </div>
                    <div className="lp-bar-track"><div className="lp-bar-fill" style={{ width: `${pct}%`, background: barColor }} /></div>
                    <div className="lp-kans-detail">
                      <span className="lp-kans-item"><span className="lp-dot" style={{ background: "var(--green)" }} />{tv.gegarandeerd.toLocaleString("nl-NL")} direct beoordeeld</span>
                      <span className="lp-kans-item"><span className="lp-dot" style={{ background: "var(--border)" }} />{rest.toLocaleString("nl-NL")} afhankelijk van restbudget</span>
                    </div>
                    <p className="lp-source">Bron: <a href={tv.url} target="_blank" rel="noopener noreferrer">uitvoeringvanbeleidszw.nl ↗</a></p>
                  </div>
                </div>
              );
            })}
            {jaar.komend.map((k) => (
              <div key={k.titel} className="lp-komend">
                <span style={{ fontSize: 16, flexShrink: 0, color: "var(--muted)" }}>🕐</span>
                <p className="lp-komend-text"><strong style={{ color: "var(--navy)" }}>{k.titel}</strong> · {k.info}</p>
              </div>
            ))}
            {ji < LOTING_TIJDVAKKEN.length - 1 && <hr className="lp-divider" />}
          </div>
        ))}

        <div className="lp-cta">
          <div>
            <h3 className="lp-cta-h">Wil je weten of jouw aanvraag kans maakt?</h3>
            <p className="lp-cta-p">Doe de gratis quickscan — binnen 2 minuten weet je of jouw bedrijf in aanmerking komt.</p>
          </div>
          <Link href="/scan" className="btn btn-primary">Doe de quickscan →</Link>
        </div>
      </div>
    </div>
  );
}
