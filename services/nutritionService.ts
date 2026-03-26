import { nutritionRepository } from "../database/repositories/nutritionRepository";
import { Nutrition } from "../types/types";

export const nutritionService = {

/**
 * Hakee kaikki liikkeet järjestettynä
 * @returns {Nutrition[]} Taulukon ```Exercise``` tyypin objekteja
 */

    async getAll(): Promise<Nutrition[]> {
      return await nutritionRepository.getMealsByDate(0, Date.now());
    },



    async save(name: string, date: number,  calories:number, protein: number, carbs: number, fats: number,  id?: number) {
      const cleanName = name.trim();
      if (!cleanName) {
        throw new Error("Ruualla täytyy olla nimi.")
      }
      if (!calories) { 
        throw new Error("syötä calorit")
      }
      if (!protein) { 
      throw new Error("Proteiini")
      }
      if (! carbs) {
      throw new Error("Hiilarit")
      }
      if (! fats) {
      throw new Error("Rasvat")
      }



     const existing = id ? await nutritionRepository.getMealById(id) : null;
     if (existing && existing.id !== id) {
       throw new Error(`Ruoka "${cleanName}" on jo olemassa.`)
     }
     if (id) { // Jos id löytyy, päivitetään olemassa olevaa
       return await nutritionRepository.updateMeal(id, {name,date,calories,protein,carbs,fats});
     } else { // Muuten luodaan uusi
       return await nutritionRepository.createMeal({name,date,calories,protein,carbs,fats});
     }
},

/**
 * Poistaa liikkeen tietokannasta
 * @param exerciseId Liikkeen id
 */
async remove(nutritionId: number) {
  const success = await nutritionRepository.deleteMeal(nutritionId);
  
  if (!success) {
    throw new Error("Ruoan poisto epäonnistui.")
  }
}









}