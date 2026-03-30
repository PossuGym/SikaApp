import { useCallback, useEffect, useState  } from "react";
import { statsService } from "../services/statsService";
import { Daily } from "../types/types";
import { Alert, Dimensions } from "react-native";
 
// Vakio Gifted Charts kaavion leveyden sovittamiseen näytölle, tarvitaan tässä ja komponentissa
const CHART_WIDTH = Dimensions.get('window').width - 115;
 
export const useWeightStats = () => {
  const [daily, setDaily] = useState<Daily[]>([]);
 
  const loadDaily = useCallback(async () => {
    try {
      const data = await statsService.getAllDaily();
      setDaily(data.sort((a, b) => a.date - b.date));
    } catch (error: any) {
      Alert.alert("Virhe", "Päivätietojen haku epäonnistui.");
    }
  }, []);
 
  useEffect(() => { loadDaily(); }, [loadDaily]);
 
  // Apufunktio datan suodattamiseen ja akselien laskemiseen
  const getPeriodData = (days: number) => {
    // Filtteröidään datasta halutun aikajakson data
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const values = daily.filter(item => item.date >= cutoff).map(item => item.weight);
    const data = values.map(value => ({ value })); // Muutetaan chartin haluamaan muotoon
 
    // Datan minimi ja maksimiarvot
    const empty = values.length === 0;
    const min = empty ? 70 : Math.min(...values);
    const max = empty ? 80 : Math.max(...values);
 
    // Y-akselin alaraja, pyöristetään alas ja vähennetään 1 jotta alin piste ei ole kiinni akselissa
    const yMin = Math.floor(min - 1);
    // Y-akselin korkeus, ero min ja max välillä + 2, jotta ylin piste ei leikkaudu
    const chartMaxValue = Math.ceil(max - min + 2);
    // Pisteiden väli pikseleinä, jaetaan käytettävissä oleva leveys pisteiden välien määrällä
    const spacing = values.length > 1 ? (CHART_WIDTH - 20) / (values.length - 1) : 0;
    // Painon muutos. (viimeinen arvo - ensimmäinen arvo). "+" edessä muuttaa strigistä numberiksi.
    const change = empty ? null : +(values.at(-1)!- values[0]).toFixed(1);
 
    return { 
      data,
      width: CHART_WIDTH,
      yMin,
      chartMaxValue,
      spacing,
      change
    };
  };
 
  return {
    getPeriodData,
    refresh: loadDaily
  };
};