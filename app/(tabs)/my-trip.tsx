import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TripCard } from "@/components/trip-card";

type TripTab = "planned" | "past";

const PLANNED_TRIPS = [
  {
    id: "paris",
    title: "Paris",
    dateRange: "Apr 5 - 12",
    image: require("../../assets/images/trips/paris.png"),
  },
  {
    id: "rome",
    title: "Rome",
    dateRange: "May 10 - 15",
    image: require("../../assets/images/trips/rome.png"),
  },
  {
    id: "tokyo",
    title: "Tokyo",
    dateRange: "Jun 2 - 8",
    image: require("../../assets/images/trips/tokyo.png"),
  },
];

export default function MyTripsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TripTab>("planned");

  const trips = activeTab === "planned" ? PLANNED_TRIPS : [];

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
          <Pressable className="h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white">
            <Ionicons name="bookmark-outline" size={20} color="#181C1D" />
          </Pressable>
          <Pressable className="h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white">
            <Ionicons name="person-outline" size={20} color="#181C1D" />
          </Pressable>
        </View>

        <View className="gap-8 px-5">
          <View className="w-full">
            <Text className="pb-1 text-5xl font-poppins-bold text-heading tracking-tighter leading-[52px]">
              My Trips
            </Text>
            <View className="mt-1 w-full flex-row items-end justify-between">
              <Text className="text-2xl font-poppins-bold text-forest tracking-tight">
                {activeTab === "planned" ? "Planned" : "Past"}
              </Text>
              <Pressable
                onPress={() =>
                  setActiveTab((prev) =>
                    prev === "planned" ? "past" : "planned"
                  )
                }
                className="rounded-pill bg-[#E6E9EA] px-3 py-1"
              >
                <Text className="text-base font-poppins text-center text-[#444932]">
                  {activeTab === "planned" ? "Past Trips" : "Planned"}
                </Text>
              </Pressable>
            </View>
          </View>

          <View className="w-full gap-6">
            {trips.length === 0 ? (
              <View className="items-center py-12">
                <Text className="text-base font-poppins text-subtitle">
                  No past trips yet
                </Text>
              </View>
            ) : (
              trips.map((trip) => (
                <TripCard
                  key={trip.id}
                  title={trip.title}
                  dateRange={trip.dateRange}
                  image={trip.image}
                />
              ))
            )}
          </View>

          <Pressable
            className="w-full flex-row items-center justify-center gap-3 rounded-pill bg-white py-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Ionicons name="add" size={18} color="#44655A" />
            <Text className="text-lg font-poppins-bold text-black">
              Plan Manually
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
