declare module "*.svg" {
  import type { ImageSourcePropType } from "react-native";
  const content: ImageSourcePropType;
  export default content;
}

declare module "*.json" {
  const value: unknown;
  export default value;
}
