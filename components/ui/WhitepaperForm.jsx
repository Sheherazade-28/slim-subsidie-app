"use client";

import { useState } from "react";

export default function WhitepaperForm() {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [fields, setFields] = useState({ voornaam: "", achternaam: "", email: "", bedrijf: "" });

  if (!formId) {
    return (
      <div style={{ background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 12, padding: "20px 24px" }}>
        <p style={{ margin: 0, fontSize: 14, color: "#92400e", fontWeight: 600 }}>
          Whitepaper download tijdelijk niet beschikbaar — neem contact op via{" "}
          <a href="mailto:info@slimsubsidieadvies.nl" style={{ color: "#92400e" }}>info@slimsubsidieadvies.nl</a>.
        </p>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          voornaam: fields.voornaam,
          achternaam: fields.achternaam,
          email: fields.email,
          bedrijf: fields.bedrijf,
          _subject: "Whitepaper State of SLIM 2026 download",
        }),
      });
      if (res.ok) {
        setStatus("success");
        const link = document.createElement("a");
        link.href = "/whitepaper-state-of-slim-2026.pdf";
        link.download = "State-of-SLIM-2026.pdf";
        link.click();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ background: "#f0fdf4", border: "1px solid #a8d8bc", borderRadius: 12, padding: "28px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
        <h3 style={{ color: "#1a7a4a", marginBottom: 8 }}>Uw download start automatisch</h3>
        <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 16 }}>
          Lukt het niet? Download de whitepaper direct via de knop hieronder.
        </p>
        <a
          href="/whitepaper-state-of-slim-2026.pdf"
          download="State-of-SLIM-2026.pdf"
          style={{
            display: "inline-block",
            background: "var(--blue)",
            color: "#fff",
            borderRadius: 8,
            padding: "12px 28px",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: 15,
          }}
        >
          Download State of SLIM 2026 (PDF) →
        </a>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    fontSize: 15,
    fontFamily: "inherit",
    color: "var(--navy)",
    boxSizing: "border-box",
  };

  const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, color: "var(--navy)", marginBottom: 5 };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Voornaam *</label>
          <input
            required
            style={inputStyle}
            value={fields.voornaam}
            onChange={(e) => setFields((f) => ({ ...f, voornaam: e.target.value }))}
          />
        </div>
        <div>
          <label style={labelStyle}>Achternaam *</label>
          <input
            required
            style={inputStyle}
            value={fields.achternaam}
            onChange={(e) => setFields((f) => ({ ...f, achternaam: e.target.value }))}
          />
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>E-mailadres *</label>
        <input
          required
          type="email"
          style={inputStyle}
          value={fields.email}
          onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
        />
      </div>
      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>Bedrijfsnaam</label>
        <input
          style={inputStyle}
          value={fields.bedrijf}
          onChange={(e) => setFields((f) => ({ ...f, bedrijf: e.target.value }))}
        />
      </div>
      {status === "error" && (
        <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 12 }}>
          Er ging iets mis. Probeer het opnieuw of mail naar info@slimsubsidieadvies.nl.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          background: "var(--blue)",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "13px 32px",
          fontWeight: 700,
          fontSize: 15,
          fontFamily: "inherit",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          opacity: status === "loading" ? 0.7 : 1,
          width: "100%",
        }}
      >
        {status === "loading" ? "Verwerken…" : "Download whitepaper gratis →"}
      </button>
      <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 10, textAlign: "center" }}>
        Geen spam. U ontvangt uitsluitend de whitepaper. Zie onze{" "}
        <a href="/privacy" style={{ color: "var(--muted)" }}>privacyverklaring</a>.
      </p>
    </form>
  );
}
