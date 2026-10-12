import { View, Text } from "react-native";

import { isMapLibreAvailable } from "@/lib/maplibre-available";

interface ProfileWorldMapProps {
  height?: number;
}

function ProfileWorldMapFallback({ height = 200 }: ProfileWorldMapProps) {
  return (
    <View
      className="w-full items-center justify-center overflow-hidden rounded-2xl bg-[#e5efe9] px-4"
      style={{ height }}
    >
      <Text className="text-center text-sm font-poppins-medium text-forest">
        Map requires a custom Dev Client (not Expo Go)
      </Text>
    </View>
  );
}

/**
 * Interactive MapLibre world map with a countries fill layer.
 * Lazily loads the native module so Expo Go shows a fallback instead of crashing.
 */
export function ProfileWorldMap(props: ProfileWorldMapProps) {
  if (!isMapLibreAvailable()) {
    return <ProfileWorldMapFallback {...props} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports -- lazy load avoids Expo Go TurboModule crash
  const { ProfileWorldMapImpl } =
    require("./profile-world-map-impl") as typeof import("./profile-world-map-impl");

  return <ProfileWorldMapImpl {...props} />;
}
