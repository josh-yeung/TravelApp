import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  type ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";

const ICON_WHERE = require("../assets/images/bookings/stays/where.svg") as ImageSourcePropType;
const ICON_WHEN = require("../assets/images/bookings/stays/when.svg") as ImageSourcePropType;
const ICON_WHO = require("../assets/images/bookings/stays/who.svg") as ImageSourcePropType;
const ICON_SEARCH = require("../assets/images/bookings/stays/search.svg") as ImageSourcePropType;
const ICON_CHEVRON = require("../assets/images/bookings/stays/chevron.svg") as ImageSourcePropType;
const LOGO_EXPEDIA = require("../assets/images/bookings/stays/expedia.png") as ImageSourcePropType;
const LOGO_TRIPADVISOR = require("../assets/images/bookings/stays/tripadvisor.svg") as ImageSourcePropType;
const LOGO_AIRBNB = require("../assets/images/bookings/stays/airbnb.svg") as ImageSourcePropType;

interface DealProvider {
  id: string;
  name: string;
  logo: ImageSourcePropType;
  logoSize: number;
}

const DEAL_PROVIDERS: DealProvider[] = [
  { id: "expedia", name: "Expedia", logo: LOGO_EXPEDIA, logoSize: 32 },
  { id: "tripadvisor", name: "Tripadvisor", logo: LOGO_TRIPADVISOR, logoSize: 32 },
  { id: "airbnb", name: "Airbnb", logo: LOGO_AIRBNB, logoSize: 32 },
];

function SearchField({
  icon,
  iconWidth,
  iconHeight,
  placeholder,
  value,
  onChangeText,
}: {
  icon: ImageSourcePropType;
  iconWidth: number;
  iconHeight: number;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <View className="relative w-full">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#444932"
        className="h-14 w-full rounded-pill bg-white pl-12 pr-4 text-base font-poppins-medium text-[#444932]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        }}
      />
      <View className="absolute bottom-0 left-4 top-0 justify-center">
        <Image
          source={icon}
          style={{ width: iconWidth, height: iconHeight }}
          contentFit="contain"
        />
      </View>
    </View>
  );
}

/**
 * Stays search card from Figma 106:344 — Where/When/Who, Search CTA, deal providers.
 */
export function BookingStaysSearchCard() {
  const [where, setWhere] = useState("");
  const [when, setWhen] = useState("");
  const [who, setWho] = useState("");

  return (
    <View
      className="w-full gap-4 rounded-[48px] border border-white/40 bg-white/70 p-[17px]"
      style={{
        shadowColor: "#44655A",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.04,
        shadowRadius: 20,
        elevation: 2,
      }}
    >
      <View className="w-full gap-3">
        <SearchField
          icon={ICON_WHERE}
          iconWidth={16}
          iconHeight={20}
          placeholder="Where?"
          value={where}
          onChangeText={setWhere}
        />
        <SearchField
          icon={ICON_WHEN}
          iconWidth={18}
          iconHeight={20}
          placeholder="When?"
          value={when}
          onChangeText={setWhen}
        />
        <SearchField
          icon={ICON_WHO}
          iconWidth={16}
          iconHeight={16}
          placeholder="Who?"
          value={who}
          onChangeText={setWho}
        />
      </View>

      <Pressable
        className="h-14 w-full flex-row items-center justify-center gap-2 rounded-pill bg-[#d4ff00]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }}
      >
        <Image
          source={ICON_SEARCH}
          style={{ width: 18, height: 18 }}
          contentFit="contain"
        />
        <Text className="text-base font-poppins-bold text-[#5f7400] leading-6">
          Search
        </Text>
      </Pressable>

      <View className="w-full gap-3 border-t border-[rgba(68,101,90,0.1)] pt-[17px]">
        <Text className="text-xs font-poppins-medium tracking-[1.2px] leading-4 text-[rgba(68,101,90,0.6)]">
          Deals From
        </Text>
        <View className="w-full gap-3">
          {DEAL_PROVIDERS.map((provider) => (
            <Pressable
              key={provider.id}
              className="w-full flex-row items-center justify-between rounded-[32px] bg-white/50 p-3"
            >
              <View className="flex-row items-center gap-3">
                <Image
                  source={provider.logo}
                  style={{
                    width: provider.logoSize,
                    height: provider.logoSize,
                    borderRadius: 100,
                  }}
                  contentFit="cover"
                />
                <Text className="text-base font-poppins text-[#181c1d] leading-6">
                  {provider.name}
                </Text>
              </View>
              <Image
                source={ICON_CHEVRON}
                style={{ width: 7.4, height: 12 }}
                contentFit="contain"
              />
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}
