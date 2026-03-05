import React from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const KEY_NUMBERS = [
  {
    label: "Adult Ticket",
    value: "€10",
    sub: "Low season rate",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
  },
  {
    label: "Student Ticket",
    value: "€6",
    sub: "With valid student ID",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    label: "Park Hours",
    value: "08:00–16:00",
    sub: "March opening times",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Ticket Sales End",
    value: "13:00",
    sub: "Enter before this time",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    highlight: true,
  },
  {
    label: "Parking",
    value: "€1.50/hr",
    sub: "Opens at 07:00",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17l4 4 4-4m-4-5v9" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" />
      </svg>
    ),
  },
];

const OPEN_CLOSED = {
  open: [
    "Entrance 1",
    "Lower Lakes boardwalks",
    "Veliki Slap (78 m — tallest in Croatia)",
    "Lake Kozjak boat (likely)",
    "Shuttle train (likely)",
  ],
  possiblyClosed: [
    "Entrance 2",
    "Upper Lakes boardwalks",
    "Some elevated trails",
  ],
};

const ROUTES = [
  {
    name: "Route C",
    distance: "8 km",
    duration: "4–5 hrs",
    description: "Both lake sections — boat ride + shuttle bus. The full experience.",
    note: "Recommended if Upper Lakes are open",
    recommended: true,
    color: "water",
  },
  {
    name: "Route B",
    distance: "4 km",
    duration: "3–4 hrs",
    description: "Lower Lakes focus. Great waterfalls and boardwalks without the upper section.",
    note: "Recommended if Upper Lakes are closed",
    recommended: false,
    color: "forest",
  },
  {
    name: "Route A",
    distance: "3.5 km",
    duration: "2–3 hrs",
    description: "Lower Lakes only — shorter loop, still hits the main highlights.",
    note: "Good for a relaxed half-day",
    recommended: false,
    color: "earth",
  },
  {
    name: "Route K1",
    distance: "16.5 km",
    duration: "6–8 hrs",
    description: "Mega route covering everything — but too long for March's 8-hour operating window.",
    note: "Too long for March hours",
    recommended: false,
    color: "stone",
    avoid: true,
  },
];

const HIDDEN_GEMS = [
  {
    num: 1,
    title: "Elevated Viewpoint at Veliki Slap",
    description:
      "A short side trail above the main path gives a full-height view of the 78 m falls — most visitors miss it.",
  },
  {
    num: 2,
    title: "Cave Boardwalk Fork in Lower Lakes",
    description:
      "A narrow boardwalk cuts through a cave section with water flowing underneath. Follow the left fork from the main path.",
  },
  {
    num: 3,
    title: "Canyon Overlook from Upper Path",
    description:
      "An unmarked overlook on the upper path gives a sweeping canyon view. Worth a 5-minute detour.",
  },
  {
    num: 4,
    title: "Between Galovac & Gradinsko Lakes",
    description:
      "In the Upper Lakes section, the stretch between these two lakes has some of the best turquoise color in the entire park.",
  },
  {
    num: 5,
    title: "Arrive at 08:00 Sharp",
    description:
      "The park opens at 08:00. Arriving at opening means you'll have the lower boardwalks entirely to yourselves — no crowds, perfect photos.",
  },
];

const MARCH_ADVANTAGES = [
  {
    icon: "💧",
    label: "Peak waterfall flow",
    description: "Snowmelt means maximum water volume",
  },
  {
    icon: "🌿",
    label: "No crowds",
    description: "Summer gets 10,000+ visitors/day",
  },
  {
    icon: "€",
    label: "€10 tickets",
    description: "vs €40 in peak summer",
  },
  {
    icon: "📷",
    label: "Perfect light",
    description: "Low winter sun for golden-hour shots all day",
  },
];

