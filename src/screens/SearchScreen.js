import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const serviceCategories = [
    { id: '1', title: 'Household Waste', icon: 'trash-can-outline' },
    { id: '2', title: 'Recyclables', icon: 'recycle' },
    { id: '3', title: 'E-Waste', icon: 'laptop' },
    { id: '4', title: 'Green Waste', icon: 'leaf' },
    { id: '5', title: 'Commercial Waste', icon: 'office-building' },
    { id: '6', title: 'Construction Debris', icon: 'hammer' },
  ];

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={styles.categoryIcon}>
        <Icon name={item.icon} size={24} color="#4CAF50" />
      </View>
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="magnify" size={24} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for waste collection services"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>

      <FlatList
        data={serviceCategories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.categoriesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 8,
    paddingHorizontal: 15,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  categoriesList: {
    paddingHorizontal: 10,
  },
  categoryItem: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    margin: 10,
    alignItems: 'center',
    elevation: 2,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default SearchScreen;