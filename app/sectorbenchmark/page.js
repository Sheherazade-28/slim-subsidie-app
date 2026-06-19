"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, ValidationError } from "@formspree/react";

export default function SectorbenchmarkPage() {
  const router = useRouter();
  const [state, handleSubmit] = useForm("xnjyepdz");

  if (state.succeeded) {
    router.push("/sectorbenchmark/bedankt");
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
          <div className="wp-badge">✦ Gratis · Gepersonaliseerd</div>
          <h1 className="wp-h1">Hoe scoort uw sector in de <span>SLIM-regeling</span>?</h1>
          <p className="wp-subkop">Ontvang uw persoonlijke SLIM-sectorbenchmark — gebaseerd op 5.891 gehonoreerde projecten</p>
        </div>
      </div>
      <div className="wp-body">
        <div className="wp-grid">
          <div className="wp-usps">
            <div className="wp-usps-title">Wat staat er in uw benchmark?</div>
            <div className="wp-usp">
              <div className="wp-usp-icon">✓</div>
              <div className="wp-usp-text">De meest succesvolle thema&apos;s in uw branche</div>
            </div>
            <div className="wp-usp">
              <div className="wp-usp-icon">✓</div>
              <div className="wp-usp-text">Drie relevante voorbeeldprojecten uit uw sector (met subsidiebedragen)</div>
            </div>
            <div className="wp-usp">
              <div className="wp-usp-icon">✓</div>
              <div className="wp-usp-text">Het gemiddelde subsidiebedrag binnen uw sector</div>
            </div>
            <div className="wp-usp">
              <div className="wp-usp-icon">✓</div>
              <div className="wp-usp-text">Onze inschatting van uw kansrijkste aanvraagrichting</div>
            </div>
            <div style={{ marginTop: 20, fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
              De benchmark wordt samengesteld uit de database van 5.891 gehonoreerde projecten uit de periode 2020–2024. U ontvangt het rapport per e-mail.
            </div>
            <div style={{ marginTop: 16, padding: "14px 18px", background: "var(--green-l)", border: "1px solid var(--green-b)", borderRadius: "var(--rs)", fontSize: 13, color: "var(--green)", fontWeight: 600 }}>
              Geen kosten. Geen verplichtingen. Wel direct duidelijkheid.
            </div>
          </div>
          <div className="wp-form-card">
            <div className="wp-form-title">Vraag uw gratis benchmark aan</div>
            <div className="wp-form-sub">Vul uw gegevens in en ontvang uw persoonlijke rapport.</div>
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
                <label className="form-label">Sector / branche</label>
                <select className="form-select" name="sector" required defaultValue="">
                  <option value="" disabled>Selecteer uw sector</option>
                  <option value="Industrie & maakindustrie">Industrie &amp; maakindustrie</option>
                  <option value="Zakelijke dienstverlening">Zakelijke dienstverlening</option>
                  <option value="Gezondheids- & welzijnszorg">Gezondheids- &amp; welzijnszorg</option>
                  <option value="Telecom, IT & informatie">Telecom, IT &amp; informatie</option>
                  <option value="Bouwnijverheid & installatie">Bouwnijverheid &amp; installatie</option>
                  <option value="Kunst, cultuur, sport & recreatie">Kunst, cultuur, sport &amp; recreatie</option>
                  <option value="Horeca & verblijf">Horeca &amp; verblijf</option>
                  <option value="Groot- & detailhandel">Groot- &amp; detailhandel</option>
                  <option value="Vervoer & opslag">Vervoer &amp; opslag</option>
                  <option value="Landbouw & groen">Landbouw &amp; groen</option>
                  <option value="Overige dienstverlening">Overige dienstverlening</option>
                  <option value="Anders / nog te bepalen">Anders / nog te bepalen</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Regio</label>
                <select className="form-select" name="regio" required defaultValue="">
                  <option value="" disabled>Selecteer uw regio</option>
                  <option value="Noord-Holland">Noord-Holland</option>
                  <option value="Zuid-Holland">Zuid-Holland</option>
                  <option value="Utrecht">Utrecht</option>
                  <option value="Noord-Brabant">Noord-Brabant</option>
                  <option value="Gelderland">Gelderland</option>
                  <option value="Overijssel">Overijssel</option>
                  <option value="Groningen / Friesland / Drenthe">Groningen / Friesland / Drenthe</option>
                  <option value="Zeeland / Limburg">Zeeland / Limburg</option>
                  <option value="Flevoland">Flevoland</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Aantal medewerkers</label>
                <select className="form-select" name="medewerkers" required defaultValue="">
                  <option value="" disabled>Aantal medewerkers</option>
                  <option value="1-5">1–5 medewerkers</option>
                  <option value="6-10">6–10 medewerkers</option>
                  <option value="11-25">11–25 medewerkers</option>
                  <option value="26-50">26–50 medewerkers</option>
                  <option value="51-100">51–100 medewerkers</option>
                  <option value="100+">100+ medewerkers</option>
                </select>
              </div>
              <button className="wp-submit" type="submit" disabled={state.submitting}>
                {state.submitting ? "Even geduld…" : "Vraag mijn gratis benchmark aan →"}
              </button>
              <p className="wp-meta">Geen spam. U ontvangt het rapport per e-mail binnen 5 werkdagen.</p>
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
