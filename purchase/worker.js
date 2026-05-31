/**
 * VIVIAN STUDIO Purchase System — Cloudflare Worker
 *
 * API:
 *  POST /api/create-order — creates NowPayments invoice
 *  POST /api/webhook     — receives NowPayments IPN, sends email via Resend
 *  GET  /api/order/:id   — check order status
 *
 * Env vars (set in Cloudflare dashboard → Worker → Settings → Variables):
 *  NOWPAYMENTS_API_KEY  — from nowpayments.io
 *  RESEND_API_KEY       — from resend.com (starts with re_)
 *  FROM_EMAIL           — verified sender in Resend (e.g. studio@vividartistry.net)
 *  PDF_BASE_URL         — base URL for PDFs (e.g. https://your-storage.example.com/PDFs)
 *  NOTIFY_EMAIL         — your email, receives sale notification (optional)
 *
 * KV Namespace binding (Worker → Settings → KV):
 *  Variable name: ORDERS
 *  KV namespace:  create one called "vivid-orders"
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors });
    }

    try {
      // ── Create order ──
      if (path === '/api/create-order' && request.method === 'POST') {
        const { email, edition } = await request.json();

        if (!email || !edition) {
          return json({ error: 'email and edition required' }, 400, cors);
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return json({ error: 'Invalid email' }, 400, cors);
        }

        const orderId = generateOrderId();
        const webhookUrl = url.origin + '/api/webhook';

        const npResult = await createNowPaymentsInvoice(
          env.NOWPAYMENTS_API_KEY, orderId, 10,
          'VIVIAN STUDIO - ' + edition, webhookUrl
        );

        const labelMap = {
          vol1: 'Lust in Monochrome', vol2: 'Gilded Shadows Vol.2', vol3: 'Gold Veins, Dark Silk',
          vol4: 'Gilded Shadows Vol.4', vol5: 'Gilded Nightfall', vol6: 'Gilded Depths Vol.6',
          vol7: 'Golden Shadows Noir', vol8: 'Gilded Shadows Volume', vol9: 'Gilded Midnight Muse',
          vol10: 'Gilded Shadows Vol.10', vol11: 'Gilded Midnight Visions', vol12: 'Gilded Midnight Reverie',
          vol13: 'Gilded Shadows of Desire', vol14: 'Gilded Shadows Vol.14', vol15: 'Gilded Shadows Vol.15',
          vol16: 'Gilded Shadows Gallery', vol17: 'Gilded Noir Seduction', vol18: 'Gilded Shadows Unveiled'
        };

        await saveOrder(env.ORDERS, orderId, {
          email,
          edition,
          edition_label: labelMap[edition] || edition,
          status: 'pending',
          payment_id: npResult.payment_id || null,
          invoice_id: npResult.id,
          created_at: new Date().toISOString()
        });

        return json({
          success: true,
          order_id: orderId,
          invoice_url: npResult.invoice_url
        }, 200, cors);
      }

      // ── Webhook: payment confirmation from NowPayments ──
      if (path === '/api/webhook' && request.method === 'POST') {
        const body = await request.json();
        const { order_id, payment_status, actually_paid } = body;

        console.log('Webhook:', JSON.stringify(body));

        const order = await getOrder(env.ORDERS, order_id);
        if (!order) {
          return json({ error: 'Order not found' }, 404, cors);
        }

        await updateOrderStatus(env.ORDERS, order_id, payment_status || 'unknown');

        if (payment_status === 'finished' && parseFloat(actually_paid || '0') >= 9.5) {
          await updateOrderStatus(env.ORDERS, order_id, 'completed');

          const downloadUrl = env.PDF_BASE_URL + '/' + order.edition + '.pdf';

          // Email customer
          const emailResult = await sendEmail(
            env.RESEND_API_KEY, env.FROM_EMAIL,
            order.email,
            'Your VIVIAN STUDIO Purchase — ' + order.edition_label,
            buildDownloadEmail(order.edition_label, downloadUrl)
          );

          // Notify you
          if (env.NOTIFY_EMAIL) {
            await sendEmail(
              env.RESEND_API_KEY, env.FROM_EMAIL,
              env.NOTIFY_EMAIL,
              'NEW SALE: ' + order.edition_label,
              buildNotifyEmail(order.edition_label, order.email, order_id)
            );
          }

          return json({ success: true, emailed: order.email }, 200, cors);
        }

        return json({ success: true }, 200, cors);
      }

      // ── Check order status ──
      if (path.startsWith('/api/order/') && request.method === 'GET') {
        const orderId = path.replace('/api/order/', '');
        const order = await getOrder(env.ORDERS, orderId);
        if (!order) {
          return json({ error: 'Not found' }, 404, cors);
        }
        return json({ order_id: orderId, status: order.status, edition: order.edition }, 200, cors);
      }

      return json({ error: 'Not found' }, 404, cors);

    } catch (err) {
      console.error('Worker error:', err);
      return json({ error: err.message }, 500, cors);
    }
  }
};

// ─── Helpers ───

function generateOrderId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function json(data, status, cors) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors }
  });
}

async function createNowPaymentsInvoice(apiKey, orderId, price, description, webhookUrl) {
  const resp = await fetch('https://api.nowpayments.io/v1/invoice', {
    method: 'POST',
    headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      price_amount: price,
      price_currency: 'usd',
      pay_currency: 'usdttrc20',
      order_id: orderId,
      order_description: description,
      ipn_callback_url: webhookUrl,
      success_url: 'https://vividartistry.net/purchase/?status=success&order=' + orderId,
      cancel_url: 'https://vividartistry.net/purchase/?status=cancelled',
      is_fixed_rate: true,
      is_fee_paid_by_user: true
    })
  });
  if (!resp.ok) throw new Error('NowPayments: ' + (await resp.text()));
  return resp.json();
}

async function sendEmail(apiKey, from, to, subject, html) {
  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'VIVIAN STUDIO <' + from + '>',
      to: [to],
      subject,
      html
    })
  });
  if (!resp.ok) console.error('Resend error:', await resp.text());
  return resp.ok;
}

// ─── KV helpers ───
async function saveOrder(kv, orderId, data) {
  if (kv) await kv.put('order:' + orderId, JSON.stringify(data), { expirationTtl: 86400 * 30 });
}
async function getOrder(kv, orderId) {
  if (!kv) return null;
  const val = await kv.get('order:' + orderId);
  return val ? JSON.parse(val) : null;
}
async function updateOrderStatus(kv, orderId, status) {
  if (!kv) return;
  const data = await getOrder(kv, orderId);
  if (data) { data.status = status; await saveOrder(kv, orderId, data); }
}

// ─── Email templates ───
function buildDownloadEmail(editionLabel, downloadUrl) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:Georgia,serif;background:#f5f0eb;padding:40px 20px;">
<div style="max-width:480px;margin:0 auto;background:#fff;border-radius:6px;padding:40px 36px;">
<p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#b8944a;margin-bottom:4px;">VIVIAN STUDIO</p>
<h1 style="font-size:22px;font-weight:400;color:#1a1a1a;margin:0 0 20px;">Your Purchase is Ready</h1>
<p style="font-size:14px;color:#555;line-height:1.7;margin-bottom:24px;">
Thank you for purchasing <strong>${editionLabel}</strong>.<br>
Click the button below to download your full edition.</p>
<a href="${downloadUrl}" style="display:inline-block;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#fff;background:#b8944a;padding:14px 32px;border-radius:3px;text-decoration:none;margin-bottom:24px;">Download PDF</a>
<p style="font-size:11px;color:#999;line-height:1.6;">This link expires in 7 days.<br>© 2026 VIVIAN STUDIO</p>
</div></body></html>`;
}

function buildNotifyEmail(editionLabel, email, orderId) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:Georgia,serif;background:#f5f0eb;padding:40px 20px;">
<div style="max-width:480px;margin:0 auto;background:#fff;border-radius:6px;padding:40px 36px;">
<h1 style="font-size:20px;font-weight:400;color:#1a1a1a;margin:0 0 20px;">NEW SALE</h1>
<p style="font-size:14px;color:#555;line-height:1.7;">
<strong>Edition:</strong> ${editionLabel}<br>
<strong>Customer:</strong> ${email}<br>
<strong>Order:</strong> ${orderId}<br>
<strong>Time:</strong> ${new Date().toISOString()}</p>
</div></body></html>`;
}
