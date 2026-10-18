import { View, Text, Pressable } from "react-native";
import Slider from "@react-native-community/slider";

import {
  BUDGET_MAX,
  BUDGET_MIN,
  BUDGET_STEP,
  BUDGET_TIERS,
} from "@/constants/plan-how-options";

interface PlanBudgetCardProps {
  budget: number;
  selectedTierId: string | null;
  onBudgetChange: (amount: number) => void;
  onTierPress: (tierId: string, amount: number) => void;
}

function formatBudget(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

/**
 * Trip budget card — estimated total, forest slider, tier pills.
 */
export function PlanBudgetCard({
  budget,
  selectedTierId,
  onBudgetChange,
  onTierPress,
}: PlanBudgetCardProps) {
  return (
    <View className="w-full gap-1.5 pt-4">
      <Text className="text-xs font-poppins-bold uppercase tracking-[0.6px] text-[#44655a] leading-4">
        Trip Budget
      </Text>

      <View
        className="w-full gap-1 rounded-2xl border border-[rgba(197,201,172,0.3)] bg-white px-[17px] pb-[17px] pt-[33px]"
        style={{
          shadowColor: "#44655A",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.04,
          shadowRadius: 10,
          elevation: 2,
        }}
      >
        <Text className="text-xs font-poppins-bold uppercase tracking-[0.6px] text-[#44655a] leading-4">
          Estimated Total
        </Text>

        <View className="min-h-[71px] flex-row items-baseline gap-1 pt-1">
          <Text className="text-5xl font-poppins-bold text-[#44655a] tracking-tighter leading-[48px]">
            {formatBudget(budget)}
          </Text>
          <Text className="text-xs font-poppins-bold text-[#757a60] leading-4">
            CAD
          </Text>
        </View>

        <View className="w-full pt-4 pb-2">
          <Slider
            style={{ width: "100%", height: 32 }}
            minimumValue={BUDGET_MIN}
            maximumValue={BUDGET_MAX}
            step={BUDGET_STEP}
            value={budget}
            onValueChange={onBudgetChange}
            minimumTrackTintColor="#44655a"
            maximumTrackTintColor="#ebeeef"
            thumbTintColor="#ffffff"
          />
        </View>

        <View className="w-full flex-row items-center justify-between">
          <Text className="text-xs font-poppins-semibold text-[#757a60] leading-4">
            $500
          </Text>
          <Text className="text-xs font-poppins-semibold text-[#757a60] leading-4">
            $2,500
          </Text>
          <Text className="text-xs font-poppins-semibold text-[#757a60] leading-4">
            $5,000+
          </Text>
        </View>

        <View className="w-full flex-row gap-1.5 pt-5">
          {BUDGET_TIERS.map((tier) => {
            const selected = selectedTierId === tier.id;
            return (
              <Pressable
                key={tier.id}
                onPress={() => onTierPress(tier.id, tier.amount)}
                className={`h-11 flex-1 items-center justify-center rounded-[48px] px-2 ${
                  selected ? "bg-[#44655a]" : "bg-[#f1f4f5]"
                }`}
              >
                <Text
                  className={`text-center text-xs leading-4 ${
                    selected
                      ? "font-poppins-bold text-white"
                      : "font-poppins-semibold text-[#181c1d]"
                  }`}
                >
                  {tier.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}
