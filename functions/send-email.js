// functions/send-email.js
// Cloudflare Pages Function voor email verzending via Resend

export async function onRequestPost(context) {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight requests
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse form data
    const formData = await context.request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone') || 'Niet opgegeven';
    const company = formData.get('company') || 'Niet opgegeven';
    const message = formData.get('message');
    const formType = formData.get('form_type') || 'contact';
    
    // Honeypot check (spam protection)
    const honeypot = formData.get('website');
    if (honeypot) {
      return new Response(JSON.stringify({ error: 'Spam detected' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ 
        error: 'Alle verplichte velden moeten worden ingevuld' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        error: 'Ongeldig e-mailadres' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Sanitize input (basic XSS protection)
    const sanitize = (str) => str.replace(/[<>]/g, '');
    const safeName = sanitize(name);
    const safeCompany = sanitize(company);
    const safeMessage = sanitize(message);

    // Send email via Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Website <website@avenix.nl>',  // Jouw geverifieerde domein
        to: ['info@avenix.nl'],
        reply_to: email,
        subject: `${formType === 'intake' ? '📅 Nieuwe Intake Aanvraag' : '📧 Nieuw Contactbericht'} van ${safeName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #0c1221 0%, #1f2937 100%); padding: 30px; border-radius: 10px 10px 0 0;">
              <h2 style="color: #FFCC03; margin: 0; font-size: 24px;">
                Nieuw bericht van Avenix.nl
              </h2>
            </div>
            
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px; background: #f9fafb; font-weight: bold; width: 150px; border-bottom: 1px solid #e5e7eb;">
                    Formulier type:
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
                    ${formType === 'intake' ? '📅 Intake Aanvraag' : '📧 Contact'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background: #f9fafb; font-weight: bold; border-bottom: 1px solid #e5e7eb;">
                    Naam:
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
                    ${safeName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background: #f9fafb; font-weight: bold; border-bottom: 1px solid #e5e7eb;">
                    E-mail:
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
                    <a href="mailto:${email}" style="color: #FFCC03; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background: #f9fafb; font-weight: bold; border-bottom: 1px solid #e5e7eb;">
                    Telefoon:
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
                    <a href="tel:${phone}" style="color: #FFCC03; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                ${formType === 'intake' ? `
                <tr>
                  <td style="padding: 12px; background: #f9fafb; font-weight: bold; border-bottom: 1px solid #e5e7eb;">
                    Bedrijf:
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
                    ${safeCompany}
                  </td>
                </tr>
                ` : ''}
              </table>
              
              <div style="margin-top: 25px; padding: 20px; background: #f9fafb; border-left: 4px solid #FFCC03; border-radius: 4px;">
                <p style="margin: 0 0 10px 0; font-weight: bold; color: #374151;">Bericht:</p>
                <p style="margin: 0; line-height: 1.6; color: #6b7280;">
                  ${safeMessage.replace(/\n/g, '<br>')}
                </p>
              </div>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
              <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                Verzonden vanaf Avenix.nl op ${new Date().toLocaleString('nl-NL', { 
                  dateStyle: 'full', 
                  timeStyle: 'short' 
                })}
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const error = await resendResponse.text();
      console.error('Resend API error:', error);
      throw new Error('Email service error');
    }

    const result = await resendResponse.json();

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Bericht succesvol verzonden! We nemen zo snel mogelijk contact met je op.' 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in send-email function:', error);
    return new Response(JSON.stringify({ 
      error: 'Er is een fout opgetreden bij het verzenden. Probeer het later opnieuw of neem direct contact op via info@avenix.nl' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

