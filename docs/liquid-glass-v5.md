# Travel Notebook — Liquid Glass V5

**Release:** 12 October 2026. Browser-CSS interpretation of premium translucent controls, not an implementation of Apple-native dynamically refracted material.

## Design hierarchy

| Layer | Presentation | Reason |
| --- | --- | --- |
| Global header and navigation | Floating regular glass, luminous edges | Distinguish controls from content |
| Homepage search and filters | Frosted white/tinted glass | Discoverable primary actions |
| Photo captions, badges and Macau breadcrumb | Dark translucent glass | Text remains readable over photographs |
| Macau sticky tabs and route toolbar | Color-adaptive glass | Clear interactive navigation |
| Destination and bento cards | Rounded beveled surfaces, translucent media overlays | Visual depth without overwhelming content |
| Safety warnings, fees, long articles, maps | Solid high-legibility materials | Avoid blur, low contrast and misleading information |

## Implementation

- assets/liquid-glass.css: palette-aware surfaces, highlight borders, blur/fallbacks, responsive styles, sparing controls-focused glass treatments.
- assets/liquid-glass.js: pointer-reactive specular cue on a few interactive surfaces only. No scroll listeners, telemetry or looping motion; bypassed for reduced-motion and coarse-pointer devices.
- All three entry pages load glass CSS after theme palette and Vietnamese typography. The six color themes remain functional.
- qa/liquid-glass.html and scripts/smoke-browser.sh: browser-verified palettes, CSS materials, switcher, keyboard and 390px mobile layout.

## Accessibility and performance

Design respects reduced motion, more contrast and forced colors; reduced transparency when supported. CSS backdrop-filter has solid fallbacks. Primary actions retain visible focus and generous hit targets. Do not blur the OSM map, prices, warnings or editorial body text. Test performance on midrange mobile GPUs before introducing additional large-area blur.

## Source guidance

- [Apple HIG: Materials](https://developer.apple.com/design/human-interface-guidelines/materials): glass is a distinct control/navigation layer rather than a default content material.
- [Apple: Meet Liquid Glass (WWDC25)](https://developer.apple.com/videos/play/wwdc2025/219/): adaptive optical appearance, interaction feedback, legibility and reduced-motion considerations.
- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/): contrast and focus accessibility.

## Outstanding validation

Chrome headless smoke tests are not a substitute for visual regression screenshots, Safari/iPhone hardware testing, verified per-theme contrast, Web Vitals profiling or a usability study.