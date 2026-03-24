import "react-native-url-polyfill/auto";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import type { JwtPayload } from "@supabase/supabase-js";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./navigation/TabNavigation";

import { supabase } from "./lib/supabase";
import { initDatabase } from './database/init'; // Paikallinen tietokanta
import { PaperProvider } from "react-native-paper";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [claims, setClaims] = useState<JwtPayload | null>(null);
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

  // Supabase logiikka
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getClaims();
      setClaims(data?.claims ?? null);
    };

    load();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      load();
    });

    return () => subscription.unsubscribe();
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
        <TabNavigator />
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