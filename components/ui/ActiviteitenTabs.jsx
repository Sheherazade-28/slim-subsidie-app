"use client";

import { useState } from "react";

const TABS = ["A", "B", "C"];

function fmtEurClient(n) {
  return "€" + n.toLocaleString("nl-NL");
}

export default function ActiviteitenTabs({ minSubsidie, minProjectomvang, maxUurtarief, loopbaanVergoeding, maxBedrag }) {
  const [actief, setActief] = useState("A");

  const tab = {
    A: {
      label: "Activiteit A",
      titel: "Doorlichting van de onderneming",
      tagKleur: "a",
      randkleur: "#c7d9f5",
      headerbg: "#e8f0fd",
      beschrijving: "Breng de ontwikkelbehoefte van uw organisatie in kaart via een externe deskundige. De adviseur analyseert uw organisatie en stelt een concreet opleidings- en ontwikkelplan op maat op.",
      waarom: "Veranderingen op de arbeidsmarkt — digitalisering, robotisering, toenemende concurrentie op talent — vragen om periodieke heroriëntatie op kennis en vaardigheden van uw medewerkers.",
      eindproduct: "opleidings- of ontwikkelplan (verplicht als bijlage bij aanvraag)",
      voorwaarden: [
        ["Minimale subsidie", fmtEurClient(minSubsidie)],
        ["Benodigde projectomvang", `vanaf ${fmtEurClient(minProjectomvang)}`],
        ["Max. uurtarief adviseur", `€${maxUurtarief} excl. btw`],
      ],
      voorbeelden: [
        "Leercultuurscan door externe HR-adviseur",
        "Strategische personeelsplanning gekoppeld aan bedrijfsontwikkeling",
        "Analyse van digitaliserings- of robotiseringsimpact op functies",
        "HR-strategie voor toekomstbestendige organisatie",
      ],
      extra: null,
    },
    B: {
      label: "Activiteit B",
      titel: "Loopbaan- en ontwikkeladviezen voor werknemers",
      tagKleur: "b",
      randkleur: "#fde9a0",
      headerbg: "#fef9ee",
      beschrijving: `Medewerkers ontvangen individueel loopbaan- of ontwikkeladvies van een gecertificeerde adviseur. Per afgerond traject ontvangt u ${fmtEurClient(loopbaanVergoeding)} subsidie — ongeacht de daadwerkelijke kosten van de adviseur.`,
      waarom: "Inzicht in wensen en ambities helpt bij het vitaal houden van personeel, strategische planning en het voorkomen van uitstroom.",
      eindproduct: "tweezijdig getekende prestatieverklaring per deelnemer",
      voorwaarden: [
        ["Vaste vergoeding", `${fmtEurClient(loopbaanVergoeding)} per afgerond traject`],
        ["Minimale gespreksduur", "4 uur per deelnemer"],
        ["Vereiste adviseur", "Noloc Register Loopbaanprofessional of gelijkwaardig (HBO+, min. 3 jaar ervaring)"],
        ["Minimale projectomvang", "Geen minimum"],
      ],
      voorbeelden: [
        "POP-traject (Persoonlijk Ontwikkelplan)",
        "Loopbaangesprekken bij reorganisatie of functiewijziging",
        "Talentassessment gekoppeld aan doorgroeipad",
        "Outplacement-voorbereiding voor medewerkers",
      ],
      extra: null,
    },
    C: {
      label: "Activiteit C",
      titel: "Ontwikkelen of invoeren van een L&O-methode",
      tagKleur: "c",
      randkleur: "#a8d8bc",
      headerbg: "#edf7f0",
      beschrijving: "Implementeer een structurele methode die leren en ontwikkelen verankert in uw organisatie. Activiteit C kent drie subcategorieën die ook gecombineerd kunnen worden binnen één aanvraag.",
      waarom: "Een leerrijke werkomgeving trekt talent aan, bindt medewerkers en maakt uw organisatie wendbaarder voor toekomstige veranderingen.",
      eindproduct: "documentatie van de gerealiseerde methode (verplicht als bijlage)",
      voorwaarden: [
        ["Minimale subsidie", fmtEurClient(minSubsidie)],
        ["Benodigde projectomvang", `vanaf ${fmtEurClient(minProjectomvang)}`],
        ["Max. uurtarief adviseur", `€${maxUurtarief} excl. btw`],
      ],
      voorbeelden: [
        "Systeem van periodieke ontwikkelgesprekken",
        "E-learning programma op maat",
        "Digitaal kennis- en leerportaal",
        "Introductie van leerambassadeurs",
        "Aansluiten bij of oprichten van een bedrijfsschool",
      ],
      extra: {
        subcategorieen: [
          ["Systeem van periodieke ontwikkelgesprekken", ["Gestructureerde ontwikkelgesprekken invoeren", "Training leidinggevenden in ontwikkelgesprekken"]],
          ["Leerrijke werkomgeving", ["E-learning programma op maat", "Digitaal kennis- en leerportaal", "Leerambassadeurs", "Taakroulatie of taakverbreding"]],
          ["Bedrijfsschool", ["Aansluiten bij bestaande bedrijfsschool", "Eigen bedrijfsschool oprichten", "Combineren van leren en werken"]],
        ],
        nietSubsidiabel: "DISC-analyse, Profile Dynamics, Baarda-model, SMART, PDCA, 70-20-10 leermethode, IMWR-cirkel, train-de-trainer.",
      },
    },
  };

  const t = tab[actief];

  return (
    <div>
      {/* Tab buttons */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {TABS.map((id) => (
          <button
            key={id}
            onClick={() => setActief(id)}
            style={{
              padding: "10px 24px",
              borderRadius: 8,
              border: actief === id ? "2px solid var(--blue)" : "2px solid #e8edf3",
              background: actief === id ? "var(--navy)" : "var(--white)",
              color: actief === id ? "#fff" : "var(--navy)",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              transition: "all .15s",
              fontFamily: "inherit",
            }}
          >
            Activiteit {id}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ border: `1px solid ${t.randkleur}`, borderRadius: 14, overflow: "hidden" }}>
        {/* Header */}
        <div
          style={{
            background: t.headerbg,
            borderBottom: `1px solid ${t.randkleur}`,
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span className={`hp-act-tag ${t.tagKleur}`} style={{ margin: 0 }}>
            {t.label}
          </span>
          <strong style={{ fontSize: 16, color: "var(--navy)" }}>{t.titel}</strong>
        </div>

        {/* Body */}
        <div style={{ padding: 24, background: "var(--white)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {/* Links: beschrijving / waarom / eindproduct / (subcategorieën voor C) */}
            <div>
              <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 12 }}>
                {t.beschrijving}
              </p>
              <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 12 }}>
                <strong style={{ color: "var(--navy)" }}>Waarom:</strong> {t.waarom}
              </p>
              <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 0 }}>
                <strong style={{ color: "var(--navy)" }}>Eindproduct:</strong> {t.eindproduct}
              </p>

              {t.extra?.subcategorieen && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "var(--navy)", marginBottom: 10 }}>
                    Drie subcategorieën:
                  </div>
                  {t.extra.subcategorieen.map(([titel, items]) => (
                    <div key={titel} style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--blue)", marginBottom: 4 }}>
                        {titel}
                      </div>
                      <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>
                        {items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Rechts: voorwaarden + voorbeelden */}
            <div>
              <div style={{ background: "#f7f9fc", borderRadius: 10, padding: "16px 18px", marginBottom: 14 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: "var(--blue)",
                    marginBottom: 10,
                  }}
                >
                  Subsidievoorwaarden
                </div>
                <ul className="hp-req-list">
                  {t.voorwaarden.map(([lbl, val]) => (
                    <li key={lbl} className="hp-req-item">
                      <span className="hp-req-dot" />
                      <span>{lbl}: <strong>{val}</strong></span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: "#f7f9fc", borderRadius: 10, padding: "16px 18px" }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: "var(--blue)",
                    marginBottom: 10,
                  }}
                >
                  Concrete voorbeelden
                </div>
                <ul className="hp-req-list">
                  {t.voorbeelden.map((ex) => (
                    <li key={ex} className="hp-req-item">
                      <span className="hp-req-dot" />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {t.extra?.nietSubsidiabel && (
                <div style={{ background: "#f7f9fc", borderRadius: 10, padding: "14px 16px", marginTop: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>
                    Niet subsidiabel als L&O-methode (wel als ondersteuning):
                  </div>
                  <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>
                    {t.extra.nietSubsidiabel}
                  </p>
                </div>
              )}

              {actief !== "B" && (
                <div
                  style={{
                    background: "#fff8e6",
                    border: "1px solid #fde68a",
                    borderRadius: 10,
                    padding: "14px 16px",
                    marginTop: 14,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>
                    Combinaties mogelijk
                  </div>
                  <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.65, margin: 0 }}>
                    Een aanvraag mag meerdere activiteiten bevatten (art. 2.8 lid 5). Het maximum van tot {fmtEurClient(maxBedrag)} geldt voor de gecombineerde aanvraag.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
