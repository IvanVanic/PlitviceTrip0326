export type RouteLabel = "A" | "B" | "C" | "E" | "F" | "H" | "K";
export type DifficultyLevel = "easy" | "moderate" | "strenuous";
export type EntranceNumber = 1 | 2;

export interface ParkRoute {
  id: string;
  label: RouteLabel;
  name: string;
  durationHours: number;
  distanceKm: number;
  difficulty: DifficultyLevel;
  startEntrance: EntranceNumber;
  lakesVisited: string;
  includesBoat: boolean;
  includesShuttle: boolean;
  marchRecommended: boolean;
  description: string;
  highlights: string[];
  notes?: string;
}

export interface TicketInfo {
  period: string;
  adultEur: number;
  studentEur: number;
  childEur: number;
  childFreeUnder: number;
  notes: string;
}

export interface TransportService {
  id: string;
  name: string;
  type: "boat" | "shuttle-bus";
  route: string;
  marchSchedule: string;
  included: boolean; // included in park ticket
  notes: string;
}

export interface HiddenGem {
  id: string;
  name: string;
  description: string;
  location: string;
  bestTime: string;
  crowdLevel: "always-empty" | "low" | "moderate" | "can-get-busy";
  tip: string;
}

export interface ParkFacility {
  id: string;
  name: string;
  location: string;
  openInMarch: boolean;
  notes: string;
}

export const parkRoutes: ParkRoute[] = [
  {
    id: "route-a",
    label: "A",
    name: "Lower Lakes Loop",
    durationHours: 2,
    distanceKm: 3.5,
    difficulty: "easy",
    startEntrance: 1,
    lakesVisited: "Lower Lakes — Novakovica Brod to Kozjak",
    includesBoat: true,
    includesShuttle: false,
    marchRecommended: true,
    description:
      "The classic short route covering the most dramatic lower lake section. Walk down through the lower lakes following the boardwalks, cross Kozjak lake by boat, and return by shuttle. Most iconic views of Plitvice are on this route.",
    highlights: [
      "Veliki Slap (78 m — Croatia's highest waterfall)",
      "Kozjak lake boat crossing",
      "Full lower lake boardwalk experience",
      "Best waterfall density of any route",
    ],
    notes:
      "Boat may run reduced schedule in March — ask at entrance. Route is still excellent without the boat crossing.",
  },
  {
    id: "route-b",
    label: "B",
    name: "Lower Lakes Extended Loop",
    durationHours: 3,
    distanceKm: 4,
    difficulty: "easy",
    startEntrance: 1,
    lakesVisited: "Lower Lakes including Galovac",
    includesBoat: true,
    includesShuttle: true,
    marchRecommended: true,
    description:
      "Extends Route A to include Galovac lake. Adds about 1 hour and covers additional cascades in the lower section. The definitive lower lakes experience — best choice if doing one route.",
    highlights: [
      "Everything Route A offers",
      "Additional Galovac lake section",
      "Better coverage of lower cascades",
      "Ideal half-day route",
    ],
    notes: "Best single route recommendation for a March day trip.",
  },
  {
    id: "route-c",
    label: "C",
    name: "Upper Lakes Loop",
    durationHours: 3,
    distanceKm: 8,
    difficulty: "moderate",
    startEntrance: 2,
    lakesVisited: "Upper Lakes — Prošcansko jezero to Okrugljak",
    includesBoat: false,
    includesShuttle: true,
    marchRecommended: false,
    description:
      "Covers the upper 12 lakes with more forested walking and fewer dramatic cascades than the lower section. More peaceful and less visited. The upper lakes are wider and more forest-ringed — a different aesthetic to the lower lakes.",
    highlights: [
      "Prošcansko jezero — largest of the 16 lakes",
      "Forested trail atmosphere",
      "Far fewer visitors than lower section",
      "Different visual character — wider, quieter lakes",
    ],
    notes:
      "Some upper trail sections may have partial closures in March due to ice. Check at entrance before committing.",
  },
  {
    id: "route-e",
    label: "E",
    name: "Full Park Loop (Lower + Upper)",
    durationHours: 6,
    distanceKm: 18,
    difficulty: "strenuous",
    startEntrance: 1,
    lakesVisited: "All 16 Plitvice Lakes",
    includesBoat: true,
    includesShuttle: true,
    marchRecommended: false,
    description:
      "The complete park experience — all 16 lakes, both upper and lower sections, boat crossing, and shuttle rides. A full day (6 hours of walking). In March this is ambitious given potential closures and short daylight hours.",
    highlights: [
      "Complete 16-lake experience",
      "Every major waterfall and cascade",
      "Both lake character types — dramatic lower and peaceful upper",
    ],
    notes:
      "Ambitious for March. Recommend Route B (lower) plus Optional Route C (upper) as separate sections rather than the full E loop in winter conditions.",
  },
  {
    id: "route-f",
    label: "F",
    name: "Upper Lakes Shuttle Loop",
    durationHours: 3,
    distanceKm: 12.4,
    difficulty: "moderate",
    startEntrance: 2,
    lakesVisited: "Upper Lakes with shuttle connections",
    includesBoat: false,
    includesShuttle: true,
    marchRecommended: false,
    description:
      "Uses shuttle buses extensively to cover the upper lake area with less walking. Useful for those with limited mobility or energy reserves. Good backup if trail closures limit Route C.",
    highlights: [
      "Less physically demanding than Route C",
      "Good panoramic viewpoints from shuttle stops",
      "Accessible for various fitness levels",
    ],
    notes: "Shuttle schedule is reduced in March — verify at Entrance 2.",
  },
] as const satisfies ParkRoute[];

