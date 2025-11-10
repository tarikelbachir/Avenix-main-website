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

    if (!name || !email || !message) {
      return json({ error: "Ontbrekende velden" }, 400);
    }
    if (name.length > 120 || email.length > 254 || message.length > 5000) {
      return json({ error: "Invoer te lang" }, 400);
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return json({ error: "Ongeldig e-mailadres" }, 400);
    }
    
    // TIJDELIJK UITGESCHAKELD - Turnstile verificatie
    // TODO: Heractiveer na oplossen MailChannels probleem
    /*
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
    */

    const mailTo = (env.MAIL_TO && env.MAIL_TO.trim() ? env.MAIL_TO.trim() : "info@avenix.nl");
    const emailSubject = `Nieuw contactformulier bericht van ${name}`;

    // Send email via Resend
    const emailPayload = {
      from: 'Avenix <info@avenix.nl>',
      to: [mailTo],
      reply_to: email.trim(),
      subject: emailSubject,
      html: renderHtml({ name, email, message, company })
    };

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mailTo)) {
      console.error('Invalid email format for mailTo:', mailTo);
      return json({ 
        error: 'Ongeldig e-mailadres geconfigureerd',
        detail: `Het geconfigureerde e-mailadres "${mailTo}" heeft een ongeldig formaat.`
      }, 500);
    }

    console.log('Sending email via Resend:', {
      to: emailPayload.to,
      from: emailPayload.from,
      subject: emailPayload.subject
    });

    try {
      const resendResp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      });

      if (!resendResp.ok) {
        const errorText = await resendResp.text();
        console.error('Resend API error:', {
          status: resendResp.status,
          statusText: resendResp.statusText,
          detail: errorText
        });
        return json({ 
          error: 'E-mail verzenden mislukt',
          detail: errorText 
        }, 500);
      }

      const resendData = await resendResp.json();
      console.log('Email sent successfully via Resend:', resendData.id);

      return json({ ok: true }, 200);
    } catch (error) {
      console.error('Error sending email:', error);
      return json({ 
        error: 'Er ging iets mis bij het verzenden',
        detail: error.message 
      }, 500);
    }
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

function renderHtml({ name, email, message, company = "" }) {
  return `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto;line-height:1.6">
      <h2>Nieuw bericht via <strong>avenix.nl</strong></h2>
      <p><strong>Naam:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      ${company ? `<p><strong>Bedrijf:</strong> ${escapeHtml(company)}</p>` : ""}
      <p><strong>Bericht:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p style="font-size:12px;color:#666">Automatisch verzonden via Cloudflare Pages Function.</p>
    </div>
  `;
}

