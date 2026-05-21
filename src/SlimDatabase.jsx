import { useState, useEffect, useMemo, useRef } from "react";

// ─── Inline data loader ───────────────────────────────────────────────────────
// De JSON wordt geladen vanuit /slim_data.json (zet dit bestand in /public/)

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

// ─── Lopende banner ───────────────────────────────────────────────────────────
function Banner({ items }) {
  const track = useRef(null);
  const content = items.slice(0, 40);
  return (
    <div style={{ overflow: "hidden", background: "rgba(255,255,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "12px 0" }}>
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .marquee-track { display: flex; gap: 0; animation: marquee 80s linear infinite; white-space: nowrap; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="marquee-track" ref={track}>
        {[...content, ...content].map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 24px", borderRight: "1px solid rgba(255,255,255,0.1)", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
            <span style={{ color: "#2aaae2", fontWeight: 600 }}>{item.nm}</span>
            <span style={{ color: "rgba(255,255,255,0.35)" }}>·</span>
            <span>{item.pnm}</span>
            <span style={{ color: "rgba(255,255,255,0.35)" }}>·</span>
            <span style={{ color: "#4ade80", fontSize: 12 }}>{fmt(item.sub)}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Project kaart ────────────────────────────────────────────────────────────
function Card({ item }) {
  const [open, setOpen] = useState(false);
  const catColor = item.cat === "MKB" ? "#2aaae2" : item.cat === "SAM" ? "#a78bfa" : "#fb923c";
  return (
    <div onClick={() => setOpen(o => !o)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "18px 20px", cursor: "pointer", transition: "background 0.15s", marginBottom: 10 }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
      onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: `${catColor}20`, color: catColor, letterSpacing: "0.5px" }}>{item.cl}</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Tijdvak {item.tv}</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>·</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{item.loc}</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{item.nm}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>{item.pnm}</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#4ade80" }}>{fmt(item.sub)}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>subsidie</div>
          <div style={{ fontSize: 18, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>{open ? "▲" : "▼"}</div>
        </div>
      </div>
      {open && item.sum && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
          {item.sum}{item.sum.length >= 400 ? "…" : ""}
        </div>
      )}
    </div>
  );
}

// ─── Hoofd component ──────────────────────────────────────────────────────────
export default function SlimDatabase() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoek, setZoek] = useState("");
  const [cat, setCat] = useState("all");
  const [tijdvak, setTijdvak] = useState("Alle tijdvakken");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/slim_data.json")
      .then(r => { if (!r.ok) throw new Error("Kan data niet laden"); return r.json(); })
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    const q = zoek.toLowerCase().trim();
    return data.filter(item => {
      if (cat !== "all" && item.cat !== cat) return false;
      if (tijdvak !== "Alle tijdvakken" && item.tv !== tijdvak) return false;
      if (q && !item.nm.toLowerCase().includes(q) && !item.pnm.toLowerCase().includes(q) && !item.sum.toLowerCase().includes(q) && !item.loc.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [data, zoek, cat, tijdvak]);

  const paginated = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page]);
  const hasMore = paginated.length < filtered.length;

  useEffect(() => { setPage(1); }, [zoek, cat, tijdvak]);

  const bannerItems = useMemo(() => data.filter(d => d.sub > 20000).slice(0, 80), [data]);

  const stats = useMemo(() => ({
    totaal: data.length,
    mkb: data.filter(d => d.cat === "MKB").length,
    sam: data.filter(d => d.cat === "SAM").length,
    grb: data.filter(d => d.cat === "GRB").length,
    totaalSub: data.reduce((s, d) => s + (d.sub || 0), 0),
  }), [data]);

  return (
    <div style={{ minHeight: "100vh", background: "#0a1628", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#fff" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(180deg, #0d2e5a 0%, #0a1628 100%)", padding: "48px 20px 0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#2aaae2", textTransform: "uppercase", marginBottom: 12 }}>SLIM Subsidie Advies</div>
          <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 800, margin: "0 0 12px", lineHeight: 1.1 }}>
            SLIM Subsidie<br /><span style={{ color: "#2aaae2" }}>Projecten Database</span>
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", maxWidth: 560, lineHeight: 1.7, margin: "0 0 32px" }}>
            Doorzoek alle {stats.totaal.toLocaleString("nl-NL")} gehonoreerde SLIM-projecten. Laat je inspireren door wat andere MKB-bedrijven hebben bereikt.
          </p>

          {/* Stats */}
          {!loading && (
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
              {[
                { label: "Totaal projecten", val: stats.totaal.toLocaleString("nl-NL") },
                { label: "Individueel MKB", val: stats.mkb.toLocaleString("nl-NL") },
                { label: "Samenwerkingsverbanden", val: stats.sam.toLocaleString("nl-NL") },
                { label: "Totaal subsidie", val: fmt(stats.totaalSub) },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "12px 18px" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Banner */}
      {!loading && bannerItems.length > 0 && <Banner items={bannerItems} />}

      {/* Filters */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 20px 0" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          {/* Zoekbalk */}
          <input
            value={zoek}
            onChange={e => setZoek(e.target.value)}
            placeholder="Zoek op bedrijf, project, locatie..."
            style={{ flex: "1 1 280px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "10px 14px", color: "#fff", fontSize: 14, outline: "none" }}
          />
          {/* Categorie */}
          <select value={cat} onChange={e => setCat(e.target.value)}
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "10px 14px", color: "#fff", fontSize: 13, cursor: "pointer" }}>
            {CATS.map(c => <option key={c.key} value={c.key} style={{ background: "#0d2e5a" }}>{c.label}</option>)}
          </select>
          {/* Tijdvak */}
          <select value={tijdvak} onChange={e => setTijdvak(e.target.value)}
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "10px 14px", color: "#fff", fontSize: 13, cursor: "pointer" }}>
            {TIJDVAKKEN.map(t => <option key={t} value={t} style={{ background: "#0d2e5a" }}>{t}</option>)}
          </select>
        </div>

        {/* Resultaten teller */}
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>
          {loading ? "Data laden..." : `${filtered.length.toLocaleString("nl-NL")} projecten gevonden`}
          {zoek && <span> voor "<strong style={{ color: "#2aaae2" }}>{zoek}</strong>"</span>}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(255,255,255,0.4)" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
            <div>Database laden ({(6208).toLocaleString("nl-NL")} projecten)...</div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: 20, color: "#fca5a5" }}>
            {error} — zorg dat slim_data.json in de /public map staat.
          </div>
        )}

        {/* Resultaten */}
        {!loading && !error && (
          <>
            {paginated.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.3)" }}>
                Geen projecten gevonden. Probeer een andere zoekterm.
              </div>
            ) : (
              paginated.map(item => <Card key={item.id} item={item} />)
            )}

            {/* Laad meer */}
            {hasMore && (
              <div style={{ textAlign: "center", padding: "24px 0 48px" }}>
                <button onClick={() => setPage(p => p + 1)}
                  style={{ background: "#2aaae2", color: "#fff", border: "none", borderRadius: 8, padding: "12px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  Meer laden ({filtered.length - paginated.length} resterend)
                </button>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        {!loading && (
          <div style={{ background: "linear-gradient(135deg, #0d2e5a, #1a4a7a)", border: "1px solid rgba(42,170,226,0.3)", borderRadius: 16, padding: "32px", margin: "32px 0 48px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Wil jij ook een succesvol SLIM-project?</div>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 20, fontSize: 14 }}>
              Doe gratis de quickscan en weet in 2 minuten of jouw bedrijf in aanmerking komt voor het tijdvak van 10 augustus – 7 september 2026.
            </p>
            <a href="/" style={{ display: "inline-block", background: "#f59e0b", color: "#1a1a2e", fontWeight: 700, padding: "12px 28px", borderRadius: 8, textDecoration: "none", fontSize: 15 }}>
              Doe gratis de quickscan →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
