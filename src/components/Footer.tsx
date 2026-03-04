"use client";
import React from "react";

const footerLinks = [
  { label: "Plitvice Park", number: "+38553751014", display: "+385 53 751 014" },
  { label: "Hotel Degenija", number: "+38547782060", display: "+385 47 782 060" },
  { label: "Barac Caves", number: "+38547782113", display: "+385 47 782 113" },
  { label: "Licka Kuca", number: "+38599276740", display: "+385 99 2767 406" },
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

export default function Footer() {
  return (
    <footer
      className="bg-stone-dark text-warm-white"
      style={{ backgroundColor: "var(--color-stone-dark)" }}
    >
      {/* Top decorative border */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--color-forest-700) 0%, var(--color-water-600) 50%, var(--color-earth-500) 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand / story column */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <span
                className="font-heading text-2xl"
                style={{ color: "var(--color-water-300)" }}
              >
                Plitvice
              </span>
              <span
                className="font-heading text-2xl"
                style={{ color: "var(--color-earth-300)" }}
              >
                {" "}&#x2767;{" "}
              </span>
              <span
                className="font-heading text-2xl"
                style={{ color: "var(--color-forest-300)" }}
              >
                2026
              </span>
            </div>
            <p
              className="font-body text-sm leading-relaxed mb-2"
              style={{ color: "var(--color-earth-200)" }}
            >
              Built with research and <HeartIcon /> love for our 5th anniversary.
            </p>
            <p
              className="font-body text-sm font-medium"
              style={{ color: "var(--color-stone-mid)" }}
            >
              March 2026 — Rijeka{" "}
              <span style={{ color: "var(--color-earth-400)" }}>→</span>{" "}
              Plitvice
            </p>
          </div>

          {/* Navigation links */}
          <div>
            <h3
              className="font-body text-xs tracking-widest uppercase font-semibold mb-4"
              style={{ color: "var(--color-earth-400)" }}
            >
              Jump to Section
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm transition-colors duration-150"
                    style={{ color: "var(--color-earth-200)" }}
                    onMouseOver={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--color-water-300)")
                    }
                    onMouseOut={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--color-earth-200)")
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Key phone numbers */}
          <div>
            <h3
              className="font-body text-xs tracking-widest uppercase font-semibold mb-4"
              style={{ color: "var(--color-earth-400)" }}
            >
              Key Numbers
            </h3>
            <ul className="space-y-3">
              {footerLinks.map(({ label, number, display }) => (
                <li key={number}>
                  <p
                    className="font-body text-xs mb-0.5"
                    style={{ color: "var(--color-stone-mid)" }}
                  >
                    {label}
                  </p>
                  <a
                    href={`tel:${number}`}
                    className="font-body text-sm font-semibold transition-colors duration-150 flex items-center gap-1.5"
                    style={{ color: "var(--color-water-300)" }}
                    onMouseOver={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--color-water-200)")
                    }
                    onMouseOut={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--color-water-300)")
                    }
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
          </div>
        </div>

        {/* Divider */}
        <div
          className="border-t mb-6"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="font-body text-xs text-center sm:text-left"
            style={{ color: "var(--color-stone-mid)" }}
          >
            Plitvice National Park is a UNESCO World Heritage Site. Please stay
            on marked paths and leave no trace.
          </p>
          <p
            className="font-body text-xs whitespace-nowrap"
            style={{ color: "var(--color-stone-mid)" }}
          >
            March 25–27, 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
