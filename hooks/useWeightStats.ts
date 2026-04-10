import { useCallback, useEffect, useState  } from "react";
import { statsService } from "../services/statsService";
import { Daily } from "../types/types";
import { Alert } from "react-native";
import { CHART_WIDTH, PeriodResult, calcAxis } from "../utils/chartUtils";
import { calcLinearTrend } from "../utils/mathUtils";
 
export const useWeightStats = () => {
  const [daily, setDaily] = useState<Daily[]>([]);
 
  const loadDaily = useCallback(async () => {
    try {
      const data = await statsService.getAllDaily();
      setDaily(data.sort((a, b) => a.date - b.date));
    } catch (error) {
      Alert.alert("Virhe", "Päivätietojen haku epäonnistui.");
    }
  }, []);
 
  useEffect(() => { loadDaily(); }, [loadDaily]);

  // Käyttäjän tuorein paino
  const currentWeight = daily.length > 0 ? daily[daily.length - 1].weight : null;
 
  // Suodatetaan aikajaksojen data
  const getPeriodData = (days: number): PeriodResult => {
    // Filtteröidään datasta halutun aikajakson data
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const values = daily.filter(item => item.date >= cutoff).map(item => item.weight);
    const data = values.map(value => ({ value })); // Muutetaan chartin haluamaan muotoon
 
    // Painon muutos aikajaksolla
    const change = values.length === 0 ? null : +(values.at(-1)! - values[0]).toFixed(1);
    // Kaavion mitoitus
    const { yMin, chartMaxValue, spacing } = calcAxis(values, CHART_WIDTH);
    // Trendiviiva
    const trendData = calcLinearTrend(values).map(value => ({ value }));
     
    return {
      data,
      trendData,
      yMin,
      chartMaxValue,
      spacing,
      change
    };
  };
 
  return { getPeriodData, refresh: loadDaily, currentWeight };
};