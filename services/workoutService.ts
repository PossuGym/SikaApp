import { workoutRepository } from "../database/repositories/workoutRepository";
import { Exercise, Workout, WorkoutExercise } from "../types/types";

export const workoutService = {

  /**
   * Kaikki tietokannan ohjelmat
   * @returns Palauttaa kaikki tietokannan ohjelmat ```Workout``` -objektien taulukkona.
   */
  async getAll(): Promise<Workout[]> {
    return await workoutRepository.getWorkouts();
  },

  /**
   * Luo tai päivittää uuden ohjelman
   * @param name Ohjelman nimi
   * @param exerciseIds Ohjelmaan kuuluvat liikkeet
   */
  async save(name: string, exercises: Exercise[], id?: number) {
    const cleanName = name.trim();

    if (!cleanName) {
      throw new Error("Ohjelmalla täytyy olla nimi.")
    }

    // Virhe, jos samanniminen treeniohjelma jo olemassa
    const existing = await workoutRepository.getWorkoutByName(cleanName);
    if (existing && existing.id !== id) {
      throw new Error(`Ohjelma "${cleanName}" on jo olemassa.`)
    }

    // Päivitetään tai luodaan uusi treeniohjelma
    if (id) {
      await workoutRepository.updateWorkoutName(id, cleanName);
      await workoutRepository.removeAllExercisesFromWorkout(id);

      for (const ex of exercises) {
        if (ex.id) await workoutRepository.addExerciseToWorkout(id, ex.id);
      }
    } else {
      return await workoutRepository.createWorkout(cleanName, exercises)
    }
  },

  /**
   * Poistaa ohjelman
   * @param workoutId Ohjelman id
   */
  async deleteWorkout(workoutId: number) {
    const success = await workoutRepository.deleteWorkout(workoutId);

    if (!success) {
      throw new Error("Ohjelman poistaminen epäonnistui.")
    }
  },

  /**
   * Vaihtaa ohjelman suosikkitilaa 0/1
   * @param workoutId Ohjelman id
   * @param isFavorite true/false
   */
  async setFavorite(workoutId: number, isFavorite: boolean) {
    await workoutRepository.setFavorite(workoutId, isFavorite);
  },

  /**
   * Hakee kaikki ohjelmaan kuuluvat liikkeet
   * @param workoutId Ohjelman id
   * @returns Ohjelman liikkeet ```Exercise``` tyypin taulukkona
   */
  async getExercises(workoutId: number): Promise<Exercise[]> {
    return await workoutRepository.getWorkoutExercises(workoutId);
  },

  async getWorkoutExercise(): Promise<WorkoutExercise[]> {
    return await workoutRepository.getAll();
  }
}