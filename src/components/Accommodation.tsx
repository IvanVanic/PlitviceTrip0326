"use client";

import React, { useState } from "react";
import { useTrip } from "@/context/TripContext";

type Accommodation = {
  id: string;
  name: string;
  tag: string;
  location: string;
  distance: string;
  rating: number;
  priceRange: string;
  breakfastIncluded: boolean;
  breakfastNote?: string;
  hasJacuzzi: boolean;
  jacuzziType?: string;
  vibe: string;
  highlights: string[];
  recommended?: boolean;
  bookingSearch: string;
};

const accommodations: Accommodation[] = [
  {
    id: "rustic-lodge",
    name: "Rustic Lodge Plitvice",
    tag: "Value Pick",
    location: "Plitvica Selo",
    distance: "2.7km — walkable to Entrance 3",
    rating: 9.4,
    priceRange: "€95-130 for 2 nights",
    breakfastIncluded: false,
    breakfastNote: "Extra ~€10/person/day",
    hasJacuzzi: false,
    vibe: "All-wood chalet, rustic-chic. Wood-beam ceilings, warm tones.",
    highlights: ["Family-run warmth", "On-site restaurant", "Free parking", "Best value"],
    bookingSearch: "Rustic Lodge Plitvice booking.com",
  },
  {
    id: "etno-garden",
    name: "Etno Garden Exclusive",
    tag: "Closest to Park",
    location: "Plitvica Selo",
    distance: "400m walk to the park",
    rating: 8.7,
    priceRange: "€154-198 for 2 nights",
    breakfastIncluded: false,
    breakfastNote: "Extra ~€10-13/person/day",
    hasJacuzzi: false,
    vibe: "Traditional-modern blend. Stone and wood with clean modern finishes.",
    highlights: ["Closest to park", "Large modern bathrooms", "Free parking"],
    bookingSearch: "Etno Garden Exclusive Rooms booking.com",
  },
  {
    id: "16-lakes",
    name: "16 Lakes Hotel",
    tag: "Best Spa Experience",
    location: "Grabovac",
    distance: "7.5km — 10 min drive",
    rating: 9.2,
    priceRange: "€130-230 for 2 nights",
    breakfastIncluded: true,
    hasJacuzzi: true,
    jacuzziType: "Private couples spa: jacuzzi, Finnish sauna, infrared sauna (2hr session)",
    vibe: "Boutique hotel, 16 rooms each named after a Plitvice lake.",
    highlights: ["Private couples spa", "Breakfast included", "Family-owned", "Lake-named rooms"],
    bookingSearch: "16 Lakes Hotel Grabovac booking.com",
  },
  {
    id: "degenija",
    name: "Hotel Degenija",
    tag: "Hot Tub + Dinner Combo",
    location: "Selište Drežničko",
    distance: "4km — 8 min drive",
    rating: 9.2,
    priceRange: "€154-204 for 2 nights",
    breakfastIncluded: true,
    hasJacuzzi: true,
    jacuzziType: "In-room hot tub (book 'Jacuzzi Room')",
    vibe: "Modern, clean European. Private terrace. Heated outdoor lounge.",
    highlights: ["In-room hot tub", "Best restaurant on-site", "Breakfast included", "Heated lounge with blankets"],
    recommended: true,
    bookingSearch: "Hotel Degenija booking.com",
  },
  {
    id: "teslas",
    name: "Tesla's Gastro House",
    tag: "The Splurge",
    location: "Prijeboj",
    distance: "Within park surroundings",
    rating: 9.7,
    priceRange: "€254-340 for 2 nights",
    breakfastIncluded: false,
    breakfastNote: "Extra €16/person",
    hasJacuzzi: true,
    jacuzziType: "Outdoor heated jacuzzi with park valley views + sauna",
    vibe: "6 individually designed rooms. Premium bedding, rainfall showers, Netflix.",
    highlights: ["Highest rated (9.7)", "Valley view jacuzzi", "Incredible food", "Unique rooms"],
    bookingSearch: "Tesla's Gastro House Plitvice booking.com",
  },
];

type Filter = "all" | "jacuzzi" | "breakfast" | "under200";

const tagColors: Record<string, string> = {
  "Value Pick": "bg-forest-100 text-forest-800",
  "Closest to Park": "bg-water-100 text-water-800",
  "Best Spa Experience": "bg-earth-100 text-earth-800",
  "Hot Tub + Dinner Combo": "bg-earth-200 text-earth-900",
  "The Splurge": "bg-stone-dark/10 text-stone-dark",
};

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className="w-5 h-5 transition-all duration-200"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}

