import { View, Text } from "react-native";

interface ProfileWorldMapProps {
  height?: number;
}

/** Web stub — MapLibre is native-only and must not be imported on web. */
export function ProfileWorldMap({ height = 200 }: ProfileWorldMapProps) {
  return (
    <View
      className="w-full items-center justify-center overflow-hidden rounded-2xl bg-[#e5efe9] px-4"
      style={{ height }}
    >
      <Text className="text-center text-sm font-poppins-medium text-forest">
        Map is available on iOS/Android Dev Client
      </Text>
    </View>
  );
}
