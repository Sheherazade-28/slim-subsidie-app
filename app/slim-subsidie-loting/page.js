import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import FAQAccordeon from "@/components/ui/FAQAccordeon";
import { SUBSIDIE, PRICING, LOTING, BUDGET_2026 } from "@/data/slim-content";

export const metadata = {
  title: "SLIM-subsidie loting 2026 — Hoe werkt het en wat zijn uw kansen?",
  description:
    "Hoe werkt de SLIM-subsidie loting? Lotingscijfers tijdvak 1 2026, verschil tussen inloting en toekenning, tips voor een kansrijke aanvraag. Tijdvak 2: 10 augustus 2026.",
  alternates: {
    canonical: "https://www.slimsubsidieadvies.nl/slim-subsidie-loting",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoe werkt de SLIM-subsidie loting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Na sluiting van het tijdvak bepaalt een notariële loting de behandelvolgorde. De loting is aselect — elk moment van indiening binnen het tijdvak heeft een gelijke kans.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is het verschil tussen inloting en toekenning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Inloting betekent dat uw aanvraag voor inhoudelijke beoordeling in aanmerking komt. Toekenning betekent dat RVO uw aanvraag heeft goedgekeurd en de subsidie verleent.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe groot is mijn kans op inloting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `In tijdvak 1 2026 werd ~${LOTING.kansRuw}% van de aanvragen ingeloot (${LOTING.inBehandeling} van ${LOTING.totaalIngediend.toLocaleString("nl-NL")}). De exacte kans hangt af van het totaal aantal ingediende aanvragen per tijdvak.`,
      },
    },
    {
      "@type": "Question",
      name: "Geeft vroeg indienen een voordeel bij de SLIM-loting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee. De loting is aselect. Het moment van indiening binnen het tijdvak heeft geen invloed. Wat telt: een complete, foutloze aanvraag bij sluiting.",
      },
    },
    {
      "@type": "Question",
      name: "Wat gebeurt er als ik niet word ingeloot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "U ontvangt een afwijzingsbeschikking. U kunt in het volgende tijdvak opnieuw indienen. Wij dienen uw aanvraag kosteloos opnieuw in totdat u ingeloot wordt.",
      },
    },
    {
      "@type": "Question",
      name: "Wanneer weet ik of ik ingeloot ben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RVO communiceert de lotingsuitslag na sluiting van het tijdvak. De beschikking volgt binnen 13 weken na sluiting.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe werkt de loting voor samenwerkingsverbanden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Per 31 maart 2026 geldt ook voor samenwerkingsverbanden een lotingssysteem (gewijzigd van volgorde van binnenkomst). Bron: stcrt-2026-13249.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik bezwaar maken tegen de lotingsuitslag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De loting is een administratieve procedure. Bezwaar tegen de uitkomst van een aselect lotingsproces is in de regel niet mogelijk. Wel kunt u bezwaar maken tegen een inhoudelijke afwijzing na inloting.",
      },
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: "Hoe werkt de SLIM-subsidie loting?",
    a: "Na sluiting van het tijdvak bepaalt een notariële loting de behandelvolgorde. De loting is aselect — elk moment van indiening binnen het tijdvak heeft een gelijke kans.",
  },
  {
    q: "Wat is het verschil tussen inloting en toekenning?",
    a: "Inloting betekent dat uw aanvraag voor inhoudelijke beoordeling in aanmerking komt. Toekenning betekent dat RVO uw aanvraag heeft goedgekeurd en de subsidie verleent.",
  },
  {
    q: "Hoe groot is mijn kans op inloting?",
    a: `In tijdvak 1 2026 werd ~${LOTING.kansRuw}% van de aanvragen ingeloot (${LOTING.inBehandeling} van ${LOTING.totaalIngediend.toLocaleString("nl-NL")}). De exacte kans hangt af van het totaal aantal ingediende aanvragen per tijdvak.`,
  },
  {
    q: "Geeft vroeg indienen een voordeel?",
    a: "Nee. De loting is aselect. Het moment van indiening binnen het tijdvak heeft geen invloed. Wat telt: een complete, foutloze aanvraag bij sluiting.",
  },
  {
    q: "Wat gebeurt er als ik niet word ingeloot?",
    a: "U ontvangt een afwijzingsbeschikking. U kunt in het volgende tijdvak opnieuw indienen. Wij dienen uw aanvraag kosteloos opnieuw in totdat u ingeloot wordt.",
  },
  {
    q: "Wanneer weet ik of ik ingeloot ben?",
    a: "RVO communiceert de lotingsuitslag na sluiting van het tijdvak. De beschikking volgt binnen 13 weken na sluiting.",
  },
  {
    q: "Hoe werkt de loting voor samenwerkingsverbanden?",
    a: "Per 31 maart 2026 geldt ook voor samenwerkingsverbanden een lotingssysteem (gewijzigd van volgorde van binnenkomst). Bron: stcrt-2026-13249.",
  },
  {
    q: "Kan ik bezwaar maken tegen de lotingsuitslag?",
    a: "De loting is een administratieve procedure. Bezwaar tegen de uitkomst van een aselect lotingsproces is in de regel niet mogelijk. Wel kunt u bezwaar maken tegen een inhoudelijke afwijzing na inloting.",
  },
];

