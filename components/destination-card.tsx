import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

interface DestinationCardProps {
  title: string;
  location: string;
  rating: number;
  imageUrl: string;
  onPress?: () => void;
  size?: "small" | "large";
}

export function DestinationCard({
  title,
  location,
  rating,
  imageUrl,
  onPress,
  size = "small",
}: DestinationCardProps) {
  const isLarge = size === "large";

  return (
    <Pressable
      onPress={onPress}
      className={`overflow-hidden rounded-card ${
        isLarge ? "w-64 h-72" : "w-40 h-52"
      }`}
    >
      <Image
        source={{ uri: imageUrl }}
        className="absolute inset-0"
        contentFit="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        className="absolute inset-0"
      />
      <View className="absolute bottom-0 left-0 right-0 p-3">
        <Text
          className={`text-white font-poppins-semibold ${
            isLarge ? "text-lg" : "text-sm"
          }`}
          numberOfLines={1}
        >
          {title}
        </Text>
        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-white/70 font-poppins text-xs" numberOfLines={1}>
            {location}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-yellow-400 text-xs mr-0.5">★</Text>
            <Text className="text-white font-poppins-medium text-xs">
              {rating.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
