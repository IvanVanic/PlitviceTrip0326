"use client";

import React, { useEffect, useRef } from "react";

// ─── Inline SVG icons ────────────────────────────────────────────────────────

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-5 h-5"}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2.25l2.47 7.597h7.99l-6.464 4.695 2.47 7.597L12 17.444l-6.466 4.695 2.47-7.597L1.54 9.847h7.99L12 2.25z" />
    </svg>
  );
}

function MoonIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className ?? "w-5 h-5"}
      style={style}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-4 h-4"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function TreeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-5 h-5"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 2L8 9h3l-4 6h5v5h2v-5h5l-4-6h3L12 2z"
      />
    </svg>
  );
}

function ForkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-5 h-5"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15a2 2 0 01-2 2h-1l-1 3h-2l-1-3h-1a2 2 0 01-2-2V2h8v13z"
      />
    </svg>
  );
}

function ThermometerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-5 h-5"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"
      />
    </svg>
  );
}

function WineIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-5 h-5"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 22h8M12 11v11M7 3l1 8a4 4 0 008 0l1-8H7z"
      />
    </svg>
  );
}

function TelescopeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-5 h-5"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 7l7-2 9 3-7 2-9-3zM10 5v10M13 8l3 9M10 15l-3 5"
      />
    </svg>
  );
}

// ─── Twinkling stars canvas ──────────────────────────────────────────────────

type Star = {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  phase: number;
};

function TwinklingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      // Re-seed stars on resize
      starsRef.current = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.008 + 0.003,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement!);

    let tick = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick += 1;
      for (const star of starsRef.current) {
        const alpha = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(tick * star.speed + star.phase));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

type NightCard = {
  id: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  body: React.ReactNode;
  accentLine?: string;
};

// ─── Main component ──────────────────────────────────────────────────────────

