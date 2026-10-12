import { View, Text } from "react-native";

import {
  isDateInRange,
  type CalendarDay,
  type CalendarMonth,
} from "@/lib/calendar";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"] as const;

interface TripCalendarMonthProps {
  month: CalendarMonth;
  startDate: string;
  endDate: string;
}

function chunkWeeks(days: CalendarDay[]): CalendarDay[][] {
  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export function TripCalendarMonth({
  month,
  startDate,
  endDate,
}: TripCalendarMonthProps) {
  const weeks = chunkWeeks(month.days);

  return (
    <View className="w-full gap-4">
      <View className="flex-row items-baseline">
        <Text className="text-2xl font-poppins-bold text-[#181c1d] tracking-tight leading-[30px]">
          {month.label}{" "}
        </Text>
        <Text className="text-2xl font-poppins text-[#181c1d] leading-[30px]">
          {month.year}
        </Text>
      </View>

      <View className="w-full flex-row pt-2" style={{ gap: 4 }}>
        {WEEKDAYS.map((label, index) => (
          <View key={`${label}-${index}`} className="flex-1 items-center">
            <Text className="text-sm font-poppins-medium text-[#444932] tracking-[0.7px] leading-5">
              {label}
            </Text>
          </View>
        ))}
      </View>

      <View className="w-full" style={{ gap: 4 }}>
        {weeks.map((week, weekIndex) => (
          <View
            key={`${month.year}-${month.month}-week-${weekIndex}`}
            className="w-full flex-row"
            style={{ gap: 4 }}
          >
            {week.map((cell, dayIndex) => {
              if (cell.day === 0) {
                return (
                  <View
                    key={`empty-${weekIndex}-${dayIndex}`}
                    className="h-12 flex-1"
                  />
                );
              }

              const selected =
                cell.inMonth &&
                isDateInRange(cell.isoDate, startDate, endDate);

              return (
                <View
                  key={cell.isoDate}
                  className={`h-12 flex-1 items-center justify-center rounded-full ${
                    selected ? "bg-olive" : ""
                  }`}
                >
                  <Text
                    className={`text-base text-center leading-6 ${
                      selected
                        ? "font-poppins-semibold text-white"
                        : cell.inMonth
                          ? "font-poppins-semibold text-[#444932]"
                          : "font-poppins text-[#444932]"
                    }`}
                  >
                    {cell.day}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}
