import { View, Text, Pressable, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

const ICON_CLOSE = require("../assets/images/plan/close.svg") as ImageSourcePropType;

const STEPS = ["WHERE", "WHEN", "WHAT", "HOW"] as const;

interface PlanProgressHeaderProps {
  /** Zero-based active step index (0 = WHERE). */
  activeStep?: number;
  onClose?: () => void;
}

/**
 * Wizard progress: olive/gray bars + step labels + circular close.
 */
export function PlanProgressHeader({
  activeStep = 0,
  onClose,
}: PlanProgressHeaderProps) {
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
        onPress={onClose}
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
          source={ICON_CLOSE}
          style={{ width: 14, height: 14 }}
          contentFit="contain"
        />
      </Pressable>
    </View>
  );
}
