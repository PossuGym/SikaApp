import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Portal, TextInput, Button } from 'react-native-paper';
import { Exercise } from '../../types/types';

// onSave => Promise odottaa true/false hookista ennen sulkeutumista. Dialogi ei suljeudu, jos käyttäjän syöte on väärin -> ei tarvitse avata dialogia uudestaan.
interface Props {
  visible: boolean;
  onDismiss: () => void;
  onSave: (name: string, category: string, id?: number) => Promise<boolean>;
  data?: Exercise | null;
}

/**
 * Dialogi toimii sekä liikkeen luomiseen, että sen päivittämiseen.
 * @param {Exercise | null}[data] ```Exercise```(Valinnainen). Välitä, jos haluat avata dialogin muokkaustilassa(oletus "null").
 * @example <ExerciseDialog visible={isVisible} data={ex} onSave={save} onDismiss={close}/>
 */
export const ExerciseDialog = ({ visible, onDismiss, onSave, data }: Props) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => { // Jos muokataan liikettä, täytetään kentät liikkeen tiedoilla. Muuten näytetään tyhjät kentät.
    if (visible && data) {
      setName(data.name);
      setCategory(data.category);
    } else if (visible) {
      setName('');
      setCategory('');
    }
  }, [visible, data]);

   // Tallennus
  const handleSave = async () => {
    const success = await onSave(name, category, data?.id);
    if (success) {
      onDismiss();
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>{data ? "Muokkaa liikettä" : "Lisää uusi liike"}</Dialog.Title>
        <Dialog.Content>
          <TextInput label="Liikkeen nimi" value={name} onChangeText={setName} mode="outlined"/>
          <TextInput label="Kategoria" value={category} onChangeText={setCategory} mode="outlined" style={styles.categoryInput}/>
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

const styles = StyleSheet.create({
  categoryInput: {
    marginTop: 12,
  },
  dialog: {
    borderRadius: 16,
},
});
