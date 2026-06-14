"use client";

import { useState } from "react";
import Link from "next/link";
import { PRICING, SUBSIDIE, TIJDVAKKEN_2026 } from "@/data/slim-content";

const tv2 = TIJDVAKKEN_2026.find((t) => t.label === "Tijdvak 2 2026");
const tv2OpenLabel = `${tv2.open.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })} om ${tv2.open.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })} uur`;

const MIN_KANSRIJK = SUBSIDIE.minSubsidiabeleKostenAC; // €5.000
const MIN_MOGELIJK = 3000; // quickscan drempel voor 'mogelijk kansrijk'

const STAP_LABELS = ["Quickscan", "Resultaat", "Reservering", "Intake"];

const MEDEWERKERS_OPTIES = ["2–10", "11–50", "51–100", "101–250"];

const VRAGEN = [
  {
    id: "personeel",
    vraag: "Heeft uw bedrijf personeel in dienst?",
    subtekst: "Minimaal één werknemer met arbeidscontract (geen aandeelhouders-DGA of zzp'ers).",
    opties: [
      { v: "ja", l: "Ja, wij hebben minimaal 1 werknemer in dienst" },
      { v: "nee", l: "Nee, ik werk alleen / uitsluitend met zzp'ers" },
    ],
  },
  {
    id: "mkb",
    vraag: "Valt uw bedrijf binnen het midden- en kleinbedrijf (MKB)?",
    subtekst: "Minder dan 250 medewerkers én jaaromzet ≤ €50 mln of balanstotaal ≤ €43 mln. Uitzondering: grootbedrijf in landbouw, horeca of recreatie mag ook aanvragen.",
    opties: [
      { v: "ja", l: "Ja, wij zijn een MKB-onderneming" },
      { v: "uitzondering", l: "Nee, maar wij zijn grootbedrijf in landbouw, horeca of recreatie" },
      { v: "nee", l: "Nee, wij vallen buiten het MKB" },
    ],
  },
  {
    id: "nederland",
    vraag: "Is uw bedrijf in Nederland gevestigd en vinden de activiteiten in Nederland plaats?",
    subtekst: "Zowel vestiging als activiteiten moeten in Nederland zijn.",
    opties: [
      { v: "ja", l: "Ja, wij zijn in Nederland gevestigd en actief" },
      { v: "nee", l: "Nee, wij zijn (deels) buiten Nederland gevestigd" },
    ],
  },
  {
    id: "gestart",
    vraag: "Zijn de geplande activiteiten al gestart?",
    subtekst: "Activiteiten mogen nog niet begonnen zijn vóór de subsidieverlening.",
    opties: [
      { v: "nee", l: "Nee, de activiteiten zijn nog niet gestart" },
      { v: "ja", l: "Ja, we zijn al begonnen" },
    ],
  },
  {
    id: "deminimis",
    vraag: "Heeft uw bedrijf de afgelopen 3 jaar meer dan €300.000 aan staatssteun ontvangen?",
    subtekst: "Alle de-minimissteun bij elkaar opgeteld.",
    opties: [
      { v: "nee", l: "Nee, wij zijn ruim onder het plafond" },
      { v: "weet-niet", l: "Ik weet het niet zeker" },
      { v: "ja", l: "Ja, meer dan €300.000 ontvangen" },
    ],
  },
];

const NIET_KANSRIJK_REDEN = {
  personeel: "De SLIM-subsidie vereist minimaal één werknemer met een arbeidscontract. ZZP'ers en DGA's zonder personeel komen niet in aanmerking.",
  mkb: "De SLIM-subsidie is alleen beschikbaar voor MKB-ondernemingen en grootbedrijven in landbouw, horeca of recreatie.",
  nederland: "Uw bedrijf en activiteiten moeten in Nederland gevestigd en actief zijn.",
  gestart: "Activiteiten die al zijn gestart vóór subsidieverlening komen niet in aanmerking. U kunt wel aanvragen voor toekomstige activiteiten.",
  deminimis: "Bij meer dan €300.000 staatssteun in de afgelopen 3 jaar kunt u mogelijk geen de-minimissteun meer ontvangen.",
  investering: `De minimale subsidiabele investering is €${MIN_KANSRIJK.toLocaleString("nl-NL")} voor activiteiten A en C.`,
};

