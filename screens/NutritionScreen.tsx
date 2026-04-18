import { FlatList, StyleSheet, View } from 'react-native';
import { FAB, Surface, useTheme } from 'react-native-paper';
import { Theme } from '../components/theme/Colors';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNutrition } from '../hooks/UseNutrition';
import { NutritionItem } from '../components/nutrition/NutritionItem';
import { NutritionDialog } from '../components/nutrition/NutritionDialog';
import { NutritionSumCard } from '../components/nutrition/NutritionSumCards';
import { HeaderCard } from '../components/theme/HeaderCard';


/*
* UI tiedosto pysyy hyvin siistinä, kun kaikki toimintalogiikka/funktiot on eristetty muualle. 
*/
export default function NutritionScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const theme = useTheme();

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
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.cardContainer}>
        <NutritionSumCard
          item={caloriesFromMacros}
          progress={dailyProgressPercentage}
          protein={totals?.protein ?? 0}
          fats={totals?.fats ?? 0}
          carbs={totals?.carbs ?? 0}
      />
      </View>

      <HeaderCard title="Päivän ateriat" style={styles.headerCard} />
      <FlatList
        style={styles.listContainer}
        data={nutrition}
        renderItem={({ item }) => (
          <NutritionItem 
            item={item} 
            onClick={() => openEditDialog(item)}
            onDelete={(id) => deleteMeal(id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: Theme.spacing.md }} />} // Rako itemien väliin
      />
      {/* Floating Action Button, avaa uuden liikkeen luonnin dialogin */}
      <FAB
        icon="plus"
        customSize={64}
        style={styles.fab}
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
  },
  headerCard: {
    marginVertical: Theme.spacing.lg,
    marginHorizontal: Theme.spacing.lg,
  },
  cardContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
  },
  listContainer: {
    flex: 1,
    marginTop: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xxxl + Theme.fab.size,
  },
  item: {
    marginBottom: 10
  },
  fab: {
    position: 'absolute',
    margin: Theme.spacing.lg,
    right: Theme.spacing.sm,
    bottom: Theme.fab.bottom
  },
});
