"use client";

import React, { useState, useCallback, useRef } from "react";
import { useTrip } from "@/context/TripContext";

// --- ID mappings ---

// Map context activity IDs to budget line items
const ACTIVITY_BUDGET_MAP: Record<string, { label: string; cost: number }[]> = {
  "rastoke": [
    { label: "Rastoke entry (2 people)", cost: 10 },
    { label: "Rastoke parking", cost: 3 },
  ],
  "ogulin-museum": [{ label: "Ogulin museum", cost: 8 }],
  "barac-caves": [{ label: "Barać Caves (2 student tickets)", cost: 20 }],
};

// Map context accommodation IDs to budget accommodation options
const ACCOM_ID_MAP: Record<string, string> = {
  "rustic-lodge": "rustic_lodge",
  "etno-garden": "etno_garden",
  "16-lakes": "16_lakes",
  "degenija": "degenija",
  "teslas": "tesla",
};

// --- Types ---
interface SliderItem {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
}

interface AccommodationOption {
  budgetId: string;
  contextId: string;
  name: string;
  min: number;
  max: number;
}

// --- Static Data ---
const FIXED_COSTS = [
  { label: "Fuel (round trip)", cost: 38 },
  { label: "Tolls (round trip)", cost: 9 },
  { label: "Parking at park (6 hrs)", cost: 9 },
];

const SLIDER_ITEMS: SliderItem[] = [
  { id: "anniversary_dinner", label: "Special dinner", min: 50, max: 90, step: 5 },
  { id: "casual_dinner", label: "Casual dinner", min: 30, max: 50, step: 5 },
  { id: "groceries", label: "Groceries & snacks", min: 20, max: 40, step: 5 },
  { id: "coffees", label: "Coffees & misc", min: 10, max: 20, step: 2 },
];

// Context activity IDs that have budget cost entries (free ones omitted)
const BUDGET_ACTIVITY_IDS = ["rastoke", "ogulin-museum", "barac-caves"] as const;

const GEAR_TOGGLES = [
  { id: "his_boots", label: "His boots", cost: 55, note: "Quechua MH500 Mid" },
  { id: "her_boots", label: "Her boots", cost: 70, note: "Quechua MH500 Mid Women's" },
  { id: "his_jacket", label: "His jacket", cost: 70, note: "Quechua MH500 Rain Jacket" },
  { id: "her_jacket", label: "Her jacket", cost: 40, note: "Quechua MH100 Rain Jacket" },
];

const ACCOMMODATION_OPTIONS: AccommodationOption[] = [
  { budgetId: "rustic_lodge", contextId: "rustic-lodge", name: "Rustic Lodge", min: 95, max: 130 },
  { budgetId: "etno_garden", contextId: "etno-garden", name: "Etno Garden", min: 154, max: 198 },
  { budgetId: "16_lakes", contextId: "16-lakes", name: "16 Lakes Hotel", min: 130, max: 230 },
  { budgetId: "degenija", contextId: "degenija", name: "Hotel Degenija", min: 154, max: 204 },
  { budgetId: "tesla", contextId: "teslas", name: "Tesla's Gastro House", min: 254, max: 340 },
];

// --- Sub-components ---

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 ${
        checked
          ? "bg-forest-600 border-forest-600"
          : "bg-earth-200 border-earth-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function SliderInput({
  item,
  value,
  onChange,
}: {
  item: SliderItem;
  value: number;
  onChange: (id: string, v: number) => void;
}) {
  const pct = ((value - item.min) / (item.max - item.min)) * 100;
  return (
    <div className="relative">
      <input
        type="range"
        min={item.min}
        max={item.max}
        step={item.step}
        value={value}
        onChange={(e) => onChange(item.id, Number(e.target.value))}
        aria-label={item.label}
        className="w-full h-2 rounded-full appearance-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-500"
        style={{
          background: `linear-gradient(to right, var(--color-forest-600) 0%, var(--color-forest-600) ${pct}%, var(--color-earth-200) ${pct}%, var(--color-earth-200) 100%)`,
        }}
      />
    </div>
  );
}

function CategoryHeader({ title }: { title: string }) {
  return (
    <h3 className="font-heading text-base font-semibold text-forest-800 mb-3 pb-2 border-b border-earth-100">
      {title}
    </h3>
  );
}