function bepaalUitslag(antwoorden) {
  if (antwoorden.personeel === "nee") return "niet-kansrijk";
  if (antwoorden.mkb === "nee") return "niet-kansrijk";
  if (antwoorden.nederland === "nee") return "niet-kansrijk";
  if (antwoorden.gestart === "ja") return "niet-kansrijk";
  if (antwoorden.deminimis === "ja") return "niet-kansrijk";
  const inv = parseInt(antwoorden.investering, 10) || 0;
  if (inv < MIN_MOGELIJK) return "niet-kansrijk";
  if (antwoorden.deminimis === "weet-niet" || inv < MIN_KANSRIJK) return "mogelijk-kansrijk";
  return "kansrijk";
}

function getUitsluitingsRedenen(antwoorden) {
  const redenen = [];
  if (antwoorden.personeel === "nee") redenen.push("personeel");
  if (antwoorden.mkb === "nee") redenen.push("mkb");
  if (antwoorden.nederland === "nee") redenen.push("nederland");
  if (antwoorden.gestart === "ja") redenen.push("gestart");
  if (antwoorden.deminimis === "ja") redenen.push("deminimis");
  // investering alleen controleren als Q6 zichtbaar was (geen vroege uitsluitingsgrond)
  if ((antwoorden.investering ?? "") !== "") {
    const inv = parseInt(antwoorden.investering, 10) || 0;
    if (inv < MIN_MOGELIJK) redenen.push("investering");
  }
  return redenen;
}

