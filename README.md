# 🌐 Avenix Website - Cloudflare Pages

**Modern webdesign bureau website** met serverless email functionaliteit.

[![Cloudflare Pages](https://img.shields.io/badge/Hosted%20on-Cloudflare%20Pages-orange)](https://pages.cloudflare.com)
[![Resend Email](https://img.shields.io/badge/Email-Resend%20API-blue)](https://resend.com)

---

## 🚀 Tech Stack

- **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript
- **Hosting:** Cloudflare Pages (Edge deployment)
- **Functions:** Cloudflare Workers (Serverless)
- **Email:** Resend API
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
- Resend account (gratis 100 emails/dag)

### 3-stappen deployment:

#### 1️⃣ Email Setup (5 min)
```
1. Signup: https://resend.com
2. Voeg domein toe: avenix.nl
3. Verifieer DNS records
4. Genereer API key
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
5. Add Environment Variable: RESEND_API_KEY
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
Kopieer `.env.example` naar `.env` en vul in:
```env
RESEND_API_KEY=re_your_api_key_here
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
- **Resend API** - Email verzending naar `info@avenix.nl`
- **Honeypot field** - Extra spam bescherming
- **Input validatie** - Server-side validatie

### 1️⃣ Cloudflare Turnstile Setup

**Stap 1 - Maak Turnstile Site aan:**
```
1. Ga naar: https://dash.cloudflare.com/?to=/:account/turnstile
2. Klik "Add Site"
3. Site name: Avenix Contact Form
4. Domain: avenix.nl
5. Widget mode: Managed
6. Kopieer de SITE KEY en SECRET KEY
```

**Stap 2 - Voeg Sitekey toe aan HTML:**

Open `contact.html` en vervang `YOUR_TURNSTILE_SITEKEY`:
```html
<div class="cf-turnstile" data-sitekey="1x00000000000000000000AA" data-theme="dark"></div>
```

**Stap 3 - Voeg Secret toe aan Cloudflare:**
```
1. Cloudflare Dashboard → Workers & Pages → jouw-site
2. Settings → Environment Variables
3. Add Variable:
   Name: TURNSTILE_SECRET_KEY
   Value: [jouw secret key]
4. Deploy (Production + Preview)
```

### 2️⃣ Resend Email Setup

**DNS Records (via Cloudflare):**
```
Type: TXT
Name: @
Content: [Resend verification key]

Type: CNAME  
Name: resend._domainkey
Content: [Resend DKIM key]
```

**Stap 1 - Genereer API Key:**
```
1. Ga naar: https://resend.com/api-keys
2. Klik "Create API Key"
3. Name: Avenix Production
4. Permission: Sending access
5. Kopieer de API key (begint met `re_`)
```

**Stap 2 - Voeg toe aan Cloudflare:**
```
1. Cloudflare Dashboard → Workers & Pages → jouw-site
2. Settings → Environment Variables
3. Add Variables:
   
   RESEND_API_KEY = re_jouw_api_key_hier
   MAIL_TO = info@avenix.nl
   MAIL_FROM = Avenix <no-reply@avenix.nl>  (optioneel)

4. Deploy to Production + Preview
```

**Email configuratie:**
- **From:** `Avenix <no-reply@avenix.nl>`
- **To:** `info@avenix.nl`
- **Reply-to:** Email van gebruiker (voor directe replies)

### 3️⃣ Environment Variables Overzicht

Voor een complete werkende setup heb je deze 3 variabelen nodig:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `TURNSTILE_SECRET_KEY` | ✅ Ja | Cloudflare Turnstile secret | `0x4AAA...` |
| `RESEND_API_KEY` | ✅ Ja | Resend API key voor email | `re_123...` |
| `MAIL_TO` | ✅ Ja | Ontvanger van formulieren | `info@avenix.nl` |
| `MAIL_FROM` | ⚪ Nee | Afzender naam en email | `Avenix <no-reply@avenix.nl>` |

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
- ✅ Check `RESEND_API_KEY` in Environment Variables
- ✅ Verify domein status in Resend Dashboard (moet "Verified" zijn)
- ✅ Check DNS records (SPF, DKIM) zijn correct
- ✅ Check spam folder

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
1. Check Resend domein verificatie: https://resend.com/domains
2. Verify RESEND_API_KEY in Cloudflare Environment Variables
3. Check Cloudflare Functions logs voor errors
4. Test met: curl -X POST https://avenix.nl/api/contact [see above]
5. Check spam folder
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
- **Resend API:** https://resend.com/docs
- **Resend with Cloudflare:** https://resend.com/docs/send-with-cloudflare-workers

### Community:
- **Cloudflare Discord:** https://discord.gg/cloudflaredev
- **Resend Support:** support@resend.com

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
