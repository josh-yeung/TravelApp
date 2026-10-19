import { Stack } from "expo-router";

/**
 * Nested Explore stack so city detail keeps the floating tab dock
 * and Explore stays the active tab (same pattern as Plan).
 */
export default function ExploreStackLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
