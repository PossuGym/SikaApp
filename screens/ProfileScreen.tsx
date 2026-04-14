import { ScrollView, StyleSheet } from "react-native";
import { ProfileGetEmail } from "../components/profile/ProfileGetEmail";
import { ProfileSetHeight } from "../components/profile/ProfileSetHeight";
import { ProfileSetWeight } from "../components/profile/ProfileSetWeight";
import { ProfileAccountDetails } from "../components/profile/ProfileAccountDetails";
import { ProfileMacroGoal } from "../components/profile/ProfileMacroGoal";
import { ProfileStepGoal } from "../components/profile/ProfileStepGoal";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Card, Surface, useTheme } from 'react-native-paper';
import { useAuth } from "../hooks/useAuth";
import ProfileSwitchTheme from "../components/profile/ProfileSwitchTheme";

export default function ProfileScreen() {
  const { handleSignOut, authLoading } = useAuth();
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const theme = useTheme();


  return (
    <Surface style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingTop: 16,
          paddingHorizontal: 16,
          paddingBottom: tabBarHeight + insets.bottom + 16,
          gap: 16,
        }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <ProfileSwitchTheme />
        <ProfileGetEmail />
        <ProfileSetHeight />
        <ProfileSetWeight />
        <ProfileAccountDetails />
        <ProfileMacroGoal />
        <ProfileStepGoal />
        <Card elevation={2}>
          <Card.Content>
              <Button
                style={styles.button}
                mode="contained" 
                buttonColor={theme.colors.error}
                onPress={handleSignOut} 
                loading={authLoading} 
                disabled={authLoading}> Kirjaudu ulos
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  button: {
    marginVertical: 8,
    marginHorizontal: 64,
  }
});