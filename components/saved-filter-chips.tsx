import { ScrollView, Pressable, Text, View } from "react-native";

import type { SavedFilterChip } from "@/constants/saved-places";

interface SavedFilterChipsProps {
  chips: SavedFilterChip[];
  selectedId: string;
  onSelect: (chipId: string) => void;
  /** Horizontal inset so the row can bleed edge-to-edge while content aligns with the page. */
  horizontalPadding?: number;
}

/**
 * City / category quick chips for Saved Places.
 * Active = forest fill + lime dot + lime text; inactive = light gray fill + dark olive text.
 */
export function SavedFilterChips({
  chips,
  selectedId,
  onSelect,
  horizontalPadding = 0,
}: SavedFilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 9,
        paddingHorizontal: horizontalPadding,
      }}
    >
      {chips.map((chip) => {
        const isSelected = chip.id === selectedId;
        return (
          <Pressable
            key={chip.id}
            onPress={() => onSelect(chip.id)}
            className={`h-9 flex-row items-center justify-center gap-1.5 rounded-pill px-4 ${
              isSelected ? "bg-forest" : "bg-[#e6e9ea]"
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
            {isSelected ? (
              <View className="h-2 w-2 rounded-full bg-[#d4ff00]" />
            ) : null}
            <Text
              className={`text-sm font-poppins-semibold leading-5 ${
                isSelected ? "text-[#d4ff00]" : "text-[#444932]"
              }`}
              style={{ letterSpacing: 0.7, includeFontPadding: false }}
            >
              {chip.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
