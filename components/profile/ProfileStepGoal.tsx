import { Card, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export default function ProfileStepGoal() {
  return (
    <Card mode="outlined" style={styles.card}>
      <Card.Title title="Askeltavoite" titleStyle={styles.title} />
      <Card.Content>
        <View>
          <Text>jotain</Text>
        </View>
      </Card.Content>

    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
  },
});