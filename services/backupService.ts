import { supabase } from "../lib/supabase";
import { database } from "../database/database";
import { BackupData } from "../types/types";
import { exerciseLogService } from "./exerciseLogService";
import { exerciseService } from "./exerciseService";
import { nutritionService } from "./nutritionService";
import { profileService } from "./profileService";
import { statsService } from "./statsService";
import { workoutService } from "./workoutService";

export const backupService = {

  /**
   * Varmuuskopion luominen
   */
  async backup() : Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Haetaan kaikki lokaali data
    const [logs, exercises, workouts, workoutExercise, nutrition, daily, profile] =
      await Promise.all([
        exerciseLogService.getAll(),
        exerciseService.getAll(),
        workoutService.getAll(),
        workoutService.getWorkoutExercise(),
        nutritionService.getAll(),
        statsService.getAllDaily(),
        profileService.getUserProfile(),
      ]);

    // Apufunktio user_id:n lisäämiseen
    const addUserId = (rows: any[]) => rows.map(row => ({ ...row, user_id: user.id }));
    // Siivotaan profile supabaselle toimivaksi, ei tykkää singleton kentästä
    const cleanProfile = {
      height: profile?.height,
      steps_goal: profile?.steps_goal,
      calories_goal: profile?.calories_goal
    }

    console.log("Profile koko objekti: ", JSON.stringify(cleanProfile));

    // Upsertataan supabasen tietokantaan rinnakkain
    try {
      await Promise.all([
        supabase.from('user_profile').upsert({ ...cleanProfile, user_id: user.id }, { onConflict: 'user_id' }),
        supabase.from('user_daily').upsert(addUserId(daily), { onConflict: 'user_id, date' }),
        supabase.from('nutrition').upsert(addUserId(nutrition), { onConflict: 'user_id, id' }),
        supabase.from('exercise').upsert(addUserId(exercises), { onConflict: 'user_id, id' }),
        supabase.from('workout').upsert(addUserId(workouts), { onConflict: 'user_id, id' }),
        supabase.from('workout_exercise').upsert(addUserId(workoutExercise), { onConflict: 'user_id, exercise_id, workout_id' }),
        supabase.from('exercise_log').upsert(addUserId(logs), { onConflict: 'user_id, id' }),
      ]);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Varmuuskopion palautus
   */
  async restore(): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const [profile, daily, exercises, workouts, logs, workoutExercises, nutrition] =
      await Promise.all([
        supabase.from('user_profile').select('*').eq('user_id', user.id).single(),
        supabase.from('user_daily').select('*').eq('user_id', user.id),
        supabase.from('exercise').select('*').eq('user_id', user.id),
        supabase.from('workout').select('*').eq('user_id', user.id),
        supabase.from('exercise_log').select('*').eq('user_id', user.id),
        supabase.from('workout_exercise').select('*').eq('user_id', user.id),
        supabase.from('nutrition').select('*').eq('user_id', user.id),
      ]);

    const backup: BackupData = {
      profile: profile.data,
      daily: daily.data ?? [],
      nutrition: nutrition.data ?? [],
      workouts: workouts.data ?? [],
      exercises: exercises.data ?? [],
      workoutExercises: workoutExercises.data ?? [],
      exerciseLogs: logs.data ?? []
    }

    await this.replaceAll(backup); // Pyyhkii SQLiten ja kirjoittaa uudelleen
  },

  /**
   * Paikallisen datan ylikirjoitus
   */
  async replaceAll(data: BackupData): Promise<void> {
    try {
      await database.withTransactionAsync(async () => {

        // Poistetaan olemassaoleva data oikeassa järjestyksessä
        await database.runAsync('DELETE FROM nutrition');
        await database.runAsync('DELETE FROM exercise_log');
        await database.runAsync('DELETE FROM workout_exercise');
        await database.runAsync('DELETE FROM workout');
        await database.runAsync('DELETE FROM exercise');
        await database.runAsync('DELETE FROM user_daily');
        await database.runAsync('DELETE FROM user_profile');

        // Insertoidaan oikeassa järjestyksessä
        for (const row of data.exercises) {
          await database.runAsync(
            'INSERT INTO exercise (id, name, category) VALUES (?, ?, ?)',
            [row.id, row.name, row.category]
          );
        }
        for (const row of data.workouts) {
          await database.runAsync(
            'INSERT INTO workout (id, name, favorite) VALUES (?, ?, ?)',
            [row.id, row.name, row.favorite]
          );
        }
        for (const row of data.workoutExercises) {
          await database.runAsync(
            'INSERT INTO workout_exercise (exercise_id, workout_id) VALUES (?, ?)',
            [row.exercise_id, row.workout_id]
          );
        }
        for (const row of data.exerciseLogs) {
          await database.runAsync(
            'INSERT INTO exercise_log (id, workout_id, exercise_id, date, weight, reps, set_number) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [row.id, row.workout_id, row.exercise_id, row.date, row.weight, row.reps, row.set_number]
          );
        }
        for (const row of data.daily) {
          await database.runAsync(
            `INSERT INTO user_daily (weight, daily_steps, date) VALUES (?, ?, ?)`,
            [row.weight, row.daily_steps!, row.date]
          )
        }
        if (data.profile) {
          await database.runAsync(
            `INSERT INTO user_profile (height, steps_goal, calories_goal) VALUES (?, ?, ?)`,
            [data.profile.height, data.profile.steps_goal, data.profile.calories_goal]
          );
        }
        for (const row of data.nutrition) {
          await database.runAsync(
            'INSERT INTO nutrition (id, name, date, calories, protein, carbs, fats) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [row.id ?? null, row.name ?? null, row.date, row.calories ?? null,
            row.protein ?? null, row.carbs ?? null, row.fats ?? null]
          );
        }
      });
    } catch (error) {
      console.error("Virhe transaktiossa: ", error);
      throw error;
    }
  }
}