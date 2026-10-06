import { View, Text, Pressable, Image, type ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TripCardProps {
  title: string;
  dateRange: string;
  image: ImageSourcePropType;
  onPress?: () => void;
  onMenuPress?: () => void;
}

export function TripCard({
  title,
  dateRange,
  image,
  onPress,
  onMenuPress,
}: TripCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full flex-row items-center gap-4 rounded-[32px] border border-white/50 bg-white/70 p-[13px]"
      style={{
        shadowColor: "#44655A",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.04,
        shadowRadius: 20,
        elevation: 2,
      }}
    >
      <Image
        source={image}
        className="h-24 w-24 rounded-[24px]"
        resizeMode="cover"
      />
      <View className="flex-1 justify-center gap-1">
        <View className="w-full flex-row items-start justify-between">
          <Text className="text-2xl font-poppins-bold text-heading tracking-tight">
            {title}
          </Text>
          <Pressable
            onPress={onMenuPress}
            hitSlop={12}
            className="items-center justify-center pt-0.5"
          >
            <Ionicons name="ellipsis-vertical" size={16} color="#181C1D" />
          </Pressable>
        </View>
        <View className="flex-row items-center gap-1.5 self-start rounded-pill bg-forest px-2.5 py-1">
          <Ionicons name="calendar" size={12} color="#B0D500" />
          <Text className="text-xs font-poppins-medium text-lime-accent">
            {dateRange}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
