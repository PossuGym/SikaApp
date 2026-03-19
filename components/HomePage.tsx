import * as React from "react";
import { View } from "react-native";
import { Button, Text, Card } from "react-native-paper";

export function Homepage() {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text variant="headlineSmall">Material 3</Text>

      <Card>
        <Card.Title title="Card title" />
        <Card.Content>
          <Text variant="bodyMedium">This is a Material 3 styled card.</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="text">Cancel</Button>
          <Button mode="contained">OK</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}