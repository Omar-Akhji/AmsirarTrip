"use client";

import { LegalPageLayout } from "./LegalPageLayout";
import { TERMS_OF_SERVICE_CONFIG } from "../data/legalConfig";

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
