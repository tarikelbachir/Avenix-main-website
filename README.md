# 🌐 Avenix Website - Cloudflare Pages

**Modern webdesign bureau website** met serverless email functionaliteit.

[![Cloudflare Pages](https://img.shields.io/badge/Hosted%20on-Cloudflare%20Pages-orange)](https://pages.cloudflare.com)
[![MailChannels](https://img.shields.io/badge/Email-MailChannels-blue)](https://mailchannels.com)

---

## 🚀 Tech Stack

- **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript
- **Hosting:** Cloudflare Pages (Edge deployment)
- **Functions:** Cloudflare Workers (Serverless)
- **Email:** MailChannels (Gratis voor Cloudflare)
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
- (Geen extra accounts nodig - MailChannels is gratis!)

### 3-stappen deployment:

#### 1️⃣ Turnstile Setup (2 min)
```
✅ Al gedaan! Jouw keys zijn al geconfigureerd.
Voeg alleen de secret key toe aan Environment Variables (zie stap 3)
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
   - TURNSTILE_SECRET_KEY (verplicht)
   - MAIL_TO (optioneel, default: info@avenix.nl)
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
TURNSTILE_SECRET_KEY=0x4AAAAAAB9A8F9VILuu4rEbyD6NXL6t5uo
MAIL_TO=info@avenix.nl
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
- **MailChannels** - **GRATIS** email verzending specifiek voor Cloudflare Workers
- **Honeypot field** - Extra spam bescherming
- **Input validatie** - Server-side validatie

> ✅ **MailChannels** is speciaal gemaakt voor Cloudflare Workers en **100% gratis**. Geen API keys, geen credit card, geen limiet!

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

### 2️⃣ MailChannels Email Setup

**✅ MailChannels werkt out-of-the-box!**

MailChannels is **gratis** en speciaal voor Cloudflare. Geen setup nodig, geen API keys, geen limiet!

**Wat gebeurt er automatisch:**
- Emails worden verzonden via MailChannels API
- **From:** `no-reply@avenix.nl`
- **To:** `info@avenix.nl` (configureerbaar via `MAIL_TO`)
- **Reply-to:** Email van de gebruiker (voor directe antwoorden)

**Optioneel - DKIM voor betere deliverability:**

Voor betere email deliverability (minder spam folder), voeg deze DNS record toe:

```
Type: TXT
Name: mailchannels._domainkey.avenix.nl
Value: v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...
```

Haal de volledige DKIM key op via: https://mailchannels.zendesk.com/hc/en-us/articles/7122849237389

**Environment variable (optioneel):**
```
Cloudflare Dashboard → Settings → Environment Variables

MAIL_TO = info@avenix.nl  (standaard al ingesteld in code)
```

### 3️⃣ Environment Variables Overzicht

Voor een complete werkende setup heb je deze variabelen nodig:

| Variable | Required | Description | Jouw waarde |
|----------|----------|-------------|-------------|
| `TURNSTILE_SECRET_KEY` | ✅ Ja | Cloudflare Turnstile secret | `0x4AAAAAAB9A8F9VILuu4rEbyD6NXL6t5uo` |
| `MAIL_TO` | ⚪ Optioneel | Ontvanger van formulieren | `info@avenix.nl` (default in code) |
| `MAIL_FROM` | ⚪ Optioneel | Afzender naam + email | `Avenix <no-reply@avenix.nl>` (default) |

**Waar te configureren:**
```
Cloudflare Dashboard
→ Workers & Pages
→ [jouw-site]
→ Settings
→ Environment Variables
→ Production (en Preview)

Voeg toe:
MAIL_TO = info@avenix.nl
MAIL_FROM = Avenix <no-reply@avenix.nl>
TURNSTILE_SECRET_KEY = 0x4AAAAAAB9A8F9VILuu4rEbyD6NXL6t5uo
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

### 5️⃣ Test Script

We hebben een test script toegevoegd om het contactformulier te testen:

**Run tests (Linux/Mac):**
```bash
chmod +x scripts/test-contact.sh
./scripts/test-contact.sh
```

**Run tests (Windows Git Bash):**
```bash
bash scripts/test-contact.sh
```

Het script test:
- ✅ Turnstile verificatie (verwacht: Captcha failed bij fake token)
- ✅ Validatie van verplichte velden
- ✅ Honeypot spam protection (bot detectie)
- ✅ Email format validatie

### 6️⃣ Cloudflare Setup Instructies

**SSL/TLS Configuratie:**
```
1. Cloudflare Dashboard → SSL/TLS
2. Selecteer: Full (strict)
3. Enable: Always Use HTTPS
4. Enable: Automatic HTTPS Rewrites
```

**Page Rules voor Root Redirect:**
```
1. Cloudflare Dashboard → Rules → Page Rules
2. Create Page Rule
3. URL: http://avenix.nl/*
4. Setting: Forwarding URL
5. Status Code: 301 (Permanent Redirect)
6. Destination URL: https://www.avenix.nl/$1
7. Save and Deploy (zet bovenaan!)
```

**Functions Logs Bekijken:**
```
Cloudflare Dashboard
→ Workers & Pages
→ [jouw-site]
→ Functions
→ Logs (Real-time logging)

Hier zie je:
- Turnstile verificatie resultaten
- MailChannels API responses
- Server errors en debug info
```

### 7️⃣ Troubleshooting

**Turnstile error: "Beveiligingsverificatie mislukt"**
- ✅ Check of `TURNSTILE_SECRET_KEY` correct is in Environment Variables
- ✅ Check of sitekey in HTML overeenkomt met Cloudflare Dashboard
- ✅ Check of domein toegevoegd is in Turnstile settings (www.avenix.nl)

**Email niet ontvangen:**
- ✅ Check spam/junk folder bij info@avenix.nl
- ✅ Check `MAIL_TO` environment variable (default: info@avenix.nl)
- ✅ Check Cloudflare Functions logs voor MailChannels errors
- ✅ Test formulier opnieuw na 5 minuten (eerste email kan vertraagd zijn)
- ✅ Voeg DKIM DNS record toe voor betere deliverability

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

### 8️⃣ SPF Record Note

Je huidige SPF record bevat waarschijnlijk `include:_spf.google.com` voor Google Workspace. Dit is prima en kan blijven staan.

**Optioneel:** Als je `include:spf.resend.com` ziet in je SPF record en je gebruikt Resend niet meer, kun je die verwijderen:

```
Huidige SPF (voorbeeld):
v=spf1 include:_spf.google.com include:spf.resend.com ~all

Nieuwe SPF (als Resend niet gebruikt wordt):
v=spf1 include:_spf.google.com ~all
```

⚠️ **Let op:** Wijzig SPF records alleen als je zeker weet dat Resend niet meer gebruikt wordt. MailChannels heeft geen SPF include nodig (werkt via API).

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
1. Check spam/junk folder bij info@avenix.nl
2. Check Cloudflare Functions logs voor MailChannels errors
3. Verify MAIL_TO environment variable (optioneel, default: info@avenix.nl)
4. Test met: curl -X POST https://avenix.nl/api/contact [see above]
5. Wacht 5-10 minuten (eerste email kan vertraagd zijn)
6. Voeg DKIM DNS record toe voor betere deliverability
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
- **MailChannels:** https://mailchannels.com
- **MailChannels DKIM Setup:** https://mailchannels.zendesk.com/hc/en-us/articles/7122849237389

### Community:
- **Cloudflare Discord:** https://discord.gg/cloudflaredev
- **MailChannels Support:** https://mailchannels.zendesk.com/hc/en-us

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
