import { Card, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Exercise } from '../../types/types';
import { SetRow } from './SetRow';
import { LogItem } from './LogItem'
import { useTrainingSession } from '../../store/useTrainingSessionStore';

interface Props {
  item: Exercise;
}

/**
 * Näyttää liikkeen edellisen treenin tulokset, sekä sisältää aktiivisen treenin kirjauksen liikkeelle
 * @param param item ```Exercise```-objekti
 * @returns 
 */
export const SessionCard = ({ item }: Props) => {
  const theme = useTheme();
  const { currentSession, lastSessionResults } = useTrainingSession();
  const exerciseLogs = currentSession.filter((log) => log.exercise_id === item.id);
  const previousSets = lastSessionResults[item.id] ?? [];

  return (
    <Card mode="elevated" elevation={2}>
      <Card.Title title={item.name} />
      <Card.Content>
        {/* Edellinen treeni */}
        {previousSets.length > 0 && (
          <View style={styles.previousRow}>
            <Text variant="bodySmall" style={styles.previousText}>Edellinen treeni:</Text>
            {previousSets.map((set) => (
              <Text key={set.id} variant="bodySmall" style={styles.previousText}>
                {set.weight}kgx{set.reps}
              </Text>
            ))}
          </View>
        )}

        {/* Otsikkorivi */}
        <View style={styles.headerRow}>
          <Text variant="bodySmall" style={styles.headerNo}>#</Text>
          <Text variant="bodySmall" style={styles.headerText}>Paino</Text>
          <Text variant="bodySmall" style={styles.headerText}>Toistot</Text>
        </View>

        {/* Tallennetut sarjat */}
        <View style={styles.logContainer}>
          {exerciseLogs.map((log) => (
            <LogItem key={log.id} item={log} />
          ))}
        </View>

        {/* Uuden sarjan syöttö */}
        <SetRow
          exerciseId={item.id}
          setNumber={exerciseLogs.length + 1}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  previousRow: {
    flexDirection: 'column',
    marginBottom: 10,
    marginTop: -14
  },
  previousText: {
    opacity: 0.5,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
    marginRight: 95
  },
  headerNo: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: 16
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
  },
  logContainer: {
    paddingVertical: 5,
  }
});