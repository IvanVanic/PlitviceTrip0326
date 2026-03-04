"use client";

import React, { useState } from "react";

type Restaurant = {
  id: string;
  name: string;
  tag: string;
  rating: string;
  ratingSource: string;
  priceRange: string;
  cuisine: string;
  veggieOptions: string[];
  highlights: string[];
  phone?: string;
  closedNote?: string;
  isAnniversaryPick?: boolean;
};

type FoodItem = {
  name: string;
  description: string;
  isVeggie: boolean;
  note?: string;
};

const restaurants: Restaurant[] = [
  {
    id: "degenija",
    name: "Restaurant Degenija",
    tag: "Anniversary Pick",
    rating: "9.2",
    ratingSource: "Booking.com",
    priceRange: "€50-65 for two",
    cuisine: "Lika cuisine",
    veggieOptions: ["Fresh river trout", "Truffle gnocchi", "Lika cheese plate", "Homemade pizza"],
    highlights: ["Intimate boutique setting", "Best wine list in the area", "On-site at Hotel Degenija", "Booking recommended"],
    phone: "+385 47 782 060",
    isAnniversaryPick: true,
  },
  {
    id: "bistro-plum",
    name: "Bistro Plum",
    tag: "Casual Pick",
    rating: "4.5",
    ratingSource: "TripAdvisor (966+ reviews)",
    priceRange: "€30-40 for two",
    cuisine: "Mediterranean",
    veggieOptions: ["Truffle gnocchi", "Mushroom risotto", "Fresh pasta", "Cocktails menu"],
    highlights: ["Lively & relaxed atmosphere", "Excellent cocktails", "Great for lunch", "Popular with locals"],
  },
  {
    id: "licka-kuca",
    name: "Lička Kuća",
    tag: "Park Lunch",
    rating: "4.2",
    ratingSource: "TripAdvisor",
    priceRange: "€25-35 for two",
    cuisine: "Traditional Lika",
    veggieOptions: ["River trout", "Škripavac cheese", "Apple strudel", "Kremšnita"],
    highlights: ["Open fireplace", "Folk music on weekends", "Right by the park", "Most authentic Lika experience"],
    phone: "+385 99 2767 406",
    closedNote: "Closed Tuesdays",
  },
  {
    id: "fenomen",
    name: "Fenomen Plitvice",
    tag: "Special Occasion",
    rating: "Highly reviewed",
    ratingSource: "Google",
    priceRange: "Premium pricing",
    cuisine: "Elevated organic",
    veggieOptions: ["4-course tasting menu", "Seasonal organic produce", "Chef's vegetarian option"],
    highlights: ["4-course private dinner experience", "Organic & local ingredients", "Advance reservation essential", "Best for a romantic splurge"],
  },
];

const regionalFood: FoodItem[] = [
  {
    name: "Peka",
    description: "Iron bell slow-cook — lamb or veal cooked under embers for hours",
    isVeggie: false,
    note: "Ask for veggie version with seasonal vegetables",
  },
  {
    name: "Škripavac Cheese",
    description: "Fresh, squeaky Lika cheese — mild and creamy, best eaten same-day",
    isVeggie: true,
  },
  {
    name: "Fresh River Trout",
    description: "Caught from the crystal Plitvice waters, pan-fried or grilled simply",
    isVeggie: false,
    note: "Pescetarian friendly",
  },
  {
    name: "Lički Zavežljaj",
    description: "Traditional lamb bundle, slowly braised — a regional specialty",
    isVeggie: false,
  },
  {
    name: "Cherry / Apple Strudel",
    description: "Flaky pastry with seasonal fruit, made fresh daily in local restaurants",
    isVeggie: true,
  },
  {
    name: "Kremšnita",
    description: "Custard cream slice — Croatia's beloved vanilla custard pastry",
    isVeggie: true,
  },
  {
    name: "Lički Krumpir",
    description: "Lika potatoes — prized regional variety, roasted or as a side",
    isVeggie: true,
  },
];

