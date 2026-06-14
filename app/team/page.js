import Navigation from "@/components/layout/Navigation";
import TeamAvatar from "@/components/ui/TeamAvatar";
import Link from "next/link";

export const metadata = {
  title: "Ons Team — SLIM-subsidieadviseurs | SLIM Subsidie Advies",
  description: "Drie gespecialiseerde SLIM-subsidieadviseurs met diepgaande kennis van de SLIM-regeling en het beoordelingsproces van RVO. Maak kennis met het team.",
};

const TEAM = [
  {
    slug: "nasser-sharifi",
    naam: "Nasser Sharifi",
    objectPosition: "center 20%",
    bio: "Specialist in het intelligent matchen van MKB-aanvragen met de diverse SLIM-subsidietoepassingen.",
  },
  {
    slug: "esther-valerius",
    naam: "Esther Valerius",
    objectPosition: "center 20%",
    bio: "Expert in SLIM-subsidies, wet- en regelgeving en RVO-beoordelingen. Begeleidt subsidieaanvragen inhoudelijk en zorgt voor een optimale aansluiting op de subsidievoorwaarden.",
  },
  {
    slug: "rudolf-favier",
    naam: "Rudolf Favier",
    objectPosition: "center 20%",
    bio: "Expert in compliance en documentenverzameling. Zorgt dat elke aanvraag volledig en correct is vóór indiening.",
  },
];

export default function TeamPage() {
  return (
    <div>
      <Navigation />

      <div className="hp-section" style={{ background: "var(--navy)", padding: "56px 20px 40px" }}>
        <div className="hp-si">
          <div className="hp-slbl" style={{ color: "var(--blue-light)" }}>Ons team</div>
          <h1 className="hp-stitle" style={{ color: "#fff" }}>Uw SLIM-subsidieadviseurs</h1>
          <p className="hp-ssub" style={{ color: "rgba(255,255,255,0.6)" }}>
            Drie specialisten met diepgaande kennis van de SLIM-regeling en het beoordelingsproces van RVO.
          </p>
        </div>
      </div>

      <div className="hp-section" style={{ background: "var(--off)" }}>
        <div className="hp-si">
          <div className="hp-team-grid">
            {TEAM.map(({ slug, naam, objectPosition, bio }) => (
              <div key={slug} className="hp-team-card">
                <TeamAvatar slug={slug} naam={naam} objectPosition={objectPosition} />
                <div className="hp-t-name">{naam}</div>
                <div className="hp-t-role">SLIM Subsidieadviseur</div>
                <div className="hp-t-bio">{bio}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hp-cta-section">
        <div className="hp-si">
          <h2 className="hp-cta-title">Zin om samen te werken?<br />Start met de <span>gratis quickscan</span></h2>
          <p className="hp-cta-sub">Binnen 2 minuten weet u of uw bedrijf in aanmerking komt voor SLIM-subsidie.</p>
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
