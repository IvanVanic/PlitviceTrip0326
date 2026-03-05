import type { Metadata } from "next";
import Link from "next/link";
import MapLoader from "@/components/MapLoader";

export const metadata: Metadata = {
  title: "Interactive Map — Plitvice Trip",
  description:
    "Driving route from Rijeka to Plitvice Lakes with all recommended stops, distances, and travel times.",
};

// ---------------------------------------------------------------------------
// Route reference data
// ---------------------------------------------------------------------------
interface Leg {
  from: string;
  to: string;
  km: number;
  time: string;
  note?: string;
}

const LEGS: Leg[] = [
  {
    from: "Rijeka",
    to: "Ogulin",
    km: 80,
    time: "~1 hr",
    note: "A1 motorway, optional coffee stop",
  },
  {
    from: "Ogulin",
    to: "Rastoke / Slunj",
    km: 50,
    time: "~45 min",
    note: "Scenic drive, leave A1 toward Slunj",
  },
  {
    from: "Rastoke",
    to: "Plitvice (Entrance 1)",
    km: 35,
    time: "~30 min",
    note: "D217 through the canyon — beautiful",
  },
];

const TOTAL = { km: 165, time: "2–2.5 hrs" };

// ---------------------------------------------------------------------------
// Small icon helpers
// ---------------------------------------------------------------------------
function IconClock() {
  return (
    <svg
      className="w-4 h-4 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2" />
    </svg>
  );
}

function IconRoute() {
  return (
    <svg
      className="w-4 h-4 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
      />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg
      className="w-4 h-4 text-earth-300 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function MapPage() {
  return (
    <main className="min-h-screen bg-warm-white pb-20">
      {/* ------------------------------------------------------------------ */}
      {/* Page header                                                          */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #132b16 0%, #1e3a22 40%, #1a6792 100%)",
        }}
      >
        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,#fff 0px,#fff 1px,transparent 1px,transparent 8px)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-forest-300 hover:text-white font-body text-sm transition-colors duration-150 mb-8 group"
          >
            <svg
              className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to trip plan
          </Link>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="block w-6 h-px bg-water-300 opacity-70" />
            <span className="text-water-300 text-xs font-body tracking-widest uppercase">
              Rijeka to Plitvice
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl text-warm-white mb-3 leading-tight">
            Interactive Map
          </h1>
          <p className="font-body text-earth-200 text-base max-w-lg leading-relaxed">
            The full driving route with every recommended stop, key distances,
            and travel times. Click any marker to see details.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Map                                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-6" aria-label="Route map">
        {/* Card lift effect */}
        <div className="rounded-2xl shadow-2xl overflow-hidden ring-1 ring-earth-200">
          <MapLoader />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Quick reference cards                                               */}
      {/* ------------------------------------------------------------------ */}
      <section
        className="max-w-5xl mx-auto px-4 sm:px-6 mt-12"
        aria-label="Route distances and times"
      >
        <div className="mb-6">
          <h2 className="font-heading text-2xl sm:text-3xl text-stone-dark mb-1">
            Route at a Glance
          </h2>
          <p className="font-body text-stone-mid text-sm">
            Distances and drive times for each leg of the journey.
          </p>
        </div>

        {/* Leg cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {LEGS.map((leg, i) => (
            <div
              key={i}
              className="bg-earth-50 border border-earth-100 rounded-2xl p-5 flex flex-col gap-3 hover:border-earth-300 hover:shadow-md transition-all duration-200"
            >
              {/* From → To */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-body text-sm font-semibold text-stone-dark">
                  {leg.from}
                </span>
                <IconArrow />
                <span className="font-body text-sm font-semibold text-stone-dark">
                  {leg.to}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-forest-700">
                  <IconRoute />
                  <span className="font-body text-base font-bold">{leg.km} km</span>
                </div>
                <div className="flex items-center gap-1.5 text-water-700">
                  <IconClock />
                  <span className="font-body text-base font-bold">{leg.time}</span>
                </div>
              </div>

              {/* Note */}
              {leg.note && (
                <p className="font-body text-xs text-stone-mid leading-relaxed border-t border-earth-100 pt-3">
                  {leg.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Total banner */}
        <div
          className="rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{
            background:
              "linear-gradient(120deg, #1e3a22 0%, #1a6792 100%)",
          }}
        >
          <div>
            <p className="font-body text-forest-200 text-xs uppercase tracking-widest mb-1">
              Total journey
            </p>
            <p className="font-heading text-white text-xl sm:text-2xl">
              Rijeka to Plitvice Lakes
            </p>
          </div>
          <div className="flex items-center gap-8 sm:gap-10">
            <div className="text-center">
              <p className="font-body text-2xl font-bold text-warm-white">
                {TOTAL.km} km
              </p>
              <p className="font-body text-xs text-forest-200 mt-0.5">distance</p>
            </div>
            <div className="w-px h-10 bg-white/20" aria-hidden="true" />
            <div className="text-center">
              <p className="font-body text-2xl font-bold text-warm-white">
                {TOTAL.time}
              </p>
              <p className="font-body text-xs text-forest-200 mt-0.5">drive time</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Key reminders                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-10" aria-label="Key reminders">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Departure time */}
          <div className="bg-forest-50 border border-forest-100 rounded-2xl p-5 flex gap-4 items-start">
            <div className="w-9 h-9 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading text-base text-stone-dark mb-1">
                Leave Rijeka by 07:00
              </h3>
              <p className="font-body text-xs text-stone-mid leading-relaxed">
                Ticket sales at Entrance 1 close at 13:00 (winter schedule). Factor
                in Rastoke stop (~1 hr) and parking at the park.
              </p>
            </div>
          </div>

          {/* Winter tyres */}
          <div className="bg-water-50 border border-water-100 rounded-2xl p-5 flex gap-4 items-start">
            <div className="w-9 h-9 rounded-xl bg-water-100 text-water-700 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
                <path strokeLinecap="round" strokeWidth={1.5} d="M12 2v2M12 20v2M2 12h2M20 12h2" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading text-base text-stone-dark mb-1">
                Winter tyres mandatory
              </h3>
              <p className="font-body text-xs text-stone-mid leading-relaxed">
                Required until April 15 in Croatia. Check the car before
                departure. Mountain roads can be icy in late March.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Bottom back link                                                    */}
      {/* ------------------------------------------------------------------ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 flex justify-start">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-body text-sm text-forest-600 hover:text-forest-800 transition-colors duration-150 group"
        >
          <svg
            className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to trip plan
        </Link>
      </div>
    </main>
  );
}
