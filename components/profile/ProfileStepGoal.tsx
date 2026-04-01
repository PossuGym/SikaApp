import { Card, Text, TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, Keyboard } from 'react-native';
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
        Keyboard.dismiss();
      } else {
        console.log("Tallennus epäonnistui");
      }
    } catch (err) {
      console.log("Tallennusvirhe", err);
    }
  };







  
  return (
    <Card mode="outlined" style={styles.card} onPress={() => (onClick && item) ? onClick(item) : undefined}>
      <Card.Title title="Askeltavoite" titleStyle={styles.title} />
      <Card.Content>
        <View>
          <Text>Askeltavoite:</Text>

        <TextInput
           value={stepsGoal}
           onChangeText={setStepsGoal}
           keyboardType="numeric"
           placeholder="Anna askeltavoite"
        />

          <Button mode="contained" onPress={handleSave}>
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
