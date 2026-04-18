import { useTheme, Text, IconButton, Card } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Theme } from '../theme/Colors';
import { useTrainingSession } from '../../store/useTrainingSessionStore';
import { ExerciseLog } from '../../types/types';

type Props = {
  item: ExerciseLog;
}

/**
 * Yksittäisen ```ExerciseLog``` itemin komponentti poisto-ominaisuudella.
 * @param item ```ExerciseLog```-tyypin objekti
 */
export const LogItem = ({ item }: Props) => {
  const { deleteSet } = useTrainingSession();
  const theme = useTheme();

  return (
    <Card mode='contained' style={[styles.card, { borderColor: theme.colors.outline, backgroundColor: theme.colors.elevation.level1 }]}>
      <Card.Content style={styles.row}>

        {/* Log-itemin tiedot */}
        <View style={styles.numberContainer}>
          <Text variant="titleMedium">{item.set_number}</Text>
        </View>
        <Text variant="titleMedium" style={styles.value}>{item.weight} kg</Text>
        <Text variant="titleMedium" style={styles.value}>{item.reps}</Text>

        {/* Poistopainike */}
        <View style={styles.actions}>
          <IconButton
            icon="delete-outline"
            iconColor={theme.colors.error}
            onPress={() => deleteSet(item)}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: Theme.spacing.xs / 2,
    borderWidth: Theme.borderWidth.thick,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.xs / 2,
  },
  numberContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: Theme.spacing.sm,
  },
  value: {
    flex: 1,
    marginHorizontal: Theme.spacing.xs,
    height: 40,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'flex-end',
  },
});
