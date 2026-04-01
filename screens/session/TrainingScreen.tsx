import { useWorkout } from "../../hooks/useWorkout";
import { StyleSheet, FlatList, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { WorkoutItem } from "../../components/workout/WorkoutItem";
import { useTrainingSessionStore } from "../../store/useTrainingSessionStore";

export default function TrainingScreen() {
  const { workouts, toggleFavorite } = useWorkout();
  const { handleOpen } = useTrainingSessionStore();

  return (
    <Surface style={styles.container} elevation={0}>
      <FlatList
        data={workouts}
        renderItem={({ item }) => (
          <WorkoutItem
            item={item}
            onClick={() => handleOpen(item)}
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
    )
}

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