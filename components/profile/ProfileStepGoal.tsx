import { Card, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Profile } from '../../types/types';
import { useEffect } from 'react';

interface Props {
  item: Profile;
  visible: boolean;
  onClick: (profile: Profile) => void;
  onSave: (steps_goal: number) => Promise <boolean>;
  data?: Profile | null;
}

/** 
 * @param item ```Nutrition``` tyypin objekti
 * @param onClick Välittää koko objektin painallustoiminnalle.
 * @example <NutrtitionItem item={ex} onClick={handleEdit />}
*/

export const ProfileStepGoal = ({ item, onClick, onSave }: Props) => {

    useEffect(() => {
        if (visible && data){
            setStepsGoal(data.steps_goal != null ? String(data.steps_goal): '' );
        } else if (visible) {
            setStepsGoal('');
        }
    }, [visible, data])




  return (
    <Card mode="outlined" style={styles.card} onPress={() => onClick(item)}>
      <Card.Title title="Askeltavoite" titleStyle={styles.title} />
      <Card.Content>
        <View>
          <Text>jotain</Text>
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