export type BudgetCategory =
  | "driving"
  | "tickets"
  | "food"
  | "activities"
  | "accommodation"
  | "gear";

export type BudgetPayer = "his" | "hers" | "shared";

export interface BudgetItem {
  id: string;
  label: string;
  category: BudgetCategory;
  payer: BudgetPayer;
  costLow: number;
  costHigh: number;
  note?: string;
  included: boolean; // toggleable in calculator
  optional: boolean;
}

export const budgetItems: BudgetItem[] = [
  // --- DRIVING ---
  {
    id: "fuel",
    label: "Fuel (Zagreb → Plitvice → Zagreb)",
    category: "driving",
    payer: "his",
    costLow: 38,
    costHigh: 38,
    note: "Estimated based on ~280 km round trip at current petrol prices",
    included: true,
    optional: false,
  },
  {
    id: "tolls",
    label: "Motorway Tolls (A1 Zagreb–Karlovac section)",
    category: "driving",
    payer: "his",
    costLow: 9,
    costHigh: 9,
    note: "Croatian motorway toll for the A1 section",
    included: true,
    optional: false,
  },
  {
    id: "parking",
    label: "Parking (at park + Rastoke)",
    category: "driving",
    payer: "his",
    costLow: 9,
    costHigh: 9,
    note: "Park parking + Rastoke €2/hr for ~1.5 hrs",
    included: true,
    optional: false,
  },

  // --- TICKETS ---
  {
    id: "park-tickets",
    label: "Park Entrance — Student (Ivana) + Full (Ivan)",
    category: "tickets",
    payer: "his",
    costLow: 32,
    costHigh: 32,
    note: "€12 student + €20 full price — March off-peak rate",
    included: true,
    optional: false,
  },

  // --- FOOD ---
  {
    id: "anniversary-dinner",
    label: "Special Dinner (Restaurant Degenija)",
    category: "food",
    payer: "his",
    costLow: 50,
    costHigh: 65,
    note: "Estimated for two including drinks — book in advance",
    included: true,
    optional: false,
  },
  {
    id: "casual-dinner",
    label: "Casual Dinner (Bistro Plum or similar)",
    category: "food",
    payer: "his",
    costLow: 30,
    costHigh: 40,
    note: "Mediterranean/Croatian casual dining for two",
    included: true,
    optional: false,
  },
  {
    id: "groceries",
    label: "Groceries & Packed Lunch",
    category: "food",
    payer: "his",
    costLow: 20,
    costHigh: 25,
    note: "Supermarket stop for snacks, breakfast items, park lunch supplies",
    included: true,
    optional: false,
  },
  {
    id: "coffees-snacks",
    label: "Coffees, Hot Drinks & Snacks",
    category: "food",
    payer: "his",
    costLow: 10,
    costHigh: 15,
    note: "Café stops, park kiosk drinks, general snacking",
    included: true,
    optional: false,
  },

  // --- ACTIVITIES ---
  {
    id: "rastoke-entry",
    label: "Rastoke Village Entry",
    category: "activities",
    payer: "his",
    costLow: 10,
    costHigh: 13,
    note: "€5/person entry + €2/hr parking (est. 1.5 hrs = €3)",
    included: true,
    optional: false,
  },
  {
    id: "ogulin-museum",
    label: "Ogulin Fairy Tale Museum",
    category: "activities",
    payer: "his",
    costLow: 10,
    costHigh: 20,
    note: "€5–10/person — check current prices",
    included: false,
    optional: true,
  },
  {
    id: "barac-caves",
    label: "Barac Caves Entry",
    category: "activities",
    payer: "his",
    costLow: 20,
    costHigh: 27,
    note: "€10 student + €13.50 full — call ahead for March schedule",
    included: false,
    optional: true,
  },

  // --- ACCOMMODATION ---
  {
    id: "accommodation",
    label: "Accommodation (1 night)",
    category: "accommodation",
    payer: "hers",
    costLow: 150,
    costHigh: 200,
    note: "Budget range covering all 5 options — see Accommodation section for specifics",
    included: true,
    optional: false,
  },

  // --- GEAR ---
  {
    id: "his-hiking-boots",
    label: "Ivan's Hiking Boots (Decathlon)",
    category: "gear",
    payer: "his",
    costLow: 45,
    costHigh: 66,
    note: "Quechua waterproof hiking boots — available in Rijeka Decathlon",
    included: false,
    optional: true,
  },
  {
    id: "his-jacket",
    label: "Ivan's Waterproof Jacket (Decathlon)",
    category: "gear",
    payer: "his",
    costLow: 50,
    costHigh: 93,
    note: "Forclaz or Quechua hiking jacket — waterproof, packable",
    included: false,
    optional: true,
  },
  {
    id: "her-hiking-boots",
    label: "Ivana's Hiking Boots (Decathlon)",
    category: "gear",
    payer: "shared",
    costLow: 60,
    costHigh: 80,
    note: "Women's waterproof hiking boots — check Decathlon Rijeka stock",
    included: false,
    optional: true,
  },
  {
    id: "her-jacket",
    label: "Ivana's Waterproof Jacket (Decathlon)",
    category: "gear",
    payer: "shared",
    costLow: 30,
    costHigh: 50,
    note: "Women's hiking/waterproof jacket",
    included: false,
    optional: true,
  },
] as const satisfies BudgetItem[];

/** Helper: sum the low and high totals for included items only */
export function calcBudgetTotals(items: BudgetItem[]): {
  lowTotal: number;
  highTotal: number;
  hisCost: { low: number; high: number };
  herCost: { low: number; high: number };
} {
  const included = items.filter((i) => i.included);
  return {
    lowTotal: included.reduce((sum, i) => sum + i.costLow, 0),
    highTotal: included.reduce((sum, i) => sum + i.costHigh, 0),
    hisCost: {
      low: included
        .filter((i) => i.payer === "his")
        .reduce((sum, i) => sum + i.costLow, 0),
      high: included
        .filter((i) => i.payer === "his")
        .reduce((sum, i) => sum + i.costHigh, 0),
    },
    herCost: {
      low: included
        .filter((i) => i.payer === "hers")
        .reduce((sum, i) => sum + i.costLow, 0),
      high: included
        .filter((i) => i.payer === "hers")
        .reduce((sum, i) => sum + i.costHigh, 0),
    },
  };
}
