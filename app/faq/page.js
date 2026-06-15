"use client";

import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Link from "next/link";
import {
  SUBSIDIE,
  PRICING,
  LOTING,
} from "@/data/slim-content";

const CATEGORIEEN = [
  {
    titel: "Algemeen over SLIM",
    vragen: [
      {
        q: "Wat is de SLIM-subsidie?",
        a: "De SLIM-subsidie (Stimuleringsregeling Leren en Ontwikkelen in Mkb-ondernemingen) is een overheidsregeling van het Ministerie van Sociale Zaken en Werkgelegenheid. De regeling vergoedt 60% van uw investering in leren en ontwikkelen, tot €25.000 per aanvraag voor individuele MKB-ondernemingen. Ingevoerd in 2020, actief tot en met 2029. De SLIM-regeling kent ook een variant voor samenwerkingsverbanden van minimaal twee MKB-ondernemingen. Samenwerkingsverbanden kunnen tot €500.000 subsidie aanvragen (tot €200.000 per deelnemende partner), met Activiteit C (L&O-methode) als verplicht onderdeel en een looptijd van maximaal 24 maanden. Het tijdvak voor samenwerkingsverbanden in 2026 liep van 22 juni tot en met 20 juli 2026.",
      },
      {
        q: "Wie voert de SLIM-subsidie uit?",
        a: "De Rijksdienst voor Ondernemend Nederland (RVO) voert de SLIM-subsidie uit namens het Ministerie van Sociale Zaken en Werkgelegenheid. Aanvragen worden ingediend via mijnuitvoeringvanbeleidszw.nl.",
      },
      {
        q: "Tot wanneer is de SLIM-subsidie beschikbaar?",
        a: "De SLIM-regeling loopt tot en met 2029. Er zijn jaarlijks meerdere aanvraagtijdvakken. In 2026 zijn twee tijdvakken voor individueel MKB gepland. Tijdvak 2 opent op 10 augustus 2026 en sluit op 7 september 2026. Voor samenwerkingsverbanden geldt een apart jaarlijks tijdvak in juni. In 2026 liep dit van 22 juni tot en met 20 juli 2026 (gesloten).",
      },
      {
        q: "Wat is het verschil tussen een individuele aanvraag en een samenwerkingsverband?",
        a: "Individuele MKB-aanvragen gaan via loting bij overintekening, met een maximum van tot €25.000 en een looptijd van 12 maanden. Samenwerkingsverbanden van minimaal twee MKB-ondernemingen kunnen tot €500.000 aanvragen (per partner tot €200.000), met een looptijd van 24 maanden. SLIM Subsidie Advies is gespecialiseerd in individuele aanvragen.",
      },
    ],
  },
  {
    titel: "Voorwaarden en doelgroep",
    vragen: [
      {
        q: "Wie kan individuele SLIM-subsidie aanvragen?",
        a: "MKB-ondernemingen met minimaal één werknemer in loondienst, gevestigd en actief in Nederland. De MKB-definitie volgt de EU-norm: minder dan 250 medewerkers én een jaaromzet van maximaal €50 miljoen of een balanstotaal van maximaal €43 miljoen. Grootbedrijven kunnen per 2025 niet meer individueel aanvragen; deelname is uitsluitend mogelijk als partner in een samenwerkingsverband.",
      },
      {
        q: "Ik ben ZZP-er. Kom ik in aanmerking?",
        a: "Nee. De SLIM-subsidie is uitsluitend bedoeld voor ondernemingen met minimaal één werknemer in loondienst. ZZP'ers zonder personeel komen niet in aanmerking. Heeft u als DGA ook werknemers in dienst? Dan kan uw BV mogelijk wel aanvragen.",
      },
      {
        q: "Mijn bedrijf heeft 5 medewerkers. Kom ik in aanmerking?",
        a: "Ja, mits u voldoet aan de overige voorwaarden. De SLIM-subsidie staat open voor alle MKB-ondernemingen met minimaal 1 werknemer in loondienst. Er is geen ondergrens op het aantal medewerkers.",
      },
      {
        q: "Ik heb geen opleidingsbudget. Kan ik dan toch SLIM-subsidie aanvragen?",
        a: "Ja. De SLIM-subsidie is juist bedoeld als drempelverlagende maatregel voor MKB'ers die willen investeren in leren en ontwikkelen. U hoeft niet al een lopend opleidingsprogramma te hebben — u kunt de subsidie aanvragen voor activiteiten die u na toekenning wilt opstarten.",
      },
      {
        q: "Mag een holding of groep van BV's aanvragen?",
        a: "Ja, maar bij verbonden en gelieerde ondernemingen worden alle entiteiten samengeteld voor de MKB-toets. Een holding met meerdere BV's telt als geheel. De subsidiabele activiteiten moeten betrekking hebben op werknemers van de aanvragende entiteit. Per tijdvak mag elke rechtspersoon maximaal één aanvraag indienen.",
      },
      {
        q: "Wie kan SLIM-subsidie aanvragen voor een samenwerkingsverband?",
        a: "Een samenwerkingsverband bestaat uit minimaal twee MKB-ondernemingen. Aanvullend kunnen brancheorganisaties, onderwijsinstellingen, O&O-fondsen en werknemers- of werkgeversverenigingen deelnemen als partner. Activiteit C (L&O-methode) is verplicht onderdeel van elke aanvraag voor een samenwerkingsverband. Minimale subsidiabele projectomvang: €210.000. Grootbedrijven kunnen uitsluitend als partner deelnemen — niet als penvoerder. SLIM Subsidie Advies richt zich primair op individuele MKB-aanvragen; begeleiding bij samenwerkingsverbanden is beschikbaar op aanvraag.",
      },
    ],
  },
  {
    titel: "Subsidiebedrag en kosten",
    vragen: [
      {
        q: "Hoeveel subsidie kan ik krijgen?",
        a: "Individueel MKB: 60% van subsidiabele kosten, tot €25.000 per aanvraag (landbouwbedrijven: tot €20.000). Minimale subsidie voor activiteiten A en C: €5.000 (projectomvang vanaf €8.334). Activiteit B: €700 vaste vergoeding per afgerond loopbaantraject, geen minimumdrempel. Samenwerkingsverbanden: tot €500.000 per aanvraag totaal (maximaal €200.000 per deelnemende partner), eveneens 60% van subsidiabele kosten.",
      },
      {
        q: "Welke kosten zijn subsidiabel?",
        a: "Subsidiabel zijn: externe advieskosten (max. €135 per uur excl. btw), interne loonkosten van betrokken medewerkers (brutoloon + 32% opslag, op basis van 1.720 werkbare uren per jaar) en een forfaitaire opslag van 15% op bovenstaande kosten. BTW is niet subsidiabel.",
      },
      {
        q: "Welke kosten zijn niet subsidiabel?",
        a: "Niet subsidiabel zijn: reguliere opleidingen en cursussen, loonverletkosten (productiviteitsverlies tijdens activiteiten), BTW, overhead en huisvestingskosten, kantoorapparatuur en software, en kosten buiten de initiatiefperiode. Activiteiten uitsluitend gericht op bestuurders of DGA's zijn ook uitgesloten.",
      },
      {
        q: "Wat kost SLIM-subsidie aanvragen via SLIM Subsidie Advies?",
        a: `De reserveringsfee bedraagt €${PRICING.reserveringsfee} excl. btw. Bij toekenning van de subsidie is een succesfee van €${PRICING.succesfee.toLocaleString("nl-NL")} excl. btw verschuldigd — de reserveringsfee wordt dan verrekend. Wordt u niet ingeloot of afgewezen? Dan betaalt u alleen de reserveringsfee.`,
      },
    ],
  },
  {
    titel: "Activiteiten A, B en C",
    vragen: [
      {
        q: "Welke activiteiten zijn subsidiabel met SLIM-subsidie?",
        a: "De SLIM-regeling kent drie subsidiabele activiteiten: Activiteit A (doorlichting van de onderneming op leerbehoefte), Activiteit B (individuele loopbaan- en ontwikkeladviezen voor werknemers) en Activiteit C (het ontwikkelen of invoeren van een structurele leer- en ontwikkelmethode). Activiteit D (praktijkleerplaatsen voor BBL-deelnemers) is per 2025 afgeschaft.",
      },
      {
        q: "Wat houdt Activiteit A in?",
        a: "Activiteit A financiert het doorlichten van uw organisatie op leerbehoefte door een externe adviseur. De adviseur analyseert uw organisatie en stelt een opleidings- of ontwikkelplan op maat op. Dit plan is verplicht als bijlage bij uw aanvraag. Maximaal uurtarief: €135 excl. btw. Minimale subsidie: €5.000.",
      },
      {
        q: "Wat houdt Activiteit B in?",
        a: "Activiteit B vergoedt individuele loopbaan- of ontwikkeladviezen voor werknemers, uitgevoerd door een gecertificeerde loopbaanadviseur (Noloc Register Loopbaanprofessional of gelijkwaardig: HBO+ en minimaal 3 jaar ervaring). Per afgerond traject van minimaal 4 uur ontvangt u een vaste vergoeding van €700, ongeacht de werkelijke advieskosten. Er is geen minimale projectomvang.",
      },
      {
        q: "Wat houdt Activiteit C in?",
        a: "Activiteit C ondersteunt het structureel inbedden van een leer- en ontwikkelmethode in uw bedrijfsvoering. Er zijn drie subcategorieën: (1) systeem van periodieke ontwikkelgesprekken, (2) leerrijke werkomgeving (e-learning, kennisportaal, leerambassadeurs), (3) bedrijfsschool (aansluiten bij of oprichten). Minimale subsidie: €5.000.",
      },
      {
        q: "Kan ik meerdere activiteiten combineren in één aanvraag?",
        a: "Ja. Een SLIM-subsidieaanvraag kan bestaan uit meerdere activiteiten (art. 2.8 lid 5 SLIM-regeling). U kunt bijvoorbeeld Activiteit A combineren met Activiteit C, of Activiteit B met Activiteit C. Het maximale subsidiebedrag van tot €25.000 geldt voor de gecombineerde aanvraag.",
      },
    ],
  },
  {
    titel: "Loting en toekenning",
    vragen: [
      {
        q: "Wat betekent inloting precies?",
        a: "Wanneer het totale aangevraagde subsidiebedrag het beschikbare budget overschrijdt, bepaalt een notariële loting welke aanvragen in behandeling worden genomen. Inloting is een noodzakelijke voorwaarde om een inhoudelijke beoordeling te krijgen — het is geen garantie op toekenning. Na inloting beoordeelt RVO de aanvraag inhoudelijk.",
      },
      {
        q: "Hoe groot is mijn kans op inloting?",
        a: `In tijdvak 1 van 2026 werden ${LOTING.totaalIngediend.toLocaleString("nl-NL")} aanvragen ingediend. Slechts ${LOTING.inBehandeling} aanvragen werden ingeloot — een effectieve kans van circa ${LOTING.kansRuw}%. De kans varieert per tijdvak afhankelijk van het budget en het aantal ingediende aanvragen. Een complete, foutloze aanvraag is de minimumeis om mee te loten.`,
      },
      {
        q: "Wat gebeurt er na inloting?",
        a: "Individueel MKB: na inloting beoordeelt RVO uw aanvraag inhoudelijk binnen 13 weken. Bij toekenning ontvangt u direct 50% voorschot. Inloting is een noodzakelijke voorwaarde voor inhoudelijke beoordeling — geen garantie op toekenning. Samenwerkingsverbanden: per 31 maart 2026 geldt ook voor samenwerkingsverbanden een lotingssysteem (Staatscourant stcrt-2026-13249). Na inloting volgt inhoudelijke beoordeling door RVO.",
      },
      {
        q: "Kan ik meerdere aanvragen indienen voor dezelfde onderneming in hetzelfde tijdvak?",
        a: "Nee. Per aanvraagtijdvak wordt maximaal één aanvraag per onderneming in behandeling genomen (art. 2.8 lid 4 SLIM-regeling). Een tweede aanvraag in hetzelfde tijdvak wordt geweigerd. Combineer meerdere activiteiten in één aanvraag.",
      },
      {
        q: "Is er een voordeel aan vroeg indienen binnen het tijdvak?",
        a: "Nee. Voor zowel individueel MKB als samenwerkingsverbanden geldt een aselecte loting. Het tijdstip van indiening heeft geen invloed op uw lotkans. Wat wél telt: een complete, foutloze aanvraag — aanvragen met vermijdbare fouten worden al vóór de loting afgekeurd. Per 31 maart 2026 geldt ook voor samenwerkingsverbanden een lotingssysteem (eerder volgorde van binnenkomst).",
      },
    ],
  },
  {
    titel: "Aanvraagproces",
    vragen: [
      {
        q: "Wanneer kan ik SLIM-subsidie aanvragen?",
        a: "Individueel MKB: Tijdvak 1 2026 was 7 april t/m 4 mei 2026 (gesloten). Tijdvak 2 opent 10 augustus 2026 om 09:00 en sluit 7 september 2026 om 17:00. Aanvragen uitsluitend via mijnuitvoeringvanbeleidszw.nl, binnen het openstaande tijdvak. Begin minimaal 4 weken vóór sluiting met de voorbereiding. Samenwerkingsverbanden: in 2026 één tijdvak, van 22 juni t/m 20 juli 2026 (gesloten). Dit tijdvak valt elk jaar in juni.",
      },
      {
        q: "Welke documenten heb ik nodig voor de aanvraag?",
        a: "Alle aanvragers: activiteitenplan (RVO-model), begroting (RVO-model), MKB-verklaring, de-minimisverklaring, kopie bankafschrift. Aanvullend voor samenwerkingsverbanden: samenwerkingsovereenkomst en eventueel een machtigingsformulier (indien penvoerder namens het verband indient). Bij Activiteit A en C: opleidings- of ontwikkelplan als bijlage. Bij Activiteit B: tweezijdig getekende prestatieverklaringen per deelnemer vereist bij vaststelling. Formats via uitvoeringvanbeleidszw.nl onder 'Uitvoeren en verantwoorden'.",
      },
      {
        q: "Hoe dien ik een aanvraag in?",
        a: "Aanvragen worden ingediend via mijnuitvoeringvanbeleidszw.nl, uitsluitend binnen het openstaande tijdvak. U heeft DigiD (eenmanszaak) of eHerkenning niveau 2+ nodig. Er is geen voordeel aan vroeg indienen — de loting is aselect.",
      },
      {
        q: "Mag ik al starten met activiteiten vóór de subsidiebeschikking?",
        a: "Nee. Activiteiten mogen nog niet gestart zijn vóór de datum van de subsidiebeschikking. Kosten gemaakt vóór de beschikking zijn niet subsidiabel en kunnen leiden tot afwijzing. Wacht met starten tot u de beschikking heeft ontvangen.",
      },
      {
        q: "Moet ik na afloop een verantwoording indienen?",
        a: "Individueel MKB: nee, niet standaard. Subsidies tot €25.000 worden ambtshalve vastgesteld — u hoeft geen verzoek tot vaststelling in te dienen en geen financiële administratie bij te houden. RVO voert wel steekproefcontroles uit. Bewaar voor de zekerheid documentatie van uw activiteiten: bij Activiteit A het opleidings- of ontwikkelplan, bij Activiteit B tweezijdig getekende prestatieverklaringen per deelnemer, bij Activiteit C documentatie van de gerealiseerde methode. Samenwerkingsverbanden: altijd een formeel verzoek tot vaststelling indienen na afloop van het project.",
      },
    ],
  },
  {
    titel: "Praktische klantvragen",
    vragen: [
      {
        q: "Wat als ik niet word ingeloot?",
        a: "Niet ingeloot betekent dat uw aanvraag niet in behandeling wordt genomen in dit tijdvak. U kunt opnieuw aanvragen in een volgend tijdvak. SLIM Subsidie Advies actualiseert uw aanvraag kosteloos en dient opnieuw in — totdat u wordt ingeloot.",
      },
      {
        q: "Wat is de looptijd van mijn SLIM-project?",
        a: "Voor individuele MKB-aanvragen geldt een maximale looptijd van 12 maanden, te rekenen vanaf de datum van de subsidiebeschikking. Samenwerkingsverbanden hebben een maximale looptijd van 24 maanden. Activiteiten buiten de initiatiefperiode zijn niet subsidiabel.",
      },
      {
        q: "Wanneer ontvang ik het voorschot?",
        a: "Individueel MKB: bij toekenning ontvangt u automatisch 50% als voorschot — u hoeft hier niet apart om te vragen. Subsidies tot €25.000 worden ambtshalve vastgesteld: u hoeft na afloop geen verzoek tot vaststelling in te dienen en geen financiële administratie bij te houden, tenzij uw aanvraag in een steekproef valt. Samenwerkingsverbanden: 25% voorschot bij verlening; na indiening van een tussentijds voortgangsverslag kan aanvullend 50% worden aangevraagd. Vaststelling altijd via een formeel verzoek na afloop.",
      },
      {
        q: "Sommige adviseurs zeggen dat ik 80% subsidie kan krijgen. Klopt dat?",
        a: "Nee. Per 5 juli 2025 geldt artikel 2.20 van de SLIM-regeling: het subsidiepercentage is 60% voor alle MKB-ondernemingen, zowel klein als middelgroot. De aparte 80%-regeling voor klein-MKB bestaat niet meer. Controleer of uw adviseur met actuele regelgeving werkt.",
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CATEGORIEEN.flatMap((cat) =>
    cat.vragen.map((v) => ({
      "@type": "Question",
      name: v.q,
      acceptedAnswer: { "@type": "Answer", text: v.a },
    }))
  ),
};

export default function FaqPage() {
  const [openKey, setOpenKey] = useState(null);

  const toggle = (key) => setOpenKey(openKey === key ? null : key);

  return (
    <div>
      <Navigation />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ── */}
      <div className="hp-section" style={{ background: "var(--navy)", padding: "56px 20px 40px" }}>
        <div className="hp-si">
          <div className="hp-slbl" style={{ color: "var(--blue-light)" }}>Veelgestelde vragen</div>
          <h1 className="hp-stitle" style={{ color: "#fff" }}>Alles over de SLIM-subsidie</h1>
          <p className="hp-ssub" style={{ color: "rgba(255,255,255,0.6)", maxWidth: 640 }}>
            {CATEGORIEEN.reduce((acc, c) => acc + c.vragen.length, 0)} vragen over de SLIM-subsidie,
            georganiseerd per onderwerp.
          </p>
        </div>
      </div>

      {/* ── INTRO ── */}
      <div style={{ background: "#e8f4fc", borderBottom: "1px solid #c7d9f5", padding: "20px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", fontSize: 14, color: "var(--navy)", lineHeight: 1.7 }}>
          Hier vindt u alle veelgestelde vragen over de SLIM-subsidie.
          Wilt u eerst de volledige regeling begrijpen?{" "}
          <Link href="/slim-subsidie" style={{ color: "var(--blue)", fontWeight: 700, textDecoration: "none" }}>
            Bekijk dan onze complete gids: Wat is de SLIM-subsidie? →
          </Link>
        </div>
      </div>

      {/* ── FAQ PER CATEGORIE ── */}
      <div className="hp-section" style={{ background: "var(--white)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px" }}>
          {CATEGORIEEN.map((cat, ci) => (
            <div key={cat.titel} style={{ marginBottom: 48 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  color: "var(--blue)",
                  marginBottom: 6,
                }}
              >
                Categorie {ci + 1}
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  fontWeight: 800,
                  color: "var(--navy)",
                  marginTop: 0,
                  marginBottom: 16,
                  paddingBottom: 12,
                  borderBottom: "2px solid #e8edf3",
                }}
              >
                {cat.titel}
              </h2>
              <div className="hp-faq-list">
                {cat.vragen.map((item, qi) => {
                  const key = `${ci}-${qi}`;
                  const isOpen = openKey === key;
                  return (
                    <div
                      key={key}
                      className={`hp-faq-item ${isOpen ? "open" : ""}`}
                      onClick={() => toggle(key)}
                    >
                      <div className="hp-faq-q">
                        {item.q}
                        <span className="hp-faq-arr">{isOpen ? "−" : "+"}</span>
                      </div>
                      <div className="hp-faq-a">
                        <p>{item.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="hp-cta-section">
        <div className="hp-si">
          <h2 className="hp-cta-title">
            Nog vragen? Of direct<br />starten met de <span>quickscan</span>?
          </h2>
          <p className="hp-cta-sub">
            Neem contact op via{" "}
            <a href="mailto:info@slimsubsidieadvies.nl" style={{ color: "var(--blue-light)" }}>
              info@slimsubsidieadvies.nl
            </a>{" "}
            of doe direct de gratis quickscan.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/scan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>
              Doe de gratis quickscan →
            </Link>
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
            <span>
              KvK: 83970614 &nbsp;·&nbsp; BTW: NL863053907B01 &nbsp;·&nbsp;{" "}
              <a href="mailto:info@slimsubsidieadvies.nl" style={{ color: "var(--blue-light)", textDecoration: "none" }}>
                info@slimsubsidieadvies.nl
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
