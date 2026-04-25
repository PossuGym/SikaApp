import { Button, Card, Dialog, IconButton, Portal, Text, useTheme } from 'react-native-paper';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Theme } from '../theme/Colors';
import { useStepProgress } from '../../hooks/useStepProgress';
import Svg, { Circle } from 'react-native-svg';

export const StepProgressWidget = () => {
  const theme = useTheme();
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);
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
  const normalizedProgress = Math.max(0, Math.min(progress, 100));
  const radius = 37;
  const strokeWidth = 9;
  const circumference = 2 * Math.PI * radius;
  const ringProgress = circumference - (normalizedProgress / 100) * circumference;

  return (
    <Card mode="elevated" style={styles.card} elevation={2}>
      <Card.Content style={styles.content}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
            <Text variant="bodySmall">Askeleet...</Text>
          </View>
        ) : (
          <>
            <View style={styles.topRow}>
              <Text variant="labelSmall" style={styles.metaText}>Askeleet</Text>
              <View style={styles.topActions}>
                {error ? (
                  <IconButton
                    icon="alert"
                    size={14}
                    iconColor={theme.colors.error}
                    onPress={() => setErrorDialogVisible(true)}
                    style={styles.errorInfoIcon}
                    accessibilityLabel="Näytä askelvirhe"
                  />
                ) : null}
                {showSettingsIcon ? (
                  <IconButton
                    icon="cog"
                    size={14}
                    onPress={openSettings}
                    style={styles.settingsIcon}
                    accessibilityLabel="Avaa asetukset"
                  />
                ) : null}
              </View>
            </View>
            <View style={styles.ringWrapper}>
              <Svg width={92} height={92}>
                <Circle
                  cx="46"
                  cy="46"
                  r={radius}
                  stroke={theme.colors.surfaceVariant}
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <Circle
                  cx="46"
                  cy="46"
                  r={radius}
                  stroke={theme.colors.primary}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={ringProgress}
                  transform="rotate(-90 46 46)"
                />
              </Svg>
              <View style={styles.ringCenter}>
                <Text variant="titleSmall" style={styles.progressText}>{normalizedProgress}%</Text>
              </View>
            </View>
            <Text style={[styles.stepsValue, { color: theme.colors.onSurface }]}>{steps}</Text>
            <View style={styles.metricsRow}>
              <Text variant="bodySmall" style={styles.metaText}>Tavoite: {goal} askelta</Text>
            </View>
          </>
        )}
      </Card.Content>
      <Portal>
        <Dialog visible={errorDialogVisible} onDismiss={() => setErrorDialogVisible(false)}>
          <Dialog.Title>Askelwidgetin virhe</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{error ?? 'Tuntematon virhe.'}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setErrorDialogVisible(false)}>Sulje</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 210,
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.xs,
  },
  content: {
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.sm,
  },
  loadingContainer: {
    minHeight: 98,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Theme.spacing.xs,
  },
  stepsValue: {
    marginTop: Theme.spacing.xs,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  progressText: {
    fontWeight: '700',
    textAlign: 'center',
  },
  metaText: {
    opacity: 0.75,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 24,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ringWrapper: {
    alignSelf: 'center',
    width: 92,
    height: 92,
    marginTop: 2,
  },
  ringCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    margin: 0,
  },
  errorInfoIcon: {
    margin: 0,
  },
});
