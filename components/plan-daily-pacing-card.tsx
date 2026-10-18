import { View, Text, Pressable, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

import { PlanHowOptionChip } from "@/components/plan-how-option-chip";
import {
  PACING_OPTIONS,
  SPOTS_MAX,
  SPOTS_MIN,
} from "@/constants/plan-how-options";

const ICON_MINUS =
  require("../assets/images/plan/how/minus.svg") as ImageSourcePropType;
const ICON_PLUS =
  require("../assets/images/plan/how/plus-stepper.svg") as ImageSourcePropType;

interface PlanDailyPacingCardProps {
  spotsPerDay: number;
  selectedPacingId: string;
  onSpotsChange: (spots: number) => void;
  onPacingPress: (pacingId: string) => void;
}

/**
 * Daily pacing — spots stepper + Slow / Balanced / Fast chips.
 */
export function PlanDailyPacingCard({
  spotsPerDay,
  selectedPacingId,
  onSpotsChange,
  onPacingPress,
}: PlanDailyPacingCardProps) {
  return (
    <View className="w-full gap-3 pt-4">
      <Text className="text-xs font-poppins-bold uppercase tracking-[0.6px] text-[#44655a] leading-4">
        Daily Pacing
      </Text>

      <View className="w-full gap-3 rounded-[32px] bg-[#f1f4f5] p-4">
        <View className="w-full flex-row items-center justify-center gap-6 px-1.5 pt-1.5">
          <Text className="flex-shrink text-sm font-poppins-bold text-[#181c1d] tracking-[0.7px] leading-5">
            Target spots per{"\n"}day
          </Text>

          <View
            className="flex-row items-center gap-3 rounded-pill bg-white px-2 py-1.5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 1,
              elevation: 1,
            }}
          >
            <Pressable
              onPress={() =>
                onSpotsChange(Math.max(SPOTS_MIN, spotsPerDay - 1))
              }
              className="h-8 w-8 items-center justify-center rounded-full bg-[#ebeeef]"
              accessibilityLabel="Decrease spots"
            >
              <Image
                source={ICON_MINUS}
                style={{ width: 10.5, height: 1.5 }}
                contentFit="contain"
              />
            </Pressable>

            <View className="min-w-[70px] items-center px-2">
              <Text className="text-sm font-poppins-bold text-[#44655a] tracking-[0.7px] leading-5">
                {spotsPerDay} spots
              </Text>
            </View>

            <Pressable
              onPress={() =>
                onSpotsChange(Math.min(SPOTS_MAX, spotsPerDay + 1))
              }
              className="h-8 w-8 items-center justify-center rounded-full bg-[#44655a]"
              accessibilityLabel="Increase spots"
            >
              <Image
                source={ICON_PLUS}
                style={{ width: 10.5, height: 10.5 }}
                contentFit="contain"
              />
            </Pressable>
          </View>
        </View>

        <View className="w-full flex-row flex-wrap justify-between gap-y-3 px-3 pt-1.5">
          {PACING_OPTIONS.map((option) => (
            <View key={option.id} style={{ width: "48%" }}>
              <PlanHowOptionChip
                label={option.label}
                icon={option.icon}
                iconWidth={option.iconWidth}
                iconHeight={option.iconHeight}
                selected={selectedPacingId === option.id}
                onPress={() => onPacingPress(option.id)}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
