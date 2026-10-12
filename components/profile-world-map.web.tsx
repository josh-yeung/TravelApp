import { View } from "react-native";

interface ProfileWorldMapProps {
  height?: number;
}

/** Web stub — MapLibre is native-only and must not be imported on web. */
export function ProfileWorldMap({ height = 200 }: ProfileWorldMapProps) {
  return (
    <View
      className="w-full overflow-hidden rounded-2xl bg-[#e5efe9]"
      style={{ height }}
    />
  );
}
