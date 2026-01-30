# 🔒 Security Documentation - AmsirarTrip

## Table of Contents

- [Overview](#overview)
- [Environment Variables](#environment-variables)
- [API Security](#api-security)
- [XSS Protection](#xss-protection)
- [CSRF Protection](#csrf-protection)
- [Rate Limiting](#rate-limiting)
- [Email Security](#email-security)
- [Content Security Policy](#content-security-policy)
- [Hostinger Deployment](#hostinger-deployment)
- [Security Checklist](#security-checklist)

---

## Overview

AmsirarTrip implements defense-in-depth security with multiple layers:

- ✅ Input validation and sanitization
- ✅ XSS/CSRF/SSRF protection
- ✅ Rate limiting with IP blocking
- ✅ reCAPTCHA v2 verification
- ✅ Secure email handling (Nodemailer + Gmail)
- ✅ Content Security Policy (CSP)
- ✅ Security headers (HSTS, X-Frame-Options, etc.)

---

## Environment Variables

### Required Variables (.env.local)

**NEVER commit `.env` or `.env.local` to version control!**

```bash
# Gmail SMTP Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password  # Use Google App Password, NOT your real password

# Email recipient (defaults to GMAIL_USER if not set)
MAIL_TO=admin@amsirartrip.com

# reCAPTCHA v2 Keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc-xxxxxxxxxxxxxxxxxxxxx
RECAPTCHA_SECRET_KEY=6Lc-xxxxxxxxxxxxxxxxxxxxx

# reCAPTCHA v3 Keys (optional)
NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY=6Led-xxxxxxxxxxxxxxxxxxxxx
RECAPTCHA_V3_SECRET_KEY=6Led-xxxxxxxxxxxxxxxxxxxxx

# Health Check Protection (optional)
HEALTH_CHECK_TOKEN=random-secure-token-here
```

### Environment Validation

All environment variables are validated at startup via `lib/env.ts`:

- Missing required variables → Application fails to start
- Type-safe access via `import { env } from "@/lib/env"`
- No direct `process.env` access in code

### Security Best Practices

1. **Generate App Password for Gmail**: <https://myaccount.google.com/apppasswords>
2. **Never use real Gmail password** (security risk)
3. **Use different keys for dev/production**
4. **Rotate secrets every 6-12 months**
5. **Keep `.env.local` out of git** (already in `.gitignore`)

---

## API Security

### Protected Endpoints

All API routes implement the same security pattern:

```typescript
// 1. Rate Limiting (10 requests/min per IP)
const rateLimit = checkRateLimit(ip, 10, 60000);
if (!rateLimit.allowed) return error(429);

// 2. Input Validation
const validation = validateRequiredFields(body, ["name", "email", ...]);
if (!validation.valid) return error(400);

// 3. Input Sanitization
const sanitizedName = sanitizeString(name);
const sanitizedEmail = validateEmail(email);

// 4. CAPTCHA Verification
if (!(await verifyRecaptcha(token))) return error(400);

// 5. Process Request
await sendEmail(...);
```

### Input Sanitization

`lib/api-utils.ts` provides robust sanitization:

- `sanitizeString()` - Removes HTML tags, scripts, control chars
- `validateEmail()` - RFC 5322 compliant regex
- `validatePhone()` - International phone format
- `validateNumber()` - Range validation with min/max
- `validateDate()` - ISO 8601 format only

### Request Size Limits

Configured in `next.config.ts`:

```typescript
serverRuntimeConfig: {
  maxBodySize: 4 * 1024 * 1024, // 4MB limit
}
```

Prevents DoS attacks via large payloads.

---

## XSS Protection

### Server-Side Protection

1. **Input Sanitization**: All user input sanitized before processing
2. **Output Encoding**: HTML entities escaped in emails
3. **CSP Headers**: Strict Content Security Policy (see below)
4. **JSON-LD Sanitization**: `sanitizeForJsonLd()` removes scripts from structured data

### Example: Email Template Protection

```typescript
function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const html = `<p>${escapeHtml(userInput)}</p>`;
```

### JSON-LD Structured Data

All `dangerouslySetInnerHTML` usage is protected:

```tsx
<Script
  dangerouslySetInnerHTML={{
    __html: sanitizeJsonLd(
      generateTourJsonLd({
        /* static data only */
      })
    ),
  }}
/>
```

- Only static/controlled data in JSON-LD
- `sanitizeForJsonLd()` removes HTML tags and javascript: URIs
- No user input in structured data

---

## CSRF Protection

### Middleware-Level Protection

`middleware.ts` implements origin/referer checks:

```typescript
// Block cross-origin POST requests
const origin = request.headers.get("origin");
const referer = request.headers.get("referer");
const allowedOrigin = new URL(request.url).origin;

if (!origin || !referer || !referer.startsWith(allowedOrigin)) {
  return new Response("Forbidden", { status: 403 });
}
```

### Additional Protection

- reCAPTCHA on all forms (requires user interaction)
- Same-origin policy enforced
- No state-changing GET requests

---

## Rate Limiting

### Current Implementation

`lib/api-utils.ts` provides in-memory rate limiting:

```typescript
const rateLimit = checkRateLimit(ip, 10, 60000); // 10 req/min
if (!rateLimit.allowed) {
  if (rateLimit.blocked) {
    // IP blocked after 3 violations
    logSuspiciousActivity(ip, "BLOCKED_REQUEST", endpoint);
  }
  return error(429);
}
```

### IP Blocking

- After 3 rate limit violations → IP blocked for 1 hour
- Automatic cleanup of old records
- Suspicious activity logged for monitoring

### ⚠️ Hostinger Limitation

In-memory rate limiting resets on:

- Server restarts
- Multi-server deployments

**Recommended**: Consider Redis/database-backed rate limiting for production.

---

## Email Security

### Nodemailer Configuration

Gmail SMTP with App Password:

```typescript
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.GMAIL_USER,
    pass: env.GMAIL_PASS,
  },
});
```

### Security Features

✅ **No SSRF Risk**: Gmail service hardcoded (no user-controlled SMTP host)
✅ **No Open Relay**: Recipient addresses (`MAIL_TO`) hardcoded
✅ **Email Header Injection Protection**: Inputs sanitized
✅ **HTML Injection Protection**: All content HTML-escaped
✅ **No Attachment Upload**: Forms only send text data

### Email Validation

Strict RFC 5322 regex:

```typescript
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
```

---

## Content Security Policy

### CSP Configuration

`lib/security-headers.ts` defines strict CSP:

```typescript
script-src 'self' https://trusted-domains.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
img-src 'self' data: https: blob:;
connect-src 'self' https://api.google.com;
frame-src 'self' https://www.google.com;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
```

### Key Points

- ✅ **No `unsafe-eval`** (prevents arbitrary code execution)
- ⚠️ `unsafe-inline` for styles (Tailwind CSS requirement)
- ✅ Whitelisted trusted domains only
- ✅ `frame-ancestors 'none'` prevents clickjacking

### Other Security Headers

```typescript
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: origin-when-cross-origin
```

---

## Hostinger Deployment

### Pre-Deployment Checklist

#### 1. Environment Configuration

```bash
# On Hostinger cPanel, set environment variables in:
# Node.js app settings → Application environment
GMAIL_USER=your-production-email@gmail.com
GMAIL_PASS=production-app-password
MAIL_TO=bookings@amsirartrip.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=production-site-key
RECAPTCHA_SECRET_KEY=production-secret-key
HEALTH_CHECK_TOKEN=random-secure-token
NODE_ENV=production
```

#### 2. Security Hardening

- [ ] Use production reCAPTCHA keys (not test keys)
- [ ] Rotate Gmail App Password
- [ ] Enable HTTPS (Hostinger SSL certificate)
- [ ] Verify `.env` file is NOT uploaded
- [ ] Set `NODE_ENV=production`

#### 3. Performance Optimization

```bash
npm run build  # Enable React Compiler for production
```

#### 4. Health Check Setup

```bash
# Test health endpoint with token
curl https://amsirartrip.com/api/health?token=YOUR_TOKEN
```

### Hostinger-Specific Notes

1. **Rate Limiting**: In-memory limits reset on app restart
2. **File System**: Use `/tmp` for temporary files only
3. **Memory Limits**: Monitor usage (Hostinger has limits)
4. **Logging**: Use external logging service (Logtail, Sentry)
5. **SSL/TLS**: Enabled by default via Hostinger

### Monitoring Recommendations

```bash
# Install Sentry for error tracking
npm install @sentry/nextjs

# Install Logtail for log aggregation
npm install @logtail/node
```

---

## Security Checklist

### Before Every Deployment

- [ ] **Environment variables set in Hostinger cPanel**
- [ ] **`.env` and `.env.local` NOT in git**
- [ ] **Production reCAPTCHA keys configured**
- [ ] **Gmail App Password (not real password)**
- [ ] **HTTPS enabled**
- [ ] **`NODE_ENV=production`**
- [ ] **Health check token set**
- [ ] **npm run build** (enables React Compiler)
- [ ] **Test all forms with reCAPTCHA**
- [ ] **Verify email delivery**

### Code Review Checklist

- [ ] No `dangerouslySetInnerHTML` with user input
- [ ] No direct `process.env` access (use `lib/env.ts`)
- [ ] All API routes use `withErrorHandling`
- [ ] All inputs sanitized via `lib/api-utils.ts`
- [ ] reCAPTCHA on all forms
- [ ] No sensitive data in error messages
- [ ] No console.log in production code

### Testing Checklist

- [ ] Test rate limiting (10 requests/min)
- [ ] Test CAPTCHA failure handling
- [ ] Test invalid email formats
- [ ] Test XSS payloads in forms (`<script>alert(1)</script>`)
- [ ] Test SQL injection patterns (should fail validation)
- [ ] Test large request bodies (should fail at 4MB)
- [ ] Test health endpoint with/without token

---

## Incident Response

### If Credentials Are Compromised

1. **Immediately rotate Gmail App Password**: <https://myaccount.google.com/apppasswords>
2. **Regenerate reCAPTCHA keys**: <https://www.google.com/recaptcha/admin>
3. **Update Hostinger environment variables**
4. **Redeploy application**
5. **Monitor logs for suspicious activity**

### Monitoring Suspicious Activity

Check logs for:

- `BLOCKED_REQUEST` - IP blocked after rate limit violations
- `CAPTCHA_FAILED` - Failed CAPTCHA attempts
- `INVALID_INPUT` - Malformed/malicious data
- High error rates (429, 400)

---

## Security Contacts

- **Project Lead**: <omar.akhji2019@gmail.com>
- **Google reCAPTCHA**: <https://www.google.com/recaptcha/admin>
- **Gmail Security**: <https://myaccount.google.com/security>
- **Hostinger Support**: <https://www.hostinger.com/cpanel-login>

---

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
- [Nodemailer Security](https://nodemailer.com/about/security/)
- [reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/verify)
- [CSP Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

**Last Updated**: 2024-01-XX  
**Security Audit Status**: ✅ Passed  
**Next Review**: 2024-XX-XX (6 months)
