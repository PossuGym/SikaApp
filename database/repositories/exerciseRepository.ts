import { database} from '../database'
import { Exercise } from '../../types/types'

/**
  CRUD-operaatiot tietokannan exercise-taululle.
*/

export const exerciseRepository = {

  /**
   * Hakee kaikki tietokannan liikkeet.
   * @returns {Promise<Exercise[]>} Taulukko liikkeitä tai tyhjä taulukko
   * @example const exercises = await exerciseRepository.getExercises()
   */
  async getExercises(): Promise<Exercise[]> {
    return database.getAllAsync<Exercise>(`SELECT * FROM exercise ORDER BY name ASC`)
  },

  /**
   * Hakee kategorian liikkeet.
   * @param {string} category - Kategorian nimi
   * @returns {Promise<Exercise[]>} Taulukko liikkeitä
   * @example const exercises = await exerciseRepository.getExercisesByCategory("Rinta")
   */
  async getExercisesByCategory(category: string): Promise<Exercise[]> {
    return database.getAllAsync<Exercise>(
      `SELECT * FROM exercise WHERE category = ?`,
      [category]
    )
  },

  /**
   * Luo uuden liikkeen.
   * @param {string} name - Liikkeen nimi
   * @param {string} category - Kategorian nimi
   * @returns {Promise<number>} Uuden liikkeen id
   * @example const newId = await exerciseRepository.createExercise("Penkkipunnerrus", "Rinta")
   */
  async createExercise(name: string, category: string): Promise<number> {
    const result = await database.runAsync(
      `INSERT INTO exercise (name, category) VALUES (?, ?)`,
      [name, category]
    )
    return result.lastInsertRowId
  },

  /**
   * Päivittää liikkeen, tarvittava jos käyttäjä haluaa nimetä liikkeen uudelleen tai vaihtaa kategoriaa.
   * @param {number} exerciseId - Liikkeen id
   * @param {string} name - Liikkeen uusi nimi
   * @param {string} category - Liikkeen uusi kategoria
   * @returns {Promise<boolean>} True, jos liike päivitettiin onnistuneesti
   * @example await exerciseRepository.updateExercise(exercise.id, "Kyykky", "Jalat")
   */
  async updateExercise(exerciseId: number, name: string, category: string): Promise<boolean> {
    const result = await database.runAsync(
      `UPDATE exercise SET name = ?, category = ? WHERE exerciseId = ?`,
      [name, category, exerciseId]
    )
    return result.changes > 0
  },

  /**
   * Poistaa liikkeen.
   * @param {number} exerciseId - Liikkeen id
   * @returns {Promise<boolean>} Palautaa true, jos liike poistettiin onnistuneesti.
   * @example await exerciseRepository.deleteExercise(exercise.id)
   */
  async deleteExercise(exerciseId: number): Promise<boolean>  {
    const result = await database.runAsync(
      `DELETE FROM exercise WHERE exerciseId = ?`,
      [exerciseId]
    )
    return result.changes > 0
  }
}



