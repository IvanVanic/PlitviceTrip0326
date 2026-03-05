"use client";
import React, { useEffect, useRef, useState } from "react";

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
  closed: [
    "Entrance 2 (closed in winter/March)",
    "Upper Lakes boardwalks (partial — check locally)",
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
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C8 8 5 12 5 15a7 7 0 0014 0c0-3-3-7-7-13z" />
      </svg>
    ),
    label: "Peak waterfall flow",
    description: "Snowmelt means maximum water volume",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
      </svg>
    ),
    label: "No crowds",
    description: "Summer gets 10,000+ visitors/day",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "€10 tickets",
    description: "vs €40 in peak summer",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
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

// ─── Scroll reveal hook ───────────────────────────────────────────────────────

function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

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
  const headingRef = useScrollReveal<HTMLDivElement>();
  const keyNumbersRef = useScrollReveal<HTMLDivElement>();
  const routesRef = useScrollReveal<HTMLDivElement>();
  const gemsRef = useScrollReveal<HTMLDivElement>();
  const marchRef = useScrollReveal<HTMLDivElement>();
  const [selectedRoute, setSelectedRoute] = useState<string>("Route C");

  return (
    <section
      id="park-guide"
      className="py-12 px-4 sm:py-16 sm:px-6 bg-warm-white"
      aria-labelledby="park-guide-heading"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          ref={headingRef}
          className="mb-12 text-center animate-on-scroll"
        >
          <SectionLabel>March Conditions</SectionLabel>
          <h2
            id="park-guide-heading"
            className="font-heading text-4xl sm:text-5xl text-stone-dark mb-3"
          >
            <span className="heading-accent">Park Guide</span>
          </h2>
          <p className="font-body text-stone-mid text-sm sm:text-base max-w-xl mx-auto mt-4">
            Everything you need to know about Plitvice Lakes National Park for
            a late-March visit — prices, routes, what&apos;s open, and where to go
            off the beaten path.
          </p>
        </div>

        {/* ── Key Numbers ─────────────────────────────────────────────────── */}
        <div
          ref={keyNumbersRef}
          className="mb-14 animate-on-scroll"
        >
          <SectionLabel>At a Glance</SectionLabel>
          <SectionHeading>Key Numbers</SectionHeading>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {KEY_NUMBERS.map((item) => (
              <div
                key={item.label}
                className={[
                  "rounded-2xl p-5 flex flex-col gap-1 border-l-4 shadow-sm",
                  item.highlight
                    ? "bg-earth-50 border-l-earth-500"
                    : "bg-warm-white border-l-forest-500",
                ].join(" ")}
              >
                <div className="font-heading text-3xl text-stone-dark leading-none mb-1">
                  {item.value}
                </div>
                <div className="font-body text-xs font-semibold text-stone-dark leading-snug">
                  {item.label}
                </div>
                <div className="font-body text-xs text-stone-mid leading-snug">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Routes ──────────────────────────────────────────────────────── */}
        <div
          ref={routesRef}
          className="mb-14 animate-on-scroll"
        >
          <SectionLabel>Route Comparison</SectionLabel>
          <SectionHeading>Choose Your Route</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ROUTES.map((route) => {
              const isSelected = selectedRoute === route.name;
              return (
                <button
                  key={route.name}
                  onClick={() => !route.avoid && setSelectedRoute(route.name)}
                  disabled={route.avoid}
                  className={[
                    "relative rounded-2xl border p-5 text-left transition-all duration-200 w-full",
                    route.avoid
                      ? "bg-earth-50 border-earth-200 opacity-50 cursor-not-allowed"
                      : isSelected
                      ? "bg-forest-700 border-forest-700 shadow-lg scale-[1.01]"
                      : "bg-warm-white border-earth-100 hover:-translate-y-0.5 hover:shadow-md hover:border-earth-300 cursor-pointer",
                  ].join(" ")}
                  aria-pressed={isSelected}
                >
                  {route.recommended && !isSelected && (
                    <div className="absolute -top-2.5 left-4">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-body font-semibold bg-water-500 text-white shadow-sm">
                        Recommended
                      </span>
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute -top-2.5 left-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-body font-semibold bg-white text-forest-700 shadow-sm">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Selected
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
                    <h4 className={["font-heading text-xl", isSelected ? "text-white" : "text-stone-dark"].join(" ")}>
                      {route.name}
                    </h4>
                    <div className="text-right shrink-0">
                      <div className={["font-body text-sm font-semibold", isSelected ? "text-white" : "text-stone-dark"].join(" ")}>
                        {route.distance}
                      </div>
                      <div className={["font-body text-xs", isSelected ? "text-white/70" : "text-stone-mid"].join(" ")}>
                        {route.duration}
                      </div>
                    </div>
                  </div>
                  <p className={["font-body text-sm leading-relaxed mb-3", isSelected ? "text-white/80" : "text-stone-mid"].join(" ")}>
                    {route.description}
                  </p>
                  <div
                    className={[
                      "inline-flex px-3 py-1 rounded-full text-xs font-body font-medium",
                      route.avoid
                        ? "bg-earth-200 text-earth-700"
                        : isSelected
                        ? "bg-white/20 text-white"
                        : route.recommended
                        ? "bg-water-100 text-water-700"
                        : "bg-forest-100 text-forest-700",
                    ].join(" ")}
                  >
                    {route.note}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected route summary */}
          <div className="mt-4 p-4 bg-forest-50 border border-forest-200 rounded-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-forest-700 text-white flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <p className="font-body text-sm text-forest-800">
              <span className="font-semibold">Your route: {selectedRoute}</span>
              {" — "}
              {ROUTES.find((r) => r.name === selectedRoute)?.description}
            </p>
          </div>
        </div>

        {/* ── Hidden Gems ──────────────────────────────────────────────────── */}
        <div
          ref={gemsRef}
          className="mb-14 animate-on-scroll"
        >
          <SectionLabel>Insider Tips</SectionLabel>
          <SectionHeading>Hidden Gems</SectionHeading>
          <div>
            {HIDDEN_GEMS.map((gem) => (
              <div
                key={gem.num}
                className="border-b border-earth-100 last:border-b-0 py-4 flex gap-4 rounded-xl px-3 -mx-3 transition-all duration-200 hover:shadow-sm"
                style={{ background: gem.num % 2 === 0 ? 'rgba(33,133,182,0.04)' : 'rgba(61,122,69,0.04)' }}
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
        <div
          ref={marchRef}
          className="mb-14 animate-on-scroll"
        >
          <SectionLabel>Why March is Great</SectionLabel>
          <SectionHeading>March Advantages</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1 — Peak waterfall flow */}
            <div className="group flex items-start gap-4 bg-forest-50 border border-forest-200 border-l-4 border-l-forest-500 rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-forest-700 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200" aria-hidden="true">
                {MARCH_ADVANTAGES[0].icon}
              </div>
              <div className="min-w-0">
                <div className="font-heading text-xl text-forest-800 leading-tight mb-1">
                  {MARCH_ADVANTAGES[0].label}
                </div>
                <div className="font-body text-sm text-forest-600 leading-relaxed">
                  {MARCH_ADVANTAGES[0].description}
                </div>
              </div>
            </div>

            {/* Card 2 — No crowds */}
            <div className="group flex items-start gap-4 bg-water-50 border border-water-200 border-l-4 border-l-water-500 rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-water-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200" aria-hidden="true">
                {MARCH_ADVANTAGES[1].icon}
              </div>
              <div className="min-w-0">
                <div className="font-heading text-xl text-water-700 leading-tight mb-1">
                  {MARCH_ADVANTAGES[1].label}
                </div>
                <div className="font-body text-sm text-water-600 leading-relaxed">
                  {MARCH_ADVANTAGES[1].description}
                </div>
              </div>
            </div>

            {/* Card 3 — €10 tickets */}
            <div className="group flex items-start gap-4 bg-earth-50 border border-earth-200 border-l-4 border-l-earth-500 rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-earth-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200" aria-hidden="true">
                {MARCH_ADVANTAGES[2].icon}
              </div>
              <div className="min-w-0">
                <div className="font-heading text-xl text-earth-700 leading-tight mb-1">
                  {MARCH_ADVANTAGES[2].label}
                </div>
                <div className="font-body text-sm text-earth-600 leading-relaxed">
                  {MARCH_ADVANTAGES[2].description}
                </div>
              </div>
            </div>

            {/* Card 4 — Perfect light */}
            <div className="group flex items-start gap-4 bg-warm-white border border-earth-200 border-l-4 border-l-earth-600 rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-earth-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200" aria-hidden="true">
                {MARCH_ADVANTAGES[3].icon}
              </div>
              <div className="min-w-0">
                <div className="font-heading text-xl text-earth-700 leading-tight mb-1">
                  {MARCH_ADVANTAGES[3].label}
                </div>
                <div className="font-body text-sm text-earth-600 leading-relaxed">
                  {MARCH_ADVANTAGES[3].description}
                </div>
              </div>
            </div>
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
                className="font-body text-water-300 text-lg font-semibold hover:text-water-200 transition-colors min-h-[44px] inline-flex items-center"
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
