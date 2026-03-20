import { View, type ViewProps } from "react-native";
import { BlurView } from "expo-blur";

interface GlassBarProps extends ViewProps {
  intensity?: number;
}

export function GlassBar({ children, intensity = 80, className, ...props }: GlassBarProps) {
  return (
    <View
      className={`absolute bottom-6 left-4 right-4 overflow-hidden rounded-pill ${className ?? ""}`}
      {...props}
    >
      <BlurView intensity={intensity} tint="dark" className="flex-row items-center px-6 py-4">
        {children}
      </BlurView>
    </View>
  );
}
