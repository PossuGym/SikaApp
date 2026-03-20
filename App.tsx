import "react-native-url-polyfill/auto";
import { useEffect, useState } from "react";
import type { JwtPayload } from "@supabase/supabase-js";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./navigation/TabNavigation";

import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import { Homepage } from "./screens/HomePage";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [claims, setClaims] = useState<JwtPayload | null>(null);

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

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
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