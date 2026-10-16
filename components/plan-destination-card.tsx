import { View, Text, Pressable, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

import type { PlanDestination } from "@/constants/plan-destinations";

const ICON_CHECK = require("../assets/images/plan/check.svg") as ImageSourcePropType;

interface PlanDestinationCardProps {
  destination: PlanDestination;
  selected: boolean;
  onPress: () => void;
}

/**
 * Destination row: thumb + name/region; selected = olive border + check.
 */
export function PlanDestinationCard({
  destination,
  selected,
  onPress,
}: PlanDestinationCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`w-full flex-row items-center justify-between rounded-[32px] bg-white p-[13px] ${
        selected ? "border border-olive" : "border border-white"
      }`}
      style={{
        shadowColor: "#44655A",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.04,
        shadowRadius: 20,
        elevation: 2,
      }}
    >
      <Image
        source={destination.image}
        style={{ width: 64, height: 64, borderRadius: 12 }}
        contentFit="cover"
      />

      <View className="min-w-0 flex-1 items-center px-2">
        <Text
          className="text-center text-xl font-poppins-bold text-[#181c1d] leading-[30px]"
          style={{ includeFontPadding: false, paddingHorizontal: 2 }}
        >
          {destination.name}
        </Text>
        <Text
          className="text-center text-base font-poppins text-[#444932] leading-6"
          style={{ includeFontPadding: false, paddingHorizontal: 2 }}
        >
          {destination.region}
        </Text>
      </View>

      <View className="h-10 w-10 items-center justify-center">
        {selected ? (
          <Image
            source={ICON_CHECK}
            style={{ width: 32, height: 32 }}
            contentFit="contain"
          />
        ) : null}
      </View>
    </Pressable>
  );
}
