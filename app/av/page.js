import Link from "next/link";

export const metadata = {
  title: "Algemene Voorwaarden | SLIM Subsidie Advies",
  description: "Algemene Voorwaarden van SLIM Subsidie Advies (Inscentia BV). Van toepassing op alle diensten rondom SLIM-subsidie begeleiding.",
  robots: { index: true },
};

export default function AvPage() {
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
          <h1 className="privacy-h1">Algemene Voorwaarden</h1>
          <p className="privacy-meta">SLIM Subsidie Advies | Inscentia BV &nbsp;·&nbsp; Versie 1.0 — mei 2026</p>

          <div className="privacy-sec">
            <h2>Artikel 1 — Definities</h2>
            <p>In deze Algemene Voorwaarden wordt verstaan onder:</p>
            <ul>
              <li><strong>Opdrachtnemer:</strong> Inscentia BV, handelend onder de naam SLIM Subsidie Advies, gevestigd te Utrecht, KvK-nummer 83970614.</li>
              <li><strong>Opdrachtgever:</strong> de rechtspersoon of natuurlijk persoon die een overeenkomst aangaat met Opdrachtnemer.</li>
              <li><strong>Dienst:</strong> het pakket van advisering, begeleiding en indiening in het kader van de SLIM-subsidieregeling.</li>
              <li><strong>Dieptecheck:</strong> de betaalde analyse van de subsidiekansen van de Opdrachtgever, inclusief persoonlijke AI-analyse en adviesgesprek.</li>
              <li><strong>Aanvraagbegeleiding:</strong> de volledige begeleiding van de subsidieaanvraag bij RVO, inclusief opstelling documenten, indiening en begeleiding van het screeningstraject na inloting.</li>
              <li><strong>SLIM-subsidie:</strong> de Stimuleringsregeling Leren en Ontwikkelen in het Mkb, uitgevoerd door de Rijksdienst voor Ondernemend Nederland (RVO).</li>
              <li><strong>Inloting:</strong> het proces waarbij RVO door middel van notariële loting bepaalt welke aanvragen in behandeling worden genomen.</li>
              <li><strong>Toekenning:</strong> het definitieve besluit van RVO waarbij de subsidie aan de Opdrachtgever wordt verleend.</li>
              <li><strong>Succesfee:</strong> de vergoeding die Opdrachtgever aan Opdrachtnemer verschuldigd is uitsluitend bij Toekenning van de subsidie.</li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Artikel 2 — Toepasselijkheid</h2>
            <ul>
              <li>Deze Algemene Voorwaarden zijn van toepassing op alle offertes, overeenkomsten en leveringen van diensten door Opdrachtnemer, tenzij schriftelijk anders overeengekomen.</li>
              <li>De toepasselijkheid van eventuele inkoop- of andere voorwaarden van de Opdrachtgever wordt uitdrukkelijk van de hand gewezen.</li>
              <li>Indien een bepaling in deze Algemene Voorwaarden nietig of vernietigbaar is, blijven de overige bepalingen onverminderd van kracht.</li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Artikel 3 — Aanbod en totstandkoming overeenkomst</h2>
            <ul>
              <li>Alle aanbiedingen van Opdrachtnemer zijn vrijblijvend, tenzij uitdrukkelijk anders aangegeven.</li>
              <li>De overeenkomst komt tot stand op het moment dat de Opdrachtgever de Dieptecheck betaalt via het online betaalplatform op de website van Opdrachtnemer.</li>
              <li>Opdrachtnemer heeft het recht een opdracht zonder opgave van redenen te weigeren.</li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Artikel 4 — Dienstverlening</h2>
            <ul>
              <li><strong>Dieptecheck</strong> (€ 200 excl. btw early bird / € 250 excl. btw regulier): persoonlijke AI-diepteanalyse, telefonisch adviesgesprek binnen 8 werkdagen, en start aanvraagbegeleiding.</li>
              <li><strong>Aanvraagbegeleiding:</strong> opstellen activiteitenplan, begroting en documenten; compliance-check; indiening via RVO e-portaal; begeleiding screeningstraject na inloting.</li>
              <li><strong>Herindienen:</strong> wordt de aanvraag niet ingeloot, dan actualiseert Opdrachtnemer de aanvraag elk volgend tijdvak en dient deze opnieuw in totdat inloting plaatsvindt — zonder extra kosten.</li>
              <li>Opdrachtnemer spant zich in voor een correcte en volledige aanvraag, doch kan geen garantie geven op inloting of toekenning door RVO.</li>
              <li>Opdrachtnemer is bevoegd voor de uitvoering van de dienst derden in te schakelen.</li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Artikel 5 — No cure, no pay en succesfee</h2>
            <ul>
              <li>De diensten van Opdrachtnemer zijn gebaseerd op een no cure, no pay principe voor de Succesfee.</li>
              <li>De Succesfee bedraagt € 2.500 excl. btw en is uitsluitend verschuldigd bij Toekenning van de SLIM-subsidie door RVO.</li>
              <li>Bij Toekenning wordt de reeds betaalde vergoeding voor de Dieptecheck volledig terugbetaald aan de Opdrachtgever; de effectieve kosten zijn dan beperkt tot de Succesfee.</li>
              <li>Indien de subsidie niet wordt toegekend, is de Succesfee niet verschuldigd. De vergoeding voor de Dieptecheck wordt in dat geval niet gerestitueerd.</li>
              <li>Inloting houdt in dat de aanvraag in behandeling wordt genomen door RVO, niet dat de subsidie reeds is toegekend. De Succesfee is uitsluitend opeisbaar na het definitieve toekenningsbesluit van RVO.</li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Artikel 6 — Tarieven en betaling</h2>
            <ul>
              <li>Alle genoemde tarieven zijn exclusief btw, tenzij uitdrukkelijk anders vermeld.</li>
              <li>Betaling van de Dieptecheck geschiedt vooraf via het online betaalplatform op de website (iDEAL, creditcard of Bancontact).</li>
              <li>De Succesfee wordt gefactureerd na ontvangst van het definitieve toekenningsbesluit van RVO. Betaling dient te geschieden binnen 14 dagen na factuurdatum.</li>
              <li>Bij niet-tijdige betaling is Opdrachtgever van rechtswege in verzuim. Opdrachtnemer is gerechtigd wettelijke handelsrente en buitengerechtelijke incassokosten conform de Wet normering buitengerechtelijke incassokosten in rekening te brengen.</li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Artikel 7 — Verplichtingen opdrachtgever</h2>
            <ul>
              <li>Opdrachtgever verstrekt alle informatie die Opdrachtnemer noodzakelijk acht voor een correcte uitvoering van de dienst, tijdig en volledig.</li>
              <li>Opdrachtgever staat in voor de juistheid, volledigheid en betrouwbaarheid van de verstrekte gegevens.</li>
              <li>Opdrachtgever meldt wijzigingen in de bedrijfssituatie die van invloed kunnen zijn op de subsidieaanvraag direct aan Opdrachtnemer.</li>
              <li>Indien Opdrachtgever onjuiste of onvolledige informatie verstrekt waardoor de aanvraag wordt afgewezen of teruggevorderd, is Opdrachtnemer daarvoor niet aansprakelijk.</li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Artikel 8 — Aansprakelijkheid</h2>
            <ul>
              <li>Opdrachtnemer is uitsluitend aansprakelijk voor directe schade die het rechtstreekse gevolg is van een toerekenbare tekortkoming in de nakoming van de overeenkomst.</li>
              <li>De aansprakelijkheid van Opdrachtnemer is te allen tijde beperkt tot het bedrag van de door Opdrachtgever reeds betaalde vergoeding voor de Dieptecheck, exclusief de Succesfee.</li>
              <li>Opdrachtnemer is nimmer aansprakelijk voor indirecte schade, gevolgschade, gederfde winst, gemiste subsidie of schade wegens het niet toekennen of terugvorderen van de subsidie door RVO.</li>
              <li>Voorgaande beperkingen gelden niet in geval van opzet of bewuste roekeloosheid van Opdrachtnemer.</li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Artikel 9 — Overmacht</h2>
            <ul>
              <li>Opdrachtnemer is niet gehouden tot nakoming van enige verplichting indien hij daartoe verhinderd is als gevolg van overmacht. Hieronder wordt verstaan: wijzigingen in de SLIM-regelgeving, technische storingen, stakingen, overheidsmaatregelen of verstoringen bij RVO.</li>
              <li>Indien een overmachtsituatie langer dan 30 dagen voortduurt, zijn beide partijen gerechtigd de overeenkomst te ontbinden zonder schadeplichtigheid.</li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Artikel 10 — Geheimhouding</h2>
            <ul>
              <li>Beide partijen zijn verplicht tot geheimhouding van alle vertrouwelijke informatie die zij in het kader van de overeenkomst ontvangen.</li>
              <li>Deze geheimhoudingsplicht geldt niet voor informatie die reeds openbaar is of waarvan openbaarmaking wettelijk verplicht is.</li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Artikel 11 — Intellectueel eigendom</h2>
            <ul>
              <li>Alle door Opdrachtnemer verstrekte stukken, rapporten, analyses en documenten zijn uitsluitend bestemd voor gebruik door de Opdrachtgever ten behoeve van de subsidieaanvraag.</li>
              <li>Zonder uitdrukkelijke schriftelijke toestemming van Opdrachtnemer mogen deze stukken niet worden verveelvoudigd, openbaar gemaakt of ter kennis van derden gebracht.</li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Artikel 12 — Duur en beëindiging</h2>
            <ul>
              <li>De overeenkomst loopt totdat de dienstverlening is voltooid: na definitieve beschikking van RVO, of totdat Opdrachtgever de opdracht schriftelijk beëindigt.</li>
              <li>Opdrachtgever kan de overeenkomst te allen tijde schriftelijk opzeggen. De reeds betaalde vergoeding voor de Dieptecheck wordt niet gerestitueerd, tenzij Opdrachtnemer nog geen aanvang heeft gemaakt met de werkzaamheden.</li>
              <li>Opdrachtnemer kan de overeenkomst beëindigen indien Opdrachtgever zijn verplichtingen niet nakomt, faillissement aanvraagt of surseance van betaling verkrijgt.</li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Artikel 13 — Klachten</h2>
            <ul>
              <li>Klachten over de dienstverlening dienen zo spoedig mogelijk, doch uiterlijk binnen 30 dagen na constatering, schriftelijk te worden ingediend via <a href="mailto:info@slimsubsidieadvies.nl">info@slimsubsidieadvies.nl</a>.</li>
              <li>Opdrachtnemer streeft ernaar klachten binnen 14 werkdagen te beantwoorden.</li>
            </ul>
          </div>

          <div className="privacy-sec">
            <h2>Artikel 14 — Toepasselijk recht en geschillen</h2>
            <ul>
              <li>Op alle overeenkomsten tussen Opdrachtnemer en Opdrachtgever is uitsluitend Nederlands recht van toepassing.</li>
              <li>Geschillen worden bij uitsluiting voorgelegd aan de bevoegde rechter van de Rechtbank Midden-Nederland, locatie Utrecht.</li>
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
