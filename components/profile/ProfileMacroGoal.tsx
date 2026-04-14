import { Card, TextInput, Button, useTheme } from 'react-native-paper';
import { StyleSheet, ToastAndroid, View, Keyboard } from 'react-native';
import { profileService } from '../../services/profileService';
import { Profile } from '../../types/types';
import { useEffect, useState  } from 'react';

interface Props {
  item?: Profile;
  onClick?: (profile: Profile) => void;
  onSave?: (calories_goal: number) => Promise <boolean>;
  data?: Profile | null;
}

/** 
 * @param item ```Profile``` tyypin objekti
 * @param onClick Välittää koko objektin painallustoiminnalle.
 * @example <ProfileItem item={ex} onClick={handleEdit} onSave={save} />}
*/

export const ProfileMacroGoal = ({ item, onClick, onSave, data }: Props) => {
  const theme = useTheme();
  const [caloriesGoal, setCaloriesGoal] = useState('');

    useEffect(() => {
        if ( data){
          setCaloriesGoal(data.calories_goal != null ? String(data.calories_goal): '' );
        } else {
          setCaloriesGoal('');
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
          if (profile && profile.calories_goal != null) {
            setCaloriesGoal(String(profile.calories_goal));
          }
        } catch (err) {
          // ignore
        }
      };
      fetchProfile();
      return () => { mounted = false; };
    }, [data]);


  const handleSave = async () => {
    const caloriesGoalValue = Number(caloriesGoal);

    if (isNaN(caloriesGoalValue)) {
      console.log("Virheellinen numero");
      return;
    }

    try {
      let success = false;
      if (onSave) {
        success = await onSave(caloriesGoalValue);
      } else {
        success = await profileService.updateCaloriesGoal(caloriesGoalValue);
      }
      if (success) {
        console.log("Tallennettu!");
        setCaloriesGoal(String(caloriesGoalValue));
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
      <Card.Title title="Kaloritavoite" titleVariant='titleMedium'/>
      <Card.Content>
        <View>

        <TextInput 
          mode='outlined'
          style={styles.input}
          value={caloriesGoal}
          onChangeText={setCaloriesGoal}
          keyboardType="numeric"
          placeholder="Anna kaloritavoite"
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