# Plitvice Trip — Project Notes
## Last updated: session 3 (March 2026)

---

## Site
- **Live:** https://plitvice-trip.vercel.app
- **Repo:** GitHub (connected to Vercel, auto-deploys on push)
- **Stack:** Next.js 15, Tailwind CSS v4, TypeScript, App Router
- **Location:** `C:\Users\Ivan\Desktop\PlitviceTrip\site\`

```bash
npm run dev      # http://localhost:3000
npm run build    # production build check
```

---

## What's Built

### Pages
- `/` — main single-page trip planner (all sections)
- `/map` — full interactive map page (Leaflet + OpenStreetMap)
- `/driving` — driving logistics detail page

### Components (all on main page)
| Component | What it does |
|---|---|
| `Hero.tsx` | Full-viewport gradient hero (forest green → teal), fade-in animations |
| `Navigation.tsx` | Sticky nav, IntersectionObserver active tracking, mobile hamburger |
| `Itinerary.tsx` | Day-by-day timeline, toggleable optional stops |
| `ParkGuide.tsx` | Routes, what's open in March, hidden gems |
| `DrivingLogistics.tsx` | Route stops, costs (fuel/tolls/parking), winter tyre warning |
| `Accommodation.tsx` | 5 option cards, filter pills, favorites |
| `FoodGuide.tsx` | Restaurant cards, veggie badges, anniversary pick |
| `Activities.tsx` | Rastoke, Ogulin, caves, Day 3 options |
| `BudgetCalculator.tsx` | Live sliders, his/her split, running total |
| `WeatherPacking.tsx` | Weather display + interactive packing checklist (localStorage) |
| `GearShopping.tsx` | Decathlon + stores in Rijeka |
| `NightGuide.tsx` | Evening guide — twinkling stars canvas, 6 cards (stargazing, dinner, walk) |
| `Footer.tsx` | Dark footer, phone numbers as tel: links |

### Supporting files
| File | Purpose |
|---|---|
| `context/TripContext.tsx` | Shared state — accommodation choice, activities, budget sliders, gear toggles |
| `components/InteractiveMap.tsx` | Leaflet map with custom SVG pins, route polyline |
| `components/MapLoader.tsx` | Dynamic import wrapper (SSR-safe for Leaflet) |
| `data/` | TypeScript data constants |
| `lib/utils.ts` | cn() helper |

---

## Design System
- Forest green: `text-forest-700`, `bg-forest-700`
- Water blue: `text-water-500`, `bg-water-50`
- Earth/warm: `text-earth-600`, `bg-earth-50`
- Backgrounds: `bg-warm-white` (sections), `bg-earth-50` (alternating)
- Cards: `bg-warm-white rounded-2xl shadow-sm border border-earth-100 p-6`
- Headings: `font-heading` (Playfair Display) — Body: `font-body` (Inter)

---

## Pending / To Review

- [ ] **Hero gradient** — removed bad Unsplash stock photo, replaced with CSS gradient (forest green → teal). Check it looks good.
- [ ] **Navigation** — active section highlighting as you scroll
- [ ] **Itinerary** — optional stop toggles, Day 3 options
- [ ] **Accommodation** — filter pills + favorite hearts
- [ ] **Budget Calculator** — sliders update live, his/her split
- [ ] **WeatherPacking** — checkbox state persists on refresh (localStorage)
- [ ] **Map page** — marker popups, route line, mobile layout
- [ ] **Mobile** — full site on phone viewport

---

## Key Trip Facts
- Trip: March 25–27, 2026, Rijeka → Plitvice
- Her: vegetarian/pescetarian, covering accommodation (~€150–200)
- Him: covering everything else (~€200)
- Top accommodation: Hotel Degenija (in-room hot tub, best restaurant)
- Anniversary dinner: Restaurant Degenija — +385 47 782 060 — order peka 24–48 hrs ahead
- Park: call +385 53 751 014 before visit (Upper Lakes status, boats)
- Entrance 2 CLOSED in March — Entrance 1 only
- Tickets: €6 student / €10 adult (low season), sales end 13:00
- Winter tyres mandatory until April 15 — CHECK CAR
