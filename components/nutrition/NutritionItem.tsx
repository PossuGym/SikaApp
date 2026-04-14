import { Card, IconButton, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
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
  const theme = useTheme();
  return (
    <Card
      mode="elevated"
      elevation={2}
      style={[styles.container, { borderColor: theme.colors.outline }]}
      onPress={() => onClick(item)}
    >
      <Card.Title
        title={item.name}
        subtitle={new Date(item.date).toLocaleDateString()}
        right={(props) => onDelete ? ( // Poistonappi näytetään vain, jos sen toiminta välitetään propsina
          <IconButton
            {...props}
            icon="delete-outline"
            iconColor={theme.colors.error}
            onPress={() => {
              if (item.id != null) onDelete?.(item.id);
            }}
          />
        ) : null}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1
  },
  deleteButton: {
    marginRight: 4,
  },
});