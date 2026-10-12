import { View, Text } from "react-native";

import type { LngLat, TripSpot } from "@/constants/trip-itineraries";
import { isMapLibreAvailable } from "@/lib/maplibre-available";

interface TripDayMapProps {
  center: LngLat;
  spots: TripSpot[];
}

function TripDayMapFallback({ spots }: TripDayMapProps) {
  return (
    <View className="absolute inset-0 items-center justify-center bg-[#e5efe9] px-6">
      <Text className="text-center text-sm font-poppins-medium text-forest">
        Map ({spots.length} spots) — use a custom Dev Client, not Expo Go
      </Text>
    </View>
  );
}

/**
 * Full-bleed trip-day map. Lazily loads MapLibre so Expo Go shows a fallback
 * instead of crashing on missing native modules.
 */
export function TripDayMap(props: TripDayMapProps) {
  if (!isMapLibreAvailable()) {
    return <TripDayMapFallback {...props} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports -- lazy load avoids Expo Go TurboModule crash
  const { TripDayMapImpl } =
    require("./trip-day-map-impl") as typeof import("./trip-day-map-impl");

  return <TripDayMapImpl {...props} />;
}
