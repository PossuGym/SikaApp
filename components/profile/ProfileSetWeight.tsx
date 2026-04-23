import { Card, TextInput, IconButton } from 'react-native-paper';
import { StyleSheet, ToastAndroid, View, Keyboard, Alert } from 'react-native';
import { profileService } from '../../services/profileService';
import { Daily, Profile } from '../../types/types';
import { useEffect, useState  } from 'react';

interface Props {
  item?: Profile;
  onClick?: (profile: Profile) => void;
  onSave?: (weight: number) => Promise<boolean>;
  data?: Daily | null;
}

export const ProfileSetWeight = ({ item, onClick, onSave, data }: Props) => {
  const [userWeight, setUserWeight] = useState('');
  const [currentWeight, setCurrentWeight] = useState<number | null>(null);

    useEffect(() => {
        if ( data){
          setUserWeight(data.weight != null ? String(data.weight): '' );
          setCurrentWeight(data.weight ?? null);
        } else {
          setUserWeight('');
          setCurrentWeight(null);
        }
    }, [ data])

    // If no `data` prop is given, fetch profile once on mount so saved value is shown
    useEffect(() => {
      let mounted = true;
      const fetchProfile = async () => {
        if (data) return;
        try {
          const profile = await profileService.getCurrentWeight();
          if (!mounted) return;
          if (profile != null) {
            setUserWeight(String(profile));
            setCurrentWeight(profile);
          }
        } catch (err) {
          // ignore
        }
      };
      fetchProfile();
      return () => { mounted = false; };
    }, [data]);

  const confirmLargeWeightChange = (newWeight: number): Promise<boolean> => {
    return new Promise((resolve) => {
      Alert.alert(
        'Vahvista painon muutos',
        `Hei, painosi on muuttunut yli 5kg. Oletko varma, että uusi painosi on ${newWeight} kg? Tilastoihin asetettua painoa ei voi enää muuttaa.`,
        [
          {
            text: 'Peruuta',
            style: 'cancel',
            onPress: () => resolve(false),
          },
          {
            text: 'Kyllä',
            onPress: () => resolve(true),
          },
        ]
      );
    });
  };


  const handleSave = async () => {
      const userWeightValue = Number(userWeight);

      if (isNaN(userWeightValue)) {
      console.log("Virheellinen numero");
      return;
    }

    if (currentWeight !== null && Math.abs(userWeightValue - currentWeight) >= 5) {
      const confirmed = await confirmLargeWeightChange(userWeightValue);
      if (!confirmed) return;
    }

    try {
      let success = false;
      if (onSave) {
          success = await onSave(userWeightValue);
      } else {
          success = await profileService.updateCurrentWeight(userWeightValue);
      }
      if (success) {
        console.log("Tallennettu!");
          setUserWeight(String(userWeightValue));
          setCurrentWeight(userWeightValue);
          ToastAndroid.show('Tavoite tallennettu', ToastAndroid.SHORT);
        Keyboard.dismiss();
      } else {
        console.log("Tallennus epäonnistui");
      }
    } catch (err) {
      console.log("Tallennusvirhe", err);
    }
  };

  return (
    <Card 
      mode="elevated"
      elevation={2}
      onPress={() => (onClick && item) ? onClick(item) : undefined}>
      <Card.Title title="Paino" titleVariant='titleMedium'/>
      <Card.Content>
        <View>
          <View style={styles.inputRow}>
            <TextInput
              mode='outlined'
              style={styles.input}
              value={userWeight}
              onChangeText={setUserWeight}
              keyboardType="numeric"
              placeholder="Anna paino (kg)"
            />
            <IconButton
              icon="pencil"
              mode="contained"
              style={styles.saveIconButton}
              onPress={handleSave}
            />
          </View>

        </View>
      </Card.Content>

    </Card>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 4,
  },
  input: {
    flex: 1,
  },
  saveIconButton: {
    marginLeft: 8,
  }
});