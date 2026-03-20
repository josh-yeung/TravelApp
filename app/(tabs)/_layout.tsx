import { Tabs } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const TAB_CONFIG = [
  { name: "index", label: "Explore", icon: "compass" as const },
  { name: "trip-plans", label: "Trip Plans", icon: "calendar" as const },
  { name: "my-trip", label: "My trip", icon: "add" as const },
  { name: "favorites", label: "Favorite", icon: "heart" as const },
  { name: "messages", label: "Message", icon: "mail" as const },
];

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute bottom-0 left-4 right-4 overflow-hidden rounded-pill"
      style={{ marginBottom: Math.max(insets.bottom, 12) }}
    >
      <BlurView intensity={90} tint="dark" className="flex-row items-center justify-around py-2.5 px-2">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const config = TAB_CONFIG[index];
          if (!config) return null;

          const isCenter = index === 2;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (isCenter) {
            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                className="items-center justify-center -mt-5"
              >
                <View className="w-14 h-14 rounded-full bg-primary items-center justify-center shadow-lg">
                  <Ionicons name="add" size={28} color="#FFFFFF" />
                </View>
                <Text className="text-white/70 text-[10px] font-poppins mt-1">
                  {config.label}
                </Text>
              </Pressable>
            );
          }

          return (
            <Pressable key={route.key} onPress={onPress} className="items-center py-1 px-2">
              <Ionicons
                name={
                  isFocused
                    ? (config.icon as keyof typeof Ionicons.glyphMap)
                    : (`${config.icon}-outline` as keyof typeof Ionicons.glyphMap)
                }
                size={22}
                color={isFocused ? "#8DE175" : "rgba(255,255,255,0.5)"}
              />
              <Text
                className={`text-[10px] font-poppins mt-0.5 ${
                  isFocused ? "text-primary" : "text-white/50"
                }`}
              >
                {config.label}
              </Text>
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="trip-plans" />
      <Tabs.Screen name="my-trip" />
      <Tabs.Screen name="favorites" />
      <Tabs.Screen name="messages" />
    </Tabs>
  );
}
