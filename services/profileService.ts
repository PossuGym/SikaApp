import { userRepository } from "../database/repositories/userRepository";
import { Profile } from "../types/types"

export const profileService = {

    async getUserProfile(): Promise<Profile|null> {
        return await userRepository.getUserProfile();
    },
    async updateStepsGoal(steps_goal: number): Promise<boolean> {
        const profile = await userRepository.getUserProfile();
        const height = profile?.height ?? 0;
        const calories_goal = profile?.calories_goal ?? 0;
        return await userRepository.saveUserProfile(height, steps_goal, calories_goal);
    },
}