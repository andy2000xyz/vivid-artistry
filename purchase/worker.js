/** VIVIAN STUDIO Purchase System — Cloudflare Worker */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const cors = {
      'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });

    try {
      // ── 创建订单 ──
      if (path === '/api/create-order' && request.method === 'POST') {
        const { email, edition } = await request.json();
        if (!email || !edition) return json({ error: 'email/edition required' }, 400, cors);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Invalid email' }, 400, cors);

        const orderId = generateOrderId();
        // 编码到 order_description，webhook 回调时解析
        const npResult = await createInvoice(env.NOWPAYMENTS_API_KEY, orderId, 10,
          'VS|' + email + '|' + edition, url.origin + '/api/webhook');
        return json({ success: true, order_id: orderId, invoice_url: npResult.invoice_url }, 200, cors);
      }

      // ── Webhook ──
      if (path === '/api/webhook' && request.method === 'POST') {
        const body = await request.json();
        const { order_id, order_description, payment_status, actually_paid } = body;
        if (payment_status === 'finished' && parseFloat(actually_paid || '0') >= 9.5) {
          const parts = (order_description || '').split('|');
          const email = parts[1], edition = parts[2];
          if (email && edition) {
            const labelMap = {
              vol1:'Lust in Monochrome', vol2:'Gilded Shadows Vol.2', vol3:'Gold Veins, Dark Silk',
              vol4:'Gilded Shadows Vol.4', vol5:'Gilded Nightfall', vol6:'Gilded Depths Vol.6',
              vol7:'Golden Shadows Noir', vol8:'Gilded Shadows Volume', vol9:'Gilded Midnight Muse',
              vol10:'Gilded Shadows Vol.10', vol11:'Gilded Midnight Visions', vol12:'Gilded Midnight Reverie',
              vol13:'Gilded Shadows of Desire', vol14:'Gilded Shadows Vol.14', vol15:'Gilded Shadows Vol.15',
              vol16:'Gilded Shadows Gallery', vol17:'Gilded Noir Seduction', vol18:'Gilded Shadows Unveiled'
            };
            // 获取 Google Drive 下载链接（从 PDF_BASE_URL JSON 中解析）
            let downloadUrl = '';
            try {
              const links = JSON.parse(env.PDF_BASE_URL);
              downloadUrl = links[edition] || '';
            } catch(e) { downloadUrl = env.PDF_BASE_URL; }

            if (downloadUrl) {
              await sendEmail(env.RESEND_API_KEY, env.FROM_EMAIL, email,
                'Your VIVIAN STUDIO Purchase — ' + (labelMap[edition] || edition),
                buildDownloadEmail(labelMap[edition] || edition, downloadUrl));
            }
            if (env.NOTIFY_EMAIL) {
              await sendEmail(env.RESEND_API_KEY, env.FROM_EMAIL, env.NOTIFY_EMAIL,
                'NEW SALE: ' + (labelMap[edition] || edition),
                buildNotifyEmail(labelMap[edition] || edition, email, order_id));
            }
          }
        }
        return json({ success: true }, 200, cors);
      }
      return json({ error: 'Not found' }, 404, cors);
    } catch (err) { return json({ error: err.message }, 500, cors); }
  }
};

function generateOrderId() {
  const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let id = '';
  for (let i = 0; i < 8; i++) id += c[Math.floor(Math.random() * c.length)];
  return id;
}
function json(d, s, c) { return new Response(JSON.stringify(d), { status: s, headers: { 'Content-Type': 'application/json', ...c } }); }

async function createInvoice(key, orderId, price, desc, webhookUrl) {
  const r = await fetch('https://api.nowpayments.io/v1/invoice', {
    method: 'POST',
    headers: { 'x-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      price_amount: price, price_currency: 'usd',
      order_id: orderId, order_description: desc,
      ipn_callback_url: webhookUrl,
      success_url: 'https://vividartistry.net/purchase/',
      cancel_url: 'https://vividartistry.net/purchase/',
      is_fixed_rate: true, is_fee_paid_by_user: true
    })
  });
  if (!r.ok) throw new Error('NowPayments: ' + (await r.text()));
  return r.json();
}

async function sendEmail(key, from, to, subject, html) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'VIVIAN STUDIO <' + from + '>', to: [to], subject, html })
  });
  if (!r.ok) { const e = await r.text(); console.error('Resend:', e); throw new Error('Email: ' + e); }
}

function buildDownloadEmail(name, url) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f0eb;font-family:Georgia,serif;">
<div style="max-width:480px;margin:0 auto;background:#fff;border-radius:6px;padding:40px 36px;">
<p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#b8944a;margin-bottom:4px;">VIVIAN STUDIO</p>
<h1 style="font-size:22px;font-weight:400;color:#1a1a1a;margin:0 0 20px;">Your Purchase is Ready</h1>
<p style="font-size:14px;color:#555;line-height:1.7;margin-bottom:24px;">
Thank you for purchasing <strong>${name}</strong>.<br>
Click the link below to access your file.</p>
<a href="${url}" style="display:block;font-size:14px;color:#b8944a;text-decoration:underline;padding:14px 0;margin-bottom:24px;cursor:pointer;" target="_blank">Open in Google Drive &rarr;</a>
<p style="font-size:11px;color:#999;line-height:1.6;word-break:break-all;">Link: ${url}</p>
<p style="font-size:11px;color:#999;line-height:1.6;margin-top:16px;">This link expires in 7 days.<br>&copy; 2026 VIVIAN STUDIO</p>
</div></body></html>`;
}

function buildNotifyEmail(name, email, orderId) {
  return '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:Georgia,serif;background:#f5f0eb;padding:40px 20px;"><div style="max-width:480px;margin:0 auto;background:#fff;border-radius:6px;padding:40px 36px;"><h1 style="font-size:20px;font-weight:400;color:#1a1a1a;margin:0 0 20px;">NEW SALE</h1><p style="font-size:14px;color:#555;line-height:1.7;"><strong>Edition:</strong> ' + name + '<br><strong>Customer:</strong> ' + email + '<br><strong>Order:</strong> ' + orderId + '<br><strong>Time:</strong> ' + new Date().toISOString() + '</p></div></body></html>';
}
