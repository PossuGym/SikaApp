import { database } from './database'

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
    await createWorkoutSessionTable();
    await createWorkoutHistoryTable();
    await createUserInfoTable();
    await createNutritionTable();

    console.log('Tietokanta luotu.')
  } catch (error) {
    console.error('Tietokannan luominen epäonnistui: ', error)
  }
}

const createExerciseTable = async () => {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS exercise (
      id TEXT PRIMARY KEY NOT NULL,
      user_id TEXT NOT NULL,
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
      user_id TEXT
    );
  `)
}

const createWorkoutExerciseTable = async () => {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS workout_exercise (
      exercise_id TEXT NOT NULL,
      workout_id INTEGER NOT NULL,
      PRIMARY KEY(exercise_id, workout_id),
      FOREIGN KEY(exercise_id) REFERENCES exercise(id) ON DELETE CASCADE,
      FOREIGN KEY(workout_id) REFERENCES workout(id) ON DELETE CASCADE
    );
  `)
}

const createWorkoutSessionTable = async () => {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS workout_session (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      date INTEGER NOT NULL,
      workout_id INTEGER,
      user_id TEXT NOT NULL,
      FOREIGN KEY(workout_id) REFERENCES workout(id) ON DELETE CASCADE
    );
  `)
}

const createWorkoutHistoryTable = async () => {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS workout_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      timestamp INTEGER NOT NULL,
      exercise_id TEXT,
      weight REAL,
      reps INTEGER,
      session_id INTEGER,
      time REAL,
      user_id TEXT NOT NULL,
      FOREIGN KEY(exercise_id) REFERENCES exercise(id) ON DELETE SET NULL,
      FOREIGN KEY(session_id) REFERENCES workout_session(id) ON DELETE CASCADE
    );
  `)
}

const createUserInfoTable = async () => {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS user_info (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      user_id TEXT NOT NULL,
      weight TEXT NOT NULL,
      height REAL,
      time INTEGER,
      daily_steps INTEGER,
      steps_goal INTEGER,
      calories_goal INTEGER
    );
  `)
}

const createNutritionTable = async () => {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS nutrition (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      user_id TEXT NOT NULL,
      name TEXT,
      time INTEGER NOT NULL,
      calories INTEGER,
      protein REAL,
      carbs REAL,
      fats REAL
    );
  `)
}