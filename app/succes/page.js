"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LOTING, calcSubsidy, nextDeadline, fmtEur } from "@/data/slim-content";

function LotingBoxFull() {
  const barPct = Math.round((LOTING.inBehandeling / LOTING.totaalIngediend) * 100);
  return (
    <div className="loting-detail">
      <div className="loting-detail-title">📊 Lotingscijfers {LOTING.tijdvak} <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.6 }}>(bron: RVO, 8 mei 2026)</span></div>
      <div className="loting-detail-grid">
        <div className="loting-detail-item"><div className="loting-detail-num">{LOTING.totaalIngediend.toLocaleString("nl-NL")}</div><div className="loting-detail-label">aanvragen ingediend</div></div>
        <div className="loting-detail-item"><div className="loting-detail-num">{LOTING.inLoting.toLocaleString("nl-NL")}</div><div className="loting-detail-label">in notariële loting</div></div>
        <div className="loting-detail-item"><div className="loting-detail-num bad">{LOTING.afgekeurdVoorLoting}</div><div className="loting-detail-label">afgekeurd vóór loting</div></div>
        <div className="loting-detail-item"><div className="loting-detail-num accent">{LOTING.inBehandeling}</div><div className="loting-detail-label">in behandeling genomen</div></div>
        <div className="loting-detail-item"><div className="loting-detail-num warn">~{LOTING.kansRuw}%</div><div className="loting-detail-label">effectieve slaagkans</div></div>
      </div>
      <div className="loting-bar-wrap">
        <div className="loting-bar-label"><span>In behandeling ({LOTING.inBehandeling})</span><span>Niet in behandeling ({LOTING.totaalIngediend - LOTING.inBehandeling})</span></div>
        <div className="loting-bar-track"><div className="loting-bar-fill" style={{ width: `${barPct}%` }} /></div>
      </div>
      <div className="loting-insight" style={{ marginTop: 12 }}><strong>Let op:</strong> {LOTING.afgekeurdVoorLoting} aanvragen werden vóór de loting afgekeurd door fouten. Dit is volledig vermijdbaar met SLIM Subsidie Advies.</div>
    </div>
  );
}

