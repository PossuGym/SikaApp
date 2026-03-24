import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SegmentedButtons, Surface } from "react-native-paper";
import StatsWeightScreen from './StatsWeightScreen';
import StatsMaxRepScreen from './StatsMaxRepScreen';
import StatsProgressScreen from './StatsProgressScreen';



export default function StatsScreen () {
  const [value, setValue] = useState('Paino');
  return (
    <Surface style={styles.container}>
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
              value:'Maksimit',
              label:'Maksimit',
            },
            {
              value:'Kehitys',
              label:'Kehitys',
            },
          ]}
          style={styles.segmented}
       />
      </View>
      <View style={styles.content}>
        {value === 'Paino' && <StatsWeightScreen /> }
        {value === 'Maksimit' && <StatsMaxRepScreen /> }
        {value === 'Kehitys' && <StatsProgressScreen /> }
      </View>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenWrapper: {
    padding: 16,
  },
  segmented: {
    maxWidth: '100%',
  },
  content: {
    flex: 1,
  },
});