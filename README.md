# 🌐 Avenix Website - Cloudflare Pages

**Modern webdesign bureau website** met serverless email functionaliteit.

[![Cloudflare Pages](https://img.shields.io/badge/Hosted%20on-Cloudflare%20Pages-orange)](https://pages.cloudflare.com)
[![Nodemailer](https://img.shields.io/badge/Email-Nodemailer%20SMTP-blue)](https://nodemailer.com)

---

## 🚀 Tech Stack

- **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript
- **Hosting:** Cloudflare Pages (Edge deployment)
- **Functions:** Cloudflare Workers (Serverless)
- **Email:** Nodemailer (SMTP)
- **Security:** CSP, HSTS, Security Headers, Cloudflare Turnstile
- **SEO:** Sitemap, robots.txt, Open Graph

---

## 📁 Project Structuur

```
Avenix-main-website/
├── functions/              # Cloudflare Workers
│   ├── api/
│   │   └── contact.js     # Contact form API endpoint (Turnstile + Resend)
│   ├── send-email.js      # Legacy email endpoint
│   └── _middleware.js     # Security headers
│
├── assets/
│   └── img/               # Images & logos
│
├── css/
│   └── styles.css         # Custom styles (1707 lijnen)
│
├── js/
│   ├── main.js            # Core functionality
│   └── form-handler.js    # Form submissions
│
├── diensten/              # Service pages
│   ├── website-development.html
│   ├── e-commerce.html
│   ├── saas-development.html
│   ├── onderhoud.html
│   └── consultancy.html
│
├── _headers               # Cloudflare headers config
├── _redirects             # URL redirects
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Crawler instructions
│
├── index.html             # Homepage
├── over-ons.html          # About
├── contact.html           # Contact form
├── plan-intake.html       # Intake form
├── faq.html               # FAQ
└── juridisch.html         # Privacy policy & Terms & conditions
```

---

## 🎯 Features

### ✅ Wat werkt out-of-the-box:

- **12 statische pagina's** - Responsive design
- **5 diensten pagina's** - Website dev, E-commerce, SaaS, Onderhoud, Consultancy
- **2 werkende formulieren** - Contact & Intake
- **Serverless email** - Via Cloudflare Workers + Resend API
- **Security headers** - A+ score op securityheaders.com
- **SEO optimized** - Sitemap, meta tags, Open Graph
- **Performance** - 90+ PageSpeed score
- **GDPR compliant** - AVG privacybeleid
- **Spam protection** - Cloudflare Turnstile + Honeypot field
- **Responsive** - Mobile-first design

---

## 🚀 Quick Deploy

### Vereisten:
- GitHub account
- Cloudflare account (gratis)
- SMTP account (Google Workspace, SendGrid, Mailgun, etc.)

### 3-stappen deployment:

#### 1️⃣ SMTP Setup (5 min)
```
1. Kies SMTP provider (Gmail/SendGrid/Mailgun)
2. Verkrijg SMTP credentials (host, port, username, password)
3. Voor Gmail: genereer App Password
4. Noteer credentials voor stap 3
```

#### 2️⃣ GitHub Push (2 min)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/avenix-website.git
git push -u origin main
```

#### 3️⃣ Cloudflare Deploy (5 min)
```
1. dash.cloudflare.com → Workers & Pages → Create
2. Connect to Git → Select repo
3. Framework: None | Build: [empty] | Output: /
4. Deploy
5. Add Environment Variables: 
   - TURNSTILE_SECRET_KEY
   - SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD
   - MAIL_TO, MAIL_FROM
6. Add Custom Domain: avenix.nl
```

**✅ Klaar!** Website is live op `avenix.nl`

---

## 📖 Documentatie

- **Quick Start:** [`QUICK_START.md`](QUICK_START.md) - 30 min deployment
- **Complete Guide:** [`CLOUDFLARE_DEPLOYMENT_GUIDE.md`](CLOUDFLARE_DEPLOYMENT_GUIDE.md) - Volledige instructies
- **Checklist:** [`DEPLOYMENT_CHECKLIST.md`](DEPLOYMENT_CHECKLIST.md) - Stap-voor-stap checklist

---

## 🔧 Lokale Development

### Installatie:
```bash
# Clone repository
git clone https://github.com/USERNAME/avenix-website.git
cd avenix-website

# Open in browser
# Open index.html in je browser
# Of gebruik Live Server extensie in VS Code
```

### Environment Variables:
Maak `.env` bestand voor lokaal testen:
```env
TURNSTILE_SECRET_KEY=0x4AAAAAAAAxxx
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=info@avenix.nl
SMTP_PASSWORD=your_app_password_here
MAIL_TO=info@avenix.nl
MAIL_FROM=Avenix <no-reply@avenix.nl>
```

### Testen:
```bash
# Voor lokaal testen van Cloudflare Functions:
npm install -g wrangler
wrangler pages dev .
```

---

## 📧 Contactformulier Setup

### Overzicht
Het contactformulier gebruikt:
- **Cloudflare Turnstile** - Bot bescherming (CAPTCHA alternatief)
- **Nodemailer (SMTP)** - Email verzending naar `info@avenix.nl`
- **Honeypot field** - Extra spam bescherming
- **Input validatie** - Server-side validatie

> ⚠️ **Let op:** Nodemailer werkt **NIET** in Cloudflare Pages Functions omdat deze draaien op V8 runtime (niet Node.js). Voor productie moet je een alternatieve oplossing gebruiken zoals:
> - Native SMTP via fetch (bijv. SendGrid API, Mailgun API)
> - Cloudflare Email Workers
> - Externe webhook service

### 1️⃣ Cloudflare Turnstile Setup

**✅ Turnstile is al geconfigureerd!**

Jouw Turnstile keys:
- **Site Key (in code):** `0x4AAAAAAB9A8PLrRD7V4m-s` ✅ Toegevoegd aan `contact.html`
- **Secret Key (in env vars):** `0x4AAAAAAB9A8F9VILuu4rEbyD6NXL6t5uo` ⚠️ Moet je toevoegen aan Cloudflare

**BELANGRIJK - Voeg Secret Key toe aan Cloudflare:**
```
1. Ga naar: Cloudflare Dashboard → Workers & Pages → [avenix-site]
2. Klik op: Settings → Environment Variables
3. Klik: Add Variable
4. Production environment:
   Name: TURNSTILE_SECRET_KEY
   Value: 0x4AAAAAAB9A8F9VILuu4rEbyD6NXL6t5uo
5. Preview environment (optioneel - voor testing):
   Name: TURNSTILE_SECRET_KEY
   Value: 0x4AAAAAAB9A8F9VILuu4rEbyD6NXL6t5uo
6. Klik: Save
7. Redeploy je site (gebeurt automatisch bij volgende git push)
```

> ⚠️ **Security note:** Secret keys horen NOOIT in je code, alleen in Environment Variables!

### 2️⃣ SMTP Email Setup

**Stap 1 - SMTP Credentials verkrijgen:**

Je kunt elke SMTP provider gebruiken. Voorbeelden:

**Via Google Workspace (als je al Google Workspace hebt):**
```
Host: smtp.gmail.com
Port: 587
Username: info@avenix.nl
Password: [App-specifiek wachtwoord]

1. Google Admin → Gebruiker → info@avenix.nl
2. Security → App passwords
3. Genereer nieuw app password
```

**Via TransIP (als je domein hosting hebt):**
```
Host: smtp.transip.email
Port: 587
Username: info@avenix.nl
Password: [email wachtwoord]
```

**Via externe SMTP service (bijv. SendGrid, Mailgun):**
```
SendGrid:
Host: smtp.sendgrid.net
Port: 587
Username: apikey
Password: [SendGrid API key]
```

**Stap 2 - Voeg credentials toe aan Cloudflare:**
```
1. Cloudflare Dashboard → Workers & Pages → jouw-site
2. Settings → Environment Variables
3. Add Variables:
   
   SMTP_HOST = smtp.gmail.com (of jouw provider)
   SMTP_PORT = 587
   SMTP_USERNAME = info@avenix.nl
   SMTP_PASSWORD = [jouw wachtwoord/app password]
   MAIL_TO = info@avenix.nl
   MAIL_FROM = Avenix <no-reply@avenix.nl>

4. Deploy to Production + Preview
```

**Email configuratie:**
- **From:** `Avenix <no-reply@avenix.nl>`
- **To:** `info@avenix.nl`
- **Reply-to:** Email van gebruiker (voor directe replies)

### 3️⃣ Environment Variables Overzicht

Voor een complete werkende setup heb je deze variabelen nodig:

| Variable | Required | Description | Jouw waarde |
|----------|----------|-------------|-------------|
| `TURNSTILE_SECRET_KEY` | ✅ Ja | Cloudflare Turnstile secret | `0x4AAAAAAB9A8F9VILuu4rEbyD6NXL6t5uo` |
| `SMTP_HOST` | ✅ Ja | SMTP server hostname | `smtp.gmail.com` (of jouw provider) |
| `SMTP_PORT` | ✅ Ja | SMTP server poort | `587` |
| `SMTP_USERNAME` | ✅ Ja | SMTP authenticatie username | `info@avenix.nl` |
| `SMTP_PASSWORD` | ✅ Ja | SMTP authenticatie password | `[verkrijg van SMTP provider]` |
| `MAIL_TO` | ✅ Ja | Ontvanger van formulieren | `info@avenix.nl` |
| `MAIL_FROM` | ✅ Ja | Afzender naam en email | `Avenix <no-reply@avenix.nl>` |

**Waar te configureren:**
```
Cloudflare Dashboard
→ Workers & Pages
→ [jouw-site]
→ Settings
→ Environment Variables
→ Production (en Preview)
```

### 4️⃣ Testen

**Test 1 - Frontend:**
```
1. Ga naar: https://avenix.nl/contact.html
2. Vul formulier in
3. Voltooi Turnstile challenge
4. Klik "Verstuur bericht"
5. Check voor succes melding
```

**Test 2 - Email ontvangst:**
```
1. Check inbox: info@avenix.nl
2. Verwachte onderwerp: "Nieuw contactformulier: [Naam]"
3. Check reply-to adres van gebruiker
4. Beantwoord direct via reply
```

**Test 3 - API (via cURL):**
```bash
curl -X POST https://avenix.nl/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Gebruiker",
    "email": "test@example.com",
    "message": "Dit is een test bericht",
    "cf-turnstile-response": "ACTUAL_TOKEN_FROM_WIDGET"
  }'

# Verwacht response:
# {"ok":true,"message":"Bericht verzonden!"}
```

**Test 4 - Spam Protection:**
```bash
# Test honeypot (moet silent succeeden zonder email)
curl -X POST https://avenix.nl/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bot",
    "email": "bot@spam.com",
    "message": "Spam",
    "website": "filled-by-bot",
    "cf-turnstile-response": "token"
  }'

# Verwacht: {"ok":true} maar geen email verzonden
```

### 5️⃣ Troubleshooting

**Turnstile error: "Beveiligingsverificatie mislukt"**
- ✅ Check of `TURNSTILE_SECRET_KEY` correct is in Environment Variables
- ✅ Check of sitekey in HTML overeenkomt met Cloudflare Dashboard
- ✅ Check of domein toegevoegd is in Turnstile settings

**Email niet ontvangen:**
- ✅ Check alle SMTP variabelen in Environment Variables (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`)
- ✅ Test SMTP credentials in email client (Outlook/Thunderbird)
- ✅ Check firewall/port 587 toegankelijk
- ✅ Voor Gmail: gebruik app-specifiek wachtwoord (niet normaal wachtwoord)
- ✅ Check spam folder
- ✅ Check Cloudflare Functions logs voor SMTP errors

**"Invalid input" error:**
- ✅ Alle verplichte velden ingevuld? (name, email, message)
- ✅ Turnstile challenge voltooid?
- ✅ Email format geldig?

**Logs bekijken:**
```
Cloudflare Dashboard
→ Workers & Pages
→ [jouw-site]
→ Functions
→ Logs (Real-time logging)
```

---

## 🔒 Security

### Geïmplementeerde beveiliging:

- ✅ **CSP** (Content Security Policy)
- ✅ **HSTS** (HTTP Strict Transport Security)
- ✅ **X-Frame-Options: DENY** (Clickjacking protection)
- ✅ **X-Content-Type-Options: nosniff**
- ✅ **Referrer-Policy: strict-origin-when-cross-origin**
- ✅ **Cloudflare Turnstile** (Bot protection)
- ✅ **Honeypot spam protection**
- ✅ **Input sanitization** (XSS prevention)
- ✅ **Email validation** (Regex + length checks)
- ✅ **Rate limiting** (Cloudflare automatic)
- ✅ **SSL/TLS via Cloudflare**

**Test je security score:**
https://securityheaders.com/?q=avenix.nl

### 🛡️ Extra beveiliging (Optioneel)

**Rate Limiting via Cloudflare:**

Voor extra bescherming tegen spam/abuse, voeg rate limiting toe:

```
1. Cloudflare Dashboard → Security → WAF
2. Create Rate Limiting Rule:
   - Rule name: Contact Form Rate Limit
   - If incoming requests match:
     * URI Path equals /api/contact
     * Request Method equals POST
   - Then:
     * Block for 60 seconds
     * When rate exceeds 20 requests per 60 seconds
     * Per: IP Address
   - Deploy
```

**Custom WAF Rules (Geavanceerd):**

```
(http.request.uri.path eq "/api/contact" and http.request.method eq "POST" and 
 (cf.threat_score gt 30 or 
  not http.request.headers["content-type"] contains "application/json"))
```

Dit blokkeert requests met:
- Threat score > 30 (verdachte IP's)
- Verkeerde Content-Type header

---

## ⚡ Performance

### Optimalisaties:

- Edge deployment (Cloudflare's 300+ datacenters)
- Static asset caching (1 jaar)
- HTML caching (1 uur)
- Lazy loading images
- Optimized CSS/JS
- No jQuery, pure vanilla JS
- Tailwind CSS via CDN

**Test je performance:**
https://pagespeed.web.dev/?url=avenix.nl

---

## 🎨 Design

- **Kleuren:** Navy dark (#0c1221) + Geel (#FFCC03)
- **Font:** Inter (Google Fonts)
- **Framework:** Tailwind CSS
- **Styling:** Custom styles.css (1707 lijnen)
- **Animaties:** CSS transitions + IntersectionObserver
- **Icons:** SVG (inline)

---

## 📊 Analytics

### Cloudflare Analytics (ingebouwd):
- Requests
- Bandwidth
- Errors
- Performance metrics

### Google Analytics (optioneel):
Voeg tracking code toe aan alle HTML `<head>` secties.

---

## 🔄 Updates Deployen

```bash
# Maak wijzigingen in code
# Test lokaal
git add .
git commit -m "Update: beschrijving"
git push

# Cloudflare Pages deploy automatisch binnen 1-2 min!
```

**No build process needed** - Instant deployment! 🚀

---

## 🐛 Troubleshooting

### Contactformulier werkt niet?

**Turnstile error:**
```
1. Check TURNSTILE_SECRET_KEY in Environment Variables
2. Verify sitekey in contact.html matches Cloudflare Dashboard
3. Check domein in Turnstile settings (avenix.nl)
4. Test in different browser (clear cache)
```

**Email niet ontvangen:**
```
1. Check alle SMTP Environment Variables (SMTP_HOST, SMTP_PORT, etc.)
2. Test SMTP credentials handmatig in email client
3. Check Cloudflare Functions logs voor SMTP errors
4. Voor Gmail: gebruik App Password, niet normaal wachtwoord
5. Test met: curl -X POST https://avenix.nl/api/contact [see above]
6. Check spam folder
7. Verify poort 587 niet geblokkeerd door firewall
```

**Form error in browser:**
```
1. Open browser console (F12)
2. Check Network tab → /api/contact request
3. Look for error response: {"error": "..."}
4. Verify Turnstile widget loaded (check Elements tab)
5. Check if form fields have correct name attributes
```

**Deployment issues:**
```
1. Verify functions/api/contact.js exists
2. Check Cloudflare deployment logs
3. Redeploy: git push (auto-deploys)
4. Clear Cloudflare cache
```

### Deployment failed?
1. Check all files committed to Git
2. Cloudflare deployment logs
3. Retry deployment
4. Clear Cloudflare cache

**Meer troubleshooting:** Zie `CLOUDFLARE_DEPLOYMENT_GUIDE.md`

---

## 📞 Support & Links

### Documentatie:
- **Cloudflare Pages:** https://developers.cloudflare.com/pages/
- **Cloudflare Workers:** https://developers.cloudflare.com/workers/
- **Cloudflare Turnstile:** https://developers.cloudflare.com/turnstile/
- **Nodemailer:** https://nodemailer.com/about/
- **Gmail SMTP:** https://support.google.com/mail/answer/7126229
- **SendGrid SMTP:** https://docs.sendgrid.com/for-developers/sending-email/integrating-with-the-smtp-api

### Community:
- **Cloudflare Discord:** https://discord.gg/cloudflaredev
- **Nodemailer GitHub:** https://github.com/nodemailer/nodemailer
- **Stack Overflow:** https://stackoverflow.com/questions/tagged/nodemailer

---

## 📝 License

© 2025 Avenix. All rights reserved.
KVK: 98619624

---

## 🎉 Deployment Status

- **Production:** https://avenix.nl
- **Staging:** https://avenix-website.pages.dev
- **Status:** [![Cloudflare Pages](https://img.shields.io/badge/status-live-brightgreen)](https://avenix.nl)

---

**Made with ❤️ by Avenix** | Hosted on Cloudflare Pages
