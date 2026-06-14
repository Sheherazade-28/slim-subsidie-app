"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LOTING, calcSubsidy, isEarlyBird, nextDeadline, fmtEur, fmtEur2, ACTIVITEITEN } from "@/data/slim-content";

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
  const [analysis, setAnalysis] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

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
    if (!analysis && !loadingAI) {
      const timer = setTimeout(() => generateAnalysis(), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  async function generateAnalysis() {
    setLoadingAI(true);
    setAnalysis("");
    const savedRaw = sessionStorage.getItem("slimProfiel");
    let savedProfile = {};
    let savedAnswers = {};
    let savedActs = [];
    let savedInv = investment;
    let savedContact = contact;
    if (savedRaw) {
      try {
        const p = JSON.parse(savedRaw);
        savedProfile = p.profile || {};
        savedAnswers = p.answers || {};
        savedActs = p.selectedActs || [];
        savedInv = p.investment || "";
        savedContact = p.contact || {};
      } catch {}
    }

    const actNames =
      (selectedActs.length > 0 ? selectedActs : savedActs).length > 0
        ? (selectedActs.length > 0 ? selectedActs : savedActs)
            .map((id) => ACTIVITEITEN.find((a) => a.id === id)?.title || id)
            .join(" + ")
        : "Nader te bepalen";

    const pr = Object.keys(profile).length > 0 ? profile : savedProfile;
    const ans = Object.keys(answers).length > 0 ? answers : savedAnswers;
    const bedrijfsnaam = (contact.bedrijf || savedContact.bedrijf) || "onbekend";
    const invNumCalc = parseFloat(savedInv || investment) || 0;
    const isAgriCalc = ans.agriculture === "yes";
    const subsidyEstCalc = invNumCalc >= 8334 ? calcSubsidy(invNumCalc, isAgriCalc) : 0;

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1400,
          messages: [
            {
              role: "user",
              content: `Je bent gespecialiseerd adviseur bij SLIM Subsidie Advies. Schrijf een persoonlijke SLIM-subsidieanalyse in het Nederlands voor de ondernemer hieronder.

STRIKTE RICHTLIJNEN:
- Bespreek UITSLUITEND de SLIM-subsidie (Stimulering Leren en Ontwikkelen in het MKB, SLIM-regeling SZW)
- Noem NOOIT andere subsidies, innovatieprogramma's, groeifondsen of regelingen — ook niet als suggestie
- Focus op leren en ontwikkelen van medewerkers en de RVO-aanvraagprocedure
- Max 380 woorden · geen markdown · alinea's gescheiden door een witregel · spreek ondernemer aan met "u"

Bedrijfsprofiel:
- Bedrijf: ${bedrijfsnaam}
- Bedrijfsgrootte: ${ans.size === "groot" ? "Grootbedrijf landbouw/horeca/recreatie" : "MKB"}
- Medewerkers: ${pr.medewerkers || "onbekend"}
- Rechtsvorm: ${pr.rechtsvorm || "onbekend"}
- Sector: ${pr.sector || "onbekend"}
- Provincie: ${pr.provincie || "onbekend"}
- Landbouwsector: ${isAgriCalc ? "Ja" : "Nee"}
- Investering: ${fmtEur(invNumCalc)}
- Indicatief SLIM-subsidiebedrag: ${fmtEur(subsidyEstCalc)}
- Gekozen SLIM-activiteit(en): ${actNames}
- Aanvraagtijdvak: ${deadline.label}

Schrijf vier alinea's:
1. Kansrijkheid voor de SLIM-subsidie
2. Beoordeling gekozen activiteit(en)
3. Lotingsrisico met actuele RVO-cijfers (tijdvak 1 2026: 3.360 ingediend, 474 van 3.337 ingeloot, ~14%)
4. Twee concrete tips + motiverende afsluiting`,
            },
          ],
        }),
      });
      const data = await res.json();
      setAnalysis(data.content?.map((b) => b.text || "").join("") || "Analyse kon niet worden geladen.");
    } catch {
      setAnalysis("Er is een fout opgetreden. Uw adviseur neemt spoedig contact op.");
    }
    setLoadingAI(false);
  }

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
          <p className="hdr-sub">Gratis quickscan · Bedrijfsprofiel · Betaling · Persoonlijke AI-analyse</p>
          <div className="prog-bar"><div className="prog-fill" style={{ width: "100%" }} /></div>
        </div>
        <div className="steps-bar">
          {["Quickscan", "Resultaat", "Profiel", "Betaling", "Analyse"].map((l, i) => (
            <div key={i} className={`step-tab ${i < 4 ? "done" : "active"}`}>{l}</div>
          ))}
        </div>
      </header>

      <main className="main">
        <div className="phase-lbl"><span className="phase-dot" />Uw persoonlijke SLIM-analyse</div>
        <div className="card">
          <div className="success-header">
            <span className="success-header-icon">🎉</span>
            <div className="success-header-title">Betaling geslaagd — uw analyse wordt gegenereerd</div>
            <p className="success-header-sub">
              {contact.naam
                ? <>Bedankt, <strong>{contact.naam}</strong>. Een bevestiging met factuur is verstuurd naar <strong>{contact.email}</strong>.</>
                : <>Uw betaling is ontvangen. Een bevestiging met factuur is naar uw e-mailadres verstuurd.</>
              }
            </p>
            <div className="paid-badge">✓ Betaling ontvangen via Mollie</div>
          </div>
          <div className="ai-box">
            <div className="ai-label">Uw Persoonlijke AI Diepteanalyse — SLIM Subsidie Advies</div>
            {loadingAI ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div className="spinner" />
                <p style={{ fontSize: 13, color: "var(--muted)" }}>Uw analyse wordt samengesteld op basis van uw bedrijfsprofiel en de actuele lotingscijfers…</p>
              </div>
            ) : (
              <div className="ai-text">{analysis || "Uw analyse wordt geladen…"}</div>
            )}
          </div>
          {!loadingAI && subsidyEst > 0 && (
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

        {!loadingAI && <LotingBoxFull />}

        {!loadingAI && (
          <div className="next-steps">
            <div className="next-steps-title">Wat gebeurt er nu?</div>
            {[
              ["1","Terugbelafspraak binnen 8 werkdagen","Uw adviseur neemt contact op om de analyse door te nemen en de aanvraagstrategie te bespreken."],
              ["2","Complete en correcte aanvraagvoorbereiding","Met uw input bereiden wij de documentatie, het activiteitenplan en de begroting op maat voor."],
              ["3","Foutloze & tijdige indiening","Wij zorgen voor een correcte aanvraagindiening via de E-portal. Binnen de deadline."],
              ["4","Ingeloot? Vragenbeantwoording & review","Bij toekenning begeleiden wij u tijdens het subsidie-beoordelingstraject door RVO. En we reviewen uw eindoplevering en dossier. Alles voor dezelfde vaste succesfee van € 2.500 (excl. BTW). De dieptecheck wordt terugbetaald. Geen toekenning = geen succesfee."],
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
        )}

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
