// components/DemoDataButton.tsx
import { useState } from 'react';
import { Card, Button, useTheme } from 'react-native-paper';
import { Theme } from '../../components/theme/Colors';
import { StyleSheet, ToastAndroid } from 'react-native';
import { seedDatabase } from '../../database/seedDatabase';

export const DemoDataButton = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const handleLoadDemo = async () => {
    setLoading(true);
    try {
      // Ajetaan seedaus demo-datalla
      await seedDatabase(true);
      ToastAndroid.show("Testidata ladattu", ToastAndroid.SHORT);
    } catch (e) {
      ToastAndroid.show("Testidatan lataus epäonnistui", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card elevation={2}>
      <Card.Content>
        <Button
          style={styles.button}
          mode="contained"
          buttonColor={theme.colors.secondary}
          onPress={handleLoadDemo}
          loading={loading}
          disabled={loading}>
            {loading ? 'Ladataan...' : 'Lataa testidata'}
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: Theme.spacing.sm,
    marginHorizontal: Theme.spacing.xxl * 2,
  }
});