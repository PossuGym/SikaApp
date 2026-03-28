import { Card, IconButton, useTheme } from 'react-native-paper';
import { Exercise } from '../../types/types';

interface Props {
  item: Exercise;
  onClick: (exercise: Exercise) => void;
  onDelete?: (id: number) => void;
}

/**
 * Yksittäisen liikkeen kortti poistonapilla.
 * Näyttää liikkeen nimen ja kategorian.
 * @param item ```Exercise``` tyypin objekti
 * @param onDelete Välittää liikkeen id:n poistolle(Valinnainen).
 * @param onClick Välittää koko objektin painallustoiminnalle.
 * @example <ExerciseItem item={ex} onClick={handleEdit} onDelete={handleDelete} />
 * <ExerciseItem item={ex} onClick={handleSelect} />
 */
export const ExerciseItem = ({ item, onClick, onDelete }: Props) => {
  const theme = useTheme();

  return (
    <Card 
      mode="outlined"
      onPress={() => onClick(item)}
    >
      <Card.Title
        title={item.name}
        right={(props) => onDelete ? ( // Poistonappi näytetään vain, jos sen toiminta välitetään propsina
          <IconButton 
            {...props} 
            icon="delete-outline" 
            iconColor={theme.colors.error}
            size={20}
            onPress={() => onDelete(item.id)} 
          />
        ) : null }
      />
    </Card>
  );
};