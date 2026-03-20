export type BudgetLevel = "budget" | "moderate" | "premium" | "luxury";

export type Vibe =
  | "adventure"
  | "relaxation"
  | "culture"
  | "nightlife"
  | "nature"
  | "foodie"
  | "romantic"
  | "family";

export interface TripParams {
  destination: string;
  startDate: string;
  endDate: string;
  budget: BudgetLevel | null;
  vibes: Vibe[];
}

export const BUDGET_OPTIONS: { value: BudgetLevel; label: string; range: string }[] = [
  { value: "budget", label: "Budget", range: "Under $500" },
  { value: "moderate", label: "Moderate", range: "$500 – $1,500" },
  { value: "premium", label: "Premium", range: "$1,500 – $3,000" },
  { value: "luxury", label: "Luxury", range: "$3,000+" },
];

export const VIBE_OPTIONS: { value: Vibe; label: string; icon: string }[] = [
  { value: "adventure", label: "Adventure", icon: "🏔️" },
  { value: "relaxation", label: "Relaxation", icon: "🏖️" },
  { value: "culture", label: "Culture", icon: "🏛️" },
  { value: "nightlife", label: "Nightlife", icon: "🌃" },
  { value: "nature", label: "Nature", icon: "🌿" },
  { value: "foodie", label: "Foodie", icon: "🍽️" },
  { value: "romantic", label: "Romantic", icon: "💕" },
  { value: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
];
