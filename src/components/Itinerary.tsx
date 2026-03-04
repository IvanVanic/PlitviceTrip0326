"use client";

import React, { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ActivityCategory = "driving" | "nature" | "food" | "park" | "rest";

interface Activity {
  time: string;
  title: string;
  description: string;
  category: ActivityCategory;
  optional?: boolean;
  optionalKey?: string;
  cost?: string;
  duration?: string;
}

interface DayOption {
  label: string;
  activities: Activity[];
}

interface Day {
  day: number;
  date: string;
  title: string;
  subtitle: string;
  options?: DayOption[];
  activities?: Activity[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const ITINERARY_DATA: Day[] = [
  {
    day: 1,
    date: "Wednesday, March 25",
    title: "Drive + Explore",
    subtitle: "Arrive via scenic stops",
    activities: [
      {
        time: "08:00",
        title: "Leave Rijeka",
        description: "Head south on the A6 motorway toward Karlovac.",
        category: "driving",
        duration: "~1.5 hrs",
      },
      {
        time: "~10:00",
        title: "Ogulin — Dulin Ponor & Fairy Tale Museum",
        description:
          "A dramatic karst sinkhole at the edge of town, plus a charming museum dedicated to Ivana Brlić-Mažuranić.",
        category: "nature",
        optional: true,
        optionalKey: "ogulin",
        duration: "1–1.5 hrs",
      },
      {
        time: "~12:30",
        title: "Rastoke Waterfall Village",
        description:
          "Mills, wooden bridges and streams spilling over limestone ledges — Croatia's hidden gem before Plitvice.",
        category: "nature",
        optional: true,
        optionalKey: "rastoke",
        duration: "1–1.5 hrs",
        cost: "€5/person",
      },
      {
        time: "~14:00",
        title: "Check in to Accommodation",
        description: "Settle in, freshen up, rest before dinner.",
        category: "rest",
      },
      {
        time: "19:00",
        title: "Dinner",
        description:
          "Restaurant Degenija (romantic, anniversary tasting menu) — or Lička Kuća for a more rustic, casual lamb & trout evening.",
        category: "food",
      },
      {
        time: "Late",
        title: "Stargazing",
        description:
          "Plitvice area has very low light pollution. Step outside for a clear March sky.",
        category: "nature",
      },
    ],
  },
  {
    day: 2,
    date: "Thursday, March 26",
    title: "Plitvice Lakes",
    subtitle: "The main event — all day in the park",
    activities: [
      {
        time: "07:00",
        title: "Breakfast at Accommodation",
        description: "Early start to beat any other visitors to the gates.",
        category: "food",
      },
      {
        time: "07:30–07:45",
        title: "Drive to Entrance 1",
        description: "Short drive, free parking opens at 07:00.",
        category: "driving",
        duration: "10–15 min",
      },
      {
        time: "08:00",
        title: "Park Opens — Enter Immediately",
        description:
          "You'll have the lower boardwalks essentially to yourselves for the first hour.",
        category: "park",
      },
      {
        time: "08:15",
        title: "Veliki Slap (Great Waterfall)",
        description:
          "78 m — tallest waterfall in Croatia. Best light is morning. Don't miss the elevated viewpoint trail.",
        category: "park",
      },
      {
        time: "08:30–12:00",
        title: "Route C or Route B",
        description:
          "Route C (8 km, 4–5 hrs): both lake sections, boat + shuttle — recommended if Upper Lakes are open. Route B (4 km, 3–4 hrs): Lower Lakes focus if Upper Lakes are closed.",
        category: "park",
        duration: "3.5–4.5 hrs",
      },
      {
        time: "12:00–13:00",
        title: "Packed Lunch at Picnic Area",
        description: "Bring sandwiches or grab from the park restaurant near the boat dock.",
        category: "food",
      },
      {
        time: "13:00–15:30",
        title: "Continue Route + Mulled Wine",
        description:
          "Finish the loop. Stop at Kozjačka Draga hut for mulled wine (kupina or šipak) if it's open.",
        category: "park",
      },
      {
        time: "16:00",
        title: "Park Closes — Drive Back",
        description: "Short drive back to accommodation.",
        category: "driving",
        duration: "10 min",
      },
      {
        time: "17:00–18:30",
        title: "Rest + Hot Tub (if available)",
        description: "Feet will need it. Highly recommend soaking.",
        category: "rest",
      },
      {
        time: "19:00",
        title: "Dinner — The Other Restaurant",
        description:
          "Whichever of Degenija / Lička Kuća you didn't choose on Day 1.",
        category: "food",
      },
    ],
  },
  {
    day: 3,
    date: "Friday, March 27",
    title: "Morning + Drive Home",
    subtitle: "One last stop before Rijeka",
    options: [
      {
        label: "A — Rastoke Morning",
        activities: [
          {
            time: "08:30",
            title: "Leave Accommodation",
            description: "Check out and head toward Rastoke.",
            category: "driving",
          },
          {
            time: "09:30",
            title: "Rastoke Village",
            description:
              "1.5 hrs at the waterfall mills. Perfect peaceful morning.",
            category: "nature",
            duration: "1.5 hrs",
            cost: "€5/person",
          },
          {
            time: "11:30",
            title: "Drive to Rijeka",
            description: "Back home by 14:00.",
            category: "driving",
            duration: "~2.5 hrs",
          },
        ],
      },
      {
        label: "B — Barac Caves",
        activities: [
          {
            time: "09:30",
            title: "Leave Accommodation",
            description: "Head to Barac Caves near Rakovica.",
            category: "driving",
          },
          {
            time: "10:00–11:00",
            title: "Barac Caves Tour",
            description:
              "Guided cave tour through stalactites and underground rivers.",
            category: "nature",
            duration: "1 hr",
          },
          {
            time: "11:00",
            title: "Drive to Rijeka",
            description: "Back home by 13:30.",
            category: "driving",
            duration: "~2.5 hrs",
          },
        ],
      },
      {
        label: "C — Ogulin Visit",
        activities: [
          {
            time: "08:30",
            title: "Leave Accommodation",
            description: "Head north to Ogulin.",
            category: "driving",
          },
          {
            time: "09:30",
            title: "Ogulin — Dulin Ponor",
            description:
              "Visit the fairy tale sinkhole and museum if skipped on Day 1.",
            category: "nature",
            duration: "1 hr",
          },
          {
            time: "11:00",
            title: "Drive to Rijeka",
            description: "Back home by 13:00.",
            category: "driving",
            duration: "~2 hrs",
          },
        ],
      },
      {
        label: "D — Chill + Direct Drive",
        activities: [
          {
            time: "Morning",
            title: "Scenic Viewpoint",
            description:
              "Quick 20-min stop at the park viewpoint. Buy local honey, rakija, or dried herbs from roadside stalls.",
            category: "nature",
            duration: "20 min",
          },
          {
            time: "~10:00",
            title: "Drive to Rijeka",
            description: "Relaxed drive home. Back by 12:30.",
            category: "driving",
            duration: "~2.5 hrs",
          },
        ],
      },
    ],
  },
];

// ─── Category styling ─────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<
  ActivityCategory,
  { dot: string; badge: string; label: string; icon: string }
> = {
  driving: {
    dot: "bg-earth-400",
    badge: "bg-earth-100 text-earth-700",
    label: "Driving",
    icon: "🚗",
  },
  nature: {
    dot: "bg-forest-500",
    badge: "bg-forest-100 text-forest-700",
    label: "Sightseeing",
    icon: "🌿",
  },
  food: {
    dot: "bg-earth-600",
    badge: "bg-earth-200 text-earth-800",
    label: "Food",
    icon: "🍽️",
  },
  park: {
    dot: "bg-water-500",
    badge: "bg-water-100 text-water-700",
    label: "Park",
    icon: "💧",
  },
  rest: {
    dot: "bg-earth-300",
    badge: "bg-earth-50 text-earth-600",
    label: "Rest",
    icon: "☕",
  },
};

// ─── Toggle Switch ────────────────────────────────────────────────────────────

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
      className={[
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-500",
        checked ? "bg-forest-600" : "bg-earth-200",
      ].join(" ")}
    >
      <span
        className={[
          "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out",
          checked ? "translate-x-4" : "translate-x-0",
        ].join(" ")}
      />
    </button>
  );
}

// ─── Activity Card ────────────────────────────────────────────────────────────

function ActivityCard({
  activity,
  optionalEnabled,
  onToggle,
}: {
  activity: Activity;
  optionalEnabled: boolean;
  onToggle?: (key: string, val: boolean) => void;
}) {
  const cat = CATEGORY_CONFIG[activity.category];
  const isGrey = activity.optional && !optionalEnabled;

  return (
    <div
      className={[
        "relative pl-8 pb-6 last:pb-0 transition-opacity duration-300",
        isGrey ? "opacity-40" : "opacity-100",
      ].join(" ")}
    >
      {/* Timeline line */}
      <div className="absolute left-2.5 top-3 bottom-0 w-px bg-earth-100" aria-hidden="true" />

      {/* Timeline dot */}
      <div
        className={[
          "absolute left-0 top-2 w-5 h-5 rounded-full border-2 border-warm-white shadow-sm flex items-center justify-center",
          cat.dot,
        ].join(" ")}
        aria-hidden="true"
      >
        <span className="text-[8px]">{cat.icon}</span>
      </div>

      {/* Card */}
      <div className="bg-warm-white rounded-2xl border border-earth-100 shadow-sm p-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {activity.time && (
                <span className="text-xs font-body font-semibold text-stone-mid tabular-nums">
                  {activity.time}
                </span>
              )}
              <span
                className={[
                  "inline-flex px-2 py-0.5 rounded-full text-xs font-body font-medium",
                  cat.badge,
                ].join(" ")}
              >
                {cat.label}
              </span>
              {activity.optional && (
                <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-body font-medium bg-earth-50 text-earth-500 border border-earth-200">
                  Optional
                </span>
              )}
            </div>
            <h4 className="font-heading text-base text-stone-dark leading-snug">
              {activity.title}
            </h4>
            <p className="font-body text-sm text-stone-mid mt-1 leading-relaxed">
              {activity.description}
            </p>
            {(activity.duration || activity.cost) && (
              <div className="flex gap-3 mt-2 text-xs font-body text-stone-mid">
                {activity.duration && (
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {activity.duration}
                  </span>
                )}
                {activity.cost && (
                  <span className="flex items-center gap-1 text-earth-600 font-medium">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {activity.cost}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Optional toggle */}
          {activity.optional && activity.optionalKey && onToggle && (
            <div className="flex items-center gap-1.5 shrink-0 mt-1">
              <Toggle
                checked={optionalEnabled}
                onChange={(v) => onToggle(activity.optionalKey!, v)}
                label={`Toggle ${activity.title}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Day Panel ────────────────────────────────────────────────────────────────

function DayPanel({ day, optionals, onToggle }: {
  day: Day;
  optionals: Record<string, boolean>;
  onToggle: (key: string, val: boolean) => void;
}) {
  const [day3Option, setDay3Option] = useState(0);

  const activities =
    day.activities ??
    (day.options ? day.options[day3Option].activities : []);

  return (
    <div>
      {/* Day 3 option selector */}
      {day.options && (
        <div className="mb-6">
          <p className="font-body text-sm font-semibold text-stone-mid mb-2 uppercase tracking-wide">
            Choose your morning:
          </p>
          <div className="flex flex-wrap gap-2">
            {day.options.map((opt, i) => (
              <button
                key={opt.label}
                onClick={() => setDay3Option(i)}
                className={[
                  "px-4 py-2 rounded-xl text-sm font-body font-medium transition-colors duration-150 border",
                  day3Option === i
                    ? "bg-forest-700 text-white border-forest-700"
                    : "bg-warm-white text-stone-mid border-earth-200 hover:border-forest-400 hover:text-forest-700",
                ].join(" ")}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div>
        {activities.map((activity, idx) => (
          <ActivityCard
            key={`${activity.time}-${idx}`}
            activity={activity}
            optionalEnabled={
              activity.optionalKey ? optionals[activity.optionalKey] ?? true : true
            }
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Itinerary() {
  const [activeDay, setActiveDay] = useState(0);
  const [optionals, setOptionals] = useState<Record<string, boolean>>({
    ogulin: true,
    rastoke: true,
  });

  const handleToggle = (key: string, val: boolean) => {
    setOptionals((prev) => ({ ...prev, [key]: val }));
  };

  const day = ITINERARY_DATA[activeDay];

  return (
    <section
      id="itinerary"
      className="py-16 px-4 bg-earth-50"
      aria-labelledby="itinerary-heading"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-block text-xs font-body font-semibold uppercase tracking-widest text-forest-600 mb-3">
            Day by Day
          </span>
          <h2
            id="itinerary-heading"
            className="font-heading text-4xl sm:text-5xl text-stone-dark mb-3"
          >
            Itinerary
          </h2>
          <p className="font-body text-stone-mid text-base max-w-lg mx-auto">
            Three days planned to the hour — with wiggle room for detours and
            spontaneity. Toggle optional stops on or off.
          </p>
        </div>

        {/* Day selector tabs */}
        <div
          className="flex gap-2 mb-8 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Day selector"
        >
          {ITINERARY_DATA.map((d, i) => (
            <button
              key={d.day}
              role="tab"
              aria-selected={activeDay === i}
              aria-controls={`day-panel-${i}`}
              onClick={() => setActiveDay(i)}
              className={[
                "shrink-0 rounded-2xl px-5 py-3 text-left transition-all duration-200 border",
                activeDay === i
                  ? "bg-forest-700 text-white border-forest-700 shadow-md"
                  : "bg-warm-white text-stone-dark border-earth-100 hover:border-forest-300 hover:bg-forest-50",
              ].join(" ")}
            >
              <div className="text-xs font-body font-semibold opacity-75 mb-0.5">
                Day {d.day}
              </div>
              <div className="font-heading text-sm leading-tight">{d.title}</div>
              <div
                className={[
                  "text-xs font-body mt-0.5",
                  activeDay === i ? "opacity-75" : "text-stone-mid",
                ].join(" ")}
              >
                {d.date.split(",")[0]}
              </div>
            </button>
          ))}
        </div>

        {/* Active day header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <h3 className="font-heading text-2xl text-stone-dark">
              {day.title}
            </h3>
            <p className="font-body text-sm text-stone-mid">
              {day.date} · {day.subtitle}
            </p>
          </div>
          {/* Optional toggles legend */}
          {day.activities?.some((a) => a.optional) && (
            <div className="text-xs font-body text-stone-mid bg-warm-white border border-earth-100 rounded-xl px-3 py-2">
              Toggle optional stops with the switches on each card
            </div>
          )}
        </div>

        {/* Day panel */}
        <div
          id={`day-panel-${activeDay}`}
          role="tabpanel"
          aria-label={`Day ${day.day} activities`}
        >
          <DayPanel
            day={day}
            optionals={optionals}
            onToggle={handleToggle}
          />
        </div>
      </div>
    </section>
  );
}
