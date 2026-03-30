import { StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { Card, Text } from 'react-native-paper';
 
type ChartData = { value: number };
 
type Props = {
  title: string;
  data: ChartData[];
  width: number;
  yMin: number;
  chartMaxValue: number;
  spacing: number;
  change: number | null;
};
 
export const WeightChartCard = ({ title, data, width, yMin, chartMaxValue, spacing, change }: Props) => {
  // TÄMÄN OSION SAA POISTETTUA DATAN SAMPLINGILLA TAI AGGREGOINNILLA
  // Näytetään vain joka toisen DataPointin label jos niitä on yli 12
  const interval = Math.ceil(data.length / 12);
  const displayData = data.map((item, i) => ({
    ...item,
    dataPointText: `${item.value}`,
    textColor: data.length <= 12 || i % interval === 0 ? '#333' : 'transparent',
  }));
  // Piilotetaan pallurat kokonaan, jos niitä on yli 30
  const hideDataPoints = data.length > 30;
 
  return (
    <Card style={styles.card}>
    <Card.Title
      title={title}
      right={() => change !== null ? (
        <Text style={styles.changeText}>{change} kg</Text>
      ) : null}
    />
      <Card.Content style={styles.chartContent}>
        {data.length > 0 ? (
          <LineChart
            showValuesAsDataPointsText
            data={displayData}
            width={width}
            yAxisOffset={yMin}
            maxValue={chartMaxValue}
            noOfSections={3}
            spacing={spacing}
            initialSpacing={10}
            endSpacing={10}
            color="#00a7ee"
            thickness={2}
            yAxisLabelSuffix=" kg"
            formatYLabel={(value) => `${Math.round(Number(value))}`}
            yAxisTextStyle={styles.yAxisText}
            textShiftY={-10}
            textFontSize={9}
            disableScroll
            areaChart
            startFillColor="rgb(46, 217, 255)"
            startOpacity={0.8}
            endFillColor="rgb(203, 241, 250)"
            endOpacity={0.3}
            hideDataPoints={hideDataPoints}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Ei tietoja tältä ajalta</Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
}
 
const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 12
  },
  chartContent: {
    alignItems: 'center',
    paddingBottom: 10
  },
  changeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#666',
    marginRight: 16
  },
  yAxisText: {
    fontSize: 10
  },
  emptyContainer: {
    height: 100,
    justifyContent: 'center'
  },
  emptyText: {
    color: '#666'
  },
});