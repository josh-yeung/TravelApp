import { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  type ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SavedCollectionCard } from "@/components/saved-collection-card";
import { SavedFilterChips } from "@/components/saved-filter-chips";
import { SavedSpotCard } from "@/components/saved-spot-card";
import {
  SAVED_COLLECTIONS,
  SAVED_COLLECTIONS_TOTAL,
  SAVED_FILTER_CHIPS,
  SAVED_SPOTS,
  filterSavedSpots,
  type SavedSpot,
} from "@/constants/saved-places";

const ICON_BACK =
  require("../assets/images/profile/back.svg") as ImageSourcePropType;
const ICON_SHARE =
  require("../assets/images/profile/share.svg") as ImageSourcePropType;
const ICON_COLLECTIONS =
  require("../assets/images/saved/collections.svg") as ImageSourcePropType;
const ICON_PLUS =
  require("../assets/images/saved/plus.svg") as ImageSourcePropType;
const ICON_SEARCH =
  require("../assets/images/saved/search.svg") as ImageSourcePropType;
const ICON_FILTER =
  require("../assets/images/saved/filter.svg") as ImageSourcePropType;
const ICON_BOOKMARKED_SPOTS =
  require("../assets/images/saved/bookmarked-spots.svg") as ImageSourcePropType;
const ICON_CHEVRON_DOWN =
  require("../assets/images/saved/chevron-down.svg") as ImageSourcePropType;

/** Horizontal page inset (Figma: 350px content on a 402px frame). */
const PAGE_INSET = 26;

function CircleIconButton({
  icon,
  iconSize,
  onPress,
}: {
  icon: ImageSourcePropType;
  iconSize: number;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="h-12 w-12 items-center justify-center rounded-full border border-[#c5c9ac] bg-white/90"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      <Image
        source={icon}
        style={{ width: iconSize, height: iconSize }}
        contentFit="contain"
      />
    </Pressable>
  );
}

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [selectedChipId, setSelectedChipId] = useState(
    SAVED_FILTER_CHIPS[0]?.id ?? "all"
  );
  const [spots, setSpots] = useState<SavedSpot[]>(SAVED_SPOTS);

  const visibleSpots = useMemo(
    () => filterSavedSpots(spots, selectedChipId, query),
    [spots, selectedChipId, query]
  );

  const removeSpot = (spotId: string) => {
    setSpots((current) => current.filter((spot) => spot.id !== spotId));
  };

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-8 pb-4 pt-[7px]">
        <CircleIconButton
          icon={ICON_BACK}
          iconSize={16}
          onPress={() => router.back()}
        />
        <Text
          className="text-base font-poppins-bold tracking-tight text-[#12221b] leading-6"
          style={{ includeFontPadding: false }}
        >
          Bookmarks
        </Text>
        <CircleIconButton icon={ICON_SHARE} iconSize={20} />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="flex-row items-start gap-1 pb-4"
          style={{ paddingHorizontal: PAGE_INSET }}
        >
          <Text
            className="flex-1 pt-1 text-[28px] font-poppins-bold text-[#181c1d] leading-[34px]"
            style={{ letterSpacing: -0.7, includeFontPadding: false }}
          >
            Saved Places
          </Text>
          <View className="rounded-pill bg-[#e6e9ea] px-2.5 py-1">
            <Text
              className="text-xs font-poppins-semibold text-forest leading-4"
              style={{ includeFontPadding: false }}
            >
              {SAVED_COLLECTIONS_TOTAL} Collections
            </Text>
          </View>
        </View>

        <View className="gap-3 pb-6">
          <View
            className="flex-row items-center justify-between"
            style={{ paddingHorizontal: PAGE_INSET }}
          >
            <View className="flex-row items-center gap-2">
              <Image
                source={ICON_COLLECTIONS}
                style={{ width: 16.667, height: 13.333 }}
                contentFit="contain"
              />
              <Text
                className="text-2xl font-poppins-bold text-[#181c1d] tracking-tight leading-[30px]"
                style={{ includeFontPadding: false }}
              >
                Collections
              </Text>
            </View>
            <Pressable
              className="flex-row items-center gap-1 rounded-pill bg-[#d4ff00] px-3 py-1.5"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 1,
                elevation: 1,
              }}
            >
              <Image
                source={ICON_PLUS}
                style={{ width: 9.333, height: 9.333 }}
                contentFit="contain"
              />
              <Text
                className="text-xs font-poppins-bold text-[#171e00] leading-4"
                style={{ includeFontPadding: false }}
              >
                New Collection
              </Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 12,
              paddingHorizontal: PAGE_INSET,
              paddingBottom: 8,
            }}
          >
            {SAVED_COLLECTIONS.map((collection) => (
              <SavedCollectionCard key={collection.id} collection={collection} />
            ))}
          </ScrollView>
        </View>

        <View className="pb-2.5" style={{ paddingHorizontal: PAGE_INSET }}>
          <View className="relative w-full">
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search saved spots"
              placeholderTextColor="#757a60"
              className="h-12 w-full rounded-pill bg-[#f1f4f5] pl-11 pr-11 text-base font-poppins text-[#444932]"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
              }}
            />
            <View className="absolute bottom-0 left-4 top-0 justify-center">
              <Image
                source={ICON_SEARCH}
                style={{ width: 15, height: 15 }}
                contentFit="contain"
              />
            </View>
            <Pressable
              hitSlop={8}
              className="absolute bottom-0 right-3 top-0 justify-center"
            >
              <Image
                source={ICON_FILTER}
                style={{ width: 15, height: 15 }}
                contentFit="contain"
              />
            </Pressable>
          </View>
        </View>

        <View className="pb-4">
          <SavedFilterChips
            chips={SAVED_FILTER_CHIPS}
            selectedId={selectedChipId}
            onSelect={setSelectedChipId}
            horizontalPadding={PAGE_INSET}
          />
        </View>

        <View className="gap-4" style={{ paddingHorizontal: PAGE_INSET }}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Image
                source={ICON_BOOKMARKED_SPOTS}
                style={{ width: 13.333, height: 16.667 }}
                contentFit="contain"
              />
              <Text
                className="text-2xl font-poppins-bold text-[#181c1d] tracking-tight leading-[30px]"
                style={{ includeFontPadding: false }}
              >
                Bookmarked Spots
              </Text>
            </View>
            <Pressable hitSlop={8} className="flex-row items-center gap-1">
              <Text
                className="text-xs font-poppins-medium text-[#444932] leading-4"
                style={{ includeFontPadding: false }}
              >
                Sort:
              </Text>
              <Text
                className="text-xs font-poppins-semibold text-forest leading-4"
                style={{ includeFontPadding: false }}
              >
                Recent
              </Text>
              <Image
                source={ICON_CHEVRON_DOWN}
                style={{ width: 8, height: 4.933 }}
                contentFit="contain"
              />
            </Pressable>
          </View>

          {visibleSpots.length === 0 ? (
            <Text
              className="py-8 text-center text-sm font-poppins text-[#757a60]"
              style={{ includeFontPadding: false }}
            >
              No saved spots match your filters.
            </Text>
          ) : (
            visibleSpots.map((spot) => (
              <SavedSpotCard
                key={spot.id}
                spot={spot}
                onToggleBookmark={() => removeSpot(spot.id)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
