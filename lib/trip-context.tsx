import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { TripParams, BudgetLevel, Vibe } from "./types";

const INITIAL_TRIP: TripParams = {
  destination: "",
  startDate: "",
  endDate: "",
  budget: null,
  vibes: [],
};

interface TripContextValue {
  trip: TripParams;
  setDestination: (destination: string) => void;
  setDates: (startDate: string, endDate: string) => void;
  setBudget: (budget: BudgetLevel) => void;
  toggleVibe: (vibe: Vibe) => void;
  reset: () => void;
}

const TripContext = createContext<TripContextValue | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [trip, setTrip] = useState<TripParams>(INITIAL_TRIP);

  const setDestination = useCallback((destination: string) => {
    setTrip((prev) => ({ ...prev, destination }));
  }, []);

  const setDates = useCallback((startDate: string, endDate: string) => {
    setTrip((prev) => ({ ...prev, startDate, endDate }));
  }, []);

  const setBudget = useCallback((budget: BudgetLevel) => {
    setTrip((prev) => ({ ...prev, budget }));
  }, []);

  const toggleVibe = useCallback((vibe: Vibe) => {
    setTrip((prev) => ({
      ...prev,
      vibes: prev.vibes.includes(vibe)
        ? prev.vibes.filter((v) => v !== vibe)
        : [...prev.vibes, vibe],
    }));
  }, []);

  const reset = useCallback(() => {
    setTrip(INITIAL_TRIP);
  }, []);

  return (
    <TripContext.Provider
      value={{ trip, setDestination, setDates, setBudget, toggleVibe, reset }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip(): TripContextValue {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
}
