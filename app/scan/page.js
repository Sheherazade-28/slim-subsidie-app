"use client";

import { useState } from "react";
import Link from "next/link";
import { PRICING } from "@/data/slim-content";

const STAP_LABELS = ["Quickscan", "Resultaat", "Reservering", "Intake"];

const VRAGEN = [
  {
    id: "medewerkers",
    vraag: "Heeft uw organisatie tussen de 2 en 250 medewerkers?",
    opties: [
      { v: "ja", l: "Ja" },
      { v: "nee", l: "Nee" },
    ],
  },
  {
    id: "leren",
    vraag: "Werkt uw organisatie actief aan leren en ontwikkelen van medewerkers, of wilt u hiermee starten?",
    opties: [
      { v: "ja", l: "Ja, we werken hier al aan" },
      { v: "start", l: "We willen hiermee starten" },
      { v: "nee", l: "Nee, dit speelt niet bij ons" },
    ],
  },
  {
    id: "eerder",
    vraag: "Heeft uw organisatie eerder SLIM-subsidie aangevraagd?",
    opties: [
      { v: "nooit", l: "Nee, nooit" },
      { v: "toegekend", l: "Ja, en de aanvraag is toegekend" },
      { v: "niet-ingeloot", l: "Ja, maar we zijn niet ingeloot" },
    ],
  },
];

const MEDEWERKERS_OPTIES = ["2–10", "11–50", "51–100", "101–250"];

function bepaalUitslag(antwoorden) {
  if (antwoorden.medewerkers === "nee") return "niet-kansrijk";
  if (antwoorden.leren === "nee") return "niet-kansrijk";
  if (antwoorden.leren === "ja") return "kansrijk";
  if (antwoorden.leren === "start") return "mogelijk-kansrijk";
  return "niet-kansrijk";
}

export default function ScanPage() {
  const [fase, setFase] = useState("vragen"); // vragen | contact | resultaat
  const [antwoorden, setAntwoorden] = useState({});
  const [contact, setContact] = useState({ voornaam: "", achternaam: "", email: "", telefoon: "", bedrijf: "", medewerkers: "" });
  const [verzenden, setVerzenden] = useState(false);
  const [uitslag, setUitslag] = useState(null);

  const vragenKlaar =
    antwoorden.medewerkers &&
    (antwoorden.medewerkers === "nee" ||
      (antwoorden.leren && antwoorden.eerder));

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
    if (antwoorden.medewerkers === "nee") {
      setUitslag("niet-kansrijk");
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
            <div className="phase-lbl"><span className="phase-dot" />Quickscan — 3 vragen, minder dan 1 minuut</div>
            <div className="card">
              {VRAGEN.map((v, i) => (
                <div key={v.id} className="q-block">
                  <div className="q-label"><span className="q-num">{i + 1}</span>{v.vraag}</div>
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
              <div className="btn-row">
                <button
                  className="btn btn-primary"
                  onClick={naarContact}
                  disabled={!vragenKlaar}
                >
                  {antwoorden.medewerkers === "nee" ? "Bekijk resultaat →" : "Naar contactgegevens →"}
                </button>
              </div>
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
                🔒 Uw gegevens worden veilig verwerkt conform onze{" "}
                <Link href="/privacy" style={{ color: "var(--muted)" }}>privacyverklaring</Link>.
              </p>
            </div>
          </>
        )}

        {/* ── STAP 3: RESULTAAT ── */}
        {fase === "resultaat" && uitslag === "kansrijk" && (
          <>
            <div className="phase-lbl"><span className="phase-dot" />Resultaat quickscan</div>
            <div className="result ok">
              <span className="result-icon">✓</span>
              <div className="result-title">Uw organisatie lijkt geschikt voor SLIM-subsidie</div>
              <p className="result-body">
                Op basis van uw antwoorden lijkt uw organisatie in aanmerking te komen voor een SLIM-subsidieaanvraag.
                Tot €25.000 subsidie voor leren en ontwikkelen. Tijdvak 2 opent op 10 augustus 2026.
              </p>
            </div>
            <div className="card" style={{ borderLeft: "3px solid var(--blue-light)", textAlign: "center" }}>
              <div className="card-title">Reserveer uw aanvraagplaats</div>
              <p className="card-sub">
                Wij werken met een beperkt aantal aanvraagplaatsen per tijdvak.
                Reserveer nu en wij nemen contact op voor de intake.
              </p>
              <div className="btn-row" style={{ justifyContent: "center" }}>
                <Link href="/reserveren" className="btn btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
                  Reserveer uw aanvraagplaats voor €{PRICING.reserveringsfee} →
                </Link>
              </div>
              <div className="nocure-note" style={{ marginTop: 16 }}>
                <strong>No cure, no pay:</strong> Bij toekenning betaalt u een succesfee van <strong>€2.500</strong> excl. btw.
                De reserveringsfee wordt dan terugbetaald. Geen subsidie = geen succesfee.
              </div>
            </div>
            <div className="alert-info">
              📩 U ontvangt een bevestiging per e-mail met uitleg over de volgende stap.
            </div>
          </>
        )}

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
              <p className="card-sub">
                Wij nemen contact op en beoordelen samen uw kansen voor tijdvak 2 (10 augustus 2026).
              </p>
              <div className="btn-row" style={{ justifyContent: "center" }}>
                <Link href="/reserveren" className="btn btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
                  Reserveer uw aanvraagplaats voor €{PRICING.reserveringsfee} →
                </Link>
              </div>
              <div className="nocure-note" style={{ marginTop: 16 }}>
                <strong>No cure, no pay:</strong> Bij toekenning betaalt u een succesfee van <strong>€2.500</strong> excl. btw.
                De reserveringsfee wordt dan terugbetaald. Geen subsidie = geen succesfee.
              </div>
            </div>
            <div className="alert-info">
              📩 U ontvangt een bevestiging per e-mail met uitleg over de volgende stap.
            </div>
          </>
        )}

        {fase === "resultaat" && uitslag === "niet-kansrijk" && (
          <>
            <div className="phase-lbl"><span className="phase-dot" style={{ background: "var(--muted)" }} />Resultaat quickscan</div>
            <div className="result fail">
              <span className="result-icon">✗</span>
              <div className="result-title">Op basis van de huidige informatie lijkt een aanvraag minder kansrijk</div>
              <p className="result-body">
                De SLIM-subsidie is bedoeld voor MKB-ondernemingen met minimaal 2 medewerkers
                (exclusief directeur-grootaandeelhouder). Heeft u vragen over uw situatie?
              </p>
            </div>
            <div className="card">
              <div className="card-title">Wat kunt u nu doen?</div>
              <ul className="info-list">
                <li><span>📞</span>Neem contact op — wij denken graag mee over alternatieven.</li>
                <li><span>🤝</span>U kunt mogelijk deelnemen als partner in een samenwerkingsverband.</li>
                <li><span>🔄</span>Is de situatie binnenkort anders? Doe opnieuw de quickscan.</li>
              </ul>
              <div className="btn-row">
                <a href="mailto:info@slimsubsidieadvies.nl" className="btn btn-primary">Neem contact op →</a>
                <button className="btn btn-ghost" onClick={() => { setFase("vragen"); setAntwoorden({}); setUitslag(null); }}>
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