const CTA_CHECKLIST = [
  "Which Upper Lake trails are open?",
  "Is the Lake Kozjak boat running?",
  "Is the shuttle train running?",
  "Any boardwalk sections under repair?",
  "Is Kozjačka Draga hut open?",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-body font-semibold uppercase tracking-widest text-forest-600 mb-3">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading text-2xl sm:text-3xl text-stone-dark mb-6">
      {children}
    </h3>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ParkGuide() {
  return (
    <section
      id="park-guide"
      className="py-12 px-4 sm:py-16 sm:px-6 bg-warm-white"
      aria-labelledby="park-guide-heading"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <SectionLabel>March Conditions</SectionLabel>
          <h2
            id="park-guide-heading"
            className="font-heading text-4xl sm:text-5xl text-stone-dark mb-3"
          >
            Park Guide
          </h2>
          <p className="font-body text-stone-mid text-base max-w-xl mx-auto">
            Everything you need to know about Plitvice Lakes National Park for
            a late-March visit — prices, routes, what's open, and where to go
            off the beaten path.
          </p>
        </div>

        {/* ── Key Numbers ─────────────────────────────────────────────────── */}
        <div className="mb-14">
          <SectionLabel>At a Glance</SectionLabel>
          <SectionHeading>Key Numbers</SectionHeading>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            {KEY_NUMBERS.map((item) => (
              <div
                key={item.label}
                className={[
                  "rounded-2xl border p-4 flex flex-col gap-2",
                  item.highlight
                    ? "bg-earth-50 border-earth-300"
                    : "bg-warm-white border-earth-100",
                ].join(" ")}
              >
                <div
                  className={[
                    "w-9 h-9 rounded-xl flex items-center justify-center",
                    item.highlight
                      ? "bg-earth-200 text-earth-700"
                      : "bg-forest-50 text-forest-700",
                  ].join(" ")}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="font-heading text-xl text-stone-dark leading-tight">
                    {item.value}
                  </div>
                  <div className="font-body text-xs font-semibold text-stone-dark mt-0.5">
                    {item.label}
                  </div>
                  <div className="font-body text-xs text-stone-mid mt-0.5">
                    {item.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── What's Open in March ─────────────────────────────────────────── */}
        <div className="mb-14">
          <SectionLabel>March Conditions</SectionLabel>
          <SectionHeading>What's Open</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Open */}
            <div className="bg-forest-50 border border-forest-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-forest-600 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-heading text-lg text-forest-800">Open</h4>
              </div>
              <ul className="space-y-2">
                {OPEN_CLOSED.open.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 font-body text-sm text-forest-800"
                  >
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-forest-500 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Possibly closed */}
            <div className="bg-earth-50 border border-earth-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-earth-400 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01" />
                  </svg>
                </div>
                <h4 className="font-heading text-lg text-earth-800">
                  Possibly Closed
                </h4>
              </div>
              <ul className="space-y-2">
                {OPEN_CLOSED.possiblyClosed.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 font-body text-sm text-earth-700"
                  >
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-earth-400 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="font-body text-xs text-earth-600 mt-4 pt-3 border-t border-earth-200">
                Always call ahead to confirm — see the CTA box below.
              </p>
            </div>
          </div>
        </div>

        {/* ── Routes ──────────────────────────────────────────────────────── */}
        <div className="mb-14">
          <SectionLabel>Route Comparison</SectionLabel>
          <SectionHeading>Choose Your Route</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-4">
            {ROUTES.map((route) => (
              <div
                key={route.name}
                className={[
                  "relative rounded-2xl border p-5 transition-all",
                  route.avoid
                    ? "bg-earth-50 border-earth-200 opacity-60"
                    : route.recommended
                    ? "bg-water-50 border-water-300 shadow-sm"
                    : "bg-warm-white border-earth-100",
                ].join(" ")}
              >
                {route.recommended && (
                  <div className="absolute -top-2.5 left-4">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-body font-semibold bg-water-500 text-white shadow-sm">
                      Recommended
                    </span>
                  </div>
                )}
                {route.avoid && (
                  <div className="absolute -top-2.5 left-4">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-body font-semibold bg-earth-400 text-white shadow-sm">
                      Skip in March
                    </span>
                  </div>
                )}
                <div className="flex items-start justify-between gap-2 mb-2 mt-1">
                  <h4 className="font-heading text-xl text-stone-dark">
                    {route.name}
                  </h4>
                  <div className="text-right shrink-0">
                    <div className="font-body text-sm font-semibold text-stone-dark">
                      {route.distance}
                    </div>
                    <div className="font-body text-xs text-stone-mid">
                      {route.duration}
                    </div>
                  </div>
                </div>
                <p className="font-body text-sm text-stone-mid leading-relaxed mb-3">
                  {route.description}
                </p>
                <div
                  className={[
                    "inline-flex px-3 py-1 rounded-full text-xs font-body font-medium",
                    route.avoid
                      ? "bg-earth-200 text-earth-700"
                      : route.recommended
                      ? "bg-water-100 text-water-700"
                      : "bg-forest-100 text-forest-700",
                  ].join(" ")}
                >
                  {route.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Hidden Gems ──────────────────────────────────────────────────── */}
        <div className="mb-14">
          <SectionLabel>Insider Tips</SectionLabel>
          <SectionHeading>Hidden Gems</SectionHeading>
          <div className="space-y-3">
            {HIDDEN_GEMS.map((gem) => (
              <div
                key={gem.num}
                className="bg-warm-white rounded-2xl border border-earth-100 shadow-sm p-5 flex gap-4"
              >
                <div className="shrink-0 w-8 h-8 rounded-full bg-forest-700 text-white flex items-center justify-center font-heading text-sm font-bold">
                  {gem.num}
                </div>
                <div>
                  <h4 className="font-heading text-base text-stone-dark mb-1">
                    {gem.title}
                  </h4>
                  <p className="font-body text-sm text-stone-mid leading-relaxed">
                    {gem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── March Advantages ─────────────────────────────────────────────── */}
        <div className="mb-14">
          <SectionLabel>Why March is Great</SectionLabel>
          <SectionHeading>March Advantages</SectionHeading>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MARCH_ADVANTAGES.map((adv) => (
              <div
                key={adv.label}
                className="bg-forest-50 border border-forest-100 rounded-2xl p-4 text-center"
              >
                <div className="text-2xl mb-2" aria-hidden="true">
                  {adv.icon}
                </div>
                <div className="font-body text-sm font-semibold text-forest-800 mb-1">
                  {adv.label}
                </div>
                <div className="font-body text-xs text-forest-600 leading-snug">
                  {adv.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA Box ──────────────────────────────────────────────────────── */}
        <div className="bg-earth-900 rounded-2xl p-6 sm:p-8 text-warm-white">
          <div className="flex items-start gap-4 mb-5 flex-wrap sm:flex-nowrap">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-earth-700 flex items-center justify-center text-earth-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading text-xl text-warm-white mb-1">
                Call the Park — 1 Week Before
              </h3>
              <a
                href="tel:+38553751014"
                className="font-body text-water-300 text-lg font-semibold hover:text-water-200 transition-colors"
              >
                +385 53 751 014
              </a>
            </div>
          </div>
          <p className="font-body text-sm text-earth-300 mb-4">
            March conditions change weekly. Confirm these items before you go:
          </p>
          <ul className="space-y-2">
            {CTA_CHECKLIST.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 font-body text-sm text-earth-100"
              >
                <span className="w-5 h-5 rounded-full border border-earth-600 flex items-center justify-center shrink-0" aria-hidden="true">
                  <span className="w-1.5 h-1.5 rounded-full bg-earth-400" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
