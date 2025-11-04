# 📧 Email Setup Guide - Cloudflare Pages + Google Workspace

Complete gids voor het opzetten van een werkend email systeem met MailChannels en Google Workspace.

---

## 🎯 Overzicht

Je gebruikt:
- **MailChannels** - Gratis email service voor Cloudflare Workers (verzenden)
- **Google Workspace** - Jouw email provider (ontvangen: info@avenix.nl)
- **Cloudflare Pages Functions** - Serverless backend

**Hoe het werkt:**
1. Klant vult formulier in op website
2. Cloudflare Function verstuurt email via MailChannels API
3. Email komt aan bij info@avenix.nl (Google Workspace)
4. Je kunt direct antwoorden via Google Workspace

---

## ✅ Stap 1: Cloudflare Environment Variables

### In Cloudflare Dashboard:

```
1. Ga naar: Cloudflare Dashboard
2. Workers & Pages → [jouw-site-naam]
3. Settings → Environment Variables
4. Klik: "Add Variable" voor Production environment
```

### Voeg deze variabelen toe:

| Variable Name | Value | Verplicht |
|--------------|-------|-----------|
| `TURNSTILE_SECRET_KEY` | `0x4AAAAAAB9A8F9VILuu4rEbyD6NXL6t5uo` | ✅ Ja |
| `MAIL_TO` | `info@avenix.nl` | ⚪ Optioneel (default al ingesteld) |
| `MAIL_FROM` | `Avenix <no-reply@avenix.nl>` | ⚪ Optioneel (default al ingesteld) |

**Voorbeeld:**
```
Variable: MAIL_TO
Value: info@avenix.nl
Type: Plain text
Environment: Production
```

Herhaal dit voor Preview environment als je testen wilt.

---

## ✅ Stap 2: DNS Records Configureren

### 2.1 SPF Record (Sender Policy Framework)

**BELANGRIJK:** Je moet BOTH Google Workspace EN MailChannels toestaan!

Ga naar je DNS provider (waar je domein is geregistreerd) en zoek het huidige SPF record.

**Huidige SPF (waarschijnlijk):**
```
Type: TXT
Name: @ (of avenix.nl)
Value: v=spf1 include:_spf.google.com ~all
```

**Nieuwe SPF (met MailChannels):**
```
Type: TXT
Name: @ (of avenix.nl)
Value: v=spf1 include:_spf.google.com include:relay.mailchannels.net ~all
```

**Uitleg:**
- `include:_spf.google.com` - Google Workspace mag emails verzenden
- `include:relay.mailchannels.net` - MailChannels mag emails verzenden namens jouw domein
- `~all` - Soft fail (andere afzenders worden gewaarschuwd maar niet geblokkeerd)

### 2.2 DKIM Record (Optioneel, maar aanbevolen)

DKIM voorkomt dat emails in spam folder belanden.

**Voeg toe:**
```
Type: TXT
Name: mailchannels._domainkey.avenix.nl
Value: [Haal op via MailChannels - zie onder]
```

**DKIM Key ophalen:**
1. Ga naar: https://mailchannels.zendesk.com/hc/en-us/articles/7122849237389
2. Of gebruik deze public key (voor avenix.nl):
   ```
   v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...
   ```
   *(Let op: Dit is een voorbeeld, je moet de echte key ophalen)*

**Alternatief - Automatisch genereren:**
Als je de exacte key niet hebt, kun je eerst zonder DKIM werken. MailChannels werkt ook zonder, maar met DKIM is de deliverability beter.

### 2.3 DMARC Record (Optioneel, maar aanbevolen)

Voorkomt email spoofing en geeft je controle over gefaalde authenticatie.

**Voeg toe:**
```
Type: TXT
Name: _dmarc.avenix.nl
Value: v=DMARC1; p=quarantine; rua=mailto:info@avenix.nl; ruf=mailto:info@avenix.nl; pct=100
```

