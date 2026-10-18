import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import type {
  ExploreCardVariant,
  ExploreDestination,
} from "@/constants/explore-destinations";

interface ExploreDestinationCardProps {
  destination: ExploreDestination;
  variant: ExploreCardVariant;
  onPress?: () => void;
}

/**
 * Destination photo card for Explore carousels.
 * featured = large popular card with region + city; region = smaller city-only card.
 */
export function ExploreDestinationCard({
  destination,
  variant,
  onPress,
}: ExploreDestinationCardProps) {
  const isFeatured = variant === "featured";

  return (
    <Pressable
      onPress={onPress}
      className={`overflow-hidden rounded-[32px] ${
        isFeatured ? "h-80 w-64" : "h-64 w-48"
      }`}
      style={{
        shadowColor: "#44655A",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.04,
        shadowRadius: 20,
        elevation: 2,
      }}
    >
      <Image
        source={destination.image}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        contentFit="cover"
      />

      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
        locations={[0, 0.5, 1]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <View
        style={{
          position: "absolute",
          left: isFeatured ? 24 : 16,
          bottom: isFeatured ? 24 : 16,
        }}
      >
        {isFeatured && destination.region ? (
          <View className="gap-1">
            <Text
              className="text-xs font-poppins-medium uppercase tracking-[1.2px] text-[#d4ff00] leading-4"
              style={{ includeFontPadding: false }}
            >
              {destination.region}
            </Text>
            <Text
              className="text-2xl font-poppins-bold text-white tracking-tight leading-[30px]"
              style={{ includeFontPadding: false }}
            >
              {destination.name}
            </Text>
          </View>
        ) : (
          <Text
            className="text-sm font-poppins-semibold text-white tracking-[0.7px] leading-5"
            style={{ includeFontPadding: false }}
          >
            {destination.name}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
