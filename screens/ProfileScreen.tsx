import * as React from "react";
import { View, Alert } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from "../lib/supabase";
import ProfileSetHeightAndWeight from "../components/profile/ProfileSetHeightAndWeight";
import ProfileAccountDetails from "../components/profile/ProfileAccountDetails";
import ProfileMacroGoal from "../components/profile/ProfileMacroGoal";
import ProfileStepGoal from "../components/profile/ProfileStepGoal";

export default function ProfileScreen() {
  const [loading, setLoading] = React.useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert("Sign out failed", error.message);
    setLoading(false);
  };

  return (
    <View style={{ padding: 16, gap: 12, }}>
      <SafeAreaView>
        <ProfileSetHeightAndWeight />
        <ProfileAccountDetails />
        <ProfileMacroGoal />
        <ProfileStepGoal />
        <Button mode="outlined" onPress={handleSignOut} loading={loading} disabled={loading}>
          Sign out
        </Button>
      </SafeAreaView>
    </View>
  );
}