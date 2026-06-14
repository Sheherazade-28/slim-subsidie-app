"use client";

import Link from "next/link";
import { useState } from "react";
import { LOTING, LOTING_TIJDVAKKEN, FAQ, BEDRIJFSINFO } from "@/data/slim-content";
import Navigation from "@/components/layout/Navigation";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="hp">
      <Navigation />

      {/* Hero */}
      <div className="hp-hero">
        <div className="hp-hero-inner">
          <div>
            <div className="hp-badge"><span className="phase-dot" />&nbsp;Gratis quickscan · Start vanaf €199 excl. btw · Retour bij toekenning</div>
            <h1 className="hp-h1">Laat geen<br /><span>€ 25.000</span><br />subsidie liggen</h1>
            <p className="hp-sub">Ondernemen terwijl wij de subsidie regelen. Start met een gratis quickscan en weet binnen 2 minuten of uw bedrijf in aanmerking komt.</p>
            <div className="hp-ctas">
              <Link href="/scan" className="hp-btn-p">Doe de gratis quickscan →</Link>
              <Link href="/slim" className="hp-btn-s">Meer over SLIM-subsidie</Link>
            </div>
            <div className="hp-stats">
              <div><div className="hp-stat-num">€<em>25.000</em></div><div className="hp-stat-lbl">Maximum subsidie</div></div>
              <div><div className="hp-stat-num">tot <em>60</em>%</div><div className="hp-stat-lbl">Vergoeding investering</div></div>
              <div><div className="hp-stat-num">€<em>199</em></div><div className="hp-stat-lbl">Reserveringsfee (excl. btw)</div></div>
            </div>
          </div>
          <div>
            <div className="hp-card">
              <div className="hp-card-title">Subsidiepercentages</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(255,255,255,0.06)",borderRadius:10,padding:"14px 18px",marginBottom:16}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:32,fontWeight:800,color:"var(--blue-light)",lineHeight:1}}>60%</div>
                <div style={{fontSize:13,fontWeight:600,color:"#fff",textAlign:"right",lineHeight:1.45}}>subsidie · tot €24.999<br /><span style={{fontWeight:400,color:"rgba(255,255,255,0.55)"}}>voor alle MKB</span></div>
              </div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",marginTop:-10,marginBottom:16,lineHeight:1.4}}>* Uitzondering: landbouwbedrijven max. €20.000 (art. 2.20 lid 1 SLIM-regeling)</div>
              <div className="hp-card-title" style={{marginTop:4}}>Aanvraagtijdvakken 2026</div>
              <div className="hp-tl">
                <div className="hp-tl-item"><div className="hp-tl-dot done" /><div className="hp-tl-text"><strong>Tijdvak 1</strong> — 7 april t/m 4 mei 2026</div><span className="hp-tl-badge closed">Gesloten</span></div>
                <div className="hp-tl-item"><div className="hp-tl-dot active" /><div className="hp-tl-text"><strong>Tijdvak 2</strong> — 10 aug t/m 7 sep 2026</div><span className="hp-tl-badge open">Opent binnenkort</span></div>
                <div className="hp-tl-item"><div className="hp-tl-dot future" /><div className="hp-tl-text"><strong>Tijdvak 1 2027</strong> — april 2027</div><span className="hp-tl-badge closed">Volgt</span></div>
              </div>
              <div className="hp-eb">
                <div className="hp-eb-lbl">RESERVERINGSFEE</div>
                <div className="hp-eb-price">€ 199</div>
                <div className="hp-eb-sub">reserveringsfee excl. btw · retour bij toekenning</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hoe werkt het */}
      <div className="hp-how">
        <div className="hp-si">
          <div className="hp-slbl">In 3 stappen</div>
          <h2 className="hp-stitle">Zo werkt het</h2>
          <div className="hp-how-grid">
            <div className="hp-how-card">
              <div className="hp-how-num">1</div>
              <div className="hp-how-title">Gratis quickscan</div>
              <div className="hp-how-text">Controleer vrijblijvend in 2 minuten of uw onderneming in aanmerking komt. Geen verplichtingen.</div>
            </div>
            <div className="hp-how-arrow">→</div>
            <div className="hp-how-card">
              <div className="hp-how-num">2</div>
              <div className="hp-how-title">Diepteanalyse & aanvraag</div>
              <div className="hp-how-text">Voor €199 excl. btw verzorgen wij de diepteanalyse en stellen wij de volledige aanvraag op. Niet ingeloot? Dan actualiseren wij uw aanvraag ieder nieuw tijdvak opnieuw binnen hetzelfde traject, totdat u wordt ingeloot.</div>
            </div>
            <div className="hp-how-arrow">→</div>
            <div className="hp-how-card">
              <div className="hp-how-num">3</div>
              <div className="hp-how-title">Ingeloot? Volledige begeleiding</div>
              <div className="hp-how-text">U ontvangt de reserveringsfee retour. Voor een vaste fee van €2.500 excl. btw begeleiden wij u volledig, van inhoudelijke beoordeling en vragenbeantwoording tot review van het eindproduct.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Loting sectie */}
      <div className="hp-loting">
        <div className="hp-si">
          <div className="hp-slbl" style={{color:"var(--blue-light)"}}>Tijdvak 1 2026 — bron: RVO, 8 mei 2026</div>
          <h2 className="hp-stitle" style={{color:"#fff"}}>Ken de realiteit van de loting</h2>
          <p className="hp-ssub" style={{color:"rgba(255,255,255,0.5)"}}>De SLIM-subsidie is populair. Een foutloze aanvraag is uw eerste vereiste.</p>
          <div className="hp-l-grid">
            <div className="hp-l-card"><div className="hp-l-num w">{LOTING.totaalIngediend.toLocaleString("nl-NL")}</div><div className="hp-l-lbl">aanvragen ingediend</div></div>
            <div className="hp-l-card"><div className="hp-l-num r">{LOTING.afgekeurdVoorLoting}</div><div className="hp-l-lbl">vóór loting afgekeurd door fouten</div></div>
            <div className="hp-l-card"><div className="hp-l-num b">{LOTING.inBehandeling}</div><div className="hp-l-lbl">aanvragen ingeloot en in behandeling</div></div>
            <div className="hp-l-card"><div className="hp-l-num g">~{LOTING.kansRuw}%</div><div className="hp-l-lbl">effectieve kans per aanvraag</div></div>
          </div>
          <div className="hp-l-insight">
            <span style={{fontSize:22,flexShrink:0}}>💡</span>
            <p><strong>Wat betekent inloting?</strong> Inloting betekent dat uw aanvraag in behandeling wordt genomen — niet dat subsidie is toegekend. Na inloting volgt een inhoudelijke beoordeling door RVO. Wij begeleiden dit screeningstraject voor dezelfde vaste succesfee van <strong>€ 2.500 (excl. btw)</strong>.</p>
          </div>
          <div style={{marginTop:20,textAlign:"center"}}>
            <Link href="/lotingsuitslagen" className="hp-btn-s">Bekijk alle lotingsuitslagen 2024–2026 →</Link>
          </div>
        </div>
      </div>

      {/* Wat is SLIM */}
      <div id="slim" className="hp-section" style={{background:"var(--off)"}}>
        <div className="hp-si">
          <div className="hp-slbl">De SLIM-regeling</div>
          <h2 className="hp-stitle">Wat is SLIM-subsidie?</h2>
          <p className="hp-ssub">De SLIM-subsidie vergoedt 60% van uw investering in leren, opleiden en ontwikkelen van uw medewerkers, tot een maximum van €25.000. Landbouwbedrijven: max. €20.000. Beschikbaar voor alle MKB-ondernemingen met personeel in loondienst. De regeling loopt tot eind 2029.</p>
          <div className="hp-act-grid">
            <div className="hp-act-card"><div className="hp-act-tag a">Activiteit A</div><div className="hp-act-title">Doorlichting → Opleidings- of ontwikkelplan</div><div className="hp-act-desc">Een externe adviseur brengt de scholingsbehoefte in kaart en stelt een concreet plan op.</div><div className="hp-act-tags"><span className="hp-act-tag-sm">Leercultuurscan</span><span className="hp-act-tag-sm">Opleidingsplan</span><span className="hp-act-tag-sm">HR-strategie</span></div></div>
            <div className="hp-act-card"><div className="hp-act-tag b">Activiteit B</div><div className="hp-act-title">Loopbaan- of ontwikkeladviezen voor werknemers</div><div className="hp-act-desc">Individuele adviezen via een gecertificeerde loopbaanadviseur voor uw medewerkers.</div><div className="hp-act-tags"><span className="hp-act-tag-sm">Loopbaangesprekken</span><span className="hp-act-tag-sm">POP-traject</span><span className="hp-act-tag-sm">Talentassessment</span></div></div>
            <div className="hp-act-card"><div className="hp-act-tag c">Activiteit C</div><div className="hp-act-title">Ontwikkelen of invoeren van een L&O-methode</div><div className="hp-act-desc">Structurele methode die medewerkers stimuleert kennis te blijven ontwikkelen op de werkvloer.</div><div className="hp-act-tags"><span className="hp-act-tag-sm">Online leerportal</span><span className="hp-act-tag-sm">Bedrijfsschool</span><span className="hp-act-tag-sm">Videoserie</span></div></div>
          </div>
          <div className="hp-req-label">Subsidievereisten per activiteit</div>
          <div className="hp-req-grid">
            <div className="hp-req-card"><div className="hp-act-tag a">Activiteit A</div><ul className="hp-req-list"><li className="hp-req-item"><span className="hp-req-dot" /><span>Min. investering: <strong>€8.334</strong></span></li><li className="hp-req-item"><span className="hp-req-dot" /><span>Max. uurtarief adviseur: <strong>€135</strong> excl. btw</span></li><li className="hp-req-item"><span className="hp-req-dot" /><span>Vereist: opleidings- of ontwikkelplan als eindproduct</span></li><li className="hp-req-item"><span className="hp-req-dot" /><span>Geen Noloc-certificering vereist</span></li></ul></div>
            <div className="hp-req-card"><div className="hp-act-tag b">Activiteit B</div><ul className="hp-req-list"><li className="hp-req-item"><span className="hp-req-dot" /><span>Subsidie: <strong>€700</strong> per afgerond loopbaantraject</span></li><li className="hp-req-item"><span className="hp-req-dot" /><span>Min. contacttijd: <strong>4 uur</strong> per deelnemer</span></li><li className="hp-req-item"><span className="hp-req-dot" /><span>Vereist: Noloc Register Loopbaanprofessional certificering adviseur</span></li><li className="hp-req-item"><span className="hp-req-dot" /><span>Vereist: prestatieverklaring getekend door adviseur én deelnemer</span></li></ul></div>
            <div className="hp-req-card"><div className="hp-act-tag c">Activiteit C</div><ul className="hp-req-list"><li className="hp-req-item"><span className="hp-req-dot" /><span>Min. investering: <strong>€8.334</strong></span></li><li className="hp-req-item"><span className="hp-req-dot" /><span>Max. uurtarief adviseur: <strong>€135</strong> excl. btw</span></li><li className="hp-req-item"><span className="hp-req-dot" /><span>Vereist: producten van de gerealiseerde L&O-methode als eindproduct</span></li><li className="hp-req-item"><span className="hp-req-dot" /><span>Geen Noloc-certificering vereist</span></li></ul></div>
          </div>
        </div>
      </div>

      {/* Waarom wij */}
      <div id="waarom" className="hp-section" style={{background:"var(--white)"}}>
        <div className="hp-si">
          <div className="hp-slbl">Onze aanpak</div>
          <h2 className="hp-stitle">Waarom via SLIM Subsidie Advies?</h2>
          <p className="hp-ssub">De specialist in SLIM-subsidie aanvragen voor MKB-ondernemers. Van gratis quickscan tot toekenning — én het volledige screeningstraject bij RVO.</p>
          <p className="hp-why-intro">Geen ingewikkeld subsidietraject, wel een kansrijke aanvraag.</p>
          <div className="hp-why-grid">
            {[
              ["🔄","Herindienen tot inloting","Niet ingeloot? Wij actualiseren ieder tijdvak uw aanvraag en dienen opnieuw in — totdat u ingeloot wordt. Inclusief documentactualisatie, zonder extra kosten."],
              ["🎯","100% SLIM-specialist","Wij doen niets anders dan SLIM-subsidie. Diepgaande kennis van de wet- en regelgeving, de valkuilen én de kansen voor uw situatie."],
              ["🛡️","Succesfee: no cure, no pay","De reserveringsfee bedraagt €199 excl. btw. De succesfee van € 2.500 (excl. btw) betaalt u uitsluitend bij toekenning — en de reserveringsfee wordt dan terugbetaald."],
              ["✅","Foutloze indiening","23 aanvragen vielen vóór de loting af door fouten in tijdvak 1 2026. Wij zorgen voor een correcte aanvraag — zodat u überhaupt meedoet."],
              ["📋","Van A tot Z begeleiding","Quickscan, activiteitenplan, begroting, documentenverzameling, indiening én screeningstraject bij RVO. Alles inbegrepen."],
              ["💰","Scherpste fee-garantie","Vindt u een subsidieadviseur met een lagere fee? Wij duiken eronder."],
              ["⚡","Direct starten","Via onze gratis online quickscan weet u binnen 2 minuten of uw bedrijf in aanmerking komt."],
            ].map(([icon, title, text]) => (
              <div key={title} className="hp-why-card">
                <span className="hp-why-icon">{icon}</span>
                <div className="hp-why-title">{title}</div>
                <div className="hp-why-text">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cases */}
      <div id="cases" className="hp-loting" style={{padding:"72px 20px"}}>
        <div className="hp-si">
          <div className="hp-slbl" style={{color:"var(--blue-light)"}}>Praktijkvoorbeelden</div>
          <h2 className="hp-stitle" style={{color:"#fff"}}>Wat wij voor ondernemers realiseerden</h2>
          <p className="hp-ssub" style={{color:"rgba(255,255,255,0.5)"}}>Drie voorbeelden van succesvolle SLIM-subsidie aanvragen die wij van begin tot eind begeleid hebben.</p>
          <div className="hp-cases-grid">
            <div className="hp-case-card"><div className="hp-case-sector">Zorgvervoer</div><div className="hp-case-title">Ingebedde leermethodiek voor taxibedrijf in zorgvervoer</div><div className="hp-case-desc">Kritische operationele kennis structureel borgen bij alle chauffeurs.</div><div className="hp-case-act">Activiteit C — L&O-methode</div></div>
            <div className="hp-case-card"><div className="hp-case-sector">Interieurverzorging</div><div className="hp-case-title">Leerwerkplek methodiek voor luxe interieurverzorgingsbedrijf</div><div className="hp-case-desc">Vakkennis van ervaren medewerkers overdragen aan nieuwe collega's.</div><div className="hp-case-act">Activiteit C — Leerwerkplek</div></div>
            <div className="hp-case-card"><div className="hp-case-sector">AI & Robotisering</div><div className="hp-case-title">Leermethodiek voor AI-app- en robotiseringsontwikkelaar</div><div className="hp-case-desc">Snel veranderende AI-kennis continu beschikbaar houden voor het team.</div><div className="hp-case-act">Activiteit A + C — Scan & methode</div></div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div id="team" className="hp-section" style={{background:"var(--off)"}}>
        <div className="hp-si">
          <div className="hp-slbl">Ons team</div>
          <h2 className="hp-stitle">Uw SLIM-subsidieadviseurs</h2>
          <p className="hp-ssub">Drie specialisten met diepgaande kennis van de SLIM-regeling en het beoordelingsproces van RVO.</p>
          <div className="hp-team-grid">
            <div className="hp-team-card"><div className="hp-avatar hp-av-d">DS</div><div className="hp-t-name">Daniel Sharif</div><div className="hp-t-role">SLIM Subsidieadviseur</div><div className="hp-t-bio">Specialist in het begeleiden van MKB-aanvragen van quickscan tot succesvolle toekenning.</div></div>
            <div className="hp-team-card"><div className="hp-avatar hp-av-e">EV</div><div className="hp-t-name">Esther Valerius</div><div className="hp-t-role">SLIM Subsidieadviseur</div><div className="hp-t-bio">Expert in compliance en documentenverzameling. Zorgt dat elke aanvraag volledig en correct is vóór indiening.</div></div>
            <div className="hp-team-card"><div className="hp-avatar hp-av-r">RF</div><div className="hp-t-name">Rudolf Favier</div><div className="hp-t-role">SLIM Subsidieadviseur</div><div className="hp-t-bio">Gespecialiseerd in het screeningstraject na inloting. Begeleidt de inhoudelijke beoordeling bij RVO.</div></div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" className="hp-section" style={{background:"var(--white)"}}>
        <div className="hp-si">
          <div className="hp-slbl">Veelgestelde vragen</div>
          <h2 className="hp-stitle">Vragen over SLIM-subsidie</h2>
          <div className="hp-faq-list">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className={`hp-faq-item ${openFaq === i ? "open" : ""}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="hp-faq-q">{item.q}<span className="hp-faq-arr">+</span></div>
                <div className="hp-faq-a"><p>{item.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA sectie */}
      <div className="hp-cta-section">
        <div className="hp-si">
          <div className="hp-slbl" style={{color:"var(--blue-light)",textAlign:"center"}}>Tijdvak 2 2026 — opening 10 augustus</div>
          <h2 className="hp-cta-title">Komt uw bedrijf in aanmerking<br />voor <span>SLIM-subsidie</span>?</h2>
          <p className="hp-cta-sub">Speciaal voor MKB-ondernemers die willen groeien. Doe de gratis quickscan en weet het binnen 2 minuten. Positief resultaat? Start direct met de reserveringsfee van €199 excl. btw (€240,79 incl. btw).</p>
          <div style={{display:"flex",justifyContent:"center"}}>
            <Link href="/scan" className="hp-btn-p" style={{fontSize:16,padding:"15px 34px"}}>Doe de gratis quickscan →</Link>
          </div>
          <p className="hp-cta-note">Gratis quickscan · Reserveringsfee €199 excl. btw · Succesfee €2.500 excl. btw — no cure, no pay</p>
        </div>
      </div>

      {/* Footer */}
      <div className="hp-footer">
        <div className="hp-ft">
          <div className="hp-ft-top">
            <div>
              <div className="logo-slim">SLIM</div>
              <div className="logo-sub">SUBSIDIE</div>
              <div className="logo-adv">ADVIES</div>
              <p className="hp-ft-desc">De specialist in SLIM-subsidie voor MKB-ondernemers. Van quickscan tot toekenning — inclusief het volledige screeningstraject bij RVO.</p>
            </div>
            <div>
              <div className="hp-ft-h">Navigatie</div>
              <ul className="hp-ft-links">
                <li><Link href="/slim">Wat is SLIM-subsidie?</Link></li>
                <li><Link href="/waarom-wij">Waarom via ons?</Link></li>
                <li><Link href="/cases">Praktijkvoorbeelden</Link></li>
                <li><Link href="/team">Ons team</Link></li>
                <li><Link href="/faq">Veelgestelde vragen</Link></li>
                <li><Link href="/lotingsuitslagen">Lotingsuitslagen</Link></li>
                <li><Link href="/projecten">Projecten</Link></li>
                <li><Link href="/scan">Gratis quickscan</Link></li>
              </ul>
            </div>
            <div>
              <div className="hp-ft-h">Contact</div>
              <ul className="hp-ft-links">
                <li><a href={`mailto:${BEDRIJFSINFO.email}`}>{BEDRIJFSINFO.email}</a></li>
                <li><a href={BEDRIJFSINFO.instagram} target="_blank" rel="noreferrer">@slimsubsidieadvies</a></li>
              </ul>
            </div>
          </div>
          <div className="hp-ft-bottom">
            <div className="hp-ft-copy">© 2026 Inscentia BV, handelsnaam SLIM Subsidie Advies &nbsp;·&nbsp; KvK: {BEDRIJFSINFO.kvk} &nbsp;·&nbsp; BTW: {BEDRIJFSINFO.btw}</div>
            <div className="hp-ft-legal">
              <Link href="/privacy">Privacyverklaring</Link>
              <Link href="/av">Algemene voorwaarden</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