export const ticketPricing: TicketInfo[] = [
  {
    period: "November – March (Off-peak)",
    adultEur: 20,
    studentEur: 12,
    childEur: 10,
    childFreeUnder: 7,
    notes:
      "March off-peak pricing. Student ID required at gate for reduced rate. Boat and shuttle included in ticket price.",
  },
  {
    period: "April – May (Shoulder)",
    adultEur: 30,
    studentEur: 18,
    childEur: 15,
    childFreeUnder: 7,
    notes: "Shoulder season pricing from April.",
  },
  {
    period: "June – August (Peak)",
    adultEur: 40,
    studentEur: 25,
    childEur: 20,
    childFreeUnder: 7,
    notes: "Peak summer pricing. Pre-booking essential in July–August.",
  },
] as const satisfies TicketInfo[];

export const transportServices: TransportService[] = [
  {
    id: "kozjak-boat",
    name: "Kozjak Lake Electric Boat",
    type: "boat",
    route: "ST2 (Entrance 1 side) ↔ ST3 (Upper Lakes side) across Kozjak lake",
    marchSchedule:
      "Reduced schedule — approximately every 30–60 min. Check at Entrance 1 or ST2 landing.",
    included: true,
    notes:
      "The most scenic transport option. Crossing takes ~15 minutes. Can be cancelled in bad weather. Plan your route without it and treat it as a bonus.",
  },
  {
    id: "shuttle-bus-1",
    name: "Electric Shuttle Bus (Lower Section)",
    type: "shuttle-bus",
    route: "Entrance 1 ↔ Entrance 2 ↔ ST4 (between lake sections)",
    marchSchedule:
      "Reduced winter schedule. Typically runs every 20–30 min at peak times. Check current schedule at entrance.",
    included: true,
    notes:
      "Essential for connecting upper and lower lake sections without doubling back on foot. Very useful for Route E or F.",
  },
] as const satisfies TransportService[];