export default function ScanPage() {
  const [fase, setFase] = useState("vragen"); // vragen | contact | resultaat
  const [antwoorden, setAntwoorden] = useState({});
  const [contact, setContact] = useState({ voornaam: "", achternaam: "", email: "", telefoon: "", bedrijf: "", medewerkers: "" });
  const [verzenden, setVerzenden] = useState(false);
  const [uitslag, setUitslag] = useState(null);
  const [uitslRedenen, setUitslRedenen] = useState([]);

  // Vroege uitsluitingsgronden: sla Q6 en contactstap over
  const isVroegUitgesloten =
    antwoorden.personeel === "nee" ||
    antwoorden.mkb === "nee" ||
    antwoorden.nederland === "nee" ||
    antwoorden.gestart === "ja" ||
    antwoorden.deminimis === "ja";

  // Landbouwvraag verschijnt als Q1–Q5 allemaal positief zijn beantwoord
  const toonLandbouw =
    antwoorden.personeel === "ja" &&
    (antwoorden.mkb === "ja" || antwoorden.mkb === "uitzondering") &&
    antwoorden.nederland === "ja" &&
    antwoorden.gestart === "nee" &&
    (antwoorden.deminimis === "nee" || antwoorden.deminimis === "weet-niet");

  // Q7 (investering) verschijnt pas als ook de landbouwvraag beantwoord is
  const toonQ7 = toonLandbouw && (antwoorden.landbouw === "nee" || antwoorden.landbouw === "ja");

  const isLandbouwBedrijf = antwoorden.landbouw === "ja";
  const maxSubsidie = isLandbouwBedrijf ? SUBSIDIE.maxBedragLandbouw : SUBSIDIE.maxBedrag;
  const invBedrag = parseInt(antwoorden.investering, 10) || 0;
  const indicatiefSubsidie = Math.min(Math.round(invBedrag * SUBSIDIE.percentage / 100), maxSubsidie);
  const toonSubsidieIndicator = toonQ7 && (antwoorden.investering ?? "") !== "";

  const vragenKlaar =
    isVroegUitgesloten ||
    (toonQ7 && (antwoorden.investering ?? "") !== "");

  const contactKlaar =
    contact.voornaam &&
    contact.achternaam &&
    contact.email &&
    contact.telefoon &&
    contact.bedrijf &&
    contact.medewerkers;

  const curStap = fase === "resultaat" ? 1 : 0;

  function antwoord(id, v) {
    setAntwoorden((prev) => ({ ...prev, [id]: v }));
  }

  function naarContact() {
    const result = bepaalUitslag(antwoorden);
    if (result === "niet-kansrijk") {
      setUitslag("niet-kansrijk");
      setUitslRedenen(getUitsluitingsRedenen(antwoorden));
      setFase("resultaat");
    } else {
      setFase("contact");
    }
  }

  async function verzendContact() {
    if (!contactKlaar) return;
    setVerzenden(true);
    const result = bepaalUitslag(antwoorden);
    setUitslag(result);
    if (result === "niet-kansrijk") setUitslRedenen(getUitsluitingsRedenen(antwoorden));

    try {
      await fetch("/api/quickscan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, antwoorden, uitslag: result }),
      });
    } catch {
      // stille fout — resultaat tonen we altijd
    }

    setFase("resultaat");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app">
      {/* ── HEADER ── */}
      <header className="hdr">
        <div className="hdr-inner">
          <Link href="/" className="logo" style={{ textDecoration: "none" }}>
            <span className="logo-slim">SLIM</span>
            <span className="logo-sub">SUBSIDIE</span>
            <span className="logo-adv">ADVIES</span>
          </Link>
          <p className="hdr-title">Gratis quickscan — komt uw organisatie in aanmerking?</p>
          <div className="prog-bar">
            <div className="prog-fill" style={{ width: curStap === 0 ? "20%" : "45%" }} />
          </div>
        </div>
        <div className="steps-bar">
          {STAP_LABELS.map((l, i) => (
            <div key={i} className={`step-tab ${i < curStap ? "done" : i === curStap ? "active" : ""}`}>{l}</div>
          ))}
        </div>
      </header>

      <main className="main">

        {/* ── STAP 1: VRAGEN ── */}
        {fase === "vragen" && (
          <>
            <div className="phase-lbl"><span className="phase-dot" />Quickscan — 7 vragen, minder dan 2 minuten</div>
            <div className="card">
              {VRAGEN.map((v, i) => (
                <div key={v.id} className="q-block">
                  <div className="q-label"><span className="q-num">{i + 1}</span>{v.vraag}</div>
                  {v.subtekst && (
                    <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10, lineHeight: 1.5 }}>{v.subtekst}</div>
                  )}
                  <div className="options">
                    {v.opties.map((o) => (
                      <label
                        key={o.v}
                        className={`opt ${antwoorden[v.id] === o.v ? "sel" : ""}`}
                        onClick={() => antwoord(v.id, o.v)}
                      >
                        <span className="opt-radio"><span className="opt-dot" /></span>
                        {o.l}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {/* Vraag 6: Landbouw — verschijnt als Q1–Q5 positief zijn */}
              {toonLandbouw && (
                <div className="q-block">
                  <div className="q-label"><span className="q-num">6</span>Is uw bedrijf actief in de landbouwsector?</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10, lineHeight: 1.5 }}>
                    Voor landbouwbedrijven geldt een lager maximaal subsidiebedrag van tot €{SUBSIDIE.maxBedragLandbouw.toLocaleString("nl-NL")} (art. 2.20 lid 1 SLIM-regeling).
                  </div>
                  <div className="options">
                    {[
                      { v: "nee", l: "Nee, wij zijn geen landbouwbedrijf" },
                      { v: "ja", l: "Ja, wij zijn een landbouwbedrijf" },
                    ].map((o) => (
                      <label
                        key={o.v}
                        className={`opt ${antwoorden.landbouw === o.v ? "sel" : ""}`}
                        onClick={() => antwoord("landbouw", o.v)}
                      >
                        <span className="opt-radio"><span className="opt-dot" /></span>
                        {o.l}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Vraag 7: Investering — verschijnt als ook de landbouwvraag beantwoord is */}
              {toonQ7 && (
                <div className="q-block">
                  <div className="q-label"><span className="q-num">7</span>Wat is de verwachte totale investering in leer- en ontwikkelactiviteiten?</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10, lineHeight: 1.5 }}>
                    Uren medewerkers + externe kosten. Minimaal €{MIN_KANSRIJK.toLocaleString("nl-NL")} aan subsidiabele kosten vereist voor activiteiten A en C.
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)" }}>€</span>
                    <input
                      className="form-input"
                      type="number"
                      inputMode="numeric"
                      min="0"
                      placeholder="Bijv. 10000"
                      value={antwoorden.investering ?? ""}
                      onChange={(e) => antwoord("investering", e.target.value)}
                      style={{ maxWidth: 200 }}
                    />
                  </div>
                  {toonSubsidieIndicator && (
                    <div style={{
                      marginTop: 10, fontSize: 13, lineHeight: 1.5, fontWeight: 600,
                      color: invBedrag < MIN_KANSRIJK ? "#b45309" : "#1a56db",
                    }}>
                      {invBedrag < MIN_KANSRIJK
                        ? `Minimale subsidiabele investering is €${MIN_KANSRIJK.toLocaleString("nl-NL")} voor activiteiten A en C.`
                        : indicatiefSubsidie >= maxSubsidie
                          ? `Indicatief subsidiebedrag: tot €${maxSubsidie.toLocaleString("nl-NL")} (maximum${isLandbouwBedrijf ? " landbouwbedrijven" : ""})`
                          : `Indicatief subsidiebedrag: tot €${indicatiefSubsidie.toLocaleString("nl-NL")}`
                      }
                    </div>
                  )}
                </div>
              )}

              <div className="btn-row">
                <button
                  className="btn btn-primary"
                  onClick={naarContact}
                  disabled={!vragenKlaar}
                >
                  {isVroegUitgesloten ? "Bekijk resultaat →" : "Naar contactgegevens →"}
                </button>
              </div>
              <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 12 }}>
                🔒 Uw gegevens worden veilig verwerkt en niet gedeeld met derden.
              </p>
            </div>
          </>
        )}

        {/* ── STAP 2: CONTACTGEGEVENS ── */}
        {fase === "contact" && (
          <>
            <div className="phase-lbl"><span className="phase-dot" />Uw gegevens</div>
            <div className="card">
              <div className="card-title">Vul uw gegevens in</div>
              <p className="card-sub">
                Op basis van uw antwoorden sturen wij u een persoonlijke analyse en nemen wij contact op voor de volgende stap.
              </p>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Voornaam *</label>
                  <input className="form-input" placeholder="Jan" value={contact.voornaam} onChange={(e) => setContact((p) => ({ ...p, voornaam: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Achternaam *</label>
                  <input className="form-input" placeholder="de Vries" value={contact.achternaam} onChange={(e) => setContact((p) => ({ ...p, achternaam: e.target.value }))} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">E-mailadres *</label>
                  <input className="form-input" type="email" placeholder="jan@devries.nl" value={contact.email} onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Telefoonnummer *</label>
                  <input className="form-input" placeholder="06-12345678" value={contact.telefoon} onChange={(e) => setContact((p) => ({ ...p, telefoon: e.target.value }))} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Bedrijfsnaam *</label>
                  <input className="form-input" placeholder="De Vries BV" value={contact.bedrijf} onChange={(e) => setContact((p) => ({ ...p, bedrijf: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Aantal medewerkers *</label>
                  <select className="form-select" value={contact.medewerkers} onChange={(e) => setContact((p) => ({ ...p, medewerkers: e.target.value }))}>
                    <option value="">Selecteer...</option>
                    {MEDEWERKERS_OPTIES.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className="btn-row">
                <button
                  className="btn btn-primary"
                  onClick={verzendContact}
                  disabled={!contactKlaar || verzenden}
                >
                  {verzenden ? "Verwerken…" : "Bekijk mijn kansen →"}
                </button>
                <button className="btn btn-ghost" onClick={() => setFase("vragen")}>← Terug</button>
              </div>
              <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 12 }}>
                🔒 Uw gegevens worden veilig verwerkt en niet gedeeld met derden.
              </p>
            </div>
          </>
        )}

        {/* ── STAP 3: RESULTAAT — KANSRIJK ── */}
        {fase === "resultaat" && uitslag === "kansrijk" && (
          <>
            <div className="phase-lbl"><span className="phase-dot" />Resultaat quickscan</div>
            <div className="result ok">
              <span className="result-icon">✓</span>
              <div className="result-title">Uw organisatie lijkt geschikt voor SLIM-subsidie</div>
              <p className="result-body">
                Op basis van uw antwoorden lijkt uw organisatie in aanmerking te komen voor een SLIM-subsidieaanvraag.
                Tot €{SUBSIDIE.maxBedrag.toLocaleString("nl-NL")} subsidie voor leren en ontwikkelen. Tijdvak 2 opent op {tv2OpenLabel}.
              </p>
            </div>
            <div className="card" style={{ borderLeft: "3px solid var(--blue-light)", textAlign: "center" }}>
              <div className="card-title">Reserveer uw aanvraagplaats</div>
              <p className="card-sub">Wij werken met een beperkt aantal aanvraagplaatsen per tijdvak.</p>
              <div className="btn-row" style={{ justifyContent: "center" }}>
                <Link href="/reserveren" className="btn btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
                  Reserveer uw aanvraagplaats voor €{PRICING.reserveringsfee} →
                </Link>
              </div>
              <div className="nocure-note" style={{ marginTop: 16 }}>
                <strong>No cure, no pay:</strong> Bij toekenning betaalt u een succesfee van <strong>€{PRICING.succesfee.toLocaleString("nl-NL")}</strong> excl. btw.
                De reserveringsfee wordt dan terugbetaald. Geen subsidie = geen succesfee.
              </div>
            </div>
            <div className="alert-info">
              📩 U ontvangt een bevestiging per e-mail met uitleg over de volgende stap.
            </div>
          </>
        )}

        {/* ── STAP 3: RESULTAAT — MOGELIJK KANSRIJK ── */}
        {fase === "resultaat" && uitslag === "mogelijk-kansrijk" && (
          <>
            <div className="phase-lbl"><span className="phase-dot" />Resultaat quickscan</div>
            <div className="result ok" style={{ borderColor: "#f59e0b" }}>
              <span className="result-icon" style={{ background: "#f59e0b" }}>~</span>
              <div className="result-title">Uw organisatie is mogelijk geschikt</div>
              <p className="result-body">
                Uw organisatie lijkt mogelijk in aanmerking te komen. Tijdens de intake beoordelen we de subsidiemogelijkheden verder.
              </p>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <div className="card-title">Reserveer uw aanvraagplaats</div>
              <p className="card-sub">Wij werken met een beperkt aantal aanvraagplaatsen per tijdvak.</p>
              <div className="btn-row" style={{ justifyContent: "center" }}>
                <Link href="/reserveren" className="btn btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
                  Reserveer uw aanvraagplaats voor €{PRICING.reserveringsfee} →
                </Link>
              </div>
              <div className="nocure-note" style={{ marginTop: 16 }}>
                <strong>No cure, no pay:</strong> Bij toekenning betaalt u een succesfee van <strong>€{PRICING.succesfee.toLocaleString("nl-NL")}</strong> excl. btw.
                De reserveringsfee wordt dan terugbetaald. Geen subsidie = geen succesfee.
              </div>
            </div>
            <div className="alert-info">
              📩 U ontvangt een bevestiging per e-mail met uitleg over de volgende stap.
            </div>
          </>
        )}

        {/* ── STAP 3: RESULTAAT — NIET KANSRIJK ── */}
        {fase === "resultaat" && uitslag === "niet-kansrijk" && (
          <>
            <div className="phase-lbl"><span className="phase-dot" style={{ background: "var(--muted)" }} />Resultaat quickscan</div>
            <div className="result fail">
              <span className="result-icon">✗</span>
              <div className="result-title">Op basis van de huidige informatie lijkt een aanvraag minder kansrijk</div>
              {uitslRedenen.length === 1 ? (
                <p className="result-body">{NIET_KANSRIJK_REDEN[uitslRedenen[0]]}</p>
              ) : uitslRedenen.length > 1 ? (
                <div className="result-body">
                  <p style={{ margin: "0 0 10px" }}>Op basis van uw antwoorden zijn er meerdere punten die een aanvraag in de weg staan:</p>
                  <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.7 }}>
                    {uitslRedenen.map((r) => (
                      <li key={r}>{NIET_KANSRIJK_REDEN[r]}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="result-body">Heeft u vragen over uw situatie?</p>
              )}
            </div>
            <div className="card">
              <div className="btn-row">
                <a href="mailto:info@slimsubsidieadvies.nl" className="btn btn-primary">Neem contact op voor advies →</a>
                <button className="btn btn-ghost" onClick={() => { setFase("vragen"); setAntwoorden({}); setUitslag(null); setUitslRedenen([]); }}>
                  ← Opnieuw beginnen
                </button>
              </div>
            </div>
          </>
        )}

      </main>
    </div>
  );
}
