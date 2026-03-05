import React from "react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const routeStops = [
  {
    id: "rijeka",
    label: "Rijeka",
    sublabel: "Start — fill up fuel here",
    type: "origin" as const,
  },
  {
    id: "ogulin",
    label: "Ogulin",
    sublabel: "Optional stop — Đulin Ponor cave & Fairy Tale Museum",
    type: "optional" as const,
  },
  {
    id: "karlovac",
    label: "Karlovac",
    sublabel: "Optional coffee stop",
    type: "optional" as const,
  },
  {
    id: "slunj",
    label: "Slunj / Rastoke",
    sublabel: "Optional — waterfall village on the route",
    type: "optional" as const,
  },
  {
    id: "plitvice",
    label: "Plitvice Lakes",
    sublabel: "Destination — ~170km, 2–2.5 hrs",
    type: "destination" as const,
  },
] as const;

const costItems = [
  {
    label: "Fuel",
    value: "€38",
    detail: "340 km round trip · 7 L/100 km · €1.47/L",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 10h2l2-7h10l2 7h2v2H3v-2zm4 4h10v6H7v-6z" />
      </svg>
    ),
  },
  {
    label: "Tolls",
    value: "€9",
    detail: "Round trip on A6 + A1",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    label: "Parking",
    value: "€9",
    detail: "~6 hours at €1.50/hr",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm5 5h3a3 3 0 010 6h-3V8zm0 6v4" />
      </svg>
    ),
  },
  {
    label: "Total",
    value: "€56",
    detail: "Full round trip driving costs",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    isTotal: true,
  },
] as const;

const winterEquipmentItems = [
  "Winter tyres (M+S markings) on all four wheels",
  "OR: Summer tyres + snow chains physically in the vehicle",
];

const checklistItems = [
  "Check tyres — winter/M+S approved, or carry chains",
  "Warning vest, first aid kit, warning triangle in car",
  "Check HAK.hr morning of departure for road conditions",
  "Fill fuel in Rijeka before leaving",
  "Have cash for tolls (A6 + A1)",
];

