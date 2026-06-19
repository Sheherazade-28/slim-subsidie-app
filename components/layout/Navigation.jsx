"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="hp-nav">
      <div className="hp-nav-inner">
        <Link href="/" className="logo" style={{ textDecoration: "none" }}>
          <span className="logo-slim">SLIM</span>
          <span className="logo-sub">SUBSIDIE</span>
          <span className="logo-adv">ADVIES</span>
        </Link>
        <ul className="hp-nav-links">
          <li><Link href="/slim-subsidie">SLIM-subsidie</Link></li>
          <li><Link href="/waarom-wij">Waarom wij?</Link></li>
          <li><Link href="/cases">Cases</Link></li>
          <li><Link href="/team">Team</Link></li>
          <li><Link href="/faq">FAQ</Link></li>
          <li><Link href="/lotingsuitslagen">Lotingsuitslagen</Link></li>
          <li><Link href="/projecten">Projecten</Link></li>
          <li><Link href="/quickscan" className="hp-nav-cta">Gratis quickscan →</Link></li>
        </ul>
      </div>
    </nav>
  );
}
