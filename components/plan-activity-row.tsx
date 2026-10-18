import { View, Text, Pressable, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

import type { PlanActivity } from "@/constants/plan-activities";

const ICON_CHEVRON =
  require("../assets/images/plan/what/chevron.svg") as ImageSourcePropType;
const ICON_CHEVRON_UP =
  require("../assets/images/plan/what/restaurants/chevron-up.svg") as ImageSourcePropType;

interface PlanActivityRowProps {
  activity: PlanActivity;
  expanded?: boolean;
  onPress?: () => void;
}

/**
 * What? category row — mint icon circle, label, chevron.
 * Expanded: olive background, white label, chevron up.
 */
export function PlanActivityRow({
  activity,
  expanded = false,
  onPress,
}: PlanActivityRowProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`w-full flex-row items-center justify-between rounded-[32px] p-6 ${
        expanded ? "bg-olive" : "bg-white"
      }`}
      style={
        expanded
          ? undefined
          : {
              shadowColor: "#44655A",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.04,
              shadowRadius: 20,
              elevation: 2,
            }
      }
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
        <Text
          className={`text-lg font-poppins leading-7 ${
            expanded ? "text-white" : "text-[#181c1d]"
          }`}
        >
          {activity.label}
        </Text>
      </View>
      <Image
        source={expanded ? ICON_CHEVRON_UP : ICON_CHEVRON}
        style={
          expanded
            ? { width: 12, height: 7.4 }
            : { width: 7.4, height: 12 }
        }
        contentFit="contain"
      />
    </Pressable>
  );
}
