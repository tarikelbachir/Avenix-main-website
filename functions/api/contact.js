// Cloudflare Pages Function: /functions/api/contact.js
// Turnstile + MailChannels (HTTP API) — Workers friendly

export const onRequestPost = async ({ request, env }) => {
  try {
    const data = await request.json().catch(() => null);
    if (!data) return json({ error: "Invalid JSON" }, 400);

    const {
      name = "",
      email = "",
      message = "",
      company = "", // honeypot
      ["cf-turnstile-response"]: token
    } = data;

    // 1) Honeypot
    if (company) return json({ ok: true }, 200);

    // 2) Validatie
    if (!name || !email || !message || !token)
      return json({ error: "Ontbrekende velden" }, 400);
    if (name.length > 120 || email.length > 254 || message.length > 5000)
      return json({ error: "Invoer te lang" }, 400);
    if (!/^\S+@\S+\.\S+$/.test(email))
      return json({ error: "Ongeldig e-mailadres" }, 400);

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
    if (!ts.success) return json({ error: "Captcha failed" }, 400);

    // 4) Mail via MailChannels
    const mcResp = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: env.MAIL_TO || "info@avenix.nl" }] }],
        from: { email: "no-reply@avenix.nl", name: "Avenix Contact" },
        reply_to: { email, name },
        subject: `Nieuw contactformulier: ${name}`,
        content: [{ type: "text/html", value: renderHtml({ name, email, message }) }]
      })
    });

    if (!mcResp.ok) {
      const detail = await mcResp.text();
      return json({ error: "Email send failed (MailChannels)", detail }, 500);
    }

    return json({ ok: true }, 200);
  } catch (e) {
    return json({ error: "Server error", detail: String(e) }, 500);
  }
};

// Helpers
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" }
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

