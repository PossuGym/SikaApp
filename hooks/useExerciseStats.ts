import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Exercise, ExerciseLog } from "../types/types";
import { exerciseService } from "../services/exerciseService";
import { exerciseLogService } from "../services/exerciseLogService";
import { CHART_WIDTH, PeriodResult, calcAxis } from "../utils/chartUtils";
import { calcLinearTrend } from "../utils/mathUtils";

/**
 * Hook, joka hallinnoi liikkeiden tilastodataa.
 * Vastaa pudotusvalikon tarvitsemien liikelistojen hausta ja valinnan tilasta.
 */
export const useExerciseStats = () => {
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null);
  const [logs, setLogs] = useState<ExerciseLog[]>([]);

  useEffect(() => {
    // Ladataan alussa kaikki liikkeet, joilla on historiaa, ja asetetaan oletusvalinta.
    const loadInitialData = async () => {
      try {
        const exercises = await exerciseService.getAll();
        setAllExercises(exercises);
        if (exercises.length > 0) {
          // Asetetaan ensimmäinen liike oletukseksi
          setSelectedExerciseId(exercises[0].id);
        }
      } catch (error) {
        Alert.alert("Virhe", "Liikkeiden haku epäonnistui.");
      }
    };
    loadInitialData();
  }, []); // Ajetaan vain kerran komponentin latautuessa

  useEffect(() => {
    // Aina kun valittu liike (selectedExerciseId) muuttuu, ladataan sen lokitiedot.
    const loadLogsForSelectedExercise = async () => {
      if (selectedExerciseId) {
        try {
          const data = await exerciseLogService.exerciseHistory(selectedExerciseId);
          setLogs(data);
        } catch (error) {
          Alert.alert("Virhe", "Treenihistorian haku epäonnistui.");
        }
      } else {
        setLogs([]);
      }
    }
    loadLogsForSelectedExercise();
  }, [selectedExerciseId]);

  const refresh = useCallback(async () => {
    if (!selectedExerciseId) return;
    try {
      const data = await exerciseLogService.exerciseHistory(selectedExerciseId);
      setLogs(data);
    } catch (error) { Alert.alert("Virhe", "Päivitys epäonnistui."); }
  }, [selectedExerciseId]);

  // Funktio "Maksimit"-kuvaajan datan hakemiseen
    const getMaxesPeriodData = useCallback((days: number): PeriodResult => {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const maxLogs = logs
      .filter(log => log.reps === 1 && log.date >= cutoff)
      .sort((a, b) => a.date - b.date);
    const values = maxLogs.map(log => log.weight).filter((w): w is number => w != null);
    const data = values.map(value => ({ value }));

    const change = values.length > 1 ? +(values.at(-1)! - values[0]).toFixed(1) : null;
    const { yMin, chartMaxValue, spacing } = calcAxis(values, CHART_WIDTH);
    const trendData = calcLinearTrend(values).map(value => ({ value }));

    return { data, trendData, yMin, chartMaxValue, spacing, change };
  }, [logs]);

  // Funktio "Kehitys"-kuvaajan datan hakemiseen
  const getProgressionPeriodData = useCallback((days: number): PeriodResult => {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const relevantLogs = logs.filter(log => log.reps != null && log.reps > 1 && log.date >= cutoff);

    const dailyMaxes = new Map<number, number>();
    relevantLogs.forEach(log => {
      if (log.weight == null) return;
      const dayTimestamp = new Date(log.date).setHours(0, 0, 0, 0);
      const currentMax = dailyMaxes.get(dayTimestamp) || 0;
      if (log.weight > currentMax) {
        dailyMaxes.set(dayTimestamp, log.weight);
      }
    });

    const sortedDailyMaxes = Array.from(dailyMaxes.entries()).sort((a, b) => a[0] - b[0]);
    const values = sortedDailyMaxes.map(entry => entry[1]);
    const data = values.map(value => ({ value }));

    const change = values.length > 1 ? +(values.at(-1)! - values[0]).toFixed(1) : null;
    const { yMin, chartMaxValue, spacing } = calcAxis(values, CHART_WIDTH);
    const trendData = calcLinearTrend(values).map(value => ({ value }));

    return { data, trendData, yMin, chartMaxValue, spacing, change };
  }, [logs]);

  return {
    allExercises,
    selectedExerciseId,
    setSelectedExerciseId,
    getMaxesPeriodData,
    getProgressionPeriodData,
    refresh
  };
};