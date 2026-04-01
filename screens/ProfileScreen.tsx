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

  return (
    <View style={{ padding: 16, gap: 12, }}>
      <SafeAreaView>
        <ProfileSetHeightAndWeight />
        <ProfileAccountDetails />
        <ProfileMacroGoal />
        <ProfileStepGoal />
      </SafeAreaView>
    </View>
  );
}