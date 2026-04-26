import { StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { Card, Text, useTheme } from 'react-native-paper';
import { Theme } from '../theme/Colors';
import { ChartPoint, applyLabels, getChartWidth} from '../../utils/chartUtils';
 
type Props = {
  title: string;
  data: ChartPoint[];
  trendData: ChartPoint[];
  yMin: number;
  chartMaxValue: number;
  spacing: number;
  change: number | null;
};
 
export const WeightChartCard = ({
  title, data, trendData, yMin,
  chartMaxValue, spacing, change
}: Props) => {
  const { colors, dark } = useTheme();
  const chartWidth = getChartWidth();
  // Piilotetaan pallurat kokonaan, jos niitä on yli 30
  const hideDataPoints = data.length > 30;

  // Värit teemasta
  const lineColor = colors.primary; // Normaalin käyräviivan väri
  const trendColor = colors.error; // Trendiviivan väri
  const fillColor = colors.primary;  // Viivan alapuolen täytteen väri
  const axisColor = colors.primary;
  const labelColor = colors.onSurface;

  // Asetetaan labelit dataan
  const displayData = applyLabels(data.map(p => p.value), labelColor);

  // Trendiviivan piirtämiseen tarvitaan kaksi päällekkäistä kaaviota, nämä ovat niiden yhteiset parametrit.
  const sharedProps = {
    chartWidth,
    yAxisOffset: yMin,
    maxValue: chartMaxValue,
    noOfSections: 3,
    spacing,
    initialSpacing: 10,
    endSpacing: 10,
    disableScroll: true,
  };
 
  return (
    <Card style={styles.card} elevation={2}>
      <Card.Title
        title={title}
        titleStyle={{ color: colors.onSurface }}
        right={() => change !== null ? (
          <Text style={styles.changeText}>
            {change > 0 ? '+' : ''}{change} kg
          </Text>
        ) : null}
      />
      <Card.Content style={styles.chartContent}>
        {data.length > 0 ? (
          <View>
            <LineChart
              {...sharedProps}
              data={displayData}
              color={lineColor}
              thickness={2.5}
              curved
              areaChart
              // Täytteen väri
              startFillColor={fillColor}
              startOpacity={dark ? 0.3 : 0.2}
              endFillColor={fillColor}
              endOpacity={0.01}
              // Akselin labelit ja värit
              yAxisColor="transparent"
              xAxisColor={axisColor}
              yAxisTextStyle={[styles.yAxisText, { color: labelColor }]}
              yAxisLabelSuffix=" kg"
              formatYLabel={(v) => `${Math.round(Number(v))}`}
              // Ruudukko
              rulesType="dashed"
              rulesColor={axisColor}
              rulesThickness={1}
              // Pisteet
              hideDataPoints={hideDataPoints}
              dataPointsColor={lineColor}
              dataPointsRadius={3}
              // Animaatio
              isAnimated
              animationDuration={500}
            />
            {/* Trendiviiva toisena taulukkona datan päällä*/}
            <View
              style={styles.trendOverlay}
              pointerEvents="none"
            >
              <LineChart
                {...sharedProps}
                data={trendData}
                width={chartWidth - 50} // Trendiviiva vähän lyhyemmäksi
                color={trendColor}
                thickness={1}
                curved
                // Piilotetaan kaikki tekstit ja akselit, vain viiva jää.
                hideDataPoints
                yAxisColor="transparent"
                xAxisColor="transparent"
                hideYAxisText
                yAxisThickness={0}
                xAxisThickness={0}
                hideRules={true}
              />
            </View>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={{ color: colors.onSurfaceVariant }}>
              Ei tietoja tältä ajalta
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
  },
  chartContent: {
    paddingBottom: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
  },
  trendOverlay: { // Tästä saa säädettyä trendiviivan sijaintia
    position: 'absolute',
    right: 45,
    bottom: Theme.spacing.sm,
  },
  changeText: { // Painon muutoksen fontti
    fontSize: Theme.typography.sizes.sm,
    fontWeight: '700',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    marginRight: Theme.spacing.lg,
  },
  yAxisText: { // Y-akselin fontti
    fontSize: 10,
  },
  emptyContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});