// reCAPTCHA v2 Site Key (for checkbox CAPTCHA)
export const RECAPTCHA_V2_SITE_KEY =
  process.env.NODE_ENV === "development"
    ? "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    : process.env["NEXT_PUBLIC_RECAPTCHA_SITE_KEY"] || "";

// Helper to check if reCAPTCHA v2 is configured
export const hasRecaptchaV2 = Boolean(RECAPTCHA_V2_SITE_KEY);
