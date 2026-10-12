import { type ReactNode } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  type ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ProfileWorldMap } from "@/components/profile-world-map";
import { MOCK_PROFILE } from "@/constants/profile";
import { TOTAL_COUNTRIES_IN_CATALOG } from "@/lib/countries-catalog";
import { useVisitedCountries } from "@/lib/visited-countries";

const ICON_BACK = require("../assets/images/profile/back.svg") as ImageSourcePropType;
const ICON_SHARE = require("../assets/images/profile/share.svg") as ImageSourcePropType;
const ICON_PLUS = require("../assets/images/profile/plus.svg") as ImageSourcePropType;
const ICON_AVATAR = require("../assets/images/profile/avatar.svg") as ImageSourcePropType;
const ICON_TRIPS = require("../assets/images/profile/trips.svg") as ImageSourcePropType;
const ICON_SAVED = require("../assets/images/profile/saved.svg") as ImageSourcePropType;
const ICON_SETTINGS = require("../assets/images/profile/settings.svg") as ImageSourcePropType;
const ICON_EDIT = require("../assets/images/profile/edit-profile.svg") as ImageSourcePropType;
const ICON_CHEVRON = require("../assets/images/profile/chevron.svg") as ImageSourcePropType;

function CircleIconButton({
  icon,
  iconSize,
  onPress,
}: {
  icon: ImageSourcePropType;
  iconSize: number;
  onPress?: () => void;
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
      <Image
        source={icon}
        style={{ width: iconSize, height: iconSize }}
        contentFit="contain"
      />
    </Pressable>
  );
}

function MetricCard({ children }: { children: ReactNode }) {
  return (
    <View
      className="flex-1 rounded-[24px] border border-[rgba(229,239,233,0.8)] bg-white p-[17px]"
      style={{
        shadowColor: "#1B3026",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.06,
        shadowRadius: 15,
        elevation: 2,
      }}
    >
      {children}
    </View>
  );
}

