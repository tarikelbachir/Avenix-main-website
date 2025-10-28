// Cloudflare Pages Function: /functions/api/intake.js
// Intake form handler - Turnstile + MailChannels

export const onRequestPost = async ({ request, env }) => {
  try {
    const data = await request.json().catch(() => null);
    if (!data) return json({ error: "Invalid JSON" }, 400);

    const {
      name = "",
      email = "",
      phone = "",
      company = "",
      budget = "",
      timeline = "",
      project_description = "",
      website = "", // honeypot
      ["cf-turnstile-response"]: token
    } = data;

    // 1) Honeypot
    if (website) return json({ ok: true }, 200);

    // 2) Validatie
    if (!name || !email || !phone || !project_description || !token)
      return json({ error: "Ontbrekende verplichte velden" }, 400);
    if (name.length > 120 || email.length > 254 || project_description.length > 5000)
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
        from: { email: "no-reply@avenix.nl", name: "Avenix Intake" },
        reply_to: { email, name },
        subject: `Nieuwe intake aanvraag: ${name}${company ? ` - ${company}` : ""}`,
        content: [{ type: "text/html", value: renderHtml({ name, email, phone, company, budget, timeline, project_description }) }]
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

function renderHtml({ name, email, phone, company, budget, timeline, project_description }) {
  return `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto;line-height:1.6;max-width:600px;margin:0 auto">
      <div style="background:linear-gradient(135deg, #0B0F19 0%, #1A202E 100%);color:white;padding:30px;border-radius:10px 10px 0 0">
        <h1 style="margin:0;font-size:24px;font-weight:bold">📋 Nieuwe Intake Aanvraag</h1>
        <p style="margin:10px 0 0 0;opacity:0.9">Via avenix.nl/plan-intake</p>
      </div>
      
      <div style="background:#f9fafb;padding:30px;border-radius:0 0 10px 10px">
        <div style="background:white;padding:20px;border-radius:8px;margin-bottom:15px;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
          <p style="margin:0 0 5px 0;color:#6b7280;font-size:12px;text-transform:uppercase">Naam</p>
          <p style="margin:0;font-size:16px;font-weight:600">${escapeHtml(name)}</p>
        </div>
        
        <div style="background:white;padding:20px;border-radius:8px;margin-bottom:15px;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
          <p style="margin:0 0 5px 0;color:#6b7280;font-size:12px;text-transform:uppercase">E-mail</p>
          <p style="margin:0;font-size:16px"><a href="mailto:${escapeHtml(email)}" style="color:#FACC15;text-decoration:none">${escapeHtml(email)}</a></p>
        </div>
        
        <div style="background:white;padding:20px;border-radius:8px;margin-bottom:15px;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
          <p style="margin:0 0 5px 0;color:#6b7280;font-size:12px;text-transform:uppercase">Telefoon</p>
          <p style="margin:0;font-size:16px"><a href="tel:${escapeHtml(phone)}" style="color:#FACC15;text-decoration:none">${escapeHtml(phone)}</a></p>
        </div>
        
        ${company ? `
        <div style="background:white;padding:20px;border-radius:8px;margin-bottom:15px;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
          <p style="margin:0 0 5px 0;color:#6b7280;font-size:12px;text-transform:uppercase">Bedrijf</p>
          <p style="margin:0;font-size:16px;font-weight:600">${escapeHtml(company)}</p>
        </div>
        ` : ''}
        
        ${budget ? `
        <div style="background:white;padding:20px;border-radius:8px;margin-bottom:15px;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
          <p style="margin:0 0 5px 0;color:#6b7280;font-size:12px;text-transform:uppercase">Budget</p>
          <p style="margin:0;font-size:16px">${escapeHtml(budget)}</p>
        </div>
        ` : ''}
        
        ${timeline ? `
        <div style="background:white;padding:20px;border-radius:8px;margin-bottom:15px;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
          <p style="margin:0 0 5px 0;color:#6b7280;font-size:12px;text-transform:uppercase">Gewenste startdatum</p>
          <p style="margin:0;font-size:16px">${escapeHtml(timeline)}</p>
        </div>
        ` : ''}
        
        <div style="background:white;padding:20px;border-radius:8px;margin-bottom:15px;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
          <p style="margin:0 0 10px 0;color:#6b7280;font-size:12px;text-transform:uppercase">Project omschrijving</p>
          <div style="color:#374151;font-size:15px;line-height:1.7">${escapeHtml(project_description).replace(/\n/g, "<br/>")}</div>
        </div>
        
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:25px 0">
        <p style="text-align:center;color:#6b7280;font-size:12px;margin:0">🚀 Automatisch verzonden via Cloudflare Pages Function</p>
      </div>
    </div>
  `;
}

