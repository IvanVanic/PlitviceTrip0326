export type DayLabel = "Day 1 — Saturday" | "Day 2 — Sunday";

export interface TimeSlot {
  id: string;
  time: string;
  title: string;
  description: string;
  location?: string;
  drivingTime?: string;
  cost?: string;
  optional: boolean;
  activityId?: string; // links to activities.ts
  restaurantId?: string; // links to restaurants.ts
  accommodationId?: string; // links to accommodation.ts
  tips?: string[];
}

export interface ItineraryDay {
  day: number;
  label: DayLabel;
  theme: string;
  summary: string;
  slots: TimeSlot[];
}

export const itinerary: ItineraryDay[] = [
  {
    day: 1,
    label: "Day 1 — Saturday",
    theme: "Drive Down, Waterfalls & First Impressions",
    summary:
      "Morning departure from Rijeka, scenic stops on the way, arrive at Plitvice in the afternoon, check in, anniversary dinner.",
    slots: [
      {
        id: "d1-departure",
        time: "08:00",
        title: "Depart Rijeka",
        description:
          "Early start from Rijeka. Take the A6 east toward Karlovac then join the A1 south. Fill up with fuel before joining the motorway — it's cheaper in Rijeka.",
        drivingTime: "~2.5 hours to first stop (Rastoke)",
        cost: "Fuel ~€38, Tolls ~€9",
        optional: false,
        tips: [
          "Fill up in Rijeka — petrol is cheaper there than at motorway stations",
          "Grab coffee and pastries to eat in the car — saves time",
          "Check road conditions on HAK (Croatian Automobile Club) app before leaving",
        ],
      },
      {
        id: "d1-ogulin",
        time: "09:30",
        title: "Optional: Ogulin Stop (Fairy Tale Museum + Dulin Ponor)",
        description:
          "Ogulin is roughly halfway between Rijeka and Plitvice. The Fairy Tale Museum is in a medieval castle in the town centre. The Dulin Ponor cave entrance is a short walk from the museum — a river vanishes into the earth here.",
        location: "Ogulin",
        cost: "Museum €5–10/person, Dulin Ponor free",
        optional: true,
        activityId: "ogulin-fairy-tale-museum",
        tips: [
          "Museum opens at 10:00 — time your arrival accordingly",
          "Both Ogulin sites can be done in under 90 minutes total",
          "Grab lunch in Ogulin if skipping Rastoke",
        ],
      },
      {
        id: "d1-rastoke",
        time: "10:30",
        title: "Rastoke Village — 'Small Plitvice'",
        description:
          "Pull off the A1 at Slunj and drive 3 km to Rastoke village. Waterfalls cascade between traditional stone mills and wooden houses. A perfect photography stop and leg-stretch before the final push to the park.",
        location: "Rastoke, Slunj",
        drivingTime: "~3 km detour off the A1 motorway",
        cost: "€5/person entry + €2/hr parking",
        optional: false,
        activityId: "rastoke-village",
        tips: [
          "Park at the main car park — €2/hour",
          "Walk the full loop — don't just stay at the entrance",
          "The mills are still operational — fascinating to see up close",
          "Best photos from the bridge over the main cascade",
        ],
      },
      {
        id: "d1-arrival",
        time: "12:30",
        title: "Arrive at Plitvice & Check In",
        description:
          "Continue south to Hotel Degenija (or your chosen accommodation). Check in, leave bags, get oriented. The hotel is ~4 km from the park entrance.",
        location: "Hotel Degenija, Seliste Dreznicko",
        drivingTime: "~40 min from Rastoke",
        optional: false,
        accommodationId: "hotel-degenija",
        tips: [
          "Check-in is typically from 14:00 — call ahead if arriving early",
          "Ask hotel staff for the latest park conditions and trail closures",
          "Leave your heavy bags — take a daypack for the park",
        ],
      },
      {
        id: "d1-lunch",
        time: "13:00",
        title: "Lunch at Licka Kuca (or packed lunch)",
        description:
          "If driving straight to the park, grab lunch at Licka Kuca at Entrance 1 — open since 1972, traditional Lika cuisine with complimentary cream cheese starter. Alternatively, bring a packed lunch for the trails.",
        location: "Licka Kuca, Entrance 1",
        cost: "€25–35 for two",
        optional: false,
        restaurantId: "licka-kuca",
        tips: [
          "Licka Kuca is closed on Tuesdays — not an issue on Saturday",
          "The apple strudel is exceptional — save room for dessert",
          "Complimentary cream cheese starter comes automatically — enjoy it",
        ],
      },
      {
        id: "d1-park-afternoon",
        time: "14:00",
        title: "Plitvice Lakes — Afternoon Exploration",
        description:
          "Buy tickets at Entrance 1 (€12 student / €20 adult, March off-peak pricing). Walk Route A or B around the Lower Lakes — the Veliki Slap waterfall (Croatia's highest at 78 m) is unmissable. The upper lakes can be added if energy allows. Boats and electric shuttles run reduced schedules in March.",
        location: "Plitvice Lakes National Park",
        cost: "€12 student / €20 adult",
        optional: false,
        tips: [
          "Get the paper map at the entrance — the trails are well-marked but the map helps with time planning",
          "Veliki Slap (Big Waterfall) is 10 minutes from Entrance 1 — do this first",
          "The lower boardwalks along Kozjak lake are the most scenic",
          "Boat across Kozjak lake if running — check schedule at entrance",
          "Keep to boardwalks — trails off-route are closed in March",
        ],
      },
      {
        id: "d1-viewpoint",
        time: "17:00",
        title: "Entrance 1 Viewpoint — Golden Hour",
        description:
          "Return toward Entrance 1 for the panoramic viewpoint over the upper lakes. Late afternoon in March gives beautiful low light. No extra ticket needed for the viewpoint area.",
        location: "Plitvice Lakes — Entrance 1 Viewpoint",
        cost: "Free",
        optional: false,
        activityId: "park-entrance-viewpoint",
        tips: [
          "17:00 is golden hour in early March — perfect for photos",
          "The viewpoint is 5 minutes from the entrance — easy last stop",
        ],
      },
      {
        id: "d1-dinner",
        time: "19:30",
        title: "Anniversary Dinner — Restaurant Degenija",
        description:
          "Drive 5 km to Restaurant Degenija for your anniversary dinner. Book in advance and mention the anniversary — staff have been documented surprising couples with complimentary prosecco. Order the peka (slow-roasted under bell) 24–48 hours ahead.",
        location: "Restaurant Degenija, Seliste Dreznicko 39",
        cost: "€50–65 for two",
        optional: false,
        restaurantId: "restaurant-degenija",
        tips: [
          "Call +385 (0)47 782 060 to book and mention the anniversary",
          "Order peka when booking — it needs 24–48 hours notice",
          "Kremsnita (cream cake) for dessert — do not skip it",
          "Smart-casual dress — this is a proper restaurant",
        ],
      },
      {
        id: "d1-stargazing",
        time: "21:30",
        title: "Stargazing (Weather Permitting)",
        description:
          "The Lika region has minimal light pollution. Step outside your accommodation after dinner on a clear night for exceptional stargazing. The Milky Way is visible on moonless nights in March.",
        location: "Hotel Degenija surroundings / any dark spot",
        cost: "Free",
        optional: true,
        activityId: "stargazing",
        tips: [
          "Check the moon phase — new moon = best stargazing",
          "Bring the thermal layer — it will be cold after 21:00",
          "Give your eyes 10 minutes to adjust to the dark",
        ],
      },
    ],
  },
  {
    day: 2,
    label: "Day 2 — Sunday",
    theme: "Early Park Entry, Upper Lakes & Return Journey",
    summary:
      "Early morning park entry for the best light and fewest visitors, full exploration of upper and lower lakes, optional Barac Caves detour, drive home to Rijeka.",
    slots: [
      {
        id: "d2-breakfast",
        time: "07:30",
        title: "Breakfast at Hotel / Packed Breakfast",
        description:
          "Breakfast included at Hotel Degenija. Eat early — you want to be at the park gates for opening. If your accommodation doesn't include breakfast, grab pastries and coffee the night before from a local bakery.",
        location: "Hotel Degenija",
        optional: false,
        tips: [
          "Ask hotel to pack a coffee to go if they offer it",
          "Dress in layers for the morning — it will be cold but will warm up",
          "Pack snacks and water in your daypack now — saves time at the park",
        ],
      },
      {
        id: "d2-early-entry",
        time: "08:30",
        title: "Plitvice Early Morning Entry",
        description:
          "Arrive at Entrance 1 or 2 as soon as the park opens. Morning mist over the lakes in March is extraordinary. Tour groups don't typically arrive until 10:00 — this window is magical and peaceful.",
        location: "Plitvice Lakes National Park",
        cost: "Ticket already purchased (or buy here)",
        optional: false,
        activityId: "park-entrance-viewpoint",
        tips: [
          "Entrance 2 gives access to the upper lakes first — consider this for morning light",
          "The boardwalks are wet with morning dew — waterproof footwear essential",
          "Photographs before 10:00 are dramatically better — fewer people, better light",
          "Check if boats are running — the lake crossing is worth doing",
        ],
      },
      {
        id: "d2-upper-lakes",
        time: "09:00",
        title: "Upper Lakes Exploration",
        description:
          "If time allows and energy permits, complete the Upper Lakes route (Route C or E from Entrance 2). The upper lakes are less visited and have a different character — more forested and intimate than the dramatic lower lakes.",
        location: "Plitvice Upper Lakes — Entrance 2",
        optional: true,
        tips: [
          "Routes C and E add 2–3 hours to your park time",
          "Upper lakes in March may have partial trail closures — check at entrance",
          "The upper lakes have fewer boardwalks and more forest trail sections",
        ],
      },
      {
        id: "d2-park-lunch",
        time: "12:00",
        title: "Lunch at Park or Nearby",
        description:
          "Grab lunch inside the park at the Licka Kuca restaurant (if you didn't go yesterday) or at the park café near Entrance 1. Alternatively, eat your packed lunch on a bench overlooking Kozjak lake.",
        location: "Plitvice Lakes — near Entrance 1",
        cost: "€25–35 for two (restaurant) or packed lunch",
        optional: false,
        restaurantId: "licka-kuca",
        tips: [
          "The bench seating by Kozjak lake is one of the best lunch spots in Croatia",
          "Park cafés are limited in March — don't rely on them being open",
          "This is a good point to assess energy levels for the afternoon",
        ],
      },
      {
        id: "d2-checkout",
        time: "13:30",
        title: "Check Out & Pack Up",
        description:
          "Return to the hotel, check out, and load the car. Most hotels have a noon checkout — ask for late checkout the night before if you want more morning flexibility.",
        location: "Hotel",
        optional: false,
        tips: [
          "Request late checkout (13:00) when checking in — hotels often accommodate this",
          "Leave bags at the hotel reception if late checkout isn't possible",
        ],
      },
      {
        id: "d2-barac-caves",
        time: "14:00",
        title: "Optional: Barac Caves Side Trip",
        description:
          "The Barac Caves are 10 km from the park. Guided tours run approximately 1 hour. In March the caves are likely open Fridays only — call +385 47 782 113 to confirm Sunday availability. Includes the Speleon Visitor Centre.",
        location: "Rakovica, 10 km from park entrance",
        cost: "€13.50 adult / €10 student",
        optional: true,
        activityId: "barac-caves",
        tips: [
          "Call ahead — March schedule is limited",
          "The caves are a constant 10°C — bring a layer even if it's warm outside",
          "Speleon Visitor Centre is worth 30 minutes before the cave tour",
        ],
      },
      {
        id: "d2-casual-dinner",
        time: "16:00",
        title: "Coffee Stop & Casual Dinner Before Drive",
        description:
          "Stop at Bistro Plum in Rakovica for coffee, cocktails, or an early dinner before the drive back. Alternatively, stop for pizza at Old Shatterhand. Give yourself time to eat before the 2.5-hour drive home.",
        location: "Rakovica",
        cost: "€30–40 for two",
        optional: false,
        restaurantId: "bistro-plum",
        tips: [
          "Eat before 17:00 to start the drive home in daylight",
          "Bistro Plum cocktails are excellent — but one driver stays sober",
          "Reservations recommended at Bistro Plum even for early evening",
        ],
      },
      {
        id: "d2-drive-home",
        time: "17:30",
        title: "Drive Home to Rijeka",
        description:
          "Return journey on the A1 north to Karlovac, then A6 west to Rijeka. The drive is approximately 2.5 hours without stops. Take the return the same route or consider the scenic Gorski Kotar mountain road through Delnice for a different view.",
        drivingTime: "~2.5 hours",
        cost: "Fuel included in Day 1 estimate",
        optional: false,
        tips: [
          "Avoid stopping at motorway rest areas for food — overpriced and poor quality",
          "The A6 through Gorski Kotar can have fog in evening — headlights on",
          "Arrive home by 20:00 if departing at 17:30",
        ],
      },
    ],
  },
] as const satisfies ItineraryDay[];
