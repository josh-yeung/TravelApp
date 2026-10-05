import { Tabs } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { ComponentProps } from "react";

type TabBarProps = NonNullable<ComponentProps<typeof Tabs>["tabBar"]> extends (
  props: infer P
) => unknown
  ? P
  : never;

interface TabItem {
  name: string;
  label: string;
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
}

const TAB_CONFIG: TabItem[] = [
  {
    name: "index",
    label: "Explore",
    activeIcon: "compass",
    inactiveIcon: "compass-outline",
  },
  {
    name: "plan",
    label: "Plan",
    activeIcon: "add-circle",
    inactiveIcon: "add-circle-outline",
  },
  {
    name: "my-trip",
    label: "Trips",
    activeIcon: "briefcase",
    inactiveIcon: "briefcase-outline",
  },
];

function CustomTabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute bottom-0 left-6 right-6"
      style={{ marginBottom: Math.max(insets.bottom, 12) }}
    >
      <View
        className="flex-row items-center justify-center rounded-pill border border-black bg-white/75 px-8 py-1"
        style={{
          gap: 28,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const config = TAB_CONFIG[index];
          if (!config) return null;

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

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className={`items-center justify-center rounded-pill px-5 py-2 ${
                isFocused ? "bg-forest" : ""
              }`}
              style={
                isFocused
                  ? {
                      shadowColor: "#536600",
                      shadowOffset: { width: 0, height: 10 },
                      shadowOpacity: 0.2,
                      shadowRadius: 8,
                      elevation: 4,
                    }
                  : undefined
              }
            >
              <Ionicons
                name={isFocused ? config.activeIcon : config.inactiveIcon}
                size={20}
                color={isFocused ? "#000000" : "rgba(0,0,0,0.7)"}
              />
              <Text
                className={`mt-0.5 text-xs font-poppins-medium ${
                  isFocused ? "text-black" : "text-black/70"
                }`}
              >
                {config.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="my-trip"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="plan" />
      <Tabs.Screen name="my-trip" />
    </Tabs>
  );
}