const phoneNumbers = [
  { label: "Plitvice Park Info", number: "+38553751014", display: "+385 53 751 014" },
  { label: "Restaurant Degenija", number: "+38547782060", display: "+385 47 782 060" },
  { label: "Barac Caves", number: "+38547782113", display: "+385 47 782 113" },
  { label: "Licka Kuca", number: "+385992767406", display: "+385 99 2767 406" },
  { label: "HAK Road Conditions", number: "08009987", display: "0800 9987" },
] as const;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function RouteMap() {
  return (
    <div className="relative">
      <div className="flex flex-col gap-0">
        {routeStops.map((stop, index) => {
          const isLast = index === routeStops.length - 1;
          const isOrigin = stop.type === "origin";
          const isDestination = stop.type === "destination";
          const isOptional = stop.type === "optional";

          return (
            <div key={stop.id} className="flex gap-4">
              {/* Line + dot column */}
              <div className="flex flex-col items-center">
                <div
                  className={[
                    "w-4 h-4 rounded-full shrink-0 mt-1 border-2 z-10",
                    isOrigin
                      ? "bg-forest-700 border-forest-700 shadow-md"
                      : isDestination
                      ? "bg-water-600 border-water-600 shadow-md"
                      : "bg-warm-white border-earth-400",
                  ].join(" ")}
                />
                {!isLast && (
                  <div
                    className={[
                      "w-0.5 flex-1 mt-0.5 mb-0.5",
                      isOptional
                        ? "border-l-2 border-dashed border-earth-300"
                        : "bg-earth-300",
                    ].join(" ")}
                    style={{ minHeight: "36px" }}
                  />
                )}
              </div>

              {/* Stop content */}
              <div className={["pb-6", isLast ? "pb-0" : ""].join(" ")}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={[
                      "font-body font-semibold text-base",
                      isOrigin
                        ? "text-forest-800"
                        : isDestination
                        ? "text-water-700"
                        : "text-stone-dark",
                    ].join(" ")}
                  >
                    {stop.label}
                  </span>
                  {isOptional && (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-body font-medium bg-earth-100 text-earth-700">
                      optional
                    </span>
                  )}
                  {isOrigin && (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-body font-medium bg-forest-100 text-forest-700">
                      start
                    </span>
                  )}
                  {isDestination && (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-body font-medium bg-water-100 text-water-700">
                      destination
                    </span>
                  )}
                </div>
                <p className="font-body text-sm text-stone-mid mt-0.5">
                  {stop.sublabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CostCard({
  label,
  value,
  detail,
  icon,
  isTotal,
}: {
  label: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
  isTotal?: boolean;
}) {
  return (
    <div
      className={[
        "bg-warm-white rounded-2xl border p-5 flex flex-col gap-2 shadow-sm",
        isTotal
          ? "border-forest-300 bg-forest-50"
          : "border-earth-100",
      ].join(" ")}
    >
      <div
        className={[
          "w-9 h-9 rounded-xl flex items-center justify-center",
          isTotal ? "bg-forest-700 text-white" : "bg-earth-100 text-earth-700",
        ].join(" ")}
      >
        {icon}
      </div>
      <div>
        <p
          className={[
            "font-heading text-2xl font-bold",
            isTotal ? "text-forest-800" : "text-stone-dark",
          ].join(" ")}
        >
          {value}
        </p>
        <p className="font-body text-xs font-semibold text-stone-mid uppercase tracking-wide">
          {label}
        </p>
      </div>
      <p className="font-body text-xs text-stone-mid">{detail}</p>
    </div>
  );
}

function WinterWarning() {
  return (
    <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-6">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shrink-0">
          <svg
            className="w-5 h-5 text-amber-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-heading text-lg text-amber-900 leading-tight">
            Winter Equipment — Mandatory Until April 15
          </h3>
          <p className="font-body text-sm text-amber-800 mt-0.5">
            Croatian law requires one of the following on A6 through Gorski
            Kotar:
          </p>
        </div>
      </div>

      {/* Requirements list */}
      <ul className="space-y-2 mb-4 pl-1">
        {winterEquipmentItems.map((item) => (
          <li key={item} className="flex items-start gap-2 font-body text-sm text-amber-900">
            <svg
              className="w-4 h-4 text-amber-600 shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {item}
          </li>
        ))}
      </ul>

      {/* Fine notice */}
      <div className="rounded-xl bg-amber-100 border border-amber-300 px-4 py-3 flex items-center gap-2">
        <svg
          className="w-4 h-4 text-amber-700 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="font-body text-sm text-amber-800">
          <span className="font-semibold">Fine: ~€130</span> and you will be prevented from continuing
        </p>
      </div>

      <p className="font-body text-sm font-semibold text-amber-900 mt-3">
        Check your tyres before departure.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function DrivingLogistics() {
  return (
    <section id="driving" className="py-12 px-4 sm:py-16 sm:px-6 bg-earth-50">
      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-widest uppercase text-earth-600 mb-2">
            Getting There
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl text-stone-dark mb-3">
            The Drive from Rijeka
          </h2>
          <p className="font-body text-stone-mid text-base max-w-lg mx-auto">
            Rijeka to Plitvice via A6 through the Gorski Kotar mountains — 170 km, 2–2.5 hours.
            Thirteen tunnels, twenty-four viaducts.
          </p>
        </div>

        {/* Main grid: Route map + Cost breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* Route map card */}
          <div className="bg-warm-white rounded-2xl shadow-sm border border-earth-100 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-forest-100 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-forest-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-stone-dark">Route</h3>
            </div>

            {/* Road tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["A6", "Bosiljevo", "A1", "Karlovac", "D1"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex px-3 py-1 rounded-full text-xs font-body font-semibold bg-forest-700 text-white"
                >
                  {tag}
                </span>
              ))}
            </div>

            <RouteMap />

            {/* Terrain note */}
            <div className="mt-5 rounded-xl bg-earth-50 border border-earth-100 px-4 py-3">
              <p className="font-body text-xs text-stone-mid">
                <span className="font-semibold text-stone-dark">A6 terrain:</span>{" "}
                Gorski Kotar mountains — 13 tunnels, 24 viaducts. Scenic but can
                be wintry. Then flat and easy on D1 toward Plitvice.
              </p>
            </div>
          </div>

          {/* Right column: cost breakdown + winter warning */}
          <div className="flex flex-col gap-6">

            {/* Cost breakdown */}
            <div className="bg-warm-white rounded-2xl shadow-sm border border-earth-100 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-earth-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-earth-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-stone-dark">
                  Driving Costs
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {costItems.map((item) => (
                  <CostCard key={item.label} {...item} />
                ))}
              </div>
            </div>

            {/* Winter warning */}
            <WinterWarning />
          </div>
        </div>

        {/* Bottom row: Checklist + Phone numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Pre-trip checklist */}
          <div className="bg-warm-white rounded-2xl shadow-sm border border-earth-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-forest-100 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-forest-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-stone-dark">
                Pre-Trip Checklist
              </h3>
            </div>
            <ul className="space-y-3">
              {checklistItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded border-2 border-earth-300 shrink-0 flex items-center justify-center bg-warm-white">
                    <span className="sr-only">Checkbox</span>
                  </span>
                  <span className="font-body text-sm text-stone-dark leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key phone numbers */}
          <div className="bg-warm-white rounded-2xl shadow-sm border border-earth-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-water-100 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-water-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-stone-dark">
                Key Numbers
              </h3>
            </div>
            <ul className="space-y-2">
              {phoneNumbers.map(({ label, number, display }) => (
                <li
                  key={number}
                  className="flex items-center justify-between gap-3 py-2.5 border-b border-earth-50 last:border-0"
                >
                  <span className="font-body text-sm text-stone-dark">{label}</span>
                  <a
                    href={`tel:${number}`}
                    className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-water-700 hover:text-water-600 transition-colors duration-150"
                    aria-label={`Call ${label}`}
                  >
                    <svg
                      className="w-3.5 h-3.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {display}
                  </a>
                </li>
              ))}
            </ul>

            {/* HAK note */}
            <div className="mt-4 rounded-xl bg-earth-50 border border-earth-100 px-3 py-2.5">
              <p className="font-body text-xs text-stone-mid">
                <span className="font-semibold text-stone-dark">HAK</span> is
                the Croatian Automobile Club — call{" "}
                <a
                  href="tel:08009987"
                  className="text-water-700 font-semibold hover:text-water-600"
                >
                  0800 9987
                </a>{" "}
                for real-time road and weather conditions before departure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
