// Cloudflare Pages Function: /functions/api/contact.js
// Turnstile + MailChannels (HTTP API) — Workers friendly

export const onRequestPost = async ({ request, env }) => {
  const startTime = Date.now();
  console.log('[CONTACT] Request received', {
    timestamp: new Date().toISOString(),
    hasEnv: {
      MAIL_TO: !!env.MAIL_TO,
      TURNSTILE_SECRET_KEY: !!env.TURNSTILE_SECRET_KEY
    }
  });

  try {
    const data = await request.json().catch(() => null);
    if (!data) {
      console.error('[CONTACT] Invalid JSON received');
      return json({ error: "Invalid JSON" }, 400);
    }

    const {
      name = "",
      email = "",
      message = "",
      company = "", // honeypot
      ["cf-turnstile-response"]: token
    } = data;

    // 1) Honeypot
    if (company) {
      console.log('[CONTACT] Honeypot triggered', { company, email });
      return json({ ok: true }, 200);
    }

    // 2) Validatie
    if (!name || !email || !message || !token) {
      console.warn('[CONTACT] Missing fields', { hasName: !!name, hasEmail: !!email, hasMessage: !!message, hasToken: !!token });
      return json({ error: "Ontbrekende velden" }, 400);
    }
    if (name.length > 120 || email.length > 254 || message.length > 5000) {
      console.warn('[CONTACT] Input too long', { nameLen: name.length, emailLen: email.length, messageLen: message.length });
      return json({ error: "Invoer te lang" }, 400);
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      console.warn('[CONTACT] Invalid email format', { email });
      return json({ error: "Ongeldig e-mailadres" }, 400);
    }

    // 3) Turnstile verificatie
    const ip = request.headers.get("CF-Connecting-IP") || "";
    const form = new URLSearchParams();
    form.append("secret", env.TURNSTILE_SECRET_KEY);
    form.append("response", token);
    form.append("remoteip", ip);

    const tsResp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form
    });
    const ts = await tsResp.json();
    console.log('[CONTACT] Turnstile verified', { success: ts.success, errors: ts['error-codes'] || [] });
    
    if (!ts.success) {
      console.error('[CONTACT] Turnstile verification failed', { errors: ts['error-codes'] || [] });
      return json({ error: "Captcha failed" }, 400);
    }

    // 4) Mail via MailChannels
    const mailTo = env.MAIL_TO || "info@avenix.nl";
    const emailSubject = `Nieuw contactformulier: ${name}`;
    
    console.log('[CONTACT] Sending email via MailChannels', {
      to: mailTo,
      from: "no-reply@avenix.nl",
      subject: emailSubject,
      replyTo: email
    });

    const mcResp = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: mailTo }] }],
        from: { email: "no-reply@avenix.nl", name: "Avenix Contact" },
        reply_to: { email, name },
        subject: emailSubject,
        content: [{ type: "text/html", value: renderHtml({ name, email, message }) }]
      })
    });

    if (!mcResp.ok) {
      const detail = await mcResp.text();
      let errorDetail = detail;
      
      try {
        const errorJson = JSON.parse(detail);
        errorDetail = JSON.stringify(errorJson, null, 2);
      } catch (e) {
        // Blijf bij text als het geen JSON is
      }
      
      console.error('[CONTACT] MailChannels API error', {
        status: mcResp.status,
        statusText: mcResp.statusText,
        headers: Object.fromEntries(mcResp.headers.entries()),
        body: errorDetail,
        responseTime: Date.now() - startTime
      });
      
      return json({ error: "Email send failed (MailChannels)", detail: errorDetail, status: mcResp.status }, 500);
    }

    console.log('[CONTACT] Email sent successfully', {
      status: mcResp.status,
      responseTime: Date.now() - startTime
    });

    return json({ ok: true }, 200);
  } catch (e) {
    console.error('[CONTACT] Server error', {
      error: String(e),
      stack: e.stack,
      responseTime: Date.now() - startTime
    });
    return json({ error: "Server error", detail: String(e) }, 500);
  }
};

// Helpers
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderHtml({ name, email, message }) {
  return `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto;line-height:1.6">
      <h2>Nieuw bericht via <strong>avenix.nl</strong></h2>
      <p><strong>Naam:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Bericht:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p style="font-size:12px;color:#666">Automatisch verzonden via Cloudflare Pages Function.</p>
    </div>
  `;
}

