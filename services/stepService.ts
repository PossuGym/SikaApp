import { Pedometer } from 'expo-sensors';
import { userRepository } from '../database/repositories/userRepository';
import { getDayStartAndEnd } from './todayService';

type StepSubscription = {
  remove: () => void;
};

type StepPermissionStatus = {
  granted: boolean;
  canAskAgain: boolean;
};

export const stepService = {
  async isPedometerAvailable(): Promise<boolean> {
    return await Pedometer.isAvailableAsync();
  },

  async getPermissionStatus(): Promise<StepPermissionStatus> {
    const permission = await Pedometer.getPermissionsAsync();
    return {
      granted: permission.granted,
      canAskAgain: permission.canAskAgain,
    };
  },

  async ensurePermission(): Promise<boolean> {
    const currentPermission = await Pedometer.getPermissionsAsync();

    if (currentPermission.granted) {
      return true;
    }

    if (!currentPermission.canAskAgain) {
      return false;
    }

    const nextPermission = await Pedometer.requestPermissionsAsync();
    return nextPermission.granted;
  },

  async getTodayLiveSteps(dayTimestamp: number = Date.now()): Promise<number | null> {
    const { start, end } = getDayStartAndEnd(dayTimestamp);

    try {
      const result = await Pedometer.getStepCountAsync(new Date(start), new Date(end));
      return result.steps ?? 0;
    } catch {
      return null;
    }
  },

  async getTodayStoredSteps(dayTimestamp: number = Date.now()): Promise<number> {
    const { start, end } = getDayStartAndEnd(dayTimestamp);
    const daily = await userRepository.getDailyInRange(start, end);
    return daily?.daily_steps ?? 0;
  },

  async syncTodaySteps(steps: number, dayTimestamp: number = Date.now()): Promise<boolean> {
    const { start, end } = getDayStartAndEnd(dayTimestamp);
    const existingDaily = await userRepository.getDailyInRange(start, end);
    const dateKey = existingDaily?.date ?? start;
    return await userRepository.saveDailySteps(dateKey, Math.max(0, Math.floor(steps)));
  },

  watchLiveSteps(onStepUpdate: (stepsSinceSubscription: number) => void): StepSubscription {
    return Pedometer.watchStepCount((result) => {
      onStepUpdate(Math.max(0, result.steps ?? 0));
    });
  },
};
