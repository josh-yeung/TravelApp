import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTrip } from "@/lib/trip-context";
import { BUDGET_OPTIONS, VIBE_OPTIONS } from "@/lib/types";

function formatDate(dateString: string): string {
  if (!dateString) return "Not set";
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function ReviewStep() {
  const router = useRouter();
  const { trip, reset } = useTrip();

  const budgetLabel =
    BUDGET_OPTIONS.find((b) => b.value === trip.budget)?.label ?? "Not set";
  const budgetRange =
    BUDGET_OPTIONS.find((b) => b.value === trip.budget)?.range ?? "";

  const selectedVibes = VIBE_OPTIONS.filter((v) => trip.vibes.includes(v.value));

  const handleGenerate = () => {
    console.log("Trip params ready for generation:", JSON.stringify(trip, null, 2));

    Alert.alert(
      "Trip Ready!",
      `Your trip to ${trip.destination} is ready to be generated. This will connect to the Two-Brain system in the next phase.`,
      [
        {
          text: "Back to Home",
          onPress: () => {
            reset();
            router.dismissAll();
            router.replace("/(tabs)");
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()} className="mb-6">
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </Pressable>

        <Text className="text-3xl font-poppins-bold text-heading mb-2">
          Review your{"\n"}trip details
        </Text>
        <Text className="text-base font-poppins text-subtitle mb-8">
          Make sure everything looks good
        </Text>

        {/* Destination */}
        <View className="bg-surface rounded-card p-4 mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
                <Ionicons name="location" size={20} color="#8DE175" />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-poppins-medium text-subtitle">Destination</Text>
                <Text className="text-base font-poppins-semibold text-heading mt-0.5">
                  {trip.destination}
                </Text>
              </View>
            </View>
            <Pressable onPress={() => router.dismissTo("/wizard/destination")}>
              <Text className="text-sm font-poppins-medium text-primary">Edit</Text>
            </Pressable>
          </View>
        </View>

        {/* Dates */}
        <View className="bg-surface rounded-card p-4 mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
                <Ionicons name="calendar" size={20} color="#8DE175" />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-poppins-medium text-subtitle">Dates</Text>
                <Text className="text-base font-poppins-semibold text-heading mt-0.5">
                  {formatDate(trip.startDate)} — {formatDate(trip.endDate)}
                </Text>
              </View>
            </View>
            <Pressable onPress={() => router.dismissTo("/wizard/dates")}>
              <Text className="text-sm font-poppins-medium text-primary">Edit</Text>
            </Pressable>
          </View>
        </View>

        {/* Budget */}
        <View className="bg-surface rounded-card p-4 mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
                <Ionicons name="wallet" size={20} color="#8DE175" />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-poppins-medium text-subtitle">Budget</Text>
                <Text className="text-base font-poppins-semibold text-heading mt-0.5">
                  {budgetLabel} · {budgetRange}
                </Text>
              </View>
            </View>
            <Pressable onPress={() => router.dismissTo("/wizard/budget")}>
              <Text className="text-sm font-poppins-medium text-primary">Edit</Text>
            </Pressable>
          </View>
        </View>

        {/* Vibes */}
        <View className="bg-surface rounded-card p-4 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
                <Ionicons name="sparkles" size={20} color="#8DE175" />
              </View>
              <View>
                <Text className="text-xs font-poppins-medium text-subtitle">Vibes</Text>
                <Text className="text-sm font-poppins text-subtitle mt-0.5">
                  {selectedVibes.length} selected
                </Text>
              </View>
            </View>
            <Pressable onPress={() => router.dismissTo("/wizard/vibes")}>
              <Text className="text-sm font-poppins-medium text-primary">Edit</Text>
            </Pressable>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {selectedVibes.map((vibe) => (
              <View key={vibe.value} className="flex-row items-center bg-white rounded-pill px-3 py-1.5">
                <Text className="mr-1">{vibe.icon}</Text>
                <Text className="text-sm font-poppins-medium text-heading">{vibe.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Generate CTA */}
      <View className="px-6 pb-8">
        <Pressable
          onPress={handleGenerate}
          className="bg-primary py-4 rounded-pill items-center flex-row justify-center"
        >
          <Ionicons name="sparkles" size={20} color="#FFFFFF" />
          <Text className="text-base font-poppins-bold text-white ml-2">
            Generate My Trip
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
