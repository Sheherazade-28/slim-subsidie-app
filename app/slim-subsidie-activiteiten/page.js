import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import { SUBSIDIE, PRICING, BEDRIJFSINFO } from "@/data/slim-content";

export const metadata = {
  title: "SLIM-subsidie activiteiten 2026 — A, B en C uitgelegd",
  description:
    "Welke activiteiten komen in aanmerking voor SLIM-subsidie? Activiteit A (doorlichting), B (loopbaanadviezen) en C (L&O-methode) uitgelegd met voorwaarden en voorbeelden.",
  alternates: {
    canonical: "https://www.slimsubsidieadvies.nl/slim-subsidie-activiteiten",
  },
};

function fmtEur(n) {
  return `€${n.toLocaleString("nl-NL")}`;
}

const faqItems = [
  {
    q: "Kan ik meerdere activiteiten combineren?",
    a: `Ja. U kunt Activiteit A, B en C combineren in één aanvraag (art. 2.8 lid 5). Het maximum van tot ${fmtEur(SUBSIDIE.maxBedrag)} geldt voor de gecombineerde aanvraag.`,
  },
  {
    q: "Wat is het verschil tussen Activiteit A en C?",
    a: "Activiteit A levert een diagnose op: een opleidings- of ontwikkelplan. Activiteit C gaat een stap verder: de daadwerkelijke implementatie van een structurele leer- en ontwikkelmethode.",
  },
  {
    q: "Moet mijn adviseur gecertificeerd zijn?",
    a: `Voor Activiteit B is een Noloc-gecertificeerde loopbaanadviseur (of gelijkwaardig: HBO+, min. 3 jaar ervaring) verplicht. Voor Activiteit A en C geldt een maximumuurtarief van €${SUBSIDIE.maxUurtarief} excl. btw maar geen specifieke certificering.`,
  },
  {
    q: "Wat is de minimale subsidie?",
    a: `Voor Activiteit A en C geldt een minimale subsidie van ${fmtEur(SUBSIDIE.minSubsidie)}, wat neerkomt op een benodigde projectomvang van minimaal ${fmtEur(SUBSIDIE.minProjectomvang)}. Voor Activiteit B geldt geen minimum — de vergoeding is ${fmtEur(SUBSIDIE.loopbaanVergoeding)} per afgerond traject.`,
  },
  {
    q: "Bestaat Activiteit D nog?",
    a: "Nee. Activiteit D (praktijkleerplaats voor BBL-deelnemers) is per 2025 afgeschaft. Aanvragen met Activiteit D worden niet gehonoreerd.",
  },
  {
    q: "Is een e-learningcursus subsidiabel?",
    a: "Het ontwikkelen van een e-learningprogramma op maat valt onder Activiteit C (leerrijke werkomgeving). Het inkopen van een bestaande cursus is niet subsidiabel — de SLIM-subsidie is voor het ontwikkelen van structuren die leren mogelijk maken, niet voor individuele trainingen.",
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
  label: { fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 },
};

export default function SlimSubsidieActiviteitenPage() {
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
          <div style={{ ...s.slbl, color: "var(--blue-light)" }}>SUBSIDIABELE ACTIVITEITEN</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginTop: 0, marginBottom: 16 }}>
            Welke activiteiten komen in aanmerking<br />voor SLIM-subsidie?
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 640, marginBottom: 28 }}>
            De SLIM-regeling kent drie subsidiabele activiteiten. U kunt één activiteit aanvragen of meerdere combineren in één aanvraag. Het maximale subsidiebedrag van tot {fmtEur(SUBSIDIE.maxBedrag)} geldt voor de gecombineerde aanvraag (art. 2.8 lid 5 SLIM-regeling).
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/quickscan" className="hp-btn-p">Doe de gratis quickscan →</Link>
            <Link href="/slim-subsidie-aanvragen" className="hp-btn-s">Bekijk het aanvraagproces →</Link>
          </div>
        </div>
      </div>

      {/* ── SECTIE 1: OVERZICHT ── */}
      <div id="overzicht" style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>DRIE ACTIVITEITEN</div>
          <h2 style={s.h2}>Kies de activiteit die bij uw organisatie past</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 24 }}>
            {[
              {
                letter: "A",
                titel: "Doorlichting van de onderneming",
                tekst: "Breng de ontwikkelbehoefte van uw organisatie in kaart. Resultaat: een concreet opleidings- of ontwikkelplan.",
                sub: `Subsidie: tot ${fmtEur(SUBSIDIE.maxBedrag)} · Minimaal: ${fmtEur(SUBSIDIE.minSubsidie)}`,
                href: "#activiteit-a",
              },
              {
                letter: "B",
                titel: "Loopbaan- en ontwikkeladviezen",
                tekst: "Individuele loopbaan- of ontwikkeladviezen voor werknemers via een gecertificeerde adviseur.",
                sub: `Subsidie: ${fmtEur(SUBSIDIE.loopbaanVergoeding)} per traject · Geen minimum`,
                href: "#activiteit-b",
              },
              {
                letter: "C",
                titel: "L&O-methode",
                tekst: "Ontwikkel of implementeer een structurele methode die leren en ontwikkelen verankert in uw organisatie.",
                sub: `Subsidie: tot ${fmtEur(SUBSIDIE.maxBedrag)} · Minimaal: ${fmtEur(SUBSIDIE.minSubsidie)}`,
                href: "#activiteit-c",
              },
            ].map(({ letter, titel, tekst, sub, href }) => (
              <div key={letter} style={{ background: "var(--white)", border: "1px solid var(--border-l)", borderRadius: "var(--r)", padding: "24px 20px", display: "flex", flexDirection: "column" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--navy)", color: "var(--blue-light)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, flexShrink: 0 }}>
                  {letter}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--navy)", marginBottom: 8 }}>Activiteit {letter} — {titel}</div>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: "0 0 12px", flex: 1 }}>{tekst}</p>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--blue)", marginBottom: 14 }}>{sub}</div>
                <a href={href} style={{ fontSize: 13, color: "var(--navy)", fontWeight: 600, textDecoration: "none" }}>Lees meer ↓</a>
              </div>
            ))}
          </div>
          <div style={{ background: "#e8f4fc", border: "1px solid #c7d9f5", borderRadius: "var(--rs)", padding: "14px 18px", fontSize: 13, color: "var(--navy)", lineHeight: 1.6 }}>
            <strong>Tip:</strong> Combinaties zijn mogelijk. U kunt bijvoorbeeld Activiteit A + C combineren in één aanvraag. Het maximum van tot {fmtEur(SUBSIDIE.maxBedrag)} geldt dan voor de gecombineerde aanvraag.
          </div>
        </div>
      </div>

      {/* ── SECTIE 2: ACTIVITEIT A ── */}
      <div id="activiteit-a" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>ACTIVITEIT A</div>
          <h2 style={s.h2}>Doorlichting van de onderneming</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
            <div>
              <p style={s.tekst}>
                Een externe adviseur analyseert uw organisatie en brengt de ontwikkelbehoefte in kaart. De adviseur stelt een concreet opleidings- en ontwikkelplan op maat op.
              </p>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, marginBottom: 16 }}>
                <strong style={{ color: "var(--text)" }}>Waarom:</strong> Veranderingen op de arbeidsmarkt — digitalisering, robotisering, toenemende concurrentie op talent — vragen om periodieke heroriëntatie op kennis en vaardigheden van uw medewerkers.
              </p>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, marginBottom: 16 }}>
                <strong style={{ color: "var(--text)" }}>Eindproduct:</strong> Opleidings- of ontwikkelplan (verplicht als bijlage bij aanvraag)
              </p>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", marginBottom: 10 }}>Concrete voorbeelden:</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "var(--muted)", lineHeight: 1.8 }}>
                <li>Leercultuurscan door externe HR-adviseur</li>
                <li>Strategische personeelsplanning gekoppeld aan bedrijfsontwikkeling</li>
                <li>Analyse van digitaliserings- of robotiseringsimpact op functies</li>
                <li>HR-strategie voor toekomstbestendige organisatie</li>
              </ul>
            </div>
            <div style={{ background: "var(--off)", border: "1px solid var(--border-l)", borderRadius: "var(--r)", padding: "22px 20px" }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--blue)", marginBottom: 16 }}>Subsidievoorwaarden</div>
              {[
                ["Minimale subsidie", fmtEur(SUBSIDIE.minSubsidie)],
                ["Benodigde projectomvang", `vanaf ${fmtEur(SUBSIDIE.minProjectomvang)}`],
                ["Max. uurtarief adviseur", `€${SUBSIDIE.maxUurtarief} excl. btw`],
                ["Wettelijke basis", "art. 2.4 lid 1a SLIM-regeling"],
              ].map(([lbl, val]) => (
                <div key={lbl} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid var(--border-l)", gap: 12 }}>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{lbl}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", textAlign: "right" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTIE 3: ACTIVITEIT B ── */}
      <div id="activiteit-b" style={{ background: "var(--off)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>ACTIVITEIT B</div>
          <h2 style={s.h2}>Loopbaan- en ontwikkeladviezen voor werknemers</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
            <div>
              <p style={s.tekst}>
                Medewerkers ontvangen individueel loopbaan- of ontwikkeladvies van een gecertificeerde adviseur. Per afgerond traject ontvangt u {fmtEur(SUBSIDIE.loopbaanVergoeding)} subsidie — ongeacht de daadwerkelijke kosten van de adviseur.
              </p>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, marginBottom: 16 }}>
                <strong style={{ color: "var(--text)" }}>Waarom:</strong> Inzicht in wensen en ambities helpt bij het vitaal houden van personeel, strategische planning en het voorkomen van uitstroom.
              </p>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, marginBottom: 16 }}>
                <strong style={{ color: "var(--text)" }}>Eindproduct:</strong> Tweezijdig getekende prestatieverklaring per deelnemer
              </p>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", marginBottom: 10 }}>Concrete voorbeelden:</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "var(--muted)", lineHeight: 1.8 }}>
                <li>POP-traject (Persoonlijk Ontwikkelplan)</li>
                <li>Loopbaangesprekken bij reorganisatie of functiewijziging</li>
                <li>Talentassessment gekoppeld aan doorgroeipad</li>
                <li>Outplacement-voorbereiding voor medewerkers</li>
              </ul>
            </div>
            <div>
              <div style={{ background: "var(--white)", border: "1px solid var(--border-l)", borderRadius: "var(--r)", padding: "22px 20px", marginBottom: 16 }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--blue)", marginBottom: 16 }}>Subsidievoorwaarden</div>
                {[
                  ["Vaste vergoeding", `${fmtEur(SUBSIDIE.loopbaanVergoeding)} per afgerond traject`],
                  ["Minimale gespreksduur", "4 uur per deelnemer (individueel)"],
                  ["Vereiste adviseur", "Noloc Register Loopbaanprofessional of gelijkwaardig (HBO+, min. 3 jaar ervaring)"],
                  ["Minimale projectomvang", "Geen"],
                  ["Wettelijke basis", "art. 2.4 lid 1b + art. 2.5 SLIM-regeling"],
                ].map(([lbl, val]) => (
                  <div key={lbl} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid var(--border-l)", gap: 12 }}>
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>{lbl}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", textAlign: "right", maxWidth: "55%" }}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "var(--green-l)", border: "1px solid var(--green-b)", borderRadius: "var(--rs)", padding: "14px 16px", fontSize: 13, color: "var(--green)", lineHeight: 1.6 }}>
                <strong>Activiteit B</strong> is de enige activiteit zonder minimale projectomvang. Ook een kleine organisatie met een beperkt budget kan hiermee subsidie aanvragen.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTIE 4: ACTIVITEIT C ── */}
      <div id="activiteit-c" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>ACTIVITEIT C</div>
          <h2 style={s.h2}>Ontwikkelen of invoeren van een L&O-methode</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
            <div>
              <p style={s.tekst}>
                Implementeer een structurele methode die leren en ontwikkelen verankert in uw organisatie. Activiteit C kent drie subcategorieën die ook gecombineerd kunnen worden binnen één aanvraag.
              </p>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, marginBottom: 20 }}>
                <strong style={{ color: "var(--text)" }}>Waarom:</strong> Een leerrijke werkomgeving trekt talent aan, bindt medewerkers en maakt uw organisatie wendbaarder voor toekomstige veranderingen.
              </p>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, marginBottom: 20 }}>
                <strong style={{ color: "var(--text)" }}>Eindproduct:</strong> Documentatie van de gerealiseerde methode (verplicht als bijlage)
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  {
                    nr: "C1",
                    titel: "Systeem van periodieke ontwikkelgesprekken",
                    items: [
                      "Ontwikkelen en invoeren van gestructureerde ontwikkelgesprekken",
                      "Training van leidinggevenden in het voeren van ontwikkelgesprekken",
                    ],
                  },
                  {
                    nr: "C2",
                    titel: "Leerrijke werkomgeving",
                    items: [
                      "Ontwikkelen van een e-learning programma op maat",
                      "Opzetten van een digitaal kennis- en leerportaal",
                      "Introductie van leerambassadeurs",
                      "Implementeren van taakroulatie of taakverbreding",
                    ],
                  },
                  {
                    nr: "C3",
                    titel: "Bedrijfsschool",
                    items: [
                      "Aansluiten bij een bestaande bedrijfsschool",
                      "Oprichten van een eigen bedrijfsschool",
                      "Combineren van leren en werken",
                    ],
                  },
                ].map(({ nr, titel, items }) => (
                  <div key={nr} style={{ background: "var(--off)", border: "1px solid var(--border-l)", borderRadius: "var(--rs)", padding: "14px 16px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", color: "var(--blue)", textTransform: "uppercase", marginBottom: 4 }}>Subcategorie {nr}</div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "var(--navy)", marginBottom: 8 }}>{titel}</div>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>
                      {items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "var(--off)", border: "1px solid var(--border-l)", borderRadius: "var(--r)", padding: "22px 20px", marginBottom: 16 }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--blue)", marginBottom: 16 }}>Subsidievoorwaarden</div>
                {[
                  ["Minimale subsidie", fmtEur(SUBSIDIE.minSubsidie)],
                  ["Benodigde projectomvang", `vanaf ${fmtEur(SUBSIDIE.minProjectomvang)}`],
                  ["Max. uurtarief adviseur", `€${SUBSIDIE.maxUurtarief} excl. btw`],
                  ["Combinaties", "Mogelijk binnen één aanvraag"],
                  ["Wettelijke basis", "art. 2.4 lid 1c SLIM-regeling"],
                ].map(([lbl, val]) => (
                  <div key={lbl} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid var(--border-l)", gap: 12 }}>
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>{lbl}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", textAlign: "right", maxWidth: "55%" }}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "var(--orange-l)", border: "1px solid var(--orange-b)", borderRadius: "var(--rs)", padding: "14px 16px", fontSize: 13, color: "var(--orange)", lineHeight: 1.65 }}>
                <strong>Niet subsidiabel als L&O-methode</strong> (wel als ondersteuning): DISC-analyse, Profile Dynamics, Baarda-model, SMART, PDCA, 70-20-10 leermethode, IMWR-cirkel, train-de-trainer.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTIE 5: ACTIVITEIT D WAARSCHUWING ── */}
      <div id="activiteit-d" style={{ background: "var(--off)", padding: "40px 20px" }}>
        <div style={s.inner}>
          <div style={{ background: "var(--orange-l)", border: "1px solid var(--orange-b)", borderRadius: "var(--r)", padding: "20px 24px" }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: "var(--orange)", marginBottom: 10 }}>
              ⚠️ Activiteit D bestaat niet meer
            </div>
            <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.7, margin: 0 }}>
              Activiteit D (praktijkleerplaats voor BBL-deelnemers) is per 2025 afgeschaft en kan niet meer worden aangevraagd. Aanvragen met Activiteit D worden niet gehonoreerd. Adviseurs die Activiteit D nog noemen, werken met verouderde informatie. De subsidiemogelijkheid voor praktijkleerplaatsen loopt nu via de Subsidieregeling Praktijkleren (OCW).
            </p>
          </div>
        </div>
      </div>

      {/* ── SECTIE 6: NIET SUBSIDIABEL ── */}
      <div id="niet-subsidiabel" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>LET OP</div>
          <h2 style={s.h2}>Wat is niet subsidiabel?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "var(--red-l)", border: "1px solid var(--red-b)", borderRadius: "var(--r)", padding: "20px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#7f1d1d", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>Uitgesloten activiteiten</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "var(--text)", lineHeight: 1.9 }}>
                <li>Reguliere opleidingen en cursussen</li>
                <li>Praktijkleerplaatsen (afgeschaft per 2025)</li>
                <li>Projecten gestart vóór de subsidiebeschikking</li>
                <li>Activiteiten uitsluitend gericht op bestuurders of DGA&apos;s</li>
                <li>Coachingstrajecten als losstaande dienst</li>
                <li>Standaard onboarding als losstaand programma</li>
              </ul>
            </div>
            <div style={{ background: "var(--red-l)", border: "1px solid var(--red-b)", borderRadius: "var(--r)", padding: "20px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#7f1d1d", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>Niet-subsidiabele kosten</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "var(--text)", lineHeight: 1.9 }}>
                <li>Loonverletkosten (productiviteitsverlies tijdens activiteiten)</li>
                <li>BTW</li>
                <li>Overhead en huisvestingskosten</li>
                <li>Reguliere kantoorapparatuur of software</li>
                <li>Kosten buiten de initiatiefperiode</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA-BLOK ── */}
      <div style={{ background: "#e8f4fc", padding: "48px 20px", borderTop: "1px solid #c7d9f5", borderBottom: "1px solid #c7d9f5" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.3rem, 2.8vw, 1.8rem)", fontWeight: 800, color: "var(--navy)", marginTop: 0, marginBottom: 10 }}>
            Welke activiteit past bij uw organisatie?
          </h2>
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 24px" }}>
            Doe de gratis quickscan en ontvang een eerste indicatie van de meest kansrijke aanvraagrichting voor uw bedrijf.
          </p>
          <Link href="/quickscan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>
            Start gratis quickscan →
          </Link>
          <p className="hp-cta-note" style={{ marginTop: 16 }}>
            Gratis quickscan · Reserveringsfee {fmtEur(PRICING.reserveringsfee)} excl. btw · Succesfee {fmtEur(PRICING.succesfee)} excl. btw — no cure, no pay
          </p>
        </div>
      </div>

      {/* ── SECTIE 7: FAQ ── */}
      <div id="faq" style={{ background: "var(--white)", ...s.sectie }}>
        <div style={s.inner}>
          <div style={s.slbl}>VEELGESTELDE VRAGEN</div>
          <h2 style={s.h2}>FAQ — SLIM-subsidie activiteiten</h2>
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
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 800, color: "#fff", marginTop: 0, marginBottom: 24 }}>
            Klaar om te ontdekken welke activiteit bij u past?
          </h2>
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
