import { View, Text, Pressable, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

interface BookingEmptyStateProps {
  icon: ImageSourcePropType;
  iconWidth: number;
  iconHeight: number;
  message: string;
  ctaLabel: string;
  onCtaPress?: () => void;
}

export function BookingEmptyState({
  icon,
  iconWidth,
  iconHeight,
  message,
  ctaLabel,
  onCtaPress,
}: BookingEmptyStateProps) {
  return (
    <View className="w-full items-center justify-center rounded-[32px] border-2 border-dashed border-[#c5c9ac] bg-[rgba(241,244,245,0.5)] p-[34px]">
      <Image
        source={icon}
        style={{ width: iconWidth, height: iconHeight, marginBottom: 8 }}
        contentFit="contain"
      />
      <Text className="text-sm font-poppins-semibold text-[#444932] tracking-[0.7px] leading-5">
        {message}
      </Text>
      <Pressable onPress={onCtaPress} className="mt-4">
        <Text className="text-base font-poppins text-olive text-center leading-6">
          {ctaLabel}
        </Text>
      </Pressable>
    </View>
  );
}
