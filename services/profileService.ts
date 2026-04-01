import { userRepository } from "../database/repositories/userRepository";
import { Profile } from "../types/types"

export const profileService = {

    async getUserProfile(): Promise<Profile|null> {
        return await userRepository.getUserProfile();
    },
}