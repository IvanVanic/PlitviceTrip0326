"use client";
import React, { useEffect, useRef } from "react";

// ─── Scroll reveal hook ───────────────────────────────────────────────────────

function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const footerLinks = [
  { label: "Plitvice Park", number: "+38553751014", display: "+385 53 751 014" },
  { label: "Hotel Degenija", number: "+38547782060", display: "+385 47 782 060" },
  { label: "Barac Caves", number: "+38547782113", display: "+385 47 782 113" },
  { label: "Licka Kuca", number: "+385992767406", display: "+385 99 2767 406" },
  { label: "HAK Roads", number: "08009987", display: "0800 9987" },
] as const;

const navLinks = [
  { label: "Itinerary", href: "#itinerary" },
  { label: "Accommodation", href: "#accommodation" },
  { label: "Park Guide", href: "#park-guide" },
  { label: "Driving", href: "#driving" },
  { label: "Food", href: "#food" },
  { label: "Activities", href: "#activities" },
  { label: "Budget", href: "#budget" },
  { label: "Packing", href: "#packing" },
] as const;

// ─── Icons ────────────────────────────────────────────────────────────────────

function HeartIcon() {
  return (
    <svg
      className="inline-block w-4 h-4 text-earth-400 align-middle"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}

function PhoneCallIcon() {
  return (
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
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Footer() {
  const contentRef = useScrollReveal<HTMLDivElement>();

  return (
    <footer
      className="bg-stone-dark text-warm-white"
      style={{ backgroundColor: "var(--color-stone-dark)" }}
    >
      {/* Top gradient accent border */}
      <div
        className="h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--color-forest-600) 0%, var(--color-water-500) 40%, var(--color-earth-400) 100%)",
        }}
      />

      <div
        ref={contentRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16 animate-on-scroll"
      >
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 mb-12">

          {/* Brand / story column */}
          <div className="md:col-span-1">
            <div className="mb-5">
              <span
                className="font-heading text-2xl sm:text-3xl"
                style={{ color: "var(--color-water-300)" }}
              >
                Plitvice
              </span>
              <span
                className="font-heading text-2xl sm:text-3xl mx-1.5"
                style={{ color: "var(--color-earth-400)" }}
              >
                &#x2767;
              </span>
              <span
                className="font-heading text-2xl sm:text-3xl"
                style={{ color: "var(--color-forest-300)" }}
              >
                2026
              </span>
            </div>
            <p
              className="font-body text-sm leading-relaxed mb-3"
              style={{ color: "var(--color-earth-200)" }}
            >
              Trip planned with <HeartIcon /> and way too much research.
            </p>
            <p
              className="font-body text-sm font-medium mb-7"
              style={{ color: "var(--color-stone-mid)" }}
            >
              March 2026 — Rijeka{" "}
              <span style={{ color: "var(--color-earth-400)" }}>→</span>{" "}
              Plitvice
            </p>
            {/* Quick stats row */}
            <div className="flex gap-5">
              <div>
                <p className="font-heading text-xl leading-none" style={{ color: "var(--color-water-300)" }}>3</p>
                <p className="font-body text-xs mt-1" style={{ color: "var(--color-stone-mid)" }}>days</p>
              </div>
              <div className="w-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
              <div>
                <p className="font-heading text-xl leading-none" style={{ color: "var(--color-forest-300)" }}>€12</p>
                <p className="font-body text-xs mt-1" style={{ color: "var(--color-stone-mid)" }}>park entry</p>
              </div>
              <div className="w-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
              <div>
                <p className="font-heading text-xl leading-none" style={{ color: "var(--color-earth-300)" }}>2</p>
                <p className="font-body text-xs mt-1" style={{ color: "var(--color-stone-mid)" }}>people</p>
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3
              className="font-body text-xs tracking-widest uppercase font-semibold mb-5"
              style={{ color: "var(--color-earth-400)" }}
            >
              Jump to Section
            </h3>
            <ul className="space-y-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group font-body text-sm inline-flex items-center min-h-[36px] gap-2 transition-colors duration-150"
                    style={{ color: "var(--color-earth-200)" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-150"
                      style={{ backgroundColor: "var(--color-water-400)" }}
                      aria-hidden="true"
                    />
                    <span className="group-hover:text-water-300 transition-colors duration-150">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Key phone numbers */}
          <div>
            <h3
              className="font-body text-xs tracking-widest uppercase font-semibold mb-5"
              style={{ color: "var(--color-earth-400)" }}
            >
              Key Numbers
            </h3>
            <ul className="space-y-4">
              {footerLinks.map(({ label, number, display }) => (
                <li key={number}>
                  <p
                    className="font-body text-xs mb-1"
                    style={{ color: "var(--color-stone-mid)" }}
                  >
                    {label}
                  </p>
                  <a
                    href={`tel:${number}`}
                    className="group font-body text-sm font-semibold transition-colors duration-150 inline-flex items-center gap-1.5 min-h-[36px]"
                    style={{ color: "var(--color-water-300)" }}
                    aria-label={`Call ${label}`}
                  >
                    <PhoneCallIcon />
                    <span className="group-hover:text-water-200 transition-colors duration-150">
                      {display}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="border-t mb-7"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p
            className="font-body text-xs leading-relaxed max-w-sm"
            style={{ color: "var(--color-stone-mid)" }}
          >
            Plitvice National Park is a UNESCO World Heritage Site. Please stay
            on marked paths and leave no trace.
          </p>
          <p
            className="font-body text-xs whitespace-nowrap font-medium"
            style={{ color: "var(--color-earth-400)" }}
          >
            March 25–27, 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
