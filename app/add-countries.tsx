import { useMemo, useState, type ReactNode } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Switch,
  type ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  COUNTRIES_CATALOG,
  type CountryCatalogItem,
} from "@/lib/countries-catalog";
import { getVisited, setVisited } from "@/lib/visited-countries";

const ICON_BACK = require("../assets/images/profile/back.svg") as ImageSourcePropType;

function CircleIconButton({
  onPress,
  children,
}: {
  onPress: () => void;
  children: ReactNode;
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
      {children}
    </Pressable>
  );
}

export default function AddCountriesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const initialVisited = useMemo(() => new Set(getVisited()), []);
  const [draft, setDraft] = useState(() => new Set(getVisited()));
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return COUNTRIES_CATALOG;
    }
    return COUNTRIES_CATALOG.filter((country) =>
      country.name.toLowerCase().includes(q),
    );
  }, [query]);

  function toggleCountry(iso: string, nextValue: boolean): void {
    setDraft((prev) => {
      const next = new Set(prev);
      if (nextValue) {
        next.add(iso);
      } else {
        next.delete(iso);
      }
      return next;
    });
  }

  function handleSave(): void {
    setVisited([...draft]);
    router.back();
  }

  function renderItem({ item }: { item: CountryCatalogItem }) {
    const selected = draft.has(item.iso);
    const wasPreviouslyVisited = initialVisited.has(item.iso);

    return (
      <View
        className={`flex-row items-center gap-3 border-b border-[#f3f4f6] px-5 py-3.5 ${
          wasPreviouslyVisited ? "opacity-50" : "opacity-100"
        }`}
      >
        <Text className="text-2xl">{item.flag}</Text>
        <Text
          className={`flex-1 text-base font-poppins-semibold ${
            wasPreviouslyVisited ? "text-[#6b7280]" : "text-[#12221b]"
          }`}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Switch
          value={selected}
          onValueChange={(value) => toggleCountry(item.iso, value)}
          trackColor={{ false: "#E5E7EB", true: "#44655A" }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#E5E7EB"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-5 pb-3 pt-1.5">
        <CircleIconButton onPress={() => router.back()}>
          <Image
            source={ICON_BACK}
            style={{ width: 16, height: 16 }}
            contentFit="contain"
          />
        </CircleIconButton>
        <Text className="text-base font-poppins-bold tracking-tight text-[#12221b]">
          Add countries
        </Text>
        <CircleIconButton onPress={() => router.back()}>
          <Ionicons name="close" size={22} color="#536600" />
        </CircleIconButton>
      </View>

      <View className="px-5 pb-3">
        <View className="flex-row items-center gap-2 rounded-pill border border-black/5 bg-[#E6E9EA] px-4 py-3">
          <Ionicons name="search" size={18} color="#8E8E93" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search countries"
            placeholderTextColor="#8E8E93"
            className="flex-1 text-base font-poppins text-[#12221b]"
            autoCorrect={false}
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.iso}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Text className="text-base font-poppins text-subtitle">
              No countries found
            </Text>
          </View>
        }
      />

      <View
        className="absolute bottom-0 left-0 right-0 px-5"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <Pressable
          onPress={handleSave}
          className="w-full flex-row items-center justify-center rounded-pill bg-white py-5"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Text className="text-lg font-poppins-bold text-black">Save</Text>
        </Pressable>
      </View>
    </View>
  );
}
