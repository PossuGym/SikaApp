import { useMemo } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { Theme } from '../../components/theme/Colors';
import { useWeightStats } from '../../hooks/useWeightStats';
import { Card, Surface, Text, useTheme } from 'react-native-paper';
import { WeightChartCard } from '../../components/stats/WeightChartCard';
 
export default function StatsWeightScreen() {
  const { getPeriodData, currentWeight, loading } = useWeightStats();
  const theme = useTheme();

  // useMemo, ettei getPediodData lasketa joka renderöinnillä kolmea kertaa uudelleen.
  const week = useMemo(() => getPeriodData(7), [getPeriodData]);
  const month = useMemo(() => getPeriodData(30), [getPeriodData]);
  const year = useMemo(() => getPeriodData(365), [getPeriodData]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
 
  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]} elevation={0}>
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: Theme.spacing.xxxl }} showsVerticalScrollIndicator={false}>
        <Card style={[styles.weightCard, {borderColor: theme.colors.outline, backgroundColor: theme.colors.primaryContainer }]} mode='elevated' elevation={1}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.header}>Painosi nyt: {currentWeight} kg</Text>
          </Card.Content>
        </Card>
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
    paddingBottom: 0
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginHorizontal: Theme.spacing.lg,
  },
  weightCard: {
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    borderWidth: Theme.borderWidth.thin,
  },
  content: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
  }
});
