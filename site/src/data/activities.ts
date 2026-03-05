export type ActivityCategory =
  | "scenic-stop"
  | "museum"
  | "nature"
  | "adventure"
  | "free"
  | "evening";

export interface Activity {
  id: string;
  name: string;
  category: ActivityCategory;
  description: string;
  location: string;
  distanceFromPark?: string;
  costPerPerson: string;
  costNote?: string;
  duration: string;
  openingHours?: string;
  phone?: string;
  parkingInfo?: string;
  bestTime?: string;
  onRoute: boolean;
  requiresBooking: boolean;
  included: boolean; // default toggle state — show in itinerary by default
  highlights: string[];
}

export const activities: Activity[] = [
  {
    id: "rastoke-village",
    name: "Rastoke Village & Waterfalls",
    category: "scenic-stop",
    description:
      "A magical village where the Slunjcica river splits into dozens of cascades and waterfalls flowing between traditional stone mills and wooden houses. Called 'Small Plitvice' by locals.",
    location: "Rastoke, Slunj",
    distanceFromPark: "On-route — 40 km north of Plitvice (stop on the way)",
    costPerPerson: "€5",
    costNote: "Village entrance fee",
    duration: "1–1.5 hours",
    openingHours: "Open year-round",
    parkingInfo: "Parking available at €2/hour",
    bestTime: "Morning — stop on the drive south to Plitvice",
    onRoute: true,
    requiresBooking: false,
    included: true,
    highlights: [
      "Waterfalls running between traditional village houses",
      "Working stone mills still in operation",
      "Excellent photography spot — particularly photogenic in winter/early spring",
      "Called 'Small Plitvice' for a reason — genuinely spectacular",
      "Perfect 1-hour break on the drive down",
    ],
  },
  {
    id: "ogulin-fairy-tale-museum",
    name: "Ogulin Fairy Tale Museum",
    category: "museum",
    description:
      "Dedicated to Ivana Brlic-Mazuranic, the Croatian Hans Christian Andersen. Charming interactive museum in a medieval castle in Ogulin town centre, birthplace of Croatian fairy tales.",
    location: "Ogulin town centre",
    distanceFromPark: "Halfway on the Zagreb–Plitvice route",
    costPerPerson: "€5–10",
    duration: "45–60 minutes",
    openingHours: "Tuesday–Sunday, 10:00–17:00",
    onRoute: true,
    requiresBooking: false,
    included: false,
    highlights: [
      "Located in a genuine medieval castle",
      "Dedicated to Croatia's greatest fairy tale author",
      "Interactive exhibits suitable for any age",
      "Ogulin town itself is worth 20 minutes of wandering",
      "Good coffee stop opportunity in town",
    ],
  },
  {
    id: "dulin-ponor",
    name: "Dulin Ponor (Cave Entrance)",
    category: "nature",
    description:
      "A dramatic natural cave entrance (ponor) on the outskirts of Ogulin where a river disappears underground. A striking geological feature with minimal tourist infrastructure — raw and atmospheric.",
    location: "Ogulin outskirts",
    distanceFromPark: "Same location as Ogulin — on-route stop",
    costPerPerson: "Free",
    duration: "20–30 minutes",
    onRoute: true,
    requiresBooking: false,
    included: false,
    highlights: [
      "Free to visit — no ticket required",
      "Watch a river literally vanish into the earth",
      "Combine with Fairy Tale Museum — same town, different feel",
      "Atmospheric and undervisited",
    ],
  },
  {
    id: "barac-caves",
    name: "Barac Caves (Baraceve Spilje)",
    category: "adventure",
    description:
      "A guided cave system 10 km from the Plitvice park entrance. Two connected caves with impressive stalactites and stalagmites. One of Croatia's most visited cave systems outside Postojna.",
    location: "Rakovica, 10 km from park entrance",
    distanceFromPark: "10 km",
    costPerPerson: "€13.50 adult / €10 student",
    costNote: "Includes Speleon Visitor Centre",
    duration: "1 hour (guided tour)",
    openingHours: "Likely Fridays only in March — call ahead to confirm",
    phone: "+385 47 782 113",
    bestTime: "Afternoon — book the first tour of the day",
    onRoute: false,
    requiresBooking: true,
    included: false,
    highlights: [
      "Impressive stalactite and stalagmite formations",
      "Guided tour provides geological and historical context",
      "Includes Speleon Visitor Centre at no extra cost",
      "10 km from park entrance — easy side trip",
      "Call to confirm March schedule before visiting",
    ],
  },
  {
    id: "speleon-visitor-centre",
    name: "Speleon Visitor Centre",
    category: "museum",
    description:
      "Interactive visitor centre at the Barac Caves site covering cave ecology, karst geology, and the underground world of Croatia. Included with cave ticket.",
    location: "Rakovica (Barac Caves site)",
    distanceFromPark: "10 km",
    costPerPerson: "Included with Barac Caves ticket",
    duration: "45 minutes",
    openingHours: "Year-round, 10:00–18:00",
    onRoute: false,
    requiresBooking: false,
    included: false,
    highlights: [
      "Included with Barac Caves entry — no extra cost",
      "Interactive exhibits on karst geology",
      "Good for context before or after the cave tour",
      "Year-round opening — more reliable than the caves in March",
    ],
  },
  {
    id: "stargazing",
    name: "Stargazing at the Park",
    category: "evening",
    description:
      "The Plitvice Lakes area has minimal light pollution and the Lika region sky on a clear March night is extraordinary. No equipment needed — just step outside your accommodation after dark.",
    location: "Park area / accommodation surroundings",
    costPerPerson: "Free",
    duration: "Evening — as long as you like",
    bestTime: "After 21:00 on a clear night",
    onRoute: true,
    requiresBooking: false,
    included: true,
    highlights: [
      "Minimal light pollution — genuine dark sky area",
      "March nights are clear and cold — ideal for stargazing",
      "Milky Way visible on moonless nights",
      "Free activity — just bring warm layers",
      "Perfect end to a park day",
    ],
  },
  {
    id: "park-entrance-viewpoint",
    name: "Entrance 1 Morning Viewpoint",
    category: "free",
    description:
      "The elevated viewpoint just inside Entrance 1 of Plitvice Lakes gives a sweeping panorama over the upper lakes in the morning light. No full ticket required for just the viewpoint area — check current access rules.",
    location: "Plitvice Lakes National Park — Entrance 1",
    costPerPerson: "Free (viewpoint access — no full ticket needed)",
    duration: "20 minutes",
    bestTime: "Early morning — 08:00–09:00 for best light and fewest people",
    onRoute: true,
    requiresBooking: false,
    included: true,
    highlights: [
      "Best panoramic view over the upper lakes",
      "Morning mist over the water in March — exceptional",
      "No ticket required for the immediate viewpoint area",
      "Arrive before tour groups — before 09:00",
      "The view that appears in most Plitvice promotional photos",
    ],
  },
] as const satisfies Activity[];
