import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTrip } from "@/lib/trip-context";
import { VIBE_OPTIONS } from "@/lib/types";

export default function VibesStep() {
  const router = useRouter();
  const { trip, toggleVibe } = useTrip();

  const canProceed = trip.vibes.length > 0;

  return (
    <View className="flex-1 px-6 pt-6">
      <Pressable onPress={() => router.back()} className="mb-6">
        <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
      </Pressable>

      <Text className="text-3xl font-poppins-bold text-heading mb-2">
        What's your{"\n"}travel vibe?
      </Text>
      <Text className="text-base font-poppins text-subtitle mb-8">
        Select all that match your style
      </Text>

      <View className="flex-row flex-wrap gap-3">
        {VIBE_OPTIONS.map((vibe) => {
          const isSelected = trip.vibes.includes(vibe.value);
          return (
            <Pressable
              key={vibe.value}
              onPress={() => toggleVibe(vibe.value)}
              className={`flex-row items-center px-5 py-3.5 rounded-pill border-2 ${
                isSelected
                  ? "bg-primary/10 border-primary"
                  : "bg-surface border-transparent"
              }`}
            >
              <Text className="text-xl mr-2">{vibe.icon}</Text>
              <Text
                className={`font-poppins-medium text-sm ${
                  isSelected ? "text-heading" : "text-subtitle"
                }`}
              >
                {vibe.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {trip.vibes.length > 0 && (
        <Text className="text-sm font-poppins text-subtitle mt-4">
          {trip.vibes.length} selected
        </Text>
      )}

      <View className="flex-1" />
      <Pressable
        onPress={() => canProceed && router.push("/wizard/review")}
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
