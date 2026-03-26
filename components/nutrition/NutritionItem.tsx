import { Card, IconButton } from 'react-native-paper';
import { Nutrition } from '../../types/types';

interface Props {
  item: Nutrition;
  onClick: (nutrition: Nutrition) => void;
  onDelete?: (id: number) => void;
}

/**
 * Yksittäisen liikkeen kortti poistonapilla.
 * Näyttää liikkeen nimen ja kategorian.
 * @param item ```Nutrition``` tyypin objekti
 * @param onDelete Välittää liikkeen id:n poistolle(Valinnainen).
 * @param onClick Välittää koko objektin painallustoiminnalle.
 * @example <NutrtitionItem item={ex} onClick={handleEdit} onDelete={handleDelete} />
 * <NutritionItem item={ex} onClick={handleSelect} />
 */
export const NutritionItem = ({ item, onClick, onDelete }: Props) => {
  return (
    <Card 
      mode="outlined"
      onPress={() => onClick(item)}
    >
      <Card.Title
        title={item.name}
        subtitle={new Date(item.date).toLocaleDateString()}
        right={(props) => onDelete ? ( // Poistonappi näytetään vain, jos sen toiminta välitetään propsina
          <IconButton 
            {...props} 
            icon="delete-outline" 
            iconColor="#B00020" 
            onPress={() => {
                if (item.id != null) onDelete?.(item.id);
            }}
          />
        ) : null }
      />
    </Card>
  );
};