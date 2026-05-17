import { PRIVACY_POLICY_CONFIG } from "../data/legalConfig";
import { LegalPageLayout } from "./LegalPageLayout";

/**
 * PrivacyPolicyView Component
 * @description Renders the Privacy Policy page using the reusable LegalPageLayout
 */
export default function PrivacyPolicyView() {
  return (
    <LegalPageLayout
      config={PRIVACY_POLICY_CONFIG}
      headingId="privacy-policy-heading"
    />
  );
}
