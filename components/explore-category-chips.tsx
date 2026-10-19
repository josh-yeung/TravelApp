import { ScrollView, Pressable, Text } from "react-native";

import type { ExploreCityCategory } from "@/constants/explore-city";

interface ExploreCategoryChipsProps {
  categories: ExploreCityCategory[];
  selectedId: string;
  onSelect: (categoryId: string) => void;
}

/**
 * Horizontal category pills for Explore City. Active = forest fill; inactive = bordered white.
 */
export function ExploreCategoryChips({
  categories,
  selectedId,
  onSelect,
}: ExploreCategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 12,
        paddingVertical: 8,
        paddingHorizontal: 0,
      }}
    >
      {categories.map((category) => {
        const isSelected = category.id === selectedId;
        return (
          <Pressable
            key={category.id}
            onPress={() => onSelect(category.id)}
            className={`items-center justify-center rounded-pill px-6 py-[13px] ${
              isSelected
                ? "bg-forest"
                : "border border-[#c5c9ac] bg-white"
            }`}
            style={
              isSelected
                ? {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 1,
                    elevation: 1,
                  }
                : undefined
            }
          >
            <Text
              className={`text-base font-poppins leading-6 ${
                isSelected ? "text-white" : "text-[#444932]"
              }`}
              style={{ includeFontPadding: false }}
            >
              {category.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
