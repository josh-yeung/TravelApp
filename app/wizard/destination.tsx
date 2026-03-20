import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTrip } from "@/lib/trip-context";

export default function DestinationStep() {
  const router = useRouter();
  const { trip, setDestination } = useTrip();

  const canProceed = trip.destination.trim().length > 0;

  return (
    <View className="flex-1 px-6 pt-6">
      {/* Back button */}
      <Pressable onPress={() => router.back()} className="mb-6">
        <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
      </Pressable>

      {/* Header */}
      <Text className="text-3xl font-poppins-bold text-heading mb-2">
        Where do you{"\n"}want to go?
      </Text>
      <Text className="text-base font-poppins text-subtitle mb-8">
        Enter your dream destination
      </Text>

      {/* Input */}
      <View className="flex-row items-center bg-surface rounded-card px-4 py-4">
        <Ionicons name="location-outline" size={22} color="#8DE175" />
        <TextInput
          className="flex-1 ml-3 text-base font-poppins text-heading"
          placeholder="Search destination..."
          placeholderTextColor="#8E8E93"
          value={trip.destination}
          onChangeText={setDestination}
          autoFocus
        />
        {trip.destination.length > 0 && (
          <Pressable onPress={() => setDestination("")}>
            <Ionicons name="close-circle" size={20} color="#8E8E93" />
          </Pressable>
        )}
      </View>

      {/* Quick suggestions */}
      <Text className="text-sm font-poppins-medium text-subtitle mt-8 mb-3">
        Popular destinations
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {["Bali, Indonesia", "Paris, France", "Tokyo, Japan", "Santorini, Greece", "New York, USA"].map(
          (place) => (
            <Pressable
              key={place}
              onPress={() => setDestination(place)}
              className={`px-4 py-2.5 rounded-pill border ${
                trip.destination === place
                  ? "bg-primary/10 border-primary"
                  : "bg-surface border-transparent"
              }`}
            >
              <Text
                className={`font-poppins text-sm ${
                  trip.destination === place ? "text-heading" : "text-subtitle"
                }`}
              >
                {place}
              </Text>
            </Pressable>
          )
        )}
      </View>

      {/* Next button */}
      <View className="flex-1" />
      <Pressable
        onPress={() => canProceed && router.push("/wizard/dates")}
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
