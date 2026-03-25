import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from "react-native-gifted-charts";
import { useStats } from '../../hooks/useStats';
import { SegmentedButtons, Surface } from 'react-native-paper';

export default function StatsWeightScreen() {

  const { weightdata, timeframe, setTimeframe, yMin, yMax } = useStats();

  return (
    <Surface style={styles.container} elevation={0}>
      <SegmentedButtons
        value={timeframe}
        onValueChange={setTimeframe}
        buttons={[
          { value: 'week', label: 'Viikko' },
          { value: 'month', label: 'Kuukausi' },
          { value: 'year', label: 'Vuosi' },
          { value: 'all', label: 'Kaikki' },
        ]}
        style={{ marginBottom: 20 }}
      />
      <LineChart
        data={weightdata}
        // Y-AKSELIN SKAALAUS
        mostNegativeValue={yMin}
        maxValue={yMax}
        stepValue={2}
        noOfSections={5}
        yAxisLabelContainerStyle={{width: 45}}
        yAxisOffset={yMin}

        // X-AKSELIN VENYTYS (Viikko saa enemmän tilaa)
        spacing={weightdata.length < 10 ? 100 : 40}
        initialSpacing={30}

        // TYYLIT
        color="#6200ee"
        thickness={3}
        dataPointsColor="#6200ee"
        yAxisLabelSuffix=" kg"
        hideRules={false}
        rulesType="solid"
        yAxisTextStyle={{ fontSize: 10, color: '#666'}}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});