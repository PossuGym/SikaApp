import { database } from '../database'
import { Exercise, Workout, WorkoutExercise } from '../../types/types'
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
   * Hakee ohjelman id:n perusteella
   * @returns Palauttaa ```Workout``` tai null
   */
  async getWorkoutById(workoutId: number): Promise<Workout | null> {
    return database.getFirstAsync<Workout>(
      `SELECT * FROM workout WHERE id = ?`,
      [workoutId]
    )
  },

   /**
   * Hakee ohjelman nimellä
   * @returns {Promise<Workout | null>} Palauttaa joko löytyneen ohjelman tai null
   */
  async getWorkoutByName(name: string): Promise<Workout | null> {
    return database.getFirstAsync<Workout>(
      `SELECT * FROM workout WHERE name = ?`,
      [name]
    )
  },

  /**
   * Luo uuden ohjelman
   * @param {string} name - Ohjelman nimi
   * @param {Exercises[]} exercises - Liikkeet taulukkona
   * @returns {Promise<number>} Luodun ohjelman id
   * @example workoutRepository.createWorkout("Rintapäivä", exercises)
   */
  async createWorkout(name: string, exercises: Exercise[]): Promise<number> {
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
      for (const exercise of exercises) {
        await database.runAsync(
          `INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (?, ?)`,
          [workoutId, exercise.id]
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
      INNER JOIN workout_exercise we ON e.id = we.exercise_id
      WHERE we.workout_id = ?`,
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
      `DELETE FROM workout_exercise WHERE workout_id = ? AND exercise_id = ?`,
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

  async getFavorites(): Promise<Workout[]> {
    return database.getAllAsync<Workout>(
      `SELECT * FROM workout WHERE favorite = 1`,
    )
  },

  /**
   * Muuttaa ohjelman suosikkitilaa 0/1
   * @param workoutId Ohjelman id
   * @param isFavorite true/false
   */
  async setFavorite(workoutId: number, isFavorite: boolean) {
    await database.runAsync(
      `UPDATE workout SET favorite = ? WHERE id = ?`,
      [isFavorite ? 1 : 0, workoutId]
    );
  },

  /**
   * Päivittää ohjelman nimen.
   */
  async updateWorkoutName(id: number, name: string): Promise<boolean> {
    const result = await database.runAsync(
      `UPDATE workout SET name = ? WHERE id = ?`,
      [name, id]
    );
    return result.changes > 0;
  },

  /**
   * Tyhjentää kaikki liikkeet tietystä ohjelmasta (liitostaulusta).
   */
  async removeAllExercisesFromWorkout(workoutId: number): Promise<void> {
    await database.runAsync(
      `DELETE FROM workout_exercise WHERE workout_id = ?`,
      [workoutId]
    );
  },

  async getAll(): Promise<WorkoutExercise[]> {
    return database.getAllAsync(
      `SELECT * FROM workout_exercise`
    );
  }
}