import { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SegmentedButtons, Text, Button, Menu, useTheme } from 'react-native-paper';
import { Theme } from '../theme/Colors';
import { useExerciseStats } from '../../hooks/useExerciseStats';
import { WeightChartCard } from './WeightChartCard';

const periods = [
  { label: '5V', value: 1825 },
  { label: '1V', value: 365 },
  { label: '1KK', value: 30 },
];

export const ExerciseStatsView = () => {
  const theme = useTheme();
  const [tab, setTab] = useState('progression'); // 'progression' tai 'maxes'
  const [period, setPeriod] = useState(365); // Oletuksena 1V
  const [menuVisible, setMenuVisible] = useState(false);

  const {
    allExercises,
    selectedExerciseId,
    setSelectedExerciseId,
    getMaxesPeriodData,
    getProgressionPeriodData,
    loading,
  } = useExerciseStats();

  const chartData = useMemo(() => {
    if (!selectedExerciseId) return null;
    if (tab === 'progression') {
      return getProgressionPeriodData(period);
    }
    return getMaxesPeriodData(period);
  }, [tab, period, selectedExerciseId, getProgressionPeriodData, getMaxesPeriodData]);

  const selectedExercise = allExercises.find(e => e.id === selectedExerciseId);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleSelectExercise = (id: number) => {
    setSelectedExerciseId(id);
    closeMenu();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView>
      <SegmentedButtons
        value={tab}
        onValueChange={setTab}
        buttons={[
          { value: 'progression', label: 'Kehitys' },
          { value: 'maxes', label: 'Maksimit' },
        ]}
        style={styles.segmented}
      />

      <View style={styles.dropdownContainer}>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Button
              mode="outlined"
              onPress={openMenu}
              icon="chevron-down"
              contentStyle={styles.dropdownButton}
            >
              {selectedExercise ? selectedExercise.name : "Valitse liike"}
            </Button>
          }
        >
          {allExercises.map(exercise => (
            <Menu.Item
              key={exercise.id}
              onPress={() => handleSelectExercise(exercise.id)}
              title={exercise.name}
            />
          ))}
        </Menu>
      </View>

      {chartData ? (
        <View style={styles.chartSection}>
          <SegmentedButtons
            value={String(period)}
            onValueChange={(v) => setPeriod(Number(v))}
            buttons={periods.map(p => ({ label: p.label, value: String(p.value) }))}
            style={styles.periodSegmented}
          />
          {chartData.data.length > 1 ? (
            <View style={styles.chartContainer}>
              <WeightChartCard
                title={tab === 'progression' ? 'Painon kehitys' : 'Maksimien kehitys'}
                data={chartData.data}
                trendData={chartData.trendData}
                yMin={chartData.yMin}
                chartMaxValue={chartData.chartMaxValue}
                spacing={chartData.spacing}
                change={chartData.change}
              />
            </View>
          ) : (
            <View style={styles.noDataContainer}>
              <Text>Ei tarpeeksi dataa kuvaajaa varten tällä aikavälillä.</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.noDataContainer}>
          <Text>
            {allExercises.length > 0 ? 'Valitse liike nähdäksesi tilastot.' : 'Luo ensin liike harjoitukset-sivulla.'}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  segmented: {
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg
  },
  periodSegmented: {
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl
  },
  dropdownContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.lg,
    alignItems: 'stretch'
  },
  dropdownButton: {
    flexDirection: 'row-reverse',
    width: '100%'
  },
  chartSection: {
    alignItems: 'stretch',
    paddingHorizontal: Theme.spacing.lg
  },
  chartContainer: {
    marginBottom: Theme.spacing.xl
  },
  noDataContainer: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.lg
  },
  loadingContainer: {
    flex: 1,
    minHeight: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
});