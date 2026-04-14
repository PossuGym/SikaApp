import { useMemo } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useWeightStats } from '../../hooks/useWeightStats';
import { Card, Surface, Text } from 'react-native-paper';
import { WeightChartCard } from '../../components/stats/WeightChartCard';
 
export default function StatsWeightScreen() {
  const { getPeriodData, currentWeight } = useWeightStats();

  // useMemo, ettei getPediodData lasketa joka renderöinnillä kolmea kertaa uudelleen.
  const week = useMemo(() => getPeriodData(7), [getPeriodData]);
  const month = useMemo(() => getPeriodData(30), [getPeriodData]);
  const year = useMemo(() => getPeriodData(365), [getPeriodData]);
 
  return (
    <Surface style={styles.container} elevation={0}>
      <Card style={styles.weightCard} elevation={2}>
        <Card.Content>
          <Text variant="bodyLarge" style={styles.header}>Painosi nyt: {currentWeight} kg</Text>
        </Card.Content>
      </Card>
      <ScrollView style={styles.content}>
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
    paddingBottom: 120
  },
  header: {
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  weightCard: {
    marginBottom: 15,
    marginHorizontal: 16,
  },
  content: {
    paddingHorizontal: 16,
  }
});
