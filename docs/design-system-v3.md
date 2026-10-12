# Travel Notebook — Visual design system V3 (12 October 2026)

## Design decision

Production theme: **Modern Travel Editorial**.

- Homepage: immersive editorial photography, immediately usable destination search, region and status filters, curated collection, reusable travel-readiness checklist.
- City: image-led destination hero, **content-first bento** covering places, specialties, market prices, geography, safety, events and route planning.
- Itinerary: **map-first** desktop design with numbered Leaflet pins, reorderable stops, explicitly labelled bird's-eye distances, real route links and multi-format report export.
- Design Lab: three fully usable alternative homepage visual treatments, loaded from the same destination registry and checklists: `/?concept=minimal`, `/?concept=immersive`, `/?concept=bento`. They differ in layout, not in the dataset.

Open: **https://travel-repositories.vercel.app/design-lab/**

### Why this hybrid

The project is an editorial guide, not a hotel booking engine. The chosen design keeps the destination finder prominent and does **not** claim that the images represent fully researched or bookable destinations.

Baymard Institute, *Travel Site UX: 5 Best Practices* (July 2025), reports common problems involving missing site-specific filters, incomplete tour detail, missing maps, and absent third-party review links. These insights are directional; their accommodation/tour booking findings do not directly prove outcomes for this non-booking information site.

WCAG 2.2 calls for visible keyboard focus, adequate target sizing and an operable alternative to dragging. We therefore retain click up/down controls next to new draggable itinerary stops. Route lines plotted through waypoints are **not** road routes, and displayed straight-line distances are labelled accordingly.

## Concept comparison (qualitative hypotheses, not user-tested measurements)

| Concept | Hero | Reading | Findability | Mobile | Main risk |
|---|---|---|---|---|---|
| Minimal Editorial | Very large typography and whitespace | Excellent for long text | Strong search but fewer landmarks above fold | Low clutter | May feel too sparse/inspire less |
| Immersive Travel | Full photograph and white text | Lower density until scroll | Good search if photo contrast maintained | Captivating but tall | Content obscured, image load |
| Modern Bento | Multiple asymmetrical image tiles | Great visual scanning | Good once structure is learned | Needs ordered stacking | Can look busy with many cards |
| **Production hybrid** | Split photography / large search | Content-first city guides | Hero search, taxonomy filters | Responsive compact widgets | A/B testing still required |

These are design team hypotheses, **not validated UX ratings**. Real usability testing and accessibility review are still necessary.

## Typography & color

- Heading: **Fraunces** (serif with restrained character)
- Body/UI: **Manrope** (crisp data labels, navigation, numeric reading)
- Dark forest `#1D3029`, paper `#F8F7F2`, clay `#BA6645`, green `#2B5142`
- No animated background gradients or gratuitous glassmorphism. Low-motion fallback via `prefers-reduced-motion`.
- Static photographs and a slight hover scale only where it adds affordance.

## Photo sources & licenses

Each photographic source links to its corresponding file page below. **Photograph credits/conditions must remain visible and source links accessible**. Wikimedia Commons serves image thumbnails; this is not equivalent to our owning the image. Check individual license requirements before mirroring/cropping in any commercial reuse.

| Where | Original file | Author / license as declared at research time |
|---|---|---|
| Hanoi hero and destination cards | [Hoan Kiem Lake photo.jpg](https://commons.wikimedia.org/wiki/File:Hoan_Kiem_Lake_photo.jpg) | Tranhuutukkt · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| Tokyo cards / postcard | [Rainbow Bridge as seen from Shiodome Tokyo.jpg](https://commons.wikimedia.org/wiki/File:Rainbow_Bridge_as_seen_from_Shiodome_Tokyo.jpg) | Chris 73 / Wikimedia Commons · [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| Bangkok poster/card | [WatArunAtSunset.jpg](https://commons.wikimedia.org/wiki/File:WatArunAtSunset.jpg) | Jean-Marie Hullot · [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| Macau poster/card | [Macau - Senado Square.jpg](https://commons.wikimedia.org/wiki/File:Macau_-_Senado_Square.jpg) | kewl.lu · CC BY 2.0 (confirm the file page before redistribution) |
| Ha Long (reserved image asset) | [Ha Long Bay, Vietnam, Boats.jpg](https://commons.wikimedia.org/wiki/File:Ha_Long_Bay%2C_Vietnam%2C_Boats.jpg) | Vyacheslav Argenberg · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

Photo label on cards: source/platform shorthand. This file contains the complete photographer credit and the canonical license URL, accessible from the homepage “nguồn hình ảnh” link. Avoid reusing reference images pasted from design websites without permission.

## Routing & data integrity

- Homepage point of entry remains `/`, independent of `/macau/`.
- Search and content availability read `assets/destinations.js`; currently only Macau has a published city guide. Other cards are explicitly “Sắp nghiên cứu”.
- City chapter tabs and hashes remain `#overview`, `#spots`, `#food`, `#hotels`, `#prices`, `#map`, `#intelligence`, `#guide`, `#risks`, `#planner`, `#sources`.
- Itinerary drag-and-drop persists via existing browser localStorage. Accessible ▲ ▼ buttons remain alternative controls. Browser's navigation and image failure behavior must be tested.
- Site is currently static with external Google Fonts, Wikimedia photography and OpenStreetMap tiles. Not a fully offline or zero-tracking/offline-capable app.
- Three concept previews are query parameters, not separate content forks. Production defaults to hybrid.

## Acceptance criteria / future tests

1. Homepage opens in a scenic but **destination-neutral** state; search is visible above fold on desktop and phones.
2. Search ‘Macau’, ‘Ha Noi’, ‘Tokyo’, ‘Đà Lạt’ (with/without accents) finds real registry cards, and published/planned state is unambiguous.
3. Filters for country, province, continent, publication status remain functional on all three concept pages.
4. Macau overview bento tiles navigate to the corresponding live tab; warning and reference links are retained.
5. Tour guide supports selecting a day, dragging/reordering pins (desktop), button-based reordering, Map links, GPS opt-in and exporting/printing reports; check geometry disclaimer.
6. Mobile layout at 360px, 390px, 768px; landscape resizing; no horizontal overflow; keyboard tab focus; readable image overlay.
7. Test with 5–8 users for task completion, search success, trust comprehension and itinerary comprehension. No invented conversion metrics.

## Research foundations

- [Baymard: 5 best practices for travel site UX](https://baymard.com/research-articles/travel-site-ux-best-practices)
- [W3C WCAG 2.2](https://www.w3.org/TR/wcag/)
- [Nielsen Norman Group: Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)
- [Material Design 3: Search](https://m3.material.io/components/search/overview)
- [Microsoft Fluent 2](https://fluent2.microsoft.design/)
