import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/utils/store';
import React from 'react';

// Import screens
import HomeScreen from './src/Screens/HomeScreen.jsx';
import AddPokemon from './src/Screens/AddPokemon.jsx';
import EditPokemon from './src/Screens/EditPokemon.jsx';

type RootStackParamList = {
  Home: undefined;
  AddPokemon: undefined;
  EditPokemon: { pokemon: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            primary: '#BB86FC',
            background: '#121212',
            card: '#121212',
            text: '#FFFFFF',
            border: '#333',
            notification: '#BB86FC',
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
            headerShown: false,
            contentStyle: { backgroundColor: '#121212' },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddPokemon" component={AddPokemon} />
          <Stack.Screen name="EditPokemon" component={EditPokemon} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;