// types/types.ts
// Sovelluksessa ja tietokannassa esiintyvien datatyyppien mallit.

/**
 * Yksittäinen liike
 */
export type Exercise = {
  id: number
  name: string
  category: string
}

/**
 * Treeniohjelma, ei liikkeitä.
 */
export type Workout = {
  id: number
  name: string
  favorite: number            // 0 tai 1
}

/**
 * Treenihistoria
 */
export type ExerciseLog = {
  id?: number
  exercise_id: number         // Viittaus liikkeeseen
  workout_id: number          // Viittaus ohjelmaan
  weight: number
  reps: number                // Toistot
  set_number: number          // Monesko sarja oli kyseessä
  date: number                // Päivämäärä
}

/**
 * Ravinto.
 */
export type Nutrition = {
  id?: number
  name?: string
  date: number
  calories?: number
  protein?: number
  carbs?: number
  fats?: number
}

/**
 * Profiilin harvoin asetettavat tiedot
 */
export type Profile = {
  height: number,
  steps_goal: number,
  calories_goal: number
}

/**
 * Profiilin päivittäin asetettavat tiedot
 */
export type Daily = {
  weight?: number,
  daily_steps?: number,
  date: number
}

/**
 * Koostetyyppi
 * Treeniohjelma sisältäen liikkeet. Voi olla hyödyllinen.
 */
export type WorkoutWithExercises = {
  workout: Workout
  exercises: Exercise[]
}

