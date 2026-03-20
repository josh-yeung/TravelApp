import { Pressable, Text } from "react-native";

interface ChipProps {
  label: string;
  selected?: boolean;
  icon?: string;
  onPress?: () => void;
}

export function Chip({ label, selected = false, icon, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center px-4 py-2.5 rounded-pill border ${
        selected
          ? "bg-white border-heading"
          : "bg-surface border-transparent"
      }`}
    >
      {icon ? <Text className="mr-1.5 text-base">{icon}</Text> : null}
      <Text
        className={`font-poppins-medium text-sm ${
          selected ? "text-heading" : "text-subtitle"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
