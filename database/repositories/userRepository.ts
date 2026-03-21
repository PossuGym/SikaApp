import { database } from "../database";
import { Profile, Daily } from "../../types/types";

/**
 * CRUD-operaatiot käyttäjätiedoille
 */

export const userRepository = {

  /**
   * tallentaa käyttäjätiedot
  */
  async saveUserProfile(height: number, steps_goal: number, calories_goal: number): Promise<boolean> {
    const result = await database.runAsync(
      `INSERT INTO user_profile (singleton, height, steps_goal, calories_goal)
        VALUES (1, ?, ?, ?)
        ON CONFLICT(singleton) DO UPDATE SET
          height = excluded.height,
          steps_goal = excluded.steps_goal,
          calories_goal = excluded.calories_goal;`,
        [height, steps_goal, calories_goal]
      );
      return result.changes > 0

  },

  /**
   * hakee käyttäjätiedot
   */
  async getUserProfile(): Promise<Profile | null> {
    return await database.getFirstAsync<Profile | null>(`SELECT * FROM user_profile WHERE singleton = 1`)
  },

  /**
   * hae käyttäjän päivittäiset tiedot päivän perusteella
   */
  async getDaily(date: number): Promise<Daily | null> {
    return await database.getFirstAsync<Daily | null>(
      `SELECT * FROM user_daily WHERE date = ?`, [date]
    );
  },

  /**
   * hae käyttäjän päivittäisten tietojen koko historia
   */
  async getAllDaily(): Promise<Daily[]> {
    return await database.getAllAsync<Daily>(
      `SELECT * FROM user_daily ORDER BY date ASC`
    );
  },

  /**
   * hae viimeisimmät päivätiedot
   */
  async getLatestDaily(): Promise<Daily |null> {
    return await database.getFirstAsync<Daily>(
      `SELECT * FROM user_daily ORDER BY date DESC LIMIT 1`
    );
  },

  /**
   * poista päivämäärän perusteella
   */
  async deleteDaily(date: number): Promise<boolean> {
    const result = await database.runAsync(`DELETE FROM user_daily WHERE date = ?`,
      [date]
    );
    return result.changes > 0
  },

  /**
   * UPSERT funktio (update ja insert yhdessä) 
   * luo taulun, jos päivämäärälle ei ole jo taulua. Päivittää jos päivämäärälle on jo taulu 
   */
  async saveDaily(date: number, weight: number, daily_steps: number): Promise<boolean> {
    const result = await database.runAsync(
      `INSERT INTO user_daily (weight, daily_steps, date)
      VALUES (?, ?, ?) ON CONFLICT(date) DO UPDATE SET
        weight = excluded.weight,
        daily_steps = excluded.daily_steps`,
        [weight ?? null, daily_steps ?? null, date]
    );
    return result.changes > 0
  }
}