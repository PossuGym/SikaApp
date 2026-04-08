import * as React from "react";
import { ScrollView } from "react-native";
import { ProfileGetEmail } from "../components/profile/ProfileGetEmail";
import { ProfileSetHeight } from "../components/profile/ProfileSetHeight";
import { ProfileSetWeight } from "../components/profile/ProfileSetWeight";
import { ProfileAccountDetails } from "../components/profile/ProfileAccountDetails";
import { ProfileMacroGoal } from "../components/profile/ProfileMacroGoal";
import { ProfileStepGoal } from "../components/profile/ProfileStepGoal";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: 16,
          paddingHorizontal: 16,
          paddingBottom: tabBarHeight + insets.bottom + 16,
        }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <ProfileGetEmail />
        <ProfileSetHeight />
        <ProfileSetWeight />
        <ProfileAccountDetails />
        <ProfileMacroGoal />
        <ProfileStepGoal />
      </ScrollView>
  );
}