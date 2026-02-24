import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faWhatsapp,
  faXTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faClock,
  faChevronRight,
  faChevronLeft,
  faTimes,
  faBars,
  faQuoteRight,
  faHotel,
  faUtensils,
  faHorseHead,
  faCheck,
  faArrowRight,
  faArrowLeft,
  faUser,
  faCalendar,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";

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
    youtube: faYoutube,
    whatsapp: faWhatsapp,
    "x-twitter": faXTwitter,
    tiktok: faTiktok,
  },
  fas: {
    envelope: faEnvelope,
    phone: faPhone,
    "map-marker-alt": faMapMarkerAlt,
    clock: faClock,
    "chevron-right": faChevronRight,
    "chevron-left": faChevronLeft,
    times: faTimes,
    bars: faBars,
    "quote-right": faQuoteRight,
    hotel: faHotel,
    utensils: faUtensils,
    "horse-head": faHorseHead,
    check: faCheck,
    "arrow-right": faArrowRight,
    "arrow-left": faArrowLeft,
    user: faUser,
    calendar: faCalendar,
    folder: faFolder,
  },
};

// Re-export common icons for direct use if preferred
export {
  faFacebookF,
  faInstagram,
  faYoutube,
  faWhatsapp,
  faXTwitter,
  faTiktok,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faClock,
  faChevronRight,
  faChevronLeft,
  faTimes,
  faBars,
  faQuoteRight,
  faHotel,
  faUtensils,
  faHorseHead,
  faCheck,
  faArrowRight,
  faArrowLeft,
  faUser,
  faCalendar,
  faFolder,
};
