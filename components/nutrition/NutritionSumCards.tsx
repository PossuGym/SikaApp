import { Card, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Theme } from '../theme/Colors';

type Props = { item: number, protein: number, carbs: number, fats: number }

type NutritionSumCardProps = Props & {
  progress: number
}


export const NutritionSumCard = ({ item, protein, carbs, fats, progress }: NutritionSumCardProps) => {
  const theme = useTheme();

  return (
    <Card 
      mode="elevated" 
      style={styles.card}
      elevation={2}
    >
      <Card.Title title="Päivän saanti" titleVariant='titleLarge' />
      <Card.Content>
        <View style={styles.summaryRow}>
          <Card style={[styles.caloriesBox, { borderColor: theme.colors.outline, backgroundColor: theme.colors.elevation.level1 }]} mode='contained'>
            <Text variant="labelLarge" style={styles.caloriesLabel}>Kalorit</Text>
            <Text variant="headlineMedium" style={styles.caloriesValue}>{item}</Text>
            <Text variant="bodyMedium" style={styles.caloriesUnit}>kcal</Text>
          </Card>

          <Card style={[styles.progressBox, { borderColor: theme.colors.outline, backgroundColor: theme.colors.elevation.level1 }]} mode='contained'>
            <Text variant="labelMedium" style={styles.progressLabel}>Edistyminen</Text>
            <Text variant="displaySmall" style={styles.progressValue}>{progress}%</Text>
          </Card>
        </View>

        <View style={styles.macrosRow}>
          <View style={styles.macroItem}>
            <Text variant="labelMedium">Proteiini</Text>
            <Text variant="titleMedium">{protein} g</Text>
          </View>

          <View style={styles.macroItem}>
            <Text variant="labelMedium">Hiilarit</Text>
            <Text variant="titleMedium">{carbs} g</Text>
          </View>

          <View style={styles.macroItem}>
            <Text variant="labelMedium">Rasvat</Text>
            <Text variant="titleMedium">{fats} g</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: Theme.spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  caloriesBox: {
    flex: 1,
    borderRadius: Theme.radius.lg,
    borderWidth: Theme.borderWidth.medium,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
  },
  caloriesLabel: {
    opacity: 0.8,
  },
  caloriesValue: {
    marginTop: Theme.spacing.xs,
    lineHeight: 38,
  },
  caloriesUnit: {
    opacity: 0.75,
  },
  progressBox: {
    flex: 1,
    borderRadius: Theme.radius.lg,
    borderWidth: Theme.borderWidth.medium,
    borderStyle: 'dashed',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 110,
  },
  progressLabel: {
    opacity: 0.8,
  },
  progressValue: {
    marginTop: 2,
  },
  macrosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Theme.spacing.md,
  },
  macroItem: {
    alignItems: 'center',
    flex: 1,
  },
});
 