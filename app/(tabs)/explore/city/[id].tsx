import { useEffect, useMemo, useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";

import { ExploreCategoryChips } from "@/components/explore-category-chips";
import { ExploreExperienceCard } from "@/components/explore-experience-card";
import { getExploreCityById } from "@/constants/explore-city";

const ICON_SEARCH =
  require("../../../../assets/images/explore/search.svg") as ImageSourcePropType;
const ICON_BACK =
  require("../../../../assets/images/bookings/back.svg") as ImageSourcePropType;

export default function ExploreCityScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const city = typeof id === "string" ? getExploreCityById(id) : undefined;

  const [query, setQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    city?.categories[0]?.id ?? "popular"
  );

  useEffect(() => {
    if (!city) {
      router.back();
    }
  }, [city, router]);

  const filteredExperiences = useMemo(() => {
    if (!city) {
      return [];
    }
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return city.experiences;
    }
    return city.experiences.filter(
      (experience) =>
        experience.name.toLowerCase().includes(normalized) ||
        experience.category.toLowerCase().includes(normalized) ||
        experience.neighborhood.toLowerCase().includes(normalized)
    );
  }, [city, query]);

  if (!city) {
    return null;
  }

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 128, gap: 24, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row items-center justify-between px-[11px] pb-4 pt-[7px]">
          <Pressable
            onPress={() => router.back()}
            className="h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/75"
          >
            <Image
              source={ICON_BACK}
              style={{ width: 16, height: 16 }}
              contentFit="contain"
            />
          </Pressable>
          <Pressable
            onPress={() => router.push("/profile")}
            className="h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/75"
          >
            <Ionicons name="person-outline" size={20} color="#181C1D" />
          </Pressable>
        </View>

        <View className="w-full gap-6 px-5">
          <View className="w-full gap-1">
            <Text
              className="text-[28px] font-poppins-bold text-[#181c1d] tracking-tight leading-[34px]"
              style={{ includeFontPadding: false }}
            >
              {city.name}
            </Text>
            <Text
              className="text-base font-poppins text-[#444932] leading-6"
              style={{ includeFontPadding: false }}
            >
              {city.tagline}
            </Text>
          </View>

          <View className="relative w-full">
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search experiences"
              placeholderTextColor="#536600"
              className="h-14 w-full rounded-pill bg-[#f1f4f5] pl-12 pr-4 text-base font-poppins text-[#536600]"
            />
            <View className="absolute bottom-0 left-4 top-0 justify-center">
              <Image
                source={ICON_SEARCH}
                style={{ width: 18, height: 18 }}
                contentFit="contain"
              />
            </View>
          </View>

          <View className="w-full gap-2">
            <View className="w-full flex-row items-center justify-between">
              <Text
                className="text-[22px] font-poppins-bold text-[#181c1d] tracking-tight leading-7"
                style={{ includeFontPadding: false }}
              >
                Categories
              </Text>
              <Pressable hitSlop={8}>
                <Text
                  className="text-base font-poppins text-olive leading-6"
                  style={{ includeFontPadding: false }}
                >
                  View all
                </Text>
              </Pressable>
            </View>

            <ExploreCategoryChips
              categories={city.categories}
              selectedId={selectedCategoryId}
              onSelect={setSelectedCategoryId}
            />
          </View>

          <View className="w-full gap-2">
            <Text
              className="text-[22px] font-poppins-bold text-[#181c1d] tracking-tight leading-7"
              style={{ includeFontPadding: false }}
            >
              Popular
            </Text>

            <View className="w-full gap-4">
              {filteredExperiences.map((experience) => (
                <ExploreExperienceCard
                  key={experience.id}
                  experience={experience}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
