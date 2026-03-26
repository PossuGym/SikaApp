import { Card, IconButton, Text } from 'react-native-paper';
import { Nutrition } from '../../types/types';
import { View } from 'react-native';

type Props = { item: number, protein:number, carbs:number, fats:number} 


export const NutritionSumCard = ({ item, protein, carbs, fats }: Props) => {


  return (
    
    <Card 
      mode="outlined"
     
    >
      <Card.Title
        title={"Päivän saanti"}/>
        <Card.Content>
            <Text variant="titleLarge">Makrot {item}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}> 
              <Text variant="titleLarge">Pro {protein}</Text>
              <Text variant="titleLarge">Fats {fats}</Text>
              <Text variant="titleLarge">Carbs {carbs}</Text>
            </View>

        </Card.Content>
    </Card>
  );
};
 