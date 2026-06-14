"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, ValidationError } from "@formspree/react";

export default function WhitepaperPage() {
  const router = useRouter();
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID);

  if (state.succeeded) {
    router.push("/bedankt");
  }

  return (
    <div className="wp-page">
      <div className="wp-hdr">
        <div className="wp-hdr-inner">
          <Link href="/" className="logo" style={{ textDecoration: "none", marginBottom: 20 }}>
            <span className="logo-slim">SLIM</span>
            <span className="logo-sub">SUBSIDIE</span>
            <span className="logo-adv">ADVIES</span>
          </Link>
          <div className="wp-badge">✦ Gratis whitepaper</div>
          <h1 className="wp-h1">State of SLIM <span>2026</span> — Gratis whitepaper</h1>
          <p className="wp-subkop">De eerste onafhankelijke benchmarkanalyse van 5.891 gehonoreerde MKB-projecten (2020–2024)</p>
        </div>
      </div>
      <div className="wp-body">
        <div className="wp-grid">
          <div className="wp-usps">
            <div className="wp-usps-title">Wat vindt u in dit rapport</div>
            <div className="wp-usp">
              <div className="wp-usp-icon">1</div>
              <div className="wp-usp-text">Welke thema's scoren het beste — en welke worden gemist</div>
            </div>
            <div className="wp-usp">
              <div className="wp-usp-icon">2</div>
              <div className="wp-usp-text">De witte vlek: omscholing &amp; conversie wordt door 0,2% benut</div>
            </div>
            <div className="wp-usp">
              <div className="wp-usp-icon">3</div>
              <div className="wp-usp-text">Regionale atlas + 7 belangrijkste inzichten voor uw aanvraag</div>
            </div>
          </div>
          <div className="wp-form-card">
            <div className="wp-form-title">Download gratis whitepaper</div>
            <div className="wp-form-sub">Vul uw gegevens in en ontvang direct toegang tot het volledige rapport.</div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Voornaam</label>
                <input className="form-input" type="text" name="voornaam" placeholder="Voornaam" required />
              </div>
              <div className="form-group">
                <label className="form-label">Zakelijk e-mailadres</label>
                <input className="form-input" type="email" name="email" placeholder="Zakelijk e-mailadres" required />
                <ValidationError field="email" errors={state.errors} className="form-hint" style={{ color: "var(--red)" }} />
              </div>
              <div className="form-group">
                <label className="form-label">Bedrijfsnaam</label>
                <input className="form-input" type="text" name="bedrijfsnaam" placeholder="Bedrijfsnaam" required />
              </div>
              <div className="form-group">
                <label className="form-label">Aantal medewerkers</label>
                <select className="form-select" name="medewerkers" required defaultValue="">
                  <option value="" disabled>Aantal medewerkers</option>
                  <option value="1-5">1–5</option>
                  <option value="5-10">5–10</option>
                  <option value="10-25">10–25</option>
                  <option value="25-50">25–50</option>
                  <option value="50-100">50–100</option>
                  <option value="100+">100+</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Rol / functie</label>
                <select className="form-select" name="rol" required defaultValue="">
                  <option value="" disabled>Rol / functie</option>
                  <option value="Eigenaar/DGA">Eigenaar / DGA</option>
                  <option value="HR/L&D">HR &amp; Learning Development</option>
                  <option value="Operations">Operations / Bedrijfsvoering</option>
                  <option value="Finance">Finance / Administratie</option>
                  <option value="Anders">Anders</option>
                </select>
              </div>
              <button className="wp-submit" type="submit" disabled={state.submitting}>
                {state.submitting ? "Even geduld…" : "Download gratis whitepaper →"}
              </button>
              <p className="wp-meta">Geen spam. Uw gegevens worden vertrouwelijk behandeld conform onze <Link href="/privacy" style={{ color: "var(--blue)" }}>privacyverklaring</Link>.</p>
            </form>
          </div>
        </div>
      </div>
      <footer className="ftr">
        <div className="ftr-inner">
          <div className="ftr-links">
            <Link href="/privacy">Privacyverklaring</Link>
            <Link href="/av">Algemene Voorwaarden</Link>
          </div>
          <div className="ftr-company">
            <span><strong>SLIM Subsidie Advies</strong> — onderdeel van Inscentia BV</span>
            <span>KvK: 83970614 &nbsp;·&nbsp; BTW: NL863053907B01 &nbsp;·&nbsp; <a href="mailto:info@slimsubsidieadvies.nl" style={{ color: "var(--blue-light)", textDecoration: "none" }}>info@slimsubsidieadvies.nl</a></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
