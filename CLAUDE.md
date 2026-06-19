# SLIM Subsidie Advies — Project Context

## Stack
- Next.js 14+ met App Router
- Vercel (hosting)
- GitHub Actions (auto-deploy naar Vercel via push naar main)
- Mollie (betalingen, webhook op /api/betaling/webhook)
- Resend (transactionele e-mail, noreply@slimsubsidieadvies.nl)
- Formspree (whitepaper formulier, ID: mvzydeqk)

## Repo
- GitHub: Sheherazade-28/slim-subsidie-app
- Live: https://www.slimsubsidieadvies.nl

## Deploy workflow
Push naar main → GitHub Actions → Vercel productie
Feature branches → Vercel preview deploy (automatisch)

## Belangrijke bestanden en mappen
- app/ — alle pagina's (App Router)
- app/slim-subsidie/page.js — hoofdpillar pagina (canonical URL)
- app/faq/page.js — volledige FAQ kennisbank (31 vragen)
- app/scan/page.js — quickscan flow
- app/reserveren/page.js — reserveringsformulier + Mollie betaling
- app/succes/page.js — betalingsbevestiging (geen AI-analyse meer)
- app/aanvragen/page.js — aanvraagproces pagina
- components/ui/ — gedeelde UI-componenten
- components/ui/ActiviteitenTabs.jsx — tabcomponent activiteiten A/B/C
- components/Navigation.jsx — navigatie
- styles/globals.css — alle CSS (geen Tailwind)
- data/slim-content.js — single source of truth voor content
- lib/emailTemplate.js — e-mailsjabloon betalingsbevestiging
- api/betaling/webhook.js — Mollie webhook handler
- next.config.js — 301-redirects
- app/sitemap.js — XML sitemap

## URL-architectuur (hub-and-spoke)
- /slim-subsidie — canonieke pillar page (hoofdpagina over de regeling)
- /faq — volledige FAQ kennisbank
- /scan — gratis quickscan
- /reserveren — reservering €199
- /aanvragen — aanvraagproces
- /lotingsuitslagen — lotingsdata
- /projecten — projectdatabase
- /state-of-slim-2026 — whitepaper landingspagina

## 301-redirects (next.config.js)
- /wat-is-slim → /slim-subsidie
- /slim → /slim-subsidie
- /slim-subsidie/wat-is-slim → /slim-subsidie

## Kritieke inhoudsregels (altijd handhaven)
- Subsidiepercentage: 60% voor alle MKB (80% bestaat niet meer)
- Maximum subsidie: "tot €25.000" (nooit "maximaal €25.000" of "€24.999")
- Activiteit D: afgeschaft per 2025
- Minimale subsidie: €5.000 (activiteiten A en C)
- Benodigde projectomvang: vanaf €8.334
- Grootbedrijf landbouw/horeca/recreatie: niet meer individueel subsidiabel per 2025
- MKB landbouwbedrijven: max. €20.000 (art. 2.20 SLIM-regeling, nog steeds geldig)
- Reserveringsfee: €199 excl. btw (nooit "dieptecheck" of andere termen)
- Succesfee: €2.500 excl. btw, no cure no pay
- Budget 2026: €45 miljoen totaal (€25M individueel + €20M samenwerkingsverbanden)
- Tijdvak 2 individueel MKB: 10 augustus t/m 7 september 2026
- Tijdvak samenwerkingsverbanden 2026: 22 juni t/m 20 juli 2026
- Behandeling samenwerkingsverbanden: loting per 31 maart 2026 (stcrt-2026-13249)
- Voorschot: "binnen 6 weken 50%" (nooit "direct", nooit "direct uitbetaald", nooit "ontvangt u direct")
- Diepteanalyse/dieptecheck: vervallen — niet meer vermelden

## Branchestrategie
- main: productie
- feature branches: fixes-*, content-*, url-*, faq-* etc.
- Directe merge naar main (geen pull requests)

## URL-structuur (bijgewerkt juni 2026)
- Quickscan: /quickscan (was /scan — 301 redirect actief)
- Whitepaper: /whitepaper (Formspree ID: mvzydeqk)
- Sectorbenchmark: /sectorbenchmark (Formspree ID: placeholder, wordt bijgewerkt)
- Bedanktpagina benchmark: /sectorbenchmark/bedankt

## Content ladder
/quickscan → reservering €199
/sectorbenchmark → gratis, e-mail vereist
/whitepaper → gratis, e-mail vereist
SEO-pagina's /slim-subsidie/* → gratis, geen registratie
