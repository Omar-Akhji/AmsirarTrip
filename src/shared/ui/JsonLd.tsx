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
   * Kept for API compatibility. Previously controlled sync vs async rendering.
   * Now all JSON-LD is rendered as a native `<script>` with React 19 children.
   */
  isSync?: boolean;
}

/**
 * Safe JSON-LD component that renders structured data using React 19's
 * native <script> children support — avoids dangerouslySetInnerHTML.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  // JSON.stringify with a replacer that escapes dangerous characters
  const safeJson = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <script
      id={id}
      type="application/ld+json"
    >
      {safeJson}
    </script>
  );
}
