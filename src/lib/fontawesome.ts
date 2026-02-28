import {
  faFacebookF,
  faInstagram,
  faXTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

/**
 * Utility to access Font Awesome icons by prefix and name.
 * This approach maintains performance as only imported icons are bundled.
 *
 * Usage example: <FontAwesomeIcon icon={byPrefixAndName.fab['facebook-f']} />
 */
export const byPrefixAndName = {
  fab: {
    "facebook-f": faFacebookF,
    instagram: faInstagram,
    "x-twitter": faXTwitter,
    tiktok: faTiktok,
  },
};

// Re-export common icons for direct use if preferred
export { faFacebookF, faInstagram, faXTwitter, faTiktok };
