import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MessagesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background items-center justify-center" style={{ paddingTop: insets.top }}>
      <Text className="text-2xl font-poppins-bold text-heading">Messages</Text>
      <Text className="text-sm font-poppins text-subtitle mt-2">Your messages will appear here</Text>
    </View>
  );
}
