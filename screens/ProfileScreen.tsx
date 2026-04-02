import * as React from "react";
import { ScrollView } from "react-native";
import ProfileSetHeightAndWeight from "../components/profile/ProfileSetHeightAndWeight";
import ProfileAccountDetails from "../components/profile/ProfileAccountDetails";
import ProfileMacroGoal from "../components/profile/ProfileMacroGoal";
import {ProfileStepGoal} from "../components/profile/ProfileStepGoal";

export default function ProfileScreen() {

  return (
      
      <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled"  keyboardDismissMode="on-drag">
        <ProfileSetHeightAndWeight />
        <ProfileAccountDetails />
        <ProfileMacroGoal />
        <ProfileStepGoal />
        </ScrollView>
      
  );
}