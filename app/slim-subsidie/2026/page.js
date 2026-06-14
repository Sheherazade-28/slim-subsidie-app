import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import { SUBSIDIE, LOTING, TIJDVAKKEN_2026, BUDGET_2026, PRICING, fmtEur } from "@/data/slim-content";

export const metadata = {
  title: "SLIM-subsidie 2026: tijdvakken, budget en wijzigingen",
  description:
    "Alles over SLIM-subsidie in 2026. Tijdvakken, €45 miljoen beschikbaar budget en de belangrijkste wijzigingen ten opzichte van eerdere jaren.",
  alternates: {
    canonical: "https://www.slimsubsidieadvies.nl/slim-subsidie/2026",
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

function fmtDatum(d) {
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}
function fmtTijd(d) {
  return d.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
}

export default function SlimSubsidie2026Page() {
  const individueel = TIJDVAKKEN_2026.filter((t) => t.type === "individueel" && t.open.getFullYear() === 2026);
  const samenwerking = TIJDVAKKEN_2026.filter((t) => t.type === "samenwerking");

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <Navigation />

      {/* ── HERO ── */}
      <div style={{ background: "var(--navy)", padding: "60px 20px 52px" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 12 }}>
            Jaar in beeld
          </div>
          <h1 style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
            SLIM-subsidie 2026
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 620, marginBottom: 28 }}>
            Tijdvakken, budgetten, lotingscijfers en alle wijzigingen ten opzichte van eerdere jaren.
            Tijdvak 2 voor individueel MKB opent op <strong style={{ color: "#fff" }}>10 augustus 2026</strong>.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/scan" className="hp-btn-p">Doe de gratis quickscan →</Link>
            <Link href="/slim-subsidie" className="hp-btn-s">← Terug naar SLIM-subsidie</Link>
          </div>
        </div>
      </div>

      {/* ── TIJDVAKKEN ── */}
      <div style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Aanvraagtijdvakken 2026</div>
          <h2 style={s.h2}>Wanneer kunt u aanvragen?</h2>
          <p style={s.tekst}>
            In 2026 zijn er twee tijdvakken voor individueel MKB en één tijdvak voor
            samenwerkingsverbanden. Aanvragen buiten het tijdvak worden niet in behandeling genomen.
          </p>

          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>
              Individueel MKB
            </div>
            <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
              {individueel.map((tv) => {
                const now = new Date();
                const gesloten = now > tv.close;
                const open = now >= tv.open && now <= tv.close;
                const status = gesloten ? "Gesloten" : open ? "Open" : "Binnenkort open";
                const kleur = gesloten ? "#6b7280" : open ? "#059669" : "#d97706";
                return (
                  <div key={tv.label} style={{ background: "#f7f9fc", border: "1px solid #e8edf3", borderRadius: 12, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <div style={{ fontWeight: 800, color: "var(--navy)", fontSize: 17, marginBottom: 6 }}>{tv.label}</div>
                      <div style={{ fontSize: 14, color: "var(--muted)" }}>
                        {fmtDatum(tv.open)} om {fmtTijd(tv.open)} t/m {fmtDatum(tv.close)} om {fmtTijd(tv.close)}
                      </div>
                    </div>
                    <span style={{ background: kleur, color: "#fff", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{status}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>
              Samenwerkingsverbanden
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {samenwerking.map((tv) => (
                <div key={tv.label} style={{ background: "#f7f9fc", border: "1px solid #e8edf3", borderRadius: 12, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 800, color: "var(--navy)", fontSize: 17, marginBottom: 6 }}>{tv.label}</div>
                    <div style={{ fontSize: 14, color: "var(--muted)" }}>
                      {fmtDatum(tv.open)} om {fmtTijd(tv.open)} t/m {fmtDatum(tv.close)} om {fmtTijd(tv.close)}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4, fontStyle: "italic" }}>
                      Nieuw in 2026: samenwerkingsverbanden ook via notariële loting
                    </div>
                  </div>
                  <span style={{ background: "#d97706", color: "#fff", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>Binnenkort open</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BUDGET ── */}
      <div style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Budget 2026</div>
          <h2 style={s.h2}>Beschikbaar subsidiebudget</h2>
          <p style={s.tekst}>
            Voor 2026 is in totaal {fmtEur(BUDGET_2026.totaal)} beschikbaar gesteld voor de SLIM-regeling.
            Het budget is verdeeld over individuele MKB-aanvragen en samenwerkingsverbanden.
            Restbudget uit eerdere tijdvakken kan worden doorgeschoven naar een volgend tijdvak.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginTop: 24 }}>
            {[
              [fmtEur(BUDGET_2026.totaal), "totaal beschikbaar 2026"],
              [fmtEur(BUDGET_2026.individueel), "voor individueel MKB"],
              [fmtEur(BUDGET_2026.samenwerking), "voor samenwerkingsverbanden"],
            ].map(([n, lbl]) => (
              <div key={lbl} style={{ background: "var(--white)", border: "1px solid #e8edf3", borderRadius: 12, padding: "22px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: "var(--blue)", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, lineHeight: 1.4 }}>{lbl}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 16, fontStyle: "italic" }}>
            * Tijdvak 1 2026 had een subsidieplafond van €11 miljoen voor individuele MKB-aanvragen.
            Het resterende budget kan bij tijdvak 2 worden opgeteld — dit wordt kort voor opening bekendgemaakt door RVO.
          </p>
        </div>
      </div>

      {/* ── LOTINGSCIJFERS ── */}
      <div style={{ background: "var(--navy)", ...s.sectie }}>
        <div style={{ ...s.inner }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 8 }}>
            Tijdvak 1 2026 — bron: RVO, 8 mei 2026
          </div>
          <h2 style={{ ...s.h2, color: "#fff" }}>Lotingscijfers tijdvak 1 2026</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: 28 }}>
            Tijdvak 1 liep van 7 april t/m 4 mei 2026. De notariële loting vond plaats op 8 mei 2026.
            De uitkomsten geven een realistisch beeld van de concurrentie.
          </p>
          <div className="hp-l-grid">
            <div className="hp-l-card"><div className="hp-l-num w">{LOTING.totaalIngediend.toLocaleString("nl-NL")}</div><div className="hp-l-lbl">aanvragen ingediend</div></div>
            <div className="hp-l-card"><div className="hp-l-num r">{LOTING.afgekeurdVoorLoting}</div><div className="hp-l-lbl">afgewezen vóór loting — procedurele fouten</div></div>
            <div className="hp-l-card"><div className="hp-l-num b">{LOTING.inBehandeling}</div><div className="hp-l-lbl">ingeloot en in behandeling</div></div>
            <div className="hp-l-card"><div className="hp-l-num g">~{LOTING.kansRuw}%</div><div className="hp-l-lbl">effectieve slaagkans</div></div>
          </div>
          <div className="hp-l-insight">
            <span style={{ fontSize: 22, flexShrink: 0 }}>💡</span>
            <p>
              <strong>Wat betekent inloting?</strong> Inloting betekent dat uw aanvraag in
              behandeling wordt genomen — niet dat subsidie is toegekend. Na inloting volgt
              een inhoudelijke beoordeling door RVO. De succesfee van SLIM Subsidie Advies
              is uitsluitend verschuldigd na definitieve toekenning.
            </p>
          </div>
        </div>
      </div>

      {/* ── WIJZIGINGEN ── */}
      <div style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Regelgeving</div>
          <h2 style={s.h2}>Wijzigingen per 2025 — nog steeds van kracht in 2026</h2>
          <p style={s.tekst}>
            Per 5 juli 2025 zijn een aantal significante wijzigingen doorgevoerd in de SLIM-regeling
            (Staatsblad 2025, nr. 254). Deze zijn onverminderd van kracht in 2026.
          </p>

          <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
            {[
              {
                nr: "1",
                titel: "Activiteit D afgeschaft",
                tekst: "Praktijkleerplaatsen voor BBL-deelnemers (Activiteit D) vallen per 2025 niet langer onder de SLIM-regeling. Deze vallen nu onder de Subsidieregeling Praktijkleren van OCW. Aanvragen met Activiteit D worden niet gehonoreerd.",
                type: "red",
              },
              {
                nr: "2",
                titel: "Grootbedrijf uitgesloten van individuele aanvragen",
                tekst: "Grootbedrijven kunnen geen individuele SLIM-aanvraag meer indienen. Uitzondering: grootbedrijven in de landbouw-, horeca- en recreatiesector mogen nog wel individueel aanvragen. Via een samenwerkingsverband blijft deelname voor alle sectoren mogelijk.",
                type: "red",
              },
              {
                nr: "3",
                titel: "Subsidiepercentage: 60% voor alle MKB",
                tekst: `De hogere subsidie van 80% voor kleine ondernemingen is afgeschaft. Artikel 2.20 van de SLIM-regeling bepaalt een uniform percentage van ${SUBSIDIE.percentage}% voor alle MKB — klein én middelgroot. Sommige adviseurs vermelden dit nog incorrect.`,
                type: "orange",
              },
              {
                nr: "4",
                titel: "Maximum uurtarief externe adviseur: €135 excl. BTW",
                tekst: "Het maximale uurtarief voor externe adviseurs is vastgesteld op €135 excl. BTW. Kosten boven dit tarief zijn niet subsidiabel. Let op: voor aanvragen ingediend vóór 2024 gold nog een tarief van €125.",
                type: "blue",
              },
              {
                nr: "5",
                titel: "Minimale projectkosten: €5.000",
                tekst: `Voor activiteiten A (doorlichting) en C (L&O-methode) bedragen de minimale subsidiabele kosten ${fmtEur(SUBSIDIE.minSubsidiabeleKostenAC)}. Bij ${SUBSIDIE.percentage}% subsidie betekent dit een minimale investering van circa ${fmtEur(SUBSIDIE.minInvestering)}. Voor activiteit B (loopbaanadviezen) geldt geen minimumdrempel.`,
                type: "blue",
              },
            ].map((item) => (
              <div key={item.nr} style={{
                background: item.type === "red" ? "#fef2f2" : item.type === "orange" ? "#fffbe6" : "#f0f7ff",
                border: `1px solid ${item.type === "red" ? "#fca5a5" : item.type === "orange" ? "#fde68a" : "#bfdbfe"}`,
                borderRadius: 12,
                padding: "20px 24px",
              }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: item.type === "red" ? "#dc2626" : item.type === "orange" ? "#d97706" : "var(--blue)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 800,
                  }}>{item.nr}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: "var(--navy)", marginBottom: 6 }}>{item.titel}</div>
                    <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{item.tekst}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── AANVRAAGPROCES ── */}
      <div style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Aanvraagproces</div>
          <h2 style={s.h2}>Aanvraag in het kort</h2>
          <p style={s.tekst}>
            Een SLIM-subsidieaanvraag bestaat uit een activiteitenplan en begroting (beide
            conform het RVO-model) plus bewijsstukken. Begin minimaal 4 weken vóór sluiting
            van het tijdvak.
          </p>
          <ol style={{ ...s.lijst, paddingLeft: 22 }}>
            <li>Registreer op <strong>mijnuitvoeringvanbeleidszw.nl</strong> met DigiD of eHerkenning</li>
            <li>Stel een activiteitenplan op conform het RVO-model — kies activiteit A, B of C</li>
            <li>Maak een begroting op conform het RVO-model — sluit exact aan op het activiteitenplan</li>
            <li>Verzamel benodigde bijlagen: MKB-verklaring, de-minimisverklaring, kopie bankafschrift</li>
            <li>Dien in tijdens het opengestelde tijdvak — niet eerder, niet later</li>
            <li>Bij overintekening bepaalt notariële loting de behandelvolgorde</li>
            <li>RVO geeft binnen 13 weken na sluiting tijdvak uitsluitsel</li>
          </ol>
          <div style={{ marginTop: 24 }}>
            <Link href="/slim-subsidie/aanvragen" style={{ color: "var(--blue)", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              Lees het volledige stappenplan → /slim-subsidie/aanvragen
            </Link>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="hp-cta-section">
        <div className="hp-si">
          <div className="hp-slbl" style={{ color: "var(--blue-light)", textAlign: "center" }}>Tijdvak 2 2026 — opening 10 augustus</div>
          <h2 className="hp-cta-title">Start uw voorbereiding nu</h2>
          <p className="hp-cta-sub">
            Doe de gratis quickscan en weet binnen 2 minuten of uw bedrijf in aanmerking komt.
            Tijdvak 2 opent op 10 augustus — begin ruim van tevoren.
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
          Bronnen:{" "}
          <a href="https://wetten.overheid.nl/BWBR0043015/2025-07-05" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "underline" }}>
            wetten.overheid.nl/BWBR0043015/2025-07-05
          </a>
          {" · "}
          <a href="https://www.uitvoeringvanbeleidszw.nl/subsidies-en-regelingen/slim" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "underline" }}>
            uitvoeringvanbeleidszw.nl
          </a>
          {" · "}Lotingscijfers: RVO, 8 mei 2026 ·{" "}
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
