import { Card, Text, TextInput, Button, useTheme } from 'react-native-paper';
import { StyleSheet, ToastAndroid, View, Keyboard } from 'react-native';
import { profileService } from '../../services/profileService';
import { Profile } from '../../types/types';
import { useEffect, useState  } from 'react';

interface Props {
  item?: Profile;
  onClick?: (profile: Profile) => void;
  onSave?: (height: number) => Promise<boolean>;
  data?: Profile | null;
}

export const ProfileSetHeight = ({ item, onClick, onSave, data }: Props) => {
  const theme = useTheme();
  const [userHeight, setUserHeight] = useState('');

    useEffect(() => {
        if ( data){
          setUserHeight(data.height != null ? String(data.height): '' );
        } else {
          setUserHeight('');
        }
    }, [ data])

    // If no `data` prop is given, fetch profile once on mount so saved value is shown
    useEffect(() => {
      let mounted = true;
      const fetchProfile = async () => {
        if (data) return;
        try {
          const profile = await profileService.getUserProfile();
          if (!mounted) return;
          if (profile && profile.height != null) {
            setUserHeight(String(profile.height));
          }
        } catch (err) {
          // ignore
        }
      };
      fetchProfile();
      return () => { mounted = false; };
    }, [data]);


  const handleSave = async () => {
    const userHeightValue = Number(userHeight);

    if (isNaN(userHeightValue)) {
      console.log("Virheellinen numero");
      return;
    }

    try {
      let success = false;
      if (onSave) {
        success = await onSave(userHeightValue);
      } else {
        success = await profileService.updateHeight(userHeightValue);
      }
      if (success) {
        console.log("Tallennettu!");
        setUserHeight(String(userHeightValue));
        Keyboard.dismiss();
      } else {
        console.log("Tallennus epäonnistui");
      }
    } catch (err) {
      console.log("Tallennusvirhe", err);
    }
  };

  const showToast = () => {
    ToastAndroid.show('Tavoite tallennettu', ToastAndroid.SHORT);
  };

  return (
    <Card
      mode="elevated"
      elevation={2}
      onPress={() => (onClick && item) ? onClick(item) : undefined}>
      <Card.Title title="Pituus" titleVariant='titleMedium' />
      <Card.Content>
        <View>
        <TextInput
          mode='outlined'
          style={styles.input}
          value={userHeight}
          onChangeText={setUserHeight}
          keyboardType="numeric"
          placeholder="Anna pituus (cm)"
        />

          <Button
            style={styles.button}
            mode="contained"
            onPress={async () => {
              await handleSave();
              showToast();
            }}
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