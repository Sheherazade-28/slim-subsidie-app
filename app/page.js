"use client";

import Link from "next/link";
import { useState } from "react";
import { LOTING, FAQ, BEDRIJFSINFO, SUBSIDIE, PRICING, TIJDVAKKEN_2026 } from "@/data/slim-content";
import Navigation from "@/components/layout/Navigation";
import TeamAvatar from "@/components/ui/TeamAvatar";

const tv1 = TIJDVAKKEN_2026.find((t) => t.label === "Tijdvak 1 2026");
const tv2 = TIJDVAKKEN_2026.find((t) => t.label === "Tijdvak 2 2026");
const tvSamenwerking = TIJDVAKKEN_2026.find((t) => t.type === "samenwerking");

function fmtDatumTijd(d) {
  return `${d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })} ${d.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })}`;
}

const STATUS_MAP = {
  gesloten:  { dotClass: "done",   badgeClass: "closed", badgeText: "Gesloten" },
  binnenkort:{ dotClass: "active", badgeClass: "open",   badgeText: "Opent binnenkort" },
  open:      { dotClass: "active", badgeClass: "open",   badgeText: "Open" },
  volgt:     { dotClass: "future", badgeClass: "closed", badgeText: "Volgt" },
};

const minInv = SUBSIDIE.minProjectomvang.toLocaleString("nl-NL");
const minSub = SUBSIDIE.minSubsidie.toLocaleString("nl-NL");
const btwIncl = (PRICING.reserveringsfee * (1 + PRICING.btw)).toFixed(2).replace(".", ",");

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(null);

  const tv2OpenMaand = tv2.open.toLocaleDateString("nl-NL", { day: "numeric", month: "long" });

  return (
    <div className="hp">
      <Navigation />

      {/* Hero */}
      <div className="hp-hero">
        <div className="hp-hero-inner">
          <div>
            <div className="hp-badge"><span className="phase-dot" />&nbsp;Gratis quickscan · Start vanaf €{PRICING.reserveringsfee} excl. btw · Retour bij toekenning</div>
            <h1 className="hp-h1">Haal tot €25.000 subsidie op<br /><span>voor leren en ontwikkelen</span></h1>
            <p className="hp-sub">Ondernemen terwijl wij de subsidie regelen. Start met een gratis quickscan en weet binnen 2 minuten of uw bedrijf in aanmerking komt.</p>
            <div className="hp-ctas">
              <Link href="/scan" className="hp-btn-p">Doe de gratis quickscan →</Link>
              <Link href="/slim-subsidie" className="hp-btn-s">Meer over SLIM-subsidie</Link>
            </div>
            <div className="hp-stats">
              <div><div className="hp-stat-num">tot €<em>{SUBSIDIE.maxBedrag.toLocaleString("nl-NL")}</em></div><div className="hp-stat-lbl">subsidie</div></div>
              <div><div className="hp-stat-num">tot <em>{SUBSIDIE.percentage}</em>%</div><div className="hp-stat-lbl">Vergoeding investering</div></div>
              <div><div className="hp-stat-num">€<em>{PRICING.reserveringsfee}</em></div><div className="hp-stat-lbl">Reserveringsfee (excl. btw)</div></div>
            </div>
          </div>
          <div>
            <div className="hp-card">
              <div className="hp-card-title">Subsidiepercentages</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(255,255,255,0.06)",borderRadius:10,padding:"14px 18px",marginBottom:6}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:32,fontWeight:800,color:"var(--blue-light)",lineHeight:1}}>{SUBSIDIE.percentage}%</div>
                <div style={{fontSize:13,fontWeight:600,color:"#fff",textAlign:"right",lineHeight:1.45}}>subsidie · tot €{SUBSIDIE.maxBedrag.toLocaleString("nl-NL")}<br /><span style={{fontWeight:400,color:"rgba(255,255,255,0.55)"}}>voor alle MKB *</span></div>
              </div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",marginBottom:4,lineHeight:1.4}}>* Geldt voor individuele MKB-ondernemingen</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",marginBottom:16,lineHeight:1.4}}>** Uitzondering: landbouwbedrijven max. €{SUBSIDIE.maxBedragLandbouw.toLocaleString("nl-NL")} (art. 2.20 lid 1 SLIM-regeling)</div>
              <div className="hp-card-title" style={{marginTop:4}}>Aanvraagtijdvakken 2026</div>
              <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:"0.6px",marginTop:10,marginBottom:6}}>Individueel MKB</div>
              <div className="hp-tl">
                <div className="hp-tl-item">
                  <div className={`hp-tl-dot ${STATUS_MAP[tv1.status].dotClass}`} />
                  <div className="hp-tl-text"><strong>{tv1.label.replace(" 2026","")}</strong> — {fmtDatumTijd(tv1.open)} t/m {fmtDatumTijd(tv1.close)} uur</div>
                  <span className={`hp-tl-badge ${STATUS_MAP[tv1.status].badgeClass}`}>{STATUS_MAP[tv1.status].badgeText}</span>
                </div>
                <div className="hp-tl-item">
                  <div className={`hp-tl-dot ${STATUS_MAP[tv2.status].dotClass}`} />
                  <div className="hp-tl-text"><strong>{tv2.label.replace(" 2026","")}</strong> — {fmtDatumTijd(tv2.open)} t/m {fmtDatumTijd(tv2.close)} uur</div>
                  <span className={`hp-tl-badge ${STATUS_MAP[tv2.status].badgeClass}`}>{STATUS_MAP[tv2.status].badgeText}</span>
                </div>
              </div>
              <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:"0.6px",marginTop:14,marginBottom:4}}>Samenwerkingsverbanden</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginBottom:8}}>Minimaal twee MKB-ondernemingen</div>
              <div className="hp-tl">
                <div className="hp-tl-item">
                  <div className={`hp-tl-dot ${STATUS_MAP[tvSamenwerking.status].dotClass}`} />
                  <div className="hp-tl-text"><strong>Samenwerking 2026</strong> — {fmtDatumTijd(tvSamenwerking.open)} t/m {fmtDatumTijd(tvSamenwerking.close)} uur</div>
                  <span className={`hp-tl-badge ${STATUS_MAP[tvSamenwerking.status].badgeClass}`}>{STATUS_MAP[tvSamenwerking.status].badgeText}</span>
                </div>
              </div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:8,lineHeight:1.5}}>Informatie over onze begeleiding bij samenwerkingsverbanden is beschikbaar op aanvraag gezien het maatwerk karakter van deze trajecten.</div>
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
              <div className="hp-how-title">Reserveer uw aanvraagplaats</div>
              <div className="hp-how-text">Voor €{PRICING.reserveringsfee} excl. btw reserveert u uw aanvraagplaats. Wij beoordelen uw projectidee, voeren een intakegesprek en bereiden uw subsidieaanvraag volledig voor. Wordt u niet ingeloot? Dan dienen wij uw aanvraag in een volgend tijdvak kosteloos opnieuw in, totdat u wordt ingeloot.</div>
            </div>
            <div className="hp-how-arrow">→</div>
            <div className="hp-how-card">
              <div className="hp-how-num">3</div>
              <div className="hp-how-title">Ingeloot? Volledige begeleiding</div>
              <div className="hp-how-text">U ontvangt de reserveringsfee retour bij toekenning. Voor een vaste succesfee van €{PRICING.succesfee.toLocaleString("nl-NL")} excl. btw begeleiden wij u volledig, van inhoudelijke beoordeling en vragenbeantwoording tot review van het eindproduct.</div>
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
            <p><strong>Wat betekent inloting?</strong> Inloting betekent dat uw aanvraag in behandeling wordt genomen — niet dat subsidie is toegekend. Na inloting volgt een inhoudelijke beoordeling door RVO. Wij begeleiden dit screeningstraject voor dezelfde vaste succesfee van <strong>€ {PRICING.succesfee.toLocaleString("nl-NL")} (excl. btw)</strong>.</p>
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
          <p className="hp-ssub">De SLIM-subsidie vergoedt {SUBSIDIE.percentage}% van uw investering in leren, opleiden en ontwikkelen van uw medewerkers — tot €{SUBSIDIE.maxBedrag.toLocaleString("nl-NL")} per aanvraag. Beschikbaar via drie activiteiten: doorlichting van uw organisatie (A), loopbaanadviezen per medewerker (B) en het invoeren van een structurele leer- en ontwikkelmethode (C). De regeling loopt tot en met 2029 en staat open voor alle MKB-ondernemingen met minimaal één werknemer in loondienst.</p>
          <div style={{marginTop:20}}>
            <Link href="/slim-subsidie" className="hp-btn-s" style={{color:"var(--navy)",borderColor:"rgba(13,46,90,0.3)",background:"var(--white)"}}>Meer over de SLIM-subsidie →</Link>
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
              ["🛡️","Succesfee: no cure, no pay",`De reserveringsfee bedraagt €${PRICING.reserveringsfee} excl. btw. De succesfee van € ${PRICING.succesfee.toLocaleString("nl-NL")} (excl. btw) betaalt u uitsluitend bij toekenning — en de reserveringsfee wordt dan terugbetaald.`],
              ["✅","Foutloze indiening",`${LOTING.afgekeurdVoorLoting} aanvragen vielen vóór de loting af door fouten in tijdvak 1 2026. Wij zorgen voor een correcte aanvraag — zodat u überhaupt meedoet.`],
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
            <div className="hp-case-card"><div className="hp-case-sector">Interieurverzorging</div><div className="hp-case-title">Leerwerkplek methodiek voor luxe interieurverzorgingsbedrijf</div><div className="hp-case-desc">Vakkennis van ervaren medewerkers overdragen aan nieuwe collega&apos;s.</div><div className="hp-case-act">Activiteit C — Leerwerkplek</div></div>
            <div className="hp-case-card"><div className="hp-case-sector">AI &amp; Robotisering</div><div className="hp-case-title">Leermethodiek voor AI-app- en robotiseringsontwikkelaar</div><div className="hp-case-desc">Snel veranderende AI-kennis continu beschikbaar houden voor het team.</div><div className="hp-case-act">Activiteit A + C — Scan &amp; methode</div></div>
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
            {[
              { slug: "nasser-sharifi", naam: "Nasser Sharifi", objectPosition: "center 20%", bio: "Specialist in het intelligent matchen van MKB-aanvragen met de diverse SLIM-subsidietoepassingen." },
              { slug: "esther-valerius", naam: "Esther Valerius", objectPosition: "center 20%", bio: "Expert in SLIM-subsidies, wet- en regelgeving en RVO-beoordelingen. Begeleidt subsidieaanvragen inhoudelijk en zorgt voor een optimale aansluiting op de subsidievoorwaarden." },
              { slug: "rudolf-favier", naam: "Rudolf Favier", objectPosition: "center 20%", bio: "Expert in compliance en documentenverzameling. Zorgt dat elke aanvraag volledig en correct is vóór indiening." },
            ].map(({ slug, naam, objectPosition, bio }) => (
              <div key={slug} className="hp-team-card">
                <TeamAvatar slug={slug} naam={naam} objectPosition={objectPosition} />
                <div className="hp-t-name">{naam}</div>
                <div className="hp-t-role">SLIM Subsidieadviseur</div>
                <div className="hp-t-bio">{bio}</div>
              </div>
            ))}
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
          <div className="hp-slbl" style={{color:"var(--blue-light)",textAlign:"center"}}>Tijdvak 2 2026 — opening {tv2OpenMaand}</div>
          <h2 className="hp-cta-title">Komt uw bedrijf in aanmerking<br />voor <span>SLIM-subsidie</span>?</h2>
          <p className="hp-cta-sub">Speciaal voor MKB-ondernemers die willen groeien. Doe de gratis quickscan en weet het binnen 2 minuten. Positief resultaat? Start direct met de reserveringsfee van €{PRICING.reserveringsfee} excl. btw (€{btwIncl} incl. btw).</p>
          <div style={{display:"flex",justifyContent:"center"}}>
            <Link href="/scan" className="hp-btn-p" style={{fontSize:16,padding:"15px 34px"}}>Doe de gratis quickscan →</Link>
          </div>
          <p className="hp-cta-note">Gratis quickscan · Reserveringsfee €{PRICING.reserveringsfee} excl. btw · Succesfee €{PRICING.succesfee.toLocaleString("nl-NL")} excl. btw — no cure, no pay</p>
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
                <li><Link href="/slim-subsidie">Wat is SLIM-subsidie?</Link></li>
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
