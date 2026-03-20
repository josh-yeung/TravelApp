import { Stack, usePathname } from "expo-router";
import { TripProvider } from "@/lib/trip-context";
import { ProgressBar } from "@/components/progress-bar";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const WIZARD_STEPS = ["destination", "dates", "budget", "vibes", "review"];
const TOTAL_STEPS = 4;

export default function WizardLayout() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const currentSegment = pathname.split("/").pop() ?? "";
  const stepIndex = WIZARD_STEPS.indexOf(currentSegment);
  const currentStep = stepIndex >= 0 ? Math.min(stepIndex + 1, TOTAL_STEPS) : 1;

  return (
    <TripProvider>
      <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      </View>
    </TripProvider>
  );
}
