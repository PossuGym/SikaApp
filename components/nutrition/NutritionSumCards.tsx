import { Card, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

type Props = { item: number, protein: number, carbs: number, fats: number }


export const NutritionSumCard = ({ item, protein, carbs, fats }: Props) => {
  const theme = useTheme();

  return (
    <Card mode="outlined" style={styles.card}>
      <Card.Title title="Päivän saanti" titleStyle={styles.title} />
      <Card.Content>
        <View style={styles.summaryRow}>
          <View
            style={[
              styles.caloriesBox,
              {
                borderColor: theme.colors.primary,
                backgroundColor: theme.colors.primaryContainer,
              },
            ]}
          >
            <Text variant="labelLarge" style={styles.caloriesLabel}>Kalorit</Text>
            <Text variant="headlineMedium" style={styles.caloriesValue}>{item}</Text>
            <Text variant="bodyMedium" style={styles.caloriesUnit}>kcal</Text>
          </View>

          <View
            style={[
              styles.progressBox,
              {
                borderColor: theme.colors.primary,
                backgroundColor: theme.colors.primaryContainer,
              },
            ]}
          >
            <Text variant="labelMedium" style={styles.progressLabel}>Edistyminen</Text>
            <Text variant="displaySmall" style={styles.progressValue}>--%</Text>
          </View>
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
    marginTop: 10,
  },
  title: {
    fontSize: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
  },
  caloriesBox: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  caloriesLabel: {
    opacity: 0.8,
  },
  caloriesValue: {
    marginTop: 4,
    lineHeight: 38,
  },
  caloriesUnit: {
    opacity: 0.75,
  },
  progressBox: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    paddingVertical: 12,
    paddingHorizontal: 14,
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
    marginTop: 14,
  },
  macroItem: {
    alignItems: 'center',
    flex: 1,
  },
});
 