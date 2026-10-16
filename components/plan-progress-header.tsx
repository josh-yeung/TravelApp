import { View, Text, Pressable, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

const ICON_CLOSE = require("../assets/images/plan/close.svg") as ImageSourcePropType;
const ICON_BACK =
  require("../assets/images/calendar/back.svg") as ImageSourcePropType;

const STEPS = ["WHERE", "WHEN", "WHAT", "HOW"] as const;

interface PlanProgressHeaderProps {
  /** Zero-based active step index (0 = WHERE). */
  activeStep?: number;
  /** Close (X) on Where; back arrow on later steps. */
  actionVariant?: "close" | "back";
  onActionPress?: () => void;
}

/**
 * Wizard progress: olive/gray bars + step labels + circular close/back.
 */
export function PlanProgressHeader({
  activeStep = 0,
  actionVariant = "close",
  onActionPress,
}: PlanProgressHeaderProps) {
  const icon = actionVariant === "back" ? ICON_BACK : ICON_CLOSE;
  const iconSize = actionVariant === "back" ? 16 : 14;

  return (
    <View className="w-full flex-row items-center gap-6 px-5 py-4">
      <View className="min-w-0 flex-1 gap-3">
        <View className="w-full flex-row items-center gap-2">
          {STEPS.map((_, index) => (
            <View
              key={STEPS[index]}
              className={`h-1.5 flex-1 rounded-pill ${
                index === activeStep ? "bg-olive" : "bg-[#e6e9ea]"
              }`}
            />
          ))}
        </View>
        <View className="w-full flex-row items-center justify-between">
          {STEPS.map((label, index) => (
            <Text
              key={label}
              className={`w-[63.5px] text-center text-[11px] font-poppins-bold uppercase tracking-[0.55px] leading-[16.5px] ${
                index === activeStep
                  ? "text-olive"
                  : "text-[rgba(68,73,50,0.4)]"
              }`}
            >
              {label}
            </Text>
          ))}
        </View>
      </View>

      <Pressable
        onPress={onActionPress}
        className="h-12 w-12 items-center justify-center rounded-full border border-[#c5c9ac] bg-white"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        }}
      >
        <Image
          source={icon}
          style={{ width: iconSize, height: iconSize }}
          contentFit="contain"
        />
      </Pressable>
    </View>
  );
}
