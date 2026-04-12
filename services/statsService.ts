import { database } from "../database/database";
import { userRepository } from "../database/repositories/userRepository";
import { Daily, Exercise } from "../types/types";

export const statsService = {

    // hakee painon ja askeleiden koko historian 
    async getAllDaily(): Promise<Daily[]> {
        return await userRepository.getAllDaily();
    },

    /**
     * Hakee kaikki liikkeet, joille on olemassa treenihistoriaa.
     * @returns {Promise<Exercise[]>} Taulukko Exercise-objekteja.
     */
    async getLoggedExercises(): Promise<Exercise[]> {
        return await database.getAllAsync<Exercise>(
            `SELECT DISTINCT e.id, e.name, e.category FROM exercise_log el
             JOIN exercise e ON el.exercise_id = e.id
             ORDER BY e.name ASC`
        );
    },
}