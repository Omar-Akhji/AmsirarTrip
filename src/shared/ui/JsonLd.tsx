import Script from "next/script";

interface JsonLdProps {
  /**
   * The structured data object. Must be a plain JavaScript object.
   */
  data: Record<string, unknown>;
  /**
   * Unique identifier for the script element.
   */
  id: string;
  /**
   * If true, renders a vanilla <script> tag for use in <head>.
   * If false (default), uses next/script for afterInteractive loading.
   */
  isSync?: boolean;
}

/**
 * Safe JSON-LD component that renders structured data.
 *
 * By default it uses next/script with afterInteractive strategy to avoid
 * blocking hydration. For critical SEO data, set `isSync={true}` and
 * place it inside the <head>.
 */
export function JsonLd({ data, id, isSync = false }: JsonLdProps) {
  // JSON.stringify with a replacer that escapes dangerous characters
  const safeJson = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  if (isSync) {
    return (
      <script
        id={id}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson }}
      />
    );
  }

  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}
