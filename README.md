# Travel Notebook — public travel research portal

**LIVE PUBLIC WEBSITE:** https://travel-repositories.vercel.app/ (automatic GitHub → Vercel deployment).\n\nOptional GitHub Pages URL, once enabled: https://anatwork14.github.io/travel-repositories/

A responsive, Vietnamese-language, city-level travel guide powered by structured destination folders. Starting destination: **Macau, December 2026**.

## Features
- Home destination directory, city hero and nine working tabs: Overview, Check-in, Specialties, Hotels, Market Prices, Interactive Map, Safety & Red Flags, Itinerary & Gifts, Sources.
- 12 Macau check-in locations with coordinates, region filter, on-device favorites and OpenStreetMap directions.
- 7 food specialties, 7 hotel profiles (MICHELIN Keys 2026 where published), restaurant/bus/LRT/taxi spending ranges and August 2026 hotel market-average benchmark.
- Macau Pataca → VND/HKD converter, customizable per-person trip budget calculator.
- Geographic regions: Macau Peninsula, Taipa, Cotai, Coloane; Leaflet interactive pins on OpenStreetMap.
- Visa and entry warnings for Vietnamese passport holders, currency exchange scams, crowded holiday travel and Macau/Hong Kong border distinction.
- A 3-day starter plan, souvenirs, official research sources and verified-on date.
- No cookies, accounts, tracking, framework dependencies, booking claims, or private data collection. Favorites are stored only in the browser.

## Folder architecture

```text
travel-repositories/
├── index.html                 # All destination directory
├── macau/                     # First destination, one folder per country/region
│   ├── index.html             # City landing page
│   └── data.js                # Structured Macau travel facts
├── assets/
│   ├── app.js                 # Shared interactive rendering logic
│   └── site.css               # Responsive design
├── .github/workflows/pages.yml
└── .nojekyll
```

For large countries, follow `japan/tokyo/`, `japan/osaka/` etc. Macau is a city-sized Special Administrative Region, so a single top-level `macau/` folder suffices. To add another destination, create a new dataset following the Macau schema and extend the renderer/routing registry in `assets/app.js`. **Adding a folder without registering it is not enough.**

## Public deployment (Vercel)\n\nThe repository is linked to Vercel project `travel-repositories` on `main`. Each GitHub push deploys to **https://travel-repositories.vercel.app/**. The production deployment is READY and has no Vercel SSO or password protection.\n\n## Optional: Deploy with GitHub Pages

1. Open this repository → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source: GitHub Actions**.
3. Open **Actions → Publish travel website to GitHub Pages** to check the deployment, or manually run it if needed.
4. Once the deployment shows **success**, visit https://anatwork14.github.io/travel-repositories/ and https://anatwork14.github.io/travel-repositories/macau/.

This repository is public, but **a code commit is not proof that GitHub Pages is live**. GitHub Pages may need manual activation by the repository owner.

## Local development

Requires any local static web server because HTML modules won't load correctly with `file://`.

```bash
python3 -m http.server 8000
# http://localhost:8000/
# http://localhost:8000/macau/
```

## Editorial standards

- `macau/data.js` includes a dated snapshot and source links.
- Currency snapshot **11 October 2026**, 1 MOP ≈ 3,207.18 VND. Rate is not live.
- Public transportation fares are sourced; food and souvenir prices are **planning estimates**, not price quotes.
- Three/four/five-star average nightly rates are from **August 2026**, not a booking offer for December 2026.
- Hotel MICHELIN Keys reflect the **2026 guide** and are not independent rankings from this project.
- Ordinary Vietnamese passport holders **must arrange Macau visas in advance**. On short visits the official published proof-of-subsistence threshold may apply.
- Before travel: recheck entry rules, weather, restaurant menus, operating schedules and all prices at original sources.
- Photo sources: Wikimedia Commons file pages linked in the Sources tab, governed by their respective licenses. Wikimedia imagery is referenced remotely and may be blocked by browser privacy settings. Map tiles © OpenStreetMap contributors; free community tiles are not intended for high-volume commercial traffic.
- No scraped proprietary travel images; no invented real-time availability; no unverified hotel booking prices.

## Roadmap

- Generalize renderer into a scalable multi-city registry, add JSON schema validation in CI and city search.
- Build data freshness badges and automated source/link audits.
- Add multilingual translations, season/year selectors, transit directions and optional pre-cached/offline maps.
- Self-host appropriately licensed photographs and migrate to tile service with commercial-use terms as traffic grows.
