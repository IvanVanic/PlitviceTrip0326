export type GearCategory =
  | "footwear"
  | "outerwear"
  | "layers"
  | "accessories"
  | "backpack";

export type GenderTarget = "men" | "women" | "unisex";

export type StoreLocation = "Rijeka" | "Zagreb" | "Online";

export interface GearStore {
  name: string;
  location: StoreLocation;
  address?: string;
  openingHours?: string;
  website?: string;
  notes: string;
}

export interface GearItem {
  id: string;
  name: string;
  brand: string;
  category: GearCategory;
  gender: GenderTarget;
  priceRangeEur: { low: number; high: number };
  priceTier: "budget" | "mid" | "premium";
  store: StoreLocation[];
  description: string;
  whyThisOne: string;
  for: "Ivan" | "Ivana" | "both";
  priority: "essential" | "recommended" | "optional";
  notes?: string;
}

export const gearStores: GearStore[] = [
  {
    name: "Decathlon Rijeka",
    location: "Rijeka",
    address: "Autopark 2, 51000 Rijeka (Kaufland / Autopark shopping area)",
    openingHours: "Mon–Sat 09:00–21:00, Sun 09:00–20:00",
    website: "https://www.decathlon.hr",
    notes:
      "Best option for price-to-quality ratio. Has a full hiking section with Quechua and Forclaz brands. Good stock of waterproof boots in standard sizes. Worth visiting 1–2 weeks before the trip to ensure stock availability and allow time for boot break-in.",
  },
  {
    name: "Sport Vision Rijeka",
    location: "Rijeka",
    address: "Tower Center Rijeka shopping mall",
    openingHours: "Mon–Sat 09:00–21:00, Sun 10:00–20:00",
    notes:
      "Stocks The North Face, Columbia, and Salomon. Higher price point than Decathlon. Good for premium rain jackets and mid-layers if budget allows.",
  },
  {
    name: "Intersport Rijeka",
    location: "Rijeka",
    address: "Delta shopping centre, Rijeka",
    openingHours: "Mon–Sat 09:00–21:00",
    notes:
      "Solid selection of hiking boots and outdoor clothing. Mid-range to premium pricing. Good for Gore-Tex boots if budget extends.",
  },
] as const satisfies GearStore[];

