import { FlatList, StyleSheet, View } from 'react-native';
import { FAB, Surface } from 'react-native-paper';
import { useExercise } from '../hooks/useExercise';
import { ExerciseItem } from '../components/exercise/ExerciseItem';
import { ExerciseDialog } from '../components/exercise/ExerciseDialog';

/*
* UI tiedosto pysyy hyvin siistinä, kun kaikki toimintalogiikka/funktiot on eristetty muualle. 
*/
export default function ExercisesScreen() {
  const { 
    exercises, 
    isDialogVisible, 
    selectedExercise, 
    openCreateDialog, 
    openEditDialog, 
    closeDialog, 
    saveExercise,
    deleteExercise
  } = useExercise();

  return (
    <Surface style={styles.container} elevation={0}>

      {/* Lista liikkeistä, painamalla muokkausdialogi, ikonista poisto*/}
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseItem 
            item={item} 
            onClick={() => openEditDialog(item)}
            onDelete={() => deleteExercise(item.id)} 
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // Rako itemien väliin
      />

      {/* Floating Action Button, avaa uuden liikkeen luonnin dialogin */}
      <FAB
        icon="plus"
        customSize={64}
        style={styles.fab} // FABIN SIJAINTI, JÄÄ DEFAULTTINA NAVIGAATION ALLE
        onPress={openCreateDialog}
      />

      {/* Dialogi ExerciseDialog-komponentilla */}
      <ExerciseDialog 
        visible={isDialogVisible}
        data={selectedExercise}
        onSave={saveExercise}
        onDismiss={closeDialog}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  item: {
    marginBottom: 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 130
  },
});