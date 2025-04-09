import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editPokemon } from '../utils/pokemonSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const EditPokemon = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { pokemon } = route.params;

  useEffect(() => {
    if (pokemon) {
      setName(pokemon.name);
      setBreed(pokemon.breed);
      setDescription(pokemon.description);
    }
  }, [pokemon]);

  const handleSave = () => {
    if (name && breed && description) {
      const updatedPokemon = {
        ...pokemon,
        name,
        breed,
        description
      };
      dispatch(editPokemon(updatedPokemon));
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#BB86FC" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Pokémon</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Pokémon Name"
          placeholderTextColor="#666"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Breed"
          placeholderTextColor="#666"
          value={breed}
          onChangeText={setBreed}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Description"
          placeholderTextColor="#666"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  backButton: {
    marginRight: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#BB86FC'
  },
  form: {
    padding: 16
  },
  input: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333'
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top'
  },
  saveButton: {
    backgroundColor: '#BB86FC',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default EditPokemon; 