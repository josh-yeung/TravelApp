import { Stack } from "expo-router";

export default function PlanStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="when" />
      <Stack.Screen name="what" />
      <Stack.Screen name="what-saved" />
      <Stack.Screen name="how" />
    </Stack>
  );
}
