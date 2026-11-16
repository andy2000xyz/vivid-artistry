/* ─────────────────────────────────────────────────────────────
   VIVIAN STUDIO · 结算入口（全站唯一配置点）
   ─────────────────────────────────────────────────────────────
   站内所有「购买 / 开通 / 预约」按钮都走 Patreon 结算。
   不再有任何加密货币支付代码。

   如果你在 Patreon 后台为某一档建好了独立邀请链接，例如：
     https://www.patreon.com/c/VividArtistry/join?tier_id=1234567
   只改下面 LINKS 里对应的那一行即可，全站立即生效，不需要动任何页面。

   HTML 用法：
     <a href="https://www.patreon.com/c/VividArtistry" data-pat="archive">…</a>
   data-pat 取值：home | archive | allaccess | privatechat | telegram
   ───────────────────────────────────────────────────────────── */
(function () {
  var LINKS = {
    home:        'https://www.patreon.com/c/VividArtistry',
    archive:     'https://www.patreon.com/c/VividArtistry',
    allaccess:   'https://www.patreon.com/c/VividArtistry',
    privatechat: 'https://www.patreon.com/c/VividArtistry',
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
