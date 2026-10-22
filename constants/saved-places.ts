import type { ImageSourcePropType } from "react-native";

export interface SavedCollection {
  id: string;
  title: string;
  subtitle: string;
  spotCount: number;
  image: ImageSourcePropType;
}

export interface SavedSpot {
  id: string;
  name: string;
  /** Display label, e.g. "Paris, France". */
  location: string;
  /** City used for chip filtering, e.g. "Paris". */
  city: string;
  /** Category used for the image pill + chip filtering, e.g. "Landmark". */
  category: string;
  rating: string;
  reviewCountLabel: string;
  image: ImageSourcePropType;
}

export type SavedFilterKind = "all" | "city" | "category";

export interface SavedFilterChip {
  id: string;
  label: string;
  kind: SavedFilterKind;
  /** Matched against `SavedSpot.city` or `SavedSpot.category` depending on `kind`. */
  value?: string;
}

/** Figma header pill shows the total, even though only 3 collections are in the carousel mock. */
export const SAVED_COLLECTIONS_TOTAL = 6;

export const SAVED_COLLECTIONS: SavedCollection[] = [
  {
    id: "parisian-cafes",
    title: "Parisian Cafes & Views",
    subtitle: "Paris",
    spotCount: 5,
    image: require("../assets/images/saved/collection-paris.png"),
  },
  {
    id: "alpine-skiing",
    title: "Alpine Skiing",
    subtitle: "Banff & Dolomites",
    spotCount: 8,
    image: require("../assets/images/saved/collection-alpine.png"),
  },
  {
    id: "eco-stays",
    title: "Eco-Stays & Hostels",
    subtitle: "Low Carbon Picks",
    spotCount: 4,
    image: require("../assets/images/saved/collection-eco.png"),
  },
];

export const SAVED_SPOTS: SavedSpot[] = [
  {
    id: "eiffel-tower",
    name: "Eiffel Tower",
    location: "Paris, France",
    city: "Paris",
    category: "Landmark",
    rating: "4.9",
    reviewCountLabel: "(12.4k)",
    image: require("../assets/images/saved/spot-eiffel.png"),
  },
  {
    id: "louvre-museum",
    name: "Louvre Museum",
    location: "Paris, France",
    city: "Paris",
    category: "Landmark",
    rating: "4.8",
    reviewCountLabel: "(10.1k)",
    image: require("../assets/images/saved/spot-louvre.png"),
  },
  {
    id: "tokyo-tower",
    name: "Tokyo Tower",
    location: "Tokyo, Japan",
    city: "Tokyo",
    category: "Landmark",
    rating: "4.9",
    reviewCountLabel: "(8.7k)",
    image: require("../assets/images/saved/spot-tokyo.png"),
  },
  {
    id: "banff-national-park",
    name: "Banff National Park",
    location: "Banff, Canada",
    city: "Banff",
    category: "National Park",
    rating: "5.0",
    reviewCountLabel: "(15.2k)",
    image: require("../assets/images/saved/spot-banff.png"),
  },
];

/** Static chip labels mirror the Figma mock counts; filtering uses `kind` + `value`. */
export const SAVED_FILTER_CHIPS: SavedFilterChip[] = [
  { id: "all", label: "All (42)", kind: "all" },
  { id: "paris", label: "Paris (14)", kind: "city", value: "Paris" },
  { id: "cafes", label: "Cafes (6)", kind: "category", value: "Cafe" },
  {
    id: "landmarks",
    label: "Landmarks (9)",
    kind: "category",
    value: "Landmark",
  },
];

export function filterSavedSpots(
  spots: SavedSpot[],
  chipId: string,
  query: string
): SavedSpot[] {
  const chip = SAVED_FILTER_CHIPS.find((item) => item.id === chipId);
  const normalized = query.trim().toLowerCase();

  return spots.filter((spot) => {
    if (chip && chip.kind === "city" && chip.value && spot.city !== chip.value) {
      return false;
    }
    if (
      chip &&
      chip.kind === "category" &&
      chip.value &&
      spot.category !== chip.value
    ) {
      return false;
    }
    if (!normalized) {
      return true;
    }
    return (
      spot.name.toLowerCase().includes(normalized) ||
      spot.location.toLowerCase().includes(normalized) ||
      spot.category.toLowerCase().includes(normalized)
    );
  });
}