export default function NightGuide() {
  const cards: NightCard[] = [
    {
      id: "stargazing",
      icon: <StarIcon className="w-5 h-5" />,
      label: "Dark Sky Park",
      title: "Stargazing",
      accentLine: "Milky Way visible to the naked eye on a clear night",
      body: (
        <>
          <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            Plitvice sits inside one of Europe&apos;s darkest sky corridors — officially within a Dark Sky Park area with minimal light pollution. On a clear March night the Milky Way stretches overhead in a way that is simply not possible in any city.
          </p>
          <p className="font-body text-sm leading-relaxed mt-2" style={{ color: "rgba(255,255,255,0.7)" }}>
            Best spots: the open field directly behind Hotel Degenija, or the park perimeter roads about 200m from the entrance. Give your eyes 10 minutes to adjust.
          </p>
        </>
      ),
    },
    {
      id: "forest-walk",
      icon: <TreeIcon className="w-5 h-5" />,
      label: "After Dinner",
      title: "Evening Forest Walk",
      accentLine: "The kind of silence you cannot find in a city",
      body: (
        <>
          <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            The forest roads around the park go completely silent after dark. Not quiet — silent. You will hear owls. You will hear the wind moving through pine branches. Twenty minutes outside is enough to feel completely reset.
          </p>
          <p className="font-body text-sm leading-relaxed mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>
            Take a torch or headlamp. The roads are flat and unpaved. No other preparation needed.
          </p>
        </>
      ),
    },
    {
      id: "dinner-night1",
      icon: <ForkIcon className="w-5 h-5" />,
      label: "Night 1 — Special Dinner",
      title: "Restaurant Degenija",
      accentLine: "Book peka 24–48 hrs ahead",
      body: (
        <>
          <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            The evening is the dinner — and this is the dinner. Intimate boutique restaurant inside the hotel. Lika cuisine with strong vegetarian and pescetarian options: river trout, truffle gnocchi, Lika cheese plate.
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.55)" }}>
              <span className="font-body text-xs">Budget</span>
              <span className="font-body text-xs font-semibold" style={{ color: "rgba(138,212,237,0.9)" }}>€50–90 for two</span>
            </div>
            <a
              href="tel:+38547782060"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold transition-opacity duration-200 hover:opacity-80"
              style={{ color: "rgba(138,212,237,1)" }}
            >
              <PhoneIcon className="w-4 h-4" />
              +385 47 782 060
            </a>
            <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              Call to reserve peka (traditional iron-bell slow cook) at least 24 hrs before — vegetable version available on request.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "dinner-night2",
      icon: <ForkIcon className="w-5 h-5" />,
      label: "Night 2 — Casual",
      title: "Lička Kuća or Hotel",
      accentLine: "Open fireplace, folk atmosphere",
      body: (
        <>
          <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            The second night is lower-key. Lička Kuća is the most authentic Lika experience in the park — open fireplace, škripavac cheese, river trout, folk music on weekends. Alternatively, the Hotel Degenija restaurant works for a relaxed in-house dinner.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="font-body text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>Budget</span>
            <span className="font-body text-xs font-semibold" style={{ color: "rgba(138,212,237,0.9)" }}>€30–50 for two</span>
          </div>
          <p className="font-body text-xs mt-2 italic" style={{ color: "rgba(255,255,255,0.45)" }}>
            Note: Lička Kuća closed Tuesdays — March 25 is a Wednesday, so both evenings are clear.
          </p>
        </>
      ),
    },
    {
      id: "conditions",
      icon: <ThermometerIcon className="w-5 h-5" />,
      label: "March Specifics",
      title: "Night Sky Conditions",
      accentLine: "Full darkness by 19:00",
      body: (
        <>
          <ul className="flex flex-col gap-2">
            {[
              { label: "Sunset", value: "~18:00" },
              { label: "Full darkness", value: "~19:00" },
              { label: "Night temperature", value: "0 – 5°C" },
              { label: "Sky quality", value: "Bortle 3–4 (excellent)" },
            ].map(({ label, value }) => (
              <li key={label} className="flex items-center justify-between font-body text-sm">
                <span style={{ color: "rgba(255,255,255,0.55)" }}>{label}</span>
                <span className="font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>{value}</span>
              </li>
            ))}
          </ul>
          <p className="font-body text-xs mt-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            March skies in this region are often exceptional — low humidity, clear air, no summer haze. Bring warm layers and a blanket. Gloves help after 20 minutes outside.
          </p>
        </>
      ),
    },
    {
      id: "winddown",
      icon: <WineIcon className="w-5 h-5" />,
      label: "End of the Day",
      title: "Wind-Down Ritual",
      accentLine: "Stars visible from the terrace",
      body: (
        <>
          <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            Hotel Degenija has an in-room hot tub. After dinner, after the walk, after the stars — that is where the evening ends. There is a terrace with direct sky view.
          </p>
          <p className="font-body text-sm leading-relaxed mt-2" style={{ color: "rgba(255,255,255,0.7)" }}>
            Pick up a bottle of local wine or a small rakija from a roadside shop on the drive in. Most petrol stations and village shops along the route carry regional spirits.
          </p>
        </>
      ),
    },
  ];

  return (
    <section
      id="night-guide"
      style={{
        background: "linear-gradient(160deg, #0a1a0d 0%, #0c1929 50%, #080e18 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Twinkling stars canvas layer */}
      <TwinklingStars />

      {/* Subtle radial glow behind heading */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "40%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(138,212,237,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 py-16 px-4 sm:py-20 sm:px-6">
        <div className="max-w-6xl mx-auto">

          {/* ── Section heading ── */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-5"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <MoonIcon className="w-6 h-6" style={{ color: "rgba(138,212,237,0.9)" }} />
            </div>
            <p
              className="font-body text-xs tracking-widest uppercase mb-3"
              style={{ color: "rgba(138,212,237,0.7)" }}
            >
              After Dark
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl mb-4" style={{ color: "rgba(255,255,255,0.95)" }}>
              Night &amp; Evening Guide
            </h2>
            <p
              className="font-body text-base max-w-lg mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Plitvice in March evenings is profoundly quiet. There is no nightlife, no crowds — just forest, cold air, and one of the darkest skies in Europe directly overhead.
            </p>
          </div>

          {/* ── Main card grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {cards.map((card) => (
              <div
                key={card.id}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Card header */}
                <div className="flex items-start gap-3">
                  <div
                    className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(138,212,237,0.1)",
                      color: "rgba(138,212,237,0.85)",
                    }}
                  >
                    {card.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-body text-xs tracking-wider uppercase mb-0.5"
                      style={{ color: "rgba(138,212,237,0.6)" }}
                    >
                      {card.label}
                    </p>
                    <h3
                      className="font-heading text-lg leading-snug"
                      style={{ color: "rgba(255,255,255,0.95)" }}
                    >
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* Accent line */}
                {card.accentLine && (
                  <p
                    className="font-body text-xs font-semibold italic"
                    style={{ color: "rgba(138,212,237,0.75)" }}
                  >
                    {card.accentLine}
                  </p>
                )}

                {/* Body */}
                <div className="flex-1">{card.body}</div>
              </div>
            ))}
          </div>

          {/* ── Stargazing app tip ── */}
          <div
            className="rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4"
            style={{
              background: "rgba(138,212,237,0.05)",
              border: "1px solid rgba(138,212,237,0.15)",
            }}
          >
            <div
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(138,212,237,0.12)", color: "rgba(138,212,237,0.9)" }}
            >
              <TelescopeIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h4
                  className="font-heading text-base"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  Download Stellarium before you leave home
                </h4>
                <span
                  className="inline-flex px-2 py-0.5 rounded-full font-body text-xs font-semibold"
                  style={{
                    background: "rgba(138,212,237,0.12)",
                    color: "rgba(138,212,237,0.85)",
                    border: "1px solid rgba(138,212,237,0.2)",
                  }}
                >
                  Free app — works offline
                </span>
              </div>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Stellarium (iOS and Android, free) lets you point your phone at any part of the sky and see exactly what you are looking at — constellation names, planets, Milky Way core position. Download it at home while you have Wi-Fi. It works fully offline in the field. If you can only do one thing to prepare for the stargazing, this is it.
              </p>
            </div>
          </div>

          {/* ── Bottom ambient quote ── */}
          <div className="mt-12 text-center">
            <div
              className="inline-block w-8 h-px mb-5"
              style={{ background: "rgba(138,212,237,0.3)" }}
            />
            <p
              className="font-heading text-xl sm:text-2xl max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              &ldquo;After dinner, the forest sounds different at night. Bring a blanket.&rdquo;
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
