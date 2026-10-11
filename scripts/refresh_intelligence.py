#!/usr/bin/env python3
"""Safe, low-volume RSS discovery. No review scraping; only links to original sources.
This script deliberately NEVER infers positive/negative sentiment from keywords.
Run locally: python3 scripts/refresh_intelligence.py
"""
from __future__ import annotations

import datetime as dt
import email.utils
import html
import json
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CITY = ROOT / "macau"
NOW = dt.datetime.now(dt.timezone.utc)
MAX_AGE_DAYS = 45
UA = "TravelNotebookResearchBot/1.0 (public-source-link-aggregator; GitHub anatwork14/travel-repositories)"
NEWS_FEEDS = [
    ("Cultural Affairs Bureau · events", "https://www.icm.gov.mo/rss/files/rssEvents_E.xml"),
    ("Cultural Affairs Bureau · news", "https://www.icm.gov.mo/rss/files/rssNews_E.xml"),
    ("Macao SAR Government · English news", "https://govinfohub.gcs.gov.mo/api/rss/n/en"),
    ("Google News · Macau travel coverage", "https://news.google.com/rss/search?q=Macau%20tourism%20travel%20when%3A14d&hl=en-US&gl=US&ceid=US:en"),
]
# Google News returns search links, not verified traveler reports; source links are only discovery.
COMMUNITY_SEARCH = "https://news.google.com/rss/search?q=site%3Areddit.com%2Fr%2FMacau%20travel%20experience%20when%3A30d&hl=en-US&gl=US&ceid=US:en"
RELEVANT = re.compile(r"touris|visitor|travel|heritage|festiv|concert|cultur|museum|transport|hotel|visa|police|fraud|scam|typhoon|storm|weather|holiday|light up|fireworks|airport|ferry|road closure|traffic|consumer|safety|security|exhibition|gastronom", re.I)
VALID_PROTOCOL = {"https", "http"}


def grab(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml"})
    with urllib.request.urlopen(req, timeout=16) as res:
        if int(res.status) != 200:
            raise ValueError("HTTP " + str(res.status))
        return res.read(1_500_001)[:1_500_000]


def text(node, names):
    for name in names:
        found = node.find(name)
        if found is not None and found.text:
            return html.unescape(re.sub(r"<[^>]+>", "", found.text)).strip()
    return ""


def parse_date(value):
    if not value:
        return None
    try:
        z = email.utils.parsedate_to_datetime(value)
        if z.tzinfo is None:
            z = z.replace(tzinfo=dt.timezone.utc)
        return z.astimezone(dt.timezone.utc)
    except (TypeError, ValueError):
        pass
    try:
        return dt.datetime.fromisoformat(value.replace("Z", "+00:00")).astimezone(dt.timezone.utc)
    except ValueError:
        return None


def valid_link(url):
    u = urllib.parse.urlparse(url)
    return u.scheme in VALID_PROTOCOL and bool(u.hostname)


def entries(raw, source):
    root = ET.fromstring(raw)
    ns = "{http://www.w3.org/2005/Atom}"
    nodes = root.findall(".//item")
    if not nodes:
        nodes = root.findall(".//" + ns + "entry")
    out = []
    for x in nodes:
        title = text(x, ["title", ns + "title"])[:230]
        date = parse_date(text(x, ["pubDate", "date", ns + "published", ns + "updated", "{http://purl.org/dc/elements/1.1/}date"]))
        link = text(x, ["link", ns + "link"])
        if not link:
            link_el = x.find(ns + "link")
            if link_el is not None:
                link = link_el.attrib.get("href", "")
        if not title or not valid_link(link) or not date:
            continue
        if (NOW-date).days > MAX_AGE_DAYS or date > NOW + dt.timedelta(days=3):
            continue
        if not RELEVANT.search(title) and "Cultural Affairs" not in source:
            continue
        out.append({"date":date.date().isoformat(),"title":title,"url":link,"source":source,"kind":"RSS headline"})
    return out


def load_old(name):
    try:
        return json.loads((CITY/name).read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return {}


def unique(items, maximum):
    seen = set()
    out = []
    for x in sorted(items, key=lambda a: a["date"], reverse=True):
        key = re.sub(r"[^a-z0-9]", "", x["title"].casefold())[:125]
        if key in seen:
            continue
        seen.add(key)
        out.append(x)
        if len(out) >= maximum:
            break
    return out


def store(name, payload):
    p = CITY/name
    p.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main():
    found, errors, sources = [], [], 0
    for source, url in NEWS_FEEDS:
        try:
            new = entries(grab(url), source)
            sources += 1
            found.extend(new[:15])
            print(source, len(new), "eligible")
        except (ValueError, ET.ParseError, TimeoutError, OSError, urllib.error.URLError) as exc:
            errors.append(source + ": " + type(exc).__name__)
            print("Feed error:", source, type(exc).__name__, file=sys.stderr)
    old = load_old("live-news.json")
    recent = [x for x in old.get("items", []) if x.get("date", "") >= (NOW-dt.timedelta(days=MAX_AGE_DAYS)).date().isoformat()]
    result = unique(found or recent, 30)
    store("live-news.json", {
        "updatedAt": NOW.isoformat(timespec="seconds") if sources else old.get("updatedAt"),
        "lastAttemptAt": NOW.isoformat(timespec="seconds"),
        "sourceCount": sources,
        "items": result,
        "errors": errors,
        "notice": "Chỉ tiêu đề + link RSS, không đánh giá đúng sai, không phân loại cảm xúc. Không coi đây là review người dùng."
    })
    try:
        community = entries(grab(COMMUNITY_SEARCH), "Google News index · Reddit discussion search")
        community = [x for x in community if "reddit" in (x["title"]+" "+x["url"]).lower()]
        store("review-links.json", {
            "updatedAt":NOW.isoformat(timespec="seconds"),
            "items":unique(community,12),
            "notice":"Chỉ mục bài thảo luận tìm thấy qua RSS; không xác thực tác giả hay trải nghiệm. Không sao chép đánh giá."
        })
    except (ValueError, ET.ParseError, TimeoutError, OSError, urllib.error.URLError):
        if not (CITY/"review-links.json").exists():
            store("review-links.json",{"updatedAt":None,"items":[],"notice":"Nguồn cộng đồng chưa thể truy cập. Sử dụng link thủ công đến thảo luận gốc."})
    print("Stored", len(result), "news headlines. Feed failures:", len(errors))
    # A partial feed failure should not break the existing site.
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