export const gearItems: GearItem[] = [
  // --- IVAN ---
  {
    id: "ivan-hiking-boots",
    name: "Quechua MH500 Waterproof Hiking Boots",
    brand: "Quechua (Decathlon)",
    category: "footwear",
    gender: "men",
    priceRangeEur: { low: 45, high: 66 },
    priceTier: "budget",
    store: ["Rijeka"],
    description:
      "Mid-cut waterproof hiking boots with ankle support. Sympatex or similar membrane keeps feet dry on wet boardwalks. Vibram-equivalent rubber sole provides grip on slippery wooden surfaces.",
    whyThisOne:
      "Decathlon offers exceptional value at this price point. The MH500 series handles Plitvice conditions — wet boardwalks, possible ice, mud — without any issue. Far better than trainers or fashion boots.",
    for: "Ivan",
    priority: "essential",
    notes:
      "Try on in store with hiking socks for correct fit. Break in for 2–3 days before the trip — even short walks around Rijeka. Size up half a size if between sizes.",
  },
  {
    id: "ivan-waterproof-jacket",
    name: "Forclaz MT500 Waterproof Jacket",
    brand: "Forclaz (Decathlon)",
    category: "outerwear",
    gender: "men",
    priceRangeEur: { low: 50, high: 93 },
    priceTier: "budget",
    store: ["Rijeka"],
    description:
      "Waterproof, windproof, and packable hiking jacket. 15,000 mm water column rating. Seam-sealed construction. Hood adjustable to fit over a hat or helmet.",
    whyThisOne:
      "The most important clothing purchase for Plitvice. Boardwalk spray, March rain, and waterfall mist will test any jacket. The Forclaz MT500 performs well above its price point. The packable design means it stows in a daypack pocket.",
    for: "Ivan",
    priority: "essential",
    notes:
      "Check sizing in-store — Decathlon jackets run slightly slim for broader shoulders. Size up if unsure.",
  },
  {
    id: "ivan-fleece",
    name: "Quechua MH100 Fleece Jacket",
    brand: "Quechua (Decathlon)",
    category: "layers",
    gender: "men",
    priceRangeEur: { low: 20, high: 35 },
    priceTier: "budget",
    store: ["Rijeka"],
    description:
      "Lightweight midlayer fleece for layering under the waterproof jacket. Packs small, insulates well when dry.",
    whyThisOne:
      "The layering system — thermal base + fleece + waterproof jacket — handles any March conditions at Plitvice. The fleece alone at €20–35 completes the system without breaking the budget.",
    for: "Ivan",
    priority: "recommended",
  },

  // --- IVANA ---
  {
    id: "ivana-hiking-boots",
    name: "Quechua MH500 Waterproof Hiking Boots (Women's)",
    brand: "Quechua (Decathlon)",
    category: "footwear",
    gender: "women",
    priceRangeEur: { low: 60, high: 80 },
    priceTier: "budget",
    store: ["Rijeka"],
    description:
      "Women's fit waterproof mid-cut hiking boot. Same technical specification as the men's version with women's-specific last (narrower heel, slightly wider forefoot). Waterproof membrane, grippy rubber sole.",
    whyThisOne:
      "Plitvice boardwalks are genuinely dangerous in flat shoes — they are permanently wet and often icy in March. Ankle support matters on the uneven wooden sections. This is the single most important purchase for the trip.",
    for: "Ivana",
    priority: "essential",
    notes:
      "Try in-store with hiking socks. Women's Quechua boots run true to size. Wear around the house or on short walks for 3–5 days before the trip to avoid blisters.",
  },
  {
    id: "ivana-waterproof-jacket",
    name: "Forclaz MT100 Waterproof Jacket (Women's)",
    brand: "Forclaz (Decathlon)",
    category: "outerwear",
    gender: "women",
    priceRangeEur: { low: 30, high: 50 },
    priceTier: "budget",
    store: ["Rijeka"],
    description:
      "Women's waterproof hiking jacket. Lighter and more packable than the MT500. Good for March conditions where the primary need is rain protection and wind resistance rather than heavy insulation.",
    whyThisOne:
      "Ivana will be wearing this all day on the boardwalks. A good waterproof jacket makes the difference between a miserable wet day and an enjoyable adventure. The women's Forclaz line is cut more specifically and performs well.",
    for: "Ivana",
    priority: "essential",
    notes:
      "Check if Ivana already owns a waterproof jacket — upgrade only if the existing one is not genuinely waterproof (not just water-resistant).",
  },
  {
    id: "ivana-fleece",
    name: "Quechua MH100 Fleece Jacket (Women's)",
    brand: "Quechua (Decathlon)",
    category: "layers",
    gender: "women",
    priceRangeEur: { low: 20, high: 30 },
    priceTier: "budget",
    store: ["Rijeka"],
    description:
      "Women's midlayer fleece in multiple colours. Lightweight, compressible, and quick-drying.",
    whyThisOne:
      "Completing the three-layer system for cold March days. The fleece can also be worn independently on milder afternoons when the waterproof layer can come off.",
    for: "Ivana",
    priority: "recommended",
  },

  // --- SHARED / BOTH ---
  {
    id: "shared-hiking-socks",
    name: "Quechua Merino Hiking Socks",
    brand: "Quechua (Decathlon)",
    category: "accessories",
    gender: "unisex",
    priceRangeEur: { low: 6, high: 12 },
    priceTier: "budget",
    store: ["Rijeka"],
    description:
      "Merino wool blend hiking socks with cushioned sole and arch support. Merino regulates temperature and resists odour far better than synthetic alternatives.",
    whyThisOne:
      "The right socks prevent blisters more than any other factor. Get 2 pairs each — wear one, pack one spare in the daypack.",
    for: "both",
    priority: "essential",
    notes: "Buy 2 pairs each — €12–24 total investment that pays for itself.",
  },
  {
    id: "shared-gloves",
    name: "Quechua SH100 Warm Hiking Gloves",
    brand: "Quechua (Decathlon)",
    category: "accessories",
    gender: "unisex",
    priceRangeEur: { low: 8, high: 15 },
    priceTier: "budget",
    store: ["Rijeka"],
    description:
      "Fleece-lined hiking gloves with water-repellent outer layer. Touchscreen-compatible fingertips for phone use without removing gloves.",
    whyThisOne:
      "Hands get cold fast on March boardwalks with wind off the lake. Touchscreen compatibility means no fumbling with bare hands for phone photos.",
    for: "both",
    priority: "essential",
    notes: "One pair each — €16–30 total.",
  },
  {
    id: "shared-hat",
    name: "Hiking Beanie / Warm Hat",
    brand: "Quechua (Decathlon)",
    category: "accessories",
    gender: "unisex",
    priceRangeEur: { low: 5, high: 10 },
    priceTier: "budget",
    store: ["Rijeka"],
    description:
      "Fleece-lined beanie suitable for temperatures down to -5°C. Covers ears fully.",
    whyThisOne:
      "A hat is the single most effective item for retaining body heat. Non-negotiable for March at altitude. €5–10 is trivial for the comfort it provides.",
    for: "both",
    priority: "essential",
  },
  {
    id: "shared-daypack",
    name: "Quechua NH Arpenaz 25L Daypack",
    brand: "Quechua (Decathlon)",
    category: "backpack",
    gender: "unisex",
    priceRangeEur: { low: 20, high: 30 },
    priceTier: "budget",
    store: ["Rijeka"],
    description:
      "25-litre daypack with rain cover, laptop sleeve (useful for camera storage), and multiple pockets. Padded back and shoulder straps for comfort over a full day.",
    whyThisOne:
      "One daypack between two people is ideal for Plitvice — water bottles, snacks, spare layers, camera, documents. The 25L is the right size — large enough for a full day, small enough to not be a burden on the boardwalks.",
    for: "both",
    priority: "recommended",
    notes:
      "Only needed if you don't already own a suitable daypack. Check existing bags first.",
  },
] as const satisfies GearItem[];

export const gearShoppingTips: string[] = [
  "Visit Decathlon Rijeka at least 1–2 weeks before the trip — not the day before. You need time to break in new boots.",
  "Always try hiking boots on with the hiking socks you plan to wear — different socks change the fit significantly.",
  "Size up half a size in boots if you're between sizes — feet swell during hiking.",
  "Break in new boots by wearing them around the house and on short walks before the trip — even 3 days of casual wear prevents blisters.",
  "The three-layer system (thermal base + fleece + waterproof jacket) is more effective than any single heavy jacket.",
  "Decathlon's return policy is generous — if something doesn't fit after trying it at home, you can return it.",
  "Check your existing wardrobe first — you may already have suitable layers, and only need the waterproof jacket and boots.",
  "Merino wool base layers are worth the extra cost over synthetics — they regulate temperature better and don't smell after a day of use.",
];
