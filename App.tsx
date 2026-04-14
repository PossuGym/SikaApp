import "react-native-url-polyfill/auto";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import AppNavigation from "./navigation/AppNavigation";
import { initDatabase } from './database/init'; // Paikallinen tietokanta
import { PaperProvider } from "react-native-paper";
import { customDarkTheme, customLightTheme } from "./services/themeService";
import { useThemeStore } from "./store/useThemeStore";

export default function App() {
  const [dbReady, setDbReady] = useState(false);
  const isDark = useThemeStore((state) => state.isDark);
  const paperTheme = isDark ? customDarkTheme : customLightTheme;
  const baseNavigationTheme = isDark ? NavigationDarkTheme : NavigationDefaultTheme;
  const navigationTheme = {
    ...baseNavigationTheme,
    colors: {
      ...baseNavigationTheme.colors,
      background: paperTheme.colors.elevation.level1,
      card: paperTheme.colors.elevation.level1,
      text: paperTheme.colors.onSurface,
      border: paperTheme.colors.outlineVariant,
      primary: paperTheme.colors.primary,
      notification: paperTheme.colors.error,
    },
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

  // Näytetään latausindikaattori, kunnes tietokanta on ladattu
  // Muuten muu koodi saattaa yrittää hakea dataa liian aikaisin.
  if (!dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navigationTheme}>
        <AppNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}


/*
<Stack.Navigator screenOptions={{ headerShown: false }}>
  {claims ? (
    <Stack.Screen name="Home" component={Homepage} />
  ) : (
    <Stack.Screen name="Login" component={Auth} />
  )}
</Stack.Navigator>

*/