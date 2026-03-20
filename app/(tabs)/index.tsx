import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Chip } from "@/components/chip";
import { DestinationCard } from "@/components/destination-card";

const CATEGORIES = [
  { label: "All Package", icon: "🌍" },
  { label: "Flight Package", icon: "✈️" },
  { label: "Hotel Package", icon: "🏨" },
  { label: "Nature", icon: "🌿" },
];

const NATURE_DESTINATIONS = [
  {
    title: "Tavarua Island",
    location: "Nadi, Fiji",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400&q=80",
  },
  {
    title: "Altea",
    location: "Costa Blanca, Spain",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
  },
  {
    title: "Maafushi Island",
    location: "Maldives",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80",
  },
];

const POPULAR_DESTINATIONS = [
  {
    title: "Bali",
    location: "Indonesia",
    rating: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
  },
  {
    title: "Santorini",
    location: "Greece",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&q=80",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
          <Text className="text-3xl font-poppins-bold text-heading leading-tight">
            Find your{"\n"}favorite place
          </Text>
          <Pressable className="w-12 h-12 rounded-full bg-surface items-center justify-center">
            <Ionicons name="notifications-outline" size={22} color="#1A1A1A" />
          </Pressable>
        </View>

        {/* Search Bar */}
        <Pressable
          onPress={() => router.push("/wizard/destination")}
          className="flex-row items-center mx-6 mt-4 px-4 py-3.5 bg-surface rounded-pill"
        >
          <Ionicons name="search-outline" size={20} color="#8E8E93" />
          <Text className="ml-3 text-subtitle font-poppins text-sm flex-1">
            Search Destination, place...
          </Text>
          <Ionicons name="options-outline" size={20} color="#8E8E93" />
        </Pressable>

        {/* Category Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}
          className="mt-5"
        >
          {CATEGORIES.map((cat, i) => (
            <Chip
              key={cat.label}
              label={cat.label}
              icon={cat.icon}
              selected={i === activeCategory}
              onPress={() => setActiveCategory(i)}
            />
          ))}
        </ScrollView>

        {/* Nature Section */}
        <View className="mt-7">
          <View className="flex-row items-center justify-between px-6 mb-4">
            <Text className="text-lg font-poppins-semibold text-heading">
              Spend little time in nature
            </Text>
            <Pressable>
              <Text className="text-sm font-poppins-medium text-subtitle">View All</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 14 }}
          >
            {NATURE_DESTINATIONS.map((dest) => (
              <DestinationCard
                key={dest.title}
                title={dest.title}
                location={dest.location}
                rating={dest.rating}
                imageUrl={dest.imageUrl}
                size="small"
                onPress={() => router.push("/wizard/destination")}
              />
            ))}
          </ScrollView>
        </View>

        {/* Popular Destinations Section */}
        <View className="mt-7">
          <View className="flex-row items-center justify-between px-6 mb-4">
            <Text className="text-lg font-poppins-semibold text-heading">
              Popular Destinations
            </Text>
            <Pressable>
              <Text className="text-sm font-poppins-medium text-subtitle">View all</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 14 }}
          >
            {POPULAR_DESTINATIONS.map((dest) => (
              <DestinationCard
                key={dest.title}
                title={dest.title}
                location={dest.location}
                rating={dest.rating}
                imageUrl={dest.imageUrl}
                size="large"
                onPress={() => router.push("/wizard/destination")}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
