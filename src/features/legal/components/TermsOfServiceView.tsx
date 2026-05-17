import { TERMS_OF_SERVICE_CONFIG } from "../data/legalConfig";
import { LegalPageLayout } from "./LegalPageLayout";

/**
 * TermsOfServiceView Component
 * @description Renders the Terms of Service page using the reusable LegalPageLayout
 */
export default function TermsOfServiceView() {
  return (
    <LegalPageLayout
      config={TERMS_OF_SERVICE_CONFIG}
      headingId="terms-of-service-heading"
    />
  );
}
