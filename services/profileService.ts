import { userRepository } from "../database/repositories/userRepository";
import { Daily, Profile } from "../types/types"
import { supabase } from "../lib/supabase";

export const profileService = {

    async getUserProfile(): Promise<Profile|null> {
        return await userRepository.getUserProfile();
    },
    async getStepsGoal(): Promise<number> {
        const profile = await userRepository.getUserProfile();
        return profile?.steps_goal ?? 0;
    },
    async updateHeight(height: number): Promise<boolean> {
        const profile = await userRepository.getUserProfile();
        const steps_goal = profile?.steps_goal ?? 0;
        const calories_goal = profile?.calories_goal ?? 0;
        return await userRepository.saveUserProfile(height, steps_goal, calories_goal);
    },
    async updateStepsGoal(steps_goal: number): Promise<boolean> {
        const profile = await userRepository.getUserProfile();
        const height = profile?.height ?? 0;
        const calories_goal = profile?.calories_goal ?? 0;
        return await userRepository.saveUserProfile(height, steps_goal, calories_goal);
    },
    async updateCaloriesGoal(calories_goal: number): Promise<boolean> {
        const profile = await userRepository.getUserProfile();
        const height = profile?.height ?? 0;
        const steps_goal = profile?.steps_goal ?? 0;
        return await userRepository.saveUserProfile(height, steps_goal, calories_goal);
    },

    async getCurrentWeight(): Promise<number | null> {
        const daily = await userRepository.getLatestDaily();
        return daily?.weight ?? null;
    },

    async updateCurrentWeight(weight: number): Promise<boolean> {
        const latestDaily: Daily | null = await userRepository.getLatestDaily();
        const date = latestDaily?.date ?? Date.now();
        const daily_steps = latestDaily?.daily_steps ?? 0;
        return await userRepository.saveDaily(date, weight, daily_steps);
    },

    async changePassword(newPassword: string): Promise<boolean> {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        return !error;
    },

    async getEmail(): Promise<string | null> {
        const { data, error } = await supabase.auth.getUser();
        if (error) return null;
        return data.user?.email ?? null;
    },
    
}