**Uitleg:**
- `p=quarantine` - Gefaalde emails gaan naar quarantine (niet direct verwijderd)
- `rua` - Reports naar info@avenix.nl
- Je kunt later aanpassen naar `p=none` voor monitoring eerst

---

## ✅ Stap 3: Google Workspace Configuratie

### 3.1 Controleren dat info@avenix.nl werkt

1. Log in op Google Workspace Admin Console
2. Controleer dat `info@avenix.nl` bestaat en actief is
3. Test dat je emails kunt ontvangen: stuur een test email naar info@avenix.nl

### 3.2 no-reply@avenix.nl Setup

Je hebt aangegeven dat je `no-reply@avenix.nl` als alternatief hebt ingesteld.

**Optie A - Email Alias (Aanbevolen):**
```
1. Google Workspace Admin Console
2. Users → info@avenix.nl
3. Email Aliases → Add Alias
4. Alias: no-reply@avenix.nl
5. Save
```

**Optie B - Aparte gebruiker:**
Als je een aparte gebruiker hebt gemaakt, zorg dan dat deze emails kan ontvangen (ook al reageer je niet).

**Belangrijk:** 
- `no-reply@avenix.nl` wordt gebruikt als **FROM** adres
- `info@avenix.nl` wordt gebruikt als **TO** adres (waar formulieren naartoe gaan)
- **Reply-to** wordt automatisch ingesteld op de email van de klant

---

## ✅ Stap 4: Code Verificatie

De code is al correct geconfigureerd! Hier is wat er gebeurt:

### Contact Formulier (`/api/contact`):
- Verstuurt naar: `info@avenix.nl` (via `MAIL_TO` env var)
- Van: `no-reply@avenix.nl` (via `MAIL_FROM` env var)
- Reply-to: Email van de klant

### Intake Formulier (`/api/intake`):
- Verstuurt naar: `info@avenix.nl` (via `MAIL_TO` env var)
- Van: `no-reply@avenix.nl` (via `MAIL_FROM` env var)
- Reply-to: Email van de klant

**De code gebruikt automatisch:**
- `env.MAIL_TO || "info@avenix.nl"` - Fallback naar info@avenix.nl
- `env.MAIL_FROM || "no-reply@" + domain` - Fallback naar no-reply@avenix.nl

---

## ✅ Stap 5: Testen

### Test 1: DNS Records Verificeren

Gebruik online tools om te controleren:

**SPF Check:**
```
https://mxtoolbox.com/spf.aspx
Voer in: avenix.nl
Verwacht: ✓ include:_spf.google.com en include:relay.mailchannels.net
```

**DMARC Check:**
```
https://mxtoolbox.com/dmarc.aspx
Voer in: avenix.nl
Verwacht: ✓ DMARC record gevonden
```

### Test 2: Contactformulier Testen

1. Ga naar: `https://avenix.nl/contact.html`
2. Vul formulier in met jouw eigen email
3. Voltooi Turnstile challenge
4. Klik "Verstuur bericht"
5. Check inbox: `info@avenix.nl`
6. Check dat **Reply-to** jouw test email is

### Test 3: Intake Formulier Testen

1. Ga naar: `https://avenix.nl/plan-intake.html`
2. Vul formulier in
3. Verstuur
4. Check inbox: `info@avenix.nl`
5. Controleer dat alle velden correct zijn (naam, email, telefoon, bedrijf, onderwerp, bericht)

### Test 4: Email Deliverability

Check de email in info@avenix.nl:
- ✅ Email komt aan (niet in spam)
- ✅ Reply-to is correct (klant email)
- ✅ Van adres is: `no-reply@avenix.nl` of `Avenix <no-reply@avenix.nl>`
- ✅ Je kunt direct antwoorden via "Reply" in Google Workspace

---

## 🔧 Troubleshooting

### Probleem: Emails komen niet aan

