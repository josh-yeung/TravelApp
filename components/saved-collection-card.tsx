import { View, Text, Pressable, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import type { SavedCollection } from "@/constants/saved-places";

const ICON_BOOKMARK =
  require("../assets/images/saved/bookmark-lime.svg") as ImageSourcePropType;

interface SavedCollectionCardProps {
  collection: SavedCollection;
  onPress?: () => void;
}

/**
 * 176x224 collection tile for the Saved Places carousel.
 * Cover photo + deep-green gradient, lime "N spots" pill, lime bookmark, title + subtitle.
 */
export function SavedCollectionCard({
  collection,
  onPress,
}: SavedCollectionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="h-[224px] w-[176px] overflow-hidden rounded-2xl bg-forest"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      <Image
        source={collection.image}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        contentFit="cover"
      />

      <LinearGradient
        colors={["rgba(0,32,24,0)", "rgba(0,32,24,0.4)", "#002018"]}
        locations={[0, 0.5, 1]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <View className="absolute bottom-0 left-0 right-0 h-[110px] px-3.5">
        <View className="flex-row items-center justify-between pt-3.5">
          <View className="rounded-pill bg-[#d4ff00] px-2 py-0.5">
            <Text
              className="text-xs font-poppins-bold text-[#171e00] leading-4"
              style={{ includeFontPadding: false }}
            >
              {collection.spotCount} spots
            </Text>
          </View>
          <Image
            source={ICON_BOOKMARK}
            style={{ width: 10.5, height: 13.5 }}
            contentFit="contain"
          />
        </View>

        <Text
          className="mt-[7px] text-sm font-poppins-bold text-white"
          style={{ letterSpacing: 0.7, lineHeight: 19.25, includeFontPadding: false }}
        >
          {collection.title}
        </Text>

        <Text
          className="absolute left-3.5 top-[80px] text-xs font-poppins-medium text-[#c6eadc] leading-4 opacity-90"
          style={{ includeFontPadding: false }}
        >
          {collection.subtitle}
        </Text>
      </View>
    </Pressable>
  );
}
