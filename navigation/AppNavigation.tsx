import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from "react-native";
import type { RootStackParamList } from "./types";
import TabNavigation from "./TabNavigation";
import { useAuth } from "../hooks/useAuth";
import ProfileScreen from "../screens/ProfileScreen";
import Auth from '../screens/Auth';
import SessionScreen from '../screens/session/SessionScreen';


/*
  Navigaatioreitit, jotka eivät ole bottom tabseissa. Esim profiili, kirjautumissivu, yms.
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

  /*
    Jos kirjautunut sisään, reitteinä on tabsit ja profiili.
    Ei kirjautuneena pelkkä login sivu.
  */
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {claims ? (
        <>
          <Stack.Screen name="Tabs" component={TabNavigation} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="TrainingSession" component={SessionScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Auth} />
      )} 
    </Stack.Navigator>
  );
}
