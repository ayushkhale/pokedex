import { createSlice } from '@reduxjs/toolkit';
import { savePokemons, loadPokemons } from './storage';

const initialState = {
  pokemons: [],
  status: 'idle',
  error: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    addPokemon: (state, action) => {
      state.pokemons.push(action.payload);
      savePokemons(state.pokemons);
    },
    editPokemon: (state, action) => {
      const index = state.pokemons.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.pokemons[index] = action.payload;
        savePokemons(state.pokemons);
      }
    },
    removePokemon: (state, action) => {
      state.pokemons = state.pokemons.filter(p => p.id !== action.payload);
      savePokemons(state.pokemons);
    },
  },
});

export const { setPokemons, addPokemon, editPokemon, removePokemon } = pokemonSlice.actions;

// Thunk to load pokemons from storage
export const loadPokemonsFromStorage = () => async (dispatch) => {
  try {
    const pokemons = await loadPokemons();
    dispatch(setPokemons(pokemons));
  } catch (error) {
    console.error('Error loading pokemons from storage:', error);
  }
};

export default pokemonSlice.reducer; 