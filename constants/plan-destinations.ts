import type { ImageSourcePropType } from "react-native";

export interface PlanDestination {
  id: string;
  name: string;
  region: string;
  image: ImageSourcePropType;
}

export const TRENDING_DESTINATIONS: PlanDestination[] = [
  {
    id: "tokyo",
    name: "Tokyo",
    region: "Japan",
    image: require("../assets/images/plan/tokyo.png"),
  },
  {
    id: "paris",
    name: "Paris",
    region: "France",
    image: require("../assets/images/plan/paris.png"),
  },
  {
    id: "rome",
    name: "Rome",
    region: "Italy",
    image: require("../assets/images/plan/rome.png"),
  },
  {
    id: "balkans",
    name: "Balkans",
    region: "Europe",
    image: require("../assets/images/plan/balkans.png"),
  },
];

export const SAVED_DESTINATIONS: PlanDestination[] = [
  {
    id: "caribbean",
    name: "Caribbean",
    region: "Americas",
    image: require("../assets/images/plan/caribbean.png"),
  },
  {
    id: "middle-east",
    name: "Middle East",
    region: "Asia",
    image: require("../assets/images/plan/middle-east.png"),
  },
  {
    id: "istanbul",
    name: "Istanbul",
    region: "Turkey",
    image: require("../assets/images/plan/istanbul.png"),
  },
  {
    id: "east-asia",
    name: "East Asia",
    region: "Asia",
    image: require("../assets/images/plan/east-asia.png"),
  },
];

export function filterDestinations(
  destinations: PlanDestination[],
  query: string
): PlanDestination[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return destinations;
  }
  return destinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(normalized) ||
      destination.region.toLowerCase().includes(normalized)
  );
}
