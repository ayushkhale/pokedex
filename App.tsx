import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/utils/store';
import { theme } from './src/utils/theme';

// Import screens
import HomeScreen from './src/Screens/HomeScreen.jsx';
import AddPokemon from './src/Screens/AddPokemon.jsx';
import EditPokemon from './src/Screens/EditPokemon.jsx';
import { loadPokemonsFromStorage } from './src/utils/pokemonSlice';

type RootStackParamList = {
  Home: undefined;
  AddPokemon: undefined;
  EditPokemon: { pokemon: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPokemonsFromStorage());
  }, [dispatch]);

  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.card,
          text: theme.colors.text,
          border: theme.colors.border,
          notification: theme.colors.primary,
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: '400',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: '700',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '800',
          },
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.primary,
          headerTitleStyle: {
            fontFamily: 'Jersey15',
          },
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Pokédex' }}
        />
        <Stack.Screen
          name="AddPokemon"
          component={AddPokemon}
          options={{ title: 'Add Pokémon' }}
        />
        <Stack.Screen
          name="EditPokemon"
          component={EditPokemon}
          options={{ title: 'Edit Pokémon' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;