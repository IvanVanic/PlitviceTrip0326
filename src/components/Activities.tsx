"use client";

import React, { useState } from "react";

type Activity = {
  id: string;
  name: string;
  cost: string;
  duration: string;
  locationNote: string;
  description: string;
  seasonalNote?: string;
  phone?: string;
  hours?: string;
  isHero?: boolean;
};

type Day3Option = {
  id: string;
  label: string;
  description: string;
  icon: string;
};

const activities: Activity[] = [
  {
    id: "rastoke",
    name: "Rastoke Village",
    cost: "€5 / person",
    duration: "1–1.5 hrs",
    locationNote: "30km north of park — on the route, not a detour",
    description:
      "23 waterfalls tumbling through old mill houses, peak flow in March. The village is built on and around the waterfalls themselves — you walk across bridges over rushing water between centuries-old working mills. Genuinely magical in early spring.",
    seasonalNote: "Peak flow in March — best time of year to visit",
    isHero: true,
  },
  {
    id: "ogulin-cave",
    name: "Ogulin — Đulin Ponor",
    cost: "Free",
    duration: "20–30 min",
    locationNote: "Halfway on the route to the park",
    description:
      "The Dobra River vanishes into a 16km cave system right in the middle of town. You can stand at the edge and watch the water disappear underground. Eerie, beautiful, and completely free.",
    seasonalNote: "Open year-round",
  },
  {
    id: "ogulin-museum",
    name: "Ogulin — Fairy Tale Museum",
    cost: "€5–10 / person",
    duration: "45–60 min",
    hours: "Tue–Sun 10:00–17:00",
    locationNote: "Ogulin town centre — same stop as Đulin Ponor",
    description:
      "Croatian folklore and fairy tales displayed inside a medieval castle. Ivana Brlić-Mažuranić, the 'Croatian Andersen', was born in Ogulin. Charming and unexpected.",
    seasonalNote: "Closed Mondays",
  },
  {
    id: "barac-caves",
    name: "Barać Caves",
    cost: "€13.50 / person (€10 student)",
    duration: "1 hr guided tour",
    locationNote: "10km from the park entrance",
    description:
      "Beautiful stalactite cave system with impressive formations. Guided tours run on a schedule — call ahead to confirm availability in March.",
    seasonalNote: "Likely Fridays only in March — call to confirm",
    phone: "+385 47 782 113",
  },
  {
    id: "stargazing",
    name: "Stargazing",
    cost: "Free",
    duration: "Evening",
    locationNote: "Dark Sky Park nearby — minimal light pollution",
    description:
      "Plitvice sits in one of Europe's darkest sky areas. Step outside after dinner and let your eyes adjust. On a clear March night the Milky Way is visible with the naked eye.",
    seasonalNote: "Best on clear nights — March skies are often exceptional",
  },
  {
    id: "evening-walk",
    name: "Evening Forest Walk",
    cost: "Free",
    duration: "Any evening",
    locationNote: "Forest roads directly from the accommodation",
    description:
      "The forest roads around the park are completely silent after dark. Occasional owl calls. The kind of quiet you can't find in a city. Walk for 20 minutes and you'll feel reset.",
    seasonalNote: "Year-round — take a torch",
  },
];

const day3Options: Day3Option[] = [
  {
    id: "rastoke-morning",
    label: "Rastoke Morning",
    description: "Misty morning light through the mill waterfalls — the most atmospheric time. Allow 1.5 hrs. Perfect if skipped on Day 1.",
    icon: "waterfall",
  },
  {
    id: "barac-caves",
    label: "Barać Caves",
    description: "If the Friday tour is running. Call ahead (+385 47 782 113) to confirm March schedule before committing.",
    icon: "cave",
  },
  {
    id: "ogulin-return",
    label: "Ogulin Stop",
    description: "If Đulin Ponor or the Fairy Tale Museum were skipped on the drive down. Works well as a 1hr detour on the return.",
    icon: "castle",
  },
  {
    id: "chill-drive",
    label: "Chill + Direct Drive",
    description: "Late checkout, viewpoint coffee stop, pick up local products (honey, cheese, rakija) from a roadside stall — then home.",
    icon: "coffee",
  },
];

