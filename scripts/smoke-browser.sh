#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
if [[ -z "$CHROME" ]]; then
  echo "::error::No Chromium/Google Chrome on test runner. Browser smoke test cannot be verified."
  exit 1
fi
python3 -m http.server 8765 --bind 127.0.0.1 >/tmp/travel-notebook-http.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT
for _ in {1..30}; do if curl -fsS http://127.0.0.1:8765/ >/dev/null; then break; fi; sleep .5; done
"$CHROME" --headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage --hide-scrollbars --virtual-time-budget=3500 --dump-dom 'http://127.0.0.1:8765/' >/tmp/travel-notebook-home-dom.html 2>/tmp/travel-notebook-chrome-home.err
grep -F 'Đi xa một chút.' /tmp/travel-notebook-home-dom.html >/dev/null
grep -F 'id="destination-query"' /tmp/travel-notebook-home-dom.html >/dev/null
grep -F 'id="theme-trigger"' /tmp/travel-notebook-home-dom.html >/dev/null
grep -F 'Màu sắc' /tmp/travel-notebook-home-dom.html >/dev/null
grep -F 'v3-hero-search' /tmp/travel-notebook-home-dom.html >/dev/null
grep -F 'id="destination-country"' /tmp/travel-notebook-home-dom.html >/dev/null
grep -F 'id="destination-results"' /tmp/travel-notebook-home-dom.html >/dev/null
grep -F 'id="prep-tasks"' /tmp/travel-notebook-home-dom.html >/dev/null
grep -F 'Cẩm nang chuyên sâu' /tmp/travel-notebook-home-dom.html >/dev/null || grep -F 'Đang xây dựng cẩm nang' /tmp/travel-notebook-home-dom.html >/dev/null
grep -F 'Macau' /tmp/travel-notebook-home-dom.html >/dev/null
"$CHROME" --headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage --hide-scrollbars --virtual-time-budget=3500 --dump-dom 'http://127.0.0.1:8765/macau/' >/tmp/travel-notebook-city-dom.html 2>/tmp/travel-notebook-chrome-city.err
grep -F 'Sự kiện &amp; review' /tmp/travel-notebook-city-dom.html >/dev/null || grep -F 'Sự kiện & review' /tmp/travel-notebook-city-dom.html >/dev/null
grep -F 'Tour tự dẫn &amp; xuất report' /tmp/travel-notebook-city-dom.html >/dev/null || grep -F 'Tour tự dẫn & xuất report' /tmp/travel-notebook-city-dom.html >/dev/null
grep -F 'id="city-tab-select"' /tmp/travel-notebook-city-dom.html >/dev/null
grep -F 'city-bento' /tmp/travel-notebook-city-dom.html >/dev/null
grep -F 'id="theme-trigger"' /tmp/travel-notebook-city-dom.html >/dev/null
# Confirm active itinerary and export UI render on their own route.
"$CHROME" --headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage --hide-scrollbars --virtual-time-budget=3500 --dump-dom 'http://127.0.0.1:8765/macau/#guide' >/tmp/travel-notebook-guide-dom.html 2>/tmp/travel-notebook-chrome-guide.err
grep -F 'id="guide-map"' /tmp/travel-notebook-guide-dom.html >/dev/null
grep -F 'data-guide-drag=' /tmp/travel-notebook-guide-dom.html >/dev/null
grep -F 'data-guide-export="print"' /tmp/travel-notebook-guide-dom.html >/dev/null
grep -F 'Lịch trình ngày' /tmp/travel-notebook-guide-dom.html >/dev/null
# All three concept query variants must keep working controls.
for variant in minimal immersive bento; do
 "$CHROME" --headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage --hide-scrollbars --virtual-time-budget=2300 --dump-dom "http://127.0.0.1:8765/?concept=$variant" >"/tmp/travel-$variant.html" 2>/dev/null
 grep -F 'id="destination-country"' "/tmp/travel-$variant.html" >/dev/null
 grep -F 'id="prep-tasks"' "/tmp/travel-$variant.html" >/dev/null
 grep -F "data-concept=\"$variant\"" "/tmp/travel-$variant.html" >/dev/null
done
curl -fsS 'http://127.0.0.1:8765/design-lab/' | grep -F 'Minimal Editorial' > /dev/null
# Real theme interaction: open, select Ocean/Midnight, localStorage persistence and Escape.
"$CHROME" --headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage --hide-scrollbars --virtual-time-budget=3500 --dump-dom 'http://127.0.0.1:8765/qa/theme-typography.html' >/tmp/travel-notebook-theme-qa.html 2>/tmp/travel-theme-qa.err
grep -F 'data-qa-status="PASS"' /tmp/travel-notebook-theme-qa.html >/dev/null || { echo "::error::Palette interaction failed"; grep -o 'data-qa-error="[^"]*"' /tmp/travel-notebook-theme-qa.html || true; exit 1; }
"$CHROME" --headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage --hide-scrollbars --window-size=390,844 --virtual-time-budget=3500 --dump-dom 'http://127.0.0.1:8765/qa/theme-typography.html' >/tmp/travel-notebook-theme-mobile.html 2>/tmp/travel-theme-qa-mobile.err
grep -F 'data-qa-status="PASS"' /tmp/travel-notebook-theme-mobile.html >/dev/null || { echo "::error::Mobile header/palette failed"; grep -o 'data-qa-error="[^"]*"' /tmp/travel-notebook-theme-mobile.html || true; exit 1; }
echo "Browser tests passed: responsive palette interactions, Vietnamese typography, homepage, Macau guide and three design variants."

