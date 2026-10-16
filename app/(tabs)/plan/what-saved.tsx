import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  type ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PlanDestinationCard } from "@/components/plan-destination-card";
import { PlanProgressHeader } from "@/components/plan-progress-header";
import {
  SAVED_PLACES,
  filterSavedPlaces,
} from "@/constants/plan-saved-places";

const ICON_BOOKMARK =
  require("../../../assets/images/plan/what/bookmark.svg") as ImageSourcePropType;
const ICON_SEARCH =
  require("../../../assets/images/plan/search.svg") as ImageSourcePropType;

export default function PlanWhatSavedScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { destinations: _destinations } = useLocalSearchParams<{
    destinations?: string;
    startDate?: string;
    endDate?: string;
  }>();
  const [query, setQuery] = useState("");

  const places = filterSavedPlaces(SAVED_PLACES, query);

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <PlanProgressHeader
        activeStep={2}
        actionVariant="back"
        onActionPress={() => router.back()}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 100,
          gap: 16,
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-5xl font-poppins-bold text-[#181c1d] tracking-tighter leading-[48px]">
          What?
        </Text>

        <Pressable
          className="h-[90px] w-full flex-row items-center justify-center gap-1 rounded-[32px] bg-[#edf8f4]"
          style={{
            shadowColor: "#44655A",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.04,
            shadowRadius: 20,
            elevation: 2,
          }}
          onPress={() => router.back()}
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

        <View className="relative w-full">
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search"
            placeholderTextColor="rgba(117,122,96,0.5)"
            className="h-16 w-full rounded-pill bg-white pl-14 pr-6 text-base font-poppins text-[#444932]"
            style={{
              shadowColor: "#44655A",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.06,
              shadowRadius: 30,
              elevation: 2,
            }}
          />
          <View className="absolute bottom-0 left-5 top-0 justify-center">
            <Image
              source={ICON_SEARCH}
              style={{ width: 18, height: 18 }}
              contentFit="contain"
            />
          </View>
        </View>

        <View className="w-full gap-6 pt-2">
          <View className="flex-row items-center gap-2">
            <Image
              source={ICON_BOOKMARK}
              style={{ width: 15, height: 20 }}
              contentFit="contain"
            />
            <Text className="text-sm font-poppins-semibold uppercase tracking-[1.4px] leading-5 text-[#444932]">
              SAVED
            </Text>
          </View>

          <View className="w-full gap-4">
            {places.map((place) => (
              <PlanDestinationCard
                key={place.id}
                destination={place}
                selected={false}
                onPress={() => {
                  // Stub — place detail later
                }}
              />
            ))}
            {places.length === 0 ? (
              <Text className="py-8 text-center text-base font-poppins text-subtitle">
                No saved places match
              </Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
