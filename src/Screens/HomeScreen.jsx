import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { removePokemon } from '../utils/pokemonSlice';
import { theme } from '../utils/theme';

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
            <Icon name="ellipsis-vertical" size={20} color={theme.colors.primary} />
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
          <Icon name="sad-outline" size={60} color={theme.colors.primary} />
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
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  profileContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: theme.colors.primary,
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
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    fontFamily: theme.typography.body.fontFamily,
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.primary,
    fontFamily: theme.typography.h2.fontFamily,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  emptyText: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.primary,
    marginTop: theme.spacing.lg,
    fontFamily: theme.typography.h2.fontFamily,
  },
  emptySubText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    fontFamily: theme.typography.body.fontFamily,
  },
  list: {
    padding: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
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
    backgroundColor: theme.colors.background,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: theme.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  titleContainer: {
    flex: 1,
  },
  menuButton: {
    padding: theme.spacing.xs,
  },
  name: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    fontFamily: theme.typography.h3.fontFamily,
  },
  breed: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    opacity: 0.8,
    fontFamily: theme.typography.body.fontFamily,
  },
  description: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: theme.spacing.md,
    fontFamily: theme.typography.body.fontFamily,
  },
  cardActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    flex: 1,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    fontFamily: theme.typography.body.fontFamily,
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.md,
    bottom: theme.spacing.md,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
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