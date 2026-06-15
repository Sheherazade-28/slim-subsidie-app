"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const METHODEN = [
  { v: "ideal", l: "iDEAL" },
  { v: "creditcard", l: "Creditcard" },
  { v: "bancontact", l: "Bancontact" },
];

export default function ReserverenForm({ prijs }) {
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [methode, setMethode] = useState("ideal");
  const [loading, setLoading] = useState(false);
  const [fout, setFout] = useState(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("scanContact");
      if (saved) {
        const { naam: savedNaam, email: savedEmail } = JSON.parse(saved);
        if (savedNaam) setNaam(savedNaam);
        if (savedEmail) setEmail(savedEmail);
      }
    } catch {}
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!naam.trim() || !email.trim()) return;
    setLoading(true);
    setFout(null);

    try {
      const res = await fetch("/api/betaling/aanmaken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naam: naam.trim(), email: email.trim(), methode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Betaling kon niet worden aangemaakt.");
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setFout(err.message);
      setLoading(false);
    }
  }

  return (
    <div style={{ background: "#fff", border: "2px solid var(--blue-light)", borderRadius: 14, padding: "32px", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Reserveer uw aanvraagplaats</div>
      <div style={{ fontSize: 28, fontWeight: 900, color: "var(--navy)", marginBottom: 6, fontFamily: "'Barlow Condensed', sans-serif" }}>€{prijs} <span style={{ fontSize: 16, fontWeight: 400, color: "var(--muted)" }}>excl. btw</span></div>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 24, lineHeight: 1.5 }}>Reserveringsfee — wordt verrekend bij toekenning van de subsidie.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--navy)", marginBottom: 5 }}>Naam *</label>
          <input
            type="text"
            required
            placeholder="Voor- en achternaam"
            value={naam}
            onChange={(e) => setNaam(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 15, boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--navy)", marginBottom: 5 }}>E-mailadres *</label>
          <input
            type="email"
            required
            placeholder="uw@bedrijf.nl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 15, boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: 22 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--navy)", marginBottom: 8 }}>Betaalmethode</label>
          <div style={{ display: "flex", gap: 8 }}>
            {METHODEN.map((m) => (
              <label
                key={m.v}
                style={{
                  flex: 1, padding: "9px 0", border: `2px solid ${methode === m.v ? "var(--blue)" : "var(--border)"}`,
                  borderRadius: 8, textAlign: "center", fontSize: 13, fontWeight: 600,
                  color: methode === m.v ? "var(--blue)" : "var(--muted)", cursor: "pointer",
                  background: methode === m.v ? "var(--blue-pale)" : "#fff", transition: "all 0.15s",
                }}
                onClick={() => setMethode(m.v)}
              >
                {m.l}
              </label>
            ))}
          </div>
        </div>

        {fout && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#b91c1c" }}>
            {fout}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !naam.trim() || !email.trim()}
          style={{
            width: "100%", padding: "15px", background: loading ? "var(--muted)" : "var(--blue)",
            color: "#fff", border: "none", borderRadius: 10, fontSize: 16, fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer", marginBottom: 14,
          }}
        >
          {loading ? "Doorsturen naar betaling…" : `Reserveer nu voor €${prijs} →`}
        </button>
      </form>

      <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", lineHeight: 1.6, margin: 0 }}>
        🔒 Betaling via Mollie — veilig en vertrouwd.<br />
        U wordt doorgestuurd naar de betaalomgeving van Mollie.
      </p>
    </div>
  );
}
