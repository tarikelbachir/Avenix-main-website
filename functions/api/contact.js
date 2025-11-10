export const onRequestPost = async ({ request, env }) => {
  const startTime = Date.now();

  try {
    const data = await request.json().catch(() => null);
    if (!data) {
      return json({ error: "Invalid JSON" }, 400);
    }

    const {
      name = "",
      email = "",
      message = "",
      company = "",
      ["_form_verification"]: honeypot = "",
      ["cf-turnstile-response"]: token
    } = data;

    if (honeypot) {
      return json({ ok: true }, 200);
    }

    if (!name || !email || !message || !token) {
      return json({ error: "Ontbrekende velden" }, 400);
    }
    if (name.length > 120 || email.length > 254 || message.length > 5000) {
      return json({ error: "Invoer te lang" }, 400);
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return json({ error: "Ongeldig e-mailadres" }, 400);
    }
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
    
    if (!ts.success) {
      return json({ error: "Captcha failed" }, 400);
    }

    const mailTo = env.MAIL_TO || "info@avenix.nl";
    const emailSubject = `Nieuw contactformulier: ${name}`;

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
      }
      
      return json({ error: "Email send failed (MailChannels)", detail: errorDetail, status: mcResp.status }, 500);
    }

    return json({ ok: true }, 200);
  } catch (e) {
    return json({ error: "Server error", detail: String(e) }, 500);
  }
};
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

