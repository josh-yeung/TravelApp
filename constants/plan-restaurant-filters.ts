import type { ImageSourcePropType } from "react-native";

export interface PlanFilterOption {
  id: string;
  label: string;
  icon: ImageSourcePropType;
  iconWidth: number;
  iconHeight: number;
}

export const RESTAURANT_CUISINES: PlanFilterOption[] = [
  {
    id: "french",
    label: "French",
    icon: require("../assets/images/plan/what/restaurants/french.svg"),
    iconWidth: 13.5,
    iconHeight: 13.5,
  },
  {
    id: "italian",
    label: "Italian",
    icon: require("../assets/images/plan/what/restaurants/italian.svg"),
    iconWidth: 15,
    iconHeight: 13.5,
  },
  {
    id: "japanese",
    label: "Japanese",
    icon: require("../assets/images/plan/what/restaurants/japanese.svg"),
    iconWidth: 15,
    iconHeight: 15,
  },
  {
    id: "english",
    label: "English",
    icon: require("../assets/images/plan/what/restaurants/english.svg"),
    iconWidth: 15,
    iconHeight: 15,
  },
];

export const RESTAURANT_DINING_STYLES: PlanFilterOption[] = [
  {
    id: "fine-dining",
    label: "Fine Dining",
    icon: require("../assets/images/plan/what/restaurants/fine-dining.svg"),
    iconWidth: 15,
    iconHeight: 15,
  },
  {
    id: "local-favourites",
    label: "Local Favourites",
    icon: require("../assets/images/plan/what/restaurants/local-favourites.svg"),
    iconWidth: 21,
    iconHeight: 15,
  },
  {
    id: "rooftop",
    label: "Rooftop",
    icon: require("../assets/images/plan/what/restaurants/rooftop.svg"),
    iconWidth: 15,
    iconHeight: 15,
  },
];

export const DEFAULT_SELECTED_CUISINE_IDS = ["french"];
export const DEFAULT_SELECTED_DINING_STYLE_IDS = [
  "fine-dining",
  "local-favourites",
];
