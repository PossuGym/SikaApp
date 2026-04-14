import { StyleSheet, View } from "react-native";
import { FAB, Surface, Text } from 'react-native-paper';
import { FlatList } from "react-native";
import { useWorkout } from "../store/useWorkoutStore";
import { WorkoutItem } from "../components/workout/WorkoutItem";
import { WorkoutDialog } from "../components/workout/WorkoutDialog";
import { useExercise } from "../hooks/useExercise";

export default function WorkoutScreen() {
  const { 
    exercises,
    workouts,
    exercises: workoutExercises,
    selectedWorkout,
    isDialogVisible,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    saveWorkout,
    deleteWorkout,
    toggleFavorite
  } = useWorkout();

  const { exercises: allExercises } = useExercise();

  return (
    <Surface style={styles.container}>
      {/* Treeniohjelmien lista, suosikit ensin */}
      <FlatList
        data={workouts}
        renderItem={({ item }) => (
          <WorkoutItem
            item={item}
            exercises={workoutExercises[item.id] ?? []}
            onClick={() => openEditDialog(item)}
            onDelete={() => deleteWorkout(item.id)}
            onFavorite={() => toggleFavorite(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text variant="bodyMedium" style={styles.emptyText}>
            Ei treeniohjelmia
          </Text>
        }
      />
      
      {/* Floating Action Button, avaa uuden liikkeen luonnin dialogin */}
      <FAB
        icon="plus"
        customSize={64}
        style={styles.fab}
        onPress={openCreateDialog}
      />

      {/* Dialogi luomiselle ja muokkaukselle*/}
      <WorkoutDialog
        visible={isDialogVisible}
        workout={selectedWorkout}
        workoutExercises={selectedWorkout ? workoutExercises[selectedWorkout.id] : null}
        allExercises={allExercises}
        onSave={saveWorkout}
        onDismiss={closeDialog}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 200,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    opacity: 0.5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 130
  },
});