import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTrip } from "@/lib/trip-context";
import { BUDGET_OPTIONS, type BudgetLevel } from "@/lib/types";

const BUDGET_ICONS: Record<BudgetLevel, string> = {
  budget: "wallet-outline",
  moderate: "card-outline",
  premium: "diamond-outline",
  luxury: "star-outline",
};

export default function BudgetStep() {
  const router = useRouter();
  const { trip, setBudget } = useTrip();

  const canProceed = trip.budget !== null;

  return (
    <View className="flex-1 px-6 pt-6">
      <Pressable onPress={() => router.back()} className="mb-6">
        <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
      </Pressable>

      <Text className="text-3xl font-poppins-bold text-heading mb-2">
        What's your{"\n"}budget?
      </Text>
      <Text className="text-base font-poppins text-subtitle mb-8">
        Choose a spending range for your trip
      </Text>

      <View className="gap-3">
        {BUDGET_OPTIONS.map((option) => {
          const isSelected = trip.budget === option.value;
          return (
            <Pressable
              key={option.value}
              onPress={() => setBudget(option.value)}
              className={`flex-row items-center rounded-card px-4 py-5 border-2 ${
                isSelected
                  ? "bg-primary/10 border-primary"
                  : "bg-surface border-transparent"
              }`}
            >
              <View
                className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
                  isSelected ? "bg-primary" : "bg-white"
                }`}
              >
                <Ionicons
                  name={BUDGET_ICONS[option.value] as keyof typeof Ionicons.glyphMap}
                  size={22}
                  color={isSelected ? "#FFFFFF" : "#8E8E93"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-base font-poppins-semibold text-heading">
                  {option.label}
                </Text>
                <Text className="text-sm font-poppins text-subtitle mt-0.5">
                  {option.range}
                </Text>
              </View>
              {isSelected && (
                <Ionicons name="checkmark-circle" size={24} color="#8DE175" />
              )}
            </Pressable>
          );
        })}
      </View>

      <View className="flex-1" />
      <Pressable
        onPress={() => canProceed && router.push("/wizard/vibes")}
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
