import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SegmentedButtons, Surface, useTheme } from "react-native-paper";
import { Theme } from '../../components/theme/Colors';
import StatsWeightScreen from './StatsWeightScreen';
import StatsProgressScreen from './StatsProgressScreen';


export default function StatsScreen () {
  const [value, setValue] = useState('Paino');
  const theme = useTheme();

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.screenWrapper}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value:'Paino',
              label:'Paino',
            },
            {
              value:'Liikkeet',
              label:'Liikkeet',
            },
          ]}
          style={styles.segmented}
       />
      </View>
      <View style={styles.content}>
        {value === 'Paino' && <StatsWeightScreen /> }
        {value === 'Liikkeet' && <StatsProgressScreen /> }
      </View>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenWrapper: {
    paddingHorizontal: Theme.spacing.lg,
  },
  segmented: {
    maxWidth: '100%',
    marginVertical: Theme.spacing.md,
  },
  content: {
    flex: 1,
  },
});