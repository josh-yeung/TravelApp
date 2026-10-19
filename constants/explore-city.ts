import type { ImageSourcePropType } from "react-native";

export interface ExploreCityExperience {
  id: string;
  name: string;
  ratingLabel: string;
  category: string;
  neighborhood: string;
  image: ImageSourcePropType;
}

export interface ExploreCityCategory {
  id: string;
  label: string;
}

export interface ExploreCity {
  id: string;
  name: string;
  tagline: string;
  categories: ExploreCityCategory[];
  experiences: ExploreCityExperience[];
}

const PARIS_CITY: ExploreCity = {
  id: "paris-popular",
  name: "Paris",
  tagline: "Discover the city of lights and wonders.",
  categories: [
    { id: "popular", label: "Popular" },
    { id: "restaurants", label: "Restaurants" },
    { id: "landmarks", label: "Landmarks" },
    { id: "photo-spots", label: "Photo spots" },
  ],
  experiences: [
    {
      id: "eiffel-tower",
      name: "Eiffel Tower",
      ratingLabel: "4.9 (12.4k reviews)",
      category: "Attraction",
      neighborhood: "Champ de Mars",
      image: require("../assets/images/explore/city/eiffel-tower.png"),
    },
    {
      id: "louvre-museum",
      name: "Louvre Museum",
      ratingLabel: "4.8 (10.1k reviews)",
      category: "Culture",
      neighborhood: "1st Arrondissement",
      image: require("../assets/images/explore/city/louvre-museum.png"),
    },
  ],
};

const EXPLORE_CITIES: ExploreCity[] = [PARIS_CITY];

export function getExploreCityById(id: string): ExploreCity | undefined {
  return EXPLORE_CITIES.find((city) => city.id === id);
}
