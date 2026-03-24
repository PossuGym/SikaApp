import { useState, useEffect, useCallback } from "react";
import { exerciseService } from "../services/exerciseService";
import { Exercise } from "../types/types";
import { Alert } from "react-native";


/**
 * useExercise-hook. Sisältää kaikki tilat ja toiminnallisuudet UI:lle.
 */
export const useExercise = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]); // Kaikki liikkeet
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null); // Valittu liike
  const [isDialogVisible, setIsDialogVisible] = useState(false); // Dialogi
  const [searchQuery, setSearchQuery] = useState(''); // Hakupalkki

  // --- Ladataan tietokannasta kaikki liikkeet exercises tilamuuttujaan ---
  // Servicestä kutsuttavat funktiot laitetaan try-catch lohkoon, jotta saadaan servicestä mahdollisesti heitetty virhe!
  const loadExercises = useCallback(async () => {
    try {
      const data = await exerciseService.getAll();
      setExercises(data);
    } catch (error: any) {
      Alert.alert("Virhe", "Liikkeiden lataus epäonnistui.");
    }
  }, [])

  // --- Lataus tapahtuu heti näkymän auetessa ---
  useEffect(() => { loadExercises(); }, [loadExercises]);

  // Suodatetut liikkeet
  const filteredExercises = exercises.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Liikkeiden määrä
  const exerciseCount = filteredExercises.length;


  // --- TOIMINNOT ---
  // Liikkeen tallennus, toimii luomiselle ja muokkaamiselle.
  const saveExercise = async (name: string, category: string, id?: number) => {
    try {
      await exerciseService.save(name, category, id);
      await loadExercises(); // Päivitä liikelista tallennuksen jälkeen.
      return true;
    } catch (error: any) {
      Alert.alert("Virhe", error.message); // error.message näyttää servicessä heitetyn virheen.
      return false;
    }
  };

  // Liikkeen poisto varmistusboksilla
  const deleteExercise = async (id: number) => {
    Alert.alert("Poista liike", "Haluatko varmasti poistaa liikkeen?", [
      { text: "Peruuta" },
      {
        text: "Poista",
        onPress: async () => {
          await exerciseService.remove(id);
          loadExercises();
        }
      }
    ]);
  };

  // Muotoiltu liikelista SectionList komponentille
  const getSections = () => { 
    const groups = filteredExercises.reduce((acc, exercise) => {
      const category = exercise.category || 'Muut';
      if (!acc[category]) acc[category] = []; // Lisätään kategoriat taulukkoon
      acc[category].push(exercise); // Lisätään liike-objekti kategoriaan
      return acc;
    }, {} as Record<string, Exercise[]>); // Record<Keys, Type>

    // Muutetaan objekti muoton [{title, data[]}]
    return Object.entries(groups)
      .map(([title, data]) => ({ title, data }))
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  // Dialogi
  const openCreateDialog = () => {
    setSelectedExercise(null);
    setIsDialogVisible(true);
  };

  const openEditDialog = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsDialogVisible(true);
  };

  const closeDialog = () => setIsDialogVisible(false);

  // Koukun käytettävät tilat ja toiminnot
  return {
    exercises: filteredExercises,
    selectedExercise,
    isDialogVisible,
    searchQuery,
    exerciseCount,
    setSearchQuery,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    saveExercise,
    deleteExercise,
    getSections
  };
}