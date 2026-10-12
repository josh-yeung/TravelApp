import type { ImageSourcePropType } from "react-native";

import type { LngLat } from "@/constants/trip-itineraries";

export interface Trip {
  id: string;
  title: string;
  dateRange: string;
  startDate: string;
  endDate: string;
  image: ImageSourcePropType;
  center: LngLat;
}

export const PLANNED_TRIPS: Trip[] = [
  {
    id: "paris",
    title: "Paris",
    dateRange: "Apr 5 - 12",
    startDate: "2026-04-05",
    endDate: "2026-04-12",
    image: require("../assets/images/trips/paris.png"),
    center: [2.3522, 48.8566],
  },
  {
    id: "rome",
    title: "Rome",
    dateRange: "May 10 - 15",
    startDate: "2026-05-10",
    endDate: "2026-05-15",
    image: require("../assets/images/trips/rome.png"),
    center: [12.4964, 41.9028],
  },
  {
    id: "tokyo",
    title: "Tokyo",
    dateRange: "Jun 2 - 8",
    startDate: "2026-06-02",
    endDate: "2026-06-08",
    image: require("../assets/images/trips/tokyo.png"),
    center: [139.6917, 35.6895],
  },
];

export function getTripById(id: string): Trip | undefined {
  return PLANNED_TRIPS.find((trip) => trip.id === id);
}
