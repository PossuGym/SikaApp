import { database } from "../database";
import { Nutrition } from "../../types/types";

/**
 * CRUD-operaatiot ravintotaululle
 */
export const nutritionRepository = {
  
  /**
   *  luo uuden aterian
   */ 
  async createMeal (data: Nutrition): Promise<number> {
    const result = await database.runAsync(
      `INSERT INTO nutrition
          (name, date, calories, protein, carbs, fats)
          VALUES (?,?,?,?,?,?)`,
      [
        data.name ?? null,
        data.date,
        data.calories ?? null,
        data.protein ?? null,
        data.carbs ?? null,
        data.fats ?? null
      ]
    )

    return result.lastInsertRowId
  },

  /**
   *  hakee aterian id:n perusteella
   */

  async getMealById (id: number): Promise<Nutrition | null> {
    return await database.getFirstAsync<Nutrition | null>(
      `SELECT * FROM nutrition WHERE id = ?`, [id]
    )
  },


  /**
   *  hakee aterian aikajakson perusteella 
   */

  async getMealsByDate (start: number, end: number): Promise<Nutrition[]> {
    return await database.getAllAsync<Nutrition>(
      `SELECT * FROM nutrition WHERE date BETWEEN ? AND ? ORDER BY date DESC`, [start, end]
    )
  },

  /**
   *  poistaa aterian
   */
  

  async deleteMeal (id: number): Promise<boolean> {
    const result = await database.runAsync(
      `DELETE FROM nutrition WHERE id = ?`, [id]
    )
    return result.changes > 0
  },

  /**
   *  päivittää olemassaolevan aterian tiedot
   */ 

  async updateMeal(id: number, data: Partial<Nutrition>): Promise<boolean> {
    const current = await this.getMealById(id)
    if (!current) throw new Error('Meal not found')

    const result = await database.runAsync(
      `UPDATE nutrition SET
          name = ?,
          date = ?,
          calories = ?,
          protein = ?,
          carbs = ?,
          fats = ?
      WHERE id = ?`,
      [
        data.name ?? current.name ?? null,
        data.date ?? current.date,
        data.calories ?? current.calories ?? null,
        data.protein ?? current.protein ?? null,
        data.carbs ?? current.carbs ?? null,
        data.fats ?? current.fats ?? null,
        id
      ]
    )

    return result.changes > 0
  },

  async getAll(): Promise<Nutrition[]> {
    return database.getAllAsync(
      `SELECT * FROM nutrition`
    )
  }
}
