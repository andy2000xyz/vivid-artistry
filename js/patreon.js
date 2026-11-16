/* ─────────────────────────────────────────────────────────────
   VIVIAN STUDIO · 结算入口（全站唯一配置点）
   ─────────────────────────────────────────────────────────────
   站内所有「购买 / 开通」按钮都走 Patreon 结算。
   不再有任何加密货币支付代码。

   ┌─ 更换档位直链（推荐）─────────────────────────────────────┐
   │ 1. 打开 https://www.patreon.com/c/vividartistry/membership │
   │ 2. 点 The Archive 那档的 Join，复制地址栏里的 tier_id      │
   │ 3. 把下面 archive 一行换成 /join?tier_id=xxxxxxx           │
   └──────────────────────────────────────────────────────────┘
   改这里，全站立即生效，不需要动任何页面。

   HTML 用法：
     <a href="https://www.patreon.com/c/vividartistry/membership" data-pat="archive">…</a>
   data-pat 取值：home | archive | allaccess | privatechat | telegram
   ───────────────────────────────────────────────────────────── */
(function () {
  var MEMBERSHIP = 'https://www.patreon.com/c/vividartistry/membership';

  var LINKS = {
    home:        'https://www.patreon.com/c/vividartistry',
    archive:     MEMBERSHIP,   // ← The Archive 档（站点主 CTA 指向这里）
    allaccess:   MEMBERSHIP,   // ← $99.99 档，拿到 tier_id 后可单独指向
    privatechat: MEMBERSHIP,
    telegram:    'https://t.me/VividArtistry_bot'
  };

  window.VIVIAN_LINKS = LINKS;

  function apply() {
    var nodes = document.querySelectorAll('[data-pat]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute('data-pat');
      var url = LINKS[key];
      if (!url) continue;
      el.setAttribute('href', url);
      if (el.getAttribute('target') !== '_self') {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
