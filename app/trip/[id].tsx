import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Pressable,
  useWindowDimensions,
  type ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { TripCalendarMonth } from "@/components/trip-calendar-month";
import { TripDateStrip } from "@/components/trip-date-strip";
import { TripDayHeader } from "@/components/trip-day-header";
import { TripDayMap } from "@/components/trip-day-map";
import { TripSpotCard } from "@/components/trip-spot-card";
import { getDayItinerary } from "@/constants/trip-itineraries";
import { getTripById } from "@/constants/trips";
import {
  eachIsoDateInRange,
  monthsForTrip,
} from "@/lib/calendar";

const ICON_BACK = require("../../assets/images/calendar/back.svg") as ImageSourcePropType;
const ICON_FILTER = require("../../assets/images/calendar/filter.svg") as ImageSourcePropType;

type ScreenMode = "month" | "day";

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
  const { height: windowHeight } = useWindowDimensions();
  const { id } = useLocalSearchParams<{ id: string }>();
  const trip = typeof id === "string" ? getTripById(id) : undefined;

  const [mode, setMode] = useState<ScreenMode>("month");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const sheetRef = useRef<BottomSheet>(null);

  const tripDates = useMemo(
    () =>
      trip ? eachIsoDateInRange(trip.startDate, trip.endDate) : [],
    [trip]
  );

  const dayItinerary = useMemo(() => {
    if (!trip || !selectedDate) {
      return undefined;
    }
    return getDayItinerary(trip.id, selectedDate);
  }, [trip, selectedDate]);

  const snapPoints = useMemo(() => {
    const collapsed = Math.max(121, Math.round(windowHeight * 0.14));
    return [collapsed, "85%"];
  }, [windowHeight]);

  useEffect(() => {
    if (!trip) {
      router.back();
    }
  }, [trip, router]);

  const openDayView = useCallback((isoDate: string) => {
    setSelectedDate(isoDate);
    setMode("day");
  }, []);

  const handleBack = useCallback(() => {
    if (mode === "day") {
      setMode("month");
      setSelectedDate(null);
      return;
    }
    router.back();
  }, [mode, router]);

  if (!trip) {
    return null;
  }

  const months = monthsForTrip(trip.startDate, trip.endDate);
  const spots = dayItinerary?.spots ?? [];

  if (mode === "month") {
    return (
      <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
        <View className="flex-row items-center justify-between px-[11px] pb-4 pt-[7px]">
          <CircleIconButton
            icon={ICON_BACK}
            iconWidth={16}
            iconHeight={16}
            onPress={handleBack}
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
              onSelectDate={openDayView}
            />
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <TripDayMap center={trip.center} spots={spots} />

      <View
        className="absolute left-0 right-0 z-10 flex-row items-center justify-between px-[11px] pt-[7px]"
        style={{ top: insets.top }}
        pointerEvents="box-none"
      >
        <CircleIconButton
          icon={ICON_BACK}
          iconWidth={16}
          iconHeight={16}
          onPress={handleBack}
        />
        <CircleIconButton
          icon={ICON_FILTER}
          iconWidth={20}
          iconHeight={15}
        />
      </View>

      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        handleIndicatorStyle={{
          backgroundColor: "#c5c9ac",
          width: 40,
          height: 6,
          opacity: 0.6,
        }}
        handleStyle={{
          paddingTop: 13,
          paddingBottom: 8,
        }}
        backgroundStyle={{
          backgroundColor: "#f7fafb",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: 0.15,
          shadowRadius: 20,
          elevation: 12,
        }}
      >
        <BottomSheetScrollView
          contentContainerStyle={{
            paddingBottom: insets.bottom + 48,
            gap: 24,
          }}
          showsVerticalScrollIndicator={false}
        >
          {selectedDate ? (
            <TripDateStrip
              dates={tripDates}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          ) : null}

          {selectedDate && dayItinerary ? (
            <>
              <TripDayHeader
                date={selectedDate}
                destination={trip.title}
                distanceLabel={dayItinerary.distanceLabel}
                spotsCount={dayItinerary.spotsCount}
              />
              <View className="w-full gap-0 px-5 pt-2.5">
                {spots.map((spot, index) => (
                  <TripSpotCard
                    key={spot.id}
                    spot={spot}
                    index={index}
                    isLast={index === spots.length - 1}
                  />
                ))}
              </View>
            </>
          ) : null}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}
