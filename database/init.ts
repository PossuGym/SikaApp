import { database } from './database'
import { seedDatabase } from './seedDatabase';
 
/* 
  Tietokannan skeema ja luonti
  Taulut omissa funktioissaan ja luonti initDatabase()-funktiossa.
*/
 
export const initDatabase = async () => {
  try {
    // Tätä tarvii, jotta ON DELETE CASCADE toimii
    await database.execAsync(`PRAGMA foreign_keys = ON;`);
 
    await createExerciseTable();
    await createWorkoutTable();
    await createWorkoutExerciseTable();
    await createExerciseLogTable();
    await createUserProfileTable();
    await createUserDailyTable();
    await createNutritionTable();

    // Seedataan vain jos tietokanta on tyhjä
    const result = await database.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM exercise'
    );
    if (result?.count === 0) {
      await seedDatabase();
    }
 
    console.log('Tietokanta luotu.')
  } catch (error) {
    console.error('Tietokannan luominen epäonnistui: ', error)
  }
}
 
const createExerciseTable = async () => {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS exercise (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL
    );
  `)
}
 
const createWorkoutTable = async () => {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS workout (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT NOT NULL,
      favorite INTEGER NOT NULL DEFAULT 0
    );
  `)
}
 
const createWorkoutExerciseTable = async () => {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS workout_exercise (
      exercise_id INTEGER NOT NULL,
      workout_id INTEGER NOT NULL,
      PRIMARY KEY(exercise_id, workout_id),
      FOREIGN KEY(exercise_id) REFERENCES exercise(id) ON DELETE CASCADE,
      FOREIGN KEY(workout_id) REFERENCES workout(id) ON DELETE CASCADE
    );
  `)
}
 
const createExerciseLogTable = async () => {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS exercise_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      workout_id INTEGER NOT NULL,
      exercise_id INTEGER NOT NULL,
      date INTEGER NOT NULL,
      weight REAL,
      reps INTEGER,
      set_number INTEGER,
      FOREIGN KEY(workout_id) REFERENCES workout(id) ON DELETE CASCADE,
      FOREIGN KEY(exercise_id) REFERENCES exercise(id) ON DELETE CASCADE
    );
  `)
}
 
const createUserProfileTable = async () => {
  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS user_profile (
      singleton INTEGER PRIMARY KEY CHECK (singleton = 1),
      height REAL,
      steps_goal INTEGER,
      calories_goal INTEGER
    );
  `)
}

const createUserDailyTable = async () => {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS user_daily (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      weight REAL,
      daily_steps INTEGER,
      date INTEGER NOT NULL UNIQUE
    );
  `)
}
 
const createNutritionTable = async () => {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS nutrition (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT,
      date INTEGER NOT NULL,
      calories INTEGER,
      protein REAL,
      carbs REAL,
      fats REAL
    );
  `)
}