import { View, Text, Pressable, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

import type { SavedSpot } from "@/constants/saved-places";

const ICON_BOOKMARK =
  require("../assets/images/saved/bookmark-card.svg") as ImageSourcePropType;
const ICON_STAR =
  require("../assets/images/saved/star.svg") as ImageSourcePropType;
const ICON_MAP_PIN =
  require("../assets/images/saved/map-pin.svg") as ImageSourcePropType;
const ICON_ARROW =
  require("../assets/images/saved/arrow-right.svg") as ImageSourcePropType;

const FILL = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as const;

interface SavedSpotCardProps {
  spot: SavedSpot;
  onPress?: () => void;
  onToggleBookmark?: () => void;
  onViewDetails?: () => void;
}

/**
 * Full-width feed card for Bookmarked Spots.
 * 208px photo with bottom gradient, frosted category pill, frosted forest bookmark
 * (remove) button, frosted rating pill; white body with title, location, View Details.
 */
export function SavedSpotCard({
  spot,
  onPress,
  onToggleBookmark,
  onViewDetails,
}: SavedSpotCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full overflow-hidden rounded-2xl bg-white"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      <View className="h-[208px] w-full overflow-hidden">
        <Image source={spot.image} style={FILL} contentFit="cover" />

        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0.6)"]}
          locations={[0, 0.5, 1]}
          style={FILL}
        />

        <View className="absolute left-3 top-3 overflow-hidden rounded-pill px-2.5 py-1">
          <BlurView intensity={30} tint="dark" style={FILL} />
          <View className="absolute inset-0 bg-[#44655a]/80" />
          <Text
            className="text-xs font-poppins-medium text-white leading-4"
            style={{ includeFontPadding: false }}
          >
            {spot.category}
          </Text>
        </View>

        <Pressable
          onPress={onToggleBookmark}
          hitSlop={8}
          className="absolute right-3 top-3 h-10 w-10 items-center justify-center overflow-hidden rounded-full"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 3,
          }}
        >
          <BlurView intensity={30} tint="dark" style={FILL} />
          <View className="absolute inset-0 bg-[#44655a]/85" />
          <Image
            source={ICON_BOOKMARK}
            style={{ width: 11.667, height: 15 }}
            contentFit="contain"
          />
        </Pressable>

        <View className="absolute bottom-3 left-3 flex-row items-center gap-1.5 overflow-hidden rounded-pill px-2.5 py-1">
          <BlurView intensity={30} tint="dark" style={FILL} />
          <View className="absolute inset-0 bg-black/40" />
          <Image
            source={ICON_STAR}
            style={{ width: 12.5, height: 11.875 }}
            contentFit="contain"
          />
          <Text
            className="text-xs font-poppins-bold text-white leading-4"
            style={{ includeFontPadding: false }}
          >
            {spot.rating}
          </Text>
          <Text
            className="text-xs font-poppins-medium text-white/80 leading-4"
            style={{ includeFontPadding: false }}
          >
            {spot.reviewCountLabel}
          </Text>
        </View>
      </View>

      <View className="w-full flex-row items-start justify-between p-4">
        <View className="flex-1 gap-0.5 pr-3">
          <Text
            className="text-2xl font-poppins-bold text-[#181c1d] tracking-tight leading-[30px]"
            style={{ includeFontPadding: false }}
          >
            {spot.name}
          </Text>
          <View className="flex-row items-center gap-1">
            <Image
              source={ICON_MAP_PIN}
              style={{ width: 9.333, height: 11.667 }}
              contentFit="contain"
            />
            <Text
              className="text-xs font-poppins-medium text-[#444932] leading-4"
              style={{ includeFontPadding: false }}
            >
              {spot.location}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={onViewDetails}
          hitSlop={8}
          className="flex-row items-center gap-1 self-stretch"
        >
          <Text
            className="text-sm font-poppins-bold text-forest leading-5"
            style={{ letterSpacing: 0.7, includeFontPadding: false }}
          >
            View Details
          </Text>
          <Image
            source={ICON_ARROW}
            style={{ width: 10.667, height: 10.667 }}
            contentFit="contain"
          />
        </Pressable>
      </View>
    </Pressable>
  );
}
