import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import FAQAccordeon from "@/components/ui/FAQAccordeon";
import { SUBSIDIE, LOTING, TIJDVAKKEN_2026, PRICING, FAQ_SLIM_SUBSIDIE, fmtEur } from "@/data/slim-content";

export const metadata = {
  title: "SLIM-subsidie aanvragen in 2026: stappenplan en tijdvakken",
  description:
    "Hoe vraagt u SLIM-subsidie aan in 2026? Tijdvak 2 opent 10 augustus. Stappenplan, benodigde documenten en lotingsprocedure uitgelegd.",
  alternates: {
    canonical: "https://www.slimsubsidieadvies.nl/slim-subsidie/aanvragen",
  },
};

const stijl = {
  sectie: { padding: "56px 20px" },
  inner: { maxWidth: 840, margin: "0 auto" },
  slbl: { fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--blue)", marginBottom: 8 },
  stap: {
    display: "flex",
    gap: 20,
    marginBottom: 36,
    paddingBottom: 36,
    borderBottom: "1px solid #e8edf3",
  },
  stapNum: {
    flexShrink: 0,
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "var(--blue)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 16,
    marginTop: 2,
  },
  stapBody: { flex: 1 },
  stapTitel: { fontSize: 18, fontWeight: 800, color: "var(--navy)", marginBottom: 8, lineHeight: 1.3 },
  stapTekst: { fontSize: 15, color: "var(--muted)", lineHeight: 1.75 },
  lijst: { margin: "10px 0 0 0", paddingLeft: 20, fontSize: 14, color: "var(--muted)", lineHeight: 1.9 },
  kaart: { background: "#f7f9fc", border: "1px solid #e8edf3", borderRadius: 12, padding: "20px 24px" },
  alert: { background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "16px 20px", marginTop: 20 },
};

