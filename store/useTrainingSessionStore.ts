import { Workout } from "../types/types"
import { create } from "zustand"

type SessionState = {
  selectedWorkout: Workout | null;
  handleSelect: (workout: Workout) => void;
}

export const useTrainingSession = create<SessionState>((set, get) => ({
  selectedWorkout: null,

  handleSelect: (workout: Workout) => {
    set({ selectedWorkout: workout });
  },
}));