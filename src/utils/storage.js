import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@pokedex_pokemons';

export const savePokemons = async (pokemons) => {
  try {
    const jsonValue = JSON.stringify(pokemons);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving pokemons:', error);
  }
};

export const loadPokemons = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading pokemons:', error);
    return [];
  }
}; 