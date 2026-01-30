/**
 * Legal Feature Module
 * @description Exports for Privacy Policy and Terms of Service pages
 */

// Components
export {
  PrivacyPolicyView,
  TermsOfServiceView,
  LegalPageLayout,
  LegalSectionCard,
} from "./components";

// Types
export type { LegalSection, LegalPageConfig } from "./types";

// Data/Config
export {
  PRIVACY_POLICY_CONFIG,
  TERMS_OF_SERVICE_CONFIG,
} from "./data/legalConfig";
