import { Card, useTheme, Text, TextInput, IconButton } from 'react-native-paper';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
      mode='elevated' 
      style={[styles.card, { borderColor: theme.colors.outline }]}
      elevation={2}
    >
    <Card.Content style={styles.row}>
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
        style={styles.input}
      />
      <TextInput
        value={reps.toString()}
        onChangeText={(text) => setReps(text)}
        mode="outlined"
        keyboardType="numeric"
        dense={true}
        style={styles.input}
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
    marginVertical: 2,
    borderRadius: 12,
    borderWidth: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  numberContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 8,
  },
  input: {
    flex: 1,
    marginHorizontal: 4,
    marginVertical: 5,
    textAlign: 'center'
  },
  actions: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'flex-end',
  },
});