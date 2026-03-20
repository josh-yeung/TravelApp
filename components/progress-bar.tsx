import { View } from "react-native";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <View className="flex-row gap-2 px-6 py-3">
      {Array.from({ length: totalSteps }, (_, i) => (
        <View
          key={i}
          className={`h-1 flex-1 rounded-pill ${
            i < currentStep ? "bg-primary" : "bg-surface"
          }`}
        />
      ))}
    </View>
  );
}
