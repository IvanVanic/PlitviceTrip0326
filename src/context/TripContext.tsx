"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

// --- Types ---
export interface TripState {
  // Itinerary optional stops
  optionalStops: Record<string, boolean>;
  // Accommodation selection
  selectedAccommodation: string;
  // Activities included
  includedActivities: Set<string>;
  // Food: selected restaurant for anniversary dinner
  anniversaryDinner: string;
  // Student tickets
  studentTicket: boolean;
  // Day 3 option
  day3Option: string;
  // Gear toggles
  gearOn: Record<string, boolean>;
}

interface TripContextType {
  state: TripState;
  toggleOptionalStop: (key: string) => void;
  setAccommodation: (id: string) => void;
  toggleActivity: (id: string) => void;
  setAnniversaryDinner: (id: string) => void;
  setStudentTicket: (v: boolean) => void;
  setDay3Option: (id: string) => void;
  toggleGear: (id: string) => void;
  // Computed costs
  costs: TripCosts;
}

export interface TripCosts {
  driving: number;
  park: number;
  food: number;
  activities: number;
  accommodation: { min: number; max: number; mid: number; name: string };
  gear: number;
  totalTrip: number;
  totalWithGear: number;
}

// --- Pricing data ---
const FIXED_DRIVING = 56; // fuel + tolls + parking

const ACTIVITY_COSTS: Record<string, number> = {
  rastoke: 10, // 2 people
  "ogulin-museum": 8,
  "barac-caves": 20, // 2 student
  stargazing: 0,
  "evening-walk": 0,
  "ogulin-cave": 0,
};

const ACCOMMODATION_PRICES: Record<string, { min: number; max: number; name: string }> = {
  "rustic-lodge": { min: 95, max: 130, name: "Rustic Lodge" },
  "etno-garden": { min: 154, max: 198, name: "Etno Garden" },
  "16-lakes": { min: 130, max: 230, name: "16 Lakes Hotel" },
  degenija: { min: 154, max: 204, name: "Hotel Degenija" },
  teslas: { min: 254, max: 340, name: "Tesla's Gastro House" },
};

const GEAR_COSTS: Record<string, number> = {
  his_boots: 55,
  her_boots: 70,
  his_jacket: 70,
  her_jacket: 40,
};

const FOOD_ESTIMATE = 132; // anniversary dinner + casual dinner + groceries + coffees

const TripContext = createContext<TripContextType | null>(null);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [optionalStops, setOptionalStops] = useState<Record<string, boolean>>({
    ogulin: true,
    rastoke: true,
  });
  const [selectedAccommodation, setSelectedAccommodation] = useState("degenija");
  const [includedActivities, setIncludedActivities] = useState<Set<string>>(
    new Set(["rastoke", "stargazing"])
  );
  const [anniversaryDinner, setAnniversaryDinner] = useState("degenija");
  const [studentTicket, setStudentTicket] = useState(true);
  const [day3Option, setDay3Option] = useState("rastoke-morning");
  const [gearOn, setGearOn] = useState<Record<string, boolean>>({
    his_boots: false,
    her_boots: false,
    his_jacket: false,
    her_jacket: false,
  });

  const toggleOptionalStop = useCallback((key: string) => {
    setOptionalStops((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const toggleActivity = useCallback((id: string) => {
    setIncludedActivities((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleGear = useCallback((id: string) => {
    setGearOn((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const costs = useMemo<TripCosts>(() => {
    const parkCost = studentTicket ? 12 : 20;
    const activityCost = Array.from(includedActivities).reduce(
      (sum, id) => sum + (ACTIVITY_COSTS[id] ?? 0),
      0
    );
    const accom = ACCOMMODATION_PRICES[selectedAccommodation] ?? ACCOMMODATION_PRICES.degenija;
    const accomMid = Math.round((accom.min + accom.max) / 2);
    const gearCost = Object.entries(gearOn).reduce(
      (sum, [id, on]) => sum + (on ? (GEAR_COSTS[id] ?? 0) : 0),
      0
    );
    const tripExpenses = FIXED_DRIVING + parkCost + FOOD_ESTIMATE + activityCost;
    return {
      driving: FIXED_DRIVING,
      park: parkCost,
      food: FOOD_ESTIMATE,
      activities: activityCost,
      accommodation: { min: accom.min, max: accom.max, mid: accomMid, name: accom.name },
      gear: gearCost,
      totalTrip: tripExpenses + accomMid,
      totalWithGear: tripExpenses + accomMid + gearCost,
    };
  }, [studentTicket, includedActivities, selectedAccommodation, gearOn]);

  const state: TripState = {
    optionalStops,
    selectedAccommodation,
    includedActivities,
    anniversaryDinner,
    studentTicket,
    day3Option,
    gearOn,
  };

  return (
    <TripContext.Provider
      value={{
        state,
        toggleOptionalStop,
        setAccommodation: setSelectedAccommodation,
        toggleActivity,
        setAnniversaryDinner,
        setStudentTicket,
        setDay3Option,
        toggleGear,
        costs,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used within TripProvider");
  return ctx;
}
