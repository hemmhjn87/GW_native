import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const TrackTruckScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [trucks, setTrucks] = useState([]);
  const [activeTab, setActiveTab] = useState('Current');

  // Mock data for scheduled pickups
  const pickups = [
    {
      id: '1',
      date: '18 Mar 2025',
      time: '10:00 AM',
      type: 'Household Waste',
      status: 'In Progress',
      address: '123 Green Street, Eco City',
      truckId: 'GW-001',
      estimatedArrival: '10:15 AM',
      location: {
        latitude: 28.6139,
        longitude: 77.2090,
      },
    },
    {
      id: '2',
      date: '20 Mar 2025',
      time: '11:30 AM',
      type: 'Recyclables',
      status: 'Scheduled',
      address: '456 Clean Avenue, Eco City',
      truckId: 'GW-002',
      estimatedArrival: '11:45 AM',
      location: {
        latitude: 28.6229,
        longitude: 77.2190,
      },
    },
  ];

  // Simulating loading of map and location data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setSelectedPickup(pickups[0]);
      // Mock truck location data
      setTrucks([
        {
          id: 'GW-001',
          driverName: 'Rajiv Kumar',
          phoneNumber: '+91 9876543210',
          location: {
            latitude: 28.6100,
            longitude: 77.2050,
          },
          status: 'On the way',
          eta: '15 mins',
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const renderPickupCard = (pickup) => {
    const isActive = selectedPickup && selectedPickup.id === pickup.id;

    return (
      <TouchableOpacity
        key={pickup.id}
        style={[styles.pickupCard, isActive && styles.activePickupCard]}
        onPress={() => setSelectedPickup(pickup)}
      >
        <View style={styles.pickupCardContent}>
          <View style={styles.pickupIconContainer}>
            <Icon
              name={pickup.type === 'Recyclables' ? 'recycle' : 'trash-can-outline'}
              size={24}
              color="#4CAF50"
            />
          </View>
          <View style={styles.pickupDetails}>
            <Text style={styles.pickupType}>{pickup.type}</Text>
            <Text style={styles.pickupAddress} numberOfLines={1}>
              {pickup.address}
            </Text>
            <View style={styles.pickupTimeContainer}>
              <Icon name="clock-outline" size={14} color="#666" />
              <Text style={styles.pickupTime}>{pickup.time}</Text>
            </View>
          </View>
          <View style={[styles.statusBadge, pickup.status === 'In Progress' && styles.statusInProgress]}>
            <Text style={styles.statusText}>{pickup.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Pickup</Text>
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Locating trucks...</Text>
          </View>
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: selectedPickup ? selectedPickup.location.latitude : 28.6139,
              longitude: selectedPickup ? selectedPickup.location.longitude : 77.2090,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {/* User Location Marker */}
            {selectedPickup && (
              <Marker
                coordinate={selectedPickup.location}
                title="Pickup Location"
                description={selectedPickup.address}
              >
                <View style={styles.destinationMarker}>
                  <Icon name="map-marker" size={30} color="#4CAF50" />
                </View>
              </Marker>
            )}

            {/* Truck Marker */}
            {trucks.map((truck) => (
              <Marker
                key={truck.id}
                coordinate={truck.location}
                title={`Truck ${truck.id}`}
                description={`Driver: ${truck.driverName}`}
              >
                <View style={styles.truckMarker}>
                  <Icon name="truck" size={24} color="#fff" />
                </View>
              </Marker>
            ))}
          </MapView>
        )}
      </View>

      {/* Pickup Selection Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Current' && styles.activeTab]}
          onPress={() => setActiveTab('Current')}
        >
          <Text style={[styles.tabText, activeTab === 'Current' && styles.activeTabText]}>
            Current
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('Upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'Upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Past' && styles.activeTab]}
          onPress={() => setActiveTab('Past')}
        >
          <Text style={[styles.tabText, activeTab === 'Past' && styles.activeTabText]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      {/* Pickups List */}
      <ScrollView style={styles.pickupsContainer}>
        {pickups.map(renderPickupCard)}
      </ScrollView>

      {/* Truck Details Panel */}
      {selectedPickup && !isLoading && (
        <View style={styles.truckDetailsContainer}>
          <View style={styles.truckHeaderRow}>
            <Text style={styles.truckDetailsTitle}>Truck Details</Text>
            <View style={styles.etaBadge}>
              <Text style={styles.etaText}>ETA: {trucks[0].eta}</Text>
            </View>
          </View>

          <View style={styles.truckDetailsContent}>
            <View style={styles.truckImageContainer}>
              <View style={styles.truckIconCircle}>
                <Icon name="truck" size={32} color="#4CAF50" />
              </View>
            </View>
            
            <View style={styles.truckInfo}>
              <Text style={styles.truckId}>Truck {trucks[0].id}</Text>
              <Text style={styles.driverName}>{trucks[0].driverName}</Text>
              <Text style={styles.truckStatus}>{trucks[0].status}</Text>
            </View>

            <TouchableOpacity style={styles.callButton}>
              <Icon name="phone" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  mapContainer: {
    height: Dimensions.get('window').height * 0.35,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    color: '#4CAF50',
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  pickupsContainer: {
    flex: 1,
    padding: 15,
  },
  pickupCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#e0e0e0',
  },
  activePickupCard: {
    borderLeftColor: '#4CAF50',
  },
  pickupCardContent: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  pickupIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pickupDetails: {
    flex: 1,
  },
  pickupType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  pickupAddress: {
    fontSize: 13,
    color: '#666',
    marginBottom: 3,
  },
  pickupTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickupTime: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  statusBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusInProgress: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  truckDetailsContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
  },
  truckHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  truckDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  etaBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  etaText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  truckDetailsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  truckImageContainer: {
    marginRight: 15,
  },
  truckIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  truckInfo: {
    flex: 1,
  },
  truckId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  driverName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  truckStatus: {
    fontSize: 13,
    color: '#FFC107',
    fontWeight: '500',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationMarker: {
    alignItems: 'center',
  },
  truckMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default TrackTruckScreen;