import { StyleSheet, FlatList, View, SectionList } from "react-native";
import { Surface, Text } from "react-native-paper";
import { WorkoutItem } from "../../components/workout/WorkoutItem";
import { useTrainingSession } from "../../store/useTrainingSessionStore";
import { useWorkout } from "../../store/useWorkoutStore";
import { Workout } from "../../types/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { TrainingStackParamList } from "../../navigation/types";

export default function TrainingScreen() {
  const { getSections, toggleFavorite } = useWorkout();
  const { handleSelect } = useTrainingSession();
  const navigation = useNavigation<NativeStackNavigationProp<TrainingStackParamList>>();

  // Asettaa valitun treeniohjelman ja avaa kirjausnäkymän
  const openSession = (workout: Workout) => {
    handleSelect(workout);
    navigation.navigate("TrainingSession")
  }

  return (
    <Surface style={styles.container}>
      <SectionList
        sections={getSections()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <WorkoutItem
            item={item}
            onClick={() => openSession(item)}
            onFavorite={() => toggleFavorite(item.id)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium">{title}</Text>
          </View>
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
  sectionHeader: {
    paddingVertical: 11,
    paddingTop: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    opacity: 0.5
  }
})