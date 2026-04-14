import { StyleSheet, FlatList, View } from "react-native";
import { Surface, Card, Text, FAB, useTheme } from "react-native-paper";
import { useTrainingSession } from "../../store/useTrainingSessionStore";
import { SessionCard } from "../../components/trainingSession/SessionCard";
import { useNavigation } from "@react-navigation/native";

export default function SessionScreen() {
  const { selectedWorkout, exercises, endSession } = useTrainingSession();
  const navigation = useNavigation();
  const theme = useTheme();

  const handleEndSession = () => {
    endSession();
    navigation.goBack();
  };

  return (
    <Surface style={styles.container}>
      
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SessionCard item={item} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text variant="bodyMedium" style={styles.emptyText}>
            Ei valittua ohjelmaa
          </Text>
        }
        ListHeaderComponent={
          <Card style={styles.headerCard}>
            <Text variant="bodyLarge" style={styles.header}>
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
    marginVertical: 16,
  },
  header: {
    margin: 16,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 240,
    paddingTop: 8,
    marginHorizontal: 16,
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
