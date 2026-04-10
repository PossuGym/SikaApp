import { useMemo } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useWeightStats } from '../../hooks/useWeightStats';
import { Surface } from 'react-native-paper';
import { WeightChartCard } from '../../components/stats/WeightChartCard';
 
export default function StatsWeightScreen() {
  const { getPeriodData } = useWeightStats();

  // useMemo, ettei getPediodData lasketa joka renderöinnillä kolmea kertaa uudelleen.
  const week = useMemo(() => getPeriodData(7), [getPeriodData]);
  const month = useMemo(() => getPeriodData(30), [getPeriodData]);
  const year = useMemo(() => getPeriodData(365), [getPeriodData]);
 
  return (
    <Surface style={styles.container}>
      <ScrollView>
        <WeightChartCard title="Viikko" {...week}/>
        <WeightChartCard title="Kuukausi" {...month}/>
        <WeightChartCard title="Vuosi" {...year}/>
      </ScrollView>
    </Surface>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 120
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10
  }
});
