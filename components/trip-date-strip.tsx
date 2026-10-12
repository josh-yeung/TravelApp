import { View, Text, Pressable, ScrollView } from "react-native";

import { weekdayLetter, parseIsoDate } from "@/lib/calendar";

interface TripDateStripProps {
  dates: string[];
  selectedDate: string;
  onSelectDate: (isoDate: string) => void;
}

export function TripDateStrip({
  dates,
  selectedDate,
  onSelectDate,
}: TripDateStripProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 16,
        paddingHorizontal: 20,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      {dates.map((isoDate) => {
        const selected = isoDate === selectedDate;
        const dayNum = parseIsoDate(isoDate).getDate();

        return (
          <Pressable
            key={isoDate}
            onPress={() => onSelectDate(isoDate)}
            className="w-10 items-center gap-2"
          >
            <Text className="text-xs font-poppins-medium text-[#444932] leading-4">
              {weekdayLetter(isoDate)}
            </Text>
            <View
              className={`h-10 w-10 items-center justify-center rounded-full ${
                selected ? "bg-olive" : ""
              }`}
            >
              <Text
                className={`text-sm text-center tracking-[0.7px] leading-5 ${
                  selected
                    ? "font-poppins-semibold text-white"
                    : "font-poppins-semibold text-[#444932]"
                }`}
              >
                {dayNum}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