export default function SuccesPage() {
  const [contact, setContact] = useState({ naam: "", bedrijf: "", email: "" });
  const [profile, setProfile] = useState({ medewerkers: "", sector: "" });
  const [selectedActs, setSelectedActs] = useState([]);
  const [answers, setAnswers] = useState({});
  const [investment, setInvestment] = useState("");

  const deadline = nextDeadline();
  const isAgri = answers.agriculture === "yes";
  const invNum = parseFloat(investment) || 0;
  const subsidyEst = invNum >= 8334 ? calcSubsidy(invNum, isAgri) : 0;

  useEffect(() => {
    const saved = sessionStorage.getItem("slimProfiel");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.contact) setContact(p.contact);
        if (p.profile) setProfile(p.profile);
        if (p.selectedActs) setSelectedActs(p.selectedActs);
        if (p.answers) setAnswers(p.answers);
        if (p.investment) setInvestment(p.investment);
        sessionStorage.removeItem("slimProfiel");
      } catch (e) {
        console.error("Herstel profiel mislukt:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-18179556600/kEERCJmq1cEcEPiJ2NxD',
        value: 199,
        currency: 'EUR',
        transaction_id: ''
      });
    }
  }, []);

  return (
    <div className="app">
      <header className="hdr">
        <div className="hdr-inner">
          <Link href="/" className="logo" style={{ textDecoration: "none" }}>
            <span className="logo-slim">SLIM</span>
            <span className="logo-sub">SUBSIDIE</span>
            <span className="logo-adv">ADVIES</span>
          </Link>
          <p className="hdr-title">Komt uw bedrijf in aanmerking voor <span>SLIM-subsidie</span>?</p>
          <p className="hdr-sub">Gratis quickscan · Bedrijfsprofiel · Betaling · Bevestiging</p>
          <div className="prog-bar"><div className="prog-fill" style={{ width: "100%" }} /></div>
        </div>
        <div className="steps-bar">
          {["Quickscan", "Resultaat", "Profiel", "Betaling", "Bevestiging"].map((l, i) => (
            <div key={i} className={`step-tab ${i < 4 ? "done" : "active"}`}>{l}</div>
          ))}
        </div>
      </header>

      <main className="main">
        <div className="phase-lbl"><span className="phase-dot" />Betaling bevestigd</div>
        <div className="card">
          <div className="success-header">
            <span className="success-header-icon">🎉</span>
            <div className="success-header-title">Betaling geslaagd — u ontvangt een bevestiging per e-mail</div>
            <p className="success-header-sub">
              {contact.naam
                ? <>Bedankt, <strong>{contact.naam}</strong>. Een bevestiging met factuur is verstuurd naar <strong>{contact.email}</strong>.</>
                : <>Uw betaling is ontvangen. Een bevestiging met factuur is naar uw e-mailadres verstuurd.</>
              }
            </p>
            <div className="paid-badge">✓ Betaling ontvangen via Mollie</div>
          </div>
          {subsidyEst > 0 && (
            <div className="est-box" style={{ marginBottom: 0 }}>
              <div className="est-label">Uw subsidie-indicatie</div>
              <div className="est-grid" style={{ marginTop: 8 }}>
                <div className="est-item"><div className="est-item-label">Subsidiebedrag</div><div className="est-item-val" style={{ fontSize: 20, color: "var(--green)" }}>{fmtEur(subsidyEst)}</div></div>
                <div className="est-item"><div className="est-item-label">Activiteit(en)</div><div className="est-item-val">{selectedActs.join(" + ") || "—"}</div></div>
                <div className="est-item"><div className="est-item-label">Tijdvak</div><div className="est-item-val">{deadline.label}</div></div>
                <div className="est-item"><div className="est-item-label">Opening</div><div className="est-item-val">{deadline.open.toLocaleDateString("nl-NL")}</div></div>
              </div>
            </div>
          )}
        </div>

        <LotingBoxFull />

        <div className="next-steps">
          <div className="next-steps-title">Wat gebeurt er nu?</div>
          {[
            ["1","Terugbelafspraak binnen 8 werkdagen","Uw adviseur neemt contact op om de aanvraagstrategie te bespreken."],
            ["2","Complete en correcte aanvraagvoorbereiding","Met uw input bereiden wij de documentatie, het activiteitenplan en de begroting op maat voor."],
            ["3","Foutloze & tijdige indiening","Wij zorgen voor een correcte aanvraagindiening via de E-portal. Binnen de deadline."],
            ["4","Ingeloot? Vragenbeantwoording & review","Bij toekenning begeleiden wij u tijdens het subsidie-beoordelingstraject door RVO. En we reviewen uw eindoplevering en dossier. Alles voor dezelfde vaste succesfee van € 2.500 (excl. BTW). De reserveringsfee wordt terugbetaald. Geen toekenning = geen succesfee."],
            ["5","Niet ingeloot? Wij dienen opnieuw in — ieder tijdvak","Wordt uw aanvraag niet ingeloot, dan actualiseren wij alle benodigde documenten en dienen uw aanvraag in het volgende tijdvak opnieuw in. Wij blijven dit doen totdat u ingeloot wordt. Geen extra kosten — inbegrepen in uw pakket."],
          ].map(([num, title, sub]) => (
            <div key={num} className="next-step">
              <div className="next-step-num">{num}</div>
              <div className="next-step-body">
                <div className="next-step-title">{title}</div>
                <div className="next-step-sub">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="summary">
          <div className="sum-lbl">Betalingsoverzicht</div>
          {[
            ["Bedrijf", contact.bedrijf || "—"],
            ["Sector", profile.sector || "—"],
            ["Activiteit(en)", selectedActs.join(" + ") || "—"],
            ["Indicatief subsidiebedrag", subsidyEst > 0 ? fmtEur(subsidyEst) : "—"],
            ["Aanvraagtijdvak", deadline.label],
            ["Succesfee bij toekenning", "€ 2.500 (excl. btw)"],
          ].map(([k, v]) => (
            <div key={k} className="sum-row"><span>{k}</span><span>{v}</span></div>
          ))}
        </div>
      </main>
    </div>
  );
}
