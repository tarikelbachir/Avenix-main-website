// Cloudflare Pages Function: /functions/api/intake.js
// Intake form submission handler (FormData support)

export const onRequestPost = async ({ request, env }) => {
  try {
    // Parse FormData
    const formData = await request.formData();
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const phone = formData.get('phone') || 'Niet opgegeven';
    const company = formData.get('company') || 'Niet opgegeven';
    const subject = formData.get('subject') || '';
    const message = formData.get('message') || '';
    const website = formData.get('website'); // honeypot
    
    // Honeypot check
    if (website) {
      return json({ success: true, message: 'Bericht verzonden' }, 200);
    }
    
    // Validation
    if (!name || !email || !message) {
      return json({ success: false, message: 'Alle verplichte velden moeten worden ingevuld' }, 400);
    }
    
    if (name.length > 120 || email.length > 254 || message.length > 5000) {
      return json({ success: false, message: 'Invoer te lang' }, 400);
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return json({ success: false, message: 'Ongeldig e-mailadres' }, 400);
    }
    
    // Send email via MailChannels
    const fromEmail = parseFrom(env.MAIL_FROM) || ("no-reply@" + getDomainFromTo(env.MAIL_TO));
    const mcResp = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: env.MAIL_TO || "info@avenix.nl" }] }],
        from: { email: fromEmail, name: parseName(env.MAIL_FROM) || "Avenix" },
        reply_to: { email, name },
        subject: `📅 Nieuwe Intake Aanvraag: ${subject || 'Geen onderwerp'}`,
        content: [{ type: "text/html", value: renderHtml({ name, email, phone, company, subject, message }) }]
      })
    });
    
    if (!mcResp.ok) {
      const detail = await mcResp.text();
      return json({ success: false, message: 'Er is een fout opgetreden bij het verzenden. Probeer het later opnieuw.' }, 500);
    }
    
    return json({ 
      success: true, 
      message: 'Bericht succesvol verzonden! We nemen zo snel mogelijk contact met je op.' 
    }, 200);
    
  } catch (e) {
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
            <td style="padding:12px;border-bottom:1px solid #e5e7eb;"><a href="tel:${escapeHtml(phone)}" style="color:#FFCC03;text-decoration:none;">${escapeHtml(phone)}</a></td>
          </tr>
          <tr>
            <td style="padding:12px;background:#f9fafb;font-weight:bold;border-bottom:1px solid #e5e7eb;">Bedrijf:</td>
            <td style="padding:12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(company)}</td>
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

