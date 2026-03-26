import { FlatList, StyleSheet, View } from 'react-native';
import { FAB, Surface } from 'react-native-paper';
import { useNutrition } from '../hooks/UseNutrition';
import { NutritionItem } from '../components/nutrition/NutritionItem';
import { NutritionDialog } from '../components/nutrition/NutritionDialog';
import { NutritionSumCard } from '../components/nutrition/NutritionSumCards';


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
    deleteMeal,
    totals,
    caloriesFromMacros
  } = useNutrition();



  const headerDate = nutrition.length > 0
    ? new Date(nutrition[0].date).toLocaleDateString()
    : new Date().toLocaleDateString();

  return (
    <Surface style={styles.container} elevation={0}>
      <NutritionSumCard
        calories={caloriesFromMacros}
        protein={totals?.protein ?? 0}
        fats={totals?.fats ?? 0}
        carbs={totals?.carbs ?? 0}
      />

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
