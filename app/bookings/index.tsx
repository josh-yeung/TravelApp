import { View, Text, ScrollView, Pressable, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BookingEmptyState } from "@/components/booking-empty-state";
import { BookingFlightCard } from "@/components/booking-flight-card";
import { BookingSectionHeader } from "@/components/booking-section-header";
import { getHubFlights } from "@/constants/bookings";

const ICON_BOOKMARK = require("../../assets/images/bookings/bookmark-btn.svg") as ImageSourcePropType;
const ICON_PERSON = require("../../assets/images/bookings/person-btn.svg") as ImageSourcePropType;
const ICON_BED = require("../../assets/images/bookings/bed.svg") as ImageSourcePropType;
const ICON_CAR = require("../../assets/images/bookings/car.svg") as ImageSourcePropType;

export default function BookingsHubScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const flights = getHubFlights();

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-[11px] pb-4 pt-[7px]">
        <Image
          source={ICON_BOOKMARK}
          style={{ width: 52, height: 52 }}
          contentFit="contain"
        />
        <Pressable onPress={() => router.push("/profile")}>
          <Image
            source={ICON_PERSON}
            style={{ width: 52, height: 52 }}
            contentFit="contain"
          />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 80,
          gap: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-poppins-bold text-forest tracking-tight leading-[30px]">
          Bookings
        </Text>

        <View className="w-full gap-4">
          <BookingSectionHeader title="Flights" />
          {flights.map((flight) => (
            <BookingFlightCard
              key={flight.id}
              flight={flight}
              onPress={() =>
                router.push({
                  pathname: "/bookings/[tripId]",
                  params: { tripId: flight.tripId },
                })
              }
            />
          ))}
        </View>

        <View className="w-full gap-4 pt-6">
          <BookingSectionHeader title="Stays" />
          <BookingEmptyState
            icon={ICON_BED}
            iconWidth={37}
            iconHeight={33}
            message="No stays booked yet"
            ctaLabel="Find a place to stay"
          />
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
      </ScrollView>
    </View>
  );
}
