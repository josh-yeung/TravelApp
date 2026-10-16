import { View, Text, Pressable, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

import type { PlanActivity } from "@/constants/plan-activities";

const ICON_CHEVRON =
  require("../assets/images/plan/what/chevron.svg") as ImageSourcePropType;

interface PlanActivityRowProps {
  activity: PlanActivity;
  onPress?: () => void;
}

/**
 * What? category row — mint icon circle, label, chevron.
 */
export function PlanActivityRow({ activity, onPress }: PlanActivityRowProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full flex-row items-center justify-between rounded-[32px] bg-white p-6"
      style={{
        shadowColor: "#44655A",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.04,
        shadowRadius: 20,
        elevation: 2,
      }}
    >
      <View className="flex-row items-center gap-4">
        <View className="h-12 w-12 items-center justify-center rounded-full bg-[rgba(196,232,217,0.3)]">
          <Image
            source={activity.icon}
            style={{
              width: activity.iconWidth,
              height: activity.iconHeight,
            }}
            contentFit="contain"
          />
        </View>
        <Text className="text-lg font-poppins text-[#181c1d] leading-7">
          {activity.label}
        </Text>
      </View>
      <Image
        source={ICON_CHEVRON}
        style={{ width: 7.4, height: 12 }}
        contentFit="contain"
      />
    </Pressable>
  );
}
