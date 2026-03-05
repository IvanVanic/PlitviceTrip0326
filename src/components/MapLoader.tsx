"use client";

import dynamic from "next/dynamic";

// This thin client component wraps the dynamic import so that next/dynamic
// with ssr:false is evaluated inside a Client Component boundary.
// The parent page (server component) imports this instead of calling
// dynamic() directly, which Turbopack does not allow in server components.

const InteractiveMap = dynamic(() => import("@/components/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-2xl bg-earth-50 border border-earth-100 flex items-center justify-center"
      style={{ minHeight: "clamp(350px, 55vw, 600px)" }}
      aria-busy="true"
      aria-label="Loading map"
    >
      <div className="flex flex-col items-center gap-3 text-stone-mid">
        <svg
          className="w-8 h-8 animate-spin text-forest-400"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <p className="font-body text-sm">Loading map&hellip;</p>
      </div>
    </div>
  ),
});

export default function MapLoader() {
  return <InteractiveMap />;
}
