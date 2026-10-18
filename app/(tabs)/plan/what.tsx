import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  type ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PlanActivityRow } from "@/components/plan-activity-row";
import { PlanProgressHeader } from "@/components/plan-progress-header";
import { PlanRestaurantFilters } from "@/components/plan-restaurant-filters";
import { PLAN_ACTIVITIES } from "@/constants/plan-activities";
import {
  DEFAULT_SELECTED_CUISINE_IDS,
  DEFAULT_SELECTED_DINING_STYLE_IDS,
} from "@/constants/plan-restaurant-filters";

const ICON_BOOKMARK =
  require("../../../assets/images/plan/what/bookmark.svg") as ImageSourcePropType;
const ICON_WAND =
  require("../../../assets/images/plan/what/wand.svg") as ImageSourcePropType;
const ICON_NEXT =
  require("../../../assets/images/plan/next-arrow.svg") as ImageSourcePropType;

function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}

export default function PlanWhatScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { destinations, startDate, endDate } = useLocalSearchParams<{
    destinations?: string;
    startDate?: string;
    endDate?: string;
  }>();

  const [expandedActivityId, setExpandedActivityId] = useState<string | null>(
    null
  );
  const [selectedCuisineIds, setSelectedCuisineIds] = useState<string[]>(
    DEFAULT_SELECTED_CUISINE_IDS
  );
  const [selectedDiningStyleIds, setSelectedDiningStyleIds] = useState<
    string[]
  >(DEFAULT_SELECTED_DINING_STYLE_IDS);

  const restaurantsExpanded = expandedActivityId === "restaurants";
  const hasRestaurantSelections =
    selectedCuisineIds.length > 0 || selectedDiningStyleIds.length > 0;
  const showNextCta = restaurantsExpanded && hasRestaurantSelections;

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <PlanProgressHeader
        activeStep={2}
        actionVariant="back"
        onActionPress={() => router.back()}
      />

      <View className="relative flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: insets.bottom + 160,
            gap: 16,
            paddingTop: 8,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="pb-2 text-5xl font-poppins-bold text-[#181c1d] tracking-tighter leading-[48px]">
            What?
          </Text>

          <Pressable
            className="h-[90px] w-full flex-row items-center justify-center gap-1 rounded-[32px] bg-white"
            style={{
              shadowColor: "#44655A",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.04,
              shadowRadius: 20,
              elevation: 2,
            }}
            onPress={() => {
              router.push({
                pathname: "/plan/what-saved",
                params: {
                  destinations:
                    typeof destinations === "string" ? destinations : "",
                  startDate: typeof startDate === "string" ? startDate : "",
                  endDate: typeof endDate === "string" ? endDate : "",
                },
              });
            }}
          >
            <Image
              source={ICON_BOOKMARK}
              style={{ width: 18, height: 22 }}
              contentFit="contain"
            />
            <Text className="text-2xl font-poppins-bold text-forest tracking-tight leading-[30px]">
              Saved
            </Text>
          </Pressable>

          <View className="w-full gap-4">
            {PLAN_ACTIVITIES.map((activity) => {
              const isRestaurants = activity.id === "restaurants";
              const expanded =
                isRestaurants && expandedActivityId === "restaurants";

              return (
                <View key={activity.id} className="w-full gap-4">
                  <PlanActivityRow
                    activity={activity}
                    expanded={expanded}
                    onPress={() => {
                      if (!isRestaurants) {
                        return;
                      }
                      setExpandedActivityId((prev) =>
                        prev === "restaurants" ? null : "restaurants"
                      );
                    }}
                  />
                  {expanded ? (
                    <PlanRestaurantFilters
                      selectedCuisineIds={selectedCuisineIds}
                      selectedDiningStyleIds={selectedDiningStyleIds}
                      onToggleCuisine={(id) =>
                        setSelectedCuisineIds((prev) => toggleId(prev, id))
                      }
                      onToggleDiningStyle={(id) =>
                        setSelectedDiningStyleIds((prev) => toggleId(prev, id))
                      }
                    />
                  ) : null}
                </View>
              );
            })}
          </View>
        </ScrollView>

        <LinearGradient
          colors={[
            "rgba(247,250,251,0)",
            "rgba(247,250,251,0.9)",
            "#f7fafb",
          ]}
          locations={[0, 0.5, 1]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: Math.max(insets.bottom, 12) + 72,
            alignItems: "center",
          }}
          pointerEvents="box-none"
        >
          <Pressable
            className="w-[300px] flex-row items-center justify-center rounded-pill bg-olive py-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.1,
              shadowRadius: 15,
              elevation: 4,
            }}
            onPress={() => {
              router.push({
                pathname: "/plan/how",
                params: {
                  destinations:
                    typeof destinations === "string" ? destinations : "",
                  startDate: typeof startDate === "string" ? startDate : "",
                  endDate: typeof endDate === "string" ? endDate : "",
                  cuisines: selectedCuisineIds.join(","),
                  diningStyles: selectedDiningStyleIds.join(","),
                  mode: showNextCta ? "next" : "surprise",
                },
              });
            }}
          >
            <Text className="text-sm font-poppins-semibold text-white tracking-[0.7px] leading-5">
              {showNextCta ? "Next" : "Surprise Me"}
            </Text>
            <View className="pl-2">
              <Image
                source={showNextCta ? ICON_NEXT : ICON_WAND}
                style={
                  showNextCta
                    ? { width: 16, height: 16 }
                    : { width: 29, height: 21 }
                }
                contentFit="contain"
              />
            </View>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
}