export default function SlimSubsidieAanvragenPage() {
  const tv1 = TIJDVAKKEN_2026.find((t) => t.label === "Tijdvak 1 2026");
  const tv2 = TIJDVAKKEN_2026.find((t) => t.label === "Tijdvak 2 2026");
  const tvSamenwerkng = TIJDVAKKEN_2026.find((t) => t.type === "samenwerking");

  function fmtDatum(d) {
    return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
  }

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <Navigation />

      {/* ── HERO ── */}
      <div style={{ background: "var(--navy)", padding: "60px 20px 52px" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 12 }}>
            Aanvraagprocedure
          </div>
          <h1 style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
            SLIM-subsidie aanvragen in 2026
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 620, marginBottom: 28 }}>
            Stappenplan voor een correcte aanvraag: van activiteitenkeuze tot vaststelling.
            Tijdvak 2 opent op 10 augustus 2026. Start uw voorbereiding ruim van tevoren.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/scan" className="hp-btn-p">Doe de gratis quickscan →</Link>
            <Link href="/slim-subsidie" className="hp-btn-s">← Terug naar SLIM-subsidie</Link>
          </div>
        </div>
      </div>

      {/* ── TIJDVAKKEN OVERZICHT ── */}
      <div style={{ background: "var(--white)", ...stijl.sectie }}>
        <div style={stijl.inner}>
          <div style={stijl.slbl}>Aanvraagtijdvakken 2026</div>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, color: "var(--navy)", marginBottom: 24, marginTop: 0 }}>
            Wanneer kunt u aanvragen?
          </h2>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              { label: "Tijdvak 1 2026", periode: `${fmtDatum(tv1.open)} – ${fmtDatum(tv1.close)}`, type: "Individueel MKB", status: "Gesloten", kleur: "#6b7280" },
              { label: "Samenwerking 2026", periode: `${fmtDatum(tvSamenwerkng.open)} – ${fmtDatum(tvSamenwerkng.close)}`, type: "Samenwerkingsverbanden", status: "Binnenkort open", kleur: "#d97706" },
              { label: "Tijdvak 2 2026", periode: `${fmtDatum(tv2.open)} – ${fmtDatum(tv2.close)}`, type: "Individueel MKB", status: "Binnenkort open", kleur: "#059669" },
            ].map((tv) => (
              <div key={tv.label} style={{ background: "#f7f9fc", border: "1px solid #e8edf3", borderRadius: 12, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 3 }}>{tv.type}</div>
                  <div style={{ fontWeight: 800, color: "var(--navy)", fontSize: 16 }}>{tv.label}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3 }}>{tv.periode}</div>
                </div>
                <span style={{ background: tv.kleur, color: "#fff", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{tv.status}</span>
              </div>
            ))}
          </div>
          <div style={{ ...stijl.kaart, marginTop: 20, background: "#fffbe6", borderColor: "#fde68a" }}>
            <strong style={{ color: "#92400e" }}>Advies:</strong>{" "}
            <span style={{ fontSize: 14, color: "#78350f" }}>
              Begin minimaal 4 weken vóór sluiting van het tijdvak met de voorbereiding.
              De loting is aselect — er is geen voordeel aan vroeg indienen binnen het tijdvak zelf.
              Wél cruciaal: een complete, foutloze aanvraag.
            </span>
          </div>
        </div>
      </div>

      {/* ── STAPPENPLAN ── */}
      <div style={{ background: "var(--off)", ...stijl.sectie }}>
        <div style={stijl.inner}>
          <div style={stijl.slbl}>Stappenplan</div>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, color: "var(--navy)", marginBottom: 32, marginTop: 0 }}>
            Van activiteitenkeuze tot vaststelling
          </h2>

          {/* Stap 1 */}
          <div style={stijl.stap}>
            <div style={stijl.stapNum}>1</div>
            <div style={stijl.stapBody}>
              <div style={stijl.stapTitel}>Bepaal uw activiteit</div>
              <div style={stijl.stapTekst}>
                De SLIM-subsidie kent drie subsidiabele activiteiten. Kies de activiteit die
                aansluit bij uw ontwikkelbehoefte:
              </div>
              <ul style={stijl.lijst}>
                <li><strong>Activiteit A — Doorlichting:</strong> externe adviseur brengt scholingsbehoefte in kaart en stelt een opleidings- of ontwikkelplan op. Minimale subsidiabele kosten: {fmtEur(SUBSIDIE.minSubsidiabeleKostenAC)}.</li>
                <li><strong>Activiteit B — Loopbaanadviezen:</strong> individuele loopbaan- of ontwikkeladviezen via een Noloc-gecertificeerde adviseur. Vergoeding: €700 per afgerond traject.</li>
                <li><strong>Activiteit C — L&O-methode:</strong> ontwikkelen of invoeren van een structurele leermethodiek op de werkvloer. Minimale subsidiabele kosten: {fmtEur(SUBSIDIE.minSubsidiabeleKostenAC)}.</li>
              </ul>
              <div style={{ ...stijl.alert }}>
                <strong style={{ color: "#dc2626" }}>⚠️ Activiteit D bestaat niet meer</strong>
                <p style={{ fontSize: 13, color: "#7f1d1d", margin: "6px 0 0", lineHeight: 1.6 }}>
                  Activiteit D (praktijkleerplaats) is per 2025 afgeschaft. Aanvragen met Activiteit D
                  worden niet gehonoreerd. Controleer of uw adviseur hiervan op de hoogte is.
                </p>
              </div>
            </div>
          </div>

          {/* Stap 2 */}
          <div style={stijl.stap}>
            <div style={stijl.stapNum}>2</div>
            <div style={stijl.stapBody}>
              <div style={stijl.stapTitel}>Bereid uw aanvraag voor</div>
              <div style={stijl.stapTekst}>
                Verzamel alle benodigde documenten vóór het tijdvak opent. RVO controleert de
                volledigheid streng — ontbrekende documenten kunnen leiden tot afwijzing vóór de loting.
              </div>
              <div style={{ marginTop: 14, display: "grid", gap: 8 }}>
                {[
                  ["Activiteitenplan", "RVO-model verplicht — gebruik uitsluitend de meest recente versie van het RVO-formulier."],
                  ["Begroting", "RVO-model verplicht — sluit exact aan op het activiteitenplan."],
                  ["MKB-verklaring", "Bevestiging dat uw onderneming voldoet aan de EU-MKB-definitie."],
                  ["De-minimisverklaring", "Overzicht van ontvangen staatssteun in de afgelopen 3 belastingjaren."],
                  ["Kopie bankafschrift", "Bewijs van IBAN op naam van de aanvrager."],
                  ["Machtigingsformulier", "Alleen vereist voor samenwerkingsverbanden — per deelnemende partij."],
                ].map(([titel, toelichting]) => (
                  <div key={titel} style={{ background: "var(--white)", border: "1px solid #e8edf3", borderRadius: 8, padding: "12px 16px" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--navy)", marginBottom: 3 }}>{titel}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.55 }}>{toelichting}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stap 3 */}
          <div style={stijl.stap}>
            <div style={stijl.stapNum}>3</div>
            <div style={stijl.stapBody}>
              <div style={stijl.stapTitel}>Registreer op het subsidieportaal</div>
              <div style={stijl.stapTekst}>
                Aanvragen verlopen uitsluitend via{" "}
                <strong>mijnuitvoeringvanbeleidszw.nl</strong>. Registreer uw organisatie tijdig —
                vóór het tijdvak opent. Uw DigiD of eHerkenning moet kloppen met het type aanvrager
                (eenmanszaak, BV, VOF, etc.). Samenwerkingsverbanden registreren als aparte entiteit
                met een penvoerder.
              </div>
            </div>
          </div>

          {/* Stap 4 */}
          <div style={stijl.stap}>
            <div style={stijl.stapNum}>4</div>
            <div style={stijl.stapBody}>
              <div style={stijl.stapTitel}>Dien uw aanvraag in binnen het tijdvak</div>
              <div style={stijl.stapTekst}>
                Aanvragen zijn uitsluitend geldig als ze worden ingediend tijdens het opengestelde
                tijdvak. Per onderneming is maximaal één aanvraag per tijdvak toegestaan.
              </div>
              <ul style={stijl.lijst}>
                <li><strong>Tijdvak 1 2026:</strong> 7 april t/m 4 mei 2026</li>
                <li><strong>Tijdvak 2 2026:</strong> 10 augustus t/m 7 september 2026</li>
                <li><strong>Samenwerkingsverbanden 2026:</strong> 22 juni t/m 20 juli 2026</li>
              </ul>
            </div>
          </div>

          {/* Stap 5 */}
          <div style={stijl.stap}>
            <div style={stijl.stapNum}>5</div>
            <div style={stijl.stapBody}>
              <div style={stijl.stapTitel}>Loting en beoordeling</div>
              <div style={stijl.stapTekst}>
                Bij overintekening bepaalt een notariële loting de behandelvolgorde. Dit is geen
                kwaliteitsoordeel — het is een aselecte trekking op basis van dossiernummer.
              </div>
              <ul style={stijl.lijst}>
                <li>Onvolledige aanvragen worden achteraan geplaatst na herstelmogelijkheid</li>
                <li>Tijdvak 1 2026: {LOTING.totaalIngediend.toLocaleString("nl-NL")} aanvragen ingediend, {LOTING.inBehandeling} ingeloot (~{LOTING.kansRuw}%)</li>
                <li>{LOTING.afgekeurdVoorLoting} aanvragen afgewezen vóór de loting wegens procedurele fouten</li>
                <li>RVO geeft binnen 13 weken na sluiting tijdvak uitsluitsel over loting en beoordeling</li>
              </ul>
            </div>
          </div>

          {/* Stap 6 */}
          <div style={stijl.stap}>
            <div style={stijl.stapNum}>6</div>
            <div style={stijl.stapBody}>
              <div style={stijl.stapTitel}>Uitvoering en voorschot</div>
              <div style={stijl.stapTekst}>
                Bij toekenning wordt direct {SUBSIDIE.voorschot * 100}% voorschot uitbetaald.
                De looptijd bedraagt maximaal {SUBSIDIE.looptijdMKB} maanden voor individueel MKB
                (samenwerkingsverbanden: maximaal {SUBSIDIE.looptijdSamenwerking} maanden).
                Bewaar alle bewijsstukken voor een eventuele steekproef:
              </div>
              <ul style={stijl.lijst}>
                <li><strong>Activiteit A:</strong> het opgeleverde opleidings- of ontwikkelplan, facturen en betaalbewijzen van de adviseur</li>
                <li><strong>Activiteit B:</strong> tweezijdig getekende prestatieverklaringen per deelnemer, urenstaten en facturen</li>
                <li><strong>Activiteit C:</strong> documentatie van de gerealiseerde L&O-methode, facturen en implementatiebewijzen</li>
              </ul>
            </div>
          </div>

          {/* Stap 7 */}
          <div style={{ ...stijl.stap, borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}>
            <div style={stijl.stapNum}>7</div>
            <div style={stijl.stapBody}>
              <div style={stijl.stapTitel}>Vaststelling</div>
              <div style={stijl.stapTekst}>
                Na afloop van de activiteiten wordt de subsidie vastgesteld en het resterende
                {" "}{100 - SUBSIDIE.voorschot * 100}% uitbetaald.
              </div>
              <ul style={stijl.lijst}>
                <li><strong>Individueel MKB:</strong> ambtshalve vastgesteld door RVO (geen verzoek nodig), tenzij een steekproef wordt gedaan</li>
                <li><strong>Samenwerkingsverbanden:</strong> penvoerder dient een verzoek tot vaststelling in binnen 22 weken na afloop van de initiatiefperiode; controleverklaring vereist ({fmtEur(SUBSIDIE.controleverklaringBedrag)} vast bedrag)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── WAAROM BEGELEIDING ── */}
      <div style={{ background: "var(--navy)", ...stijl.sectie }}>
        <div style={stijl.inner}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 12 }}>
            Vermijdbare fouten
          </div>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, color: "#fff", marginBottom: 16, marginTop: 0 }}>
            Waarom professionele begeleiding loont
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 680, marginBottom: 20 }}>
            In tijdvak 1 2026 werden {LOTING.afgekeurdVoorLoting} aanvragen afgewezen vóór de
            notariële loting wegens procedurele fouten. Dit zijn aanvragen die nooit meededen —
            volledig vermijdbaar met de juiste begeleiding. Van de {LOTING.inLoting.toLocaleString("nl-NL")} aanvragen
            die wél werden ingeloot, werd slechts {LOTING.kansRuw}% daadwerkelijk geselecteerd.
            Uw aanvraag moet foutloos zijn om überhaupt mee te doen aan de loting.
          </p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: 680, marginBottom: 20 }}>
            De SLIM-regelgeving wijzigt regelmatig. Subsidiepercentages, subsidiabele activiteiten
            en aanvraagvereisten veranderen per tijdvak. Wat in 2024 gold, geldt in 2026 niet meer —
            zoals de afschaffing van activiteit D en de 80%-regeling voor klein-MKB. Een adviseur
            die de actuele regelgeving kent, voorkomt dat uw aanvraag op verouderde gronden wordt
            ingediend.
          </p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: 680, marginBottom: 28 }}>
            Daarnaast stelt RVO tijdens de screeningsperiode inhoudelijke onderbouwingsvragen over
            uw projectplan. Deze vragen vereisen subsidie-expertise: een onderbouwing die niet
            aansluit op de beoordelingscriteria van RVO kan leiden tot afwijzing, ook na inloting.
            SLIM Subsidie Advies begeleidt u bij het beantwoorden van deze vragen.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
            {[
              [LOTING.totaalIngediend.toLocaleString("nl-NL"), "aanvragen ingediend"],
              [LOTING.afgekeurdVoorLoting, "afgewezen vóór loting"],
              [LOTING.inBehandeling, "ingeloot"],
              [`~${LOTING.kansRuw}%`, "slaagkans"],
            ].map(([n, lbl]) => (
              <div key={lbl} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "18px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: "var(--blue-light)", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>{lbl}</div>
              </div>
            ))}
          </div>
          <Link href="/scan" className="hp-btn-p">Doe de gratis quickscan →</Link>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{ background: "var(--white)", ...stijl.sectie }}>
        <div style={stijl.inner}>
          <div style={stijl.slbl}>Veelgestelde vragen</div>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, color: "var(--navy)", marginBottom: 24, marginTop: 0 }}>
            Vragen over de aanvraagprocedure
          </h2>
          <FAQAccordeon items={FAQ_SLIM_SUBSIDIE.filter((item) =>
            item.q.toLowerCase().includes("activiteit") ||
            item.q.toLowerCase().includes("aanvra") ||
            item.q.toLowerCase().includes("inlot") ||
            item.q.toLowerCase().includes("toekenning") ||
            item.q.toLowerCase().includes("combineren") ||
            item.q.toLowerCase().includes("meerdere") ||
            item.q.toLowerCase().includes("looptijd") ||
            item.q.toLowerCase().includes("voorschot") ||
            item.q.toLowerCase().includes("vastgest")
          )} />
          <div style={{ marginTop: 20 }}>
            <Link href="/slim-subsidie" style={{ color: "var(--blue)", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              Alle veelgestelde vragen over SLIM-subsidie →
            </Link>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="hp-cta-section">
        <div className="hp-si">
          <div className="hp-slbl" style={{ color: "var(--blue-light)", textAlign: "center" }}>Tijdvak 2 2026 — opening 10 augustus</div>
          <h2 className="hp-cta-title">Klaar om te starten?</h2>
          <p className="hp-cta-sub">
            Doe de gratis quickscan en weet binnen 2 minuten of uw bedrijf in aanmerking komt.
            Wij begeleiden de volledige aanvraag voor een reserveringsfee van {fmtEur(PRICING.reserveringsfee)} excl. btw.
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
          Lotingscijfers: RVO, 8 mei 2026 ·{" "}
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
