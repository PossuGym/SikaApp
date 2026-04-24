import { useCallback, useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Linking } from 'react-native';
import { Platform } from 'react-native';
import { profileService } from '../services/profileService';
import { stepService } from '../services/stepService';
import { calculateStepsProgressPercentage } from '../services/todaysCaloryCalculator';

type StepSource = 'live' | 'database';

type StepProgressState = {
  steps: number;
  goal: number;
  progress: number;
  source: StepSource;
  isLoading: boolean;
  isSensorAvailable: boolean;
  permissionGranted: boolean;
  canAskPermission: boolean;
  error: string | null;
};

const REFRESH_MS = 15000;

export const useStepProgress = () => {
  const isFocused = useIsFocused();
  const mountedRef = useRef(true);
  const watchBaseStepsRef = useRef(0);
  const autoPermissionAttemptedRef = useRef(false);
  const [state, setState] = useState<StepProgressState>({
    steps: 0,
    goal: 0,
    progress: 0,
    source: 'database',
    isLoading: true,
    isSensorAvailable: false,
    permissionGranted: false,
    canAskPermission: false,
    error: null,
  });

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const applySnapshot = useCallback(
    (
      steps: number,
      goal: number,
      source: StepSource,
      isSensorAvailable: boolean,
      permissionGranted: boolean,
      canAskPermission: boolean,
      error: string | null
    ) => {
      if (!mountedRef.current) return;

      setState({
        steps,
        goal,
        progress: calculateStepsProgressPercentage(steps, goal),
        source,
        isLoading: false,
        isSensorAvailable,
        permissionGranted,
        canAskPermission,
        error,
      });
    },
    []
  );

  const getPermissionDeniedMessage = useCallback(
    (canAskAgain: boolean) => {
      if (canAskAgain) {
        return 'Liiketunnistuksen lupa puuttuu.';
      }

      if (Platform.OS === 'ios') {
        return 'Liiketunnistus estetty.';
      }

      return 'Liiketunnistus estetty.';
    },
    []
  );

  const refresh = useCallback(async (autoRequestPermission = true) => {
    if (!mountedRef.current) return;

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const goal = await profileService.getStepsGoal();
      const isSensorAvailable = await stepService.isPedometerAvailable();

      if (isSensorAvailable) {
        let permission = await stepService.getPermissionStatus();
        const permissionGranted = permission.granted;

        if (!permissionGranted && permission.canAskAgain && autoRequestPermission && !autoPermissionAttemptedRef.current) {
          autoPermissionAttemptedRef.current = true;
          await stepService.ensurePermission();
          permission = await stepService.getPermissionStatus();
        }

        if (permission.granted) {
          const grantedLiveSteps = await stepService.getTodayLiveSteps();

          if (grantedLiveSteps != null) {
            await stepService.syncTodaySteps(grantedLiveSteps);
            watchBaseStepsRef.current = grantedLiveSteps;

            applySnapshot(
              grantedLiveSteps,
              goal,
              'live',
              isSensorAvailable,
              permission.granted,
              permission.canAskAgain,
              null
            );
            return;
          }

          const storedSteps = await stepService.getTodayStoredSteps();
          watchBaseStepsRef.current = storedSteps;

          applySnapshot(
            storedSteps,
            goal,
            'live',
            isSensorAvailable,
            permission.granted,
            permission.canAskAgain,
            null
          );
          return;
        }

        const storedSteps = await stepService.getTodayStoredSteps();
        watchBaseStepsRef.current = storedSteps;

        applySnapshot(
          storedSteps,
          goal,
          'database',
          isSensorAvailable,
          permission.granted,
          permission.canAskAgain,
          getPermissionDeniedMessage(permission.canAskAgain)
        );
        return;
      }

      const storedSteps = await stepService.getTodayStoredSteps();
      watchBaseStepsRef.current = storedSteps;

      applySnapshot(
        storedSteps,
        goal,
        'database',
        isSensorAvailable,
        false,
        false,
        'Pedometer ei ole saatavilla tällä laitteella.'
      );
    } catch {
      const goal = await profileService.getStepsGoal();
      const storedSteps = await stepService.getTodayStoredSteps();
      watchBaseStepsRef.current = storedSteps;

      applySnapshot(storedSteps, goal, 'database', false, false, false, 'Askelten päivitys epäonnistui.');
    }
  }, [applySnapshot, getPermissionDeniedMessage]);

  const openSettings = useCallback(async () => {
    await Linking.openSettings();
  }, []);

  useEffect(() => {
    if (!isFocused) return;

    autoPermissionAttemptedRef.current = false;
    refresh(true);

    const subscription = stepService.watchLiveSteps(async (stepsSinceSubscription) => {
      if (!mountedRef.current) return;

      setState((prev) => {
        if (!prev.permissionGranted || !prev.isSensorAvailable) {
          return prev;
        }

        const liveSteps = watchBaseStepsRef.current + stepsSinceSubscription;
        return {
          ...prev,
          steps: liveSteps,
          progress: calculateStepsProgressPercentage(liveSteps, prev.goal),
          source: 'live',
          error: null,
        };
      });

      const liveSteps = watchBaseStepsRef.current + stepsSinceSubscription;
      await stepService.syncTodaySteps(liveSteps);
    });

    const interval = setInterval(() => {
      refresh(false);
    }, REFRESH_MS);

    return () => {
      subscription.remove();
      clearInterval(interval);
    };
  }, [isFocused, refresh]);

  return {
    ...state,
    refresh,
    openSettings,
  };
};
