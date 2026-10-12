import { View, Text, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

import type { TripSpot } from "@/constants/trip-itineraries";

const ICON_PIN = require("../assets/images/trip-day/pin.svg") as ImageSourcePropType;
const ICON_CAR = require("../assets/images/trip-day/car.svg") as ImageSourcePropType;
const ICON_CHEVRON = require("../assets/images/trip-day/chevron.svg") as ImageSourcePropType;
const ICON_BOOK = require("../assets/images/trip-day/book.svg") as ImageSourcePropType;
const ICON_NAVIGATE = require("../assets/images/trip-day/navigate.svg") as ImageSourcePropType;

interface TripSpotCardProps {
  spot: TripSpot;
  index: number;
  isLast: boolean;
}

export function TripSpotCard({ spot, index, isLast }: TripSpotCardProps) {
  const nameLines = spot.name.split("\n");

  return (
    <View className="w-full flex-row gap-2.5">
      <View className="w-11 items-center">
        <View className="mt-2 h-11 w-11 items-center justify-center rounded-full border-2 border-[#d4ff00]">
          <Text className="text-base font-poppins-bold text-olive leading-6">
            {index + 1}
          </Text>
        </View>
        {!isLast ? (
          <View className="my-2 w-0.5 flex-1 border-l-2 border-dashed border-[#c5c9ac]" />
        ) : null}
      </View>

      <View className="flex-1 gap-4 pb-6">
        <View
          className="flex-row items-start gap-4 rounded-[32px] border border-white/50 bg-white/70 p-[13px]"
          style={{
            shadowColor: "#44655A",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.04,
            shadowRadius: 20,
            elevation: 2,
          }}
        >
          <Image
            source={spot.image}
            style={{ width: 96, height: 96, borderRadius: 24 }}
            contentFit="cover"
          />
          <View className="flex-1 justify-center gap-2 self-stretch">
            <View>
              {nameLines.map((line) => (
                <Text
                  key={line}
                  className="text-2xl font-poppins-bold text-[#181c1d] tracking-tight leading-[30px]"
                >
                  {line}
                </Text>
              ))}
            </View>
            <View className="flex-row items-center gap-1.5 self-start rounded-pill bg-forest px-2.5 py-1">
              <Image
                source={ICON_PIN}
                style={{ width: 9, height: 12 }}
                contentFit="contain"
              />
              <Text className="text-xs font-poppins-medium text-lime-accent leading-4">
                {spot.category}
              </Text>
            </View>
          </View>
        </View>

        <View className="w-full flex-row items-center justify-between pl-2">
          <View className="flex-row items-center gap-3 rounded-pill border border-[#c5c9ac] bg-white px-[17px] py-[9px]">
            <Image
              source={ICON_CAR}
              style={{ width: 18, height: 16 }}
              contentFit="contain"
            />
            <Text className="text-sm font-poppins-semibold text-[#181c1d] tracking-[0.7px] leading-5">
              {spot.transitLabel}
            </Text>
            <Image
              source={ICON_CHEVRON}
              style={{ width: 7, height: 13 }}
              contentFit="contain"
            />
          </View>
          <View className="flex-row items-start gap-2">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#c4e8d9]">
              <Image
                source={ICON_BOOK}
                style={{ width: 18, height: 13 }}
                contentFit="contain"
              />
            </View>
            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#d4ff00]">
              <Image
                source={ICON_NAVIGATE}
                style={{ width: 15, height: 15 }}
                contentFit="contain"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
