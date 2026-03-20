import * as React from "react";
import { View, Alert, useWindowDimensions } from "react-native";
import { Button, Text, Card } from "react-native-paper";
import { supabase } from "../lib/supabase";

export function Homepage() {
  const [loading, setLoading] = React.useState(false);
  const squareTexts = [
  "0,00sek\nStart",
  "Lisää ruoka\n\nProteiini: 0%\nHiilarit: 0%",
  "Lisää/Selaa\nTreenejä",
  "Askeleet\n0%",
];
  const { width } = useWindowDimensions();
  const horizontalPadding = 32;
  const squareGap = 20;
  const squareSize = Math.min(110, (width - horizontalPadding - squareGap) / 2);

  const handleSignOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert("Sign out failed", error.message);
    setLoading(false);
  };

  return (
    <View style={{ padding: 16, gap: 12, }}>
      <Text variant="headlineSmall" style={{ textAlign: "center", alignSelf: "center" }}>
        Koti
      </Text>

      {/* Lisää suosikkitreenit tähän */}

      <View style={{ gap: squareGap, alignItems: "center" }}>
        {[0, 1].map((row) => (
          <View key={row} style={{ flexDirection: "row", gap: squareGap }}>
            {squareTexts.slice(row * 2, row * 2 + 2).map((item, index) => (
              <View
                key={`${row}-${index}`}
                style={{
                  width: squareSize,
                  height: squareSize,
                  backgroundColor: "#EDDEDE",
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#1F1F1F", fontSize: 18, fontWeight: "600", textAlign: "center" }}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <Button mode="outlined" onPress={handleSignOut} loading={loading} disabled={loading}>
        Sign out
      </Button>
    </View>
  );
}