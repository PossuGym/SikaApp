import { Card, Text, TextInput, Button } from 'react-native-paper';
import { StyleSheet, ToastAndroid, View, Keyboard } from 'react-native';
import { profileService } from '../../services/profileService';
import { useEffect, useState  } from 'react';

export const ProfileAccountDetails = ({ }) => {
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
    <Card mode="outlined" style={styles.card}>
      <Card.Title title="Salasana" titleStyle={styles.title} />
      <Card.Content>
        <View>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Anna uusi salasana"
          />

          <TextInput
            value={redoPassword}
            onChangeText={setRedoPassword}
            secureTextEntry
            placeholder="Kirjoita salasana uudelleen"
          />

          <Button
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
  card: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
  },
});