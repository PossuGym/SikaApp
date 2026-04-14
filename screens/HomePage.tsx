import { View } from "react-native";
import { Text, Card, Surface } from "react-native-paper";
import Timer from "../components/homePage/Timer";
import { FavoriteCard } from "../components/homePage/FavoriteCard";
import { useWorkout } from "../store/useWorkoutStore";

export function Homepage() {
  const { workouts, exercises, toggleFavorite } = useWorkout();
  const favorites = workouts.filter((w) => w.favorite === 1);

  return (
    <Surface style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text variant="headlineSmall" style={{ textAlign: "center", alignSelf: "center" }}>
        Koti
      </Text>

      {favorites.length === 0 ? (
        <Card mode="outlined">
          <Card.Title title="Lisää suosikki" subtitle="Ei suosikkitreeniä" />
        </Card>
      ) : (
        <View style={{ flexDirection: 'column', gap: 8 }}>
          {favorites.map((favorite) => (
            <FavoriteCard
              key={favorite.id}
              item={favorite}
              exercises={exercises[favorite.id]}
              onClick={() => {}}
              onFavorite={() => toggleFavorite(favorite.id)}
            />
          ))}
        </View>
      )}

      <Timer>
      </Timer>
    
    </Surface>
  );
}