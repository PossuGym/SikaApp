import { workoutService } from "../services/workoutService";
import { Exercise, Workout } from "../types/types";
import { Alert } from "react-native";
import { create } from "zustand"

// Tilanhallinta Zustandilla
type WorkoutState = {
  workouts: Workout[];
  exercises: { [workoutId: number]: Exercise[] };
  selectedWorkout: Workout | null;
  isDialogVisible: boolean;
  loadWorkouts: () => Promise<void>;
  getExercises: (workoutId: number) => Promise<void>;
  saveWorkout: (name: string, exercises: Exercise[], id?: number) => Promise<boolean>;
  deleteWorkout: (id: number) => Promise<void>;
  toggleFavorite: (workoutId: number) => Promise<void>;
  openCreateDialog: () => void;
  openEditDialog: (workout: Workout) => void;
  closeDialog: () => void;
  getSections: () => { title: string; data: Workout[] }[];
};

export const useWorkout = create<WorkoutState>((set, get) => ({
  workouts: [],
  exercises: {},
  selectedWorkout: null,
  isDialogVisible: false,

  // Haetaan kaikki treeniohjelmat
  loadWorkouts: async () => {
    try {
      const data = await workoutService.getAll();
      const sorted = [...data].sort((a, b) => b.favorite - a.favorite); // suosikkiohjelmat ensin

      set({ workouts: sorted });
      sorted.forEach(workout => get().getExercises(workout.id)); // Ohjelmaan kuuluvat liikkeet
    } catch (error: any) {
      Alert.alert("Virhe", "Ohjelmien lataus epäonnistui.");
    }
  },

  // Haetaan treeniohjelmien liikkeet
  getExercises: async (workoutId: number) => {
    try {
      const exercises = await workoutService.getExercises(workoutId);
      set((state) => ({
        exercises: { ...state.exercises, [workoutId]: exercises }
      }));
    } catch {
      Alert.alert("Virhe", "Ohjelman liikkeiden haku epäonnistui.");
    }
  },

  // --- TOIMINNOT ---
  saveWorkout: async (name: string, exercises: Exercise[], id?: number) => {
    try {
      await workoutService.save(name, exercises, id)
      await get().loadWorkouts();
      get().closeDialog();
      return true;
    } catch (error: any) {
      Alert.alert("Virhe tallennuksessa", error.message);
      return false;
    }
  },

  deleteWorkout: async (id: number) => {
    Alert.alert("Poista ohjelma", "Haluatko varmasti poistaa koko ohjelman?", [
      { text: "Peruuta" },
      {
        text: "Poista",
        onPress: async () => {
          try {
            await workoutService.deleteWorkout(id);
            await get().loadWorkouts();
          } catch (error: any) {
            Alert.alert("Virhe", error.message);
          }
        }
      }
    ]);
  },

  toggleFavorite: async (workoutId: number) => {
    try {
      const workout = get().workouts.find((w) => w.id === workoutId);
      if (!workout) return;
      await workoutService.setFavorite(workoutId, workout.favorite === 0);
      await get().loadWorkouts();
    } catch (error: any) {
      Alert.alert("Virhe", error.message);
    }
  },

  openCreateDialog: () => {
    set({ selectedWorkout: null, isDialogVisible: true })
  },

  openEditDialog: (workout: Workout) => 
    set({ selectedWorkout: workout, isDialogVisible: true }),

  closeDialog: () => set({ isDialogVisible: false }),

  getSections: () => {
    const workouts = get().workouts;
    const favorites = workouts.filter(w => w.favorite === 1);
    const rest = workouts.filter(w => w.favorite === 0);

    const sections = [];
    if (favorites.length > 0) {
      sections.push({ title: 'Suosikit', data: favorites });
    }
    if (rest.length > 0) {
      sections.push({ title: 'Muut', data: rest });
    }
    return sections;
  },
}));