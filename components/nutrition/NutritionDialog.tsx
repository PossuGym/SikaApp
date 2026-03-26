import { useState, useEffect } from 'react';
import { Dialog, Portal, TextInput, Button } from 'react-native-paper';
import { Nutrition } from '../../types/types';
import { View } from 'react-native';
import { calculateCaloriesFromMacros, formatDateToString, isValidDateString,
  parseDateString, toNumberOrZero, } from '../../services/nutritionCalculator'
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
  const [date, setDate] = useState(Date.now());
  const [dateInputString, setDateInputString] = useState('');
      const [isCaloriesManual, setIsCaloriesManual] = useState(false);
  



  useEffect(() => {
    if (visible && data) {
      setName(data.name ?? '');
      setCalories(data.calories != null ? String(data.calories) : '');
      setProtein(data.protein != null ? String(data.protein) : '');
      setCarbs(data.carbs != null ? String(data.carbs) : '');
      setFats(data.fats != null ? String(data.fats) : '');
      setDate(data.date ?? Date.now());
      setDateInputString(formatDateToString(data.date ?? Date.now()));
      setIsCaloriesManual(data.calories != null);
    } else if (visible) {
      setName('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFats('');
      setDate(Date.now());
      setDateInputString(formatDateToString(Date.now()));
      setIsCaloriesManual(false);
    }
  }, [visible, data]);

  useEffect(() => {
    if (!visible || isCaloriesManual) return;

    const calculatedCalories = calculateCaloriesFromMacros(
      toNumberOrZero(protein),
      toNumberOrZero(carbs),
      toNumberOrZero(fats)
    );

    setCalories(calculatedCalories === 0 ? '' : String(calculatedCalories));
  }, [visible, protein, carbs, fats, isCaloriesManual]);

  const handleCaloriesChange = (value: string) => {
    setCalories(value);
    setIsCaloriesManual(value.trim() !== '');
  };


   // Tallennus
  const handleSave = async () => {
    const proteinValue = Number(protein);
    const carbsValue = Number(carbs);
    const fatsValue = Number(fats);
    const caloriesValue = calories.trim() === ''
      ? calculateCaloriesFromMacros(proteinValue, carbsValue, fatsValue)
      : Number(calories);

    let finalDate = date;
    if (isValidDateString(dateInputString)) {
      finalDate = parseDateString(dateInputString);
    } else {
      setDateInputString(formatDateToString(date));
    }

    const success = await onSave(
      name,
      finalDate,
      caloriesValue,
      proteinValue,
      carbsValue,
      fatsValue,
      data?.id
    );
    if (success) {
      onDismiss();
    }
  };


  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Lisää uusi annos</Dialog.Title>
        <Dialog.Content>
          <TextInput label="Ruoan nimi" value={name} onChangeText={setName} mode="outlined"/>
          <TextInput 
            label="Päivämäärä (yyyy-MM-dd)" 
            value={dateInputString} 
            onChangeText={(value) => {
              setDateInputString(value);
              if (isValidDateString(value)) {
                setDate(parseDateString(value));
              }
            }}
            mode="outlined" 
            style={{marginTop: 10}}
            placeholder="yyyy-MM-dd"
          />
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
      
          <TextInput label="Protein" value={protein} onChangeText={setProtein} mode="outlined" style={{marginTop: 10, flex: 1}}/>
          <TextInput label="Carbs" value={carbs} onChangeText={setCarbs} mode="outlined" style={{marginTop: 10, flex: 1}}/>
          <TextInput label="Fats" value={fats} onChangeText={setFats} mode="outlined" style={{marginTop: 10, flex: 1}}/>
          </View>
          <TextInput label="Kalorit" value={calories} onChangeText={handleCaloriesChange} mode="outlined" style={{marginTop: 10}}/>
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

