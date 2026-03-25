import { FlatList, StyleSheet, View, Text } from 'react-native';
import { FAB, Surface } from 'react-native-paper';
import { useNutrition } from '../hooks/UseNutrition';
import { NutritionItem } from '../components/nutrition/NutritionItem';
import { NutritionDialog } from '../components/nutrition/NutritionDialog';

/*
* UI tiedosto pysyy hyvin siistinä, kun kaikki toimintalogiikka/funktiot on eristetty muualle. 
*/
export default function NutritionScreen() {
  const { 
    nutrition, 
    isDialogVisible, 
    selectedNutrition, 
    openCreateDialog, 
    openEditDialog, 
    closeDialog, 
    saveNutrition,
    deleteMeal
  } = useNutrition();

  return (
    <Surface style={styles.container} elevation={0}>

      {/* Lista liikkeistä, painamalla muokkausdialogi, ikonista poisto*/}
      <FlatList
        data={nutrition}
        renderItem={({ item }) => (
          <NutritionItem 
            item={item} 
            onClick={() => openEditDialog(item)}
            onDelete={(id) => deleteMeal(id)}
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
      <NutritionDialog 
        visible={isDialogVisible}
        data={selectedNutrition}
        onSave={saveNutrition}
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
