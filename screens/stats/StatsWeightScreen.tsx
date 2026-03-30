import { StyleSheet, ScrollView } from 'react-native';
import { useWeightStats } from '../../hooks/useWeightStats';
import { Surface, Text } from 'react-native-paper';
import { WeightChartCard } from '../../components/stats/WeightChartCard';
 
export default function StatsWeightScreen() {
  const { getPeriodData } = useWeightStats();
 
  return (
    <Surface style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Painon seuranta</Text>
        <WeightChartCard title="Viikko" {...getPeriodData(7)}/>
        <WeightChartCard title="Kuukausi" {...getPeriodData(30)}/>
        <WeightChartCard title="Vuosi" {...getPeriodData(365)}/>
      </ScrollView>
    </Surface>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 120
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10
  }
});
