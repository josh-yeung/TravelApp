import type { ImageSourcePropType } from "react-native";

export interface PlanActivity {
  id: string;
  label: string;
  icon: ImageSourcePropType;
  iconWidth: number;
  iconHeight: number;
}

export const PLAN_ACTIVITIES: PlanActivity[] = [
  {
    id: "landmarks",
    label: "Landmarks",
    icon: require("../assets/images/plan/what/landmarks.svg"),
    iconWidth: 22,
    iconHeight: 18,
  },
  {
    id: "restaurants",
    label: "Restaurants",
    icon: require("../assets/images/plan/what/restaurants.svg"),
    iconWidth: 15,
    iconHeight: 20,
  },
  {
    id: "nightlife",
    label: "Nightlife",
    icon: require("../assets/images/plan/what/nightlife.svg"),
    iconWidth: 21,
    iconHeight: 15,
  },
  {
    id: "nature",
    label: "Nature",
    icon: require("../assets/images/plan/what/nature.svg"),
    iconWidth: 24,
    iconHeight: 20,
  },
  {
    id: "shopping",
    label: "Shopping",
    icon: require("../assets/images/plan/what/shopping.svg"),
    iconWidth: 16,
    iconHeight: 20,
  },
];
