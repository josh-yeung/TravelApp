import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  type ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BookingEmptyState } from "@/components/booking-empty-state";
import { BookingFlightCard } from "@/components/booking-flight-card";
import { BookingSectionHeader } from "@/components/booking-section-header";
import { BookingStaysSearchCard } from "@/components/booking-stays-search-card";
import { getTripBookings } from "@/constants/bookings";
import { getTripById } from "@/constants/trips";
import { formatTripDateRange } from "@/lib/calendar";

const ICON_BACK = require("../../assets/images/bookings/back.svg") as ImageSourcePropType;
const ICON_MAP_PIN = require("../../assets/images/bookings/map-pin.svg") as ImageSourcePropType;
const ICON_CALENDAR = require("../../assets/images/bookings/calendar-sm.svg") as ImageSourcePropType;
const ICON_BED = require("../../assets/images/bookings/bed.svg") as ImageSourcePropType;
const ICON_CAR = require("../../assets/images/bookings/car.svg") as ImageSourcePropType;

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

export default function TripBookingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const trip = typeof tripId === "string" ? getTripById(tripId) : undefined;
  const bookings =
    typeof tripId === "string" ? getTripBookings(tripId) : undefined;
  const [staysSearchExpanded, setStaysSearchExpanded] = useState(false);

  useEffect(() => {
    if (!trip) {
      router.back();
    }
  }, [trip, router]);

  if (!trip || !bookings) {
    return null;
  }

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
          icon={ICON_MAP_PIN}
          iconWidth={16}
          iconHeight={20}
          onPress={() =>
            router.push({
              pathname: "/trip/[id]",
              params: { id: trip.id },
            })
          }
        />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 48,
          gap: 48,
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full gap-1">
          <Text className="text-[28px] font-poppins-bold text-[#181c1d] tracking-tight leading-[34px]">
            {trip.title}
          </Text>
          <View className="flex-row items-center gap-2">
            <Image
              source={ICON_CALENDAR}
              style={{ width: 14, height: 15 }}
              contentFit="contain"
            />
            <Text className="text-sm font-poppins-semibold text-[#444932] tracking-[0.7px] leading-5">
              {formatTripDateRange(trip.startDate, trip.endDate)}
            </Text>
          </View>
        </View>

        <View
          className="h-48 w-full overflow-hidden rounded-[32px]"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
            elevation: 4,
          }}
        >
          <Image
            source={bookings.heroImage}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
          />
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.4)"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />
        </View>

        <View className="w-full gap-6">
          <Text className="text-2xl font-poppins-bold text-forest tracking-tight leading-[30px]">
            Bookings
          </Text>

          <View className="w-full gap-4">
            <BookingSectionHeader title="Flights" />
            {bookings.flights.map((flight) => (
              <BookingFlightCard key={flight.id} flight={flight} />
            ))}
          </View>

          <View className="w-full gap-4 pt-6">
            <BookingSectionHeader
              title="Stays"
              expanded={staysSearchExpanded}
              onAddPress={() =>
                setStaysSearchExpanded((prev) => !prev)
              }
            />
            {staysSearchExpanded ? (
              <BookingStaysSearchCard />
            ) : (
              <BookingEmptyState
                icon={ICON_BED}
                iconWidth={37}
                iconHeight={33}
                message="No stays yet"
                ctaLabel="Find a place to stay"
                onCtaPress={() => setStaysSearchExpanded(true)}
              />
            )}
          </View>

          <View className="w-full gap-4 pt-6">
            <BookingSectionHeader title="Cars" />
            <BookingEmptyState
              icon={ICON_CAR}
              iconWidth={37}
              iconHeight={33}
              message="No car rentals yet"
              ctaLabel="Find a car rental"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
