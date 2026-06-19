import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import { SUBSIDIE, PRICING, BUDGET_2026, LOTING, TIJDVAKKEN_2026, BEDRIJFSINFO } from "@/data/slim-content";

export const metadata = {
  title: "SLIM-subsidie 2026 — Tijdvakken, budget en wijzigingen",
  description:
    "Alles over de SLIM-subsidie in 2026. Tijdvak 2 opent 10 augustus 2026. Budget €45 miljoen, wijzigingen per 2025 en lotingscijfers tijdvak 1 2026.",
  alternates: {
    canonical: "https://www.slimsubsidieadvies.nl/slim-subsidie-2026",
  },
};

function fmtEur(n) {
  return `€${n.toLocaleString("nl-NL")}`;
}

function fmtDatum(d) {
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

function fmtTijd(d) {
  return d.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
}

function getTijdvakStatus(tv) {
  const now = new Date();
  if (now < tv.open) return "binnenkort";
  if (now >= tv.open && now <= tv.close) return "open";
  return "gesloten";
}

const tijdvakken2026 = TIJDVAKKEN_2026.filter((tv) => tv.open.getFullYear() === 2026 || tv.close.getFullYear() === 2026);

const faqItems = [
  {
    q: "Wanneer opent tijdvak 2 2026?",
    a: "Tijdvak 2 opent op 10 augustus 2026 om 09:00 en sluit op 7 september 2026 om 17:00.",
  },
  {
    q: "Hoeveel budget is er in 2026?",
    a: `€45 miljoen totaal: €25 miljoen voor individueel MKB en €20 miljoen voor samenwerkingsverbanden.`,
  },
  {
    q: "Wat is er veranderd ten opzichte van 2024?",
    a: "De belangrijkste wijzigingen per 2025: subsidiepercentage 60% voor alle MKB (was 80% voor klein-MKB), Activiteit D afgeschaft, ambtshalve vaststelling, beslistermijn verkort van 18 naar 13 weken, vier verplichte RVO-formats.",
  },
  {
    q: "Bestaat de 80%-regeling voor klein-MKB nog?",
    a: "Nee. Per 5 juli 2025 geldt 60% voor alle MKB-ondernemingen. Adviseurs die nog 80% noemen, werken met verouderde informatie.",
  },
  {
    q: "Hoe groot is mijn kans in tijdvak 2 2026?",
    a: `Op basis van tijdvak 1 2026 werd ~${LOTING.kansRuw}% van de aanvragen ingeloot. De exacte kans in tijdvak 2 hangt af van het aantal ingediende aanvragen.`,
  },
  {
    q: "Tot wanneer loopt de SLIM-regeling?",
    a: "De SLIM-regeling is verlengd tot en met 2029.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const s = {
  sectie: { padding: "64px 20px" },
  inner: { maxWidth: 860, margin: "0 auto" },
  slbl: { fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--blue)", marginBottom: 10 },
  h2: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 800, color: "var(--navy)", marginTop: 0, marginBottom: 16 },
  tekst: { fontSize: 15, color: "var(--text)", lineHeight: 1.7, marginTop: 0, marginBottom: 20 },
};

export default function SlimSubsidie2026Page() {
  return (
    <div className="hp">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navigation />

      {/* ── HERO ── */}
      <div style={{ background: "var(--navy)", padding: "56px 20px 48px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -80, top: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(26,107,191,0.12)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 10 }}>SLIM-SUBSIDIE 2026</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginTop: 0, marginBottom: 16 }}>
            SLIM-subsidie in 2026 — wat u moet weten
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 640, marginBottom: 24 }}>
            In 2026 is {fmtEur(BUDGET_2026.totaal)} beschikbaar voor de SLIM-subsidie. Tijdvak 2 voor individueel MKB opent op 10 augustus 2026. Hier leest u alles over de tijdvakken, het budget en de wijzigingen per 2025.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(42,170,226,0.15)", border: "1px solid rgba(42,170,226,0.4)", color: "var(--blue-light)", fontSize: 12, fontWeight: 700, letterSpacing: "0.5px", padding: "6px 14px", borderRadius: 20, marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--blue-light)", display: "inline-block" }} />
            TIJDVAK 2 OPENT 10 AUGUSTUS 2026
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/quickscan" className="hp-btn-p">Doe de gratis quickscan →</Link>
            <Link href="/slim-subsidie-aanvragen" className="hp-btn-s">Bekijk het aanvraagproces →</Link>
          </div>
        </div>
      </div>

      {/* ── SECTIE 1: TIJDVAKKEN ── */}
      <div id="tijdvakken" style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>PLANNING 2026</div>
          <h2 style={s.h2}>Aanvraagtijdvakken 2026</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
            {tijdvakken2026.map((tv) => {
              const status = getTijdvakStatus(tv);
              const isBinnenkort = status === "binnenkort";
              const isOpen = status === "open";
              const isGesloten = status === "gesloten";
              const borderColor = isBinnenkort ? "#f59e0b" : isOpen ? "var(--green-b)" : "var(--border-l)";
              const bg = isBinnenkort ? "#fffbe6" : isOpen ? "var(--green-l)" : "var(--white)";
              const badgeBg = isBinnenkort ? "#1a6bbf" : isOpen ? "var(--green)" : "var(--muted)";
              const badgeText = isBinnenkort ? "Binnenkort open" : isOpen ? "Open" : "Gesloten";

              const isTv1 = tv.label === "Tijdvak 1 2026";

              return (
                <div key={tv.label} style={{ background: bg, border: `1px solid ${borderColor}`, borderRadius: "var(--r)", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>
                      {tv.type === "samenwerking" ? "Samenwerkingsverbanden" : "Individueel MKB"}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{tv.label}</div>
                    <div style={{ fontSize: 14, color: "var(--muted)" }}>
                      {fmtDatum(tv.open)} om {fmtTijd(tv.open)} t/m {fmtDatum(tv.close)} om {fmtTijd(tv.close)}
                    </div>
                    {isTv1 && (
                      <div style={{ marginTop: 8, fontSize: 13, color: "var(--muted)" }}>
                        Resultaat: {LOTING.totaalIngediend.toLocaleString("nl-NL")} aanvragen ingediend · {LOTING.inBehandeling} ingeloot · ~{LOTING.kansRuw}% kans
                      </div>
                    )}
                  </div>
                  <span style={{ background: badgeBg, color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 20, flexShrink: 0, alignSelf: "flex-start" }}>
                    {badgeText}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{ background: "#e8f4fc", border: "1px solid #c7d9f5", borderRadius: "var(--rs)", padding: "14px 18px", fontSize: 13, color: "var(--navy)", lineHeight: 1.65 }}>
            <strong>Tip:</strong> Begin minimaal 4 weken vóór de sluiting met de voorbereiding. Er is geen voordeel aan vroeg indienen — de loting is aselect. Wat telt: een complete, foutloze aanvraag.
          </div>
        </div>
      </div>

      {/* ── SECTIE 2: BUDGET ── */}
      <div id="budget" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>BUDGET 2026</div>
          <h2 style={s.h2}>Hoeveel geld is er beschikbaar in 2026?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 24 }}>
            {[
              [`€${BUDGET_2026.individueel / 1_000_000} miljoen`, "Budget individueel MKB 2026"],
              [`€${BUDGET_2026.samenwerking / 1_000_000} miljoen`, "Budget samenwerkingsverbanden 2026"],
              [`€${BUDGET_2026.totaal / 1_000_000} miljoen`, "Totaal budget 2026"],
              [`~${LOTING.kansRuw}%`, "Effectieve slaagkans tijdvak 1 2026"],
            ].map(([num, lbl]) => (
              <div key={lbl} style={{ background: "var(--navy)", borderRadius: "var(--r)", padding: "22px 20px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 800, color: "var(--blue-light)", lineHeight: 1, marginBottom: 8 }}>{num}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>{lbl}</div>
              </div>
            ))}
          </div>
          <p style={s.tekst}>
            Het totale budget voor de SLIM-subsidie bedraagt in 2026 {fmtEur(BUDGET_2026.totaal)}. Voor individuele MKB-aanvragen is {fmtEur(BUDGET_2026.individueel)} beschikbaar, verdeeld over twee tijdvakken. Voor samenwerkingsverbanden is {fmtEur(BUDGET_2026.samenwerking)} beschikbaar in één tijdvak (juni–juli).
          </p>
        </div>
      </div>

      {/* ── SECTIE 3: WIJZIGINGEN ── */}
      <div id="wijzigingen" style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>WIJZIGINGEN PER 2025</div>
          <h2 style={s.h2}>Wat is er veranderd ten opzichte van voorgaande jaren?</h2>
          <p style={s.tekst}>
            Per 1 januari 2025 is de SLIM-regeling verlengd voor de periode 2025–2029. De verlenging bracht een aantal belangrijke wijzigingen met zich mee.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
            {[
              {
                nr: "1",
                titel: `Subsidiepercentage: ${SUBSIDIE.percentage}% voor alle MKB`,
                tekst: `Het subsidiepercentage voor klein-MKB is gelijkgetrokken met middelgroot MKB en bedraagt nu ${SUBSIDIE.percentage}% voor alle MKB-ondernemingen. De vroegere 80%-regeling voor klein-MKB bestaat niet meer. Bron: art. 2.20 SLIM-regeling, 5 juli 2025.`,
              },
              {
                nr: "2",
                titel: "Ambtshalve vaststelling",
                tekst: `Subsidies tot ${fmtEur(SUBSIDIE.maxBedrag)} worden ambtshalve vastgesteld. Individuele MKB-ondernemers hoeven geen verzoek tot vaststelling in te dienen en geen financiële administratie bij te houden. UVB voert steekproefsgewijze controles uit.`,
              },
              {
                nr: "3",
                titel: "Activiteit D afgeschaft",
                tekst: "Activiteit D (praktijkleerplaats voor BBL-deelnemers in de derde leerweg) is per 2025 vervallen. Deze subsidie loopt nu via de Subsidieregeling Praktijkleren (OCW). Aanvragen met Activiteit D worden niet gehonoreerd.",
              },
              {
                nr: "4",
                titel: "Grootbedrijf landbouw/horeca/recreatie vervallen",
                tekst: "Het aparte budget voor grootbedrijven in de landbouw-, horeca- en recreatiesector is per 2025 op. Grootbedrijven kunnen uitsluitend nog deelnemen via een samenwerkingsverband.",
              },
              {
                nr: "5",
                titel: "Vier verplichte formats",
                tekst: "Het gebruik van vier RVO-formats is verplicht gesteld: activiteitenplan, begroting, de-minimisverklaring en MKB-verklaring. Aanvragen zonder deze formats worden niet gehonoreerd.",
              },
              {
                nr: "6",
                titel: "Beslistermijn verkort",
                tekst: "De beslistermijn is verkort van 18 naar 13 weken. Ondernemers weten daardoor sneller waar ze aan toe zijn.",
              },
              {
                nr: "7",
                titel: "Projectperiode verlengbaar",
                tekst: "De projectperiode kan met maximaal 3 maanden worden verlengd bij omstandigheden die niet aan de subsidieaanvrager kunnen worden toegerekend.",
              },
              {
                nr: "8",
                titel: "Loting samenwerkingsverbanden",
                tekst: "Per 31 maart 2026 geldt ook voor samenwerkingsverbanden een lotingssysteem (gewijzigd van volgorde van binnenkomst). Bron: stcrt-2026-13249.",
              },
            ].map(({ nr, titel, tekst }) => (
              <div key={nr} style={{ background: "var(--white)", border: "1px solid var(--border-l)", borderRadius: "var(--r)", padding: "20px" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--navy)", color: "var(--blue-light)", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{nr}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--navy)", marginBottom: 6 }}>{titel}</div>
                    <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>{tekst}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTIE 4: LOTING TIJDVAK 1 ── */}
      <div id="loting" style={{ background: "var(--navy)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={{ ...s.slbl, color: "var(--blue-light)" }}>TIJDVAK 1 2026 — RESULTATEN</div>
          <h2 style={{ ...s.h2, color: "#fff" }}>Wat leren we van tijdvak 1 2026?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginBottom: 24 }}>
            {[
              [LOTING.totaalIngediend.toLocaleString("nl-NL"), "aanvragen ingediend"],
              [(LOTING.totaalIngediend - LOTING.afgekeurdVoorLoting).toLocaleString("nl-NL"), "in notariële loting"],
              [LOTING.afgekeurdVoorLoting.toString(), "afgewezen vóór loting door fouten"],
              [LOTING.inBehandeling.toString(), "in behandeling genomen"],
              [`~${LOTING.kansRuw}%`, "effectieve slaagkans"],
            ].map(([num, lbl]) => (
              <div key={lbl} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--r)", padding: "18px 16px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 800, color: "var(--blue-light)", lineHeight: 1, marginBottom: 6 }}>{num}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>{lbl}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--rs)", padding: "14px 18px", fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, marginBottom: 20 }}>
            💡 {LOTING.afgekeurdVoorLoting} aanvragen werden vóór de loting afgekeurd door vermijdbare fouten. Een correcte, complete aanvraag is de minimumvereiste om mee te loten.
          </div>
          <Link href="/lotingsuitslagen" className="hp-btn-s">
            Bekijk alle lotingsuitslagen →
          </Link>
        </div>
      </div>

      {/* ── CTA-BLOK ── */}
      <div style={{ background: "#e8f4fc", padding: "48px 20px", borderTop: "1px solid #c7d9f5", borderBottom: "1px solid #c7d9f5" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.3rem, 2.8vw, 1.8rem)", fontWeight: 800, color: "var(--navy)", marginTop: 0, marginBottom: 10 }}>
            Klaar voor tijdvak 2 op 10 augustus 2026?
          </h2>
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 24px" }}>
            Begin minimaal 4 weken vóór de sluiting. Doe eerst de gratis quickscan en weet binnen 2 minuten of uw bedrijf in aanmerking komt.
          </p>
          <Link href="/quickscan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>
            Doe de gratis quickscan →
          </Link>
          <p className="hp-cta-note" style={{ marginTop: 16 }}>
            Gratis quickscan · Reserveringsfee {fmtEur(PRICING.reserveringsfee)} excl. btw · Succesfee {fmtEur(PRICING.succesfee)} excl. btw — no cure, no pay
          </p>
        </div>
      </div>

      {/* ── SECTIE 5: FAQ ── */}
      <div id="faq" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>VEELGESTELDE VRAGEN</div>
          <h2 style={s.h2}>FAQ — SLIM-subsidie 2026</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {faqItems.map(({ q, a }, i) => (
              <details key={i} style={{ background: "var(--off)", border: "1px solid var(--border-l)", borderRadius: "var(--rs)", overflow: "hidden" }}>
                <summary style={{ padding: "16px 18px", fontWeight: 600, fontSize: 15, color: "var(--navy)", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {q}
                  <span style={{ fontSize: 18, fontWeight: 300, flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <div style={{ padding: "0 18px 16px", fontSize: 14, color: "var(--muted)", lineHeight: 1.75 }}>
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* ── SLOTSECTIE ── */}
      <div style={{ background: "var(--navy)", padding: "56px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 12 }}>
            TIJDVAK 2 OPENT 10 AUGUSTUS 2026
          </div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 800, color: "#fff", marginTop: 0, marginBottom: 16 }}>
            Begin op tijd met uw voorbereiding
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 24 }}>
            Doe eerst de gratis quickscan en weet binnen 2 minuten of uw bedrijf in aanmerking komt.
          </p>
          <Link href="/quickscan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>
            Doe de gratis quickscan →
          </Link>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 16, lineHeight: 1.6 }}>
            Gratis quickscan · Reserveringsfee {fmtEur(PRICING.reserveringsfee)} excl. btw · Succesfee {fmtEur(PRICING.succesfee)} excl. btw — no cure, no pay
          </p>
        </div>
      </div>

      {/* ── BRONVERMELDING ── */}
      <div style={{ background: "var(--navy)", padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0, textAlign: "center", lineHeight: 1.9 }}>
          Bronnen:{" "}
          <a href="https://wetten.overheid.nl/BWBR0043015/2025-07-05" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "underline" }}>
            wetten.overheid.nl/BWBR0043015/2025-07-05
          </a>
          {" · "}
          <a href="https://www.uitvoeringvanbeleidszw.nl" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "underline" }}>
            uitvoeringvanbeleidszw.nl
          </a>
          {" · "}
          <a href="https://zoek.officielebekendmakingen.nl/stcrt-2026-13249" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "underline" }}>
            stcrt-2026-13249
          </a>
          {" · RVO lotingsuitslag tijdvak 1 2026"}
        </p>
      </div>

      {/* ── FOOTER ── */}
      <footer className="ftr">
        <div className="ftr-inner">
          <div className="ftr-links">
            <Link href="/privacy">Privacyverklaring</Link>
            <Link href="/av">Algemene Voorwaarden</Link>
          </div>
          <div className="ftr-company">
            <span><strong>SLIM Subsidie Advies</strong> — onderdeel van Inscentia BV</span>
            <span>
              KvK: {BEDRIJFSINFO.kvk} &nbsp;·&nbsp; BTW: {BEDRIJFSINFO.btw} &nbsp;·&nbsp;{" "}
              <a href={`mailto:${BEDRIJFSINFO.email}`} style={{ color: "var(--blue-light)", textDecoration: "none" }}>{BEDRIJFSINFO.email}</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
