import { useCallback, useEffect, useState, useMemo } from "react";
import { statsService } from "../services/statsService";
import { Daily } from "../types/types";
import { Alert } from "react-native";

export const useStats = () => {
  const [daily, setDaily] = useState<Daily[]>([]); // askeleet, paino ja päivämäärä
  const [timeframe, setTimeframe] = useState<string>("week"); // käyttäjän valitsema aikajakso

  const loadDaily = useCallback(async () => {
    try {
      const data = await statsService.getAllDaily();
      setDaily(data);
    } catch (error: any) {
      Alert.alert("Virhe", "Päivätietojen haku epäonnistui.");
    }
  }, [])

  useEffect(() => {
    loadDaily();
  }, [loadDaily]);

 const weightdata = daily
    .filter(item => {
      const msInDay = 24 * 60 * 60 * 1000;
      const cutoff = Date.now() - (timeframe === "week" ? 7 : timeframe === "month" ? 30 : timeframe === "year" ? 365 : 10000) * msInDay;
      return timeframe === "all" || item.date >= cutoff;
    })
    .sort((a, b) => a.date - b.date)
    .map(item => ({
      value: item.weight,
      label: new Date(item.date).toLocaleDateString('fi-FI', { day: 'numeric', month: 'numeric' }),
    }));

  // Lasketaan Y-akselin skaalaus (min ja max)
  const weights = weightdata.map(d => d.value);
  const currentWeight = weights.length > 0 ? weights[weights.length - 1] : 80;
  const yMin = Math.floor(currentWeight - 4); 
  const yMax = yMin + 10;
  
  return {
    timeframe,
    weightdata,
    setTimeframe,
    yMin,
    yMax,
    refresh: loadDaily
  }
}
