import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, FlatList, View, Modal, TouchableWithoutFeedback} from 'react-native';
import { TextInput, Text, Button, useTheme, Divider } from 'react-native-paper';
import { Exercise, Workout } from '../../types/types';
import { ExerciseItem } from '../exercise/ExerciseItem';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onSave: (name: string, exercises: Exercise[], id?: number) => Promise<boolean>;
  workout: Workout | null;
  workoutExercises: Exercise[] | null;
  allExercises: Exercise[];
}

export const WorkoutDialog = ({ visible, onDismiss, onSave, workout, workoutExercises, allExercises }: Props) => {
  const theme = useTheme();

  const [name, setName] = useState('');
  const [selected, setSelected] = useState<Exercise[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryListVisible, setCategoryListVisible] = useState(false);

  // Liikkeiden kategoriat
  const categories = [...new Set(allExercises.map(e => e.category))];

  useEffect(() => {
    if (visible && workout) {
      setName(workout.name);
      setSelected(workoutExercises ?? [])
    } else if (visible) {
      setName('');
      setSelected([]);
    }
    setSelectedCategory(null);
  }, [visible, workout]);

  const isSelected = (exercise: Exercise) =>
    selected.some(e => e.id === exercise.id);

  const addExercise = (exercise: Exercise) => {
    if (!isSelected(exercise)) setSelected(prev => [...prev, exercise]);
    setSelectedCategory(null);
  };

   const removeExercise = (exercise: Exercise) => {
    setSelected(prev => prev.filter(e => e.id !== exercise.id));
  };

  // Kategoriavalinnan perusteella näytettävät liikkeet
  const filteredExercises = allExercises.filter(e =>
    e.category === selectedCategory && !isSelected(e)
  );

   // Tallennus
  const handleSave = async () => {
    const success = await onSave(name, selected, workout?.id);
    if (success) onDismiss();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={[styles.dialogContainer, { backgroundColor: theme.colors.elevation.level3 }]}>
        {/* Otsikko */}
        <Text variant="titleLarge" style={styles.title}>
          {workout ? "Muokkaa ohjelmaa" : "Uusi ohjelma"}
        </Text>

        {/* Sisältö */}
        <View style={styles.content}>
          <TextInput
            label="Ohjelman nimi"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
          />

          {/* Kategorian valintanappi */}
          <Button
            mode="outlined"
            onPress={() => setCategoryListVisible(prev => !prev)}
            icon={categoryListVisible ? "chevron-up" : "chevron-down"}
            style={styles.dropdownButton}
          >
            {selectedCategory ?? "Valitse kategoria"}
          </Button>

          {/* Leijuva dropdown kategorialista */}
          {categoryListVisible && (
            <View style={[styles.categoryList, { 
              backgroundColor: theme.colors.elevation.level4,
              borderColor: theme.colors.outline 
            }]}>
              {categories.map((cat, index) => (
                <View key={cat}>
                  <Button
                    mode="text"
                    contentStyle={{ padding: 5 }}
                    onPress={() => {
                      setSelectedCategory(cat);
                      setCategoryListVisible(false);
                    }}
                  >
                    {cat}
                  </Button>
                  {index < categories.length - 1 && <Divider />}
                </View>
              ))}
            </View>
          )}

          {/* Valintalista kategorian liikkeistä */}
          {selectedCategory && (
            <View style={styles.exercisesList}>
              {/* Teksti ja takaisin nappi */}
              <View style={styles.listHeader}>
                <Text variant="titleSmall" style={{ opacity: 0.8 }}>Valitse liike</Text>
                <Button
                  mode="outlined"
                  onPress={() => setSelectedCategory(null)}
                >
                  Takaisin  
                </Button>
              </View>
              {/* Lista */}
              <FlatList
                data={filteredExercises}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <ExerciseItem
                    item={item}
                    onClick={() => addExercise(item)}
                  />
                )}
                ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>Ei liikkeitä</Text>
                }
              />
            </View>
          )}

          {/* Valitut liikkeet */}
          {!selectedCategory && (
            <View style={{ flex: 1 }}>
              <View style={styles.listHeader}>
                <Text variant="titleSmall" style={{ opacity: 0.8 }}>Valitut liikkeet: {selected.length}</Text>
              </View>
          
            <FlatList
              data={selected}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <ExerciseItem
                  item={item}
                  onClick={() => removeExercise(item)}
                  onDelete={() => removeExercise(item)}
                />
              )}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              ListEmptyComponent={
                <Text variant="bodySmall" style={styles.emptyText}>Ei lisättäviä liikkeitä</Text>
              }
            />
          </View>
          )}
        </View>

        {/* Napit */}
        <View style={styles.actions}>
          <Button onPress={onDismiss}>Peruuta</Button>
          <Button mode="outlined" onPress={handleSave}>
            {workout ? "Tallenna muutokset" : "Lisää"}
          </Button>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dialogContainer: {
    position: 'absolute',
    top: '7%',
    left: '4%',
    right: '4%',
    height: SCREEN_HEIGHT * 0.8,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
    flexDirection: 'column',
  },
  title: {
    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
  input: {
    marginBottom: 12,
  },
  dropdownButton: {
    marginBottom: 8,
  },
  categoryList: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderRadius: 8,
    borderWidth: 1,
    elevation: 10,
    padding: 4,
  },
  exercisesList: {
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingLeft: 8,
    marginTop: 4,
    height: 40,
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.5,
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 8,
    paddingBottom: 8,
    gap: 8,
  },
});
