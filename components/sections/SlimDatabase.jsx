"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";

const CATS = [
  { key: "all", label: "Alle categorieën" },
  { key: "MKB", label: "Individueel MKB" },
  { key: "SAM", label: "Samenwerkingsverband" },
  { key: "GRB", label: "Grootbedrijf landbouw/horeca/recreatie" },
];

const TIJDVAKKEN = ["Alle tijdvakken", "2024", "2023", "2022", "2021", "2020"];

const PAGE_SIZE = 20;

function fmt(n) {
  if (!n) return "–";
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

function fmtSub(n) {
  if (!n) return "Niet gepubliceerd";
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

function Banner({ items }) {
  const track = useRef(null);
  const content = items.slice(0, 40);
  return (
    <div style={{ overflow: "hidden", background: "#0d2e5a", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.12)", padding: "12px 0" }}>
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .marquee-track { display: flex; gap: 0; animation: marquee 80s linear infinite; white-space: nowrap; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="marquee-track" ref={track}>
        {[...content, ...content].map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 24px", borderRight: "1px solid rgba(255,255,255,0.08)", fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
            <span style={{ color: "#2aaae2", fontWeight: 600 }}>{item.nm}</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
            <span>{item.pnm}</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
            <span style={{ color: "#6ee7b7", fontSize: 12 }}>{fmt(item.sub)}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function truncateWords(text, max) {
  if (text.length <= max) return text;
  const cut = text.lastIndexOf(" ", max);
  return text.slice(0, cut > 0 ? cut : max);
}

function Card({ item }) {
  const [expanded, setExpanded] = useState(false);
  const catBg  = item.cat === "MKB" ? "#e8f4fc" : item.cat === "SAM" ? "#f0ebff" : "#fff3e8";
  const catClr = item.cat === "MKB" ? "#0d2e5a" : item.cat === "SAM" ? "#5b21b6" : "#7c3a00";
  const subDisplay = fmtSub(item.sub);
  const isUnpublished = !item.sub;
  const bron = item.bron || ["SLIM"];
  const isKatapult = bron.includes("Katapult");
  const isCombi = isKatapult && bron.includes("SLIM");
  const hasLongSummary = item.sum && item.sum.length > 200;
  const displayText = item.sum
    ? (hasLongSummary && !expanded ? truncateWords(item.sum, 200) + "…" : item.sum)
    : null;

  return (
    <div style={{ background: "#fff", border: "1px solid #e8edf3", borderRadius: 10, padding: "18px 20px", marginBottom: 10, boxShadow: "0 1px 4px rgba(13,46,90,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: catBg, color: catClr, letterSpacing: "0.5px" }}>{item.cl}</span>
            <span style={{ fontSize: 11, color: "#5a6e82" }}>Tijdvak {item.tv}</span>
            <span style={{ fontSize: 11, color: "#b0bec8" }}>·</span>
            <span style={{ fontSize: 11, color: "#5a6e82" }}>{item.loc}</span>
            {isKatapult && (
              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, border: "1px solid #2aaae2", color: "#0e6f9e", letterSpacing: "0.4px", display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#2aaae2" }} />{isCombi ? "Uitgelicht door Katapult" : "Katapult"}
              </span>
            )}
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#0d2e5a", marginBottom: 4 }}>{item.nm}</div>
          <div style={{ fontSize: 13, color: "#5a6e82", fontStyle: "italic" }}>{item.pnm}</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: isUnpublished ? "#5a6e82" : "#1a7a4a" }}>{subDisplay}</div>
          <div style={{ fontSize: 11, color: "#8a9eb0", marginTop: 2 }}>subsidie</div>
        </div>
      </div>
      {displayText && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #e8edf3" }}>
          {item.katapult && <div style={{ fontSize: 11, fontWeight: 700, color: "#0d2e5a", letterSpacing: "0.3px", marginBottom: 6 }}>Projectomschrijving · SLIM-register</div>}
          <div style={{ fontSize: 13, color: "#1a2a3a", lineHeight: 1.7 }}>{displayText}</div>
          {hasLongSummary && (
            <button onClick={() => setExpanded(e => !e)}
              style={{ marginTop: 6, fontSize: 12, color: "#2aaae2", background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "inherit" }}>
              {expanded ? "Lees minder ↑" : "Lees meer ↓"}
            </button>
          )}
          {item.katapult && <div style={{ fontSize: 11, color: "#8a9eb0", marginTop: 6 }}>Bron: SLIM-register · Uitvoering van Beleid (SZW)</div>}
        </div>
      )}
      {item.katapult && (
        <div style={{ marginTop: displayText ? 12 : 14, paddingTop: displayText ? 12 : 14, borderTop: "1px solid #e8edf3" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#0e6f9e", letterSpacing: "0.3px", marginBottom: 6 }}>Katapult-context</div>
          <div style={{ fontSize: 13, color: "#1a2a3a", lineHeight: 1.7 }}>{item.katapult.samenvatting}</div>
          {item.katapult.bedrijven && item.katapult.bedrijven.length > 0 && (
            <div style={{ fontSize: 12, color: "#5a6e82", marginTop: 6 }}>Betrokken: {item.katapult.bedrijven.join(", ")}</div>
          )}
          <a href={item.katapult.bronUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: "#2aaae2", textDecoration: "none", fontWeight: 600, marginTop: 8 }}>Bron: Katapult ↗</a>
        </div>
      )}
    </div>
  );
}

export default function SlimDatabase() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoek, setZoek] = useState("");
  const [cat, setCat] = useState("all");
  const [tijdvak, setTijdvak] = useState("Alle tijdvakken");
  const [alleenUitgelicht, setAlleenUitgelicht] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    Promise.all([
      fetch("/slim_data.json").then(r => { if (!r.ok) throw new Error("Kan data niet laden"); return r.json(); }),
      fetch("/katapult_cases.json").then(r => (r.ok ? r.json() : [])).catch(() => []),
    ])
      .then(([rows, kat]) => {
        const byId = new Map(rows.map(r => [r.id, r]));
        const standalones = [];
        for (const k of kat) {
          const katObj = { titel: k.titel, samenvatting: k.samenvatting, bronUrl: k.bronUrl, bedrijven: k.bedrijven };
          if (k.matchId && byId.has(k.matchId)) {
            const row = byId.get(k.matchId);
            row.katapult = katObj;
            row.bron = ["SLIM", "Katapult"];
          } else if (k.standalone) {
            standalones.push({ ...k.standalone, sub: null, bron: ["Katapult"], katapult: katObj });
          }
        }
        setData([...standalones, ...rows]);
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    const q = zoek.toLowerCase().trim();
    return data.filter(item => {
      if (cat !== "all" && item.cat !== cat) return false;
      if (tijdvak !== "Alle tijdvakken" && item.tv !== tijdvak) return false;
      if (alleenUitgelicht && !(item.bron && item.bron.includes("Katapult"))) return false;
      if (q && !item.nm.toLowerCase().includes(q) && !item.pnm.toLowerCase().includes(q) && !(item.sum || "").toLowerCase().includes(q) && !item.loc.toLowerCase().includes(q)) return false;
      return true;
    }).sort((a, b) => a.nm.localeCompare(b.nm, "nl"));
  }, [data, zoek, cat, tijdvak, alleenUitgelicht]);

  const paginated = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page]);
  const hasMore = paginated.length < filtered.length;

  useEffect(() => { setPage(1); }, [zoek, cat, tijdvak, alleenUitgelicht]);

  const bannerItems = useMemo(() => data.filter(d => d.sub > 20000).slice(0, 80), [data]);

  const stats = useMemo(() => ({
    totaal: data.length,
    mkb: data.filter(d => d.cat === "MKB").length,
    sam: data.filter(d => d.cat === "SAM").length,
    totaalSub: data.reduce((s, d) => s + (d.sub || 0), 0),
  }), [data]);

  return (
    <div style={{ minHeight: "100vh", background: "#f2f5f9", fontFamily: "'Barlow', 'Segoe UI', system-ui, sans-serif", color: "#1a2a3a" }}>

      <Navigation />

      <div style={{ background: "#0d2e5a", padding: "32px 20px 36px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#2aaae2", textTransform: "uppercase", marginBottom: 10 }}>SLIM Subsidie Advies</div>
          <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 800, margin: "0 0 10px", lineHeight: 1.1, color: "#fff" }}>
            SLIM Subsidie<br /><span style={{ color: "#2aaae2" }}>Projecten Database</span>
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", maxWidth: 560, lineHeight: 1.7, margin: "0 0 20px" }}>
            Doorzoek alle {stats.totaal.toLocaleString("nl-NL")} gehonoreerde SLIM-projecten. Laat je inspireren door wat andere MKB-bedrijven hebben bereikt.
          </p>

          <div style={{ background: "#e8f4fc", borderLeft: "3px solid #2aaae2", borderRadius: "0 6px 6px 0", padding: "12px 16px", maxWidth: 640, marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#0d2e5a", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 5 }}>Over deze database</div>
            <p style={{ fontSize: 13, color: "#1a2a3a", lineHeight: 1.65, margin: 0 }}>
              Deze database is gebaseerd op de openbaar gepubliceerde subsidiegegevens van Uitvoering van Beleid (Ministerie van SZW). Bedrijven hebben bij hun aanvraag toestemming gegeven voor publicatie van hun naam en projectomschrijving. Wij maken deze gegevens — die officieel alleen als CSV-bestand beschikbaar zijn — doorzoekbaar ter inspiratie voor andere MKB-ondernemers.{" "}
              <a href="https://www.uitvoeringvanbeleidszw.nl/subsidies-en-regelingen/bedrijven/slim/verleende-aavragen" target="_blank" rel="noopener noreferrer" style={{ color: "#1a6bbf", fontWeight: 600, textDecoration: "none" }}>
                Officiële bronpagina Uitvoering van Beleid ↗
              </a>
            </p>
            <p style={{ fontSize: 13, color: "#1a2a3a", lineHeight: 1.65, margin: "10px 0 0" }}>
              Een selectie van projecten is verrijkt met praktijkverhalen van Katapult, het netwerk voor samenwerking tussen onderwijs en bedrijfsleven. Bij deze cases combineren we de officiële subsidiegegevens uit het register met de context erachter — wie, waarom en hoe — herkenbaar aan het label &ldquo;Uitgelicht door Katapult&rdquo;.{" "}
              <a href="https://www.wijzijnkatapult.nl/leren-ontwikkelen-mkb/voorbeelden-slim-projecten/" target="_blank" rel="noopener noreferrer" style={{ color: "#1a6bbf", fontWeight: 600, textDecoration: "none" }}>
                Bekijk alle voorbeelden op Katapult ↗
              </a>
            </p>
          </div>

          {!loading && (
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { label: "Totaal projecten", val: stats.totaal.toLocaleString("nl-NL") },
                { label: "Individueel MKB", val: stats.mkb.toLocaleString("nl-NL") },
                { label: "Samenwerkingsverbanden", val: stats.sam.toLocaleString("nl-NL") },
                { label: "Totaal subsidie", val: fmt(stats.totaalSub) },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "12px 18px" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {!loading && bannerItems.length > 0 && <Banner items={bannerItems} />}

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 20px 0" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          <input
            value={zoek}
            onChange={e => setZoek(e.target.value)}
            placeholder="Zoek op bedrijf, project, locatie..."
            style={{ flex: "1 1 280px", background: "#fff", border: "1px solid #d4dde8", borderRadius: 8, padding: "10px 14px", color: "#1a2a3a", fontSize: 14, outline: "none", fontFamily: "inherit" }}
          />
          <select value={cat} onChange={e => setCat(e.target.value)}
            style={{ background: "#fff", border: "1px solid #d4dde8", borderRadius: 8, padding: "10px 14px", color: "#1a2a3a", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            {CATS.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
          <select value={tijdvak} onChange={e => setTijdvak(e.target.value)}
            style={{ background: "#fff", border: "1px solid #d4dde8", borderRadius: 8, padding: "10px 14px", color: "#1a2a3a", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            {TIJDVAKKEN.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <button onClick={() => setAlleenUitgelicht(v => !v)}
            title="Toon alleen uitgelichte voorbeeldcases (bron: Katapult)"
            style={{ background: alleenUitgelicht ? "#2aaae2" : "#fff", border: "1px solid " + (alleenUitgelicht ? "#2aaae2" : "#d4dde8"), borderRadius: 8, padding: "10px 14px", color: alleenUitgelicht ? "#fff" : "#1a2a3a", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: alleenUitgelicht ? "#fff" : "#2aaae2" }} />
            Alleen Katapult-cases
          </button>
        </div>

        <div style={{ fontSize: 13, color: "#5a6e82", marginBottom: 16 }}>
          {loading ? "Data laden..." : `${filtered.length.toLocaleString("nl-NL")} projecten gevonden`}
          {zoek && <span> voor &ldquo;<strong style={{ color: "#0d2e5a" }}>{zoek}</strong>&rdquo;</span>}
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#5a6e82" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
            <div>Database laden ({(6208).toLocaleString("nl-NL")} projecten)...</div>
          </div>
        )}

        {error && (
          <div style={{ background: "#fdf0ee", border: "1px solid #f0b8b0", borderRadius: 10, padding: 20, color: "#8a1a0a" }}>
            {error} — zorg dat slim_data.json in de /public map staat.
          </div>
        )}

        {!loading && !error && (
          <>
            {paginated.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#8a9eb0" }}>
                Geen projecten gevonden. Probeer een andere zoekterm.
              </div>
            ) : (
              paginated.map(item => <Card key={item.id} item={item} />)
            )}

            {hasMore && (
              <div style={{ textAlign: "center", padding: "24px 0 48px" }}>
                <button onClick={() => setPage(p => p + 1)}
                  style={{ background: "#0d2e5a", color: "#fff", border: "none", borderRadius: 8, padding: "12px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  Meer laden ({filtered.length - paginated.length} resterend)
                </button>
              </div>
            )}
          </>
        )}

        {!loading && (
          <div style={{ background: "linear-gradient(135deg, #0d2e5a, #1a4a7a)", border: "1px solid rgba(42,170,226,0.3)", borderRadius: 16, padding: "32px", margin: "32px 0 48px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: "#fff" }}>Wil jij ook een succesvol SLIM-project?</div>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 20, fontSize: 14 }}>
              Doe gratis de quickscan en weet in 2 minuten of jouw bedrijf in aanmerking komt voor het tijdvak van 10 augustus – 7 september 2026.
            </p>
            <Link href="/quickscan"
              style={{ display: "inline-block", background: "#2aaae2", color: "#fff", border: "none", borderRadius: 8, padding: "12px 28px", fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
              Doe gratis de quickscan →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
