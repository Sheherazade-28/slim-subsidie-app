"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, ValidationError } from "@formspree/react";

export default function WhitepaperPage() {
  const router = useRouter();
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID || "mvzydeqk");

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
          <p className="wp-subkop">De eerste onafhankelijke benchmarkanalyse van 5.891 gehonoreerde MKB-projecten (2020–2024) · Versie 1.0 · Juni 2026</p>
        </div>
      </div>
      <div className="wp-body">
        <div className="wp-grid">
          <div className="wp-usps">
            <div className="wp-usps-title">Wat vindt u in dit rapport</div>
            <div style={{background:"var(--navy)",borderRadius:10,padding:"16px 20px",marginBottom:20}}>
              <p style={{color:"#fff",fontStyle:"italic",fontSize:14,lineHeight:1.6,margin:"0 0 8px"}}>
                &ldquo;79% van de bedrijven borgde de resultaten structureel in het reguliere beleid.&rdquo;
              </p>
              <p style={{color:"rgba(255,255,255,0.55)",fontSize:11,margin:0,lineHeight:1.5}}>
                — Eindevaluatie SLIM-regeling · SEOR/Ockham|IPS · juli 2025 · ministerie van SZW
              </p>
            </div>
            <div className="wp-usp">
              <div className="wp-usp-icon">✓</div>
              <div className="wp-usp-text">Onafhankelijk bewijs: 85% voerde alle activiteiten volledig uit — 79% borgde resultaten structureel in het reguliere beleid</div>
            </div>
            <div className="wp-usp">
              <div className="wp-usp-icon">✓</div>
              <div className="wp-usp-text">De 12 thema&apos;s gerangschikt: welke thema&apos;s het meest worden gehonoreerd en wat de gemiddelde subsidiebedragen zijn</div>
            </div>
            <div className="wp-usp">
              <div className="wp-usp-icon">✓</div>
              <div className="wp-usp-text">De witte vlek: omscholing &amp; conversie wordt door slechts 0,3% benut — en daalt nog steeds (−80% sinds 2020)</div>
            </div>
            <div className="wp-usp">
              <div className="wp-usp-icon">✓</div>
              <div className="wp-usp-text">Trendanalyse 2020–2023: welke toepassingen groeien en welke afnemen</div>
            </div>
            <div className="wp-usp">
              <div className="wp-usp-icon">✓</div>
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
              <p className="wp-meta">Geen spam. Uw gegevens worden vertrouwelijk behandeld conform onze <Link href="/privacy" style={{ color: "var(--blue)" }}>privacyverklaring</Link>. Na invullen ontvangt u direct een e-mail met de downloadlink.</p>
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
