export type PackingCategory =
  | "clothing"
  | "footwear"
  | "gear"
  | "documents"
  | "toiletries"
  | "food"
  | "tech";

export interface PackingItem {
  id: string;
  label: string;
  category: PackingCategory;
  essential: boolean;
  checked: boolean; // default state for checklist
  note?: string;
  hers?: boolean; // specific to Ivana if true
  his?: boolean; // specific to Ivan if true
}

export interface WeatherPeriod {
  month: string;
  avgHighC: number;
  avgLowC: number;
  rainyDays: number;
  snowPossible: boolean;
  description: string;
}

export interface TrailCondition {
  id: string;
  name: string;
  status: "open" | "limited" | "closed" | "check-locally";
  notes: string;
}

export const marchWeather: WeatherPeriod = {
  month: "March",
  avgHighC: 9,
  avgLowC: 1,
  rainyDays: 10,
  snowPossible: true,
  description:
    "Early March at Plitvice is cold, crisp, and often stunning. Expect temperatures between 1°C at night and 9°C during the day. Snow is possible but not guaranteed — late February and early March sometimes bring a dusting that makes the waterfalls and lakes extraordinarily photogenic. Rain is common (around 10 rainy days per month). The park is quiet, uncrowded, and at its most atmospheric. Waterfalls are at full flow from snowmelt.",
};

export const trailConditions: TrailCondition[] = [
  {
    id: "lower-lakes-boardwalks",
    name: "Lower Lakes Boardwalks",
    status: "open",
    notes:
      "Generally open in March. Boardwalks can be icy early morning — waterproof grippy footwear essential. Some sections may be temporarily closed after heavy rain or ice.",
  },
  {
    id: "upper-lakes-trails",
    name: "Upper Lakes Trails",
    status: "limited",
    notes:
      "Upper lake trails (Routes C, E, F) may have partial closures in early March due to ice or snow. Check at the park entrance on arrival — staff have current information.",
  },
  {
    id: "kozjak-boat",
    name: "Kozjak Lake Boat Crossing",
    status: "check-locally",
    notes:
      "Electric boats run reduced schedules in March. Check at Entrance 1 or 2 for the current schedule. Not all crossings are guaranteed — plan without the boat and treat it as a bonus.",
  },
  {
    id: "electric-shuttle",
    name: "Electric Shuttle (between lake sections)",
    status: "check-locally",
    notes:
      "Shuttles run on reduced winter schedules. Check the current timetable at the park entrance. Useful for conserving energy between upper and lower sections.",
  },
  {
    id: "veliki-slap",
    name: "Veliki Slap Viewpoint (Croatia's Highest Waterfall)",
    status: "open",
    notes:
      "Almost always accessible. 10 minutes from Entrance 1. In March the waterfall is at full force — spectacular. The viewing platform can be slippery — take care.",
  },
] as const satisfies TrailCondition[];

