import { Card, IconButton, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Theme } from '../theme/Colors';
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
      elevation={1}
      style={[styles.container, { borderColor: theme.colors.outline }]}
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
    borderRadius: Theme.radius.md,
    borderWidth: Theme.borderWidth.thick,
  },
  subtitle: {
    fontSize: Theme.typography.sizes.xs,
    opacity: 0.8,
    marginTop: -Theme.spacing.xs / 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Theme.spacing.xs,
  },
});