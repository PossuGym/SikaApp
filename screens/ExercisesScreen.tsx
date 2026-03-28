import { SectionList, StyleSheet, View } from 'react-native';
import { FAB, Searchbar, Surface, Text } from 'react-native-paper';
import { useExercise } from '../hooks/useExercise';
import { ExerciseItem } from '../components/exercise/ExerciseItem';
import { ExerciseDialog } from '../components/exercise/ExerciseDialog';

/*
* UI tiedosto pysyy hyvin siistinä, kun kaikki toimintalogiikka/funktiot on eristetty muualle. 
*/
export default function ExercisesScreen() {
  const { 
    isDialogVisible,
    selectedExercise,
    searchQuery,
    exerciseCount,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    saveExercise,
    deleteExercise,
    getSections,
    setSearchQuery
  } = useExercise();

  return (
    <Surface style={styles.container}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Etsi liikkeitä"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      {/* Liikelista kategorioittain */}
      <SectionList
        sections={getSections()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExerciseItem
            item={item}
            onClick={() => openEditDialog(item)}
            onDelete={() => deleteExercise(item.id)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium">{title}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        SectionSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<Text style={styles.subheading}>Liikkeitä: {exerciseCount}</Text>}
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
    paddingHorizontal: 16,
  },
  searchBar: {
    marginBottom: 8,
  },
  sectionHeader: {
    paddingVertical: 4,
  },
  subheading: {
    alignSelf: 'flex-end',
    marginTop: 16,
    marginBottom: -24,
  },
  listContent: {
    paddingBottom: 200,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 130
  },
});