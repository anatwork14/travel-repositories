# Travel Notebook — public travel research portal

**LIVE PUBLIC WEBSITE:** https://travel-repositories.vercel.app/ (automatic GitHub → Vercel deployment).\n\nOptional GitHub Pages URL, once enabled: https://anatwork14.github.io/travel-repositories/

A Vietnamese-language, **multi-destination travel discovery and preparation platform**. The homepage works independently of Macau. The Macau city guide is the first published city, while future destinations remain labeled as research-planned (no fabricated guide data).

## Features
- **Destination-neutral homepage:** search and filter by country/territory, province/region and locality with accent-insensitive aliases; clear published/planned status, fully responsive design and generic pre-trip preparation checklist.
- Homepage trip-workspace: choose destination/departure date/domestic vs international, six checklist stages, completed/pending tasks, editable custom tasks, progress and TXT export (on-device localStorage only).
- Travel UX research: `docs/travel-experience-ux-research.md` (academic MTE model, CDC/FCDO travel readiness, NNGroup information scent, W3C WCAG 2.2).
- City hero and eleven working tabs: Overview, Check-in, Specialties, Hotels, Market Prices, Interactive Map, Recent Events & Reviews, Self-guided Tour & Reports, Safety & Red Flags, Itinerary & Gifts, Sources.
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
├── index.html                 # Universal destination search & preparation homepage
├── macau/                     # First destination, one folder per country/region
│   ├── index.html             # City landing page
│   └── data.js                # Structured Macau travel facts
├── assets/
│   ├── app.js                 # City guide router and renderer
│   ├── home.js                # Search-first universal homepage
│   ├── destinations.js        # Country / province / city registry and availability
│   ├── travel-checklist.js    # General travel readiness checklist
│   ├── home.css               # Responsive homepage styles
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


## 2026 update — Travel intelligence and self-guided reports

### Balanced recent events and independent evidence
- Macau has a new **Sự kiện & review** tab: dated, source-linked opportunities and warnings; separately, machine-discovered RSS headlines have no automatically assigned sentiment.
- Editorial notes: `macau/intelligence.json`. Automated titles: `macau/live-news.json`. Discovered original discussion links: `macau/review-links.json`.
- The news section never pretends that a source headline is a verified on-the-ground fact, a trustworthy review, or a live notice; displays source links, dates and limitations.
- No scraping/copying Google Maps, Booking or Tripadvisor reviews or inventing star ratings. Original community posts are outbound links, not validated first-hand testimonies.
- Google News to Reddit discovery is indexing, may redirect via Google News and may include off-topic material; it is not reviewed testimony.

### Daily public RSS updates
- `.github/workflows/refresh-intelligence.yml`: daily scheduled 02:17 UTC, plus manual workflow dispatch and changes to the ingestion code. GitHub may delay or disable schedule; last refresh is shown on-site.
- `scripts/refresh_intelligence.py` uses Python stdlib, limited-length RSS requests, per-source timeout, date filtering, de-duplication and safe links; only headline/date/URL/source metadata are published (not full articles).
- Sources are the Macau Cultural Affairs Bureau RSS, Macao Government Information Bureau RSS and Google News RSS topic/discussion discovery. The government RSS states free use for individuals and nonprofit noncommercial organisations; reassess permissions before commercialising.
- Generated JSON commits to main only when changed and the linked Vercel deployment updates automatically; failed feeds do not erase the editorially verified notices.

### Self-guided navigation and report exports
- The **Tour tự dẫn & xuất report** tab lets visitors add, remove, reorder and mark waypoints on a three-day plan, selecting walking/transit/taxi for map directions per leg.
- Dashed links on the on-site map indicate order only and are NOT road geometry; real routing opens Google Maps, no guessed ETAs. Google may ignore intermediate waypoints in transit mode.
- Exports: printable report (browser Print/Save PDF), standalone HTML with offline-readable instructions (maps need Internet), waypoint-only GPX, JSON, and a shareable `/macau/?plan=...#guide` URL.
- Share links encode POI choices only, not personal account details; no server-side storage or user accounts. Saved visits and edits use browser localStorage.
- A public itinerary link is not a permanently hosted PDF. There is no live GPS, offline map tiles, guaranteed opening hours or emergency-service replacement.

### Added project files
  assets/intelligence.js · assets/guide.js · assets/experiences.css
  macau/intelligence.json · macau/live-news.json · macau/review-links.json
  scripts/refresh_intelligence.py · .github/workflows/refresh-intelligence.yml


## October 2026 — Multi-destination discovery experience

The **homepage no longer defaults to Macau**. It now provides a generic entry for many countries, provinces and cities; the published Macau guide remains at `/macau/`.

- `assets/destinations.js`: declarative destination registry (`country`, `province`, `locality`, `type`, `continent`, `status`, `path`). The non-availability label **Sắp nghiên cứu** is essential: only published records link to a real guide.
- Initial discovery index: 22 locations in Asia, including multiple provinces/localities in Vietnam, Japan, Thailand, Korea, Singapore, Hong Kong, Taiwan and Macau. They are NOT 22 published reports.
- Real published city count is computed separately from the discovery count; do not advertise directory cards as researched guides.
- `assets/home.js` renders accessible discovery controls with reactive filters and a helpful empty state; search supports Unicode normalization and common aliases.
- `assets/travel-checklist.js` uses six preparation stages. International-only checks appear for international trips; status persists locally. Users can add up to 40 custom tasks and download the checklist as UTF-8 TXT.
- Any changes to destination availability or geography must be manually reviewed and accompanied by an existing, source-backed destination path before switching from `planned` to `published`.
- No personal data is sent to backend or inserted into the URL for homepage checklist. Do NOT store passport numbers, payment card data or sensitive health information.

### How to add a new country/city

1. Choose canonical folder e.g. `japan/tokyo/` or `vietnam/da-nang/` (do not create a published card before the guide exists).
2. Add a source-linked city dataset, HTML entry and route, with validation and up-to-date facts.
3. Add or update exactly one registry record with a published `path` pointing to a real page.
4. Extend city-guide renderer if the dataset is not Macau-specific; city renderer is currently specialized for Macau and is **not** magically reusable as-is.
5. Update the source registry, test mobile accessibility, and run GitHub CI before merging.

### UX principles

See [travel experience & UX research](docs/travel-experience-ux-research.md). The research differentiates peer-reviewed memorable-tourism factors and official pre-travel checklists from **design hypotheses** that should be validated through user testing. Accessibility aims for WCAG 2.2 and progressive disclosure rather than forcing all checklist tasks onto the first screen.
