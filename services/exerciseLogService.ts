import { logRepository } from "../database/repositories/logRepository";
import { ExerciseLog } from "../types/types";

/**
 * Treenihistorian haku -ja tallennustoimintoja
 */
export const exerciseLogService = {
  
  /**
   * Hakee liikkeen koko treenihistorian
   * @param exerciseId 
   * @returns 
   */
  async exerciseHistory(exerciseId: number): Promise<ExerciseLog[]> {
    return await logRepository.getExerciseHistory(exerciseId);
  },

  /**
   * Hakee liikkeen edellisen treenin historian
   * @param exerciseId 
   * @returns 
   */
  async ExerciseLastResults(exerciseId: number): Promise<ExerciseLog[]> {
    return await logRepository.getLastExerciseResults(exerciseId);
  },

  /**
   * Ohjelman kaikkien liikkeiden edellisen treenikerran historia
   * @param workoutId 
   * @returns 
   */
  async WorkoutLastResults(workoutId: number): Promise<ExerciseLog[]> {
    return await logRepository.getLastWorkoutResults(workoutId);
  },

  /**
   * Tallentaa sarjan tietokantaan
   * @param log 
   */
  async saveSet(log: ExerciseLog): Promise<ExerciseLog> {
    if (log.weight < 1) throw new Error("Syötä paino");
    if (log.reps < 1) throw new Error("Syötä toistot");
    return await logRepository.saveSet(log);
  },

  /**
   * Poistaa sarjan tietokannasta
   * @param logId 
   */
  async deleteSet(logId: number) {
    await logRepository.deleteSet(logId);
  }
}