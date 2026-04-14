import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { MaterialIcons } from "@expo/vector-icons";

export const Timer = () => {
  const theme = useTheme();
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);

  const startStopwatch = () => {
    startTimeRef.current = Date.now() - time * 1000;

    intervalRef.current = setInterval(() => {
      setTime((Date.now() - startTimeRef.current) / 1000);
    }, 50);

    setRunning(true);
  };

  const pauseStopwatch = () => {
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
  };

  const resetStopwatch = () => {
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTime(0);
    setRunning(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current != null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <Card 
      mode="elevated"
      style={styles.card}
      elevation={2}
    >
      <Card.Content>
        <View>
          <Text style={[styles.timeText, { color: theme.colors.onSurface }]}>{time.toFixed(2).replace('.', ',')}s</Text>
          <View style={styles.buttonContainer}>
            {running ? (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.colors.secondary }]}
                onPress={pauseStopwatch}
              >
                <MaterialIcons name="pause" size={24} color={theme.colors.onSecondary} />
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: theme.colors.primary }]}
                  onPress={startStopwatch}
                >
                  <MaterialIcons name="play-arrow" size={24} color={theme.colors.onPrimary} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: theme.colors.error }]}
                  onPress={resetStopwatch}
                >
                  <MaterialIcons name="refresh" size={24} color={theme.colors.onError} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  timeText: {
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    margin: 5,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Timer;