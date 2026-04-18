import { StyleSheet, FlatList, View } from "react-native";
import { Surface, Card, Text, FAB, useTheme } from "react-native-paper";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Theme } from "../../components/theme/Colors";
import { useTrainingSession } from "../../store/useTrainingSessionStore";
import { SessionCard } from "../../components/trainingSession/SessionCard";
import { useNavigation } from "@react-navigation/native";

export default function SessionScreen() {
  const { selectedWorkout, exercises, endSession } = useTrainingSession();
  const navigation = useNavigation();
  const theme = useTheme();
  const tabBarHeight = useBottomTabBarHeight();

  const handleEndSession = () => {
    endSession();
    navigation.goBack();
  };

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SessionCard item={item} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: Theme.spacing.lg }} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, { paddingBottom: tabBarHeight + Theme.spacing.xxxl }]}
        ListEmptyComponent={
          <Text variant="bodyMedium" style={styles.emptyText}>
            Ei valittua ohjelmaa
          </Text>
        }
        ListHeaderComponent={
          <Card mode="elevated" elevation={1} style={[styles.headerCard, { borderColor: theme.colors.outline, backgroundColor: theme.colors.primaryContainer }]}>
            <Text variant="titleMedium" style={styles.header}>
              {selectedWorkout?.name ?? "Ei valittua ohjelmaa"} 
            </Text>
          </Card>
          
  }
      />

      {selectedWorkout && (
        <FAB
          icon="check"
          label="Lopeta treeni"
          style={styles.fab}
          onPress={handleEndSession}
        />
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCard: {
    borderRadius: Theme.radius.md,
    borderWidth: Theme.borderWidth.thin,
    marginVertical: Theme.spacing.lg,
  },
  header: {
    margin: Theme.spacing.lg,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 0,
    paddingTop: Theme.spacing.xs,
    marginHorizontal: Theme.spacing.lg,
  },
  emptyText: {
    textAlign: "center",
    marginTop: Theme.spacing.xxl,
    opacity: 0.5,
  },
  fab: {
    position: 'absolute',
    margin: Theme.spacing.lg,
    bottom: Theme.fab.bottom,
  },
});
