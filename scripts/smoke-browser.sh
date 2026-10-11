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
grep -F 'Tìm đúng nơi bạn muốn đi.' /tmp/travel-notebook-home-dom.html >/dev/null
grep -F 'id="destination-query"' /tmp/travel-notebook-home-dom.html >/dev/null
grep -F 'Thế giới rộng lớn' /tmp/travel-notebook-home-dom.html >/dev/null
grep -F 'id="destination-country"' /tmp/travel-notebook-home-dom.html >/dev/null
grep -F 'id="destination-results"' /tmp/travel-notebook-home-dom.html >/dev/null
grep -F 'id="prep-tasks"' /tmp/travel-notebook-home-dom.html >/dev/null
grep -F 'Cẩm nang đang lên kế hoạch' /tmp/travel-notebook-home-dom.html >/dev/null
grep -F 'Đặc khu Macau' /tmp/travel-notebook-home-dom.html >/dev/null
"$CHROME" --headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage --hide-scrollbars --virtual-time-budget=3500 --dump-dom 'http://127.0.0.1:8765/macau/' >/tmp/travel-notebook-city-dom.html 2>/tmp/travel-notebook-chrome-city.err
grep -F 'Sự kiện &amp; review' /tmp/travel-notebook-city-dom.html >/dev/null || grep -F 'Sự kiện & review' /tmp/travel-notebook-city-dom.html >/dev/null
grep -F 'Tour tự dẫn &amp; xuất report' /tmp/travel-notebook-city-dom.html >/dev/null || grep -F 'Tour tự dẫn & xuất report' /tmp/travel-notebook-city-dom.html >/dev/null
grep -F 'id="city-tab-select"' /tmp/travel-notebook-city-dom.html >/dev/null
echo "Browser DOM smoke tests passed for universal homepage + Macau guide."
