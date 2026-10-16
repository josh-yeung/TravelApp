import type { ImageSourcePropType } from "react-native";

export interface PlanSavedPlace {
  id: string;
  name: string;
  region: string;
  image: ImageSourcePropType;
}

export const SAVED_PLACES: PlanSavedPlace[] = [
  {
    id: "louvre",
    name: "Louvre Museum",
    region: "Paris, France",
    image: require("../assets/images/plan/what/saved/louvre.png"),
  },
  {
    id: "eiffel",
    name: "Eiffel Tower",
    region: "Paris, France",
    image: require("../assets/images/plan/what/saved/eiffel.png"),
  },
  {
    id: "notre-dame",
    name: "Notre Dame",
    region: "Paris, France",
    image: require("../assets/images/plan/what/saved/notre-dame.png"),
  },
  {
    id: "arc-de-triomphe",
    name: "Arc de Triomphe",
    region: "Paris, France",
    image: require("../assets/images/plan/what/saved/arc-de-triomphe.png"),
  },
];

export function filterSavedPlaces(
  places: PlanSavedPlace[],
  query: string
): PlanSavedPlace[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return places;
  }
  return places.filter(
    (place) =>
      place.name.toLowerCase().includes(normalized) ||
      place.region.toLowerCase().includes(normalized)
  );
}
