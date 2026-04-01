import * as React from "react";
import { View, Alert, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from "../lib/supabase";
import ProfileSetHeightAndWeight from "../components/profile/ProfileSetHeightAndWeight";
import ProfileAccountDetails from "../components/profile/ProfileAccountDetails";
import ProfileMacroGoal from "../components/profile/ProfileMacroGoal";
import {ProfileStepGoal} from "../components/profile/ProfileStepGoal";

export default function ProfileScreen() {

  return (
      <SafeAreaView style={{ padding: 16, gap: 12, }}>
      <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled"  keyboardDismissMode="on-drag">
        <ProfileSetHeightAndWeight />
        <ProfileAccountDetails />
        <ProfileMacroGoal />
        <ProfileStepGoal />
        </ScrollView>
      </SafeAreaView>
  );
}