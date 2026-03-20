import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MyTripScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background items-center justify-center" style={{ paddingTop: insets.top }}>
      <Text className="text-2xl font-poppins-bold text-heading">My Trip</Text>
      <Text className="text-sm font-poppins text-subtitle mt-2">Your active trips will appear here</Text>
    </View>
  );
}
