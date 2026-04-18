import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons, Surface, useTheme } from 'react-native-paper';
import ExercisesScreen from './ExercisesScreen';
import WorkoutScreen from './WorkoutScreen';
import { Theme } from '../components/theme/Colors';

/** Kirjasto.
 * Tämä näkymä sisältää ExercisesScreenin ja WorkoutScreenin.
 * SegmentedButtons -ylävalitsimella valitaan kumpi näkyy.
 */
export const LibraryScreen = () => {
  const [value, setValue] = useState('exercises');

  const theme = useTheme();

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background}]}>
        {/* Valitsin */}
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            { value: 'exercises', label: 'Liikkeet' },
            { value: 'workouts', label: 'Treeniohjelmat' },
          ]}
          style={styles.segmented}
        />
      {/* Sisältö vaihtuu valinnan mukaan */}
      <View style={styles.content}>
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
    marginHorizontal: Theme.spacing.lg,
    marginVertical: Theme.spacing.md,
    borderRadius: Theme.radius.md,
  },
  content: {
    flex: 1,
  },

});