**Check 1: Environment Variables**
```
Cloudflare Dashboard → Workers & Pages → [site] → Settings → Environment Variables
✓ TURNSTILE_SECRET_KEY is ingesteld
✓ MAIL_TO is ingesteld (of gebruik default)
```

**Check 2: DNS Records**
```
✓ SPF record bevat: include:relay.mailchannels.net
✓ DMARC record bestaat (optioneel maar aanbevolen)
```

**Check 3: Cloudflare Functions Logs**
```
Cloudflare Dashboard → Workers & Pages → [site] → Functions → Logs
Zoek naar errors bij form submission
```

**Check 4: Google Workspace**
```
✓ info@avenix.nl bestaat en is actief
✓ Check spam/junk folder
✓ Check email forwarding rules
```

### Probleem: Emails komen in spam

**Oplossing:**
1. Voeg DKIM record toe (zie Stap 2.2)
2. Controleer SPF record (moet beide includes hebben)
3. Voeg DMARC record toe
4. Wacht 24-48 uur voor DNS propagation

### Probleem: "Email send failed (MailChannels)"

**Mogelijke oorzaken:**
1. SPF record niet correct - MailChannels kan niet verzenden namens jouw domein
2. DNS propagation nog niet compleet (wacht 24-48 uur)
3. MailChannels rate limit (onwaarschijnlijk, maar mogelijk)

**Oplossing:**
- Check SPF record op https://mxtoolbox.com/spf.aspx
- Zorg dat `include:relay.mailchannels.net` aanwezig is
- Wacht op DNS propagation

---

## 📋 Checklist

Gebruik deze checklist om te verifiëren dat alles werkt:

- [ ] Environment Variables ingesteld in Cloudflare:
  - [ ] `TURNSTILE_SECRET_KEY`
  - [ ] `MAIL_TO` (optioneel, default werkt ook)
  - [ ] `MAIL_FROM` (optioneel, default werkt ook)
- [ ] DNS Records:
  - [ ] SPF record bevat `include:relay.mailchannels.net`
  - [ ] SPF record bevat `include:_spf.google.com`
  - [ ] DKIM record toegevoegd (optioneel maar aanbevolen)
  - [ ] DMARC record toegevoegd (optioneel maar aanbevolen)
- [ ] Google Workspace:
  - [ ] `info@avenix.nl` bestaat en werkt
  - [ ] `no-reply@avenix.nl` is geconfigureerd (alias of aparte gebruiker)
- [ ] Testen:
  - [ ] Contactformulier werkt
  - [ ] Intake formulier werkt
  - [ ] Emails komen aan in info@avenix.nl
  - [ ] Reply-to werkt correct
  - [ ] Emails komen niet in spam

---

## 🎉 Klaar!

Als alle stappen zijn voltooid, zou je emailsysteem volledig moeten werken:

1. ✅ Klanten kunnen contactformulier invullen
2. ✅ Emails worden verzonden via MailChannels
3. ✅ Emails komen aan bij info@avenix.nl
4. ✅ Je kunt direct antwoorden via Google Workspace
5. ✅ Reply-to is automatisch ingesteld op klant email

**Volgende stappen:**
- Monitor email deliverability (check spam folder eerste week)
- Pas DMARC policy aan na monitoring (van `quarantine` naar `reject` als alles goed gaat)
- Check Cloudflare Functions logs regelmatig voor errors

---

## 📞 Support

**MailChannels Documentatie:**
- https://mailchannels.zendesk.com/hc/en-us/articles/7122849237389

**Cloudflare Workers Logs:**
- Cloudflare Dashboard → Workers & Pages → [site] → Functions → Logs

**DNS Check Tools:**
- SPF: https://mxtoolbox.com/spf.aspx
- DMARC: https://mxtoolbox.com/dmarc.aspx
- DKIM: https://mxtoolbox.com/dkim.aspx

