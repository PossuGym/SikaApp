import { useState, useEffect, useCallback } from "react";
import { profileService } from "../services/profileService";
import { Profile } from "../types/types";
import { Alert } from "react-native";



export const useProfile = () => {

    const loadProfile = useCallback(async () => {
        try {
        const data = await profileService.getUserProfile();
        } catch (error: any) {
        Alert.alert("Virhe, tavoitteen haku epäonnistui.");
        }
    }, []);
    
    useEffect(() => { loadProfile(); }, [loadProfile]);
    

}