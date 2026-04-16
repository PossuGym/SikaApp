import { StyleSheet, View, FlatList } from "react-native";
import { FAB, Surface, Text, useTheme } from 'react-native-paper';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Theme } from '../components/theme/Colors';
import { useWorkout } from "../store/useWorkoutStore";
import { WorkoutItem } from "../components/workout/WorkoutItem";
import { WorkoutDialog } from "../components/workout/WorkoutDialog";
import { useExercise } from "../hooks/useExercise";

export default function WorkoutScreen() {
  const theme = useTheme();
  const tabBarHeight = useBottomTabBarHeight();
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
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]} elevation={0}> 
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
        ItemSeparatorComponent={() => <View style={{ height: Theme.spacing.lg }} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
    paddingBottom: Theme.spacing.xxxl + Theme.fab.size,
    paddingTop: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: Theme.spacing.xxl,
    opacity: 0.5,
  },
  fab: {
    position: 'absolute',
    margin: Theme.spacing.lg,
    right: Theme.spacing.sm,
    bottom: Theme.fab.bottom
  },
});
