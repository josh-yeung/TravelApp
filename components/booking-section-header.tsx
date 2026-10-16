import { View, Text, Pressable, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const ICON_PLUS = require("../assets/images/bookings/plus.svg") as ImageSourcePropType;

interface BookingSectionHeaderProps {
  title: string;
  /** When true, the lime button shows an X and collapses instead of adding. */
  expanded?: boolean;
  onAddPress?: () => void;
}

/**
 * Section title + lime action button. Collapsed shows +, expanded shows X.
 */
export function BookingSectionHeader({
  title,
  expanded = false,
  onAddPress,
}: BookingSectionHeaderProps) {
  return (
    <View className="w-full flex-row items-center justify-between">
      <Text className="text-xl font-poppins-bold text-[#181c1d] tracking-tight leading-[30px]">
        {title}
      </Text>
      <Pressable
        onPress={onAddPress}
        className="h-8 w-8 items-center justify-center rounded-full bg-[#d4ff00]"
      >
        {expanded ? (
          <Ionicons name="close" size={18} color="#5F7400" />
        ) : (
          <Image
            source={ICON_PLUS}
            style={{ width: 14, height: 14 }}
            contentFit="contain"
          />
        )}
      </Pressable>
    </View>
  );
}