function LineItem({
  label,
  control,
  cost,
  dimmed,
  note,
}: {
  label: string;
  control?: React.ReactNode;
  cost: string | number;
  dimmed?: boolean;
  note?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 py-2 transition-opacity duration-200 ${
        dimmed ? "opacity-40" : "opacity-100"
      }`}
    >
      <div className="flex-1 min-w-0">
        <span className="font-body text-sm text-stone-dark leading-snug">
          {label}
        </span>
        {note && (
          <span className="block text-xs text-stone-mid mt-0.5">{note}</span>
        )}
      </div>
      {control && <div className="shrink-0">{control}</div>}
      <span
        className={`font-body text-sm font-semibold shrink-0 tabular-nums w-14 text-right ${
          dimmed ? "text-stone-mid" : "text-forest-800"
        }`}
      >
        {typeof cost === "number" ? `€${cost}` : cost}
      </span>
    </div>
  );
}

// --- Animated number ---
function AnimatedCost({ value, className }: { value: number; className?: string }) {
  return (
    <span
      className={`tabular-nums transition-all duration-300 ${className ?? ""}`}
      style={{ display: "inline-block" }}
    >
      €{value}
    </span>
  );
}

// --- Main Component ---
export default function BudgetCalculator() {
  const {
    state,
    toggleActivity,
    setAccommodation,
    setStudentTicket,
    toggleGear,
    setFoodSlider,
  } = useTrip();

  const { studentTicket, includedActivities, selectedAccommodation, gearOn, foodSliders } = state;

  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(() => {
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2000);
  }, []);

  // Derived values
  const parkCost = studentTicket ? 12 : 20;
  const fixedTotal = FIXED_COSTS.reduce((sum, f) => sum + f.cost, 0);

  const foodTotal = SLIDER_ITEMS.reduce((sum, s) => sum + (foodSliders[s.id] ?? 0), 0);

  // Build activity line items from context's includedActivities
  const activityLineItems = BUDGET_ACTIVITY_IDS.flatMap((contextId) => {
    const lines = ACTIVITY_BUDGET_MAP[contextId] ?? [];
    const isOn = includedActivities.has(contextId);
    return lines.map((line) => ({ ...line, contextId, isOn }));
  });

  const activityTotal = activityLineItems.reduce(
    (sum, item) => sum + (item.isOn ? item.cost : 0),
    0
  );

  const gearTotal = GEAR_TOGGLES.reduce(
    (sum, t) => sum + (gearOn[t.id] ? t.cost : 0),
    0
  );

  // Selected accommodation (look up from context ID)
  const selectedAccomOption =
    ACCOMMODATION_OPTIONS.find((a) => a.contextId === selectedAccommodation) ??
    ACCOMMODATION_OPTIONS.find((a) => a.contextId === "degenija")!;
  const herAccomMid = Math.round((selectedAccomOption.min + selectedAccomOption.max) / 2);

  const hisCoreTotal = fixedTotal + parkCost + foodTotal + activityTotal;
  const tripTotal = hisCoreTotal + herAccomMid;
  const withGear = tripTotal + gearTotal;
  const gearActive = gearTotal > 0;

  // Handlers
  const handleSlider = useCallback(
    (id: string, v: number) => {
      setFoodSlider(id, v);
      showToast();
    },
    [setFoodSlider, showToast]
  );

  const handleActivity = useCallback(
    (contextId: string) => {
      toggleActivity(contextId);
      showToast();
    },
    [toggleActivity, showToast]
  );

  const handleGear = useCallback(
    (id: string) => {
      toggleGear(id);
      showToast();
    },
    [toggleGear, showToast]
  );

  const handleAccommodation = useCallback(
    (contextId: string) => {
      setAccommodation(contextId);
      showToast();
    },
    [setAccommodation, showToast]
  );

  const handleStudentTicket = useCallback(
    (isFullPrice: boolean) => {
      setStudentTicket(!isFullPrice);
      showToast();
    },
    [setStudentTicket, showToast]
  );

  return (
    <section
      id="budget"
      className="bg-warm-white py-12 px-4 sm:py-16 sm:px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl sm:text-5xl text-forest-900 mb-3">
            The Budget
          </h2>
          <p className="font-body text-stone-mid text-lg">
            Slide, toggle, see it all add up
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left / main column */}
          <div className="lg:col-span-2 space-y-5">

            {/* Driving */}
            <div className="bg-warm-white rounded-2xl shadow-sm border border-earth-100 p-6">
              <CategoryHeader title="Driving" />
              {FIXED_COSTS.map((f) => (
                <LineItem key={f.label} label={f.label} cost={f.cost} />
              ))}
              <div className="mt-2 pt-2 border-t border-earth-100 flex justify-between">
                <span className="font-body text-sm font-semibold text-stone-mid">Subtotal</span>
                <span className="font-body text-sm font-semibold text-forest-700">€{fixedTotal}</span>
              </div>
            </div>

            {/* The Lakes */}
            <div className="bg-warm-white rounded-2xl shadow-sm border border-earth-100 p-6">
              <CategoryHeader title="The Lakes" />
              {/* Park ticket toggle */}
              <div className="flex items-center justify-between gap-3 py-2">
                <div className="flex-1">
                  <span className="font-body text-sm text-stone-dark">Park entry ticket</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`font-body text-xs transition-colors duration-150 ${
                      studentTicket ? "text-forest-700 font-semibold" : "text-stone-mid"
                    }`}
                  >
                    Student
                  </span>
                  <Toggle
                    checked={!studentTicket}
                    onChange={handleStudentTicket}
                    label="Toggle between student and full price ticket"
                  />
                  <span
                    className={`font-body text-xs transition-colors duration-150 ${
                      !studentTicket ? "text-forest-700 font-semibold" : "text-stone-mid"
                    }`}
                  >
                    Full price
                  </span>
                </div>
                <span className="font-body text-sm font-semibold text-forest-800 w-14 text-right tabular-nums">
                  €{parkCost}
                </span>
              </div>
            </div>

            {/* Food & Drink */}
            <div className="bg-warm-white rounded-2xl shadow-sm border border-earth-100 p-6">
              <CategoryHeader title="Food & Drink" />
              <div className="space-y-4">
                {SLIDER_ITEMS.map((item) => (
                  <div key={item.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-body text-sm text-stone-dark">{item.label}</span>
                      <div className="flex items-center gap-0.5">
                        <span className="font-body text-sm font-semibold text-forest-800">€</span>
                        <input
                          type="number"
                          min={item.min}
                          max={item.max}
                          step={item.step}
                          value={foodSliders[item.id] ?? 0}
                          onChange={(e) => {
                            const clamped = Math.min(item.max, Math.max(item.min, Number(e.target.value)));
                            handleSlider(item.id, clamped);
                          }}
                          className="w-16 text-right font-body text-sm font-semibold text-forest-800 tabular-nums bg-transparent border-b border-earth-200 focus:border-forest-500 focus:outline-none py-0.5"
                        />
                      </div>
                    </div>
                    <SliderInput
                      item={item}
                      value={foodSliders[item.id] ?? item.min}
                      onChange={handleSlider}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-stone-mid">€{item.min}</span>
                      <span className="text-xs text-stone-mid">€{item.max}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-earth-100 flex justify-between">
                <span className="font-body text-sm font-semibold text-stone-mid">Subtotal</span>
                <span className="font-body text-sm font-semibold text-forest-700">€{foodTotal}</span>
              </div>
            </div>

            {/* Activities */}
            <div className="bg-warm-white rounded-2xl shadow-sm border border-earth-100 p-6">
              <CategoryHeader title="Activities" />
              {activityLineItems.map((item) => (
                <LineItem
                  key={`${item.contextId}-${item.label}`}
                  label={item.label}
                  control={
                    <Toggle
                      checked={item.isOn}
                      onChange={() => handleActivity(item.contextId)}
                      label={item.label}
                    />
                  }
                  cost={item.cost}
                  dimmed={!item.isOn}
                />
              ))}
              <div className="mt-2 pt-2 border-t border-earth-100 flex justify-between">
                <span className="font-body text-sm font-semibold text-stone-mid">Subtotal</span>
                <span className="font-body text-sm font-semibold text-forest-700">€{activityTotal}</span>
              </div>
            </div>

            {/* Accommodation (her cost) */}
            <div className="bg-warm-white rounded-2xl shadow-sm border border-earth-100 p-6">
              <CategoryHeader title="Accommodation" />
              <p className="font-body text-xs text-stone-mid mb-3">
                Estimated at midpoint of price range
              </p>
              <div className="space-y-2">
                {ACCOMMODATION_OPTIONS.map((opt) => {
                  const isSelected = selectedAccommodation === opt.contextId;
                  return (
                    <button
                      key={opt.budgetId}
                      onClick={() => handleAccommodation(opt.contextId)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all duration-150 ${
                        isSelected
                          ? "border-forest-500 bg-forest-50 shadow-sm"
                          : "border-earth-100 bg-earth-50 hover:border-earth-300"
                      }`}
                    >
                      <span
                        className={`font-body text-sm font-medium ${
                          isSelected ? "text-forest-800" : "text-stone-dark"
                        }`}
                      >
                        {opt.name}
                      </span>
                      <span
                        className={`font-body text-sm tabular-nums ${
                          isSelected
                            ? "text-forest-700 font-semibold"
                            : "text-stone-mid"
                        }`}
                      >
                        €{opt.min}–€{opt.max}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gear (Optional) */}
            <div className="bg-warm-white rounded-2xl shadow-sm border border-earth-100 p-6">
              <CategoryHeader title="Gear (Optional)" />
              <p className="font-body text-xs text-stone-mid mb-3">
                Toggle gear you still need to buy — counted separately in the total
              </p>
              {GEAR_TOGGLES.map((t) => (
                <LineItem
                  key={t.id}
                  label={t.label}
                  note={t.note}
                  control={
                    <Toggle
                      checked={gearOn[t.id] ?? false}
                      onChange={() => handleGear(t.id)}
                      label={t.label}
                    />
                  }
                  cost={t.cost}
                  dimmed={!(gearOn[t.id] ?? false)}
                />
              ))}
              <div className="mt-2 pt-2 border-t border-earth-100 flex justify-between">
                <span className="font-body text-sm font-semibold text-stone-mid">Gear subtotal</span>
                <span className="font-body text-sm font-semibold text-forest-700">
                  {gearActive ? `€${gearTotal}` : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Right column — sticky totals */}
          <div className="lg:sticky lg:top-20">
            <div
              className="rounded-2xl p-6 text-white shadow-xl"
              style={{
                background:
                  "linear-gradient(145deg, var(--color-forest-900) 0%, var(--color-forest-800) 100%)",
              }}
            >
              <h3 className="font-heading text-xl text-forest-100 mb-6">
                Running Total
              </h3>

              <div className="space-y-4">
                {/* Trip expenses */}
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="font-body text-xs uppercase tracking-widest text-forest-300 mb-1">
                    Trip Expenses
                  </p>
                  <p className="font-heading text-3xl text-white">
                    <AnimatedCost value={hisCoreTotal} />
                  </p>
                  <p className="font-body text-xs text-forest-300 mt-1">
                    Driving + park + food + activities
                  </p>
                </div>

                {/* Accommodation */}
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="font-body text-xs uppercase tracking-widest text-forest-300 mb-1">
                    Accommodation
                  </p>
                  <p className="font-heading text-3xl text-white">
                    <AnimatedCost value={herAccomMid} />
                  </p>
                  <p className="font-body text-xs text-forest-300 mt-1">
                    {selectedAccomOption.name} (midpoint est.)
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-white/20" />

                {/* Trip total */}
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-forest-300 mb-1">
                    Trip total
                  </p>
                  <p className="font-heading text-4xl text-water-300">
                    <AnimatedCost value={tripTotal} />
                  </p>
                </div>

                {/* With gear */}
                {gearActive && (
                  <div className="bg-earth-900/30 rounded-xl p-3 border border-white/10">
                    <p className="font-body text-xs uppercase tracking-widest text-earth-300 mb-1">
                      With gear
                    </p>
                    <p className="font-heading text-2xl text-earth-200">
                      <AnimatedCost value={withGear} />
                    </p>
                  </div>
                )}
              </div>

              {/* Breakdown note */}
              <p className="font-body text-xs text-forest-400 mt-6 leading-relaxed">
                Accommodation shown as midpoint estimate. Select your preferred
                option above to update the total.
              </p>
            </div>

            {/* Quick summary chips */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { label: "Driving", value: fixedTotal },
                { label: "Park", value: parkCost },
                { label: "Food", value: foodTotal },
                { label: "Activities", value: activityTotal },
              ].map((chip) => (
                <div
                  key={chip.label}
                  className="bg-warm-white border border-earth-100 rounded-xl p-3 text-center shadow-sm"
                >
                  <p className="font-body text-xs text-stone-mid">{chip.label}</p>
                  <p className="font-body text-base font-semibold text-forest-800 tabular-nums">
                    €{chip.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastVisible && (
        <div
          className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-forest-800 text-white px-4 py-2 rounded-full text-sm font-body shadow-lg"
          style={{ animation: "toast-slide-up 0.2s ease-out" }}
          role="status"
          aria-live="polite"
        >
          Total updated: €{hisCoreTotal}
        </div>
      )}

      {/* Slider thumb styling */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--color-forest-700);
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--color-forest-700);
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          cursor: pointer;
        }
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 9999px;
        }
        @keyframes toast-slide-up {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </section>
  );
}
