import { View, Text } from "react-native";

import type { LngLat, TripSpot } from "@/constants/trip-itineraries";

interface TripDayMapProps {
  center: LngLat;
  spots: TripSpot[];
}

/** Web stub — MapLibre is native-only and must not be imported on web. */
export function TripDayMap({ spots }: TripDayMapProps) {
  return (
    <View className="absolute inset-0 items-center justify-center bg-[#e5efe9] px-6">
      <Text className="text-center text-sm font-poppins-medium text-forest">
        Map ({spots.length} spots) — open on iOS/Android Dev Client
      </Text>
    </View>
  );
}