function ActionRow({
  icon,
  label,
}: {
  icon: ImageSourcePropType;
  label: string;
}) {
  return (
    <Pressable
      className="h-14 w-full flex-row items-center justify-between rounded-2xl border border-[rgba(229,239,233,0.9)] bg-white px-[21px]"
      style={{
        shadowColor: "#1B3026",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 1,
      }}
    >
      <View className="flex-row items-center gap-3.5">
        <View className="h-9 w-9 items-center justify-center rounded-xl bg-[#eef9f4]">
          <Image
            source={icon}
            style={{ width: 20, height: 20 }}
            contentFit="contain"
          />
        </View>
        <Text className="text-sm font-poppins-bold tracking-tight text-[#12221b]">
          {label}
        </Text>
      </View>
      <Image
        source={ICON_CHEVRON}
        style={{ width: 16, height: 16 }}
        contentFit="contain"
      />
    </Pressable>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const visitedCountries = useVisitedCountries();
  const visitedCount = visitedCountries.length;
  const worldPercent =
    Math.round((visitedCount / TOTAL_COUNTRIES_IN_CATALOG) * 1000) / 10;

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="px-8 pb-2 pt-1.5">
        <View className="flex-row items-center justify-between">
          <CircleIconButton
            icon={ICON_BACK}
            iconSize={16}
            onPress={() => router.back()}
          />
          <Text className="text-base font-poppins-bold tracking-tight text-[#12221b]">
            Profile
          </Text>
          <CircleIconButton icon={ICON_SHARE} iconSize={20} />
        </View>
        <View className="mt-1.5 flex-row justify-end">
          <CircleIconButton
            icon={ICON_PLUS}
            iconSize={20}
            onPress={() => router.push("/add-countries")}
          />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: insets.bottom + 32,
          alignItems: "center",
          gap: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-[376px] px-3">
          <ProfileWorldMap height={200} />
        </View>

        <View className="w-full max-w-[376px] flex-row gap-3 px-5 py-2">
          <MetricCard>
            <View className="pt-2">
              <View className="flex-row items-baseline gap-1">
                <Text className="text-2xl font-poppins-bold tracking-tight text-[#12221b]">
                  {visitedCount}
                </Text>
                <Text className="text-sm font-poppins-semibold text-[#9ca3af]">
                  / {TOTAL_COUNTRIES_IN_CATALOG}
                </Text>
              </View>
              <Text className="mt-0.5 text-xs font-poppins-semibold text-[#1b3026]">
                Countries visited
              </Text>
              <Text className="text-[10px] font-poppins-medium leading-[15px] text-[#6b7280]">
                {MOCK_PROFILE.continentsLogged} continents visited
              </Text>
            </View>
          </MetricCard>

          <MetricCard>
            <View className="gap-0.5 pt-2">
              <Text className="text-2xl font-poppins-bold tracking-tight text-[#12221b]">
                {worldPercent}%
              </Text>
              <Text className="pb-1 text-xs font-poppins-semibold text-[#1b3026]">
                of the world
              </Text>
              <View className="h-1.5 w-full overflow-hidden rounded-pill bg-[#e5efe9]">
                <View
                  className="h-full rounded-pill bg-forest"
                  style={{ width: `${worldPercent}%` }}
                />
              </View>
            </View>
          </MetricCard>
        </View>

        <View className="w-full max-w-[376px] px-5 py-2.5">
          <View
            className="w-full gap-3.5 rounded-[24px] border border-[rgba(229,239,233,0.9)] bg-white p-[17px]"
            style={{
              shadowColor: "#1B3026",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.06,
              shadowRadius: 15,
              elevation: 2,
            }}
          >
            <View className="flex-row items-center gap-3.5">
              <View
                className="h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#f3f4f6]"
                style={{
                  shadowColor: "rgba(52,94,74,0.2)",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  elevation: 3,
                }}
              >
                <Image
                  source={ICON_AVATAR}
                  style={{ width: 40, height: 40 }}
                  contentFit="contain"
                />
              </View>
              <View className="flex-1 gap-0.5">
                <View className="flex-row items-center gap-1.5">
                  <Text className="text-lg font-poppins-bold text-[#12221b]">
                    {MOCK_PROFILE.name}
                  </Text>
                  <Text className="text-base font-poppins-semibold text-[#12221b]">
                    , {MOCK_PROFILE.age}
                  </Text>
                </View>
                <Text className="text-xs font-poppins-semibold text-[#233f33]">
                  {MOCK_PROFILE.country}  {MOCK_PROFILE.countryFlag}
                </Text>
              </View>
            </View>

            <View className="h-px w-full bg-[#f3f4f6]" />

            <View className="flex-row items-center">
              <View className="flex-1 flex-row items-center justify-center gap-1.5 px-2 py-1">
                <Image
                  source={ICON_TRIPS}
                  style={{ width: 16, height: 16 }}
                  contentFit="contain"
                />
                <Text className="text-base font-poppins-bold tracking-tight text-[#12221b]">
                  {MOCK_PROFILE.tripsCount}
                </Text>
                <Text className="text-xs font-poppins-bold tracking-tight text-[#233f33]">
                  trips
                </Text>
              </View>
              <View className="h-full w-px self-stretch bg-[#f3f4f6]" />
              <View className="flex-1 flex-row items-center justify-center gap-1.5 px-2 py-1">
                <Image
                  source={ICON_SAVED}
                  style={{ width: 16, height: 16 }}
                  contentFit="contain"
                />
                <Text className="text-base font-poppins-bold tracking-tight text-[#12221b]">
                  {MOCK_PROFILE.savedCount}
                </Text>
                <Text className="text-xs font-poppins-bold tracking-tight text-[#233f33]">
                  saved
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="w-full max-w-[376px] gap-2.5 px-5 pt-2">
          <ActionRow icon={ICON_SETTINGS} label="Settings" />
          <ActionRow icon={ICON_EDIT} label="Edit profile" />
        </View>
      </ScrollView>
    </View>
  );
}
