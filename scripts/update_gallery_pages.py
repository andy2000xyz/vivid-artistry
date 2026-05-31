#!/usr/bin/env python3
"""Update gallery listing pages and homepage to add purchase/store links."""
import os

SITE_ROOT = os.path.join(os.path.dirname(__file__), "..")

# Language config for gallery pages
LANG_PAGES = {
    "zh": {"file": "zh/index.html", "switch": "en", "subtitle": "预览后购买完整版 · $10 USDT/本"},
    "en": {"file": "en/index.html", "switch": "zh", "subtitle": "Preview & purchase full editions · $10 USDT each"},
    "ja": {"file": "ja/index.html", "switch": "en", "subtitle": "プレビュー後、完全版を購入 · $10 USDT"},
    "ko": {"file": "ko/index.html", "switch": "en", "subtitle": "미리보기 후 전체판 구매 · $10 USDT"},
}

for lang, cfg in LANG_PAGES.items():
    path = os.path.join(SITE_ROOT, cfg["file"])
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    old_content = content

    # Update subtitle
    old_sub = None
    for s in [
        "Preview then subscribe to unlock full editions",
        "预览后订阅，解锁完整版",
        "プレビュー後、購読して完全版を",
        "미리보기 후 구독하여 전체판 잠금 해제",
    ]:
        if s in content:
            old_sub = s
            break

    if old_sub:
        content = content.replace(old_sub, cfg["subtitle"])

    # Add store link, before is:</div>\n\n<div class="footer">
    store_link = '''        <div class="store-section">
            <a href="../purchase/" class="store-btn">Purchase Full Edition · $10 USDT</a>
        </div>

'''
    # Insert store section before the footer
    content = content.replace(
        '<div class="footer">',
        store_link + '<div class="footer">'
    )

    # Add store CSS
    store_css = '''
        .store-section { text-align: center; margin-bottom: 32px; }
        .store-btn {
            display: inline-block;
            font-size: 11px;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #06060a;
            background: #d4a84b;
            padding: 14px 36px;
            border-radius: 3px;
            text-decoration: none;
            transition: all 0.3s;
            font-family: 'Inter', sans-serif;
        }
        .store-btn:hover {
            background: #e8c062;
            transform: translateY(-1px);
        }'''

    # Insert store CSS before closing style tag (before </style>)
    # Find the last </style> in head
    head_end = content.rfind("</style>", 0, content.find("</head>"))
    if head_end > 0:
        content = content[:head_end] + store_css + content[head_end:]

    if content != old_content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  {cfg['file']}: updated")
    else:
        print(f"  {cfg['file']}: NO CHANGE")

# ─── Update main index.html (homepage) ───
print("\nUpdating homepage index.html...")
homepage = os.path.join(SITE_ROOT, "index.html")
with open(homepage, "r", encoding="utf-8") as f:
    content = f.read()

old_content = content

# Add purchase link in the portal section, after TG section
purchase_section = '''  <div class="tg-section">
    <p>Purchase full editions · <strong>$10 USDT</strong> each</p>
    <a href="/purchase/" class="tg-link" target="_blank">Go to Store →</a>
  </div>

'''

# Insert before the social-section
content = content.replace(
    '<div class="social-section">',
    purchase_section + '  <div class="social-section">'
)

# Also keep the TG section but change its text to mention the bot is for support
old_tg = '''  <div class="tg-section">
    <p>Subscribe to unlock full editions</p>
    <a href="https://t.me/VividArtistry_bot" class="tg-link" target="_blank">Open in Telegram →</a>
  </div>'''

new_tg = '''  <div class="tg-section">
    <p>Need help with payment? <a href="https://t.me/VividArtistry_bot" style="color:#d4a84b;text-decoration:none;">Contact us on Telegram</a></p>
  </div>'''

content = content.replace(old_tg, new_tg)

# Also add store CSS to homepage
store_css_home = '''
.store-section { text-align: center; margin: 40px 0; }
.store-btn {
    display: inline-block;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #06060a;
    background: #d4a84b;
    padding: 14px 36px;
    border-radius: 3px;
    text-decoration: none;
    transition: all 0.3s;
    font-family: 'Inter', sans-serif;
}
.store-btn:hover {
    background: #e8c062;
    transform: translateY(-1px);
}'''

# Insert store CSS before </style>
content = content.replace("</style>", store_css_home + "</style>", 1)

if content != old_content:
    with open(homepage, "w", encoding="utf-8") as f:
        f.write(content)
    print("  index.html: updated")
else:
    print("  index.html: NO CHANGE")

print("\nDone updating gallery/home pages!")
