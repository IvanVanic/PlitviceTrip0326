"use client";

import React, { useState, useEffect, useCallback } from "react";

// --- Data ---
const WEATHER_DATA = {
  plitvice: {
    name: "Plitvice Lakes",
    daytimeHigh: "9–12°C",
    overnightLow: "1–3°C",
    rainProbability: "60–70%",
    snow: "Possible overnight",
    wind: "~20 km/h",
    color: "forest",
  },
  rijeka: {
    name: "Rijeka",
    daytimeHigh: "12–13°C",
    overnightLow: "5–6°C",
    rainProbability: "—",
    snow: "Unlikely",
    wind: "—",
    color: "water",
  },
};

const SUNRISE_SUNSET = [
  { date: "Mar 25", sunrise: "05:51", sunset: "18:16" },
  { date: "Mar 26", sunrise: "05:49", sunset: "18:17" },
  { date: "Mar 27", sunrise: "05:47", sunset: "18:18" },
];

const TRAIL_CONDITIONS = [
  {
    icon: "slip",
    severity: "warning",
    title: "Slippery boardwalks",
    desc: "Wet wood + algae biofilm — every step counts. Walk deliberately slow.",
  },
  {
    icon: "frost",
    severity: "info",
    title: "Morning frost patches",
    desc: "Shaded sections stay icy until mid-morning. Plan for an earlier start.",
  },
  {
    icon: "mud",
    severity: "info",
    title: "Mud on unpaved trails",
    desc: "Waterproof boots are mandatory, not optional.",
  },
  {
    icon: "spray",
    severity: "info",
    title: "Heavy waterfall spray",
    desc: "You will get wet near the falls. Waterproof everything that matters.",
  },
];

type ChecklistCategory = {
  category: string;
  items: string[];
};

const PACKING_CHECKLIST: ChecklistCategory[] = [
  {
    category: "Clothing",
    items: [
      "Waterproof hiking boots",
      "Waterproof shell jacket with hood",
      "Waterproof/quick-dry hiking pants",
      "Fleece or down mid-layer",
      "2x moisture-wicking base layers",
      "Thermal base layer bottoms",
      "Warm beanie",
      "Light gloves",
      "2–3x hiking socks (merino)",
      "Casual dinner outfit",
      "Compact umbrella",
    ],
  },
  {
    category: "Day Pack",
    items: [
      "Daypack 20–25L",
      "Water bottle (1L per person)",
      "Packed lunch",
      "Thermos of coffee/tea",
      "Spare dry socks in ziplock",
      "Lens cloths",
      "Ziplock bags for phone/wallet",
      "Sunscreen",
    ],
  },
  {
    category: "Car",
    items: [
      "Winter tyres / snow chains",
      "Warning vest",
      "First aid kit",
      "Warning triangle",
      "Cash (€50)",
      "Phone charger",
    ],
  },
];

const TOTAL_ITEMS = PACKING_CHECKLIST.reduce(
  (sum, cat) => sum + cat.items.length,
  0
);

const STORAGE_KEY = "plitvice_packing_checklist";

// --- Helper: stable item key ---
function itemKey(category: string, item: string) {
  return `${category}__${item}`;
}

// --- Icons ---
function ThermometerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  );
}

function DropletIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function WindIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// --- Weather Card ---
function WeatherCard({ location }: { location: typeof WEATHER_DATA.plitvice }) {
  const isForest = location.color === "forest";
  return (
    <div
      className={`flex-1 rounded-2xl border p-5 ${
        isForest
          ? "bg-forest-50 border-forest-200"
          : "bg-water-50 border-water-200"
      }`}
    >
      <h3
        className={`font-heading text-lg font-semibold mb-4 ${
          isForest ? "text-forest-800" : "text-water-800"
        }`}
      >
        {location.name}
      </h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <ThermometerIcon
            className={`w-5 h-5 shrink-0 ${isForest ? "text-forest-600" : "text-water-600"}`}
          />
          <div>
            <p className="font-body text-xs text-stone-mid">Daytime high</p>
            <p className="font-body text-sm font-semibold text-stone-dark">
              {location.daytimeHigh}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MoonIcon
            className={`w-5 h-5 shrink-0 ${isForest ? "text-forest-600" : "text-water-600"}`}
          />
          <div>
            <p className="font-body text-xs text-stone-mid">Overnight low</p>
            <p className="font-body text-sm font-semibold text-stone-dark">
              {location.overnightLow}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DropletIcon
            className={`w-5 h-5 shrink-0 ${isForest ? "text-forest-600" : "text-water-600"}`}
          />
          <div>
            <p className="font-body text-xs text-stone-mid">Rain probability</p>
            <p className="font-body text-sm font-semibold text-stone-dark">
              {location.rainProbability}
            </p>
          </div>
        </div>
        {location.snow !== "Unlikely" && (
          <div className="flex items-center gap-3">
            <span
              className={`text-base shrink-0 ${isForest ? "text-forest-600" : "text-water-600"}`}
              aria-hidden="true"
            >
              ❄
            </span>
            <div>
              <p className="font-body text-xs text-stone-mid">Snow</p>
              <p className="font-body text-sm font-semibold text-stone-dark">
                {location.snow}
              </p>
            </div>
          </div>
        )}
        {location.wind !== "—" && (
          <div className="flex items-center gap-3">
            <WindIcon
              className={`w-5 h-5 shrink-0 ${isForest ? "text-forest-600" : "text-water-600"}`}
            />
            <div>
              <p className="font-body text-xs text-stone-mid">Wind</p>
              <p className="font-body text-sm font-semibold text-stone-dark">
                {location.wind}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Main Component ---
export default function WeatherPacking() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage after hydration
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setChecked(JSON.parse(stored));
      }
    } catch {
      // silently ignore
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // silently ignore
    }
  }, [checked, hydrated]);

  const toggleItem = useCallback((key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedCount / TOTAL_ITEMS) * 100);

  const resetAll = () => setChecked({});

  return (
    <section id="packing" className="bg-warm-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl sm:text-5xl text-forest-900 mb-3">
            Weather & Packing
          </h2>
          <p className="font-body text-stone-mid text-lg">
            Know before you go
          </p>
        </div>

        {/* Key insight banner */}
        <div
          className="rounded-2xl p-5 mb-8 flex items-start gap-4"
          style={{
            background:
              "linear-gradient(135deg, var(--color-forest-800) 0%, var(--color-water-800) 100%)",
          }}
        >
          <span className="text-2xl shrink-0" aria-hidden="true">
            🧊
          </span>
          <div>
            <p className="font-body font-semibold text-white text-sm mb-1">
              Key insight
            </p>
            <p className="font-body text-forest-100 text-sm leading-relaxed">
              Plitvice is <strong className="text-white">3–4°C colder</strong>{" "}
              than Rijeka. Pack as if it'll be{" "}
              <strong className="text-white">5° colder</strong> than your
              doorstep.
            </p>
          </div>
        </div>

        {/* Weather comparison */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <WeatherCard location={WEATHER_DATA.plitvice} />
          <WeatherCard location={WEATHER_DATA.rijeka} />
        </div>

        {/* Sunrise / sunset */}
        <div className="bg-warm-white rounded-2xl shadow-sm border border-earth-100 p-6 mb-8">
          <h3 className="font-heading text-lg text-forest-800 mb-4">
            Sunrise & Sunset — March 2026
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-earth-100">
                  <th className="text-left py-2 pr-4 text-stone-mid font-medium">Date</th>
                  <th className="text-left py-2 pr-4 text-stone-mid font-medium">
                    <span className="flex items-center gap-1">
                      <SunIcon className="w-4 h-4 text-earth-500" />
                      Sunrise
                    </span>
                  </th>
                  <th className="text-left py-2 text-stone-mid font-medium">
                    <span className="flex items-center gap-1">
                      <MoonIcon className="w-4 h-4 text-water-600" />
                      Sunset
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {SUNRISE_SUNSET.map((row) => (
                  <tr key={row.date} className="border-b border-earth-50 last:border-0">
                    <td className="py-2.5 pr-4 font-medium text-stone-dark">
                      {row.date}
                    </td>
                    <td className="py-2.5 pr-4 text-forest-700 font-semibold tabular-nums">
                      {row.sunrise}
                    </td>
                    <td className="py-2.5 text-water-700 font-semibold tabular-nums">
                      {row.sunset}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-body text-xs text-stone-mid mt-3">
            Golden hour lasts roughly 45 min after sunrise and before sunset —
            prime time for waterfall photography.
          </p>
        </div>

        {/* Trail conditions */}
        <div className="mb-8">
          <h3 className="font-heading text-xl text-forest-900 mb-4">
            Trail Conditions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TRAIL_CONDITIONS.map((cond) => (
              <div
                key={cond.title}
                className={`flex items-start gap-3 rounded-xl p-4 border ${
                  cond.severity === "warning"
                    ? "bg-earth-50 border-earth-300"
                    : "bg-water-50 border-water-200"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {cond.severity === "warning" ? (
                    <WarningIcon className="w-5 h-5 text-earth-600" />
                  ) : (
                    <InfoIcon className="w-5 h-5 text-water-600" />
                  )}
                </div>
                <div>
                  <p
                    className={`font-body text-sm font-semibold mb-1 ${
                      cond.severity === "warning"
                        ? "text-earth-800"
                        : "text-water-800"
                    }`}
                  >
                    {cond.title}
                  </p>
                  <p className="font-body text-xs text-stone-mid leading-relaxed">
                    {cond.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Packing checklist */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-xl text-forest-900">
              Packing Checklist
            </h3>
            <button
              onClick={resetAll}
              className="font-body text-xs text-stone-mid hover:text-earth-700 transition-colors duration-150 underline underline-offset-2"
            >
              Reset all
            </button>
          </div>

          {/* Progress */}
          <div className="bg-warm-white rounded-2xl shadow-sm border border-earth-100 p-5 mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-body text-sm text-stone-mid">
                {checkedCount} of {TOTAL_ITEMS} items packed
              </span>
              <span
                className={`font-body text-sm font-semibold tabular-nums ${
                  progress === 100 ? "text-forest-600" : "text-stone-dark"
                }`}
              >
                {progress}%
              </span>
            </div>
            <div className="h-2 bg-earth-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-forest-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${checkedCount} of ${TOTAL_ITEMS} items packed`}
              />
            </div>
            {progress === 100 && (
              <p className="font-body text-xs text-forest-600 mt-2 font-medium">
                All packed — you're ready for the mountains!
              </p>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-4">
            {PACKING_CHECKLIST.map((cat) => {
              const catChecked = cat.items.filter(
                (item) => checked[itemKey(cat.category, item)]
              ).length;
              return (
                <div
                  key={cat.category}
                  className="bg-warm-white rounded-2xl shadow-sm border border-earth-100 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-heading text-base font-semibold text-forest-800">
                      {cat.category}
                    </h4>
                    <span className="font-body text-xs text-stone-mid tabular-nums">
                      {catChecked}/{cat.items.length}
                    </span>
                  </div>
                  <ul className="space-y-1" role="list">
                    {cat.items.map((item) => {
                      const key = itemKey(cat.category, item);
                      const isChecked = !!checked[key];
                      return (
                        <li key={item}>
                          <button
                            onClick={() => toggleItem(key)}
                            className={`w-full flex items-center gap-3 py-2 px-2 rounded-lg text-left transition-colors duration-150 hover:bg-earth-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 group`}
                            aria-pressed={isChecked}
                          >
                            {/* Checkbox visual */}
                            <span
                              className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150 ${
                                isChecked
                                  ? "bg-forest-600 border-forest-600"
                                  : "border-earth-300 bg-white group-hover:border-forest-400"
                              }`}
                            >
                              {isChecked && (
                                <CheckIcon className="w-3 h-3 text-white" />
                              )}
                            </span>
                            {/* Label */}
                            <span
                              className={`font-body text-sm transition-all duration-150 ${
                                isChecked
                                  ? "line-through text-stone-mid"
                                  : "text-stone-dark"
                              }`}
                            >
                              {item}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
