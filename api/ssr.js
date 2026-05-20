export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  res.send(`<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SLIM Subsidie Aanvragen | Tot €24.999 voor MKB | SLIM Subsidie Advies</title>
  <meta name="description" content="Kom jij in aanmerking voor SLIM-subsidie? Tot €24.999 subsidie voor leren en ontwikkelen in uw MKB-bedrijf. Gratis quickscan, no cure no pay. Doe de check in 2 minuten." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.slimsubsidieadvies.nl/" />

  <!-- Open Graph -->
  <meta property="og:title" content="SLIM Subsidie Aanvragen | Tot €24.999 voor MKB" />
  <meta property="og:description" content="Kom jij in aanmerking voor SLIM-subsidie? Tot €24.999 subsidie voor leren en ontwikkelen. Gratis quickscan, no cure no pay." />
  <meta property="og:url" content="https://www.slimsubsidieadvies.nl/" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="nl_NL" />

  <!-- FAQ Structured Data (rijke zoekresultaten in Google) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Hoeveel SLIM-subsidie kan ik als MKB-er krijgen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Als MKB-ondernemer kunt u maximaal €24.999 per aanvraag ontvangen. Kleinbedrijven met tot 50 medewerkers ontvangen 80% vergoeding. Bedrijven met 50-250 medewerkers ontvangen 60% vergoeding over de subsidiabele kosten."
        }
      },
      {
        "@type": "Question",
        "name": "Wanneer kan ik SLIM-subsidie aanvragen in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Samenwerkingsverbanden in het MKB kunnen SLIM-subsidie aanvragen van 8 juni 2026 tot 6 juli 2026. De exacte openstellingsdata voor individuele MKB-aanvragen worden nog bekendgemaakt. Meld u nu aan voor een gratis quickscan zodat u direct kunt indienen zodra het tijdvak opent."
        }
      },
      {
        "@type": "Question",
        "name": "Kom ik in aanmerking voor SLIM-subsidie?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "U komt in aanmerking als uw bedrijf maximaal 250 medewerkers heeft en een jaaromzet van maximaal €50 miljoen of een balanstotaal van maximaal €43 miljoen. Ook bedrijven in de landbouw, horeca en recreatie met meer dan 250 medewerkers kunnen aanvragen. Doe gratis de quickscan en weet het in 2 minuten."
        }
      },
      {
        "@type": "Question",
        "name": "Waarvoor kan ik SLIM-subsidie gebruiken?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SLIM-subsidie kunt u gebruiken voor: een doorlichting van uw bedrijf met een opleidings- of ontwikkelplan, loopbaan- en ontwikkeladviezen voor medewerkers, het opzetten van een bedrijfsschool of leerportaal, en het invoeren van een systematische aanpak voor leren en ontwikkelen."
        }
      },
      {
        "@type": "Question",
        "name": "Wat kost de begeleiding van SLIM Subsidie Advies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De quickscan is volledig gratis en vrijblijvend. Onze begeleiding bij de aanvraag werkt op no cure no pay basis — u betaalt alleen bij een succesvolle toekenning van de subsidie."
        }
      },
      {
        "@type": "Question",
        "name": "Hoe lang duurt het aanvragen van SLIM-subsidie?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De quickscan duurt 2 minuten. De volledige aanvraagvoorbereiding duurt doorgaans 2 tot 4 weken. Wij adviseren minimaal 4 weken voor de deadline te beginnen zodat uw aanvraag volledig en correct is."
        }
      }
    ]
  }
  </script>

  <!-- LocalBusiness Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "SLIM Subsidie Advies",
    "url": "https://www.slimsubsidieadvies.nl",
    "description": "Specialist in SLIM-subsidie aanvragen voor MKB. Gratis quickscan, no cure no pay begeleiding.",
    "areaServed": {
      "@type": "Country",
      "name": "Nederland"
    },
    "serviceType": "Subsidieadvies",
    "priceRange": "No cure no pay"
  }
  </script>

  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a2e; line-height: 1.7; }
    header { background: #0d2e5a; color: white; padding: 2rem 1rem; text-align: center; }
    header h1 { font-size: clamp(1.4rem, 4vw, 2.2rem); font-weight: 700; margin-bottom: 0.5rem; }
    header p { font-size: 1rem; opacity: 0.85; }
    .cta-btn { display: inline-block; margin-top: 1.2rem; background: #f59e0b; color: #1a1a2e; font-weight: 700; padding: 0.75rem 2rem; border-radius: 8px; text-decoration: none; font-size: 1rem; }
    main { max-width: 860px; margin: 0 auto; padding: 2rem 1rem; }
    section { margin-bottom: 2.5rem; }
    h2 { font-size: 1.4rem; color: #0d2e5a; margin-bottom: 0.75rem; border-left: 4px solid #f59e0b; padding-left: 0.75rem; }
    h3 { font-size: 1.05rem; color: #0d2e5a; margin: 1rem 0 0.25rem; }
    p { margin-bottom: 0.75rem; color: #333; }
    ol, ul { padding-left: 1.5rem; color: #333; }
    ol li, ul li { margin-bottom: 0.4rem; }
    .badge-row { display: flex; gap: 1rem; flex-wrap: wrap; margin: 1rem 0; }
    .badge { background: #e8f0fe; color: #0d2e5a; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 600; }
    .highlight-box { background: #fff8e1; border: 2px solid #f59e0b; border-radius: 10px; padding: 1.25rem 1.5rem; margin: 1.5rem 0; }
    .highlight-box strong { color: #0d2e5a; }
    footer { background: #0d2e5a; color: rgba(255,255,255,0.7); text-align: center; padding: 1.5rem 1rem; font-size: 0.875rem; }
    footer a { color: rgba(255,255,255,0.85); }
  </style>
</head>
<body>

  <header>
    <h1>SLIM Subsidie Aanvragen voor MKB</h1>
    <p>Tot €24.999 subsidie voor leren &amp; ontwikkelen · Gratis quickscan · No cure no pay</p>
    <a href="https://www.slimsubsidieadvies.nl/" class="cta-btn">Doe gratis de quickscan →</a>
  </header>

  <main>

    <div class="highlight-box">
      <strong>⏰ Let op: aanvraagtijdvak 2026</strong><br />
      Samenwerkingsverbanden kunnen SLIM-subsidie aanvragen van <strong>8 juni tot 6 juli 2026</strong>. Begin nu met de gratis quickscan zodat u klaarstaat.
    </div>

    <section>
      <h2>Wat is de SLIM-subsidie?</h2>
      <p>De SLIM-subsidie (Stimuleringsregeling Leren en Ontwikkelen in MKB-ondernemingen) is een regeling van het Ministerie van Sociale Zaken en Werkgelegenheid. MKB-bedrijven kunnen subsidie ontvangen voor initiatieven die leren en ontwikkelen structureel verankeren in de organisatie.</p>
      <div class="badge-row">
        <span class="badge">Tot €24.999 per aanvraag</span>
        <span class="badge">60–80% vergoeding</span>
        <span class="badge">Alle MKB-sectoren</span>
        <span class="badge">No cure no pay</span>
      </div>
    </section>

    <section>
      <h2>Kom ik in aanmerking?</h2>
      <p>U kunt SLIM-subsidie aanvragen als uw bedrijf voldoet aan de MKB-definitie:</p>
      <ul>
        <li>Maximaal <strong>250 medewerkers</strong></li>
        <li>Jaaromzet maximaal <strong>€50 miljoen</strong>, of balanstotaal maximaal €43 miljoen</li>
        <li>Gevestigd in <strong>Nederland</strong></li>
        <li>Actief in vrijwel elke sector (inclusief zorg, horeca, transport, industrie, zakelijke dienstverlening)</li>
      </ul>
      <p>Ook grotere bedrijven in de landbouw, horeca en recreatie mogen individueel aanvragen.</p>
    </section>

    <section>
      <h2>Waarvoor kunt u de subsidie gebruiken?</h2>
      <ul>
        <li>Een <strong>doorlichting van uw bedrijf</strong> gevolgd door een opleidings- of ontwikkelplan</li>
        <li><strong>Loopbaan- en ontwikkeladviezen</strong> voor medewerkers</li>
        <li>Het opzetten van een <strong>bedrijfsschool of digitaal leerportaal</strong></li>
        <li>Een systematische aanpak voor <strong>leren en ontwikkelen</strong> (zoals een leercultuurscan, taakroulatie, of ontwikkelgesprekken)</li>
      </ul>
    </section>

    <section>
      <h2>Hoe werkt het bij SLIM Subsidie Advies?</h2>
      <ol>
        <li><strong>Doe de gratis quickscan</strong> — weet in 2 minuten of u in aanmerking komt</li>
        <li><strong>Ontvang uw persoonlijke subsidieadvies</strong> — inclusief verwacht subsidiebedrag</li>
        <li><strong>Wij verzorgen de volledige aanvraag</strong> — van activiteitenplan tot indiening</li>
        <li><strong>No cure no pay</strong> — u betaalt alleen bij een succesvolle toekenning</li>
      </ol>
    </section>

    <section>
      <h2>Veelgestelde vragen over SLIM-subsidie</h2>

      <h3>Hoeveel subsidie kan ik krijgen?</h3>
      <p>Kleinbedrijven (tot 50 medewerkers) ontvangen <strong>80% vergoeding</strong> over de eerste €25.000 aan kosten — dus tot €20.000 netto subsidie. Bedrijven met 50–250 medewerkers ontvangen 60%, tot een maximum van €24.999.</p>

      <h3>Wanneer kan ik aanvragen in 2026?</h3>
      <p>Samenwerkingsverbanden kunnen aanvragen van <strong>8 juni tot 6 juli 2026</strong>. De data voor individuele MKB-aanvragen worden nog bekendgemaakt. Doe nu de quickscan zodat u klaarstaat zodra het tijdvak opent.</p>

      <h3>Wat als mijn aanvraag wordt afgewezen?</h3>
      <p>Bij no cure no pay betaalt u niets als de aanvraag niet wordt toegekend. Wij zorgen voor een zo volledig en kansrijke aanvraag als mogelijk.</p>

      <h3>Hoe lang duurt het proces?</h3>
      <p>De quickscan duurt 2 minuten. De voorbereiding van een volledige aanvraag duurt 2 tot 4 weken. Wij adviseren minimaal 4 weken voor de deadline te starten.</p>

      <h3>Werkt u in alle sectoren?</h3>
      <p>Ja. Wij begeleiden MKB-bedrijven in alle sectoren: zorg, horeca, transport, bouw, industrie, zakelijke dienstverlening, detailhandel en meer.</p>
    </section>

  </main>

  <footer>
    <p>SLIM Subsidie Advies &middot; <a href="https://www.slimsubsidieadvies.nl">slimsubsidieadvies.nl</a> &middot; Specialist in SLIM-subsidie voor MKB</p>
  </footer>

</body>
</html>`);
}
