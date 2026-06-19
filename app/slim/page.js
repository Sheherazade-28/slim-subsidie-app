import Navigation from "@/components/layout/Navigation";
import Link from "next/link";
import { ACTIVITEITEN, SUBSIDIE } from "@/data/slim-content";

export const metadata = {
  title: "Wat is SLIM-subsidie? Activiteiten A, B en C | SLIM Subsidie Advies",
  description: `De SLIM-subsidie vergoedt ${60}% van uw investering in leren en ontwikkelen van medewerkers, tot €${(25000).toLocaleString("nl-NL")}. Ontdek de drie activiteiten A, B en C en de subsidiebedragen.`,
};

export default function SlimPage() {
  const minInv = SUBSIDIE.minProjectomvang.toLocaleString("nl-NL");
  const minSub = SUBSIDIE.minSubsidie.toLocaleString("nl-NL");

  return (
    <div>
      <Navigation />

      <div className="hp-section" style={{ background: "var(--navy)", padding: "56px 20px 40px" }}>
        <div className="hp-si">
          <div className="hp-slbl" style={{ color: "var(--blue-light)" }}>De SLIM-regeling</div>
          <h1 className="hp-stitle" style={{ color: "#fff" }}>Wat is SLIM-subsidie?</h1>
          <p className="hp-ssub" style={{ color: "rgba(255,255,255,0.6)" }}>
            De SLIM-subsidie vergoedt {SUBSIDIE.percentage}% van uw investering in leren, opleiden en ontwikkelen van uw medewerkers, tot €{SUBSIDIE.maxBedrag.toLocaleString("nl-NL")}. Landbouwbedrijven: tot €{SUBSIDIE.maxBedragLandbouw.toLocaleString("nl-NL")}. Beschikbaar voor alle MKB-ondernemingen met personeel in loondienst. De regeling loopt tot eind 2029.
          </p>
        </div>
      </div>

      <div className="hp-section" style={{ background: "var(--off)" }}>
        <div className="hp-si">
          <div className="hp-slbl">Drie subsidieactiviteiten</div>
          <h2 className="hp-stitle">Kies de activiteit die bij uw bedrijf past</h2>
          <div className="hp-act-grid">
            {ACTIVITEITEN.map((act) => (
              <div key={act.id} className="hp-act-card">
                <div className={`hp-act-tag ${act.tagClass}`}>{act.tag}</div>
                <div className="hp-act-title">{act.title}</div>
                <div className="hp-act-desc">{act.desc}</div>
                <div className="hp-act-tags">
                  {act.examples.slice(0, 3).map((ex) => (
                    <span key={ex} className="hp-act-tag-sm">{ex}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="hp-req-label">Subsidievereisten per activiteit</div>
          <div className="hp-req-grid">
            <div className="hp-req-card">
              <div className="hp-act-tag a">Activiteit A</div>
              <ul className="hp-req-list">
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Minimale subsidie: <strong>€{minSub}</strong></span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Benodigde projectomvang: vanaf <strong>€{minInv}</strong></span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Max. uurtarief adviseur: <strong>€{SUBSIDIE.maxUurtarief}</strong> excl. btw</span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Vereist: opleidings- of ontwikkelplan als eindproduct</span></li>
              </ul>
            </div>
            <div className="hp-req-card">
              <div className="hp-act-tag b">Activiteit B</div>
              <ul className="hp-req-list">
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Subsidie: <strong>€{SUBSIDIE.loopbaanVergoeding}</strong> per afgerond loopbaantraject</span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Min. contacttijd: <strong>4 uur</strong> per deelnemer</span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Vereist: Noloc Register Loopbaanprofessional certificering adviseur</span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Vereist: prestatieverklaring getekend door adviseur én deelnemer</span></li>
              </ul>
            </div>
            <div className="hp-req-card">
              <div className="hp-act-tag c">Activiteit C</div>
              <ul className="hp-req-list">
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Minimale subsidie: <strong>€{minSub}</strong></span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Benodigde projectomvang: vanaf <strong>€{minInv}</strong></span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Max. uurtarief adviseur: <strong>€{SUBSIDIE.maxUurtarief}</strong> excl. btw</span></li>
                <li className="hp-req-item"><span className="hp-req-dot" /><span>Vereist: producten van de gerealiseerde L&amp;O-methode als eindproduct</span></li>
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
            <Link href="/quickscan" className="hp-btn-p" style={{ fontSize: 16, padding: "15px 34px" }}>Doe de gratis quickscan →</Link>
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
