#!/usr/bin/env python3
"""Replace Telegram purchase links with website purchase links in all edition files."""
import os, glob, re

EDITION_DIR = os.path.join(os.path.dirname(__file__), "..", "editions")

# Replacements for each language - maps old TG button text to new text
# The TG links all point to https://t.me/VividArtistry_bot
TG_HREF = "https://t.me/VividArtistry_bot"

# Find all html files in edition directories
html_files = []
for vol in range(1, 19):
    for lang in ["zh", "en", "ja", "ko"]:
        path = os.path.join(EDITION_DIR, f"vol{vol}", f"{lang}.html")
        if os.path.exists(path):
            html_files.append((vol, lang, path))

print(f"Found {len(html_files)} edition preview files to process")

for vol, lang, path in html_files:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    old_content = content

    # Replace the CTA button linking to Telegram
    # Pattern: <a class="cta-btn" ... href="https://t.me/VividArtistry_bot">button text</a>
    # Replace with link to purchase page

    new_cta = f'<a class="cta-btn" style="display:inline-block;font:11px/1 var(--mono);letter-spacing:0.15em;text-transform:uppercase;color:var(--paper);background:var(--accent);padding:12px 32px;border-radius:2px;text-decoration:none" href="/purchase/">Buy Full Edition · $10 USDT</a>'

    # Try different language button texts
    for old_text in [
        "订阅以解锁完整版",
        "Subscribe to unlock full edition",
        "購読して完全版を入手",
        "구독하여 완전판 잠금 해제",
    ]:
        old_pattern = f'href="{TG_HREF}"{chr(62)}{old_text}</a>'
        new_pattern = f'href="/purchase/" target="_blank">{old_text} · $10</a>'
        count = content.count(old_pattern)
        if count > 0:
            content = content.replace(old_pattern, new_pattern)
            print(f"  vol{vol}/{lang}.html: replaced '{old_text}' ({count}x)")
            break

    if content == old_content:
        print(f"  vol{vol}/{lang}.html: NO MATCH - skipping")

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

# Also update edition index pages (the vol1/index.html etc.)
print("\nUpdating edition index pages...")
index_files = []
for vol in range(1, 19):
    path = os.path.join(EDITION_DIR, f"vol{vol}", "index.html")
    if os.path.exists(path):
        index_files.append(path)

for path in index_files:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    old_content = content

    # Replace TG link in footer
    content = content.replace(
        '<a href="https://t.me/VividArtistry_bot" target="_blank">Telegram</a>',
        '<a href="/purchase/" target="_blank">Purchase Full Edition · $10 USDT</a>'
    )

    if content != old_content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  {os.path.basename(os.path.dirname(path))}/index.html: updated")
    else:
        print(f"  {os.path.basename(os.path.dirname(path))}/index.html: NO MATCH")

print("\nDone!")
