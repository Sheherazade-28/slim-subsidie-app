"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  QUESTIONS,
  ACTIVITEITEN,
  RECHTSVORMEN,
  SECTOREN,
  PROVINCIES,
  LOTING,
  calcSubsidy,
  nextDeadline,
  fmtEur,
  fmtEur2,
} from "@/data/slim-content";

export const metadata_scan = {
  title: "Gratis SLIM Subsidie Quickscan",
  description:
    "Doe de gratis quickscan en weet in 2 minuten of uw bedrijf in aanmerking komt voor SLIM-subsidie. Tot €25.000 voor MKB-ondernemers met personeel in loondienst.",
};

const STEP_LABELS = ["Quickscan", "Resultaat", "Profiel", "Betaling", "Analyse"];
const PHASE_IDX = { scan: 0, ko: 0, result: 1, profile: 2, payment: 3 };
const progress = [10, 25, 45, 68, 100];

function LotingBoxCompact() {
  return (
    <div className="loting-box">
      <div className="loting-box-title">⚠️ Lotingscijfers {LOTING.tijdvak} — ken de realiteit</div>
      <div className="loting-stats">
        <div className="loting-stat"><div className="loting-stat-num orange">{LOTING.inLoting.toLocaleString("nl-NL")}</div><div className="loting-stat-label">in loting (van 3.360 ingediend)</div></div>
        <div className="loting-stat"><div className="loting-stat-num red">{LOTING.afgekeurdVoorLoting}</div><div className="loting-stat-label">afgekeurd vóór loting</div></div>
        <div className="loting-stat"><div className="loting-stat-num green">{LOTING.inBehandeling}</div><div className="loting-stat-label">in behandeling</div></div>
      </div>
      <div className="loting-kans">
        <div className="loting-kans-pct">~{LOTING.kansRuw}%</div>
        <div className="loting-kans-text">Van de {LOTING.totaalIngediend.toLocaleString("nl-NL")} ingediende aanvragen zijn i.v.m. het maximale subsidiebudget de eerste {LOTING.inBehandeling} aanvragen van de lotingslijst in behandeling genomen.</div>
      </div>
      <div className="loting-cta">💡 <strong>Conclusie:</strong> een correcte, complete aanvraag is de eerste stap. Wij zorgen voor stap één.</div>
    </div>
  );
}

