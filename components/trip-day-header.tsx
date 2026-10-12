import { View, Text } from "react-native";

import { formatDayTitle } from "@/lib/calendar";

interface TripDayHeaderProps {
  date: string;
  destination: string;
  distanceLabel: string;
  spotsCount: number;
}

export function TripDayHeader({
  date,
  destination,
  distanceLabel,
  spotsCount,
}: TripDayHeaderProps) {
  return (
    <View className="w-full gap-1 px-5">
      <Text className="text-5xl font-poppins-bold text-[#181c1d] tracking-tighter leading-[52px]">
        {formatDayTitle(date)}
      </Text>
      <View className="w-full flex-row items-end justify-between">
        <Text className="text-2xl font-poppins-bold text-forest tracking-tight leading-[30px]">
          {destination}
        </Text>
        <View className="rounded-pill bg-[#e6e9ea] px-3 py-1">
          <Text className="text-sm font-poppins-semibold text-[#444932] tracking-[0.7px] leading-5">
            {distanceLabel} • {spotsCount} spots
          </Text>
        </View>
      </View>
    </View>
  );
}
