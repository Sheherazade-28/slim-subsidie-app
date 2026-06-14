import Link from "next/link";

export const metadata = {
  title: "Privacyverklaring | SLIM Subsidie Advies",
  description: "Privacyverklaring van SLIM Subsidie Advies (Inscentia BV). Lees hoe wij omgaan met uw persoonsgegevens.",
  robots: { index: true },
};

export default function PrivacyPage() {
  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <div className="privacy-hdr">
        <div className="privacy-hdr-inner">
          <Link href="/" className="logo" style={{ textDecoration: "none" }}>
            <span className="logo-slim">SLIM</span>
            <span className="logo-sub">SUBSIDIE</span>
            <span className="logo-adv">ADVIES</span>
          </Link>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 20px 64px" }}>
        <Link href="/" className="btn btn-ghost" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>← Terug naar home</Link>
        <div className="privacy-page">
          <h1 className="privacy-h1">Privacyverklaring</h1>
          <p className="privacy-meta">SLIM Subsidie Advies | Inscentia BV &nbsp;·&nbsp; Versie 1.0 — mei 2026</p>

          <div className="privacy-sec">
            <h2>Wie zijn wij?</h2>
            <p>SLIM Subsidie Advies is een handelsnaam van Inscentia BV, gevestigd in Utrecht. Wij begeleiden MKB-ondernemers bij het aanvragen van de SLIM-subsidie.</p>
            <ul>
              <li><strong>Handelsnaam:</strong> SLIM Subsidie Advies</li>
              <li><strong>Juridische entiteit:</strong> Inscentia BV</li>
              <li><strong>KvK-nummer:</strong> 83970614</li>
              <li><strong>BTW-nummer:</strong> NL863053907B01</li>
              <li><strong>Adres:</strong> Floridadreef 100, 3565 AM Utrecht</li>
              <li><strong>E-mail:</strong> <a href="mailto:info@slimsubsidieadvies.nl">info@slimsubsidieadvies.nl</a></li>
              <li><strong>Telefoon:</strong> (030) 88 99 045</li>
              <li><strong>Website:</strong> <a href="https://www.slimsubsidieadvies.nl" target="_blank" rel="noopener noreferrer">www.slimsubsidieadvies.nl</a></li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Welke persoonsgegevens verwerken wij?</h2>
            <ul>
              <li><strong>Contactgegevens:</strong> naam, e-mailadres, telefoonnummer, bedrijfsnaam.</li>
              <li><strong>Bedrijfsgegevens:</strong> rechtsvorm, sector, provincie, aantal medewerkers.</li>
              <li><strong>Financiële gegevens:</strong> investeringsbedrag, indicatief subsidiebedrag, betalingsgegevens via Mollie.</li>
              <li><strong>Gebruiksgegevens:</strong> antwoorden op de quickscan en reservering, gekozen subsidieactiviteiten, IP-adres en browsergegevens.</li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Waarvoor gebruiken wij uw gegevens?</h2>
            <ul>
              <li><strong>Uitvoering van de overeenkomst:</strong> beoordelen subsidiekansen, opstellen activiteitenplan en begroting, begeleiden subsidieaanvraag bij RVO.</li>
              <li><strong>Communicatie:</strong> contact opnemen voor begeleiding, afspraken inplannen, voortgang delen.</li>
              <li><strong>E-mailmarketing:</strong> informeren over SLIM-subsidie, aanvraagtijdvakken en onze diensten. U kunt zich altijd afmelden via de afmeldlink in onze e-mails.</li>
              <li><strong>Administratie en facturatie:</strong> verwerken van betalingen en financiële administratie.</li>
              <li><strong>AI-analyse:</strong> uw bedrijfsprofiel en quickscanresultaten worden gebruikt om via Claude (Anthropic) een gepersonaliseerde subsidieanalyse op te stellen.</li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Op welke grondslag verwerken wij uw gegevens?</h2>
            <ul>
              <li>Uitvoering van een overeenkomst</li>
              <li>Gerechtvaardigd belang (zakelijke e-mailcommunicatie)</li>
              <li>Toestemming (e-mailmarketing)</li>
              <li>Wettelijke verplichting (financiële administratie, bewaartermijn 7 jaar)</li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Hoe lang bewaren wij uw gegevens?</h2>
            <ul>
              <li><strong>Klantgegevens en dossiers:</strong> 7 jaar na afloop van de opdracht.</li>
              <li><strong>E-mailmarketinggegevens:</strong> totdat u zich afmeldt of wij uw gegevens verwijderen op uw verzoek.</li>
              <li><strong>Websitegebruiksgegevens:</strong> maximaal 26 maanden.</li>
              <li><strong>Contactgegevens zonder opdracht:</strong> maximaal 1 jaar.</li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Delen wij uw gegevens met derden?</h2>
            <p><strong>Externe verwerkers:</strong></p>
            <ul>
              <li><strong>HubSpot (VS)</strong> — CRM en e-mailmarketing. Gecertificeerd onder EU-VS Data Privacy Framework.</li>
              <li><strong>Mollie (NL)</strong> — betalingsverwerking. Gevestigd in Nederland, valt onder de AVG.</li>
              <li><strong>Anthropic/Claude (VS)</strong> — AI-analyse. Verwerking op basis van standaard contractbepalingen (SCC&apos;s).</li>
              <li><strong>Exact (NL)</strong> — boekhoudsoftware. Gevestigd in Nederland.</li>
              <li><strong>Google Workspace (VS)</strong> — e-mail, opslag en videovergaderen. Gecertificeerd onder EU-VS Data Privacy Framework.</li>
              <li><strong>Microsoft Teams (VS)</strong> — videovergaderen. Gecertificeerd onder EU-VS Data Privacy Framework.</li>
              <li><strong>Dropbox (VS)</strong> — bestandsopslag. Gecertificeerd onder EU-VS Data Privacy Framework.</li>
              <li><strong>Calendly (VS)</strong> — afsprakenbeheer. Gecertificeerd onder EU-VS Data Privacy Framework.</li>
            </ul>
            <p><strong>RVO:</strong> bij het indienen van een subsidieaanvraag delen wij benodigde bedrijfs- en projectgegevens met RVO.</p>
            <p>Wij verkopen uw persoonsgegevens nooit aan derden.</p>
          </div>

          <div className="privacy-sec">
            <h2>Uw rechten</h2>
            <p>U heeft de volgende rechten op grond van de AVG:</p>
            <ul>
              <li>Recht op inzage</li>
              <li>Recht op rectificatie</li>
              <li>Recht op verwijdering</li>
              <li>Recht op beperking</li>
              <li>Recht op overdraagbaarheid</li>
              <li>Recht van bezwaar</li>
              <li>Recht om toestemming in te trekken</li>
            </ul>
            <p>Verzoeken indienen via <a href="mailto:info@slimsubsidieadvies.nl">info@slimsubsidieadvies.nl</a>. Wij reageren binnen 30 dagen.</p>
            <p>Klachten kunt u indienen bij de Autoriteit Persoonsgegevens: <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">www.autoriteitpersoonsgegevens.nl</a></p>
          </div>

          <div className="privacy-sec">
            <h2>Beveiliging</h2>
            <p>Wij nemen passende technische en organisatorische maatregelen waaronder versleutelde verbindingen (HTTPS), toegangsbeveiliging, wachtwoordbeleid en beperkte toegang tot persoonsgegevens.</p>
          </div>

          <div className="privacy-sec">
            <h2>Cookies</h2>
            <p>Onze website gebruikt functionele cookies voor het correct functioneren van de website. Wij plaatsen geen tracking- of advertentiecookies zonder uw toestemming.</p>
          </div>

          <div className="privacy-sec">
            <h2>Wijzigingen</h2>
            <p>Wij kunnen deze privacyverklaring aanpassen. De meest actuele versie is altijd te vinden op onze website. Datum laatste wijziging: mei 2026.</p>
          </div>

          <div className="privacy-sec">
            <h2>Contact</h2>
            <p>Vragen over deze privacyverklaring? Neem contact op:</p>
            <ul>
              <li><strong>E-mail:</strong> <a href="mailto:info@slimsubsidieadvies.nl">info@slimsubsidieadvies.nl</a></li>
              <li><strong>Telefoon:</strong> (030) 88 99 045</li>
              <li><strong>Post:</strong> Inscentia BV, t.a.v. Privacy, Floridadreef 100, 3565 AM Utrecht</li>
            </ul>
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
            <span>KvK: 83970614 &nbsp;·&nbsp; BTW: NL863053907B01 &nbsp;·&nbsp; <a href="mailto:info@slimsubsidieadvies.nl" style={{ color: "var(--blue-light)", textDecoration: "none" }}>info@slimsubsidieadvies.nl</a></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
