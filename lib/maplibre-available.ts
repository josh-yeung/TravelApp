import { Platform, TurboModuleRegistry } from "react-native";
import Constants, { ExecutionEnvironment } from "expo-constants";

/**
 * MapLibre ships custom native code and is unavailable in Expo Go.
 * Use a custom Expo Dev Client (`npx expo run:ios`) to get real maps.
 */
export function isMapLibreAvailable(): boolean {
  if (Platform.OS === "web") {
    return false;
  }

  if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
    return false;
  }

  try {
    return TurboModuleRegistry.get("MLRNCameraModule") != null;
  } catch {
    return false;
  }
}
