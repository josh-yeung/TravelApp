import type { ImageSourcePropType } from "react-native";

export type ExploreCardVariant = "featured" | "region";

export interface ExploreDestination {
  id: string;
  name: string;
  /** Region label shown on featured cards (e.g. ASIA). */
  region?: string;
  image: ImageSourcePropType;
}

export interface ExploreSectionData {
  id: string;
  title: string;
  variant: ExploreCardVariant;
  destinations: ExploreDestination[];
}

export const POPULAR_DESTINATIONS: ExploreDestination[] = [
  {
    id: "tokyo-popular",
    name: "Tokyo",
    region: "ASIA",
    image: require("../assets/images/explore/tokyo-popular.png"),
  },
  {
    id: "nyc-popular",
    name: "NYC",
    region: "USA",
    image: require("../assets/images/explore/nyc-popular.png"),
  },
  {
    id: "paris-popular",
    name: "Paris",
    region: "EUROPE",
    image: require("../assets/images/explore/paris-popular.png"),
  },
];

export const EUROPE_DESTINATIONS: ExploreDestination[] = [
  {
    id: "london",
    name: "London",
    image: require("../assets/images/explore/london.png"),
  },
  {
    id: "rome",
    name: "Rome",
    image: require("../assets/images/explore/rome.png"),
  },
  {
    id: "barcelona",
    name: "Barcelona",
    image: require("../assets/images/explore/barcelona.png"),
  },
];

export const ASIA_DESTINATIONS: ExploreDestination[] = [
  {
    id: "tokyo-asia",
    name: "Tokyo",
    image: require("../assets/images/explore/tokyo-asia.png"),
  },
  {
    id: "beijing",
    name: "Beijing",
    image: require("../assets/images/explore/beijing.png"),
  },
];

export const EXPLORE_SECTIONS: ExploreSectionData[] = [
  {
    id: "popular",
    title: "Popular Destinations",
    variant: "featured",
    destinations: POPULAR_DESTINATIONS,
  },
  {
    id: "europe",
    title: "Europe",
    variant: "region",
    destinations: EUROPE_DESTINATIONS,
  },
  {
    id: "asia",
    title: "Asia",
    variant: "region",
    destinations: ASIA_DESTINATIONS,
  },
];
