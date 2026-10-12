import { useEffect } from "react";
import {
  View,
  ScrollView,
  Pressable,
  type ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TripCalendarMonth } from "@/components/trip-calendar-month";
import { getTripById } from "@/constants/trips";
import { monthsForTrip } from "@/lib/calendar";

const ICON_BACK = require("../../assets/images/calendar/back.svg") as ImageSourcePropType;
const ICON_FILTER = require("../../assets/images/calendar/filter.svg") as ImageSourcePropType;

function CircleIconButton({
  icon,
  iconWidth,
  iconHeight,
  onPress,
}: {
  icon: ImageSourcePropType;
  iconWidth: number;
  iconHeight: number;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="h-12 w-12 items-center justify-center rounded-full border border-[#c5c9ac] bg-white/90"
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
        style={{ width: iconWidth, height: iconHeight }}
        contentFit="contain"
      />
    </Pressable>
  );
}

export default function TripCalendarScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const trip = typeof id === "string" ? getTripById(id) : undefined;

  useEffect(() => {
    if (!trip) {
      router.back();
    }
  }, [trip, router]);

  if (!trip) {
    return null;
  }

  const months = monthsForTrip(trip.startDate, trip.endDate);

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-[11px] pb-4 pt-[7px]">
        <CircleIconButton
          icon={ICON_BACK}
          iconWidth={16}
          iconHeight={16}
          onPress={() => router.back()}
        />
        <CircleIconButton
          icon={ICON_FILTER}
          iconWidth={20}
          iconHeight={15}
        />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 32,
          gap: 48,
        }}
        showsVerticalScrollIndicator={false}
      >
        {months.map((month) => (
          <TripCalendarMonth
            key={`${month.year}-${month.month}`}
            month={month}
            startDate={trip.startDate}
            endDate={trip.endDate}
          />
        ))}
      </ScrollView>
    </View>
  );
}
