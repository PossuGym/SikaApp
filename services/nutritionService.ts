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
      if (calories == null || Number.isNaN(calories) || calories < 0) { 
        throw new Error("Syötä kalorit")
      }
      if (protein == null || Number.isNaN(protein) || protein < 0) { 
      throw new Error("Syötä proteiini")
      }
      if (carbs == null || Number.isNaN(carbs) || carbs < 0) {
      throw new Error("Syötä hiilihydraatit")
      }
      if (fats == null || Number.isNaN(fats) || fats < 0) {
      throw new Error("Syötä rasvat")
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
 * Poistaa ruoan tietokannasta
 * @param nutritionId Ruuan id
 */
async remove(nutritionId: number) {
  const success = await nutritionRepository.deleteMeal(nutritionId);
  
  if (!success) {
    throw new Error("Ruoan poisto epäonnistui.")
  }
}









}