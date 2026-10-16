import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  type ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PlanDestinationPager } from "@/components/plan-destination-pager";
import { PlanProgressHeader } from "@/components/plan-progress-header";
import {
  TRENDING_DESTINATIONS,
  SAVED_DESTINATIONS,
  filterDestinations,
} from "@/constants/plan-destinations";

const ICON_SEARCH =
  require("../../assets/images/plan/search.svg") as ImageSourcePropType;
const ICON_NEXT =
  require("../../assets/images/plan/next-arrow.svg") as ImageSourcePropType;

export default function PlanScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [listPage, setListPage] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const trending = filterDestinations(TRENDING_DESTINATIONS, query);
  const saved = filterDestinations(SAVED_DESTINATIONS, query);
  const selectedCount = selectedIds.length;

  const toggleDestination = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <PlanProgressHeader
        activeStep={0}
        onClose={() => router.replace("/")}
      />

      <View className="relative flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: insets.bottom + (selectedCount > 0 ? 160 : 100),
            gap: 24,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full gap-4">
            <Text className="text-5xl font-poppins-bold text-[#181c1d] tracking-tighter leading-[48px]">
              Where?
            </Text>

            <View className="relative w-full">
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search destinations"
                placeholderTextColor="rgba(117,122,96,0.5)"
                className="h-16 w-full rounded-pill bg-white pl-14 pr-6 text-base font-poppins text-[#444932]"
                style={{
                  shadowColor: "#44655A",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.06,
                  shadowRadius: 30,
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

          <PlanDestinationPager
            trending={trending}
            saved={saved}
            selectedIds={selectedIds}
            pageIndex={listPage}
            onPageChange={setListPage}
            onToggleDestination={toggleDestination}
          />
        </ScrollView>

        {selectedCount > 0 ? (
          <LinearGradient
            colors={[
              "rgba(247,250,251,0)",
              "rgba(247,250,251,0.9)",
              "#f7fafb",
            ]}
            locations={[0, 0.5, 1]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: Math.max(insets.bottom, 12) + 72,
              alignItems: "center",
            }}
            pointerEvents="box-none"
          >
            <Pressable
              className="w-[300px] flex-row items-center justify-center rounded-pill bg-olive py-5"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.1,
                shadowRadius: 15,
                elevation: 4,
              }}
              onPress={() => {
                // Stub until WHEN step exists
              }}
            >
              <Text className="text-sm font-poppins-semibold text-white tracking-[0.7px] leading-5">
                {selectedCount} Selected
              </Text>
              <View className="pl-2">
                <Image
                  source={ICON_NEXT}
                  style={{ width: 16, height: 16 }}
                  contentFit="contain"
                />
              </View>
            </Pressable>
          </LinearGradient>
        ) : null}
      </View>
    </View>
  );
}
