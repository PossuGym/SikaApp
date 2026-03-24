import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons, Surface } from 'react-native-paper';
import ExercisesScreen from './ExercisesScreen';
import WorkoutScreen from './WorkoutScreen';

/** Kirjasto.
 * Tämä näkymä sisältää ExercisesScreenin ja WorkoutScreenin.
 * SegmentedButtons -ylävalitsimella valitaan kumpi näkyy.
 */
export const LibraryScreen = () => {
  const [value, setValue] = useState('exercises');

  return (
    <Surface style={styles.container}>
      <View>

        {/* Valitsin */}
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'exercises',
              label: 'Liikkeet',
            },
            {
              value: 'workouts',
              label: 'Treeniohjelmat',
            },
          ]}
          style={styles.segmented}
        />
      </View>

      {/* Sisältö vaihtuu valinnan mukaan */}
      <View style={{flex: 1}}>
        {value === 'exercises' ? <ExercisesScreen /> : <WorkoutScreen />}
      </View>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  segmented: {
    maxWidth: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16
  }
});