import React from "react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100dvh+4rem)] flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient — forest green → deep water teal */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #0d2211 0%, #132b16 25%, #1a4a55 60%, #0c1f2e 100%)",
        }}
        aria-hidden="true"
      />
      {/* Subtle radial light — simulates light breaking through canopy */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(33,133,182,0.18) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="relative z-10 text-center px-5 sm:px-6 max-w-3xl mx-auto w-full pt-16"
        style={{ animation: "heroFadeIn 1.4s ease-out both" }}
      >
        {/* Eyebrow label */}
        <div
          className="inline-flex items-center gap-2 mb-6 sm:mb-8"
          style={{ animation: "heroFadeIn 1.4s ease-out 0.1s both" }}
        >
          <span className="block w-6 sm:w-8 h-px bg-water-300 opacity-70" />
          <span className="text-water-300 text-xs sm:text-sm font-body tracking-widest uppercase opacity-90">
            Croatia · March 2026
          </span>
          <span className="block w-6 sm:w-8 h-px bg-water-300 opacity-70" />
        </div>

        {/* Main heading */}
        <h1
          className="font-heading text-4xl sm:text-6xl md:text-8xl text-white leading-none mb-4"
          style={{ animation: "heroFadeIn 1.4s ease-out 0.2s both" }}
        >
          Plitvice Lakes
        </h1>

        {/* Subheading */}
        <p
          className="font-heading text-lg sm:text-2xl text-earth-200 mb-3 italic"
          style={{ animation: "heroFadeIn 1.4s ease-out 0.35s both" }}
        >
          Visual Trip Planner
        </p>

        {/* Date badge */}
        <div
          className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 sm:px-5 py-2 mb-8 backdrop-blur-sm"
          style={{ animation: "heroFadeIn 1.4s ease-out 0.5s both" }}
        >
          <svg
            className="w-4 h-4 text-water-300 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-white text-sm font-body font-medium tracking-wide">
            March 25–27, 2026
          </span>
        </div>

        {/* Description */}
        <p
          className="font-body text-sm sm:text-lg text-earth-100 max-w-xl mx-auto leading-relaxed opacity-90 mb-10 sm:mb-12 px-2 sm:px-0"
          style={{ animation: "heroFadeIn 1.4s ease-out 0.65s both" }}
        >
          Three days of waterfalls, hidden trails, and the best trout in
          Croatia. Planned with love{" "}
          <span className="text-earth-300">(and way too much research).</span>
        </p>

        {/* CTA row — full-width on mobile, inline on sm+ */}
        <div
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
          style={{ animation: "heroFadeIn 1.4s ease-out 0.8s both" }}
        >
          <a
            href="#itinerary"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-forest-700 hover:bg-forest-600 active:bg-forest-800 text-white font-body font-semibold rounded-xl px-7 py-3 transition-colors duration-200 shadow-lg"
          >
            View Itinerary
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
          <a
            href="#park-guide"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] border border-white/30 hover:border-white/60 active:border-white/80 text-white font-body rounded-xl px-7 py-3 transition-colors duration-200 backdrop-blur-sm"
          >
            Park Guide
          </a>
        </div>
      </div>

      {/* Scroll indicator — smaller on mobile */}
      <div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 text-white/50"
        style={{ animation: "scrollBounce 2s ease-in-out infinite 2s" }}
        aria-hidden="true"
      >
        <span className="text-[10px] sm:text-xs font-body tracking-widest uppercase">
          Scroll
        </span>
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.5; }
          50% { transform: translateX(-50%) translateY(6px); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}
