import { Exercise, ExerciseLog, Workout } from "../types/types"
import { create } from "zustand"
import { workoutService } from "../services/workoutService";
import { exerciseLogService } from "../services/exerciseLogService";
import { Alert } from "react-native";

type SessionState = {
  selectedWorkout: Workout | null;
  exercises: Exercise[];
  currentSession: ExerciseLog[];
  lastSessionResults: { [exerciseId: number]: ExerciseLog[] };
  handleSelect: (workout: Workout) => Promise<void>;
  fetchLastSession: (exerciseId: number) => Promise<void>;
  saveSet: (newLog: ExerciseLog) => Promise<void>;
  deleteSet: (log: ExerciseLog) => Promise<void>;
  endSession: () => void;
}

export const useTrainingSession = create<SessionState>((set, get) => ({
  selectedWorkout: null,
  exercises: [],
  currentSession: [],
  lastSessionResults: {},

  // Valitaan ohjelma ja haetaan sen liikkeet
  handleSelect: async (workout: Workout) => {
    set({ selectedWorkout: workout });
    try {
      const ex = await workoutService.getExercises(workout.id);
      set({ exercises: ex });
      ex.forEach((e) => get().fetchLastSession(e.id));
    } catch {
      Alert.alert("Virhe", "Liikkeiden lataus epäonnistui.");
    }
  },

  // Haetaan edellisen treenikerran tulokset per liike
  fetchLastSession: async (exerciseId: number) => {
    try {
      const logs = await exerciseLogService.ExerciseLastResults(exerciseId);
      set((state) => ({
        lastSessionResults: { ...state.lastSessionResults, [exerciseId]: logs }
      }));
    } catch (error: any) {
      Alert.alert("Virhe", error.message);
    }
  },

  // Tallennetaan uusi sarja tilaan ja tietokantaan
  saveSet: async (newLog: ExerciseLog) => {
    try {
      const savedLog = await exerciseLogService.saveSet(newLog);
      set((state) => ({
        currentSession: [...state.currentSession, savedLog]
      }));
    } catch (error: any) {
      Alert.alert("Virhe", error.message);
    }
  },

  // Poistetaan sarja tietokannasta ja tilasta
  deleteSet: async (log: ExerciseLog) => {
    try {
      await exerciseLogService.deleteSet(log.id)
      set((state) => ({
        currentSession: state.currentSession.filter((item) => item.id !== log.id)
      }));
    } catch (error: any) {
      Alert.alert("Virhe", error.message);
    }
  },

  // Nollaa session tilat
  endSession: () => {
    set({ selectedWorkout: null, exercises: [], currentSession: [], lastSessionResults: {} });
  },
}));