function AccommodationCard({
  acc,
  isFavorite,
  onToggleFavorite,
}: {
  acc: Accommodation;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  const isRecommended = acc.recommended === true;
  const visibleHighlights = acc.highlights.slice(0, 3);

  return (
    <div
      className={[
        "relative bg-warm-white rounded-2xl flex flex-col transition-all duration-200 overflow-visible",
        "shadow-sm hover:shadow-lg hover:-translate-y-0.5",
        isRecommended
          ? "border-2 border-earth-300 ring-1 ring-earth-200/60"
          : "border border-earth-100",
      ].join(" ")}
    >
      {/* Top Pick ribbon — sits above the card top edge */}
      {isRecommended && (
        <div className="absolute -top-3.5 left-4 z-10 inline-flex items-center gap-1.5 bg-earth-600 text-warm-white text-[11px] font-body font-semibold tracking-wide uppercase px-3 py-1 rounded-full shadow-md">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Top Pick
        </div>
      )}

      {/* ── Card header band ── */}
      <div className="relative px-5 pt-6 pb-4 border-b border-earth-100">
        {/* Rating badge — floats top-right of the header */}
        <div className="absolute top-5 right-5 flex flex-col items-end gap-2">
          <div
            className="flex items-baseline gap-0.5 bg-forest-700 text-white px-2.5 py-1.5 rounded-xl shadow-sm"
            aria-label={`Rating: ${acc.rating} out of 10`}
          >
            <span className="font-heading text-xl font-bold leading-none">{acc.rating}</span>
            <span className="font-body text-[10px] opacity-70 leading-none mb-0.5">/10</span>
          </div>
          <button
            onClick={onToggleFavorite}
            className={[
              "p-1.5 rounded-full transition-all duration-200",
              isFavorite
                ? "text-earth-600 bg-earth-100 shadow-sm"
                : "text-stone-mid hover:text-earth-500 hover:bg-earth-50",
            ].join(" ")}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <HeartIcon filled={isFavorite} />
          </button>
        </div>

        {/* Category tag */}
        <span
          className={[
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-body font-semibold tracking-wide mb-2.5",
            tagColors[acc.tag] ?? "bg-earth-100 text-earth-800",
          ].join(" ")}
        >
          {acc.tag}
        </span>

        {/* Hotel name — the primary visual anchor */}
        <h3 className="font-heading text-xl text-stone-dark leading-snug pr-20">
          {acc.name}
        </h3>

        {/* Location + distance metadata */}
        <div className="flex flex-col gap-0.5 mt-1.5">
          <p className="font-body text-xs text-stone-mid flex items-center gap-1">
            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium text-stone-dark">{acc.location}</span>
            <span className="text-stone-mid/60">·</span>
            <span>{acc.distance}</span>
          </p>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="px-5 py-4 flex flex-col gap-4 flex-1">

        {/* Price — visually prominent */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-body text-[10px] uppercase tracking-widest text-stone-mid mb-0.5">
              2 nights · 2 guests
            </p>
            <p className="font-heading text-2xl text-forest-700 font-bold leading-none">
              {acc.priceRange}
            </p>
          </div>
        </div>

        {/* Thin divider */}
        <div className="h-px bg-earth-100" />

        {/* Feature rows — breakfast + jacuzzi */}
        <div className="flex flex-col gap-2.5">
          {/* Breakfast row */}
          <div className="flex items-start gap-3">
            <div
              className={[
                "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
                acc.breakfastIncluded ? "bg-forest-50" : "bg-earth-50",
              ].join(" ")}
              aria-hidden="true"
            >
              {/* Coffee cup icon */}
              <svg
                className={["w-4 h-4", acc.breakfastIncluded ? "text-forest-700" : "text-stone-mid"].join(" ")}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 1v3M10 1v3M14 1v3" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight pt-0.5">
              <span
                className={[
                  "font-body text-sm font-semibold",
                  acc.breakfastIncluded ? "text-forest-700" : "text-stone-dark",
                ].join(" ")}
              >
                Breakfast
              </span>
              <span className="font-body text-xs text-stone-mid">
                {acc.breakfastIncluded ? "Included in price" : acc.breakfastNote ?? "Not included"}
              </span>
            </div>
          </div>

          {/* Jacuzzi row */}
          <div className="flex items-start gap-3">
            <div
              className={[
                "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
                acc.hasJacuzzi ? "bg-water-50" : "bg-earth-50",
              ].join(" ")}
              aria-hidden="true"
            >
              {/* Water drop / spa icon */}
              <svg
                className={["w-4 h-4", acc.hasJacuzzi ? "text-water-500" : "text-stone-mid"].join(" ")}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2C8 7 5 10.5 5 14a7 7 0 0014 0c0-3.5-3-7-7-12z" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight pt-0.5">
              <span
                className={[
                  "font-body text-sm font-semibold",
                  acc.hasJacuzzi ? "text-water-700" : "text-stone-dark",
                ].join(" ")}
              >
                {acc.hasJacuzzi ? "Jacuzzi / Spa" : "No jacuzzi"}
              </span>
              {acc.hasJacuzzi && acc.jacuzziType && (
                <span className="font-body text-xs text-stone-mid leading-snug">
                  {acc.jacuzziType}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Highlights — max 3, subtle muted pills */}
        {visibleHighlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleHighlights.map((h) => (
              <span
                key={h}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-body font-medium bg-earth-50 text-earth-600 border border-earth-100"
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Booking CTA — pinned to card bottom ── */}
      <div className="px-5 pb-5 pt-1 mt-auto">
        <a
          href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(acc.name + ' Plitvice')}&checkin=2026-03-25&checkout=2026-03-27&group_adults=2`}
          target="_blank"
          rel="noopener noreferrer"
          className={[
            "group w-full inline-flex items-center justify-center gap-2",
            "bg-forest-700 hover:bg-forest-600 active:bg-forest-800",
            "text-white font-body font-semibold text-sm",
            "rounded-xl px-4 py-3",
            "transition-all duration-200 shadow-sm hover:shadow",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2",
          ].join(" ")}
          aria-label={`Find ${acc.name} on Booking.com`}
        >
          <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
          </svg>
          Find on Booking.com
          <svg
            className="w-3.5 h-3.5 opacity-60 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function Accommodation() {
  const { setAccommodation } = useTrip();
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All Options" },
    { id: "jacuzzi", label: "Has Jacuzzi" },
    { id: "breakfast", label: "Breakfast Included" },
    { id: "under200", label: "Under €200" },
  ];

  const counts = {
    all: accommodations.length,
    jacuzzi: accommodations.filter((a) => a.hasJacuzzi).length,
    breakfast: accommodations.filter((a) => a.breakfastIncluded).length,
    under200: accommodations.filter((a) => {
      const m = a.priceRange.match(/€(d+)/);
      return m ? parseInt(m[1], 10) < 200 : false;
    }).length,
  };

  const filtered = accommodations.filter((acc) => {
    if (activeFilter === "jacuzzi") return acc.hasJacuzzi;
    if (activeFilter === "breakfast") return acc.breakfastIncluded;
    if (activeFilter === "under200") {
      // Parse the lower bound of the price range
      const match = acc.priceRange.match(/€(\d+)/);
      if (match) return parseInt(match[1], 10) < 200;
      return false;
    }
    return true;
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    // Sync selected accommodation to shared context for budget calculation
    setAccommodation(id);
  };

  return (
    <section id="accommodation" className="py-12 px-4 sm:py-16 sm:px-6 bg-warm-white">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-10">
          <p className="font-body text-xs tracking-widest uppercase text-earth-600 mb-2">
            Night 1 &amp; 2
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl text-stone-dark mb-3">
            Accommodation
          </h2>
          <p className="font-body text-stone-mid text-base max-w-lg mx-auto">
            Top picks near the park, compared
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8" role="group" aria-label="Filter accommodations">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={[
                "inline-flex items-center px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200",
                activeFilter === f.id
                  ? "bg-forest-700 text-white shadow-sm"
                  : "bg-warm-white text-stone-mid border border-earth-200 hover:border-earth-400 hover:text-stone-dark",
              ].join(" ")}
              aria-pressed={activeFilter === f.id}
            >
              {f.label}
              <span
                className={[
                  "ml-2 text-xs px-1.5 py-0.5 rounded-full transition-colors duration-200",
                  activeFilter === f.id
                    ? "bg-white/20 text-white"
                    : "bg-earth-100 text-stone-mid",
                ].join(" ")}
              >
                {counts[f.id]}
              </span>
            </button>
          ))}
        </div>

        {/* Cards grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-stone-mid font-body">
            No accommodations match this filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((acc) => (
              <AccommodationCard
                key={acc.id}
                acc={acc}
                isFavorite={favorites.has(acc.id)}
                onToggleFavorite={() => toggleFavorite(acc.id)}
              />
            ))}
          </div>
        )}

        {/* Favorites summary */}
        {favorites.size > 0 && (
          <div className="mt-8 p-4 bg-warm-white border border-earth-200 rounded-2xl text-center font-body text-sm text-stone-mid">
            <span className="font-semibold text-earth-700">
              {favorites.size} favourited
            </span>{" "}
            —{" "}
            {Array.from(favorites)
              .map((id) => accommodations.find((a) => a.id === id)?.name)
              .filter(Boolean)
              .join(", ")}
          </div>
        )}
      </div>
    </section>
  );
}
