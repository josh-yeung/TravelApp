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

import { PlanActivityRow } from "@/components/plan-activity-row";
import { PlanProgressHeader } from "@/components/plan-progress-header";
import { PLAN_ACTIVITIES } from "@/constants/plan-activities";

const ICON_BOOKMARK =
  require("../../../assets/images/plan/what/bookmark.svg") as ImageSourcePropType;
const ICON_WAND =
  require("../../../assets/images/plan/what/wand.svg") as ImageSourcePropType;

export default function PlanWhatScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { destinations, startDate, endDate } = useLocalSearchParams<{
    destinations?: string;
    startDate?: string;
    endDate?: string;
  }>();

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <PlanProgressHeader
        activeStep={2}
        actionVariant="back"
        onActionPress={() => router.back()}
      />

      <View className="relative flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: insets.bottom + 160,
            gap: 16,
            paddingTop: 8,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="pb-2 text-5xl font-poppins-bold text-[#181c1d] tracking-tighter leading-[48px]">
            What?
          </Text>

          <Pressable
            className="h-[90px] w-full flex-row items-center justify-center gap-1 rounded-[32px] bg-white"
            style={{
              shadowColor: "#44655A",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.04,
              shadowRadius: 20,
              elevation: 2,
            }}
            onPress={() => {
              router.push({
                pathname: "/plan/what-saved",
                params: {
                  destinations:
                    typeof destinations === "string" ? destinations : "",
                  startDate: typeof startDate === "string" ? startDate : "",
                  endDate: typeof endDate === "string" ? endDate : "",
                },
              });
            }}
          >
            <Image
              source={ICON_BOOKMARK}
              style={{ width: 18, height: 22 }}
              contentFit="contain"
            />
            <Text className="text-2xl font-poppins-bold text-forest tracking-tight leading-[30px]">
              Saved
            </Text>
          </Pressable>

          <View className="w-full gap-4">
            {PLAN_ACTIVITIES.map((activity) => (
              <PlanActivityRow
                key={activity.id}
                activity={activity}
                onPress={() => {
                  // Stub — category detail later
                }}
              />
            ))}
          </View>
        </ScrollView>

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
              // Stub until HOW step exists
            }}
          >
            <Text className="text-sm font-poppins-semibold text-white tracking-[0.7px] leading-5">
              Surprise Me
            </Text>
            <View className="pl-2">
              <Image
                source={ICON_WAND}
                style={{ width: 29, height: 21 }}
                contentFit="contain"
              />
            </View>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
}
