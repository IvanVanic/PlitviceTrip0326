"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  type: "scroll" | "page";
};

const NAV_LINKS: NavItem[] = [
  { label: "Itinerary", href: "#itinerary", type: "scroll" },
  { label: "Accommodation", href: "#accommodation", type: "scroll" },
  { label: "Park Guide", href: "#park-guide", type: "scroll" },
  { label: "Food", href: "#food", type: "scroll" },
  { label: "Activities", href: "#activities", type: "scroll" },
  { label: "Budget", href: "#budget", type: "scroll" },
  { label: "Packing", href: "#packing", type: "scroll" },
  { label: "Evenings", href: "#night-guide", type: "scroll" },
  { label: "Map", href: "/map", type: "page" },
];

const SECTION_IDS = NAV_LINKS.filter((l) => l.type === "scroll").map((l) =>
  l.href.replace("#", "")
);

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [visible, setVisible] = useState(!isHome);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Show nav after scrolling past hero on home page
  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      return;
    }
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // IntersectionObserver for active section on home page
  useEffect(() => {
    if (!isHome) return;
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { rootMargin: "-30% 0px -65% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  const handleScrollClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!isHome) return; // let normal navigation happen
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    [isHome]
  );

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          visible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="bg-warm-white/85 backdrop-blur-lg border-b border-earth-100/80 shadow-sm">
          <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
            {/* Logo */}
            {isHome ? (
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  closeMobile();
                }}
                className="font-heading text-forest-800 text-lg shrink-0 hover:text-forest-600 transition-colors"
                aria-label="Back to top"
              >
                Plitvice <span className="text-water-500">&#x2767;</span>
              </a>
            ) : (
              <Link
                href="/"
                className="font-heading text-forest-800 text-lg shrink-0 hover:text-forest-600 transition-colors"
              >
                Plitvice <span className="text-water-500">&#x2767;</span>
              </Link>
            )}

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar flex-1 justify-end">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.type === "scroll"
                    ? isHome && activeSection === link.href.replace("#", "")
                    : pathname === link.href;
                if (link.type === "page") {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={[
                        "shrink-0 px-3 py-1.5 rounded-lg text-sm font-body font-medium transition-all duration-150 whitespace-nowrap",
                        isActive
                          ? "bg-forest-700 text-white"
                          : "text-stone-mid hover:text-forest-700 hover:bg-forest-50",
                      ].join(" ")}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={link.href}
                    href={isHome ? link.href : `/${link.href}`}
                    onClick={
                      isHome
                        ? (e) => handleScrollClick(e, link.href)
                        : undefined
                    }
                    className={[
                      "shrink-0 px-3 py-1.5 rounded-lg text-sm font-body font-medium transition-all duration-150 whitespace-nowrap",
                      isActive
                        ? "bg-forest-700 text-white"
                        : "text-stone-mid hover:text-forest-700 hover:bg-forest-50",
                    ].join(" ")}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-earth-50 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span
                className={[
                  "block w-5 h-0.5 bg-stone-dark transition-all duration-200 origin-center",
                  mobileOpen ? "rotate-45 translate-y-2" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block w-5 h-0.5 bg-stone-dark transition-all duration-200",
                  mobileOpen ? "opacity-0" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block w-5 h-0.5 bg-stone-dark transition-all duration-200 origin-center",
                  mobileOpen ? "-rotate-45 -translate-y-2" : "",
                ].join(" ")}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={[
            "md:hidden overflow-hidden transition-all duration-300 bg-warm-white/95 backdrop-blur-lg border-b border-earth-100",
            mobileOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <ul className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.type === "scroll"
                  ? isHome && activeSection === link.href.replace("#", "")
                  : pathname === link.href;
              if (link.type === "page") {
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className={[
                        "block px-4 py-2.5 rounded-xl text-sm font-body font-medium transition-colors",
                        isActive
                          ? "bg-forest-700 text-white"
                          : "text-stone-dark hover:bg-forest-50 hover:text-forest-700",
                      ].join(" ")}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <a
                    href={isHome ? link.href : `/${link.href}`}
                    onClick={(e) => {
                      if (isHome) handleScrollClick(e, link.href);
                      closeMobile();
                    }}
                    className={[
                      "block px-4 py-2.5 rounded-xl text-sm font-body font-medium transition-colors",
                      isActive
                        ? "bg-forest-700 text-white"
                        : "text-stone-dark hover:bg-forest-50 hover:text-forest-700",
                    ].join(" ")}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}
