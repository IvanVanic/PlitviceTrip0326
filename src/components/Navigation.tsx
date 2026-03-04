"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const NAV_LINKS = [
  { label: "Itinerary", href: "#itinerary" },
  { label: "Accommodation", href: "#accommodation" },
  { label: "Park Guide", href: "#park-guide" },
  { label: "Food", href: "#food" },
  { label: "Activities", href: "#activities" },
  { label: "Budget", href: "#budget" },
  { label: "Packing", href: "#packing" },
] as const;

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Show nav after scrolling past hero
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleIntersect =
      (id: string) => (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        });
      };

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(handleIntersect(id), {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      });
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const navHeight = 64;
        const top =
          el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    []
  );

  return (
    <>
      {/* Main nav bar */}
      <nav
        aria-label="Section navigation"
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          visible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div
          className="bg-warm-white/80 backdrop-blur-md border-b border-earth-100 shadow-sm"
          style={{ height: "64px" }}
        >
          <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between gap-4">
            {/* Logo / wordmark */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="font-heading text-forest-800 text-lg shrink-0 hover:text-forest-600 transition-colors"
              aria-label="Back to top"
            >
              Plitvice <span className="text-water-500">&#x2767;</span>
            </a>

            {/* Desktop links — scrollable row */}
            <div
              ref={scrollRef}
              className="hidden sm:flex items-center gap-1 overflow-x-auto no-scrollbar flex-1 justify-end"
              role="list"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    role="listitem"
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

            {/* Mobile: hamburger */}
            <button
              className="sm:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-earth-50 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span
                className={[
                  "block w-5 h-0.5 bg-stone-dark transition-all duration-200",
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
                  "block w-5 h-0.5 bg-stone-dark transition-all duration-200",
                  mobileOpen ? "-rotate-45 -translate-y-2" : "",
                ].join(" ")}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={[
            "sm:hidden overflow-hidden transition-all duration-300 bg-warm-white/95 backdrop-blur-md border-b border-earth-100",
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <ul className="px-4 py-3 flex flex-col gap-1" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href} role="listitem">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={[
                      "block px-4 py-2.5 rounded-xl text-sm font-body font-medium transition-colors",
                      isActive
                        ? "bg-forest-700 text-white"
                        : "text-stone-dark hover:bg-forest-50 hover:text-forest-700",
                    ].join(" ")}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Utility: hide native scrollbar on nav */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}
