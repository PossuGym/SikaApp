import { useState, useEffect, useCallback } from "react";
import { nutritionService } from "../services/nutritionService";
import { Nutrition } from "../types/types";
import { Alert } from "react-native";
import { calculateDailyMacrosTotal, calculateCalories } from '../services/todaysCaloryCalculator';

/**
 * useExercise-hook. Sisältää kaikki tilat ja toiminnallisuudet UI:lle.
 */
export const useNutrition = () => {
  const [nutrition, setNutrition] = useState<Nutrition[]>([]); // Kaikki ruuat
  const [selectedNutrition, setSelectedNutrition] = useState<Nutrition | null>(null); // Valittu ruoka
  const [isDialogVisible, setIsDialogVisible] = useState(false); // Dialogi


  // --- Ladataan tietokannasta kaikki ruuvat nutrions tilamuuttujaan ---
  // Servicestä kutsuttavat funktiot laitetaan try-catch lohkoon, jotta saadaan servicestä mahdollisesti heitetty virhe!
  const loadNutrition = useCallback(async () => {
    try {
      const data = await nutritionService.getAll();
      setNutrition(data);
    } catch (error: any) {
      Alert.alert("Virhe", "Ruuan lataus epäonnistui.");
    }
  }, [])


  // --- Lataus tapahtuu heti näkymän auetessa ---
  useEffect(() => { loadNutrition(); }, [loadNutrition]);




  // --- TOIMINNOT ---
  // Dialogi
  const openCreateDialog = () => {
    setSelectedNutrition(null);
    setIsDialogVisible(true);
  };


  const openEditDialog = (nutrition: Nutrition) => {
    setSelectedNutrition(nutrition);
    setIsDialogVisible(true);
  };


  const closeDialog = () => setIsDialogVisible(false);


  // Ruuan tallennus, toimii luomiselle ja muokkaamiselle.
  const saveNutrition = async (name: string, date: number,  calories:number, protein: number, carbs: number, fats: number, id?: number) => {
    try {
      await nutritionService.save(name, date, calories, protein, carbs, fats, id);
      await loadNutrition(); // Päivitä liikelista tallennuksen jälkeen.
      return true;
    } catch (error: any) {
      Alert.alert("Virhe", error.message); // error.message näyttää servicessä heitetyn virheen.
      return false;
    }
  };


  // Liikkeen poisto varmistusboksilla
  const deleteMeal = async (id: number) => {
    Alert.alert("Poista ruoka", "Haluatko varmasti poistaa ruuan?", [
      { text: "Peruuta" },
      {
        text: "Poista",
        onPress: async () => {
          await nutritionService.remove(id);
          loadNutrition();
        }
      }
    ]);
  };


  const totals = calculateDailyMacrosTotal(nutrition);
  
  const caloriesFromMacros = calculateCalories({
    protein: totals.protein ?? 0,
    carbs: totals.carbs ?? 0,
    fats: totals.fats ?? 0,
  });



  // Koukun käytettävät tilat ja toiminnot
  return {
    nutrition,
    selectedNutrition,
    isDialogVisible,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    saveNutrition,
    deleteMeal,
    totals,
    caloriesFromMacros
  };
}