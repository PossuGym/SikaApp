import { ScrollView, StyleSheet } from "react-native";
import { ProfileGetEmail } from "../components/profile/ProfileGetEmail";
import { ProfileSetHeight } from "../components/profile/ProfileSetHeight";
import { ProfileSetWeight } from "../components/profile/ProfileSetWeight";
import { ProfileAccountDetails } from "../components/profile/ProfileAccountDetails";
import { ProfileMacroGoal } from "../components/profile/ProfileMacroGoal";
import { ProfileStepGoal } from "../components/profile/ProfileStepGoal";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityIndicator, Button, Card, Surface, useTheme } from 'react-native-paper';
import { Theme } from '../components/theme/Colors';
import { useAuth } from "../hooks/useAuth";
import ProfileSwitchTheme from "../components/profile/ProfileSwitchTheme";
import { useBackup } from "../hooks/useBackup";

export default function ProfileScreen() {
  const { handleSignOut, authLoading } = useAuth();
  const { handleBackup, handleRestore, isLoading, error} = useBackup();
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const theme = useTheme();


  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {isLoading && <ActivityIndicator size="small" color={theme.colors.primary} />}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingTop: Theme.spacing.lg,
          paddingHorizontal: Theme.spacing.lg,
          paddingBottom: tabBarHeight + insets.bottom + Theme.spacing.lg,
          gap: Theme.spacing.lg,
        }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
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
        <Card elevation={2}>
          <Card.Content>
            <Button
              style={styles.button}
              mode="contained"
              buttonColor={theme.colors.primary}
              onPress={handleBackup}
              disabled={isLoading}>
                Varmuuskopioi pilveen
            </Button>
            <Button
              style={styles.button}
              mode="contained"
              buttonColor={theme.colors.primary}
              onPress={handleRestore}
              disabled={isLoading}>
                Palauta pilvestä
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
    marginVertical: Theme.spacing.sm,
    marginHorizontal: Theme.spacing.xxl * 2,
  }
});