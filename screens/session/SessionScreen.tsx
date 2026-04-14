import { StyleSheet, FlatList, View } from "react-native";
import { Surface, Text, FAB } from "react-native-paper";
import { useTrainingSession } from "../../store/useTrainingSessionStore";
import { SessionCard } from "../../components/trainingSession/SessionCard";
import { useNavigation } from "@react-navigation/native";

export default function SessionScreen() {
  const { selectedWorkout, exercises, endSession } = useTrainingSession();
  const navigation = useNavigation();

  const handleEndSession = () => {
    endSession();
    navigation.goBack();
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall">
          {selectedWorkout?.name ?? "Ei valittua ohjelmaa"}
        </Text>
      </View>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SessionCard item={item} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text variant="bodyMedium" style={styles.emptyText}>
            Ei valittua ohjelmaa
          </Text>
        }
      />

      {selectedWorkout && (
        <FAB
          icon="stop"
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
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 16,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 240,
    paddingTop: 8,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    opacity: 0.5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    left: 10,
    bottom: 130,
  },
});
