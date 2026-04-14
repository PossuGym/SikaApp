import { Card, IconButton, Text, useTheme } from 'react-native-paper';
import { View } from 'react-native';
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
      mode="outlined"
      onPress={() => onClick && onClick(item)}
    >
      <Card.Title
        title={item.name}
        subtitle={<Text>Liikkeitä: {exercises?.length}</Text>}
        right={(props) => (
          <View style={{ flexDirection: 'row' }}>
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

