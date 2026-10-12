#!/usr/bin/env python3
"""Discover fresh Macau travel blog/guide links from public Google News RSS searches.

No copying articles, scraping Reddit, ratings inference, or sentiment classification.
Only store title, publication date, source, and link. Use official Reddit browsing URLs
for real-time Reddit topic views because public RSS/API access is being discontinued.
"""
from __future__ import annotations

import datetime as dt
import email.utils
import html
import json
import re
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "macau" / "travel-blogs.json"
UTC_NOW = dt.datetime.now(dt.timezone.utc)
LOOKBACK_DAYS = 60
MAX_ITEMS = 28
SEARCHES = (
    ('Travel journals and trip stories', 'Macau "travel blog" OR "trip report" OR "travel diary" when:45d'),
    ('Independent travel guides', 'Macau "travel guide" OR "itinerary" when:45d'),
    ('Food and on-the-ground experience', 'Macau "food guide" OR "travel tips" when:45d'),
    ('Vietnamese travel writing', '"du lịch Macau" OR "review Ma Cao" when:45d'),
)
PLACE = re.compile(r'\b(maca[ou]|taipa|cotai|coloane|senado)\b|ma cao|ma-cao', re.I)
TRAVEL = re.compile(r'travel|touris|itinerar|guide|trip|visit|food|thing[s]? to do|experience|review|holiday|du lịch|kinh nghiệm|check-in|ẩm thực|tham quan|chơi|ăn gì', re.I)


def rss_url(query: str) -> str:
    return "https://news.google.com/rss/search?q=" + urllib.parse.quote(query) + "&hl=en-US&gl=US&ceid=US:en"


def get_rss(url: str) -> bytes:
    request = urllib.request.Request(url, headers={
        'User-Agent': 'TravelNotebookDiscovery/1.0 (+https://github.com/anatwork14/travel-repositories)',
        'Accept': 'application/rss+xml, application/xml, text/xml'
    })
    with urllib.request.urlopen(request, timeout=18) as response:
        if response.status != 200:
            raise RuntimeError('HTTP ' + str(response.status))
        return response.read(1_200_001)[:1_200_000]


def item_text(node: ET.Element, name: str) -> str:
    item = node.find(name)
    return html.unescape(re.sub(r'<[^>]*>', '', item.text or '')).strip() if item is not None else ''


def pub_date(value: str) -> dt.datetime | None:
    if not value:
        return None
    try:
        time = email.utils.parsedate_to_datetime(value)
        if time.tzinfo is None:
            time = time.replace(tzinfo=dt.timezone.utc)
        return time.astimezone(dt.timezone.utc)
    except (ValueError, TypeError):
        return None


def parse(raw: bytes, tag: str) -> list[dict]:
    root = ET.fromstring(raw)
    found = []
    for item in root.findall('.//item'):
        title = item_text(item, 'title').replace('\n', ' ')[:220]
        url = item_text(item, 'link')
        date = pub_date(item_text(item, 'pubDate'))
        source_node = item.find('source')
        publisher = item_text(item, 'source') if source_node is not None else 'Google News index'
        if not (title and date and url.startswith('https://news.google.com/rss/articles/')):
            continue
        if (UTC_NOW-date).days > LOOKBACK_DAYS or date > UTC_NOW + dt.timedelta(days=2):
            continue
        if not (PLACE.search(title) and TRAVEL.search(title)):
            continue
        # RSS search results might also include news: do not claim these are personal blogs.
        found.append({
            'date': date.date().isoformat(),
            'title': title,
            'url': url,
            'source': publisher[:110],
            'category': tag,
            'sourceType': 'Google News indexed link',
            'verifiedFirsthand': False
        })
    return found


def identity(item: dict) -> str:
    return re.sub(r'[^\w]+', '', item['title'].casefold())[:130]


def compact(items: list[dict]) -> list[dict]:
    out = []
    seen = set()
    for item in sorted(items, key=lambda x: x['date'], reverse=True):
        k = identity(item)
        if not k or k in seen:
            continue
        seen.add(k)
        out.append(item)
        if len(out) >= MAX_ITEMS:
            break
    return out


def main() -> int:
    collected, errors, counts = [], [], 0
    for label, query in SEARCHES:
        try:
            items = parse(get_rss(rss_url(query)), label)
            collected.extend(items)
            counts += 1
            print(f'{label}: {len(items)} matching Macau travel links')
        except (OSError, urllib.error.URLError, ValueError, ET.ParseError, RuntimeError) as e:
            errors.append(label + ' (' + type(e).__name__ + ')')
            print('Failed source:', errors[-1])

    try:
        previous = json.loads(OUT.read_text(encoding='utf-8'))
    except (OSError, ValueError):
        previous = {}

    # If all sources fail, retain previous results but do not claim a successful refresh.
    if counts == 0:
        collected = [x for x in previous.get('items', [])
                     if x.get('date', '') >= (UTC_NOW-dt.timedelta(days=LOOKBACK_DAYS)).date().isoformat()]
    result = compact(collected)
    payload = {
        'updatedAt': UTC_NOW.isoformat(timespec='seconds') if counts else previous.get('updatedAt'),
        'lastAttemptAt': UTC_NOW.isoformat(timespec='seconds'),
        'sourceCount': counts,
        'items': result,
        'errors': errors,
        'notice': (
          'Tự động phát hiện TIÊU ĐỀ + LINK qua Google News RSS, không phải bài viết gốc hoặc review đã xác minh. '
          'Nhấp liên kết để mở nguồn và tự đối chiếu tác giả/ngày viết. Reddit được mở trực tiếp, không scrape.'
        )
    }
    OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    print(f'Saved {len(result)} discoverable links from {counts}/{len(SEARCHES)} feeds.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
