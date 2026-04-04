import { StyleSheet, FlatList, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { WorkoutItem } from "../../components/workout/WorkoutItem";
import { useTrainingSession } from "../../store/useTrainingSessionStore";
import { useWorkout } from "../../store/useWorkoutStore";
import { Workout } from "../../types/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { TrainingStackParamList } from "../../navigation/types";

export default function TrainingScreen() {
  const { workouts, toggleFavorite } = useWorkout();
  const { handleSelect } = useTrainingSession();
  const navigation = useNavigation<NativeStackNavigationProp<TrainingStackParamList>>();

  // Asettaa valitun treeniohjelman ja avaa kirjausnäkymän
  const openSession = (workout: Workout) => {
    handleSelect(workout);
    navigation.navigate("TrainingSession")
  }

  return (
    <Surface style={styles.container} elevation={0}>
      <FlatList
        data={workouts}
        renderItem={({ item }) => (
          <WorkoutItem
            item={item}
            onClick={() => openSession(item)}
            onFavorite={() => toggleFavorite(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text variant="bodyMedium" style={styles.emptyText}>
            Ei treeniohjelmia
          </Text>
        }
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  listContent: {
    paddingBottom: 200,
    paddingTop: 8
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    opacity: 0.5
  }
})