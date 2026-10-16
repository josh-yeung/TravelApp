import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  type ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PlanProgressHeader } from "@/components/plan-progress-header";
import { PlanWhenCalendar } from "@/components/plan-when-calendar";
import { formatPlanDateRange, monthsFrom } from "@/lib/calendar";

const ICON_NEXT =
  require("../../../assets/images/plan/next-arrow.svg") as ImageSourcePropType;

/** Figma mock starts at April 2026; show 12 months. */
const PLAN_MONTHS = monthsFrom(2026, 3, 12);

export default function PlanWhenScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { destinations } = useLocalSearchParams<{
    destinations?: string;
  }>();

  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");

  const rangeComplete = rangeStart.length > 0 && rangeEnd.length > 0;

  const handleSelectDate = (isoDate: string) => {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(isoDate);
      setRangeEnd("");
      return;
    }

    if (isoDate < rangeStart) {
      setRangeEnd(rangeStart);
      setRangeStart(isoDate);
      return;
    }

    setRangeEnd(isoDate);
  };

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <PlanProgressHeader
        activeStep={1}
        actionVariant="back"
        onActionPress={() => router.back()}
      />

      <View className="relative flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: insets.bottom + (rangeComplete ? 160 : 100),
            gap: 24,
            paddingTop: 8,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-5xl font-poppins-bold text-[#181c1d] tracking-tighter leading-[48px]">
            When?
          </Text>

          <PlanWhenCalendar
            months={PLAN_MONTHS}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onSelectDate={handleSelectDate}
          />
        </ScrollView>

        {rangeComplete ? (
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
                router.push({
                  pathname: "/plan/what",
                  params: {
                    destinations:
                      typeof destinations === "string" ? destinations : "",
                    startDate: rangeStart,
                    endDate: rangeEnd,
                  },
                });
              }}
            >
              <Text className="text-sm font-poppins-semibold text-white tracking-[0.7px] leading-5">
                {formatPlanDateRange(rangeStart, rangeEnd)}
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
