import { userRepository } from "../database/repositories/userRepository";
import { Daily } from "../types/types";

export const statsService = {

    // hakee painon ja askeleiden koko historian 
    async getAllDaily(): Promise<Daily[]> {
        return await userRepository.getAllDaily();
    },
}