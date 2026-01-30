# Analytics & Tracking Setup Guide

This guide helps you set up Google Analytics 4 and Google Tag Manager for comprehensive tracking.

---

## 1. Google Analytics 4 Setup

### Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Click "Admin" (bottom left)
3. Create Property → Name: "AmsirarTrip"
4. Set timezone and currency (Morocco / EUR)
5. Complete setup wizard
6. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2: Add GA4 to Project

Create `lib/analytics.ts`:

```typescript
// lib/analytics.ts

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Type definitions
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}
```

### Step 3: Update Root Layout

Add to `app/[locale]/layout.tsx` before closing `</head>`:

```typescript
import { GA_TRACKING_ID } from "@/lib/analytics";

// Inside layout function, add to <head>:
{
  process.env.NODE_ENV === "production" && GA_TRACKING_ID && (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `}
      </Script>
    </>
  );
}
```

### Step 4: Add Environment Variable

Add to `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Add to `.env.example`:

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=
```

---

## 2. Event Tracking

### Track Form Submissions

Update `BookingForm.tsx` and `ContactFormTailwind.tsx`:

```typescript
import { event as gaEvent } from "@/lib/analytics";

// After successful submission:
gaEvent({
  action: "booking_submitted",
  category: "Booking",
  label: `Tour ${formData.tourId}`,
  value: 1,
});

// Or for contact form:
gaEvent({
  action: "contact_form_submitted",
  category: "Contact",
  label: formData.name,
  value: 1,
});
```

### Track Button Clicks

```typescript
import { event as gaEvent } from "@/lib/analytics";

const handleBookNowClick = () => {
  gaEvent({
    action: "book_now_clicked",
    category: "CTA",
    label: "Tour Page",
    value: 1,
  });
  // Navigate to booking
};
```

### Track Page Views

Create `app/_components/AnalyticsWrapper.tsx`:

```typescript
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "@/lib/analytics";

export function AnalyticsWrapper() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = pathname + searchParams.toString();
      pageview(url);
    }
  }, [pathname, searchParams]);

  return null;
}
```

Add to layout:

```typescript
import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";

// Inside <body>:
{
  process.env.NODE_ENV === "production" && <AnalyticsWrapper />;
}
```

---

## 3. Google Tag Manager (GTM) Setup

### Step 1: Create GTM Container

1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Create Account → Name: "AmsirarTrip"
3. Create Container → Name: "AmsirarTrip Website"
4. Platform: Web
5. Copy your **Container ID** (format: `GTM-XXXXXXX`)

### Step 2: Add GTM to Project

Update `app/[locale]/layout.tsx`:

```typescript
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

// Inside <head> (after other scripts):
{
  process.env.NODE_ENV === "production" && GTM_ID && (
    <Script id="gtm" strategy="afterInteractive">
      {`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `}
    </Script>
  );
}