const MISVERSTANDEN = [
  {
    stelling: "\"Vroeg indienen vergroot mijn kans\"",
    uitleg: "De loting is aselect. Het moment van indiening binnen het tijdvak heeft geen invloed op uw lotingskans. Wat wél telt: een complete, foutloze aanvraag.",
  },
  {
    stelling: "\"Inloting betekent dat ik de subsidie krijg\"",
    uitleg: "Inloting betekent dat uw aanvraag inhoudelijk wordt beoordeeld. RVO kan de aanvraag alsnog afwijzen als deze niet aan de inhoudelijke voorwaarden voldoet.",
  },
  {
    stelling: "\"Als ik niet ingeloot word, kan ik het opgeven\"",
    uitleg: "U kunt in elk volgend tijdvak opnieuw indienen. Wij actualiseren uw aanvraag en dienen kosteloos opnieuw in totdat u ingeloot wordt.",
  },
  {
    stelling: "\"Een betere aanvraag vergroot mijn inlotkans\"",
    uitleg: "Onjuist voor de loting zelf — die is aselect. Wél waar: een betere aanvraag vergroot de kans op toekenning ná inloting.",
  },
  {
    stelling: "\"Samenwerkingsverbanden worden op volgorde van binnenkomst behandeld\"",
    uitleg: "Niet meer. Per 31 maart 2026 geldt ook voor samenwerkingsverbanden een lotingssysteem. Bron: stcrt-2026-13249.",
  },
];

const s = {
  sectie: { padding: "56px 20px" },
  inner: { maxWidth: 860, margin: "0 auto" },
  slbl: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    color: "var(--blue)",
    marginBottom: 8,
  },
  h2: {
    fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
    fontWeight: 800,
    color: "var(--navy)",
    marginBottom: 20,
    marginTop: 0,
  },
  tekst: { fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 16 },
};

const barPct = Math.round((LOTING.inBehandeling / LOTING.totaalIngediend) * 100);

