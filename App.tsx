import "react-native-url-polyfill/auto";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./navigation/AppNavigation";
import { initDatabase } from './database/init'; // Paikallinen tietokanta
import { PaperProvider } from "react-native-paper";

export default function App() {
  const [dbReady, setDbReady] = useState(false);

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
    <PaperProvider>
      <NavigationContainer>
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