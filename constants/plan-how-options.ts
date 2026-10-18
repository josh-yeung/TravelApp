import type { ImageSourcePropType } from "react-native";

export interface PlanHowOption {
  id: string;
  label: string;
  icon: ImageSourcePropType;
  iconWidth: number;
  iconHeight: number;
}

export const TRANSIT_OPTIONS: PlanHowOption[] = [
  {
    id: "flights",
    label: "Flights",
    icon: require("../assets/images/plan/how/flights.svg"),
    iconWidth: 16.67,
    iconHeight: 16.67,
  },
  {
    id: "trains",
    label: "Trains",
    icon: require("../assets/images/plan/how/trains.svg"),
    iconWidth: 13.33,
    iconHeight: 15.83,
  },
  {
    id: "buses",
    label: "Buses",
    icon: require("../assets/images/plan/how/buses.svg"),
    iconWidth: 13.33,
    iconHeight: 15.83,
  },
  {
    id: "car-rentals",
    label: "Car Rentals",
    icon: require("../assets/images/plan/how/car-rentals.svg"),
    iconWidth: 15,
    iconHeight: 13.33,
  },
];

export const ACCOMMODATION_OPTIONS: PlanHowOption[] = [
  {
    id: "hostels",
    label: "Hostels",
    icon: require("../assets/images/plan/how/hostels.svg"),
    iconWidth: 18.33,
    iconHeight: 12.83,
  },
  {
    id: "airbnb",
    label: "Airbnb",
    icon: require("../assets/images/plan/how/airbnb.svg"),
    iconWidth: 14.67,
    iconHeight: 16.5,
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: require("../assets/images/plan/how/hotels.svg"),
    iconWidth: 20.17,
    iconHeight: 13.75,
  },
];

export const DEFAULT_SELECTED_TRANSIT_IDS = ["flights", "trains"];
export const DEFAULT_SELECTED_ACCOMMODATION_IDS = ["airbnb", "hotels"];
export const DEFAULT_STARTING_LOCATION = "Toronto, Canada";

export const BUDGET_MIN = 500;
export const BUDGET_MAX = 5000;
export const BUDGET_STEP = 100;
export const DEFAULT_BUDGET = 2000;

export interface PlanBudgetTier {
  id: string;
  label: string;
  amount: number;
}

export const BUDGET_TIERS: PlanBudgetTier[] = [
  { id: "backpacker", label: "Backpacker\n($1k)", amount: 1000 },
  { id: "comfort", label: "Comfort ($2k)", amount: 2000 },
  { id: "luxury", label: "Luxury ($5k+)", amount: 5000 },
];

export const DEFAULT_BUDGET_TIER_ID = "comfort";

export const PACING_OPTIONS: PlanHowOption[] = [
  {
    id: "slow",
    label: "Slow",
    icon: require("../assets/images/plan/how/pacing-slow.svg"),
    iconWidth: 15,
    iconHeight: 15,
  },
  {
    id: "balanced",
    label: "Balanced",
    icon: require("../assets/images/plan/how/pacing-balanced.svg"),
    iconWidth: 18.33,
    iconHeight: 10,
  },
  {
    id: "fast",
    label: "Fast",
    icon: require("../assets/images/plan/how/pacing-fast.svg"),
    iconWidth: 13.33,
    iconHeight: 16.67,
  },
];

/** Spots per day applied when a pacing preset is tapped. */
export const PACING_SPOTS: Record<string, number> = {
  slow: 2,
  balanced: 3,
  fast: 5,
};

export const DEFAULT_PACING_ID = "balanced";
export const DEFAULT_SPOTS_PER_DAY = 3;
export const SPOTS_MIN = 1;
export const SPOTS_MAX = 8;
