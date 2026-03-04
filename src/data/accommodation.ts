export interface PriceRange {
  low: number;
  high: number;
}

export type AccommodationTag =
  | "Value Pick"
  | "Closest to Park"
  | "Best Spa Experience"
  | "Hot Tub + Dinner"
  | "The Splurge";

export interface Accommodation {
  id: string;
  name: string;
  location: string;
  distanceToEntrance: string;
  rating: number;
  pricePerNight: PriceRange;
  totalWithGenius: PriceRange;
  breakfastIncluded: boolean;
  breakfastCost?: string;
  hasJacuzzi: boolean;
  jacuzziType?: string;
  roomVibe: string;
  highlights: string[];
  bookingUrl?: string;
  tag: AccommodationTag;
  recommended?: boolean;
}

export const accommodations: Accommodation[] = [
  {
    id: "rustic-lodge-plitvice",
    name: "Rustic Lodge Plitvice",
    location: "Plitvica Selo",
    distanceToEntrance: "2.7 km",
    rating: 9.4,
    pricePerNight: { low: 55, high: 75 },
    totalWithGenius: { low: 95, high: 130 },
    breakfastIncluded: false,
    breakfastCost: "€10/person",
    hasJacuzzi: false,
    roomVibe:
      "Rustic-chic wood chalet with warm timber interiors and mountain atmosphere",
    highlights: [
      "Exceptional 9.4 guest rating",
      "Authentic wood chalet design",
      "Peaceful village setting",
      "Most affordable option on the list",
      "Great value for solo or budget-conscious couples",
    ],
    tag: "Value Pick",
  },
  {
    id: "etno-garden-exclusive",
    name: "Etno Garden Exclusive",
    location: "Plitvica Selo",
    distanceToEntrance: "400 m walk to park entrance",
    rating: 8.7,
    pricePerNight: { low: 90, high: 110 },
    totalWithGenius: { low: 154, high: 198 },
    breakfastIncluded: false,
    breakfastCost: "€10–13/person",
    hasJacuzzi: false,
    roomVibe:
      "Traditional Croatian architecture blended with modern amenities and garden surroundings",
    highlights: [
      "Closest property to park entrance — just 400 m on foot",
      "Walk to the gate without driving",
      "Etno-style rooms with modern comforts",
      "Garden setting with outdoor seating",
      "Ideal for early morning park entry",
    ],
    tag: "Closest to Park",
  },
  {
    id: "16-lakes-hotel",
    name: "16 Lakes Hotel",
    location: "Grabovac",
    distanceToEntrance: "7.5 km / ~10 min drive",
    rating: 9.2,
    pricePerNight: { low: 75, high: 135 },
    totalWithGenius: { low: 130, high: 230 },
    breakfastIncluded: true,
    hasJacuzzi: true,
    jacuzziType:
      "Private couples spa suite with Finnish sauna, infrared sauna, and 2-hour session included",
    roomVibe:
      "Boutique hotel with individually lake-named rooms — each room inspired by one of the 16 Plitvice lakes",
    highlights: [
      "Breakfast included",
      "Private couples spa experience with Finnish + infrared sauna",
      "2-hour exclusive spa session",
      "Rooms named after the 16 Plitvice lakes",
      "Boutique scale with attentive service",
      "Wellness room upgrade available at €135/night",
    ],
    tag: "Best Spa Experience",
  },
  {
    id: "hotel-degenija",
    name: "Hotel Degenija",
    location: "Seliste Dreznicko",
    distanceToEntrance: "4 km / ~8 min drive",
    rating: 9.2,
    pricePerNight: { low: 76, high: 120 },
    totalWithGenius: { low: 154, high: 204 },
    breakfastIncluded: true,
    hasJacuzzi: true,
    jacuzziType: "In-room private hot tub — available in hot-tub room category",
    roomVibe:
      "Modern clean European hotel with warm service, in-room hot tubs, and on-site fine dining restaurant",
    highlights: [
      "Breakfast included",
      "In-room private hot tub option",
      "On-site Restaurant Degenija (top anniversary dinner pick)",
      "No need to drive to dinner — dine in your hotel",
      "Modern interiors with European polish",
      "Adjacent to Rastoke village and Slunj waterfalls",
    ],
    tag: "Hot Tub + Dinner",
    recommended: true,
  },
  {
    id: "teslas-gastro-house",
    name: "Tesla's Gastro House",
    location: "Prijeboj / near park area",
    distanceToEntrance: "Park area",
    rating: 9.7,
    pricePerNight: { low: 149, high: 149 },
    totalWithGenius: { low: 254, high: 340 },
    breakfastIncluded: false,
    breakfastCost: "€16/person",
    hasJacuzzi: true,
    jacuzziType: "Outdoor heated jacuzzi + private sauna on property",
    roomVibe:
      "Curated boutique property with individually designed rooms, gastro focus, and top-tier guest experience",
    highlights: [
      "Highest rated property at 9.7",
      "Outdoor heated jacuzzi",
      "Private sauna",
      "Every room individually designed",
      "Gastro-house concept — food is central to the experience",
      "Ultimate splurge pick for a special occasion",
    ],
    tag: "The Splurge",
  },
] as const satisfies Accommodation[];
