/*
  Tilastokaavioiden apufunktiot
*/

import { Dimensions } from "react-native";

// Vakio Gifted Charts kaavion leveyden sovittamiseen näytölle.
export const CHART_WIDTH = Dimensions.get('window').width - 115;

// Kaavion yksittäinen arvo/piste
export type ChartPoint = {
  value: number;
  dataPointText?: string;
  textColor?: string;
};

// Aikajakson perusteella filtteröity data ja LineChartin muotoiluun tarvittavat muuttujat
export type PeriodResult = {
  data: ChartPoint[];
  trendData: ChartPoint[];
  yMin: number;
  chartMaxValue: number;
  spacing: number;
  change: number | null;
};

// Kaavion mitoitus ja asettelu datalle
export function calcAxis(values: number[], chartWidth: number) {
  const min = values.length === 0 ? 70 : Math.min(...values);
  const max = values.length === 0 ? 80 : Math.max(...values);

  return {
    yMin: Math.floor(min - 1), // Y-akselin minimiraja pyöristettynä alaspäin kokonaislukuun
    chartMaxValue: Math.ceil(max - min + 2), // Y-akselin kokonaiskorkeus (asteikon laajuus)
    spacing: values.length > 1 ? (chartWidth - 20) / (values.length - 1) : 0, // X-akselin datapisteiden etäisyys toisistaan.
  };
}

// Kaavion labelit
export function applyLabels(values: number[], textColor: string): ChartPoint[] {
  const interval = Math.ceil(values.length / 12);
  return values.map((value, i) => ({
    value,
    dataPointText: `${value}`,
    textColor: values.length <= 12 || i % interval === 0 ? textColor : 'transparent',
  }));
}