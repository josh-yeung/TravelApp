import { View, Text, Pressable, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

const ICON_CHECK =
  require("../assets/images/plan/what/restaurants/check.svg") as ImageSourcePropType;
const ICON_PLUS =
  require("../assets/images/plan/what/restaurants/plus.svg") as ImageSourcePropType;

interface PlanFilterChipProps {
  label: string;
  icon: ImageSourcePropType;
  iconWidth: number;
  iconHeight: number;
  selected: boolean;
  onPress: () => void;
}

/**
 * Cuisine / dining-style chip — lime border + check when selected, plus when not.
 */
export function PlanFilterChip({
  label,
  icon,
  iconWidth,
  iconHeight,
  selected,
  onPress,
}: PlanFilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`w-full flex-row items-center justify-between rounded-[32px] bg-white py-[17px] pl-[17px] ${
        selected
          ? "border border-[#d4ff00]"
          : "border border-[rgba(197,201,172,0.1)]"
      }`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
      }}
    >
      <View className="flex-row items-center gap-3">
        <View
          className={`h-8 w-8 items-center justify-center rounded-full ${
            selected ? "bg-[#d4ff00]" : "bg-[#c4e8d9]"
          }`}
        >
          <Image
            source={icon}
            style={{ width: iconWidth, height: iconHeight }}
            contentFit="contain"
          />
        </View>
        <Text className="text-base font-poppins text-[#181c1d] leading-6">
          {label}
        </Text>
      </View>
      <Image
        source={selected ? ICON_CHECK : ICON_PLUS}
        style={{ width: 40.67, height: 16.67 }}
        contentFit="contain"
      />
    </Pressable>
  );
}
