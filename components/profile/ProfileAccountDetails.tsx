import { Card, TextInput, Button, useTheme } from 'react-native-paper';
import { StyleSheet, ToastAndroid, View, Keyboard } from 'react-native';
import { profileService } from '../../services/profileService';
import { useState  } from 'react';

export const ProfileAccountDetails = ({ }) => {
  const theme = useTheme();
  const [password, setPassword] = useState('');
  const [redoPassword, setRedoPassword] = useState('');

  const handleSave = async () => {
    if (!password || password !== redoPassword) {
      console.log('Salasanat eivät täsmää');
      ToastAndroid.show('Salasanat eivät täsmää', ToastAndroid.SHORT);
      return;
    }

    try {
      const success = await profileService.changePassword(password);
      if (success) {
        console.log('Salasana tallennettu!');
        ToastAndroid.show('Salasana tallennettu', ToastAndroid.SHORT);
        setPassword('');
        setRedoPassword('');
        Keyboard.dismiss();
      } else {
        console.log('Tallennus epäonnistui');
        ToastAndroid.show('Tallennus epäonnistui', ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('Tallennusvirhe', err);
      ToastAndroid.show('Tallennusvirhe', ToastAndroid.SHORT);
    }
  };

  return (
    <Card mode="elevated" elevation={2}>
      <Card.Title title="Salasana" titleVariant='titleMedium'/>
      <Card.Content>
        <View>
          <TextInput
            mode='outlined'
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Anna uusi salasana"
          />

          <TextInput
            mode='outlined'
            style={styles.input}
            value={redoPassword}
            onChangeText={setRedoPassword}
            secureTextEntry
            placeholder="Kirjoita salasana uudelleen"
          />

          <Button
            style={styles.button}
            mode="contained"
            onPress={handleSave}
          >
            Tallenna
          </Button>
        </View>
      </Card.Content>

    </Card>
  );
}

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
  button: {
    marginVertical: 8,
    marginHorizontal: 64,
  }
});