import { Card, IconButton, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Exercise, Workout } from '../../types/types';

interface Props {
  item: Workout;
  exercises?: Exercise[];
  onClick: (workout: Workout) => void;
  onDelete?: (id: number) => void;
  onFavorite?: (id: number) => void;
}

export const WorkoutItem = ({ item, exercises, onClick, onDelete, onFavorite }: Props) => {
  const theme = useTheme();

  return (
    <Card
      mode="elevated"
      elevation={2}
      style={[styles.container, { borderColor: item.favorite === 1 ? theme.colors.primary : theme.colors.outline }]}
      onPress={() => onClick(item)}
    >
      <Card.Title
        title={item.name}
        subtitle={`Liikkeitä: ${exercises?.length ?? 0}`}
        subtitleStyle={styles.subtitle}
        right={(props) => (
          <View style={{ flexDirection: 'row' }}>
            {onFavorite && (
              <IconButton
                {...props}
                icon={item.favorite === 1 ? "star" : "star-outline"}
                iconColor={item.favorite === 1 ? theme.colors.primary : theme.colors.onSurfaceVariant}
                size={20}
                onPress={() => onFavorite(item.id)}
              />
            )}
            {onDelete && (
              <IconButton
                {...props}
                icon="delete-outline"
                iconColor={theme.colors.error}
                size={20}
                onPress={() => onDelete(item.id)}
              />
            )}
          </View>
        )}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.8,
    marginTop: -2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
  },
});