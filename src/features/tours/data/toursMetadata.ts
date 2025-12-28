export interface TourMetadata {
  slug: string;
  tourKey: string;
  bookingId: number;
  image: string;
  duration: string; // ISO 8601 format (e.g., "P3D")
  durationDays: number;
  startLocation: string;
  endLocation: string;
  keywords: string[];
  jsonLd: {
    name: string;
    description: string;
    price?: number;
    currency?: string;
  };
}

export const TOURS_METADATA: Record<string, TourMetadata> = {
  "merzouga-desert-adventure-3-days": {
    slug: "merzouga-desert-adventure-3-days",
    tourKey: "tour1",
    bookingId: 1,
    image: "/images/Tours/Tour1.webp",
    duration: "P3D",
    durationDays: 3,
    startLocation: "Marrakech",
    endLocation: "Marrakech",
    keywords: [
      "Merzouga desert tour",
      "3 day Sahara tour",
      "Marrakech to Merzouga",
      "Ait Ben Haddou tour",
      "Dades Valley tour",
      "Camel trekking Morocco",
      "Desert camping Merzouga",
      "Sahara adventure tour",
      "Morocco desert experience",
      "Atlas Mountains tour",
      "Todra Gorge excursion",
      "Morocco desert safari",
    ],
    jsonLd: {
      name: "3 Day Merzouga Desert Tour from Marrakech",
      description:
        "Experience the magic of the Sahara Desert on this 3-day adventure from Marrakech to Merzouga. Explore Ait Ben Haddou, ride camels across golden dunes, camp under starlit skies, and discover the beauty of Morocco's desert wilderness.",
      price: 295,
      currency: "EUR",
    },
  },
  "coast-and-cities-explorer-6-days": {
    slug: "coast-and-cities-explorer-6-days",
    tourKey: "tour2",
    bookingId: 2,
    image: "/images/Tours/Tour2.webp",
    duration: "P6D",
    durationDays: 6,
    startLocation: "Casablanca",
    endLocation: "Marrakech",
    keywords: [
      "Morocco 6 day tour",
      "Coast and cities tour",
      "Casablanca to Marrakech",
      "Morocco coastal tour",
      "Imperial cities tour",
      "Essaouira tour",
      "Fes Meknes tour",
      "Morocco explorer tour",
    ],
    jsonLd: {
      name: "Coast and Cities Explorer - 6 Days",
      description:
        "Explore Morocco's stunning coastline and vibrant cities on this comprehensive 6-day journey from Casablanca to Marrakech.",
    },
  },
  "caravan-and-kasbah-experience-3-days": {
    slug: "caravan-and-kasbah-experience-3-days",
    tourKey: "tour3",
    bookingId: 3,
    image: "/images/Tours/Tour3.webp",
    duration: "P3D",
    durationDays: 3,
    startLocation: "Fes",
    endLocation: "Marrakech",
    keywords: [
      "Fes to Marrakech tour",
      "3 day desert tour",
      "Caravan experience Morocco",
      "Kasbah tour",
      "Merzouga from Fes",
      "Sahara desert tour",
      "Morocco 3 day adventure",
      "Atlas Mountains crossing",
    ],
    jsonLd: {
      name: "Caravan and Kasbah Experience - 3 Days",
      description:
        "Journey from Fes to Marrakech through ancient kasbahs and golden dunes on this unforgettable 3-day caravan experience.",
    },
  },
  "imperial-cities-and-coastline-5-days": {
    slug: "imperial-cities-and-coastline-5-days",
    tourKey: "tour4",
    bookingId: 4,
    image: "/images/Tours/Tour4.webp",
    duration: "P5D",
    durationDays: 5,
    startLocation: "Casablanca",
    endLocation: "Marrakech",
    keywords: [
      "Morocco 5 day tour",
      "Imperial cities tour",
      "Casablanca Fes Marrakech",
      "Morocco cultural tour",
      "Rabat Meknes tour",
      "Morocco heritage tour",
      "Best Morocco tour",
      "Morocco coastline tour",
    ],
    jsonLd: {
      name: "Imperial Cities and Coastline - 5 Days",
      description:
        "Discover Morocco's rich history and stunning coastline visiting all four imperial cities on this 5-day adventure.",
    },
  },
  "grand-moroccan-circuit-10-days": {
    slug: "grand-moroccan-circuit-10-days",
    tourKey: "tour5",
    bookingId: 5,
    image: "/images/Tours/Tour5.webp",
    duration: "P10D",
    durationDays: 10,
    startLocation: "Marrakech",
    endLocation: "Marrakech",
    keywords: [
      "Morocco 10 day tour",
      "Grand Morocco tour",
      "Complete Morocco tour",
      "Sahara Atlas tour",
      "Morocco epic adventure",
      "Imperial cities Sahara",
      "Morocco comprehensive tour",
      "Best Morocco tour",
    ],
    jsonLd: {
      name: "Grand Moroccan Circuit - 10 Days",
      description:
        "Traverse Sahara dunes, imperial cities, Atlas peaks, and coastal elegance in an epic 10-day adventure across Morocco!",
    },
  },
  "atlas-and-desert-escape-4-days": {
    slug: "atlas-and-desert-escape-4-days",
    tourKey: "tour6",
    bookingId: 6,
    image: "/images/Tours/Tour6.webp",
    duration: "P4D",
    durationDays: 4,
    startLocation: "Marrakech",
    endLocation: "Marrakech",
    keywords: [
      "Morocco 4 day tour",
      "Atlas Mountains tour",
      "Desert escape Morocco",
      "Marrakech desert tour",
      "Ouarzazate tour",
      "Dades Valley tour",
      "Sahara 4 days",
      "Morocco adventure tour",
    ],
    jsonLd: {
      name: "Atlas and Desert Escape - 4 Days",
      description:
        "Escape to the Atlas Mountains and Sahara Desert on this perfectly balanced 4-day adventure from Marrakech.",
    },
  },
  "coastal-and-desert-odyssey-4-days": {
    slug: "coastal-and-desert-odyssey-4-days",
    tourKey: "tour7",
    bookingId: 7,
    image: "/images/Tours/Tour7.webp",
    duration: "P4D",
    durationDays: 4,
    startLocation: "Marrakech",
    endLocation: "Essaouira",
    keywords: [
      "Morocco 4 day tour",
      "Coastal desert tour",
      "Marrakech to Essaouira",
      "Morocco odyssey",
      "Desert coast tour",
      "Agadir tour",
      "Atlantic coast Morocco",
      "Morocco beach desert tour",
    ],
    jsonLd: {
      name: "Coastal and Desert Odyssey - 4 Days",
      description:
        "Experience the best of Morocco's coast and desert on this 4-day odyssey from Marrakech to Essaouira.",
    },
  },
  "chegaga-wilderness-expedition-3-days": {
    slug: "chegaga-wilderness-expedition-3-days",
    tourKey: "tour8",
    bookingId: 8,
    image: "/images/Tours/Tour8.webp",
    duration: "P3D",
    durationDays: 3,
    startLocation: "Marrakech",
    endLocation: "Marrakech",
    keywords: [
      "Chegaga desert tour",
      "3 day wilderness tour",
      "Morocco expedition",
      "Chegaga dunes",
      "Remote desert Morocco",
      "Off-road Morocco tour",
      "Zagora tour",
      "Draa Valley tour",
    ],
    jsonLd: {
      name: "Chegaga Wilderness Expedition - 3 Days",
      description:
        "Venture into the remote Chegaga dunes on this 3-day wilderness expedition for an authentic Sahara experience.",
    },
  },
  "northern-heritage-trail-7-days": {
    slug: "northern-heritage-trail-7-days",
    tourKey: "tour9",
    bookingId: 9,
    image: "/images/Tours/Tour9.webp",
    duration: "P7D",
    durationDays: 7,
    startLocation: "Tangier",
    endLocation: "Marrakech",
    keywords: [
      "Morocco 7 day tour",
      "Northern Morocco tour",
      "Tangier to Marrakech",
      "Chefchaouen tour",
      "Rif Mountains tour",
      "Morocco heritage trail",
      "Fes Tangier tour",
      "Blue city Morocco tour",
    ],
    jsonLd: {
      name: "Northern Heritage Trail - 7 Days",
      description:
        "Explore Morocco's northern heritage from Tangier to Marrakech on this 7-day journey through the Rif Mountains and blue city of Chefchaouen.",
    },
  },
};

// Helper to get all slugs for generateStaticParams
export function getTourSlugs(): string[] {
  return Object.keys(TOURS_METADATA);
}

// Helper to get tour metadata by slug
export function getTourBySlug(slug: string): TourMetadata | undefined {
  return TOURS_METADATA[slug];
}
