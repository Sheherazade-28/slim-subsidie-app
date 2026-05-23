# SLIM Subsidie Advies — Project Context

## Stack
- React (Create React App)
- Vercel (hosting)
- GitHub Actions (auto-deploy)
- Anthropic API via /api/analyze.js

## Repo
- GitHub: Sheherazade-28/slim-subsidie-app
- Lokaal: ~/slim-subsidie-app
- Live: https://www.slimsubsidieadvies.nl

## Deploy workflow
Push naar main → GitHub Actions (.github/workflows/deploy.yml) → Vercel productie
Automatische deploys werken via GitHub Actions (niet via Vercel webhook).

## Belangrijke bestanden
- src/App.jsx — volledige React app
- public/index.html — SEO/meta tags, Google Ads tag
- vercel.json — routing en cache headers
- api/analyze.js — Anthropic API serverless function

## Huidige prioriteiten
- One-liners verwerken in App.jsx (hero + prijsmodel + social proof sectie)
- Performance mobiel verbeteren (LCP)
