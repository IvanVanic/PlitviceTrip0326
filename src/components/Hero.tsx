import React from "react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #132b16 0%, #1e3a22 25%, #1a6792 65%, #0c2d4a 100%)",
      }}
    >
      {/* Layered gradient overlays for depth */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #2d5a3380 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 70% 60%, #32a3d430 0%, transparent 60%)",
        }}
      />

      {/* Subtle texture pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 8px)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        style={{ animation: "heroFadeIn 1.4s ease-out both" }}
      >
        {/* Eyebrow label */}
        <div
          className="inline-flex items-center gap-2 mb-8"
          style={{ animation: "heroFadeIn 1.4s ease-out 0.1s both" }}
        >
          <span className="block w-8 h-px bg-water-300 opacity-70" />
          <span
            className="text-water-300 text-sm font-body tracking-widest uppercase opacity-90"
          >
            Croatia · March 2026
          </span>
          <span className="block w-8 h-px bg-water-300 opacity-70" />
        </div>

        {/* Main heading */}
        <h1
          className="font-heading text-5xl sm:text-6xl md:text-8xl text-warm-white leading-none mb-4"
          style={{ animation: "heroFadeIn 1.4s ease-out 0.2s both" }}
        >
          Plitvice
          <br />
          <span className="text-water-300">Lakes</span>
        </h1>

        {/* Subheading */}
        <p
          className="font-heading text-xl sm:text-2xl text-earth-200 mb-3 italic"
          style={{ animation: "heroFadeIn 1.4s ease-out 0.35s both" }}
        >
          5th Anniversary Adventure
        </p>

        {/* Date badge */}
        <div
          className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-8 backdrop-blur-sm"
          style={{ animation: "heroFadeIn 1.4s ease-out 0.5s both" }}
        >
          <svg
            className="w-4 h-4 text-water-300"
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
          className="font-body text-base sm:text-lg text-earth-100 max-w-xl mx-auto leading-relaxed opacity-90 mb-12"
          style={{ animation: "heroFadeIn 1.4s ease-out 0.65s both" }}
        >
          Three days of waterfalls, hidden trails, and the best trout in
          Croatia. Planned with love{" "}
          <span className="text-earth-300">(and way too much research).</span>
        </p>

        {/* CTA row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animation: "heroFadeIn 1.4s ease-out 0.8s both" }}
        >
          <a
            href="#itinerary"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-forest-700 hover:bg-forest-600 text-white font-body font-semibold rounded-xl px-7 py-3 transition-colors duration-200 shadow-lg"
          >
            View Itinerary
            <svg
              className="w-4 h-4"
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
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto border border-white/30 hover:border-white/60 text-white font-body rounded-xl px-7 py-3 transition-colors duration-200 backdrop-blur-sm"
          >
            Park Guide
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        style={{ animation: "scrollBounce 2s ease-in-out infinite 2s" }}
        aria-hidden="true"
      >
        <span className="text-xs font-body tracking-widest uppercase">
          Scroll
        </span>
        <svg
          className="w-5 h-5"
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