const tagStyles: Record<string, string> = {
  "Anniversary Pick": "bg-earth-200 text-earth-900",
  "Casual Pick": "bg-water-100 text-water-800",
  "Park Lunch": "bg-forest-100 text-forest-800",
  "Special Occasion": "bg-stone-dark/10 text-stone-dark",
};

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-4 h-4"}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const isAnniversary = restaurant.isAnniversaryPick === true;

  return (
    <div
      className={[
        "relative bg-warm-white rounded-2xl shadow-sm border p-6 flex flex-col gap-4 transition-shadow duration-200 hover:shadow-md",
        isAnniversary
          ? "border-earth-400 ring-2 ring-earth-300/40"
          : "border-earth-100",
      ].join(" ")}
    >
      {/* Anniversary ribbon */}
      {isAnniversary && (
        <div className="absolute -top-3 left-5 inline-flex items-center gap-1.5 bg-earth-700 text-warm-white text-xs font-body font-semibold px-3 py-1 rounded-full shadow-sm">
          <HeartIcon />
          Anniversary Dinner
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-2 pt-1">
        <div className="flex-1 min-w-0">
          <span
            className={[
              "inline-flex px-2.5 py-0.5 rounded-full text-xs font-body font-medium mb-2",
              tagStyles[restaurant.tag] ?? "bg-earth-100 text-earth-800",
            ].join(" ")}
          >
            {restaurant.tag}
          </span>
          <h3 className="font-heading text-xl text-stone-dark leading-tight">{restaurant.name}</h3>
          <p className="font-body text-xs text-stone-mid mt-0.5">{restaurant.cuisine}</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-heading text-2xl font-bold text-forest-700 leading-none">
            {restaurant.rating}
          </div>
          <div className="font-body text-xs text-stone-mid mt-0.5 max-w-[80px] text-right">
            {restaurant.ratingSource}
          </div>
        </div>
      </div>

      {/* Price + closed note */}
      <div className="flex flex-wrap items-center gap-3 text-sm font-body">
        <span className="flex items-center gap-1 font-semibold text-forest-800">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {restaurant.priceRange}
        </span>
        {restaurant.closedNote && (
          <span className="text-earth-700 bg-earth-50 border border-earth-200 px-2 py-0.5 rounded-full text-xs">
            {restaurant.closedNote}
          </span>
        )}
      </div>

      {/* Veggie options */}
      <div>
        <p className="font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-2 flex items-center gap-1">
          <LeafIcon className="w-3.5 h-3.5" />
          Veggie-friendly options
        </p>
        <ul className="flex flex-col gap-1">
          {restaurant.veggieOptions.map((opt) => (
            <li key={opt} className="flex items-start gap-2 font-body text-sm text-stone-dark">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-forest-400 shrink-0" />
              {opt}
            </li>
          ))}
        </ul>
      </div>

      {/* Highlights */}
      <div className="flex flex-wrap gap-1.5">
        {restaurant.highlights.map((h) => (
          <span
            key={h}
            className="inline-flex px-2 py-0.5 rounded-full text-xs font-body font-medium bg-earth-50 text-earth-700 border border-earth-100"
          >
            {h}
          </span>
        ))}
      </div>

      {/* Phone */}
      {restaurant.phone && (
        <a
          href={`tel:${restaurant.phone}`}
          className="inline-flex items-center gap-2 text-sm font-body text-water-700 hover:text-water-600 transition-colors duration-200 font-medium"
        >
          <PhoneIcon className="w-4 h-4" />
          {restaurant.phone}
        </a>
      )}
    </div>
  );
}

function FoodItemCard({ item }: { item: FoodItem }) {
  return (
    <div className="bg-warm-white rounded-2xl border border-earth-100 p-4 flex flex-col gap-2 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-heading text-base text-stone-dark leading-snug">{item.name}</h4>
        <span
          className={[
            "shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-body font-medium",
            item.isVeggie
              ? "bg-forest-100 text-forest-700"
              : item.note?.toLowerCase().includes("pescetarian")
              ? "bg-water-100 text-water-700"
              : "bg-earth-100 text-earth-700",
          ].join(" ")}
        >
          {item.isVeggie ? (
            <>
              <LeafIcon className="w-3 h-3" />
              Veggie
            </>
          ) : item.note?.toLowerCase().includes("pescetarian") ? (
            "Pescetarian"
          ) : (
            "Meat"
          )}
        </span>
      </div>
      <p className="font-body text-sm text-stone-mid leading-relaxed">{item.description}</p>
      {item.note && (
        <p className="font-body text-xs text-earth-600 italic">{item.note}</p>
      )}
    </div>
  );
}

export default function FoodGuide() {
  const [showAllRestaurants, setShowAllRestaurants] = useState(false);

  const visibleRestaurants = showAllRestaurants ? restaurants : restaurants.slice(0, 3);

  return (
    <section id="food" className="py-16 px-4 bg-warm-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-4">
          <p className="font-body text-xs tracking-widest uppercase text-earth-600 mb-2">
            Eat Well, Eat Local
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl text-stone-dark mb-3">
            Where We&apos;re Eating
          </h2>
        </div>

        {/* Vegetarian/pescetarian note */}
        <div className="flex items-center justify-center gap-2.5 mb-10 p-3 bg-forest-50 border border-forest-200 rounded-2xl max-w-sm mx-auto">
          <LeafIcon className="w-5 h-5 text-forest-600 shrink-0" />
          <p className="font-body text-sm text-forest-800 font-medium">
            She&apos;s vegetarian / pescetarian — all options noted below
          </p>
        </div>

        {/* Restaurant grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {visibleRestaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>

        {!showAllRestaurants && restaurants.length > 3 && (
          <div className="text-center mb-12">
            <button
              onClick={() => setShowAllRestaurants(true)}
              className="inline-flex items-center gap-2 border border-earth-300 hover:border-earth-500 text-stone-dark font-body font-medium text-sm rounded-xl px-5 py-2.5 transition-colors duration-200"
            >
              Show all restaurants
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* Regional Must-Try divider */}
        <div className="flex items-center gap-4 my-12">
          <div className="flex-1 h-px bg-earth-200" />
          <div className="flex items-center gap-2 shrink-0">
            <svg className="w-5 h-5 text-earth-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="font-heading text-lg text-stone-dark">Regional Must-Try</span>
          </div>
          <div className="flex-1 h-px bg-earth-200" />
        </div>

        <p className="text-center font-body text-sm text-stone-mid mb-8 max-w-md mx-auto">
          Lika region has its own distinct food culture. These are the dishes worth ordering — many are veggie-friendly or can be adapted.
        </p>

        {/* Food items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {regionalFood.map((item) => (
            <FoodItemCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
