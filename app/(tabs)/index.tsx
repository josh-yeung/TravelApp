import { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Pressable,
  type ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { ExploreSection } from "@/components/explore-section";
import {
  EXPLORE_SECTIONS,
  type ExploreSectionData,
} from "@/constants/explore-destinations";

const ICON_SEARCH =
  require("../../assets/images/explore/search.svg") as ImageSourcePropType;

function filterSections(
  sections: ExploreSectionData[],
  query: string
): ExploreSectionData[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return sections;
  }

  return sections
    .map((section) => ({
      ...section,
      destinations: section.destinations.filter(
        (destination) =>
          destination.name.toLowerCase().includes(normalized) ||
          (destination.region?.toLowerCase().includes(normalized) ?? false) ||
          section.title.toLowerCase().includes(normalized)
      ),
    }))
    .filter((section) => section.destinations.length > 0);
}

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const sections = filterSections(EXPLORE_SECTIONS, query);

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120, gap: 48, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row items-center justify-between px-[11px] pb-4 pt-[7px]">
          <Pressable className="h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white">
            <Ionicons name="bookmark-outline" size={20} color="#181C1D" />
          </Pressable>
          <Pressable
            onPress={() => router.push("/profile")}
            className="h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white"
          >
            <Ionicons name="person-outline" size={20} color="#181C1D" />
          </Pressable>
        </View>

        <View className="w-full items-center px-[26px]">
          <View className="relative w-full">
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search Destination"
              placeholderTextColor="#536600"
              className="h-14 w-full rounded-pill bg-white pl-14 pr-6 text-base font-poppins text-[#536600]"
              style={{
                shadowColor: "#44655A",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.04,
                shadowRadius: 20,
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
        </View>

        {sections.map((section) => (
          <ExploreSection key={section.id} section={section} />
        ))}
      </ScrollView>
    </View>
  );
}
