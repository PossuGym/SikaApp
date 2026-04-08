import { Card, Text, TextInput, Button } from 'react-native-paper';
import { StyleSheet, ToastAndroid, View, Keyboard } from 'react-native';
import { profileService } from '../../services/profileService';
import { Profile } from '../../types/types';
import { useEffect, useState  } from 'react';


interface Props {
  item?: Profile;
  onClick?: (profile: Profile) => void;
  onSave?: (steps_goal: number) => Promise <boolean>;
  data?: Profile | null;
}

/** 
 * @param item ```Profile``` tyypin objekti
 * @param onClick Välittää koko objektin painallustoiminnalle.
 * @example <ProfileItem item={ex} onClick={handleEdit} onSave={save} />}
*/

export const ProfileStepGoal = ({ item, onClick, onSave, data }: Props) => {
  const [stepsGoal, setStepsGoal] = useState('');

    useEffect(() => {
        if ( data){
          setStepsGoal(data.steps_goal != null ? String(data.steps_goal): '' );
        } else {
          setStepsGoal('');
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
          if (profile && profile.steps_goal != null) {
            setStepsGoal(String(profile.steps_goal));
          }
        } catch (err) {
          // ignore
        }
      };
      fetchProfile();
      return () => { mounted = false; };
    }, [data]);


  const handleSave = async () => {
    const stepsGoalValue = Number(stepsGoal);

    if (isNaN(stepsGoalValue)) {
      console.log("Virheellinen numero");
      return;
    }

    try {
      let success = false;
      if (onSave) {
        success = await onSave(stepsGoalValue);
      } else {
        success = await profileService.updateStepsGoal(stepsGoalValue);
      }
      if (success) {
        console.log("Tallennettu!");
        setStepsGoal(String(stepsGoalValue));
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
    <Card mode="outlined" style={styles.card} onPress={() => (onClick && item) ? onClick(item) : undefined}>
      <Card.Title title="Askeltavoite" titleStyle={styles.title} />
      <Card.Content>
        <View>
        <TextInput
           value={stepsGoal}
           onChangeText={setStepsGoal}
           keyboardType="numeric"
           placeholder="Anna askeltavoite"
        />

          <Button
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
  card: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
  },
});
