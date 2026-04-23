import { database } from '../database'
import { ExerciseLog } from '../../types/types'

/**
 * CRUD-operaatiot treenin tilastoinnille
 */

export const logRepository = {
  
  /**
   * Tallettaa yhden sarjan
   * @param {ExerciseLog} log - Yksi sarja ```ExerciseLog```-muodossa
   */
  async saveSet(log: ExerciseLog): Promise<ExerciseLog> {
    const result = await database.runAsync(
      `INSERT INTO exercise_log (exercise_id, workout_id, weight, reps, set_number, date)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [log.exercise_id, log.workout_id, log.weight, log.reps, log.set_number, log.date!]
    );
    return { ...log, id: result.lastInsertRowId };
  },

  /**
   * Poistaa sarjan
   * @param {number} logId - Sarjan id 
   * @returns True, jos poisto onnistui
   */
  async deleteSet(logId: number): Promise<boolean> {
    const result = await database.runAsync(
      `DELETE FROM exercise_log WHERE id = ?`,
      [logId]
    );
    return result.changes > 0;
  },

  /**
   * Hakee liikkeen koko treenihistorian
   * @param {number} exerciseId - Liikkeen id
   * @returns {Promise<ExerciseLog[]>} Liikkeen treenihistoria ```ExerciseLog```-taulukkona
   * @example const history = workoutRepository.getExerciseHistory(exercise.id)
   */
  async getExerciseHistory(exerciseId: number): Promise<ExerciseLog[]> {
    return database.getAllAsync(
      `SELECT * FROM exercise_log WHERE exercise_id = ? ORDER BY date DESC`,
      [exerciseId]
    );
  },

  /**
   * Hakee ohjelman treenihistorian
   * @param {number} workoutId - Ohjelman id
   * @returns {Promise<ExerciseLog[]>} Ohjelman treenihistoria ```ExerciseLog```-taulukkona
   */
  async getWorkoutHistory(workoutId: number): Promise<ExerciseLog[]> {
    return database.getAllAsync(
      `SELECT * FROM exercise_log WHERE workout_id = ?`,
      [workoutId]
    );
  },

  /**
   * Hakee ohjelman edellisen treenikerran tulokset
   * @param {number} workoutId - Ohjelman id
   * @returns {Promise<ExerciseLog[]>} Ohjelman treenihistoria ```ExerciseLog```-taulukkona
   */
  async getLastWorkoutResults(workoutId: number): Promise<ExerciseLog[]> {
    return database.getAllAsync(
      `SELECT * FROM exercise_log 
       WHERE workout_id = ? 
       AND date(date/1000, 'unixepoch') = date((SELECT MAX(date) FROM exercise_log WHERE workout_id = ?)/1000, 'unixepoch')
       ORDER BY exercise_id, set_number ASC`,
      [workoutId, workoutId]
    );
  },

  /**
   * Hakee liikkeen edellisen treenikerran tulokset
   * @param {number} exerciseId - Liikkeen id
   * @returns {Promise<ExerciseLog[]>} Liikkeen treenihistoria ```ExerciseLog```-taulukkona
   */
  async getLastExerciseResults(exerciseId: number): Promise<ExerciseLog[]> {
    return database.getAllAsync(
      `SELECT * FROM exercise_log WHERE exercise_id = ?
       AND date(date/1000, 'unixepoch') = date((SELECT MAX(date) FROM exercise_log WHERE exercise_id = ?)/1000, 'unixepoch')
       ORDER BY set_number ASC`,
      [exerciseId, exerciseId]
    );
  },

  /**
   * Hakee liikkeen parhaan tuloksen historiasta
   * @param {number} exerciseId - Liikkeen id
   * @returns {Promise<ExerciseLog[]>} Liikkeen paras nosto ```ExerciseLog```-objektina
   */
  async getExerciseMax(exerciseId: number): Promise<ExerciseLog | null> {
    return database.getFirstAsync<ExerciseLog>(
      `SELECT * FROM exercise_log 
       WHERE exercise_id = ? 
       ORDER BY weight DESC, reps DESC 
       LIMIT 1`,
      [exerciseId]
    )
  },

  async getAll() : Promise<ExerciseLog[]> {
    return database.getAllAsync(
      `SELECT * FROM exercise_log`
    )
  }
}