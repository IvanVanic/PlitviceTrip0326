"use client";

import React, { useState, useCallback } from "react";

// --- Types ---
interface SliderItem {
  id: string;
  label: string;
  min: number;
  max: number;
  default: number;
  step: number;
}

interface ToggleItem {
  id: string;
  label: string;
  cost: number;
  defaultOn: boolean;
  note?: string;
}

interface AccommodationOption {
  id: string;
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
  { id: "anniversary_dinner", label: "Anniversary dinner", min: 50, max: 90, default: 60, step: 5 },
  { id: "casual_dinner", label: "Casual dinner", min: 30, max: 50, default: 35, step: 5 },
  { id: "groceries", label: "Groceries & snacks", min: 20, max: 40, default: 25, step: 5 },
  { id: "coffees", label: "Coffees & misc", min: 10, max: 20, default: 12, step: 2 },
];

const ACTIVITY_TOGGLES: ToggleItem[] = [
  { id: "rastoke_entry", label: "Rastoke entry (2 people)", cost: 10, defaultOn: true },
  { id: "rastoke_parking", label: "Rastoke parking", cost: 3, defaultOn: true },
  { id: "ogulin_museum", label: "Ogulin museum", cost: 8, defaultOn: false },
  { id: "barac_caves", label: "Barać Caves (2 student tickets)", cost: 20, defaultOn: false },
];

const GEAR_TOGGLES: ToggleItem[] = [
  { id: "his_boots", label: "His boots", cost: 55, defaultOn: false, note: "Quechua MH500 Mid" },
  { id: "her_boots", label: "Her boots", cost: 70, defaultOn: false, note: "Quechua MH500 Mid Women's" },
  { id: "his_jacket", label: "His jacket", cost: 70, defaultOn: false, note: "Quechua MH500 Rain Jacket" },
  { id: "her_jacket", label: "Her jacket", cost: 40, defaultOn: false, note: "Quechua MH100 Rain Jacket" },
];

const ACCOMMODATION_OPTIONS: AccommodationOption[] = [
  { id: "rustic_lodge", name: "Rustic Lodge", min: 95, max: 130 },
  { id: "etno_garden", name: "Etno Garden", min: 154, max: 198 },
  { id: "16_lakes", name: "16 Lakes Hotel", min: 130, max: 230 },
  { id: "degenija", name: "Hotel Degenija", min: 154, max: 204 },
  { id: "tesla", name: "Tesla's Gastro Hotel", min: 254, max: 340 },
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
  // Park ticket
  const [studentTicket, setStudentTicket] = useState(true);
  const parkCost = studentTicket ? 12 : 20;

  // Sliders
  const [sliderValues, setSliderValues] = useState<Record<string, number>>(
    Object.fromEntries(SLIDER_ITEMS.map((s) => [s.id, s.default]))
  );

  // Activity toggles
  const [activityOn, setActivityOn] = useState<Record<string, boolean>>(
    Object.fromEntries(ACTIVITY_TOGGLES.map((t) => [t.id, t.defaultOn]))
  );

  // Gear toggles
  const [gearOn, setGearOn] = useState<Record<string, boolean>>(
    Object.fromEntries(GEAR_TOGGLES.map((t) => [t.id, t.defaultOn]))
  );

  // Accommodation
  const [selectedAccomId, setSelectedAccomId] = useState(ACCOMMODATION_OPTIONS[0].id);
  const selectedAccom = ACCOMMODATION_OPTIONS.find((a) => a.id === selectedAccomId)!;

  const handleSlider = useCallback((id: string, v: number) => {
    setSliderValues((prev) => ({ ...prev, [id]: v }));
  }, []);

  const handleActivity = useCallback((id: string, v: boolean) => {
    setActivityOn((prev) => ({ ...prev, [id]: v }));
  }, []);

  const handleGear = useCallback((id: string, v: boolean) => {
    setGearOn((prev) => ({ ...prev, [id]: v }));
  }, []);

  // Totals
  const fixedTotal = FIXED_COSTS.reduce((sum, f) => sum + f.cost, 0);
  const foodTotal = SLIDER_ITEMS.reduce((sum, s) => sum + sliderValues[s.id], 0);
  const activityTotal = ACTIVITY_TOGGLES.reduce(
    (sum, t) => sum + (activityOn[t.id] ? t.cost : 0),
    0
  );
  const gearTotal = GEAR_TOGGLES.reduce(
    (sum, t) => sum + (gearOn[t.id] ? t.cost : 0),
    0
  );

  const hisCoreTotal = fixedTotal + parkCost + foodTotal + activityTotal;
  const herAccomMid = Math.round((selectedAccom.min + selectedAccom.max) / 2);
  const tripTotal = hisCoreTotal + herAccomMid;
  const withGear = tripTotal + gearTotal;
  const gearActive = gearTotal > 0;

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
                    onChange={(v) => setStudentTicket(!v)}
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
                      <span className="font-body text-sm font-semibold text-forest-800 tabular-nums">
                        €{sliderValues[item.id]}
                      </span>
                    </div>
                    <SliderInput
                      item={item}
                      value={sliderValues[item.id]}
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
              {ACTIVITY_TOGGLES.map((t) => (
                <LineItem
                  key={t.id}
                  label={t.label}
                  control={
                    <Toggle
                      checked={activityOn[t.id]}
                      onChange={(v) => handleActivity(t.id, v)}
                      label={t.label}
                    />
                  }
                  cost={t.cost}
                  dimmed={!activityOn[t.id]}
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
                {ACCOMMODATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedAccomId(opt.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all duration-150 ${
                      selectedAccomId === opt.id
                        ? "border-forest-500 bg-forest-50 shadow-sm"
                        : "border-earth-100 bg-earth-50 hover:border-earth-300"
                    }`}
                  >
                    <span
                      className={`font-body text-sm font-medium ${
                        selectedAccomId === opt.id ? "text-forest-800" : "text-stone-dark"
                      }`}
                    >
                      {opt.name}
                    </span>
                    <span
                      className={`font-body text-sm tabular-nums ${
                        selectedAccomId === opt.id
                          ? "text-forest-700 font-semibold"
                          : "text-stone-mid"
                      }`}
                    >
                      €{opt.min}–€{opt.max}
                    </span>
                  </button>
                ))}
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
                      checked={gearOn[t.id]}
                      onChange={(v) => handleGear(t.id, v)}
                      label={t.label}
                    />
                  }
                  cost={t.cost}
                  dimmed={!gearOn[t.id]}
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
                    {selectedAccom.name} (midpoint est.)
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
                Accommodation shown as midpoint estimate. Adjust the slider above
                to reflect your chosen option.
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
      `}</style>
    </section>
  );
}
