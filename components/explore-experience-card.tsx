import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

import type { ExploreCityExperience } from "@/constants/explore-city";

interface ExploreExperienceCardProps {
  experience: ExploreCityExperience;
  onPress?: () => void;
  onFavoritePress?: () => void;
}

/**
 * Full-width Popular experience card for the Explore City screen.
 * Photo + bottom gradient, rating, title, category pill, neighborhood, frosted heart.
 */
export function ExploreExperienceCard({
  experience,
  onPress,
  onFavoritePress,
}: ExploreExperienceCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="h-[288px] w-full overflow-hidden rounded-[32px]"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 4,
      }}
    >
      <Image
        source={experience.image}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        contentFit="cover"
      />

      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
        locations={[0, 0.5, 1]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <Pressable
        onPress={onFavoritePress}
        hitSlop={8}
        className="absolute right-4 top-4 h-10 w-10 items-center justify-center overflow-hidden rounded-full"
      >
        <BlurView
          intensity={40}
          tint="light"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <View className="absolute inset-0 bg-white/60" />
        <Ionicons name="heart-outline" size={20} color="#181C1D" />
      </Pressable>

      <View className="absolute bottom-0 left-0 gap-1 p-4">
        <View className="flex-row items-center gap-1">
          <Ionicons name="star" size={15} color="#F5C518" />
          <Text
            className="text-base font-poppins text-white leading-6"
            style={{ includeFontPadding: false }}
          >
            {experience.ratingLabel}
          </Text>
        </View>

        <Text
          className="text-[22px] font-poppins-bold text-white tracking-tight leading-7"
          style={{ includeFontPadding: false }}
        >
          {experience.name}
        </Text>

        <View className="flex-row items-center gap-2 pt-1">
          <View className="overflow-hidden rounded-pill border border-white/20 px-[13px] py-[5px]">
            <BlurView
              intensity={40}
              tint="dark"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
            <View className="absolute inset-0 bg-[#caf300]/20" />
            <Text
              className="text-base font-poppins text-white leading-6"
              style={{ includeFontPadding: false }}
            >
              {experience.category}
            </Text>
          </View>
          <Text
            className="text-base font-poppins text-white/80 leading-6"
            style={{ includeFontPadding: false }}
          >
            {experience.neighborhood}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
