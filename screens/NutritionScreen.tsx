import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB, Surface } from 'react-native-paper';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNutrition } from '../hooks/UseNutrition';
import { NutritionItem } from '../components/nutrition/NutritionItem';
import { NutritionDialog } from '../components/nutrition/NutritionDialog';
import { NutritionSumCard } from '../components/nutrition/NutritionSumCards';


/*
* UI tiedosto pysyy hyvin siistinä, kun kaikki toimintalogiikka/funktiot on eristetty muualle. 
*/
export default function NutritionScreen() {
  const tabBarHeight = useBottomTabBarHeight();

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
    caloriesFromMacros,
    dailyProgressPercentage,
  } = useNutrition();

  return (
    <Surface style={styles.container} elevation={0}>
      <NutritionSumCard
        item={caloriesFromMacros}
        progress={dailyProgressPercentage}
        protein={totals?.protein ?? 0}
        fats={totals?.fats ?? 0}
        carbs={totals?.carbs ?? 0}
      />
      <SafeAreaView style={styles.listContainer} edges={['left', 'right']}>
      <FlatList
        data={nutrition}
        renderItem={({ item }) => (
          <NutritionItem 
            item={item} 
            onClick={() => openEditDialog(item)}
            onDelete={(id) => deleteMeal(id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: tabBarHeight + 110 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // Rako itemien väliin
      />
      </SafeAreaView>
      {/* Floating Action Button, avaa uuden liikkeen luonnin dialogin */}
      <FAB
        icon="plus"
        customSize={64}
        style={styles.fab} // Pidetään FAB tabbarin yläpuolella
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
    padding: 16,
  },
  listContainer: {
    flex: 1,
    marginTop: 12,
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