export const packingList: PackingItem[] = [
  // --- CLOTHING ---
  {
    id: "waterproof-jacket",
    label: "Waterproof / windproof jacket",
    category: "clothing",
    essential: true,
    checked: false,
    note: "Non-negotiable — March weather changes fast. Must be fully waterproof, not just water-resistant.",
  },
  {
    id: "thermal-base-layer",
    label: "Thermal base layer (top + bottom)",
    category: "clothing",
    essential: true,
    checked: false,
    note: "Merino wool or synthetic — cotton gets cold when wet",
  },
  {
    id: "mid-layer-fleece",
    label: "Mid layer fleece or down jacket",
    category: "clothing",
    essential: true,
    checked: false,
    note: "Layering is key — temperatures swing 8°C between morning and afternoon",
  },
  {
    id: "waterproof-trousers",
    label: "Waterproof over-trousers or hiking trousers",
    category: "clothing",
    essential: true,
    checked: false,
    note: "Boardwalks can spray — waterproof trousers keep you comfortable all day",
  },
  {
    id: "warm-hat",
    label: "Warm hat / beanie",
    category: "clothing",
    essential: true,
    checked: false,
  },
  {
    id: "gloves",
    label: "Waterproof gloves or liner gloves",
    category: "clothing",
    essential: true,
    checked: false,
    note: "Hands get cold fast on morning boardwalks — pack these",
  },
  {
    id: "neck-gaiter",
    label: "Neck gaiter / buff",
    category: "clothing",
    essential: false,
    checked: false,
  },
  {
    id: "smart-casual-dinner",
    label: "Smart-casual outfit for anniversary dinner",
    category: "clothing",
    essential: true,
    checked: false,
    note: "Restaurant Degenija is a proper restaurant — dress nicely",
  },
  {
    id: "warm-socks",
    label: "Warm hiking socks (2–3 pairs)",
    category: "clothing",
    essential: true,
    checked: false,
    note: "Wool blend preferred — keeps feet warm even if slightly damp",
  },
  {
    id: "underwear-extra",
    label: "Extra underwear and base layers",
    category: "clothing",
    essential: true,
    checked: false,
  },

  // --- FOOTWEAR ---
  {
    id: "waterproof-hiking-boots",
    label: "Waterproof hiking boots (ankle support)",
    category: "footwear",
    essential: true,
    checked: false,
    note: "The most important item for Plitvice. Boardwalks are wet, icy, and slippery. Do not attempt in trainers or flat shoes.",
  },
  {
    id: "comfortable-shoes-evening",
    label: "Comfortable shoes / trainers for evening",
    category: "footwear",
    essential: false,
    checked: false,
    note: "Give your feet a break from boots at dinner and the hotel",
  },
  {
    id: "hotel-slippers",
    label: "Compact slippers or flip-flops for hotel",
    category: "footwear",
    essential: false,
    checked: false,
  },

  // --- GEAR ---
  {
    id: "daypack",
    label: "Daypack (20–30L)",
    category: "gear",
    essential: true,
    checked: false,
    note: "For carrying water, snacks, spare layers, and camera during the park walk",
  },
  {
    id: "reusable-water-bottles",
    label: "Reusable water bottles (x2)",
    category: "gear",
    essential: true,
    checked: false,
    note: "The park has water refill points — bring bottles to reduce waste",
  },
  {
    id: "trekking-poles",
    label: "Trekking poles (optional)",
    category: "gear",
    essential: false,
    checked: false,
    note: "Useful on icy boardwalks — one pair between two is enough",
  },
  {
    id: "microfibre-towel",
    label: "Small microfibre towel",
    category: "gear",
    essential: false,
    checked: false,
  },
  {
    id: "camera",
    label: "Camera / charged phone",
    category: "gear",
    essential: true,
    checked: false,
    note: "Cold drains batteries faster — keep phone in inner pocket",
  },
  {
    id: "portable-charger",
    label: "Portable power bank",
    category: "gear",
    essential: true,
    checked: false,
    note: "A full day of navigation, photos, and cold weather will drain any battery",
  },
  {
    id: "headtorch",
    label: "Head torch / flashlight",
    category: "gear",
    essential: false,
    checked: false,
    note: "Useful for stargazing and early morning walks",
  },

  // --- DOCUMENTS ---
  {
    id: "id-cards",
    label: "National ID cards or passports",
    category: "documents",
    essential: true,
    checked: false,
    note: "Croatia is in the Schengen Area — ID cards sufficient for Croatian/EU citizens",
  },
  {
    id: "student-id",
    label: "Student ID (Ivana) for park discount",
    category: "documents",
    essential: true,
    checked: false,
    hers: true,
    note: "Saves €8 on park entrance — don't forget this",
  },
  {
    id: "booking-confirmations",
    label: "Hotel booking confirmation (printed or saved offline)",
    category: "documents",
    essential: true,
    checked: false,
    note: "Have the confirmation number ready at check-in",
  },
  {
    id: "restaurant-reservation",
    label: "Restaurant Degenija reservation confirmation",
    category: "documents",
    essential: true,
    checked: false,
    note: "Save the confirmation and the restaurant phone number",
  },
  {
    id: "health-card",
    label: "European Health Insurance Card (EHIC)",
    category: "documents",
    essential: false,
    checked: false,
    note: "Worthwhile to carry — covers medical treatment in Croatia for EU citizens",
  },

  // --- TOILETRIES ---
  {
    id: "sunscreen",
    label: "Sunscreen SPF 30+",
    category: "toiletries",
    essential: false,
    checked: false,
    note: "Snow and water reflect UV — even in March, sunscreen on exposed skin makes sense",
  },
  {
    id: "lip-balm",
    label: "Lip balm with SPF",
    category: "toiletries",
    essential: true,
    checked: false,
    note: "Cold wind dries lips fast — carry this in your jacket pocket",
  },
  {
    id: "hand-cream",
    label: "Hand cream / moisturiser",
    category: "toiletries",
    essential: false,
    checked: false,
    note: "Cold and wind dry hands quickly — especially after constant waterproof glove use",
  },
  {
    id: "first-aid-basics",
    label: "Basic first aid: plasters, ibuprofen, antihistamine",
    category: "toiletries",
    essential: true,
    checked: false,
    note: "Blisters from hiking boots are the number one issue — pack plasters",
  },
  {
    id: "hand-sanitiser",
    label: "Hand sanitiser / small wet wipes",
    category: "toiletries",
    essential: false,
    checked: false,
  },

  // --- FOOD ---
  {
    id: "trail-snacks",
    label: "Trail snacks: nuts, dried fruit, energy bars",
    category: "food",
    essential: true,
    checked: false,
    note: "Park kiosks are limited in March — bring enough food for a full day on the trails",
  },
  {
    id: "thermos-hot-drinks",
    label: "Thermos flask with hot drink",
    category: "food",
    essential: false,
    checked: false,
    note: "A hot coffee or tea on a cold March boardwalk is genuinely wonderful",
  },
  {
    id: "packed-lunch",
    label: "Packed lunch ingredients (bread, cheese, charcuterie)",
    category: "food",
    essential: false,
    checked: false,
    note: "Buy from supermarket night before — eating by the lake beats any café",
  },

  // --- TECH ---
  {
    id: "offline-maps",
    label: "Offline maps downloaded (Maps.me or Google Maps offline)",
    category: "tech",
    essential: true,
    checked: false,
    note: "Mobile data is unreliable in the park — download the Plitvice area offline",
  },
  {
    id: "car-charger",
    label: "Car phone charger / USB cable",
    category: "tech",
    essential: true,
    checked: false,
    note: "Charge devices on the 2.5-hour drive",
  },
  {
    id: "aux-cable",
    label: "AUX cable or Bluetooth adapter for road trip playlist",
    category: "tech",
    essential: false,
    checked: false,
  },
] as const satisfies PackingItem[];

export const weatherTips: string[] = [
  "Dress in layers — temperatures can swing 8°C between 08:00 and 14:00",
  "Waterproof boots are non-negotiable — the boardwalks are wet even on dry days",
  "Early morning (before 09:00) is the coldest but most magical time in the park",
  "March snow is possible and makes the park look extraordinary — embrace it",
  "Rain in the morning often clears by afternoon in March — don't let a grey start put you off",
  "Cold batteries: keep your phone in an inside pocket and bring a power bank",
  "The park is at peak waterfall volume in March due to snowmelt — the falls are louder and fuller than in summer",
];
