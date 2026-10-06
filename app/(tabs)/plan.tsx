import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PlanScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-background items-center justify-center"
      style={{ paddingTop: insets.top }}
    >
      <Text className="text-2xl font-poppins-bold text-heading">Plan</Text>
      <Text className="mt-2 text-sm font-poppins text-subtitle">
        Blank canvas
      </Text>
    </View>
  );
}
