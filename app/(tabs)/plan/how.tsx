import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  type ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PlanBudgetCard } from "@/components/plan-budget-card";
import { PlanDailyPacingCard } from "@/components/plan-daily-pacing-card";
import { PlanHowOptionChip } from "@/components/plan-how-option-chip";
import { PlanProgressHeader } from "@/components/plan-progress-header";
import {
  ACCOMMODATION_OPTIONS,
  BUDGET_TIERS,
  DEFAULT_BUDGET,
  DEFAULT_BUDGET_TIER_ID,
  DEFAULT_PACING_ID,
  DEFAULT_SELECTED_ACCOMMODATION_IDS,
  DEFAULT_SELECTED_TRANSIT_IDS,
  DEFAULT_SPOTS_PER_DAY,
  DEFAULT_STARTING_LOCATION,
  PACING_SPOTS,
  TRANSIT_OPTIONS,
} from "@/constants/plan-how-options";

const ICON_GPS =
  require("../../../assets/images/plan/how/gps.svg") as ImageSourcePropType;
const ICON_HOUSE =
  require("../../../assets/images/plan/how/house.svg") as ImageSourcePropType;
function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}

function tierIdForBudget(amount: number): string | null {
  const match = BUDGET_TIERS.find((tier) => tier.amount === amount);
  return match ? match.id : null;
}

export default function PlanHowScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [startingLocation, setStartingLocation] = useState(
    DEFAULT_STARTING_LOCATION
  );
  const [selectedTransitIds, setSelectedTransitIds] = useState<string[]>(
    DEFAULT_SELECTED_TRANSIT_IDS
  );
  const [selectedAccommodationIds, setSelectedAccommodationIds] = useState<
    string[]
  >(DEFAULT_SELECTED_ACCOMMODATION_IDS);
  const [budget, setBudget] = useState(DEFAULT_BUDGET);
  const [selectedBudgetTierId, setSelectedBudgetTierId] = useState<
    string | null
  >(DEFAULT_BUDGET_TIER_ID);
  const [spotsPerDay, setSpotsPerDay] = useState(DEFAULT_SPOTS_PER_DAY);
  const [selectedPacingId, setSelectedPacingId] = useState(DEFAULT_PACING_ID);

  const hasStartingLocation = startingLocation.trim().length > 0;
  const hasTransit = selectedTransitIds.length > 0;
  const hasAccommodation = selectedAccommodationIds.length > 0;
  const hasPacing = selectedPacingId.length > 0;
  const showNextCta =
    hasStartingLocation &&
    hasTransit &&
    hasAccommodation &&
    hasPacing &&
    budget >= 0;

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <PlanProgressHeader
        activeStep={3}
        actionVariant="back"
        onActionPress={() => router.back()}
      />

      <View className="relative flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + (showNextCta ? 160 : 40),
          gap: 12,
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="pb-2 text-5xl font-poppins-bold text-[#181c1d] tracking-tighter leading-[48px]">
          How?
        </Text>

        <View className="w-full gap-2 pt-4">
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-xs font-poppins-bold uppercase tracking-[0.6px] text-[#44655a] leading-4">
              Starting Location
            </Text>
            <Pressable
              className="flex-row items-center gap-1"
              onPress={() => {
                // Stub — geolocation later
              }}
            >
              <Image
                source={ICON_GPS}
                style={{ width: 14.6, height: 14.6 }}
                contentFit="contain"
              />
              <Text className="text-xs font-poppins-semibold text-[#44655a] leading-4">
                Use Current Location
              </Text>
            </Pressable>
          </View>

          <View
            className="w-full flex-row items-center gap-3 rounded-pill bg-white p-[14px]"
            style={{
              shadowColor: "#44655A",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.04,
              shadowRadius: 10,
              elevation: 2,
            }}
          >
            <View className="h-10 w-10 items-center justify-center rounded-full bg-[rgba(196,232,217,0.4)]">
              <Image
                source={ICON_HOUSE}
                style={{ width: 18.75, height: 19.5 }}
                contentFit="contain"
              />
            </View>
            <TextInput
              value={startingLocation}
              onChangeText={setStartingLocation}
              className="min-w-0 flex-1 text-sm font-poppins text-[#181c1d] leading-5"
              placeholder="City, Country"
              placeholderTextColor="#444932"
            />
          </View>
        </View>

        <View className="w-full gap-1.5 pt-4">
          <Text className="text-xs font-poppins-bold uppercase tracking-[0.6px] text-[#44655a] leading-4">
            Transit Preferences
          </Text>
          <Text className="text-xs font-poppins text-[#444932] leading-4">
            Select travel modes
          </Text>
          <View className="w-full flex-row flex-wrap justify-between gap-y-3 px-3 pt-1.5">
            {TRANSIT_OPTIONS.map((option) => (
              <View key={option.id} style={{ width: "48%" }}>
                <PlanHowOptionChip
                  label={option.label}
                  icon={option.icon}
                  iconWidth={option.iconWidth}
                  iconHeight={option.iconHeight}
                  selected={selectedTransitIds.includes(option.id)}
                  onPress={() =>
                    setSelectedTransitIds((prev) => toggleId(prev, option.id))
                  }
                />
              </View>
            ))}
          </View>
        </View>

        <View className="w-full gap-1.5 pt-4">
          <Text className="text-xs font-poppins-bold uppercase tracking-[0.6px] text-[#44655a] leading-4">
            Accommodation Preferences
          </Text>
          <Text className="text-xs font-poppins text-[#444932] leading-4">
            Select lodging styles
          </Text>
          <View className="w-full flex-row flex-wrap justify-between gap-y-3 px-3 pt-1.5">
            {ACCOMMODATION_OPTIONS.map((option) => (
              <View key={option.id} style={{ width: "48%" }}>
                <PlanHowOptionChip
                  label={option.label}
                  icon={option.icon}
                  iconWidth={option.iconWidth}
                  iconHeight={option.iconHeight}
                  selected={selectedAccommodationIds.includes(option.id)}
                  onPress={() =>
                    setSelectedAccommodationIds((prev) =>
                      toggleId(prev, option.id)
                    )
                  }
                />
              </View>
            ))}
          </View>
        </View>

        <PlanBudgetCard
          budget={budget}
          selectedTierId={selectedBudgetTierId}
          onBudgetChange={(amount) => {
            setBudget(amount);
            setSelectedBudgetTierId(tierIdForBudget(amount));
          }}
          onTierPress={(tierId, amount) => {
            setBudget(amount);
            setSelectedBudgetTierId(tierId);
          }}
        />

        <PlanDailyPacingCard
          spotsPerDay={spotsPerDay}
          selectedPacingId={selectedPacingId}
          onSpotsChange={setSpotsPerDay}
          onPacingPress={(pacingId) => {
            setSelectedPacingId(pacingId);
            const spots = PACING_SPOTS[pacingId];
            if (typeof spots === "number") {
              setSpotsPerDay(spots);
            }
          }}
        />
      </ScrollView>

      {showNextCta ? (
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
              // Stub — itinerary generation later
            }}
          >
            <Text className="text-sm font-poppins-semibold text-white tracking-[0.7px] leading-5">
              Plan
            </Text>
            <View className="pl-2">
              <Ionicons name="pencil" size={16} color="#ffffff" />
            </View>
          </Pressable>
        </LinearGradient>
      ) : null}
      </View>
    </View>
  );
}
