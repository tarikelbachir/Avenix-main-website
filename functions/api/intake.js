export const onRequestPost = async ({ request, env }) => {
  const startTime = Date.now();

  try {
    const data = await request.json().catch(() => null);
    if (!data) {
      return json({ success: false, message: "Ongeldig JSON formaat" }, 400);
    }

    const {
      name = "",
      email = "",
      phone = "",
      company = "",
      subject = "",
      message = "",
      ["_form_verification"]: honeypot = "",
      ["cf-turnstile-response"]: token
    } = data;

    if (honeypot) {
      return json({ success: true, message: 'Bericht verzonden' }, 200);
    }

    if (!name || !email || !subject || !message) {
      return json({ success: false, message: 'Alle verplichte velden moeten worden ingevuld' }, 400);
    }
    
    // TIJDELIJK UITGESCHAKELD - Turnstile verificatie
    // TODO: Heractiveer na oplossen MailChannels probleem
    /*
    if (!token) {
      return json({ success: false, message: 'Captcha verificatie vereist' }, 400);
    }
    */
    
    if (name.length > 120 || email.length > 254 || message.length > 5000) {
      return json({ success: false, message: 'Invoer te lang' }, 400);
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return json({ success: false, message: 'Ongeldig e-mailadres' }, 400);
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
      return json({ success: false, message: 'Captcha verificatie mislukt' }, 400);
    }
    */

    // Get and validate mailTo
    let mailTo = "info@avenix.nl";
    if (env.MAIL_TO) {
      const trimmed = env.MAIL_TO.trim();
      if (trimmed && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        mailTo = trimmed;
      } else {
        console.error('Invalid MAIL_TO environment variable:', env.MAIL_TO);
      }
    }
    
    console.log('mailTo value:', mailTo, 'type:', typeof mailTo, 'length:', mailTo.length);
    
    const emailSubject = `Nieuwe intake aanvraag van ${name}`;

    // Send email via Resend
    const emailPayload = {
      from: `${name} via Avenix <info@avenix.nl>`,
      to: [mailTo],
      reply_to: email.trim(),
      subject: emailSubject,
      html: renderHtml({ name, email, phone, company, subject, message })
    };

    console.log('Resend payload to field:', JSON.stringify(emailPayload.to));

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
          success: false, 
          message: 'Er is een fout opgetreden bij het verzenden. Probeer het later opnieuw.' 
        }, 500);
      }

      const resendData = await resendResp.json();
      console.log('Email sent successfully via Resend:', resendData.id);

      return json({ 
        success: true, 
        message: 'Bericht succesvol verzonden! We nemen zo snel mogelijk contact met je op.' 
      }, 200);
    } catch (error) {
      console.error('Error sending email:', error);
      return json({ 
        success: false, 
        message: 'Er is een fout opgetreden bij het verzenden. Probeer het later opnieuw of neem direct contact op via info@avenix.nl' 
      }, 500);
    }
    
  } catch (e) {
    return json({ 
      success: false, 
      message: 'Er is een fout opgetreden bij het verzenden. Probeer het later opnieuw of neem direct contact op via info@avenix.nl' 
    }, 500);
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
