/**
 * Legal Feature Module Types
 * @description Type definitions for legal pages (Privacy Policy, Terms of Service)
 */

export interface LegalSection {
  id: string;
  titleKey: string;
  contentKey: string;
}

export interface LegalPageConfig {
  titleKey: string;
  subtitleKey: string;
  lastUpdatedKey: string;
  sections: LegalSection[];
}
