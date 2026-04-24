import { Card, IconButton, Text, useTheme } from 'react-native-paper';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Theme } from '../theme/Colors';
import { useStepProgress } from '../../hooks/useStepProgress';

export const StepProgressWidget = () => {
  const theme = useTheme();
  const {
    steps,
    goal,
    progress,
    isLoading,
    error,
    permissionGranted,
    canAskPermission,
    isSensorAvailable,
    openSettings,
  } = useStepProgress();

  const showSettingsIcon = Boolean(
    error && isSensorAvailable && !permissionGranted && !canAskPermission
  );

  return (
    <Card mode="elevated" style={styles.card} elevation={2}>
      <Card.Content>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
            <Text variant="bodySmall">Askeleet...</Text>
          </View>
        ) : (
          <>
            <Text variant="labelSmall" style={styles.metaText}>Askeleet</Text>
            <Text style={[styles.stepsValue, { color: theme.colors.onSurface }]}>{steps}</Text>
            <View style={styles.metricsRow}>
              <Text variant="bodySmall" style={styles.metaText}>Tavoite {goal}</Text>
              <Text variant="bodyMedium" style={styles.progressText}>{progress}%</Text>
            </View>
            {error ? (
              <View style={styles.errorRow}>
                <Text variant="bodySmall" style={[styles.errorText, { color: theme.colors.error }]}> 
                  {error}
                </Text>
                {showSettingsIcon ? (
                  <IconButton
                    icon="cog"
                    size={16}
                    onPress={openSettings}
                    style={styles.settingsIcon}
                    accessibilityLabel="Avaa asetukset"
                  />
                ) : null}
              </View>
            ) : null}
          </>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    minHeight: 140,
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.xs,
  },
  loadingContainer: {
    minHeight: 98,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Theme.spacing.xs,
  },
  stepsValue: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: 'bold',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Theme.spacing.xs,
  },
  progressText: {
    fontWeight: '700',
  },
  metaText: {
    opacity: 0.75,
  },
  errorRow: {
    marginTop: Theme.spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    flex: 1,
  },
  settingsIcon: {
    margin: 0,
    marginLeft: Theme.spacing.xs,
  },
});
