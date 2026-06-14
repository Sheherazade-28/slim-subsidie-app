import Navigation from "@/components/layout/Navigation";
import Link from "next/link";

export const metadata = {
  title: "Wat is SLIM-subsidie? Activiteiten A, B en C | SLIM Subsidie Advies",
  description: "De SLIM-subsidie vergoedt 60% van uw investering in leren en ontwikkelen van medewerkers, tot €24.999. Ontdek de drie activiteiten A, B en C en de subsidiebedragen.",
};

export default function SlimPage() {
  return (
    <div>
      <Navigation />

      <div className="hp-section" style={{ background: "var(--navy)", padding: "56px 20px 40px" }}>
        <div className="hp-si">
          <div className="hp-slbl" style={{ color: "var(--blue-light)" }}>De SLIM-regeling</div>
          <h1 className="hp-stitle" style={{ color: "#fff" }}>Wat is SLIM-subsidie?</h1>
          <p className="hp-ssub" style={{ color: "rgba(255,255,255,0.6)" }}>
            De SLIM-subsidie vergoedt 60% van uw investering in leren, opleiden en ontwikkelen van uw medewerkers, tot een maximum van €24.999. Landbouwbedrijven: max. €20.000. Beschikbaar voor alle MKB-ondernemingen met personeel in loondienst. De regeling loopt tot eind 2029.
          </p>
        </div>
      </div>

      <div className="hp-section" style={{ background: "var(--off)" }}>
        <div className="hp-si">
          <div className="hp-slbl">Drie subsidieactiviteiten</div>
          <h2 className="hp-stitle">Kies de activiteit die bij uw bedrijf past</h2>
          <div className="hp-act-grid">
            <div className="hp-act-card">
              <div className="hp-act-tag a">Activiteit A</div>
              <div className="hp-act-title">Doorlichting → Opleidings- of ontwikkelplan</div>
              <div className="hp-act-desc">Een externe adviseur brengt de scholingsbehoefte in kaart en stelt een concreet plan op.</div>
              <div className="hp-act-tags">
                <span className="hp-act-tag-sm">Leercultuurscan</span>
                <span className="hp-act-tag-sm">Opleidingsplan</span>
                <span className="hp-act-tag-sm">HR-strategie</span>
              </div>
            </div>
            <div className="hp-act-card">
              <div className="hp-act-tag b">Activiteit B</div>
              <div className="hp-act-title">Loopbaan- of ontwikkeladviezen voor werknemers</div>
              <div className="hp-act-desc">Individuele adviezen via een gecertificeerde loopbaanadviseur voor uw medewerkers.</div>
              <div className="hp-act-tags">
                <span className="hp-act-tag-sm">Loopbaangesprekken</span>
                <span className="hp-act-tag-sm">POP-traject</span>
                <span className="hp-act-tag-sm">Talentassessment</span>
              </div>
            </div>
            <div className="hp-act-card">
              <div className="hp-act-tag c">Activiteit C</div>
              <div className="hp-act-title">Ontwikkelen of invoeren van een L&amp;O-methode</div>
              <div className="hp-act-desc">Structurele methode die medewerkers stimuleert kennis te blijven ontwikkelen op de werkvloer.</div>
              <div className="hp-act-tags">
                <span className="hp-act-tag-sm">Online leerportal</span>
                <span className="hp-act-tag-sm">Bedrijfsschool</span>
                <span className="hp-act-tag-sm">Videoserie</span>
              </div>
            </div>
          </div>

          <div className="hp-req-label">Subsidievereisten per activiteit</div>
          <div className="hp-req-grid">
            <div className="hp-req-card">
              <div className="hp-act-tag a">Activiteit A</div>
              <ul className="hp-req-list">
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Min. investering: <strong>€8.334</strong></span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Max. uurtarief adviseur: <strong>€135</strong> excl. btw</span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Vereist: opleidings- of ontwikkelplan als eindproduct</span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Geen Noloc-certificering vereist</span></li>
              </ul>
            </div>
            <div className="hp-req-card">
              <div className="hp-act-tag b">Activiteit B</div>
              <ul className="hp-req-list">
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Subsidie: <strong>€700</strong> per afgerond loopbaantraject</span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Min. contacttijd: <strong>4 uur</strong> per deelnemer</span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Vereist: Noloc Register Loopbaanprofessional certificering adviseur</span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Vereist: prestatieverklaring getekend door adviseur én deelnemer</span></li>
              </ul>
            </div>
            <div className="hp-req-card">
              <div className="hp-act-tag c">Activiteit C</div>
              <ul className="hp-req-list">
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Min. investering: <strong>€8.334</strong></span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Max. uurtarief adviseur: <strong>€135</strong> excl. btw</span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Vereist: producten van de gerealiseerde L&amp;O-methode als eindproduct</span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Geen Noloc-certificering vereist</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="hp-cta-section">
        <div className="hp-si">
          <h2 className="hp-cta-title">Komt uw bedrijf in aanmerking<br />voor <span>SLIM-subsidie</span>?</h2>
          <p className="hp-cta-sub">Doe de gratis quickscan en weet het binnen 2 minuten.</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/scan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>Doe de gratis quickscan →</Link>
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
