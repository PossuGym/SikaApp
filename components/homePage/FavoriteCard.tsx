import { Card, IconButton, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Theme } from '../theme/Colors';
import { Exercise, Workout } from '../../types/types';



interface Props {
  item?: Workout;
  exercises?: Exercise[];
  onClick?: (workout?: Workout) => void;
  onFavorite?: (id?: number) => void;
}

export const FavoriteCard = ({ item, exercises, onClick, onFavorite }: Props) => {
    const theme = useTheme();

  if (!item) {
    return (
      <Card mode="outlined">
        <Card.Title title="Lisää suosikki" subtitle="Ei suosikkitreeniä" />
      </Card>
    );
  }

    return (
    <Card
      onPress={() => onClick && onClick(item)}
      mode="elevated"
      elevation={1}
      style={[styles.container, { borderColor: theme.colors.outline }]}
    >
      <Card.Title
        title={item.name}
        subtitle={<Text>Liikkeitä: {exercises?.length}</Text>}
        right={(props) => (
          <View style={{ flexDirection: 'row', gap: Theme.spacing.sm }}>
            {onFavorite && (
              <IconButton
                {...props}
                icon={item.favorite === 1 ? "star" : "star-outline"}
                iconColor={item.favorite === 1 ? theme.colors.primary : theme.colors.onSurfaceVariant}
                size={20}
                onPress={() => onFavorite && onFavorite(item.id)}
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
});

