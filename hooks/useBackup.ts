import { useState } from 'react';
import { backupService } from '../services/backupService';
import { ToastAndroid } from 'react-native';
import { useWorkout } from '../store/useWorkoutStore';

export const useBackup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBackup = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await backupService.backup();
      ToastAndroid.show("Varmuuskopio luotu", ToastAndroid.SHORT);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Varmuuskopiointi epäonnistui';
      setError(msg);
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await backupService.restore();
      // Päivitetään storen tilat palautuksen yhteydessä
      await useWorkout.getState().loadWorkouts();
      ToastAndroid.show("Palautus suoritettu", ToastAndroid.SHORT);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Palautus epäonnistui';
      setError(msg);
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleBackup,
    handleRestore,
    isLoading,
    error
  };
};