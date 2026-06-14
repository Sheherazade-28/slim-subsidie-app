import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import { SUBSIDIE, ACTIVITEITEN, PRICING, fmtEur } from "@/data/slim-content";

export const metadata = {
  title: "Voorwaarden SLIM-subsidie 2026: kom ik in aanmerking?",
  description:
    "Bekijk de voorwaarden voor SLIM-subsidie 2026. MKB-definitie, subsidiabele activiteiten, minimumkosten en uitgesloten projecten overzichtelijk uitgelegd.",
  alternates: {
    canonical: "https://www.slimsubsidieadvies.nl/slim-subsidie/voorwaarden",
  },
};

const s = {
  sectie: { padding: "56px 20px" },
  inner: { maxWidth: 840, margin: "0 auto" },
  slbl: { fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--blue)", marginBottom: 8 },
  h2: { fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, color: "var(--navy)", marginBottom: 20, marginTop: 0 },
  tekst: { fontSize: 15, color: "var(--muted)", lineHeight: 1.8 },
  lijst: { margin: "10px 0 0 0", paddingLeft: 20, fontSize: 14, color: "var(--muted)", lineHeight: 1.9 },
};

export default function SlimSubsidieVoorwaardenPage() {
  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <Navigation />

      {/* ── HERO ── */}
      <div style={{ background: "var(--navy)", padding: "60px 20px 52px" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 12 }}>
            Subsidievoorwaarden
          </div>
          <h1 style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
            Voorwaarden SLIM-subsidie 2026
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 620, marginBottom: 28 }}>
            Kom ik in aanmerking? Overzicht van de MKB-definitie, subsidiabele activiteiten,
            kostensystematiek en uitsluitingsgronden per 5 juli 2025.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/scan" className="hp-btn-p">Doe de gratis quickscan →</Link>
            <Link href="/slim-subsidie" className="hp-btn-s">← Terug naar SLIM-subsidie</Link>
          </div>
        </div>
      </div>

      {/* ── WIE KAN AANVRAGEN ── */}
      <div style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>MKB-definitie</div>
          <h2 style={s.h2}>Wie kan SLIM-subsidie aanvragen?</h2>
          <p style={s.tekst}>
            De SLIM-subsidie is beschikbaar voor ondernemingen die voldoen aan de Europese
            MKB-definitie, berekend op basis van het <strong>laatste afgesloten boekjaar</strong>.
            Zowel rechtsvorm als feitelijke activiteiten moeten in Nederland zijn gevestigd.
            Het bedrijf mag niet in financiële moeilijkheden verkeren (faillissement, surseance of WSNP).
          </p>

          <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
            {[
              {
                klasse: "a",
                label: "Kleine onderneming",
                items: [
                  "Minder dan 50 medewerkers (voltijdsequivalenten)",
                  "Jaaromzet of balanstotaal maximaal €10 miljoen",
                  `Subsidie: ${SUBSIDIE.percentage}% — tot ${fmtEur(SUBSIDIE.maxBedrag)} (landbouw: tot ${fmtEur(SUBSIDIE.maxBedragLandbouw)})`,
                ],
              },
              {
                klasse: "b",
                label: "Middelgrote onderneming",
                items: [
                  "Minder dan 250 medewerkers (voltijdsequivalenten)",
                  "Jaaromzet maximaal €50 miljoen OF balanstotaal maximaal €43 miljoen",
                  `Subsidie: ${SUBSIDIE.percentage}% — tot ${fmtEur(SUBSIDIE.maxBedrag)} (landbouw: tot ${fmtEur(SUBSIDIE.maxBedragLandbouw)})`,
                ],
              },
              {
                klasse: "c",
                label: "Grootbedrijf — beperkte toegang",
                items: [
                  "Kan géén individuele aanvraag indienen (uitzondering: landbouw, horeca en recreatie)",
                  `Landbouw, horeca en recreatie (grootbedrijf): individuele aanvraag toegestaan, tot ${fmtEur(SUBSIDIE.maxBedragLandbouw)}`,
                  `Via samenwerkingsverband: tot ${fmtEur(SUBSIDIE.maxBedragSamenwerking)} per aanvraag, maximaal ${fmtEur(SUBSIDIE.maxPerPartnerSamenwerking)} per deelnemende partij`,
                ],
              },
            ].map((cat) => (
              <div key={cat.label} className="hp-req-card">
                <div className={`hp-act-tag ${cat.klasse}`}>{cat.label}</div>
                <ul className="hp-req-list" style={{ marginTop: 12 }}>
                  {cat.items.map((item) => (
                    <li key={item} className="hp-req-item">
                      <span className="hp-req-dot" />
                      <span style={{ fontSize: 14 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 10, padding: "16px 20px" }}>
            <strong style={{ color: "#92400e", display: "block", marginBottom: 6 }}>Let op: verbonden ondernemingen</strong>
            <p style={{ fontSize: 13, color: "#78350f", margin: 0, lineHeight: 1.65 }}>
              Bij de berekening van de MKB-drempel worden verbonden en gelieerde ondernemingen
              meegeteld. Een holding met meerdere BV's telt als geheel. Controleer dit vóór de aanvraag.
            </p>
          </div>
        </div>
      </div>

      {/* ── SUBSIDIEPERCENTAGE ── */}
      <div style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Subsidiepercentage</div>
          <h2 style={s.h2}>Hoeveel subsidie ontvangt u?</h2>
          <p style={s.tekst}>
            De SLIM-subsidie vergoedt <strong>{SUBSIDIE.percentage}%</strong> van de subsidiabele kosten
            voor alle MKB-ondernemingen — klein én middelgroot. Er is geen onderscheid meer in percentage
            tussen kleine en middelgrote bedrijven.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 24 }}>
            {[
              [`${SUBSIDIE.percentage}%`, "subsidiepercentage voor alle MKB"],
              [fmtEur(SUBSIDIE.maxBedrag), "maximum individueel MKB"],
              [fmtEur(SUBSIDIE.maxBedragLandbouw), "maximum landbouwbedrijven"],
              [fmtEur(SUBSIDIE.maxBedragSamenwerking), "maximum samenwerkingsverband"],
            ].map(([n, lbl]) => (
              <div key={lbl} style={{ background: "var(--white)", border: "1px solid #e8edf3", borderRadius: 12, padding: "20px", textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: "var(--blue)", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, lineHeight: 1.4 }}>{lbl}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "16px 20px" }}>
            <strong style={{ color: "#dc2626" }}>⚠️ De 80%-regeling bestaat niet meer</strong>
            <p style={{ fontSize: 13, color: "#7f1d1d", margin: "6px 0 0", lineHeight: 1.65 }}>
              Sommige subsidieadviseurs vermelden nog een percentage van 80% voor kleine ondernemingen.
              Die regeling is per 5 juli 2025 afgeschaft (art. 2.20 SLIM-regeling). Voor alle MKB geldt
              sindsdien een uniform percentage van {SUBSIDIE.percentage}%.
            </p>
          </div>
        </div>
      </div>

      {/* ── SUBSIDIABELE ACTIVITEITEN ── */}
      <div style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Subsidiabele activiteiten</div>
          <h2 style={s.h2}>Welke activiteiten komen in aanmerking?</h2>
          <p style={s.tekst}>
            De SLIM-subsidie kent drie subsidiabele activiteiten (A, B en C). Activiteit D is per 2025
            afgeschaft. Reguliere opleidingen en cursussen zijn niet subsidiabel.
          </p>

          <div className="hp-act-grid" style={{ marginTop: 24 }}>
            {ACTIVITEITEN.map((act) => (
              <div key={act.id} className="hp-act-card">
                <div className={`hp-act-tag ${act.tagClass}`}>{act.tag}</div>
                <div className="hp-act-title">{act.title}</div>
                <div className="hp-act-desc">{act.desc}</div>
                <div className="hp-act-tags">
                  {act.examples.map((ex) => (
                    <span key={ex} className="hp-act-tag-sm">{ex}</span>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 10, fontStyle: "italic" }}>
                  {act.min}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28, background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "16px 20px" }}>
            <strong style={{ color: "#dc2626" }}>⚠️ Activiteit D — Praktijkleerplaats: AFGESCHAFT per 2025</strong>
            <p style={{ fontSize: 13, color: "#7f1d1d", margin: "6px 0 0", lineHeight: 1.65 }}>
              Praktijkleerplaatsen voor BBL-deelnemers vallen per 2025 onder de aparte{" "}
              <strong>Subsidieregeling Praktijkleren</strong> van OCW. Aanvragen met Activiteit D
              onder de SLIM-regeling worden niet gehonoreerd.
            </p>
          </div>

          <div style={{ marginTop: 20 }}>
            <strong style={{ color: "var(--navy)", display: "block", marginBottom: 10 }}>
              Aanvullende vereisten Activiteit B — loopbaanadviseur:
            </strong>
            <ul style={s.lijst}>
              <li>HBO-opleiding in een mens- of organisatiegerichte studierichting, én minimaal 3 jaar relevante werkervaring als loopbaanbegeleider, <em>of</em> geregistreerd bij Noloc als Register Loopbaanprofessional</li>
              <li>Minimaal 4 uur individuele contacttijd per deelnemend medewerker</li>
              <li>Vergoeding: €700 per volledig afgerond traject (tweezijdig getekende prestatieverklaring vereist)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── SUBSIDIABELE KOSTEN ── */}
      <div style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Kostensystematiek</div>
          <h2 style={s.h2}>Subsidiabele en niet-subsidiabele kosten</h2>
          <p style={s.tekst}>
            De SLIM-subsidie vergoedt uitsluitend kosten die rechtstreeks samenhangen met de
            subsidiabele activiteit. BTW is in geen geval subsidiabel.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginTop: 24 }}>
            <div className="hp-req-card" style={{ background: "#f0fdf4", borderColor: "#a8d8bc" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#1a7a4a", marginBottom: 12 }}>
                ✓ Subsidiabel
              </div>
              <ul className="hp-req-list">
                {[
                  `Externe advieskosten: tot €135 per uur excl. BTW`,
                  `Interne loonkosten: brutoloon + ${SUBSIDIE.opslagInterneLoonkosten * 100}% opslag (basis: ${SUBSIDIE.werkbareUren} werkbare uren/jaar)`,
                  `${SUBSIDIE.forfaireOpslag * 100}% forfaitaire opslag op de bovenstaande kosten`,
                  `Controleverklaring: ${fmtEur(SUBSIDIE.controleverklaringBedrag)} vast bedrag (uitsluitend bij samenwerkingsverbanden)`,
                ].map((item) => (
                  <li key={item} className="hp-req-item">
                    <span className="hp-req-dot" style={{ background: "#1a7a4a" }} />
                    <span style={{ fontSize: 13 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hp-req-card" style={{ background: "#fef2f2", borderColor: "#fca5a5" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#dc2626", marginBottom: 12 }}>
                ✗ Niet subsidiabel
              </div>
              <ul className="hp-req-list">
                {[
                  "Reguliere opleidingen, cursussen en trainingen",
                  "Loonverletkosten (productiviteitsverlies medewerker tijdens activiteiten)",
                  "BTW",
                  "Overhead, huur en huisvestingskosten",
                  "Kosten buiten de initiatiefperiode (vóór beschikking of na afloop)",
                  "Activiteiten uitsluitend gericht op bestuurders zonder personeel",
                ].map((item) => (
                  <li key={item} className="hp-req-item">
                    <span className="hp-req-dot" style={{ background: "#dc2626" }} />
                    <span style={{ fontSize: 13 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── ALGEMENE VOORWAARDEN ── */}
      <div style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Overige voorwaarden</div>
          <h2 style={s.h2}>Algemene voorwaarden</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              ["Project nog niet gestart", "De activiteiten mogen nog niet zijn begonnen vóór de datum van de subsidiebeschikking. Een aanvraag dient u in vóór de start — niet achteraf."],
              ["Maximaal 1 aanvraag per tijdvak", "Per onderneming is slechts één aanvraag per opengesteld tijdvak toegestaan. Niet ingeloot? U kunt het volgende tijdvak opnieuw aanvragen."],
              ["Maximale looptijd", `${SUBSIDIE.looptijdMKB} maanden voor individueel MKB, gerekend vanaf de subsidiebeschikking. Samenwerkingsverbanden: maximaal ${SUBSIDIE.looptijdSamenwerking} maanden.`],
              ["Aanvraag via mijnuitvoering", "Aanvragen verlopen uitsluitend via mijnuitvoeringvanbeleidszw.nl met DigiD of eHerkenning."],
              ["De-minimisplafond", "Uw bedrijf mag in de afgelopen drie belastingjaren niet meer dan €300.000 aan staatssteun hebben ontvangen."],
              ["Geen financiële moeilijkheden", "Bedrijven in staat van faillissement, surseance van betaling of schuldsanering (WSNP) zijn uitgesloten."],
            ].map(([titel, tekst]) => (
              <div key={titel} style={{ background: "#f7f9fc", border: "1px solid #e8edf3", borderRadius: 10, padding: "16px 20px" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--navy)", marginBottom: 5 }}>{titel}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65 }}>{tekst}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="hp-cta-section">
        <div className="hp-si">
          <div className="hp-slbl" style={{ color: "var(--blue-light)", textAlign: "center" }}>Tijdvak 2 2026 — opening 10 augustus</div>
          <h2 className="hp-cta-title">Voldoet uw bedrijf aan de voorwaarden?</h2>
          <p className="hp-cta-sub">
            Doe de gratis quickscan en weet binnen 2 minuten of uw bedrijf in aanmerking komt
            voor tot {fmtEur(SUBSIDIE.maxBedrag)} SLIM-subsidie.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/scan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>Doe de gratis quickscan →</Link>
          </div>
          <p className="hp-cta-note">
            Gratis quickscan · Reserveringsfee {fmtEur(PRICING.reserveringsfee)} excl. btw · Succesfee €2.500 excl. btw — no cure, no pay
          </p>
        </div>
      </div>

      {/* ── BRONVERMELDING ── */}
      <div style={{ background: "var(--navy)", padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0, textAlign: "center", lineHeight: 1.8 }}>
          Bron:{" "}
          <a href="https://wetten.overheid.nl/BWBR0043015/2025-07-05" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "underline" }}>
            wetten.overheid.nl/BWBR0043015/2025-07-05
          </a>
          {" · "}
          <a href="https://www.uitvoeringvanbeleidszw.nl/subsidies-en-regelingen/slim" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "underline" }}>
            uitvoeringvanbeleidszw.nl
          </a>
          {" · "}
          <Link href="/slim-subsidie" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "underline" }}>← SLIM-subsidie hoofdpagina</Link>
        </p>
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
