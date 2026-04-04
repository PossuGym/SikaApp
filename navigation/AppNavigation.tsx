import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from "react-native";
import type { RootStackParamList } from "./types";
import TabNavigation from "./TabNavigation";
import { useAuth } from "../hooks/useAuth";
import Auth from '../screens/Auth';

/*
  Kirjautumisen ja rekisteröinnin navigaatiologiikka.
  Ennen kirjautumista näytetään Auth.tsx screen.
*/
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  const { claims, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {claims ? (
        <Stack.Screen name="Tabs" component={TabNavigation} />
      ) : (
        <Stack.Screen name="Login" component={Auth} />
      )}
    </Stack.Navigator>
  );
}
