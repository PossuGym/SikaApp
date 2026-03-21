import { database} from '../database'
import { Exercise, Workout } from '../../types/types'
/** 
 * CRUD-operaatiot treeniohjelmalle.
 */

export const workoutRepository = {
  
  /**
   * Hakee kaikki ohjelmat.
   * @returns {Promise<Workout[]>} Taulukon treeniohjelmia(ilman liikkeitä)
   * @example const workouts = await workoutRepository.getWorkouts()
   */
  async getWorkouts(): Promise<Workout[]> {
    return database.getAllAsync<Workout>(`SELECT * FROM workout ORDER BY name ASC`);
  },

  /**
   * Luo uuden ohjelman
   * @param {string} name - Ohjelman nimi
   * @param {number[]} exerciseIds - Liikkeiden id:t taulukkona
   * @returns {Promise<number>} Luodun ohjelman id
   * @example workoutRepository.createWorkout("Rintapäivä", exercises)
   */
  async createWorkout(name: string, exerciseIds: number[]): Promise<number> {
    // Transaktio, koska joutuu käsittelemään useampaa taulua
    await database.execAsync("BEGIN")

    try {
      // Luodaan ohjelma workout tauluun
      const workout = await database.runAsync(
        `INSERT INTO workout (name) VALUES (?)`,
        [name]
      )
      const workoutId = workout.lastInsertRowId;

      // Luodaan liitos workout_exercise
      for (const exercise of exerciseIds) {
        await database.runAsync(
          `INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (?, ?)`,
          [workoutId, exercise]
        );
      }

      await database.execAsync("COMMIT");
      return workoutId;

    } catch (error) { // ROLLBACK, jos menee pieleen
      await database.execAsync("ROLLBACK");
      throw error;
    }
  },
  
  /**
   * Lisää yksittäisen liikkeen ohjelmaan
   * @param {number} workoutId - Ohjelman id
   * @param {number} exerciseId - Liikkeen id
   * @returns {Promise<boolean>} True, jos liikkeen lisääminen onnistui
   * @example workoutRepository.addExerciseToWorkout(workoutId, exerciseId)
   */
  async addExerciseToWorkout(workoutId: number, exerciseId: number): Promise<boolean> {
    const result = await database.runAsync(
      `INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (?, ?)`,
      [workoutId, exerciseId]
    );
    return result.changes > 0;
  },

  /**
   * Hakee ohjelmaan kuuluvat liikkeet
   * @param {number} workoutId - Ohjelman id
   * @returns {Promise<Exercise[]>} Taulukko liikkeitä tai tyhjä taulukko
   * @example const exercises = workoutRepository.getWorkoutExercises(workoutId)
   */
  async getWorkoutExercises(workoutId: number): Promise<Exercise[]> {
    return database.getAllAsync<Exercise>(
      `SELECT e.* FROM exercise e
      INNER JOIN workout_exercise we ON e.id = we.exerciseId
      WHERE w.workoutId = ?`,
      [workoutId]
    )
  },

  /**
   * Poistaa liikkeen ohjelmasta
   * @param {number} workoutId - Ohjelman id
   * @param {number} exerciseId - Liikkeen id
   * @returns {Promise<boolean>} True, jos liikkeen poisto onnistui
   * @example workoutRepository.removeExerciseFromWorkout(workoutId, exerciseId)
   */
  async removeExerciseFromWorkout(workoutId: number, exerciseId: number): Promise<boolean> {
    const result = await database.runAsync(
      `DELETE FROM workout_exercise WHERE workoutId = ? AND exerciseId = ?`,
      [workoutId, exerciseId]
    )
    return result.changes > 0
  },

  /**
   * Poistaa ohjelman
   * @param {number} workoutId 
   * @returns {Promise<boolean>} True, jos ohjelman poisto onnistui
   */
  async deleteWorkout(workoutId: number): Promise<boolean> {
    const result = await database.runAsync(
      `DELETE FROM workout WHERE id = ?`,
      [workoutId]
    );
    return result.changes > 0
  },

}