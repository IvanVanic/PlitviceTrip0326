export type RestaurantTag = "anniversary" | "casual" | "park-lunch" | "backup";

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  distanceFromPark: string;
  rating?: string;
  priceRange: string;
  cuisine: string;
  veggieOptions: string[];
  atmosphere: string;
  phone?: string;
  tag?: RestaurantTag;
  highlights: string[];
}

export const restaurants: Restaurant[] = [
  {
    id: "restaurant-degenija",
    name: "Restaurant Degenija",
    location: "Seliste Dreznicko 39",
    distanceFromPark: "5 km",
    rating: "9.2/10",
    priceRange: "€50–65 for two",
    cuisine: "Croatian / Lika regional",
    veggieOptions: [
      "Fresh river trout",
      "Homemade gnocchi",
      "Cheese dishes",
      "Pizza",
    ],
    atmosphere:
      "Intimate boutique restaurant attached to Hotel Degenija — warm lighting, attentive service, romantic setting",
    phone: "+385 (0)47 782 060",
    tag: "anniversary",
    highlights: [
      "Documented for surprising couples with complimentary prosecco",
      "Order peka (slow-cooked meat under bell) 24–48 hours in advance",
      "Kremsnita dessert is a must-order",
      "Perfect for an anniversary dinner — staff go the extra mile",
      "Pairs perfectly with a stay at Hotel Degenija next door",
    ],
  },
  {
    id: "bistro-plum",
    name: "Bistro Plum",
    location: "Seliste Dreznicko 59, Rakovica",
    distanceFromPark: "Near Rakovica",
    rating: "4.5/5 TripAdvisor (966+ reviews)",
    priceRange: "€30–40 for two",
    cuisine: "Mediterranean / Croatian",
    veggieOptions: ["Truffle gnocchi", "Risotto", "Pasta"],
    atmosphere:
      "Cozy lounge vibe with sofas, good cocktail menu, and relaxed evening atmosphere",
    tag: "casual",
    highlights: [
      "TripAdvisor Travellers' Choice 2024",
      "966+ reviews — consistently excellent",
      "Reservations recommended, especially on weekends",
      "Great cocktails and wine selection",
      "Ideal for a relaxed evening without formality",
    ],
  },
  {
    id: "licka-kuca",
    name: "Licka Kuca",
    location: "At Entrance 1, Plitvicka Jezera",
    distanceFromPark: "At the park entrance",
    rating: "4.2/5",
    priceRange: "€25–35 for two",
    cuisine: "Traditional Lika / rustic Croatian",
    veggieOptions: ["Fresh trout", "Cheese plates", "Apple strudel"],
    atmosphere:
      "Timber barn interior with open fireplace and live folk music — unmistakably Croatian",
    phone: "+385 99 2767 406",
    tag: "park-lunch",
    highlights: [
      "Open since 1972 — a genuine institution",
      "Complimentary cream cheese starter for every table",
      "Best apple strudel in the area",
      "Perfect for lunch between park walks",
      "Closed on Tuesdays — plan accordingly",
      "Fireplace seating in winter/early spring",
    ],
  },
  {
    id: "fenomen-plitvice",
    name: "Fenomen Plitvice",
    location: "On park property, Plitvicka Jezera",
    distanceFromPark: "On-site",
    cuisine: "Elevated local / organic Croatian",
    priceRange: "4-course set dinner — contact for pricing",
    veggieOptions: ["Trout", "Vegetarian menu options available"],
    atmosphere:
      "Formal yet intimate — private server, candlelit tables with floral arrangements, fully curated experience",
    tag: "backup",
    highlights: [
      "Private server for your table",
      "Candles and fresh floral arrangements",
      "4-course curated dinner experience",
      "On-park location — no driving after dinner",
      "Contact directly for March availability and reservations",
    ],
  },
  {
    id: "bistro-old-shatterhand",
    name: "Bistro Old Shatterhand",
    location: "Rakovica",
    distanceFromPark: "Near Rakovica",
    priceRange: "Budget-friendly",
    cuisine: "Pizza / Burgers / Casual",
    veggieOptions: ["Vegetarian pizza", "Salads"],
    atmosphere:
      "Relaxed casual bistro — no-fuss dining, quick service, friendly prices",
    tag: "backup",
    highlights: [
      "Budget-friendly option when you want something simple",
      "Good for a quick lunch or low-key dinner",
      "Pizza and burgers done well",
    ],
  },
] as const satisfies Restaurant[];
