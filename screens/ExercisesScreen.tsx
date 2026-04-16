import { SectionList, StyleSheet, View } from 'react-native';
import { FAB, Searchbar, Surface, Text, useTheme } from 'react-native-paper';
import { Theme } from '../components/theme/Colors';
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
  const theme = useTheme();

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]} elevation={0}>
      <Searchbar
        style={[styles.searchBar, { backgroundColor: theme.colors.elevation.level2 }]}
        placeholder="Etsi liikkeitä"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      <Text style={styles.subheading}>Liikkeitä: {exerciseCount}</Text>

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
            <View style={[styles.sectionAccent, { backgroundColor: theme.colors.primary }]} />
            <Text variant="labelLarge">{title.toUpperCase()}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={styles.sectionList}
      />

      {/* Floating Action Button, avaa uuden liikkeen luonnin dialogin */}
      <FAB
        icon="plus"
        customSize={64}
        style={styles.fab}
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
  },
  searchBar: {
    marginVertical: Theme.spacing.sm,
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.radius.md,
  },
  sectionList: {
    paddingHorizontal: Theme.spacing.lg
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    paddingVertical: 4
  },
  sectionAccent: {
    width: 6,
    height: 24,
    borderRadius: 2,
    marginRight: Theme.spacing.sm,
  },
  subheading: {
    alignSelf: 'flex-end',
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.xs,
    opacity: 0.6,
    fontSize: 12,
  },
  listContent: {
    paddingBottom: Theme.spacing.xxxl + Theme.fab.size,
  },
  fab: {
    position: 'absolute',
    margin: Theme.spacing.lg,
    right: Theme.spacing.sm,
    bottom: Theme.fab.bottom
  },
});