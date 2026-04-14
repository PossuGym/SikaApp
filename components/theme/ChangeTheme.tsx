import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { customLightTheme, customDarkTheme } from '../../services/themeService';

export default function App() {
const colorScheme = useColorScheme();
const theme = colorScheme === 'dark' ? customDarkTheme : customLightTheme;
}