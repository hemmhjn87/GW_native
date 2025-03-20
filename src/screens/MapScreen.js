import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MapScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [region, setRegion] = useState({
    latitude: 28.6139, // Default location: New Delhi
    longitude: 77.2090,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 28.6139,
    longitude: 77.2090,
  });

  const [address, setAddress] = useState("Fetching address...");

  // 🚀 Auto-fetch user's location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setAddress("Permission Denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      setMarkerPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      fetchAddress(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  // 🚀 Get Address from Coordinates
  const fetchAddress = async (lat, lon) => {
    let response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    let data = await response.json();
    setAddress(data.display_name || "Address not found");
  };

  // 🚀 When user taps the map
  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
    fetchAddress(latitude, longitude);
  };

  // 🚀 Confirm Location
  const handleConfirmLocation = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Location</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a location"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        onPress={handleMapPress}
      >
        {/* Marker at the selected position */}
        <Marker coordinate={markerPosition}>
          <Icon name="map-marker" size={40} color="red" />
        </Marker>
      </MapView>

      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Selected Location</Text>
        <Text style={styles.addressText}>{address}</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleConfirmLocation}>
          <Text style={styles.buttonText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 15,
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
  map: {
    flex: 1,
  },
  addressContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapScreen;