function CostBadge({ cost }: { cost: string }) {
  const isFree = cost.toLowerCase() === "free";
  return (
    <span
      className={[
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body font-semibold",
        isFree
          ? "bg-forest-100 text-forest-700"
          : "bg-earth-100 text-earth-800",
      ].join(" ")}
    >
      {cost}
    </span>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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

function Day3Icon({ icon }: { icon: string }) {
  if (icon === "waterfall") {
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16.5c0 2.485 2.239 4.5 5 4.5s5-2.015 5-4.5M12 3v10m0 0c0-2 2-4 2-4M12 13c0-2-2-4-2-4" />
      </svg>
    );
  }
  if (icon === "cave") {
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
    );
  }
  if (icon === "castle") {
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    );
  }
  // coffee
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
    </svg>
  );
}

function ActivityCard({
  activity,
  included,
  onToggle,
}: {
  activity: Activity;
  included: boolean;
  onToggle: () => void;
}) {
  if (activity.isHero) {
    return (
      <div className="col-span-full bg-warm-white rounded-2xl border border-earth-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-water-700 to-water-900 p-1" />
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              {/* Hero badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold bg-water-100 text-water-800 mb-3">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Don&apos;t Miss This
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl text-stone-dark mb-2">
                {activity.name}
              </h3>
              <div className="flex flex-wrap gap-3 mb-4 text-sm font-body text-stone-mid">
                <span className="flex items-center gap-1.5">
                  <ClockIcon className="w-4 h-4" />
                  {activity.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <PinIcon className="w-4 h-4" />
                  {activity.locationNote}
                </span>
                <CostBadge cost={activity.cost} />
              </div>
              <p className="font-body text-base text-stone-dark leading-relaxed mb-3 max-w-2xl">
                {activity.description}
              </p>
              {activity.seasonalNote && (
                <p className="font-body text-sm text-water-700 font-medium flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {activity.seasonalNote}
                </p>
              )}
            </div>
            {/* Toggle */}
            <div className="shrink-0">
              <button
                onClick={onToggle}
                className={[
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl font-body font-semibold text-sm transition-all duration-200",
                  included
                    ? "bg-forest-700 text-white shadow-sm"
                    : "border border-earth-300 text-stone-mid hover:border-forest-400 hover:text-forest-700",
                ].join(" ")}
                aria-pressed={included}
              >
                {included ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    In the plan
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add to plan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        "bg-warm-white rounded-2xl border shadow-sm p-6 flex flex-col gap-3 transition-all duration-200",
        included ? "border-forest-300 ring-1 ring-forest-200" : "border-earth-100 hover:shadow-md",
      ].join(" ")}
    >
      {/* Name + toggle */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading text-lg text-stone-dark leading-snug">{activity.name}</h3>
        <button
          onClick={onToggle}
          className={[
            "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
            included
              ? "bg-forest-700 text-white"
              : "border border-earth-200 text-stone-mid hover:border-forest-400 hover:text-forest-600",
          ].join(" ")}
          aria-pressed={included}
          aria-label={included ? `Remove ${activity.name} from plan` : `Add ${activity.name} to plan`}
        >
          {included ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-2 text-xs font-body text-stone-mid">
        <span className="flex items-center gap-1">
          <ClockIcon className="w-3.5 h-3.5" />
          {activity.duration}
        </span>
        {activity.hours && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {activity.hours}
          </span>
        )}
        <CostBadge cost={activity.cost} />
      </div>

      <p className="font-body text-xs text-stone-mid flex items-start gap-1">
        <PinIcon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        {activity.locationNote}
      </p>

      <p className="font-body text-sm text-stone-dark leading-relaxed">{activity.description}</p>

      {activity.seasonalNote && (
        <p className="font-body text-xs text-water-700 font-medium italic">{activity.seasonalNote}</p>
      )}

      {activity.phone && (
        <a
          href={`tel:${activity.phone}`}
          className="inline-flex items-center gap-1.5 text-xs font-body text-water-700 hover:text-water-600 transition-colors duration-200 font-medium"
        >
          <PhoneIcon className="w-3.5 h-3.5" />
          {activity.phone}
        </a>
      )}
    </div>
  );
}

export default function Activities() {
  const [includedActivities, setIncludedActivities] = useState<Set<string>>(
    new Set(["rastoke", "stargazing"])
  );
  const [selectedDay3, setSelectedDay3] = useState<string>("rastoke-morning");

  const toggleActivity = (id: string) => {
    setIncludedActivities((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const includedCount = includedActivities.size;

  return (
    <section id="activities" className="py-16 px-4 bg-earth-50">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="font-body text-xs tracking-widest uppercase text-earth-600 mb-2">
            Day Trips &amp; Extras
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl text-stone-dark mb-3">
            Beyond the Lakes
          </h2>
          <p className="font-body text-stone-mid text-base max-w-lg mx-auto">
            The park is the main event — but these extras are worth knowing about
          </p>
        </div>

        {/* Included count */}
        {includedCount > 0 && (
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-forest-50 border border-forest-200 rounded-full font-body text-sm text-forest-800 font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {includedCount} activit{includedCount === 1 ? "y" : "ies"} in your plan
            </span>
          </div>
        )}

        {/* Activities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              included={includedActivities.has(activity.id)}
              onToggle={() => toggleActivity(activity.id)}
            />
          ))}
        </div>

        {/* Evening note */}
        <div className="bg-stone-dark rounded-2xl p-6 sm:p-8 mb-14 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 mb-4">
            <svg className="w-5 h-5 text-water-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </div>
          <h3 className="font-heading text-xl text-warm-white mb-2">About the Evenings</h3>
          <p className="font-body text-earth-200 text-sm leading-relaxed max-w-xl mx-auto">
            Dinner <span className="font-semibold text-white">is</span> the evening — the area is quiet in March,
            and that&apos;s honestly the point. After dinner, the stargazing and silence is its own kind of magic.
            The forest sounds different at night. Bring a blanket.
          </p>
        </div>

        {/* Day 3 morning selector */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-heading text-2xl sm:text-3xl text-stone-dark">Day 3 Morning Plan</h3>
            <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-body font-medium bg-earth-200 text-earth-800">
              Pick one
            </span>
          </div>
          <p className="font-body text-sm text-stone-mid mb-6">
            Select your preferred way to spend the last morning before heading home.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {day3Options.map((option) => {
              const isSelected = selectedDay3 === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedDay3(option.id)}
                  className={[
                    "text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4",
                    isSelected
                      ? "border-forest-600 bg-forest-50 shadow-sm"
                      : "border-earth-200 bg-warm-white hover:border-earth-400",
                  ].join(" ")}
                  aria-pressed={isSelected}
                >
                  {/* Icon */}
                  <div
                    className={[
                      "shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200",
                      isSelected ? "bg-forest-700 text-white" : "bg-earth-100 text-earth-600",
                    ].join(" ")}
                  >
                    <Day3Icon icon={option.icon} />
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-heading text-base text-stone-dark">{option.label}</span>
                      {isSelected && (
                        <svg className="w-4 h-4 text-forest-600 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="font-body text-sm text-stone-mid leading-relaxed">{option.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected summary */}
          <div className="mt-6 p-4 bg-warm-white border border-earth-200 rounded-2xl">
            <p className="font-body text-sm text-stone-mid text-center">
              <span className="font-semibold text-stone-dark">Day 3 plan: </span>
              {day3Options.find((o) => o.id === selectedDay3)?.label} —{" "}
              {day3Options.find((o) => o.id === selectedDay3)?.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
