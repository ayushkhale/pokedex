import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { removePokemon } from '../utils/pokemonSlice';

const HomeScreen = () => {
  const pokemons = useSelector((state) => state.pokemon.pokemons);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleDelete = (id) => {
    dispatch(removePokemon(id));
  };

  const handleEdit = (pokemon) => {
    navigation.navigate('EditPokemon', { pokemon });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Icon name="image-outline" size={40} color="#666666" />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.cardHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.breed}>{item.breed}</Text>
          </View>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => handleEdit(item)}
          >
            <Icon name="ellipsis-vertical" size={20} color="#BB86FC" />
          </TouchableOpacity>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {item.description || 'No description available'}
        </Text>
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => handleEdit(item)}
          >
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: 'https://www.pngmart.com/files/12/Ash-Ketchum-PNG-Image.png' }}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.greeting}>Welcome,</Text>
            <Text style={styles.title}>Pokémon Trainer!</Text>
          </View>
        </View>
      </View>
      
      {pokemons.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="sad-outline" size={60} color="#BB86FC" />
          <Text style={styles.emptyText}>No Pokémons Collected</Text>
          <Text style={styles.emptySubText}>Add your first Pokémon to start your collection!</Text>
        </View>
      ) : (
        <FlatList
          data={pokemons}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddPokemon')}
      >
        <Icon name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#BB86FC',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  titleContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#BB86FC',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#BB86FC',
    marginTop: 20,
  },
  emptySubText: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
    marginTop: 10,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#2A2A2A',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
  },
  contentContainer: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
  menuButton: {
    padding: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#BB86FC',
    marginBottom: 4,
  },
  breed: {
    fontSize: 16,
    color: '#CFCFCF',
    opacity: 0.8,
  },
  description: {
    fontSize: 15,
    color: '#A0A0A0',
    lineHeight: 22,
    marginBottom: 16,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#BB86FC',
  },
  deleteButton: {
    backgroundColor: '#CF6679',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#BB86FC',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default HomeScreen; 