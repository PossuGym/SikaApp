import React, { useState, useRef, useEffect } from 'react';
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
            <Card mode="outlined" style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}>
             <Card.Content>
            <View>
                <Text style={[styles.timeText, { color: theme.colors.onSurface }]}>{time.toFixed(2).replace('.', ',')}s</Text>
                <View style={styles.buttonContainer}>

                    {running ? (
                        <TouchableOpacity
                            style={[styles.button, styles.pauseButton]}
                            onPress={pauseStopwatch}
                        >
                            <MaterialIcons name="pause" size={24} color="#fff" />
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TouchableOpacity
                                style={[styles.button, styles.startButton]}
                                onPress={startStopwatch}
                            >
                                <MaterialIcons name="play-arrow" size={24} color="#fff" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.resetButton]}
                                onPress={resetStopwatch}
                            >
                                <MaterialIcons name="refresh" size={24} color="#fff" />
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
        width: '40%',
        height: '10%',
        
       
    },

    timeText: {
        fontSize: 25,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#222',
    },

    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    button: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        margin: 5,
    },

    startButton: {
        backgroundColor: '#2ecc71',
    },

    pauseButton: {
        backgroundColor: '#f39c12',
    },

    resetButton: {
        backgroundColor: '#e74c3c',
    },

});

export default Timer;