import { MD3DarkTheme, MD3LightTheme, MD3Theme } from "react-native-paper";
import { Colors } from "../components/theme/Colors";

const customDarkTheme = {
  ...MD3DarkTheme,
  colors: Colors.dark,
} as const;

const customLightTheme = {
  ...MD3LightTheme,
  colors: Colors.light,
} as const;

export {
  customDarkTheme,
  customLightTheme
};

