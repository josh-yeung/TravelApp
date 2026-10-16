import { View, Text, Pressable } from "react-native";

import {
  isDateInRange,
  type CalendarDay,
  type CalendarMonth,
} from "@/lib/calendar";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"] as const;

interface PlanWhenCalendarProps {
  months: CalendarMonth[];
  /** Inclusive range start (ISO). Empty string if unset. */
  rangeStart: string;
  /** Inclusive range end (ISO). Empty string if unset. */
  rangeEnd: string;
  onSelectDate: (isoDate: string) => void;
}

function chunkWeeks(days: CalendarDay[]): CalendarDay[][] {
  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

function isSelected(
  isoDate: string,
  rangeStart: string,
  rangeEnd: string
): boolean {
  if (!rangeStart) {
    return false;
  }
  if (!rangeEnd) {
    return isoDate === rangeStart;
  }
  return isDateInRange(isoDate, rangeStart, rangeEnd);
}

function MonthBlock({
  month,
  rangeStart,
  rangeEnd,
  onSelectDate,
}: {
  month: CalendarMonth;
  rangeStart: string;
  rangeEnd: string;
  onSelectDate: (isoDate: string) => void;
}) {
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
              if (cell.day === 0 || !cell.inMonth) {
                return (
                  <View
                    key={`empty-${weekIndex}-${dayIndex}`}
                    className="h-12 flex-1"
                  />
                );
              }

              const selected = isSelected(cell.isoDate, rangeStart, rangeEnd);

              return (
                <Pressable
                  key={cell.isoDate}
                  onPress={() => onSelectDate(cell.isoDate)}
                  style={{
                    flex: 1,
                    height: 48,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: selected ? "#536600" : "transparent",
                    }}
                  >
                    <Text
                      className={`text-base text-center leading-6 font-poppins-semibold ${
                        selected ? "text-white" : "text-[#444932]"
                      }`}
                    >
                      {cell.day}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

/**
 * Scrollable months for Plan When — tap to build an inclusive date range.
 */
export function PlanWhenCalendar({
  months,
  rangeStart,
  rangeEnd,
  onSelectDate,
}: PlanWhenCalendarProps) {
  return (
    <View className="w-full gap-12">
      {months.map((month) => (
        <MonthBlock
          key={`${month.year}-${month.month}`}
          month={month}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onSelectDate={onSelectDate}
        />
      ))}
    </View>
  );
}
