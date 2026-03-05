"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Itinerary from "@/components/Itinerary";
import Accommodation from "@/components/Accommodation";
import ParkGuide from "@/components/ParkGuide";
import FoodGuide from "@/components/FoodGuide";
import Activities from "@/components/Activities";
import BudgetCalculator from "@/components/BudgetCalculator";
import WeatherPacking from "@/components/WeatherPacking";
import GearShopping from "@/components/GearShopping";
import NightGuide from "@/components/NightGuide";
import Footer from "@/components/Footer";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={[
        "fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-forest-700 hover:bg-forest-600 text-white shadow-lg flex items-center justify-center transition-all duration-300",
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

export default function Home() {
  return (
    <main className="-mt-16">
      <Hero />
      <Itinerary />
      <Accommodation />
      <ParkGuide />
      <FoodGuide />
      <Activities />
      <BudgetCalculator />
      <WeatherPacking />
      <GearShopping />
      <NightGuide />
      <Footer />
      <BackToTop />
    </main>
  );
}