export default function SlimSubsidieLotingPage() {
  return (
    <div className="hp">
      <Navigation />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ── */}
      <div className="hp-hero" style={{ paddingBottom: 40 }}>
        <div className="hp-hero-inner" style={{ gridTemplateColumns: "1fr", maxWidth: 760 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 10 }}>
              LOTINGSPROCEDURE
            </div>
            <h1 className="hp-h1" style={{ marginBottom: 16 }}>
              Hoe werkt de SLIM-subsidie loting?
            </h1>
            <p className="hp-sub" style={{ maxWidth: 620, marginBottom: 28 }}>
              Bij overintekening bepaalt een notariële loting de behandelvolgorde van aanvragen.
              In tijdvak 1 2026 werd slechts ~{LOTING.kansRuw}% van de aanvragen ingeloot. Hier
              leest u precies hoe de loting werkt en hoe u uw kansen maximaliseert.
            </p>
            <div className="hp-ctas">
              <Link href="/quickscan" className="hp-btn-p">Doe de gratis quickscan →</Link>
              <Link href="/slim-subsidie-aanvragen" className="hp-btn-s">Bekijk het aanvraagproces →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── 1. WAT IS DE LOTING ── */}
      <div id="wat-is-loting" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>ACHTERGROND</div>
          <h2 style={s.h2}>Wat is de SLIM-subsidie loting?</h2>

          <p style={s.tekst}>
            De SLIM-subsidie wordt verdeeld via gesloten aanvraagtijdvakken. Wanneer meer ondernemers
            aanvragen dan het beschikbare budget toelaat, bepaalt een notariële loting welke aanvragen
            inhoudelijk worden beoordeeld. De loting is aselect — elke aanvraag heeft een gelijke kans,
            ongeacht het moment van indiening binnen het tijdvak.
          </p>
          <p style={{ ...s.tekst, marginBottom: 28 }}>
            Inloting is een noodzakelijke voorwaarde om een inhoudelijke beoordeling te krijgen — geen
            garantie op toekenning. Na inloting beoordeelt RVO de aanvraag inhoudelijk. Pas na een
            positieve beoordeling volgt een subsidiebeschikking.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {[
              {
                term: "Inloting",
                kleur: "#2563eb",
                bg: "#eff6ff",
                border: "#bfdbfe",
                tekst: "Uw aanvraag wordt geselecteerd voor inhoudelijke beoordeling. RVO beoordeelt daarna of uw aanvraag voldoet aan de voorwaarden.",
              },
              {
                term: "Toekenning",
                kleur: "#16a34a",
                bg: "#f0fdf4",
                border: "#bbf7d0",
                tekst: `RVO heeft uw aanvraag inhoudelijk goedgekeurd en verleent de subsidie. U ontvangt binnen 6 weken ${SUBSIDIE.voorschot * 100}% voorschot.`,
              },
            ].map(({ term, kleur, bg, border, tekst }) => (
              <div key={term} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: "20px 22px" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: kleur, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>
                  {term}
                </div>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. LOTINGSCIJFERS ── */}
      <div id="cijfers" style={{ background: "var(--navy)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--blue-light)", marginBottom: 8 }}>
            STATE OF SLIM 2026 — DATA
          </div>
          <h2 style={{ ...s.h2, color: "#fff" }}>Wat zeggen de lotingscijfers?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: 28 }}>
            Op basis van openbare RVO-data en NLP-analyse van {(6208).toLocaleString("nl-NL")} gehonoreerde SLIM-projecten (2020–2024).
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 28 }}>
            {[
              [LOTING.totaalIngediend.toLocaleString("nl-NL"), "aanvragen ingediend tijdvak 1 2026", "var(--blue-light)"],
              [LOTING.inLoting.toLocaleString("nl-NL"), "in notariële loting", "rgba(255,255,255,0.75)"],
              [LOTING.afgekeurdVoorLoting, "afgewezen vóór loting door fouten", "#ff8080"],
              [LOTING.inBehandeling, "in behandeling genomen", "#60e0a0"],
              [`~${LOTING.kansRuw}%`, "effectieve slaagkans tijdvak 1 2026", "#fbbf24"],
            ].map(([num, lbl, clr]) => (
              <div key={lbl} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "18px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: clr, lineHeight: 1.1, marginBottom: 6 }}>{num}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>{lbl}</div>
              </div>
            ))}
          </div>

          {/* Voortgangsbalk */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>
              <span>In behandeling ({LOTING.inBehandeling})</span>
              <span>Niet in behandeling ({LOTING.totaalIngediend - LOTING.inBehandeling})</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 6, height: 10, overflow: "hidden" }}>
              <div style={{ width: `${barPct}%`, height: "100%", background: "#60e0a0", borderRadius: 6 }} />
            </div>
          </div>

          <div style={{ background: "rgba(255,100,100,0.15)", border: "1px solid rgba(255,100,100,0.3)", borderRadius: 10, padding: "16px 20px", marginBottom: 28 }}>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "#ff8080" }}>Let op:</strong> {LOTING.afgekeurdVoorLoting} aanvragen werden vóór de loting afgekeurd
              door vermijdbare fouten. Dit is volledig te voorkomen met een correcte en complete aanvraag.
            </p>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--blue-light)", marginBottom: 8 }}>
              Budget tijdvak 2 2026
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, margin: 0 }}>
              Voor tijdvak 2 2026 is €25 miljoen beschikbaar voor individuele MKB-aanvragen. Op basis
              van tijdvak 1 verwachten wij opnieuw een overintekening van meer dan 600%.
            </p>
          </div>
        </div>
      </div>

      {/* ── 3. PROCEDURE ── */}
      <div id="procedure" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>PROCEDURE</div>
          <h2 style={s.h2}>Hoe verloopt de loting stap voor stap?</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 28 }}>
            {[
              {
                nr: "1",
                titel: "Tijdvak sluit",
                tekst: "Op de sluitingsdatum (tijdvak 2: 7 september 2026 om 17:00) worden alle ingediende aanvragen verzameld. Aanvragen die na de sluiting nog worden aangevuld, komen achteraan in de lotingsvolgorde.",
              },
              {
                nr: "2",
                titel: "Notariële loting",
                tekst: "Een notaris voert de loting uit. De loting is volledig aselect — vroeg indienen binnen het tijdvak geeft geen voordeel. Elke complete aanvraag heeft een gelijke kans.",
              },
              {
                nr: "3",
                titel: "Inloting of niet",
                tekst: "Ingelote aanvragen gaan door naar inhoudelijke beoordeling door RVO. Niet-ingelote aanvragen ontvangen een afwijzingsbeschikking. U kunt in het volgende tijdvak opnieuw indienen.",
              },
              {
                nr: "4",
                titel: "Inhoudelijke beoordeling",
                tekst: `RVO beoordeelt uw aanvraag inhoudelijk binnen 13 weken na sluiting van het tijdvak. Bij toekenning ontvangt u binnen 6 weken ${SUBSIDIE.voorschot * 100}% voorschot.`,
              },
            ].map((stap, i, arr) => (
              <div key={stap.nr} style={{ display: "flex", gap: 24, paddingBottom: i < arr.length - 1 ? 32 : 0, position: "relative" }}>
                {i < arr.length - 1 && (
                  <div style={{ position: "absolute", left: 19, top: 40, bottom: 0, width: 2, background: "#e8edf3" }} />
                )}
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--navy)", color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1, position: "relative" }}>
                  {stap.nr}
                </div>
                <div style={{ paddingTop: 8 }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{stap.titel}</div>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>{stap.tekst}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. MISVERSTANDEN ── */}
      <div id="misverstanden" style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>VEEL ONDERNEMERS BEGRIJPEN DIT VERKEERD</div>
          <h2 style={s.h2}>5 misverstanden over de SLIM-subsidie loting</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginTop: 8 }}>
            {MISVERSTANDEN.map((item, i) => (
              <div key={i} style={{ background: "var(--white)", border: "1px solid #e8edf3", borderLeft: "4px solid var(--navy)", borderRadius: 10, padding: "20px 22px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 6 }}>
                  Misverstand {i + 1}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)", marginBottom: 10, fontStyle: "italic" }}>
                  {item.stelling}
                </div>
                <div style={{ fontSize: 13, color: "#16a34a", fontWeight: 700, marginBottom: 6 }}>✓ De werkelijkheid:</div>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{item.uitleg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA-BLOK ── */}
      <div style={{ background: "#e8f4fc", padding: "48px 20px", borderTop: "1px solid #c7d9f5", borderBottom: "1px solid #c7d9f5" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 800, color: "var(--navy)", marginBottom: 10, marginTop: 0 }}>
            Niet ingeloot? Wij dienen opnieuw in
          </h2>
          <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 24, lineHeight: 1.7, maxWidth: 560, marginInline: "auto" }}>
            Wordt uw aanvraag niet ingeloot, dan actualiseren wij alle benodigde documenten en dienen
            uw aanvraag in het volgende tijdvak opnieuw in. Kosteloos, totdat u ingeloot wordt.
          </p>
          <Link href="/quickscan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>
            Doe eerst de gratis quickscan →
          </Link>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 14, marginBottom: 0 }}>
            Gratis quickscan · Reserveringsfee €{PRICING.reserveringsfee} excl. btw · Succesfee
            €{PRICING.succesfee.toLocaleString("nl-NL")} excl. btw — no cure, no pay
          </p>
        </div>
      </div>

      {/* ── 5. FAQ ── */}
      <div id="faq" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>VEELGESTELDE VRAGEN</div>
          <h2 style={s.h2}>FAQ — SLIM-subsidie loting</h2>
          <FAQAccordeon items={FAQ_ITEMS} />

          <div style={{ marginTop: 24 }}>
            <Link href="/lotingsuitslagen" style={{ fontSize: 14, fontWeight: 600, color: "var(--blue)", textDecoration: "none" }}>
              Bekijk alle lotingsuitslagen 2024–2026 →
            </Link>
          </div>
        </div>
      </div>

      {/* ── SLOTSECTIE ── */}
      <div className="hp-cta-section">
        <div className="hp-cta-inner">
          <div className="hp-cta-label">TIJDVAK 2 OPENT 10 AUGUSTUS 2026</div>
          <h2 className="hp-cta-title">Bereid uw aanvraag voor</h2>
          <p className="hp-cta-sub">
            Begin minimaal 4 weken vóór de sluiting. Doe eerst de gratis quickscan en weet binnen
            2 minuten of uw bedrijf in aanmerking komt.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/quickscan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>
              Doe de gratis quickscan →
            </Link>
          </div>
          <p className="hp-cta-note">
            Gratis quickscan · Reserveringsfee €{PRICING.reserveringsfee} excl. btw · Succesfee
            €{PRICING.succesfee.toLocaleString("nl-NL")} excl. btw — no cure, no pay
          </p>
        </div>
      </div>

      {/* ── BRONVERMELDING ── */}
      <div style={{ background: "var(--navy)", padding: "20px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
          Bronnen: wetten.overheid.nl/BWBR0043015/2025-07-05 · uitvoeringvanbeleidszw.nl · RVO lotingsuitslag tijdvak 1 2026 · stcrt-2026-13249
        </div>
      </div>
    </div>
  );
}
