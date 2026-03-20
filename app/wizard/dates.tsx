import { View, Text, Pressable, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import DateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useTrip } from "@/lib/trip-context";

function formatDate(dateString: string): string {
  if (!dateString) return "Select date";
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DatesStep() {
  const router = useRouter();
  const { trip, setDates } = useTrip();

  const [showPicker, setShowPicker] = useState<"start" | "end" | null>(null);

  const startDate = trip.startDate ? new Date(trip.startDate) : new Date();
  const endDate = trip.endDate ? new Date(trip.endDate) : new Date(Date.now() + 3 * 86400000);

  const canProceed = trip.startDate.length > 0 && trip.endDate.length > 0;

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(null);
    }
    if (event.type === "dismissed") {
      setShowPicker(null);
      return;
    }
    if (!selectedDate) return;

    const iso = selectedDate.toISOString();
    if (showPicker === "start") {
      setDates(iso, trip.endDate || new Date(selectedDate.getTime() + 3 * 86400000).toISOString());
    } else if (showPicker === "end") {
      setDates(trip.startDate, iso);
    }

    if (Platform.OS === "android") {
      setShowPicker(null);
    }
  };

  return (
    <View className="flex-1 px-6 pt-6">
      <Pressable onPress={() => router.back()} className="mb-6">
        <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
      </Pressable>

      <Text className="text-3xl font-poppins-bold text-heading mb-2">
        When are you{"\n"}traveling?
      </Text>
      <Text className="text-base font-poppins text-subtitle mb-8">
        Pick your trip dates
      </Text>

      {/* Start Date */}
      <Pressable
        onPress={() => setShowPicker("start")}
        className="flex-row items-center bg-surface rounded-card px-4 py-4 mb-4"
      >
        <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
          <Ionicons name="calendar-outline" size={20} color="#8DE175" />
        </View>
        <View className="flex-1">
          <Text className="text-xs font-poppins-medium text-subtitle">Start Date</Text>
          <Text className="text-base font-poppins-semibold text-heading mt-0.5">
            {formatDate(trip.startDate)}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
      </Pressable>

      {/* End Date */}
      <Pressable
        onPress={() => setShowPicker("end")}
        className="flex-row items-center bg-surface rounded-card px-4 py-4"
      >
        <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
          <Ionicons name="calendar-outline" size={20} color="#8DE175" />
        </View>
        <View className="flex-1">
          <Text className="text-xs font-poppins-medium text-subtitle">End Date</Text>
          <Text className="text-base font-poppins-semibold text-heading mt-0.5">
            {formatDate(trip.endDate)}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
      </Pressable>

      {/* Date Picker */}
      {showPicker !== null && (
        <View className="mt-4">
          <DateTimePicker
            value={showPicker === "start" ? startDate : endDate}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            minimumDate={showPicker === "end" && trip.startDate ? new Date(trip.startDate) : new Date()}
            onChange={handleDateChange}
          />
          {Platform.OS === "ios" && (
            <Pressable
              onPress={() => setShowPicker(null)}
              className="mt-2 py-2 items-center"
            >
              <Text className="text-primary font-poppins-semibold">Done</Text>
            </Pressable>
          )}
        </View>
      )}

      <View className="flex-1" />
      <Pressable
        onPress={() => canProceed && router.push("/wizard/budget")}
        className={`mb-8 py-4 rounded-pill items-center ${
          canProceed ? "bg-primary" : "bg-surface"
        }`}
        disabled={!canProceed}
      >
        <Text
          className={`text-base font-poppins-semibold ${
            canProceed ? "text-white" : "text-subtitle"
          }`}
        >
          Next
        </Text>
      </Pressable>
    </View>
  );
}
