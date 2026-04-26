import { StyleSheet, FlatList, View, SectionList } from "react-native";
import { Card, Surface, Text, useTheme } from "react-native-paper";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Theme } from '../../components/theme/Colors';
import { WorkoutItem } from "../../components/workout/WorkoutItem";
import { useTrainingSession } from "../../store/useTrainingSessionStore";
import { useWorkout } from "../../store/useWorkoutStore";
import { Workout } from "../../types/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { TrainingStackParamList } from "../../navigation/types";
import { HeaderCard } from "../../components/theme/HeaderCard";

export default function TrainingScreen() {
  const { getSections, toggleFavorite } = useWorkout();
  const theme = useTheme();
  const tabBarHeight = useBottomTabBarHeight();
  const { handleSelect } = useTrainingSession();
  const navigation = useNavigation<NativeStackNavigationProp<TrainingStackParamList>>();

  // Asettaa valitun treeniohjelman ja avaa kirjausnäkymän
  const openSession = (workout: Workout) => {
    handleSelect(workout);
    navigation.navigate("TrainingSession")
  }

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
          <HeaderCard title={title} style={styles.headerCard}/>
        )}
        ItemSeparatorComponent={() => <View style={{ height: Theme.spacing.md }} />}
        contentContainerStyle={[styles.listContent, { paddingBottom: tabBarHeight + Theme.spacing.xxl + 100}]}
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
  },
  headerCard: {
    marginVertical: Theme.spacing.lg,
  },
  listContent: {
    paddingBottom: 10,
    paddingTop: Theme.spacing.xs,
    marginHorizontal: Theme.spacing.lg,
  },
  sectionHeader: {
    paddingVertical: Theme.spacing.md,
    paddingTop: Theme.spacing.md,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: Theme.spacing.xxl,
    opacity: 0.5
  }
})