import { exerciseRepository } from "../database/repositories/exerciseRepository";
import { Exercise } from "../types/types";

/*
* Service tarkistaa käyttäjän syötteen sopivuuden ja varmistaa ettei tietokantaan tallenneta samaa liikettä useaan kertaan.
* Heittää virheen, jos tietokantapyyntö epäonnistui, tämä näytetään UI:ssa Alertilla käyttäjälle.
* Kaikki tietokantapyynnöt servicen funktiot on asynkronisia, joten ne pitää tehdä "await" operaattorin kanssa.
*/

export const exerciseService = {

  /**
   * Hakee kaikki liikkeet järjestettynä
   * @returns {Exercise[]} Taulukon ```Exercise``` tyypin objekteja
   */
  async getAll(): Promise<Exercise[]> {
    return await exerciseRepository.getExercises();
  },

  /**
   * Luo tai tallentaa liikkeen. Upsert eli toimii uuden luomiseen ja olemassaolevan tallennukseen.
   */
  async save(name: string, category: string, id?: number) {
    const cleanName = name.trim();

    if (!cleanName) {
      throw new Error("Liikkeellä täytyy olla nimi.")
    }
    const cleanCategory = category.trim();
    if (!cleanCategory) {
      throw new Error("Liikkeellä täytyy olla kategoria.")
    }

    // Tarkistetaan onko nimi jo käytössä
    const existing = await exerciseRepository.getExerciseByName(cleanName);
    if (existing && existing.id !== id) {
      throw new Error(`Liike "${cleanName}" on jo olemassa.`)
    }

    if (id) { // Jos id löytyy, päivitetään olemassa olevaa
      return await exerciseRepository.updateExercise(id, cleanName, cleanCategory);
    } else { // Muuten luodaan uusi
      return await exerciseRepository.createExercise(cleanName, cleanCategory);
    }
  },

  /**
   * Poistaa liikkeen tietokannasta
   * @param exerciseId Liikkeen id
   */
  async remove(exerciseId: number) {
    const success = await exerciseRepository.deleteExercise(exerciseId);
    
    if (!success) {
      throw new Error("Liikkeen poisto epäonnistui.")
    }
  }
}