export default function ScanPage() {
  const [phase, setPhase] = useState("scan");
  const [answers, setAnswers] = useState({});
  const [investment, setInvestment] = useState("");
  const [koMsg, setKoMsg] = useState(null);
  const [contact, setContact] = useState({ naam: "", bedrijf: "", email: "", telefoon: "" });
  const [payMethod, setPayMethod] = useState("ideal");
  const [confirmed, setConfirmed] = useState({ terms: false, nocure: false });
  const [processing, setProcessing] = useState(false);
  const [kvkInput, setKvkInput] = useState("");
  const [profile, setProfile] = useState({ medewerkers: "", rechtsvorm: "", sector: "", provincie: "" });
  const [selectedActs, setSelectedActs] = useState([]);

  const deadline = nextDeadline();
  const price = 199;
  const priceIncl = price * 1.21;
  const isAgri = answers.agriculture === "yes";
  const invNum = parseFloat(investment.replace(",", ".")) || 0;
  const subsidyEst = invNum >= 8334 ? calcSubsidy(invNum, isAgri) : 0;
  const allScanDone = QUESTIONS.every((q) => answers[q.id] !== undefined) && invNum >= 8334;
  const profileOk =
    profile.medewerkers &&
    profile.rechtsvorm &&
    profile.sector &&
    profile.provincie &&
    selectedActs.length > 0 &&
    contact.bedrijf;

  const curStep = PHASE_IDX[phase] || 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [phase]);

  function answer(id, v) {
    const q = QUESTIONS.find((q) => q.id === id);
    setAnswers((p) => ({ ...p, [id]: v }));
    if (q.ko && v === q.ko) {
      setKoMsg(q.koMsg);
      setTimeout(() => setPhase("ko"), 150);
    }
  }

  function toggleAct(id) {
    setSelectedActs((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }

  async function submitPayment() {
    if (!contact.naam || !contact.email) {
      alert("Vul uw naam en e-mailadres in.");
      return;
    }
    setProcessing(true);
    try {
      sessionStorage.setItem(
        "slimProfiel",
        JSON.stringify({ contact, profile, selectedActs, answers, investment, subsidyEst })
      );
      const res = await fetch("/api/betaling/aanmaken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          naam: contact.naam,
          bedrijf: contact.bedrijf,
          email: contact.email,
          telefoon: contact.telefoon,
          methode: payMethod,
          activiteiten: selectedActs,
          subsidyEst,
          profile,
          answers,
          investment: invNum,
        }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.error || "Er ging iets mis.");
        setProcessing(false);
      }
    } catch {
      alert("Er ging iets mis.");
      setProcessing(false);
    }
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
          <div className="prog-bar"><div className="prog-fill" style={{ width: `${progress[curStep]}%` }} /></div>
        </div>
        <div className="steps-bar">
          {STEP_LABELS.map((l, i) => (
            <div key={i} className={`step-tab ${i < curStep ? "done" : i === curStep ? "active" : ""}`}>{l}</div>
          ))}
        </div>
      </header>

      <main className="main">
        {/* SCAN */}
        {phase === "scan" && (
          <>
            <div className="phase-lbl"><span className="phase-dot" />Stap 1 — Gratis Quickscan</div>
            <div className="card">
              <div className="card-title">Basischeck subsidievoorwaarden</div>
              <p className="card-sub">Beantwoord 8 korte vragen om te controleren of uw bedrijf in aanmerking komt voor SLIM-subsidie (tot €25.000). Duurt minder dan 2 minuten.</p>
              {QUESTIONS.map((q, i) => (
                <div key={q.id} className="q-block">
                  <div className="q-label"><span className="q-num">{i + 1}</span>{q.label}</div>
                  {q.hint && <p className="q-hint">{q.hint}</p>}
                  <div className="options">
                    {q.options.map((o) => (
                      <label key={o.v} className={`opt ${answers[q.id] === o.v ? "sel" : ""}`} onClick={() => answer(q.id, o.v)}>
                        <span className="opt-radio"><span className="opt-dot" /></span>{o.l}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div className="q-block">
                <div className="q-label"><span className="q-num">8</span>Wat is de verwachte totale investering in leer- en ontwikkelactiviteiten?</div>
                <p className="q-hint">Uren medewerkers + externe kosten. Minimaal {fmtEur(8334)} voor een minimale subsidie van €5.000.</p>
                <div className="input-wrap">
                  <span className="input-pfx">€</span>
                  <input className="num-input" type="number" min="0" placeholder="bijv. 30000" value={investment} onChange={(e) => setInvestment(e.target.value)} />
                </div>
                {subsidyEst > 0 && <p className="input-hint">✓ Indicatief subsidiebedrag: {fmtEur(subsidyEst)}</p>}
              </div>
              <div className="btn-row">
                <button className="btn btn-primary" onClick={() => setPhase("result")} disabled={!allScanDone}>Bekijk resultaat →</button>
              </div>
            </div>
            <div className="alert-info">🔒 Uw gegevens worden veilig verwerkt en niet gedeeld met derden.</div>
          </>
        )}

        {/* KO */}
        {phase === "ko" && (
          <>
            <div className="phase-lbl"><span className="phase-dot" style={{ background: "var(--red)" }} />Resultaat Quickscan</div>
            <div className="result fail">
              <span className="result-icon">✗</span>
              <div className="result-title">Helaas — uw bedrijf komt (nog) niet in aanmerking</div>
              <p className="result-body">Op basis van uw antwoorden is een harde uitsluitingsgrond van toepassing.</p>
              <div className="ko-box">{koMsg}</div>
            </div>
            <div className="card">
              <div className="card-title">Wat kunt u nu doen?</div>
              <ul className="info-list">
                <li><span>📞</span>Neem contact met ons op — er zijn mogelijk alternatieve subsidiemogelijkheden.</li>
                <li><span>🔄</span>Is de situatie binnenkort anders? Kom terug voor een nieuwe check.</li>
                <li><span>🤝</span>U kunt mogelijk deelnemen als partner in een samenwerkingsverband.</li>
              </ul>
              <div className="btn-row">
                <button className="btn btn-ghost" onClick={() => { setPhase("scan"); setAnswers({}); setKoMsg(null); }}>← Opnieuw beginnen</button>
              </div>
            </div>
          </>
        )}

        {/* RESULT */}
        {phase === "result" && (
          <>
            <div className="phase-lbl"><span className="phase-dot" />Stap 2 — Resultaat Quickscan</div>
            <div className="result ok">
              <span className="result-icon">✓</span>
              <div className="result-title">Goed nieuws — geen uitsluitingsgronden gevonden</div>
              <p className="result-body">Op basis van uw antwoorden lijkt uw bedrijf in aanmerking te komen voor de SLIM-subsidie.</p>
              <div className="est-box">
                <div className="est-label">Indicatief subsidiebedrag</div>
                <div className="est-amount">{fmtEur(subsidyEst)}</div>
                <div className="est-sub">60% van {fmtEur(invNum)}{isAgri ? " (max. €20.000 voor landbouw)" : " (max. €25.000)"}</div>
                <div className="est-grid">
                  <div className="est-item"><div className="est-item-label">Tijdvak</div><div className="est-item-val">{deadline.label}</div></div>
                  <div className="est-item"><div className="est-item-label">Opening aanvraag</div><div className="est-item-val">{deadline.open.toLocaleDateString("nl-NL")}</div></div>
                  <div className="est-item"><div className="est-item-label">Subsidie %</div><div className="est-item-val">60%</div></div>
                </div>
              </div>
            </div>
            <LotingBoxCompact />
            <div className="card">
              <div className="card-title">Uw kans is reëel — maar alleen met een sterke aanvraag</div>
              <p className="card-sub">Van de {LOTING.totaalIngediend.toLocaleString("nl-NL")} ingediende aanvragen in tijdvak 1 2026 werd slechts 14% ingeloot — en vielen er al 23 uit vóór de loting door vermijdbare fouten.</p>
              <div className="pricing">
                <div className="pricing-head">
                  <div className="pricing-head-title">SLIM RESERVERING + AANVRAAGBEGELEIDING</div>
                  <div className="pricing-head-sub">Van analyse tot foutloze indiening — én herindienen totdat u ingeloot wordt</div>
                </div>
                <div className="pricing-body">
                  <div className="price-row">
                    <span className="price-main">{fmtEur(price)}</span>
                    <span className="price-lbl">excl. btw</span>
                  </div>
                  <p className="price-incl-note">📌 Totaal af te schrijven: <strong>{fmtEur2(priceIncl)} incl. btw</strong> ({fmtEur(price)} + 21% btw)</p>
                  <ul className="features">
                    <li><span className="feat-check">✓</span><strong>Direct na betaling:</strong> AI-diepteanalyse van uw situatie</li>
                    <li><span className="feat-check">✓</span>Terugbelafspraak met uw adviseur binnen 8 werkdagen</li>
                    <li><span className="feat-check">✓</span>Foutloze aanvraag — nooit afgekeurd vóór de loting</li>
                    <li><span className="feat-check">✓</span>Activiteitenplan, begroting en documentenverzameling</li>
                    <li><span className="feat-check">✓</span>Compliance-check en indiening via RVO e-portaal</li>
                    <li><span className="feat-check">✓</span><strong>Niet ingeloot?</strong> Wij actualiseren ieder tijdvak uw aanvraag en dienen opnieuw in — totdat u ingeloot wordt</li>
                  </ul>
                  <div className="nocure-note"><strong>No cure, no pay:</strong> Bij toekenning betaalt u een succesfee van <strong>€ 2.500</strong> (excl. btw). De reserveringsfee wordt u bij toekenning terugbetaald. Geen subsidie = geen succesfee.</div>
                  <div className="btn-row">
                    <button className="btn btn-primary" onClick={() => setPhase("profile")}>Vul bedrijfsprofiel in →</button>
                    <button className="btn btn-ghost" onClick={() => { setPhase("scan"); setAnswers({}); }}>← Terug</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* PROFILE */}
        {phase === "profile" && (
          <>
            <div className="phase-lbl"><span className="phase-dot" />Stap 3 — Bedrijfsprofiel</div>
            <div className="card">
              <div className="card-title">Bedrijfsidentificatie</div>
              <p className="card-sub">Vul uw KvK-nummer en bedrijfsnaam in.</p>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">KvK-nummer</label>
                  <input className="form-input" placeholder="12345678" maxLength={8} value={kvkInput} onChange={(e) => setKvkInput(e.target.value.replace(/\D/g, ""))} />
                  <p className="form-hint">8-cijferig nummer</p>
                </div>
                <div className="form-group">
                  <label className="form-label">Bedrijfsnaam *</label>
                  <input className="form-input" placeholder="Uw Bedrijf" value={contact.bedrijf} onChange={(e) => setContact((p) => ({ ...p, bedrijf: e.target.value }))} />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-title">Bedrijfsgegevens</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Aantal medewerkers *</label>
                  <select className="form-select" value={profile.medewerkers} onChange={(e) => setProfile((p) => ({ ...p, medewerkers: e.target.value }))}>
                    <option value="">Selecteer...</option>
                    {["1–5 medewerkers","6–10 medewerkers","11–25 medewerkers","26–50 medewerkers","51–100 medewerkers","101–249 medewerkers","250+ medewerkers"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Rechtsvorm *</label>
                  <select className="form-select" value={profile.rechtsvorm} onChange={(e) => setProfile((p) => ({ ...p, rechtsvorm: e.target.value }))}>
                    <option value="">Selecteer...</option>
                    {RECHTSVORMEN.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Sector *</label>
                  <select className="form-select" value={profile.sector} onChange={(e) => setProfile((p) => ({ ...p, sector: e.target.value }))}>
                    <option value="">Selecteer...</option>
                    {SECTOREN.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Provincie *</label>
                  <select className="form-select" value={profile.provincie} onChange={(e) => setProfile((p) => ({ ...p, provincie: e.target.value }))}>
                    <option value="">Selecteer...</option>
                    {PROVINCIES.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-title">Welke activiteit(en) passen bij uw situatie?</div>
              <p className="card-sub">Selecteer één of meerdere subsidiabele activiteiten (Art. 2.4 SLIM-regeling).</p>
              <div className="act-grid">
                {ACTIVITEITEN.map((act) => (
                  <div key={act.id} className={`act-card ${selectedActs.includes(act.id) ? "selected" : ""}`} onClick={() => toggleAct(act.id)}>
                    <div className="act-card-header">
                      <div className="act-checkbox">{selectedActs.includes(act.id) && "✓"}</div>
                      <div className="act-card-body">
                        <div className={`act-tag ${act.tagClass}`}>{act.tag}</div>
                        <div className="act-title">{act.title}</div>
                        <div className="act-desc">{act.desc}</div>
                        <div className="act-examples">{act.examples.map((ex) => <span key={ex} className="act-example">{ex}</span>)}</div>
                        <div className="act-min">{act.min}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="btn-row">
                <button className="btn btn-primary" onClick={() => setPhase("payment")} disabled={!profileOk}>Verder naar betaling →</button>
                <button className="btn btn-ghost" onClick={() => setPhase("result")}>← Terug</button>
              </div>
              {!profileOk && <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>Vul alle verplichte velden in en selecteer minimaal 1 activiteit.</p>}
            </div>
          </>
        )}

        {/* PAYMENT */}
        {phase === "payment" && (
          <>
            <div className="phase-lbl"><span className="phase-dot" />Stap 4 — Betaling</div>
            <div className="card" style={{ borderLeft: "3px solid var(--blue-light)" }}>
              <div className="card-title">Wat u direct na betaling ontvangt</div>
              <ul className="features" style={{ marginBottom: 0 }}>
                <li><span className="feat-check">✓</span><strong>Uw persoonlijke AI-diepteanalyse</strong> — direct zichtbaar na terugkeer van de betaalpagina</li>
                <li><span className="feat-check">✓</span>Bevestigingsmail met factuur</li>
                <li><span className="feat-check">✓</span>Terugbelafspraak met uw adviseur binnen 8 werkdagen</li>
                <li><span className="feat-check">✓</span>Start volledige aanvraagbegeleiding richting {deadline.label}</li>
                <li><span className="feat-check">✓</span><strong>Herindienen inbegrepen:</strong> niet ingeloot? Wij actualiseren uw aanvraag ieder tijdvak en dienen opnieuw in — totdat u ingeloot wordt</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-title">Uw contactgegevens</div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Uw naam *</label><input className="form-input" placeholder="Jan de Vries" value={contact.naam} onChange={(e) => setContact((p) => ({ ...p, naam: e.target.value }))} /></div>
                <div className="form-group"><label className="form-label">Bedrijfsnaam</label><input className="form-input" placeholder="De Vries BV" value={contact.bedrijf} onChange={(e) => setContact((p) => ({ ...p, bedrijf: e.target.value }))} /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">E-mailadres *</label><input className="form-input" type="email" placeholder="jan@devries.nl" value={contact.email} onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))} /></div>
                <div className="form-group"><label className="form-label">Telefoonnummer</label><input className="form-input" placeholder="06-12345678" value={contact.telefoon} onChange={(e) => setContact((p) => ({ ...p, telefoon: e.target.value }))} /></div>
              </div>
            </div>
            <div className="card">
              <div className="card-title">Betaling via Mollie</div>
              <div className="pay-box">
                <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 4 }}>Te betalen (incl. btw)</p>
                <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 38, fontWeight: 800, color: "var(--navy)", lineHeight: 1 }}>
                  {fmtEur2(priceIncl)}
                </p>
                <p style={{ fontSize: 12, color: "var(--muted)", margin: "6px 0 14px" }}>{fmtEur(price)} excl. btw + {fmtEur2(price * 0.21)} btw (21%)</p>
                <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>Kies uw betaalmethode:</p>
                <div className="pay-methods">
                  <button className={`pay-btn ${payMethod === "ideal" ? "active" : ""}`} onClick={() => setPayMethod("ideal")}><span className="ideal">iD</span>iDEAL</button>
                  <button className={`pay-btn ${payMethod === "creditcard" ? "active" : ""}`} onClick={() => setPayMethod("creditcard")}>💳 Creditcard</button>
                  <button className={`pay-btn ${payMethod === "bancontact" ? "active" : ""}`} onClick={() => setPayMethod("bancontact")}>🏦 Bancontact</button>
                </div>
                <div className="pay-secure">🔒 Veilig betalen via Mollie — SSL-versleuteld</div>
              </div>
              <div className="divider" />
              <div className="card-title" style={{ marginBottom: 14 }}>Bevestiging</div>
              <label className={`ccheck ${confirmed.terms ? "on" : ""}`} onClick={() => setConfirmed((p) => ({ ...p, terms: !p.terms }))}>
                <span className="cbox">{confirmed.terms && "✓"}</span>
                <span className="ccheck-text">Ik ga akkoord met de <a href="https://www.slimsubsidieadvies.nl/av" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>algemene voorwaarden</a> en de <a href="https://www.slimsubsidieadvies.nl/privacy" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>privacyverklaring</a> van SLIM Subsidie Advies.</span>
              </label>
              <label className={`ccheck ${confirmed.nocure ? "on" : ""}`} onClick={() => setConfirmed((p) => ({ ...p, nocure: !p.nocure }))}>
                <span className="cbox">{confirmed.nocure && "✓"}</span>
                <span className="ccheck-text">Ik begrijp het no cure, no pay model: bij toekenning betaal ik een succesfee van € 2.500 (excl. btw). De reserveringsfee wordt mij bij toekenning terugbetaald. Geen subsidie = geen succesfee.</span>
              </label>
              <div className="btn-row">
                <button className="btn btn-primary" onClick={submitPayment} disabled={!confirmed.terms || !confirmed.nocure || !contact.naam || !contact.email || processing}>
                  {processing ? "Doorsturen naar Mollie…" : `Betaal ${fmtEur2(priceIncl)} incl. btw via Mollie →`}
                </button>
                <button className="btn btn-ghost" onClick={() => setPhase("profile")}>← Terug</button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
