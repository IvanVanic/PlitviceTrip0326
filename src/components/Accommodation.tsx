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

  return (
    <div
      className={[
        "relative bg-warm-white rounded-2xl shadow-sm border p-6 flex flex-col gap-4 transition-shadow duration-200 hover:shadow-md",
        isRecommended
          ? "border-earth-400 ring-2 ring-earth-300/50"
          : "border-earth-100",
      ].join(" ")}
    >
      {/* Top Pick ribbon */}
      {isRecommended && (
        <div className="absolute -top-3 left-5 inline-flex items-center gap-1.5 bg-earth-600 text-warm-white text-xs font-body font-semibold px-3 py-1 rounded-full shadow-sm">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Top Pick
        </div>
      )}

      {/* Header row */}
      <div className="flex items-start justify-between gap-2 pt-1">
        <div className="flex-1 min-w-0">
          <span
            className={[
              "inline-flex px-2.5 py-0.5 rounded-full text-xs font-body font-medium mb-2",
              tagColors[acc.tag] ?? "bg-earth-100 text-earth-800",
            ].join(" ")}
          >
            {acc.tag}
          </span>
          <h3 className="font-heading text-lg text-stone-dark leading-tight">{acc.name}</h3>
          <p className="font-body text-xs text-stone-mid mt-0.5 flex items-center gap-1">
            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {acc.location}
          </p>
        </div>

        {/* Rating + heart */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="flex items-baseline gap-0.5 bg-forest-700 text-white px-2.5 py-1 rounded-xl">
            <span className="font-heading text-lg font-bold leading-none">{acc.rating}</span>
            <span className="font-body text-xs opacity-80">/10</span>
          </div>
          <button
            onClick={onToggleFavorite}
            className={[
              "p-1.5 rounded-full transition-all duration-200",
              isFavorite
                ? "text-earth-600 bg-earth-100"
                : "text-stone-mid hover:text-earth-500 hover:bg-earth-50",
            ].join(" ")}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <HeartIcon filled={isFavorite} />
          </button>
        </div>
      </div>

      {/* Price + distance */}
      <div className="flex flex-wrap gap-2 text-sm font-body">
        <span className="flex items-center gap-1 text-forest-800 font-semibold">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {acc.priceRange}
        </span>
        <span className="flex items-center gap-1 text-stone-mid">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          {acc.distance}
        </span>
      </div>

      {/* Breakfast + Jacuzzi indicators */}
      <div className="flex flex-col gap-1.5 text-sm font-body">
        <div className={["flex items-center gap-2", acc.breakfastIncluded ? "text-forest-700" : "text-stone-mid"].join(" ")}>
          {acc.breakfastIncluded ? (
            <CheckIcon className="w-4 h-4 text-forest-600" />
          ) : (
            <XIcon className="w-4 h-4 text-earth-400" />
          )}
          <span>
            Breakfast{" "}
            {acc.breakfastIncluded ? (
              <span className="font-semibold text-forest-700">included</span>
            ) : (
              <span className="text-stone-mid">{acc.breakfastNote}</span>
            )}
          </span>
        </div>
        <div className={["flex items-start gap-2", acc.hasJacuzzi ? "text-water-700" : "text-stone-mid"].join(" ")}>
          {acc.hasJacuzzi ? (
            <CheckIcon className="w-4 h-4 text-water-600 mt-0.5 shrink-0" />
          ) : (
            <XIcon className="w-4 h-4 text-earth-400 mt-0.5 shrink-0" />
          )}
          <span>
            {acc.hasJacuzzi ? (
              <span className="font-semibold text-water-700">{acc.jacuzziType}</span>
            ) : (
              "No jacuzzi"
            )}
          </span>
        </div>
      </div>

      {/* Vibe */}
      <p className="font-body text-sm text-stone-mid italic leading-relaxed border-l-2 border-earth-200 pl-3">
        {acc.vibe}
      </p>

      {/* Highlights */}
      <div className="flex flex-wrap gap-1.5">
        {acc.highlights.map((h) => (
          <span
            key={h}
            className="inline-flex px-2 py-0.5 rounded-full text-xs font-body font-medium bg-forest-50 text-forest-700 border border-forest-100"
          >
            {h}
          </span>
        ))}
      </div>

      {/* Search link */}
      <a
        href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(acc.name + ' Plitvice')}&checkin=2026-03-25&checkout=2026-03-27&group_adults=2`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center justify-center gap-2 bg-forest-700 hover:bg-forest-600 text-white font-body font-semibold text-sm rounded-xl px-4 py-2.5 transition-colors duration-200"
      >
        Find on Booking.com
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
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
              {activeFilter === f.id && (
                <span className="ml-2 bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {filtered.length}
                </span>
              )}
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