export const hiddenGems: HiddenGem[] = [
  {
    id: "entrance-1-viewpoint",
    name: "Entrance 1 Panoramic Viewpoint",
    description:
      "The elevated viewing platform just inside Entrance 1 gives the best aerial-style view over the upper lakes cascading down. This is the viewpoint from most Plitvice promotional photos — and it's free from the entrance area without buying a ticket.",
    location: "Entrance 1, immediate left after gate",
    bestTime: "Early morning (08:00–09:00) or golden hour (16:00–17:00)",
    crowdLevel: "low",
    tip: "Arrive before 09:00 to have the viewpoint entirely to yourself. Tour groups don't arrive until 10:00.",
  },
  {
    id: "kozjak-east-bank",
    name: "Kozjak Lake East Bank — Quiet Shore",
    description:
      "The eastern shoreline of Kozjak lake is walked by most visitors but few stop to sit at the water's edge. In March, with the lake reflecting the bare trees and the waterfalls audible in the distance, this is one of the most peaceful spots in the park.",
    location: "Kozjak lake eastern boardwalk, Route B",
    bestTime: "Any time — quieter after 13:00 when morning groups have moved on",
    crowdLevel: "low",
    tip: "Bring lunch here — eating beside the lake with no-one around is unmistakably special.",
  },
  {
    id: "novakovica-brod-cascade",
    name: "Novakovica Brod Cascade",
    description:
      "At the very bottom of the lower lake system, a series of cascades over travertine ledges that most visitors pass quickly. In March with full snowmelt flow, these cascades are roaring. The mist creates a microclimate — warmer and wetter than the surrounding air.",
    location: "Bottom of Lower Lakes — Route A/B",
    bestTime: "Midday when sunlight catches the mist",
    crowdLevel: "moderate",
    tip: "Stand on the lower viewpoint platform and look up — the view upward through the cascades is dramatic and underappreciated.",
  },
  {
    id: "veliki-slap-lower-platform",
    name: "Veliki Slap Lower Viewing Platform",
    description:
      "Croatia's highest waterfall (78 m) has multiple viewing angles. The lower platform, just above the river exit, gives the most dramatic upward view of the full fall. Most visitors stop at the main upper platform — continue to the lower one for a completely different perspective.",
    location: "Veliki Slap — lower platform, 5 min beyond the main viewpoint",
    bestTime: "Morning — light from the east illuminates the fall face",
    crowdLevel: "always-empty",
    tip: "It is genuinely almost always empty. 5 extra minutes of walking for a dramatically better view.",
  },
  {
    id: "milino-jezero-reflection",
    name: "Milino Jezero Reflection Point",
    description:
      "One of the smaller upper lakes where the water is shallow enough to see the travertine bed clearly and the reflections of surrounding trees are mirror-perfect. Particularly striking on still morning days in March.",
    location: "Upper Lakes section — between Entrance 2 and Prošcansko",
    bestTime: "Early morning when the water is completely still",
    crowdLevel: "always-empty",
    tip: "Bring out the camera here — this is a postcard shot that almost nobody takes because they've hurried past.",
  },
] as const satisfies HiddenGem[];

export const parkFacilities: ParkFacility[] = [
  {
    id: "licka-kuca",
    name: "Licka Kuca Restaurant",
    location: "Entrance 1",
    openInMarch: true,
    notes:
      "Traditional Lika restaurant, open since 1972. Closed Tuesdays. Complimentary cream cheese starter. Best apple strudel in the area.",
  },
  {
    id: "park-cafe-entrance-1",
    name: "Park Café (Entrance 1)",
    location: "Entrance 1 visitor centre",
    openInMarch: true,
    notes:
      "Basic café with hot drinks, sandwiches, and snacks. Limited menu in March. Good for warming up between trails.",
  },
  {
    id: "park-cafe-entrance-2",
    name: "Park Café (Entrance 2)",
    location: "Entrance 2",
    openInMarch: false,
    notes:
      "Often closed or limited in March. Do not rely on this for food or hot drinks.",
  },
  {
    id: "visitor-centre",
    name: "Park Visitor Centre",
    location: "Entrance 1",
    openInMarch: true,
    notes:
      "Maps, information, ticket purchase, and ranger advice. Staff can advise on current trail conditions and closures.",
  },
  {
    id: "toilets",
    name: "Public Toilets",
    location: "Both entrances and ST2 boat station",
    openInMarch: true,
    notes: "Available at entrance areas and the main boat station.",
  },
  {
    id: "souvenir-shop",
    name: "Souvenir Shop",
    location: "Entrance 1",
    openInMarch: true,
    notes:
      "Park merchandise, local honey, lavender, and souvenirs. Good quality local products.",
  },
] as const satisfies ParkFacility[];

export const parkEssentialFacts = {
  officialName: "Plitvicka Jezera National Park",
  unescoStatus: "UNESCO World Heritage Site since 1979",
  numberOfLakes: 16,
  largestLakeKm2: 0.82,
  highestWaterfallM: 78,
  highestWaterfallName: "Veliki Slap",
  totalAreaKm2: 296.85,
  entrances: 2,
  marchOpeningTime: "08:00",
  marchClosingTime: "16:00",
  websiteUrl: "https://np-plitvicka-jezera.hr/en/",
  phoneEntrance1: "+385 (0)53 751 015",
  emergencyNumber: "112",
  nearestTown: "Korenica (10 km)",
  nearestHospital: "Gospic Hospital (40 km)",
} as const;
