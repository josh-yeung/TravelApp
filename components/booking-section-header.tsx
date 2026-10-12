import { View, Text, Pressable, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

const ICON_PLUS = require("../assets/images/bookings/plus.svg") as ImageSourcePropType;

interface BookingSectionHeaderProps {
  title: string;
  onAddPress?: () => void;
}

export function BookingSectionHeader({
  title,
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
        <Image
          source={ICON_PLUS}
          style={{ width: 14, height: 14 }}
          contentFit="contain"
        />
      </Pressable>
    </View>
  );
}
