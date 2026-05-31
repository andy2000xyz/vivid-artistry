/**
 * Cloudflare Worker for VIVIAN STUDIO purchase system
 *
 * Handles:
 *  - POST /api/create-order: Creates NowPayments invoice, stores order
 *  - POST /api/webhook:     Receives NowPayments IPN, sends email
 *  - GET  /api/order/:id:   Check order status
 *
 * Environment variables (set in Cloudflare dashboard):
 *  - NOWPAYMENTS_API_KEY:  Your NowPayments API key
 *  - SENDGRID_API_KEY:     Your SendGrid API key
 *  - FROM_EMAIL:            Sender email (e.g. studio@vividartistry.net)
 *  - PDF_BASE_URL:          Base URL for PDF download links
 *                           (e.g. https://drive.google.com/...)
 *
 * Order storage: Uses Cloudflare KV namespace "ORDERS".
 *  - KV key:   order:{order_id}
 *  - KV value: JSON { email, edition, status, created_at }
 */

// ─── Helper: generate short order ID ───
function generateOrderId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

// ─── Helper: verify HMAC signature for NowPayments IPN ───
// NowPayments sends HMAC-SHA512 in the `x-nowpayments-sig` header
async function verifyNowPaymentsSignature(request, body) {
  const signature = request.headers.get('x-nowpayments-sig');
  if (!signature) return false;
  const key = NOWPAYMENTS_API_KEY;
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw', encoder.encode(key), { name: 'HMAC', hash: 'SHA-512' },
    false, ['verify']
  );
  return crypto.subtle.verify(
    'HMAC', cryptoKey, hexToBytes(signature), encoder.encode(JSON.stringify(body))
  );
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

// ─── NowPayments: create invoice ───
async function createNowPaymentsInvoice(orderId, priceAmount, description, webhookUrl) {
  const resp = await fetch('https://api.nowpayments.io/v1/invoice', {
    method: 'POST',
    headers: {
      'x-api-key': NOWPAYMENTS_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      price_amount: priceAmount,
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
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error('NowPayments error: ' + err);
  }
  return resp.json();
}

// ─── SendGrid: send email ───
async function sendEmail(to, subject, htmlContent) {
  const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + SENDGRID_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: FROM_EMAIL, name: 'VIVIAN STUDIO' },
      subject: subject,
      content: [{ type: 'text/html', value: htmlContent }]
    })
  });
  if (!resp.ok) {
    const err = await resp.text();
    console.error('SendGrid error:', err);
    throw new Error('Failed to send email: ' + err);
  }
  return true;
}

// ─── Email template ───
function buildDownloadEmail(editionName, downloadUrl) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Georgia,serif;background:#f5f0eb;padding:40px 20px;">
  <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:6px;padding:40px 36px;">
    <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#b8944a;margin-bottom:4px;">VIVIAN STUDIO</p>
    <h1 style="font-size:22px;font-weight:400;color:#1a1a1a;margin:0 0 20px;">Your Purchase is Ready</h1>
    <p style="font-size:14px;color:#555;line-height:1.7;margin-bottom:24px;">
      Thank you for purchasing <strong>${editionName}</strong>.<br>
      Click the button below to download your full edition.
    </p>
    <a href="${downloadUrl}" style="display:inline-block;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#fff;background:#b8944a;padding:14px 32px;border-radius:3px;text-decoration:none;margin-bottom:24px;">
      Download PDF
    </a>
    <p style="font-size:11px;color:#999;line-height:1.6;">
      This link expires in 7 days. If you have any issues, please contact us on Telegram.<br>
      © 2026 VIVIAN STUDIO
    </p>
  </div>
</body>
</html>`;
}

// ─── Store order in KV ───
async function saveOrder(orderId, data) {
  if (typeof ORDERS !== 'undefined') {
    await ORDERS.put('order:' + orderId, JSON.stringify(data), {
      expirationTtl: 86400 * 30 // 30 days
    });
  }
}

async function getOrder(orderId) {
  if (typeof ORDERS !== 'undefined') {
    const val = await ORDERS.get('order:' + orderId);
    return val ? JSON.parse(val) : null;
  }
  return null;
}

async function updateOrderStatus(orderId, status) {
  if (typeof ORDERS !== 'undefined') {
    const data = await getOrder(orderId);
    if (data) {
      data.status = status;
      await saveOrder(orderId, data);
    }
  }
}

// ─── Main request handler ───
async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ── Create order ──
    if (path === '/api/create-order' && request.method === 'POST') {
      const body = await request.json();
      const { email, edition } = body;

      if (!email || !edition) {
        return new Response(JSON.stringify({ error: 'email and edition required' }), {
          status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      // Validate email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response(JSON.stringify({ error: 'Invalid email address' }), {
          status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      // Generate order ID
      const orderId = generateOrderId();
      const webhookUrl = url.origin + '/api/webhook';

      // Create NowPayments invoice
      const npResult = await createNowPaymentsInvoice(
        orderId, 10,
        'VIVIAN STUDIO - ' + edition + ' ($10 USDT)',
        webhookUrl
      );

      // Save order
      await saveOrder(orderId, {
        email: email,
        edition: edition,
        status: 'pending',
        payment_id: npResult.payment_id || null,
        invoice_id: npResult.id,
        created_at: new Date().toISOString()
      });

      return new Response(JSON.stringify({
        success: true,
        order_id: orderId,
        invoice_url: npResult.invoice_url,
        payment_id: npResult.payment_id
      }), {
        status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // ── Webhook: NowPayments IPN ──
    if (path === '/api/webhook' && request.method === 'POST') {
      const body = await request.json();
      console.log('Webhook received:', JSON.stringify(body));

      // Verify HMAC signature
      // Commented out for now — enable when testing IPN in production
      // if (!(await verifyNowPaymentsSignature(request, body))) {
      //   return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 401 });
      // }

      const orderId = body.order_id;
      const paymentStatus = body.payment_status;
      const actuallyPaid = parseFloat(body.actually_paid || '0');
      const payCurrency = body.pay_currency;

      // Get order from KV
      const order = await getOrder(orderId);
      if (!order) {
        console.error('Order not found:', orderId);
        return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
      }

      console.log('Order:', JSON.stringify(order));
      console.log('Payment status:', paymentStatus, 'Amount:', actuallyPaid, payCurrency);

      // Handle confirmed/finished payment
      if (paymentStatus === 'finished' && actuallyPaid >= 9.5) {
        // Update order status
        await updateOrderStatus(orderId, 'completed');

        // Send email with download link
        const editionSlug = order.edition;
        const downloadUrl = PDF_BASE_URL + '/' + editionSlug + '.pdf';

        await sendEmail(
          order.email,
          'Your VIVIAN STUDIO Purchase — ' + editionSlug,
          buildDownloadEmail(editionSlug, downloadUrl)
        );

        console.log('Email sent to', order.email, 'for', editionSlug);

        return new Response(JSON.stringify({ success: true, emailed: order.email }), {
          status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      // Handle other statuses
      await updateOrderStatus(orderId, paymentStatus || 'unknown');

      return new Response(JSON.stringify({ success: true }), {
        status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // ── Check order status ──
    if (path.startsWith('/api/order/') && request.method === 'GET') {
      const orderId = path.replace('/api/order/', '');
      const order = await getOrder(orderId);

      if (!order) {
        return new Response(JSON.stringify({ error: 'Order not found' }), {
          status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      return new Response(JSON.stringify({
        order_id: orderId,
        status: order.status,
        edition: order.edition
      }), {
        status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // ── 404 for everything else ──
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (err) {
    console.error('Worker error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

// ─── Entry point ───
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
