import { Card, useTheme, Text, TextInput, IconButton } from 'react-native-paper';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Theme } from '../theme/Colors';
import { useTrainingSession } from '../../store/useTrainingSessionStore';

type Props = {
  exerciseId: number;
  setNumber: number;
}

/**
 * Sarjan syöttörivi tallennuksella
 * @param exerciseId Liikkeen id
 * @param setNumber Sarjan numero
 */
export const SetRow = ({ exerciseId, setNumber }: Props) => {
  const { selectedWorkout, saveSet } = useTrainingSession();
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const theme = useTheme();

  return (
    <Card 
      mode='contained' 
      style={[styles.card, { borderColor: theme.colors.outline, }]}
    >
    <Card.Content style={[styles.row, { borderColor: theme.colors.outline, borderRadius: Theme.radius.md, backgroundColor: theme.colors.elevation.level1 }]}>
      <View style={styles.numberContainer}>
        <Text variant="titleMedium">{setNumber}</Text>
      </View>

      {/* Syötteet */}
      <TextInput
        value={weight.toString()}
        onChangeText={(text) => setWeight(text)}
        mode="outlined"
        keyboardType="numeric"
        dense={true}
        style={[styles.input, { backgroundColor: theme.colors.surface }]}
      />
      <TextInput
        value={reps.toString()}
        onChangeText={(text) => setReps(text)}
        mode="outlined"
        keyboardType="numeric"
        dense={true}
        style={[styles.input, { backgroundColor: theme.colors.surface }]}
      />

      {/* Tallennuspainike */}
      <View style={styles.actions}>
        <IconButton
          icon="check-bold"
          iconColor={theme.colors.primary}
          onPress={() => saveSet({
            id: 0,
            exercise_id: exerciseId,
            workout_id: selectedWorkout!.id,
            weight: Number(weight),
            reps: Number(reps),
            set_number: setNumber,
            date: 0,
          })}
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
    borderRadius: Theme.radius.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.xs,
  },
  numberContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: Theme.spacing.sm,
  },
  input: {
    flex: 1,
    marginHorizontal: Theme.spacing.xs,
    marginVertical: Theme.spacing.sm,
    textAlign: 'center'
  },
  actions: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'flex-end',
  },
});