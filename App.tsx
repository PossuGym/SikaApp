import "react-native-url-polyfill/auto";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import { Homepage } from "./components/HomePage";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
    };

    load();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          <Stack.Screen name="Home" component={Homepage} />
        ) : (
          <Stack.Screen name="Login" component={Auth} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}