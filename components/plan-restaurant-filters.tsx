import { View, Text, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

import { PlanFilterChip } from "@/components/plan-filter-chip";
import {
  RESTAURANT_CUISINES,
  RESTAURANT_DINING_STYLES,
} from "@/constants/plan-restaurant-filters";

const ICON_CUISINES =
  require("../assets/images/plan/what/restaurants/cuisines.svg") as ImageSourcePropType;
const ICON_DINING_STYLES =
  require("../assets/images/plan/what/restaurants/dining-styles.svg") as ImageSourcePropType;

interface PlanRestaurantFiltersProps {
  selectedCuisineIds: string[];
  selectedDiningStyleIds: string[];
  onToggleCuisine: (id: string) => void;
  onToggleDiningStyle: (id: string) => void;
}

/**
 * Expanded Restaurants filters: Cuisines 2×2 grid + Dining Styles list.
 */
export function PlanRestaurantFilters({
  selectedCuisineIds,
  selectedDiningStyleIds,
  onToggleCuisine,
  onToggleDiningStyle,
}: PlanRestaurantFiltersProps) {
  return (
    <View className="w-full gap-3 pt-2">
      <View className="w-full gap-3">
        <View className="flex-row items-center gap-2">
          <Image
            source={ICON_CUISINES}
            style={{ width: 16.67, height: 16.67 }}
            contentFit="contain"
          />
          <Text className="text-xs font-poppins-bold uppercase tracking-[0.6px] text-[#44655a] leading-4">
            Cuisines
          </Text>
        </View>
        <View className="w-full flex-row flex-wrap justify-between gap-y-3">
          {RESTAURANT_CUISINES.map((cuisine) => (
            <View key={cuisine.id} style={{ width: "48%" }}>
              <PlanFilterChip
                label={cuisine.label}
                icon={cuisine.icon}
                iconWidth={cuisine.iconWidth}
                iconHeight={cuisine.iconHeight}
                selected={selectedCuisineIds.includes(cuisine.id)}
                onPress={() => onToggleCuisine(cuisine.id)}
              />
            </View>
          ))}
        </View>
      </View>

      <View className="w-full gap-3 pt-2">
        <View className="flex-row items-center gap-2">
          <Image
            source={ICON_DINING_STYLES}
            style={{ width: 17.75, height: 14.17 }}
            contentFit="contain"
          />
          <Text className="text-xs font-poppins-bold uppercase tracking-[0.6px] text-[#44655a] leading-4">
            Dining Styles
          </Text>
        </View>
        <View className="w-full gap-3">
          {RESTAURANT_DINING_STYLES.map((style) => (
            <PlanFilterChip
              key={style.id}
              label={style.label}
              icon={style.icon}
              iconWidth={style.iconWidth}
              iconHeight={style.iconHeight}
              selected={selectedDiningStyleIds.includes(style.id)}
              onPress={() => onToggleDiningStyle(style.id)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
