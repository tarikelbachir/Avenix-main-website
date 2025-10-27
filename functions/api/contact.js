/**
 * Cloudflare Pages Function - Contact Form Handler
 * 
 * POST /api/contact
 * 
 * Features:
 * - Cloudflare Turnstile verification
 * - Honeypot spam protection
 * - Email via Nodemailer (SMTP)
 * - Input validation
 */

import nodemailer from "nodemailer";

export const onRequestPost = async ({ request, env }) => {
  try {
    const data = await request.json();
    const {
      name = "",
      email = "",
      message = "",
      phone = "",
      company = "",
      _subject = "",
      website = "", // honeypot (alternative name)
      ["cf-turnstile-response"]: token
    } = data || {};

    // Honeypot check - if filled, silently accept (bot trap)
    if (website || (company && company.length > 0 && !phone)) {
      return json({ ok: true }, 200);
    }

    // Basic validation
    if (!name || !email || !message || !token) {
      return json({ error: "Alle verplichte velden moeten ingevuld zijn" }, 400);
    }

    // Length checks
    if (name.length > 120) {
      return json({ error: "Naam is te lang (max 120 tekens)" }, 400);
    }
    if (email.length > 254) {
      return json({ error: "E-mailadres is te lang" }, 400);
    }
    if (message.length > 5000) {
      return json({ error: "Bericht is te lang (max 5000 tekens)" }, 400);
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return json({ error: "Ongeldig e-mailadres" }, 400);
    }

    // Cloudflare Turnstile verification
    const ip = request.headers.get("CF-Connecting-IP") || "";
    const turnstileForm = new URLSearchParams();
    turnstileForm.append("secret", env.TURNSTILE_SECRET_KEY);
    turnstileForm.append("response", token);
    turnstileForm.append("remoteip", ip);

    const turnstileResp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: turnstileForm
    });

    const turnstileResult = await turnstileResp.json();
    
    if (!turnstileResult.success) {
      console.error("Turnstile verification failed:", turnstileResult);
      return json({ error: "Beveiligingsverificatie mislukt. Probeer opnieuw." }, 400);
    }

    // Send email via Nodemailer (SMTP)
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: false,
      auth: {
        user: env.SMTP_USERNAME,
        pass: env.SMTP_PASSWORD
      }
    });

    const mailOptions = {
      from: env.MAIL_FROM || "Avenix <no-reply@avenix.nl>",
      to: env.MAIL_TO || "info@avenix.nl",
      replyTo: email,
      subject: _subject || `Nieuw contactformulier: ${name}`,
      html: renderHtml({ name, email, message, phone, company: company || "Niet opgegeven", subject: _subject })
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);
    } catch (emailError) {
      console.error("SMTP error:", emailError);
      return json({ 
        error: "Er ging iets mis bij het verzenden. Probeer het opnieuw of bel ons op +31 6 8100 1053",
        detail: String(emailError)
      }, 500);
    }

    return json({ ok: true, message: "Bericht verzonden!" }, 200);

  } catch (e) {
    console.error("Server error:", e);
    return json({ 
      error: "Server fout. Probeer het later opnieuw of bel ons op +31 6 8100 1053",
      detail: String(e) 
    }, 500);
  }
};

/**
 * Helper function to return JSON responses
 */
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Render HTML email template
 */
function renderHtml({ name, email, message, phone, company, subject }) {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nieuw contactformulier</title>
</head>
<body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <div style="background: linear-gradient(135deg, #0B0F19 0%, #1A202E 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0; font-size: 24px; font-weight: bold;">📧 Nieuw contactformulier</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Via avenix.nl</p>
  </div>

  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
    
    ${subject ? `
    <div style="background: #FACC15; color: #0B0F19; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
      <strong style="font-size: 16px;">📋 ${escapeHtml(subject)}</strong>
    </div>
    ` : ''}

    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Naam</p>
      <p style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">${escapeHtml(name)}</p>
    </div>

    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">E-mail</p>
      <p style="margin: 0; font-size: 16px; font-weight: 600;">
        <a href="mailto:${escapeHtml(email)}" style="color: #FACC15; text-decoration: none;">${escapeHtml(email)}</a>
      </p>
    </div>

    ${phone ? `
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Telefoon</p>
      <p style="margin: 0; font-size: 16px; font-weight: 600;">
        <a href="tel:${escapeHtml(phone)}" style="color: #FACC15; text-decoration: none;">${escapeHtml(phone)}</a>
      </p>
    </div>
    ` : ''}

    ${company && company !== "Niet opgegeven" ? `
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Bedrijf</p>
      <p style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">${escapeHtml(company)}</p>
    </div>
    ` : ''}

    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Bericht</p>
      <div style="color: #374151; font-size: 15px; line-height: 1.7;">
        ${escapeHtml(message).replace(/\n/g, "<br/>")}
      </div>
    </div>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
    
    <div style="text-align: center; color: #6b7280; font-size: 12px;">
      <p style="margin: 0;">🚀 Automatisch verzonden via Cloudflare Pages Function</p>
      <p style="margin: 5px 0 0 0;">Avenix Software - ${new Date().toLocaleDateString('nl-NL', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}</p>
    </div>

  </div>

</body>
</html>
  `.trim();
}

