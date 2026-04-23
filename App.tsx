import "react-native-url-polyfill/auto";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme
} from "@react-navigation/native";
import AppNavigation from "./navigation/AppNavigation";
import { initDatabase } from './database/init';
import { PaperProvider } from "react-native-paper";
import { customDarkTheme, customLightTheme } from "./services/themeService";
import { useThemeStore } from "./store/useThemeStore";
import { useAuth } from "./hooks/useAuth";
import { StatusBar } from "react-native";
import { useWorkout } from "./store/useWorkoutStore";

export default function App() {
  const [dbReady, setDbReady] = useState(false);
  const { claims } = useAuth();
  const isDark = useThemeStore((state) => state.isDark);
  const theme = isDark ? customDarkTheme : customLightTheme;

  const navigationTheme = {
    dark: isDark,
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.onSurface,
      border: theme.colors.outline,
      notification: theme.colors.error,
    },
    fonts: NavigationDefaultTheme.fonts,
  };

  // Paikallisen tietokannan alustus
  useEffect(() => {
    async function setupDB() {
      try {
        await initDatabase();
        setDbReady(true);
      } catch (error) {
        console.error("Paikallisen tietokannan alustus ei onnistunut:", error);
        setDbReady(true); 
      }
    }
    setupDB();
  }, []);

  // Zustandin store ladataan kirjautumisen yhteydessä
  useEffect(() => {
    if (!dbReady) return;
    if (claims) {
      useWorkout.getState().loadWorkouts();
    }
  }, [claims, dbReady])

  // Näytetään latausindikaattori, kunnes tietokanta on ladattu
  if (!dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} translucent />
      <NavigationContainer theme={navigationTheme}>
        <AppNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}