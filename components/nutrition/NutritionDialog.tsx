import { useState, useEffect } from 'react';
import { Dialog, Portal, TextInput, Button } from 'react-native-paper';
import { Nutrition } from '../../types/types';

// onSave => Promise odottaa true/false hookista ennen sulkeutumista. Dialogi ei suljeudu, jos 
interface Props {
  visible: boolean;
  onDismiss: () => void;
  onSave: (name: string, date: number,  calories:number, protein: number, carbs: number, fats: number,  id?: number) => Promise<boolean>;
  data?: Nutrition | null;
}

 /**
 * Dialogi toimii sekä liikkeen luomiseen, että sen päivittämiseen.
 * @param {Nutrition | null}[data] ```Exercise```(Valinnainen). Välitä, jos haluat avata dialogin muokkaustilassa(oletus "null").
 * @example <ExerciseDialog visible={isVisible} data={ex} onSave={save} onDismiss={close}/>
 */

    export const NutritionDialog = ({ visible, onDismiss, onSave, data }: Props) => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  



  useEffect(() => {
    if (visible && data) {
      setName(data.name ?? '');
      setCalories(data.calories != null ? String(data.calories) : '');
      setProtein(data.protein != null ? String(data.protein) : '');
      setCarbs(data.carbs != null ? String(data.carbs) : '');
      setFats(data.fats != null ? String(data.fats) : '');
    } else if (visible) {
      setName('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFats('');
    }
  }, [visible, data]);


   // Tallennus
  const handleSave = async () => {
    const success = await onSave(name, data?.date ?? Date.now(), Number(calories), Number(protein), Number(carbs), Number(fats), data?.id);
    if (success) {
      onDismiss();
    }
  };


  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Lisää uusi ruoka</Dialog.Title>
        <Dialog.Content>
          <TextInput label="Ruuan nimi" value={name} onChangeText={setName} mode="outlined"/>
          <TextInput label="Proteiini" value={protein} onChangeText={setProtein} mode="outlined" style={{marginTop: 10}}/>
          <TextInput label="Hiilihydraatit" value={carbs} onChangeText={setCarbs} mode="outlined" style={{marginTop: 10}}/>
          <TextInput label="Rasvat" value={fats} onChangeText={setFats} mode="outlined" style={{marginTop: 10}}/>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Peruuta</Button>
          <Button mode="outlined" onPress={handleSave}>
            {data ? "Tallenna muutokset" : "Lisää"}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

