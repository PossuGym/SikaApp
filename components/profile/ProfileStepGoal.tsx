import { Card, TextInput, IconButton } from 'react-native-paper';
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
    <Card 
      mode="elevated"
      elevation={2} 
      onPress={() => (onClick && item) ? onClick(item) : undefined}>
      <Card.Title title="Askeltavoite" titleVariant='titleMedium'/>
      <Card.Content>
        <View>
          <View style={styles.inputRow}>
            <TextInput
              mode='outlined'
              style={styles.input}
              value={stepsGoal}
              onChangeText={setStepsGoal}
              keyboardType="numeric"
              placeholder="Anna askeltavoite"
            />
            <IconButton
              icon="pencil"
              mode="contained"
              style={styles.saveIconButton}
              onPress={async () => {
                await handleSave();
                showToast();
              }}
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
