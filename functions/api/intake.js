// Cloudflare Pages Function: /functions/api/intake.js
// Intake form handler - Turnstile + MailChannels

export const onRequestPost = async ({ request, env }) => {
  const startTime = Date.now();
  console.log('[INTAKE] Request received', {
    timestamp: new Date().toISOString(),
    hasEnv: {
      MAIL_TO: !!env.MAIL_TO,
      MAIL_FROM: !!env.MAIL_FROM,
      TURNSTILE_SECRET_KEY: !!env.TURNSTILE_SECRET_KEY
    }
  });

  try {
    // Parse JSON data
    const data = await request.json().catch(() => null);
    if (!data) {
      console.error('[INTAKE] Invalid JSON received');
      return json({ success: false, message: "Ongeldig JSON formaat" }, 400);
    }

    const {
      name = "",
      email = "",
      phone = "",
      company = "",
      subject = "",
      message = "",
      ["_form_verification"]: honeypot = "", // honeypot
      ["cf-turnstile-response"]: token
    } = data;

    // 1) Honeypot check
    if (honeypot) {
      console.log('[INTAKE] Honeypot triggered', { honeypot, email });
      return json({ success: true, message: 'Bericht verzonden' }, 200);
    }

    // 2) Validatie
    if (!name || !email || !subject || !message) {
      console.warn('[INTAKE] Missing required fields', { hasName: !!name, hasEmail: !!email, hasSubject: !!subject, hasMessage: !!message });
      return json({ success: false, message: 'Alle verplichte velden moeten worden ingevuld' }, 400);
    }
    
    if (!token) {
      console.warn('[INTAKE] Missing Turnstile token');
      return json({ success: false, message: 'Captcha verificatie vereist' }, 400);
    }
    
    if (name.length > 120 || email.length > 254 || message.length > 5000) {
      console.warn('[INTAKE] Input too long', { nameLen: name.length, emailLen: email.length, messageLen: message.length });
      return json({ success: false, message: 'Invoer te lang' }, 400);
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      console.warn('[INTAKE] Invalid email format', { email });
      return json({ success: false, message: 'Ongeldig e-mailadres' }, 400);
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
    console.log('[INTAKE] Turnstile verified', { success: ts.success, errors: ts['error-codes'] || [] });
    
    if (!ts.success) {
      console.error('[INTAKE] Turnstile verification failed', { errors: ts['error-codes'] || [] });
      return json({ success: false, message: 'Captcha verificatie mislukt' }, 400);
    }

    // 4) Send email via MailChannels
    const mailTo = env.MAIL_TO || "info@avenix.nl";
    const fromEmail = parseFrom(env.MAIL_FROM) || ("no-reply@" + getDomainFromTo(mailTo));
    const emailSubject = `📅 Nieuwe Intake Aanvraag: ${subject || 'Geen onderwerp'}`;
    
    console.log('[INTAKE] Sending email via MailChannels', {
      to: mailTo,
      from: fromEmail,
      subject: emailSubject,
      replyTo: email
    });

    const mcResp = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: mailTo }] }],
        from: { email: fromEmail, name: parseName(env.MAIL_FROM) || "Avenix" },
        reply_to: { email, name },
        subject: emailSubject,
        content: [{ type: "text/html", value: renderHtml({ name, email, phone, company, subject, message }) }]
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
      
      console.error('[INTAKE] MailChannels API error', {
        status: mcResp.status,
        statusText: mcResp.statusText,
        headers: Object.fromEntries(mcResp.headers.entries()),
        body: errorDetail,
        responseTime: Date.now() - startTime
      });
      
      return json({ success: false, message: 'Er is een fout opgetreden bij het verzenden. Probeer het later opnieuw.' }, 500);
    }

    console.log('[INTAKE] Email sent successfully', {
      status: mcResp.status,
      responseTime: Date.now() - startTime
    });
    
    return json({ 
      success: true, 
      message: 'Bericht succesvol verzonden! We nemen zo snel mogelijk contact met je op.' 
    }, 200);
    
  } catch (e) {
    console.error('[INTAKE] Server error', {
      error: String(e),
      stack: e.stack,
      responseTime: Date.now() - startTime
    });
    return json({ 
      success: false, 
      message: 'Er is een fout opgetreden bij het verzenden. Probeer het later opnieuw of neem direct contact op via info@avenix.nl' 
    }, 500);
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

function renderHtml({ name, email, phone, company, subject, message }) {
  const phoneDisplay = phone || 'Niet opgegeven';
  const companyDisplay = company || 'Niet opgegeven';
  
  return `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;">
      <div style="background:linear-gradient(135deg, #0c1221 0%, #1f2937 100%);padding:30px;border-radius:10px 10px 0 0;">
        <h2 style="color:#FFCC03;margin:0;font-size:24px;">📅 Nieuwe Intake Aanvraag</h2>
      </div>
      
      <div style="background:#ffffff;padding:30px;border:1px solid #e5e7eb;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:12px;background:#f9fafb;font-weight:bold;width:150px;border-bottom:1px solid #e5e7eb;">Naam:</td>
            <td style="padding:12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding:12px;background:#f9fafb;font-weight:bold;border-bottom:1px solid #e5e7eb;">E-mail:</td>
            <td style="padding:12px;border-bottom:1px solid #e5e7eb;"><a href="mailto:${escapeHtml(email)}" style="color:#FFCC03;text-decoration:none;">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding:12px;background:#f9fafb;font-weight:bold;border-bottom:1px solid #e5e7eb;">Telefoon:</td>
            <td style="padding:12px;border-bottom:1px solid #e5e7eb;">${phone ? '<a href="tel:' + escapeHtml(phone) + '" style="color:#FFCC03;text-decoration:none;">' + escapeHtml(phone) + '</a>' : escapeHtml(phoneDisplay)}</td>
          </tr>
          <tr>
            <td style="padding:12px;background:#f9fafb;font-weight:bold;border-bottom:1px solid #e5e7eb;">Bedrijf:</td>
            <td style="padding:12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(companyDisplay)}</td>
          </tr>
          ${subject ? `
          <tr>
            <td style="padding:12px;background:#f9fafb;font-weight:bold;border-bottom:1px solid #e5e7eb;">Onderwerp:</td>
            <td style="padding:12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(subject)}</td>
          </tr>
          ` : ''}
        </table>
        
        <div style="margin-top:25px;padding:20px;background:#f9fafb;border-left:4px solid #FFCC03;border-radius:4px;">
          <p style="margin:0 0 10px 0;font-weight:bold;color:#374151;">Bericht:</p>
          <p style="margin:0;line-height:1.6;color:#6b7280;">${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        </div>
      </div>
      
      <div style="background:#f9fafb;padding:20px;border-radius:0 0 10px 10px;border:1px solid #e5e7eb;border-top:none;">
        <p style="margin:0;color:#6b7280;font-size:12px;text-align:center;">
          Verzonden vanaf Avenix.nl op ${new Date().toLocaleString('nl-NL', { dateStyle: 'full', timeStyle: 'short' })}
        </p>
      </div>
    </div>
  `;
}

function parseFrom(from) {
  if (!from) return "";
  const m = /<([^>]+)>/.exec(from);
  return m ? m[1] : from;
}

function parseName(from) {
  if (!from) return "";
  const m = /^([^<]+)</.exec(from);
  return m ? m[1].trim() : "";
}

function getDomainFromTo(to) {
  const m = /@(.+)$/.exec(to || "");
  return m ? m[1] : "example.com";
}
