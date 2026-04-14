import { MD3DarkTheme, MD3LightTheme, MD3Theme } from "react-native-paper";
import { Colors } from "../components/theme/Colors";
const customDarkTheme: MD3Theme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme: MD3Theme = { ...MD3LightTheme, colors: Colors.light };
export {
customDarkTheme,
customLightTheme
};

