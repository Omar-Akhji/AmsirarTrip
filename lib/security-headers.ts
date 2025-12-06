export const getSecurityHeaders = () => {
  const cspHeader = `
    default-src 'self';
    script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com https://kit.fontawesome.com https://ka-f.fontawesome.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://ka-f.fontawesome.com;
    img-src 'self' blob: data: https:;
    font-src 'self' https://fonts.gstatic.com https://ka-f.fontawesome.com data:;
    connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://ka-f.fontawesome.com;
    frame-src 'self' https://www.google.com https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    upgrade-insecure-requests;
    frame-ancestors 'none';
    block-all-mixed-content;
    ${process.env.NODE_ENV === "production" ? "" : ""}
  `;

  return [
    {
      key: "X-DNS-Prefetch-Control",
      value: "on",
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
    {
      key: "X-Frame-Options",
      value: "SAMEORIGIN",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "Referrer-Policy",
      value: "origin-when-cross-origin",
    },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    },
    {
      key: "Content-Security-Policy",
      value: cspHeader.replace(/\s{2,}/g, " ").trim(),
    },
  ];
};