// Inside <body> (first child):
{
  process.env.NODE_ENV === "production" && GTM_ID && (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
```

### Step 3: Add Environment Variable

Add to `.env.local`:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

---

## 4. Configure GTM Tags

### GA4 Configuration Tag

1. In GTM, go to Tags → New
2. Tag Configuration → Google Analytics: GA4 Configuration
3. Measurement ID: `G-XXXXXXXXXX` (your GA4 ID)
4. Triggering: All Pages
5. Save

### Form Submission Event

1. Tags → New
2. Tag Configuration → Google Analytics: GA4 Event
3. Event Name: `form_submission`
4. Event Parameters:
   - `form_type`: `{{Form Type}}`
   - `form_id`: `{{Form ID}}`
5. Triggering: Form Submission
6. Save

### Create Triggers

#### Booking Form Trigger

1. Triggers → New
2. Trigger Type: Form Submission
3. Wait for Tags: 2000ms
4. Enable validation
5. Fire on: Some Forms
6. Form ID contains "booking"
7. Save

#### Contact Form Trigger

1. Triggers → New
2. Trigger Type: Form Submission
3. Wait for Tags: 2000ms
4. Fire on: Some Forms
5. Form ID contains "contact"
6. Save

---

## 5. Facebook Pixel Setup

### Step 1: Create Facebook Pixel

1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Create Pixel
3. Copy Pixel ID (format: `1234567890`)

### Step 2: Add to Project

Update `app/[locale]/layout.tsx`:

```typescript
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "";

// Inside <head>:
{
  process.env.NODE_ENV === "production" && FB_PIXEL_ID && (
    <Script id="fb-pixel" strategy="afterInteractive">
      {`
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${FB_PIXEL_ID}');
      fbq('track', 'PageView');
    `}
    </Script>
  );
}
```

### Step 3: Track Conversions

Create `lib/facebook-pixel.ts`:

```typescript
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "";

export const fbPageView = () => {
  if (typeof window.fbq !== "undefined") {
    window.fbq("track", "PageView");
  }
};

export const fbEvent = (name: string, options = {}) => {
  if (typeof window.fbq !== "undefined") {
    window.fbq("track", name, options);
  }
};

// Type definitions
declare global {
  interface Window {
    fbq: (command: string, name: string, options?: Record<string, any>) => void;
  }
}
```

Track in forms:

```typescript
import { fbEvent } from "@/lib/facebook-pixel";

// After booking submission:
fbEvent("InitiateCheckout", {
  content_name: `Tour ${formData.tourId}`,
  content_category: "Tours",
  currency: "EUR",
});

// After contact submission:
fbEvent("Contact", {
  content_name: "Contact Form",
});
```

---

## 6. Microsoft Clarity (Heatmaps & Session Recordings)

### Step 1: Create Clarity Project

1. Go to [Microsoft Clarity](https://clarity.microsoft.com)
2. Create Project
3. Copy Project ID

### Step 2: "Add to Project"

Update `app/[locale]/layout.tsx`:

```typescript
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "";

// Inside <head>:
{
  process.env.NODE_ENV === "production" && CLARITY_ID && (
    <Script id="clarity" strategy="afterInteractive">
      {`
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_ID}");
    `}
    </Script>
  );
}
```

---

## 7. Complete Environment Variables

Your `.env.local` should have:

```env
# Google Services
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Social Media Tracking
NEXT_PUBLIC_FB_PIXEL_ID=1234567890

# Heatmaps & Session Recording
NEXT_PUBLIC_CLARITY_ID=XXXXXXXXXX

# Existing variables...
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
MAIL_TO=contact@amsirartrip.com
RECAPTCHA_SECRET_KEY=your-recaptcha-secret
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```

---

## 8. Testing

### Test GA4

1. Enable GA4 in `.env.local`
2. Run `npm run dev`
3. Open [GA4 Realtime Reports](https://analytics.google.com)
4. Navigate through your site
5. Verify events appear in realtime

### Test GTM

1. Install [Google Tag Assistant](https://tagassistant.google.com/)
2. Enable tag assistant
3. Navigate your site
4. Check that tags fire correctly

### Test Events

1. Submit a form
2. Check GTM Preview mode
3. Verify events in GA4 Realtime
4. Check Facebook Events Manager (if applicable)

---

## 9. Important Events to Track

### Conversion Events

- `booking_initiated` - User clicks "Book Now"
- `booking_submitted` - Booking form submitted
- `contact_submitted` - Contact form submitted
- `newsletter_signup` - Newsletter subscription

### Engagement Events

- `tour_view` - User views tour page
- `excursion_view` - User views excursion page
- `scroll_depth` - User scrolls 25%, 50%, 75%, 100%
- `time_on_page` - User spends >30s, >60s, >120s

### Navigation Events

- `nav_click` - Main navigation clicks
- `footer_link_click` - Footer link clicks
- `cta_click` - Call-to-action button clicks

---

## 10. Privacy & GDPR Compliance

### Cookie Consent

Consider adding a cookie consent banner:

```typescript
// app/_components/CookieConsent.tsx
"use client";

import { useState, useEffect } from "react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
    // Initialize analytics here
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-white p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm">
          We use cookies to improve your experience. By using our site, you
          agree to our use of cookies.
        </p>
        <div className="flex gap-4">
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200">
            Accept
          </button>
          <button
            onClick={declineCookies}
            className="px-4 py-2 border border-white rounded hover:bg-white/10">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
```

Add to layout:

```typescript
import { CookieConsent } from "@/components/CookieConsent";

// Inside <body>:
<CookieConsent />;
```

---

## 11. Monitoring Dashboard Setup

### Google Analytics 4 Reports

Create custom reports for:

1. **Tour Performance**
   - Page views per tour
   - Booking conversion rate
   - Average time on tour pages

2. **Traffic Sources**
   - Organic search traffic
   - Direct traffic
   - Referral sources
   - Social media traffic

3. **User Behavior**
   - User flow through site
   - Exit pages
   - Bounce rate by page

4. **Conversions**
   - Booking form submissions
   - Contact form submissions
   - Newsletter signups
   - Goal completions

---

## 12. Resources

- [GA4 Documentation](https://support.google.com/analytics/answer/9304153)
- [GTM Documentation](https://support.google.com/tagmanager)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [Facebook Pixel Guide](https://www.facebook.com/business/help/952192354843755)

---

**Version:** 1.0  
**Last Updated:** 2025-01-XX  
**Status:** Ready for implementation
