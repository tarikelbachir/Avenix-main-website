# 🌐 Avenix Website - Cloudflare Pages

**Modern webdesign bureau website** met serverless email functionaliteit.

[![Cloudflare Pages](https://img.shields.io/badge/Hosted%20on-Cloudflare%20Pages-orange)](https://pages.cloudflare.com)
[![Resend](https://img.shields.io/badge/Email-Resend-blue)](https://resend.com)

---

## 🚀 Tech Stack

- **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript
- **Hosting:** Cloudflare Pages (Edge deployment)
- **Functions:** Cloudflare Workers (Serverless)
- **Email:** Resend API (Transactionele emails)
- **Security:** CSP, HSTS, Security Headers, Honeypot spam protection
- **SEO:** Sitemap, robots.txt, Open Graph

---

## 📁 Project Structuur

```
Avenix-main-website/
├── functions/              # Cloudflare Workers
│   ├── api/
│   │   ├── contact.js     # Contact form API endpoint (Resend)
│   │   └── intake.js       # Intake form API endpoint (Resend)
│   └── _middleware.js     # Security headers
│
├── assets/
│   └── img/               # Images & logos
│
├── css/
│   └── styles.css         # Custom styles
│
├── js/
│   └── main.js            # Core functionality
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
- **Spam protection** - Honeypot field
- **Responsive** - Mobile-first design

---

## 🚀 Quick Deploy

### Vereisten:
- GitHub account
- Cloudflare account (gratis)
- Resend account (gratis tier beschikbaar)

### 3-stappen deployment:

#### 1️⃣ Resend API Key Setup (2 min)
```
1. Maak account op: https://resend.com
2. Ga naar API Keys sectie
3. Maak nieuwe API key aan
4. Kopieer de API key (begint met re_...)
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
   - RESEND_API_KEY (verplicht - je Resend API key)
   - MAIL_TO (optioneel, default: info@avenix.nl)
6. Add Custom Domain: avenix.nl
```

**✅ Klaar!** Website is live op `avenix.nl`

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
RESEND_API_KEY=re_your_api_key_here
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
- **Resend API** - Transactionele email service
- **Honeypot field** - Spam bescherming
- **Input validatie** - Server-side validatie

### 1️⃣ Resend API Setup

**Stap 1: Maak Resend account**
1. Ga naar: https://resend.com
2. Maak gratis account aan
3. Verifieer je email adres

**Stap 2: Maak API Key**
1. Ga naar: API Keys sectie in Resend dashboard
2. Klik: "Create API Key"
3. Geef een naam (bijv. "Avenix Website")
4. Kopieer de API key (begint met `re_...`)

**Stap 3: Voeg API Key toe aan Cloudflare**
```
1. Ga naar: Cloudflare Dashboard → Workers & Pages → [avenix-site]
2. Klik op: Settings → Environment Variables
3. Klik: Add Variable
4. Production environment:
   Name: RESEND_API_KEY
   Value: re_your_api_key_here
5. Preview environment (optioneel - voor testing):
   Name: RESEND_API_KEY
   Value: re_your_api_key_here
6. Klik: Save
7. Redeploy je site (gebeurt automatisch bij volgende git push)
```

**Wat gebeurt er automatisch:**
- Emails worden verzonden via Resend API
- **From:** `[Naam] via Avenix <info@avenix.nl>`
- **To:** `info@avenix.nl` (configureerbaar via `MAIL_TO`)
- **Reply-to:** Email van de gebruiker (voor directe antwoorden)

**Resend gratis tier:**
- 3,000 emails per maand gratis
- 100 emails per dag
- Perfect voor kleine tot middelgrote websites

**Environment variable (optioneel):**
```
Cloudflare Dashboard → Settings → Environment Variables

MAIL_TO = info@avenix.nl  (standaard al ingesteld in code)
```

### 2️⃣ Environment Variables Overzicht

Voor een complete werkende setup heb je deze variabelen nodig:

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | ✅ Ja | Resend API key (begint met `re_...`) |
| `MAIL_TO` | ⚪ Optioneel | Ontvanger van formulieren (`info@avenix.nl` default in code) |

**Waar te configureren:**
```
Cloudflare Dashboard
→ Workers & Pages
→ [jouw-site]
→ Settings
→ Environment Variables
→ Production (en Preview)

Voeg toe:
RESEND_API_KEY = re_your_api_key_here
MAIL_TO = info@avenix.nl (optioneel)
```

### 4️⃣ Testen

**Test 1 - Frontend:**
```
1. Ga naar: https://avenix.nl/contact.html
2. Vul formulier in
3. Klik "Verstuur bericht"
4. Check voor succes melding
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
    "message": "Dit is een test bericht"
  }'

# Verwacht response:
# {"ok":true}
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
    "_form_verification": "filled-by-bot"
  }'

# Verwacht: {"ok":true} maar geen email verzonden
```

### 3️⃣ Cloudflare Setup Instructies

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
- Resend API responses
- Server errors en debug info
- Email verzend status
```

### 3️⃣ Troubleshooting

**Email niet ontvangen:**
- ✅ Check spam/junk folder bij info@avenix.nl
- ✅ Check `RESEND_API_KEY` environment variable (moet beginnen met `re_...`)
- ✅ Check `MAIL_TO` environment variable (default: info@avenix.nl)
- ✅ Check Cloudflare Functions logs voor Resend API errors
- ✅ Test formulier opnieuw na 5 minuten (eerste email kan vertraagd zijn)
- ✅ Check Resend dashboard voor email status en eventuele errors

**"Invalid input" error:**
- ✅ Alle verplichte velden ingevuld? (name, email, message)
- ✅ Email format geldig?
- ✅ Geen te lange velden? (name max 120, email max 254, message max 5000)

**Resend API error:**
- ✅ Check of `RESEND_API_KEY` correct is in Environment Variables
- ✅ Check Resend dashboard voor API key status
- ✅ Check Resend account limieten (gratis tier: 100 emails/dag)

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

**Email niet ontvangen:**
```
1. Check spam/junk folder bij info@avenix.nl
2. Check Cloudflare Functions logs voor Resend API errors
3. Verify RESEND_API_KEY environment variable (moet beginnen met re_...)
4. Verify MAIL_TO environment variable (optioneel, default: info@avenix.nl)
5. Test met: curl -X POST https://avenix.nl/api/contact [see above]
6. Check Resend dashboard voor email status
7. Wacht 5-10 minuten (eerste email kan vertraagd zijn)
```

**Form error in browser:**
```
1. Open browser console (F12)
2. Check Network tab → /api/contact request
3. Look for error response: {"error": "..."}
4. Check if form fields have correct name attributes
5. Verify alle verplichte velden zijn ingevuld
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

---

## 📞 Support & Links

### Documentatie:
- **Cloudflare Pages:** https://developers.cloudflare.com/pages/
- **Cloudflare Workers:** https://developers.cloudflare.com/workers/
- **Resend:** https://resend.com/docs
- **Resend API Reference:** https://resend.com/docs/api-reference/emails/send-email

### Community:
- **Cloudflare Discord:** https://discord.gg/cloudflaredev
- **Resend Support:** https://resend.com/support

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
