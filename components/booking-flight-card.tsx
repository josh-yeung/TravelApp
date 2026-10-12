import { View, Text, Pressable, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

import type { FlightBooking } from "@/constants/bookings";

const ICON_PLANE = require("../assets/images/bookings/plane-path.svg") as ImageSourcePropType;
const ICON_CALENDAR = require("../assets/images/bookings/calendar-sm.svg") as ImageSourcePropType;
const ICON_CHEVRON = require("../assets/images/bookings/chevron.svg") as ImageSourcePropType;

interface BookingFlightCardProps {
  flight: FlightBooking;
  onPress?: () => void;
}

export function BookingFlightCard({ flight, onPress }: BookingFlightCardProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className="w-full gap-4 overflow-hidden rounded-[32px] border border-white/30 bg-white/70 p-[21px]"
      style={{
        shadowColor: "#44655A",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.06,
        shadowRadius: 20,
        elevation: 3,
      }}
    >
      <View className="w-full flex-row items-center justify-between">
        <View className="items-center">
          <Text className="text-2xl font-poppins-bold text-[#181c1d] tracking-tight leading-[30px]">
            {flight.originCode}
          </Text>
          <Text className="text-xs font-poppins-medium text-[#444932] leading-4">
            {flight.originCity}
          </Text>
        </View>

        <View className="mx-3 h-[57px] flex-1 items-center justify-between py-0.5">
          <Image
            source={ICON_PLANE}
            style={{ width: 21, height: 18 }}
            contentFit="contain"
          />
          <View className="h-px w-full items-center justify-center bg-[#c5c9ac]">
            <View className="h-1.5 w-1.5 rounded-full bg-olive" />
          </View>
          <Text className="text-xs font-poppins-medium text-olive leading-4">
            {flight.duration}
          </Text>
        </View>

        <View className="items-center">
          <Text className="text-2xl font-poppins-bold text-[#181c1d] tracking-tight leading-[30px]">
            {flight.destinationCode}
          </Text>
          <Text className="text-xs font-poppins-medium text-[#444932] leading-4">
            {flight.destinationCity}
          </Text>
        </View>
      </View>

      <View className="w-full flex-row items-center justify-between border-t border-[rgba(197,201,172,0.3)] pt-[17px]">
        <View className="flex-row items-center gap-2">
          <Image
            source={ICON_CALENDAR}
            style={{ width: 14, height: 15 }}
            contentFit="contain"
          />
          <Text className="text-sm font-poppins text-[#444932] leading-6">
            {flight.departLabel}
          </Text>
        </View>
        <Image
          source={ICON_CHEVRON}
          style={{ width: 11, height: 11 }}
          contentFit="contain"
        />
        <Text className="text-sm font-poppins text-[#444932] text-right leading-6">
          {flight.arriveLabel}
        </Text>
      </View>
    </Pressable>
  );
}
