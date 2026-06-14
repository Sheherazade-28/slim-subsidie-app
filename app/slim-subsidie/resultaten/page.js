import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import WhitepaperForm from "@/components/ui/WhitepaperForm";
import { LOTING, STATE_OF_SLIM, BUDGET_2026, PRICING, fmtEur } from "@/data/slim-content";

export const metadata = {
  title: "State of SLIM 2026: analyse van 6.208 gehonoreerde projecten",
  description:
    "Download de State of SLIM 2026 whitepaper. NLP/AI-analyse van 6.208 RVO-projecten (2020-2024, €125M). Het eerste SLIM-intelligence platform van Nederland.",
  alternates: {
    canonical: "https://www.slimsubsidieadvies.nl/slim-subsidie/resultaten",
  },
};

const s = {
  sectie: { padding: "56px 20px" },
  inner: { maxWidth: 840, margin: "0 auto" },
  slbl: { fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--blue)", marginBottom: 8 },
  h2: { fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, color: "var(--navy)", marginBottom: 20, marginTop: 0 },
  tekst: { fontSize: 15, color: "var(--muted)", lineHeight: 1.8 },
};

const totaleSubsidieM = (STATE_OF_SLIM.totaleSubsidie / 1000000).toFixed(1).replace(".", ",");

export default function SlimSubsidieResultatenPage() {
  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <Navigation />

      {/* ── HERO ── */}
      <div style={{ background: "var(--navy)", padding: "60px 20px 52px" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 12 }}>
            State of SLIM 2026
          </div>
          <h1 style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
            Analyse van {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} gehonoreerde SLIM-projecten
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 680, marginBottom: 28 }}>
            SLIM Subsidie Advies publiceerde de State of SLIM 2026 — de eerste datagedreven analyse
            van alle {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} gehonoreerde SLIM-projecten
            van 2020 tot en met 2024, op basis van NLP/AI-analyse van openbare RVO-projectdata.
            Totaal: circa €{totaleSubsidieM} miljoen toegekende subsidie.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#download" className="hp-btn-p">Download whitepaper gratis →</a>
            <Link href="/slim-subsidie" className="hp-btn-s">← Terug naar SLIM-subsidie</Link>
          </div>
        </div>
      </div>

      {/* ── KERNBEVINDINGEN ── */}
      <div style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Onderzoeksdata 2020–2024</div>
          <h2 style={s.h2}>Kernbevindingen State of SLIM 2026</h2>
          <p style={s.tekst}>
            Op basis van NLP- en AI-analyse van alle openbare RVO-projectbeschrijvingen van
            gehonoreerde SLIM-projecten 2020–2024 hebben wij het meest uitgebreide overzicht
            van de SLIM-subsidie in Nederland samengesteld. De analyse onthult patronen in
            sectoren, activiteitstypen en succesvolle aanvraagformuleringen.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))", gap: 16, marginTop: 28 }}>
            {[
              [STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL"), "gehonoreerde projecten", "w"],
              [STATE_OF_SLIM.individueelMKB.toLocaleString("nl-NL"), "individuele MKB-aanvragen", "b"],
              [STATE_OF_SLIM.samenwerkingsverbanden.toLocaleString("nl-NL"), "samenwerkingsverbanden", "b"],
              [`€${totaleSubsidieM}M`, "totale toegekende subsidie 2020–2024", "g"],
            ].map(([n, lbl, kleur]) => (
              <div key={lbl} className="hp-l-card">
                <div className={`hp-l-num ${kleur}`}>{n}</div>
                <div className="hp-l-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MEEST ONDERBENUTTE CATEGORIE ── */}
      <div style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Strategische inzichten</div>
          <h2 style={s.h2}>De meest onderbenuttige categorie</h2>
          <p style={s.tekst}>
            De analyse onthult een opvallend patroon: terwijl de meeste SLIM-aanvragen zich
            richten op vergelijkbare activiteiten in vergelijkbare sectoren, zijn specifieke
            categorieën structureel onderbezet. Dit biedt concrete kansen voor MKB-ondernemers
            die willen inspelen op arbeidsmarkttransities.
          </p>

          <div style={{ background: "var(--navy)", borderRadius: 14, padding: "32px", marginTop: 28 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 16 }}>
              Meest onderbenut segment — analyse 2020–2024
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
              <div style={{ fontSize: 52, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{STATE_OF_SLIM.conversieProjecten}</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>omscholings- en conversieprojecten</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>van {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} gehonoreerde projecten (0,3%)</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>VAN HET TOTAAL</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "var(--blue-light)" }}>0,3%</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>TREND</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#f87171" }}>−80%</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>dalend t.o.v. 2020</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, margin: 0 }}>
              Het segment omscholing en conversie heeft structureel minder concurrentie bij de loting.
              Voor MKB-ondernemers die willen inspelen op AI-transitie, vergrijzing of sectorverschuivingen
              biedt dit aantoonbaar betere kansen. Vraag ons naar de mogelijkheden voor uw situatie.
            </p>
          </div>
        </div>
      </div>

      {/* ── LOTINGSCIJFERS 2026 ── */}
      <div style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Tijdvak 1 2026 — bron: RVO, 8 mei 2026</div>
          <h2 style={s.h2}>Actuele lotingscijfers 2026</h2>
          <p style={s.tekst}>
            De State of SLIM 2026 combineert historische projectdata (2020–2024) met actuele
            lotingscijfers. Tijdvak 1 2026 toont een toenemende concurrentie én het belang
            van een foutloze aanvraag.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginTop: 24 }}>
            {[
              [LOTING.totaalIngediend.toLocaleString("nl-NL"), "aanvragen ingediend tijdvak 1 2026"],
              [LOTING.afgekeurdVoorLoting, "afgewezen vóór loting — volledig vermijdbaar"],
              [LOTING.inBehandeling, "ingeloot en in behandeling genomen"],
              [`~${LOTING.kansRuw}%`, "effectieve slaagkans per aanvraag"],
            ].map(([n, lbl]) => (
              <div key={lbl} style={{ background: "#f7f9fc", border: "1px solid #e8edf3", borderRadius: 12, padding: "18px", textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: "var(--blue)", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, lineHeight: 1.4 }}>{lbl}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/lotingsuitslagen" style={{ color: "var(--blue)", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              Alle lotingsuitslagen 2024–2026 →
            </Link>
            <Link href="/slim-subsidie/2026" style={{ color: "var(--blue)", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              SLIM-subsidie in 2026 →
            </Link>
          </div>
        </div>
      </div>

      {/* ── DOWNLOAD ── */}
      <div id="download" style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>Gratis whitepaper</div>
          <h2 style={s.h2}>Download de State of SLIM 2026</h2>
          <p style={s.tekst}>
            De volledige whitepaper bevat de sectoranalyse, activiteitenindeling,
            succesformules en sectorbenchmarks op basis van{" "}
            {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} gehonoreerde SLIM-projecten.
            Download gratis na invullen van uw gegevens.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "24px 0 32px", flexWrap: "wrap" }}>
            {[
              "Sectorverdeling gehonoreerde projecten 2020–2024",
              "Activiteitenindeling A/B/C per sector en regio",
              "Onderbenut segment: omscholing en conversie",
              "Lotingskansen per tijdvak — historisch overzicht",
              "Top-10 succesvolle projectformuleringen (geanonimiseerd)",
              "Stappenplan voor een kansrijke aanvraag 2026",
            ].map((punt) => (
              <div key={punt} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "var(--muted)" }}>
                <span style={{ color: "#1a7a4a", fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span>{punt}</span>
              </div>
            ))}
          </div>

          <div style={{ background: "var(--white)", border: "1px solid #e8edf3", borderRadius: 16, padding: "32px", maxWidth: 560 }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: "var(--navy)", marginBottom: 6 }}>
              State of SLIM 2026 — gratis PDF
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 24 }}>
              NLP/AI-analyse van {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} RVO-projecten (2020–2024) ·{" "}
              {Math.round(STATE_OF_SLIM.totaleSubsidie / 1000000)} pagina&apos;s datagedreven inzichten
            </div>
            <WhitepaperForm />
          </div>
        </div>
      </div>

      {/* ── INTERNE LINKS ── */}
      <div style={{ background: "var(--white)", padding: "40px 20px" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <div style={{ fontWeight: 700, color: "var(--navy)", fontSize: 14, marginBottom: 16 }}>Meer lezen</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/slim-subsidie/sectoren" style={{ background: "#f7f9fc", border: "1px solid #e8edf3", borderRadius: 8, padding: "10px 16px", fontSize: 14, fontWeight: 600, color: "var(--blue)", textDecoration: "none" }}>
              Sectorbenchmark →
            </Link>
            <Link href="/slim-subsidie/voorwaarden" style={{ background: "#f7f9fc", border: "1px solid #e8edf3", borderRadius: 8, padding: "10px 16px", fontSize: 14, fontWeight: 600, color: "var(--blue)", textDecoration: "none" }}>
              Voorwaarden 2026 →
            </Link>
            <Link href="/slim-subsidie/aanvragen" style={{ background: "#f7f9fc", border: "1px solid #e8edf3", borderRadius: 8, padding: "10px 16px", fontSize: 14, fontWeight: 600, color: "var(--blue)", textDecoration: "none" }}>
              Stappenplan aanvragen →
            </Link>
            <Link href="/slim-subsidie/2026" style={{ background: "#f7f9fc", border: "1px solid #e8edf3", borderRadius: 8, padding: "10px 16px", fontSize: 14, fontWeight: 600, color: "var(--blue)", textDecoration: "none" }}>
              SLIM-subsidie 2026 →
            </Link>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="hp-cta-section">
        <div className="hp-si">
          <div className="hp-slbl" style={{ color: "var(--blue-light)", textAlign: "center" }}>Tijdvak 2 2026 — opening 10 augustus</div>
          <h2 className="hp-cta-title">Zet de data om in actie</h2>
          <p className="hp-cta-sub">
            Doe de gratis quickscan en weet binnen 2 minuten of uw bedrijf in aanmerking komt.
            Wij combineren onze datakennis met uw situatie voor een kansrijke aanvraag.
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
          Bronnen: State of SLIM 2026, SLIM Subsidie Advies — NLP/AI-analyse{" "}
          {STATE_OF_SLIM.totaalProjecten.toLocaleString("nl-NL")} RVO-projecten 2020–2024 ·{" "}
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
