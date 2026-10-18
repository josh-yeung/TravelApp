import { View, Text, Pressable, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

const ICON_CHECK =
  require("../assets/images/plan/how/check.svg") as ImageSourcePropType;
const ICON_PLUS =
  require("../assets/images/plan/how/plus.svg") as ImageSourcePropType;

interface PlanHowOptionChipProps {
  label: string;
  icon: ImageSourcePropType;
  iconWidth: number;
  iconHeight: number;
  selected: boolean;
  onPress: () => void;
}

/**
 * How? transit / accommodation chip — rounded-16, lime select, check/plus.
 */
export function PlanHowOptionChip({
  label,
  icon,
  iconWidth,
  iconHeight,
  selected,
  onPress,
}: PlanHowOptionChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`w-full flex-row items-center justify-between rounded-2xl bg-white p-[14px] ${
        selected
          ? "border border-[#d4ff00]"
          : "border border-[rgba(197,201,172,0.3)]"
      }`}
      style={{
        shadowColor: "#44655A",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2,
      }}
    >
      <View className="flex-row items-center gap-2.5">
        <View
          className={`h-9 w-9 items-center justify-center rounded-full ${
            selected ? "bg-[#d4ff00]" : "bg-[rgba(196,232,217,0.3)]"
          }`}
        >
          <Image
            source={icon}
            style={{ width: iconWidth, height: iconHeight }}
            contentFit="contain"
          />
        </View>
        <Text
          className="text-sm font-poppins-bold text-[#181c1d] tracking-[0.7px] leading-5"
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
      <Image
        source={selected ? ICON_CHECK : ICON_PLUS}
        style={{ width: 24.67, height: 16.67 }}
        contentFit="contain"
      />
    </Pressable>
  );
}
