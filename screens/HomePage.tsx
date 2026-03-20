import * as React from "react";
import { View, Alert } from "react-native";
import { Button, Text, Card } from "react-native-paper";
import { supabase } from "../lib/supabase";

export function Homepage() {
  const [loading, setLoading] = React.useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert("Sign out failed", error.message);
    setLoading(false);
  };

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

      <Button mode="outlined" onPress={handleSignOut} loading={loading} disabled={loading}>
        Sign out
      </Button>
    </View>
  );
}