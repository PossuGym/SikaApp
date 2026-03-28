import { useState, useEffect, useCallback } from "react";
import { workoutService } from "../services/workoutService";
import { Exercise, Workout } from "../types/types";
import { Alert } from "react-native";

export const useWorkout = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout| null>(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [exercises, setExercises] = useState<{ [workoutId: number]: Exercise[] }>({});

  // Haetaan kaikki treeniohjelmat
  const loadWorkouts = useCallback(async () => {
    try {
      const data = await workoutService.getAll();
      setWorkouts([...data].sort((a, b) => b.favorite - a.favorite)); // suosikit ensin
    } catch (error: any) {
      Alert.alert("Virhe", "Ohjelmien lataus epäonnistui.");
    }
  }, []);

  // Haetaan treeniohjelmien liikkeet
  const getExercises = useCallback(async (workoutId: number) => {
    try {
      const exercises = await workoutService.getExercises(workoutId);
      setExercises(prev => ({ ...prev, [workoutId]: exercises }));
    } catch {
      Alert.alert("Virhe", "Ohjelman liikkeiden haku epäonnistui.");
    }
  }, []);

  useEffect(() => { 
    loadWorkouts(); 
  }, [loadWorkouts]);

  useEffect(() => {
    workouts.forEach(workout => getExercises(workout.id));
  }, [workouts, getExercises]);

  // --- TOIMINNOT ---
  const saveWorkout = async (name: string, exercises: Exercise[], id?: number) => {
    try {
      await workoutService.save(name, exercises, id)
      await loadWorkouts();
      closeDialog();
      return true;
    } catch (error: any) {
      Alert.alert("Virhe tallennuksessa", error.message);
      return false;
    }
  };

  const deleteWorkout = async (id: number) => {
    Alert.alert("Poista ohjelma", "Haluatko varmasti poistaa koko ohjelman?", [
      { text: "Peruuta" },
      {
        text: "Poista",
        onPress: async () => {
          try {
            await workoutService.deleteWorkout(id);
            loadWorkouts();
          } catch (error: any) {
            Alert.alert("Virhe", error.message);
          }
        }
      }
    ]);
  };

  

  const toggleFavorite = async (workoutId: number) => {
    try {
      const workout = workouts.find(w => w.id === workoutId);
      if (!workout) return;
      await workoutService.setFavorite(workoutId, workout.favorite === 0);
      await loadWorkouts();
    } catch (error: any) {
      Alert.alert("Virhe", error.message);
    }
  }

  const openCreateDialog = () => {
    setSelectedWorkout(null);
    setIsDialogVisible(true);
  };

  const openEditDialog = (workout: Workout) => {
    setSelectedWorkout(workout);
    setIsDialogVisible(true);
  };

  const closeDialog = () => setIsDialogVisible(false);

  return {
    workouts,
    exercises,
    selectedWorkout,
    isDialogVisible,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    saveWorkout,
    deleteWorkout,
    toggleFavorite
  }
}