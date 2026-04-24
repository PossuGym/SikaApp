import { View, StyleSheet } from "react-native";
import { Card, Surface, Text,  useTheme } from "react-native-paper";
import Timer from "../components/homePage/Timer";
import { FavoriteCard } from "../components/homePage/FavoriteCard";
import { StepProgressWidget } from "../components/homePage/StepProgressWidget";
import { useWorkout } from "../store/useWorkoutStore";
import { Theme } from "../components/theme/Colors";
import { HeaderCard } from "../components/theme/HeaderCard";

export function Homepage() {
  const theme = useTheme();
  const { workouts, exercises, toggleFavorite } = useWorkout();
  const favorites = workouts.filter((w) => w.favorite === 1);

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>

        <HeaderCard title="Suosikit" style={styles.headerCard}/>

        <View>
          {favorites.length === 0 ? (
            <Card mode="outlined">
              <Card.Title title="Lisää suosikki" subtitle="Ei suosikkitreeniä" />
            </Card>
          ) : (
            <View style={styles.favoriteCard}>
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
          </View>

        <View style={styles.widgetsContainer}>
          <HeaderCard title="Widgetit" style={styles.headerCard}/>
          <View style={styles.widgetsRow}>
            <Timer/>
            <StepProgressWidget />
          </View>
        </View>
    
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0
  },
  headerCard: {
    marginVertical: Theme.spacing.lg,
    marginHorizontal: Theme.spacing.lg,
  },
  header: {
    margin: Theme.spacing.lg,
    textAlign: "center",
  },
  favoriteCard: {
    marginBottom: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    flexDirection: 'column',
    gap: Theme.spacing.sm
  },
  widgetsContainer: {
    marginTop: Theme.spacing.lg,
  },
  widgetsRow: {
    marginHorizontal: Theme.spacing.lg,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Theme.spacing.md,
    alignItems: "center",
  },
});