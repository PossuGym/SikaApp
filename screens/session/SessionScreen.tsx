import { StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";
import { useTrainingSession } from "../../store/useTrainingSessionStore";

export default function SessionScreen() {
  const { selectedWorkout } = useTrainingSession();

  return (
    <Surface style={styles.container} elevation={0}>
      <Text>Ohjelma: {selectedWorkout?.name ?? "ei valittu"}</Text>
    </Surface >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
})