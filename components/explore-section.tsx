import { View, Text, ScrollView, Pressable } from "react-native";

import { ExploreDestinationCard } from "@/components/explore-destination-card";
import type { ExploreSectionData } from "@/constants/explore-destinations";

interface ExploreSectionProps {
  section: ExploreSectionData;
  onViewAll?: () => void;
  onDestinationPress?: (destinationId: string) => void;
}

/**
 * Section title + View all + horizontal destination carousel.
 */
export function ExploreSection({
  section,
  onViewAll,
  onDestinationPress,
}: ExploreSectionProps) {
  return (
    <View className="w-full gap-4">
      <View className="w-full flex-row items-end justify-between px-5">
        <Text
          className="text-2xl font-poppins-bold text-heading tracking-tight leading-[30px]"
          style={{ includeFontPadding: false }}
        >
          {section.title}
        </Text>
        <Pressable onPress={onViewAll} hitSlop={8}>
          <Text
            className="text-sm font-poppins-semibold text-olive tracking-[0.7px] leading-5"
            style={{ includeFontPadding: false }}
          >
            View all
          </Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 16,
          paddingLeft: 12,
          paddingRight: 20,
        }}
      >
        {section.destinations.map((destination) => (
          <ExploreDestinationCard
            key={destination.id}
            destination={destination}
            variant={section.variant}
            onPress={() => onDestinationPress?.(destination.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
