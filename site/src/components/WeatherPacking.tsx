"use client";

import React, { useRef, useEffect } from "react";

function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("is-visible"); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type PackItem = {
  name: string;
  note?: string;
  link?: string;
  linkLabel?: string;
};

type PackCategory = {
  label: string;
  icon: React.ReactNode;
  items: PackItem[];
};

const PACK_LIST: PackCategory[] = [
  {
    label: "Clothing",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z" />
      </svg>
    ),
    items: [
      { name: "Waterproof hiking boots", note: "Mandatory — trails are wet", link: "https://www.decathlon.hr/sport/treking/obuva/", linkLabel: "Decathlon" },
      { name: "Waterproof shell jacket", note: "With sealed seams + hood", link: "https://www.decathlon.hr/sport/planinarenje-treking/odjeca/jakne/", linkLabel: "Decathlon" },
      { name: "Fleece or down mid-layer", link: "https://www.decathlon.hr/sport/planinarenje-treking/odjeca/flis/", linkLabel: "Decathlon" },
      { name: "Waterproof hiking pants", link: "https://www.decathlon.hr/sport/planinarenje-treking/odjeca/hlace/", linkLabel: "Decathlon" },
      { name: "2× moisture-wicking base layers", link: "https://www.decathlon.hr/sport/planinarenje-treking/odjeca/majice/", linkLabel: "Decathlon" },
      { name: "Thermal base layer bottoms", link: "https://www.decathlon.hr/sport/planinarenje-treking/odjeca/donje-rublje/", linkLabel: "Decathlon" },
      { name: "Warm beanie", link: "https://www.decathlon.hr/sport/planinarenje-treking/odjeca/kape/", linkLabel: "Decathlon" },
      { name: "Light gloves", link: "https://www.decathlon.hr/sport/planinarenje-treking/odjeca/rukavice/", linkLabel: "Decathlon" },
      { name: "2–3× hiking socks (merino preferred)", link: "https://www.decathlon.hr/sport/planinarenje-treking/odjeca/carape/", linkLabel: "Decathlon" },
      { name: "Casual dinner outfit", note: "For Restaurant Degenija" },
      { name: "Compact umbrella" },
    ],
  },
  {
    label: "Day Pack",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" strokeWidth={1.8} />
      </svg>
    ),
    items: [
      { name: "Daypack 20–25L", link: "https://www.decathlon.hr/sport/planinarenje-treking/oprem/ruksaci/", linkLabel: "Decathlon" },
      { name: "Water bottle 1L+ per person", link: "https://www.decathlon.hr/sport/planinarenje-treking/oprema/bocice-za-vodu/", linkLabel: "Decathlon" },
      { name: "Packed lunch + snacks", note: "No café inside the park in March" },
      { name: "Thermos of coffee or tea" },
      { name: "Spare dry socks in a ziplock" },
      { name: "Lens cloths", note: "Waterfall spray hits the camera lens constantly" },
      { name: "Ziplock bags for phone + wallet", note: "Waterproof everything" },
      { name: "Sunscreen", note: "Low-angle winter sun is deceptively strong" },
    ],
  },
  {
    label: "Car",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v5" />
        <circle cx="18" cy="17" r="3" strokeWidth={1.8} />
        <circle cx="9" cy="17" r="3" strokeWidth={1.8} />
      </svg>
    ),
    items: [
      { name: "Winter tyres (M+S)", note: "Mandatory in Croatia until April 15 — check the car" },
      { name: "Warning vest + triangle", note: "Required by Croatian law" },
      { name: "First aid kit", note: "Required by Croatian law" },
      { name: "Cash €50", note: "Some tolls and parking don't take card" },
      { name: "Phone charger + cable" },
      { name: "Parking app or coins", note: "€1.50/hr at Entrance 1" },
    ],
  },
  {
    label: "Camera Bag",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" strokeWidth={1.8} />
      </svg>
    ),
    items: [
      { name: "Camera + fully charged battery", note: "Cold drains batteries fast — keep spare warm" },
      { name: "Extra memory cards" },
      { name: "Waterproof camera bag or rain cover", link: "https://www.decathlon.hr/sport/planinarenje-treking/oprema/ruksaci/", linkLabel: "Decathlon" },
      { name: "Polarising filter", note: "Cuts glare on the turquoise water beautifully" },
      { name: "Stellarium app", note: "For stargazing — download before leaving (works offline)", link: "https://stellarium.org/", linkLabel: "stellarium.org" },
    ],
  },
];

// ─── Link icon ────────────────────────────────────────────────────────────────

function ExternalLinkIcon() {
  return (
    <svg className="w-3 h-3 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WeatherPacking() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const listRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="packing" className="bg-earth-50 py-12 px-4 sm:py-16 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-10 animate-on-scroll">
          <p className="font-body text-xs tracking-widest uppercase text-forest-600 mb-2">March 25–27</p>
          <h2 className="font-heading text-4xl sm:text-5xl text-stone-dark mb-3">
            Packing List
          </h2>
          <p className="font-body text-stone-mid text-base max-w-md mx-auto">
            Everything for 2 nights in cold, wet mountain conditions. Links go to Decathlon Croatia.
          </p>
        </div>

        {/* Key weather callout */}
        <div className="rounded-2xl p-4 mb-8 flex items-start gap-3 bg-forest-700 text-white">
          <svg className="w-5 h-5 shrink-0 mt-0.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
          </svg>
          <div>
            <p className="font-body text-sm font-semibold mb-0.5">Plitvice is 3–4°C colder than Rijeka</p>
            <p className="font-body text-sm opacity-75">
              Expect 8–11°C daytime, 1–3°C overnight. Rain likely. Pack as if it's 5° colder than your doorstep.
            </p>
          </div>
        </div>

        {/* Category list */}
        <div ref={listRef} className="space-y-6 animate-on-scroll">
          {PACK_LIST.map((cat) => (
            <div key={cat.label} className="bg-warm-white rounded-2xl border border-earth-100 shadow-sm overflow-hidden">
              {/* Category header */}
              <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-earth-100 bg-earth-50/60">
                <span className="text-forest-700">{cat.icon}</span>
                <h3 className="font-body text-sm font-semibold text-stone-dark tracking-wide uppercase" style={{ letterSpacing: "0.06em" }}>
                  {cat.label}
                </h3>
                <span className="ml-auto font-body text-xs text-stone-mid">{cat.items.length} items</span>
              </div>

              {/* Items */}
              <ul>
                {cat.items.map((item, i) => (
                  <li
                    key={item.name}
                    className={[
                      "flex items-start gap-3 px-5 py-3",
                      i < cat.items.length - 1 ? "border-b border-earth-50" : "",
                    ].join(" ")}
                  >
                    {/* Bullet */}
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-forest-400 shrink-0" aria-hidden="true" />

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <span className="font-body text-sm text-stone-dark">{item.name}</span>
                      {item.note && (
                        <span className="font-body text-xs text-stone-mid ml-1.5">— {item.note}</span>
                      )}
                    </div>

                    {/* Link */}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1 font-body text-xs text-forest-600 hover:text-forest-800 transition-colors duration-150 whitespace-nowrap"
                      >
                        {item.linkLabel ?? "Link"}
                        <ExternalLinkIcon />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="font-body text-xs text-stone-mid text-center mt-8">
          Decathlon Rijeka is on the way — worth a quick stop if you&apos;re missing anything.
        </p>
      </div>
    </section>
  );
}
