import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  StatusBar,
  Dimensions,
  Image,
  Linking,
  Platform,
  PermissionsAndroid,
  Animated,
} from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.7749,
    longitude: -122.4194, // Default location (San Francisco)
  });
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const [userName, setUserName] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Animation for notification bell
  const bellAnimation = useRef(new Animated.Value(0)).current;
  const bellRotation = bellAnimation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '-20deg', '20deg']
  });

  const API_KEY = 'AIzaSyAV6kmhOEGgWD9XeQXPuI6jAc6VCdfs8Qw';

  const services = [
    {
      id: '1',
      title: 'Household Waste',
      description: 'Regular pickup of household waste',
      icon: 'trash-can-outline',
      image: require('../../assets/household-waste.jpg'),
    },
    {
      id: '2',
      title: 'Recyclables',
      description: 'Collection of recyclable materials',
      icon: 'recycle',
      image: require('../../assets/recyclables.jpg'),
    },
    {
      id: '3',
      title: 'E-Waste',
      description: 'Safe disposal of electronic waste',
      icon: 'laptop',
      image: require('../../assets/e-waste.jpg'),
    },
    {
      id: '4',
      title: 'Green Waste',
      description: 'Collection of garden and organic waste',
      icon: 'leaf',
      image: require('../../assets/green-waste.jpg'),
    },
  ];

  const upcomingPickups = [
    {
      id: '1',
      date: '18 Mar 2025',
      time: '10:00 AM',
      type: 'Household Waste',
      status: 'Scheduled',
    },
    {
      id: '2',
      date: '20 Mar 2025',
      time: '11:30 AM',
      type: 'Recyclables',
      status: 'Scheduled',
    },
  ];

  // Fetch user data and notifications
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userName');
        if (storedUserName) {
          setUserName(storedUserName);
        } else {
          // Set default name if needed
          setUserName('Alex');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setUserName('Alex'); // Fallback
      }
    };

    loadUserData();
    fetchNotifications();
  }, []);

  // Location setup
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getCurrentLocation();
        setLocationPermissionGranted(true);
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location to show it on the map',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
            setLocationPermissionGranted(true);
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestLocationPermission();
  }, []);

  // Real-time notification simulation
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      // Simulate receiving a new notification (in a real app, this would be from a push notification service)
      const random = Math.random();
      
      if (random < 0.3) { // 30% chance to get a notification for demo purposes
        const newNotification = generateRandomNotification();
        setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
        setUnreadCount(prev => prev + 1);
        
        // Animate the bell
        animateBell();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(notificationInterval);
  }, []);

  // Animate notification bell when new notifications arrive
  const animateBell = () => {
    bellAnimation.setValue(0);
    Animated.sequence([
      Animated.timing(bellAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(bellAnimation, {
        toValue: 2,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(bellAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(bellAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
  };

  // Generate a random notification for demo purposes
  const generateRandomNotification = () => {
    const types = [
      'Your waste pickup is arriving in 15 minutes',
      'Schedule change: Your pickup has been moved to tomorrow',
      'Special offer: 20% off on your next e-waste disposal',
      'Reminder: Please ensure proper waste segregation',
      'Payment received for your recent pickup service'
    ];
    
    return {
      id: Date.now().toString(),
      message: types[Math.floor(Math.random() * types.length)],
      timestamp: new Date().toISOString(),
      read: false
    };
  };

  // Fetch notifications (simulated)
  const fetchNotifications = () => {
    // In a real app, this would fetch from an API or local storage
    const mockNotifications = [
      {
        id: '1',
        message: 'Your pickup for Household Waste is confirmed for tomorrow at 10:00 AM',
        timestamp: '2025-03-19T10:30:00Z',
        read: false
      },
      {
        id: '2',
        message: 'Special promotion: 15% off on your next recycling pickup!',
        timestamp: '2025-03-19T08:15:00Z',
        read: false
      },
      {
        id: '3',
        message: 'Rate your recent pickup experience with our service',
        timestamp: '2025-03-18T14:45:00Z',
        read: false
      }
    ];
    
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  // Navigation functions
  const navigateToSchedulePickup = useCallback((serviceType) => {
    navigation.navigate('SchedulePickup', { serviceType });
  }, [navigation]);

  const navigateToAllServices = useCallback(() => {
    navigation.navigate('AllServices');
  }, [navigation]);

  const navigateToAllPickups = useCallback(() => {
    navigation.navigate('AllPickups');
  }, [navigation]);

  const navigateToNotifications = useCallback(() => {
    // Mark all notifications as read when opening notifications screen
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({...notification, read: true}))
    );
    setUnreadCount(0);
    navigation.navigate('Notifications', { notifications });
  }, [navigation, notifications]);

  const openGoogleMapsApp = useCallback(() => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${currentLocation.latitude},${currentLocation.longitude}`;
    const label = 'Current Location';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  }, [currentLocation]);

  // Helper function to calculate time of day greeting based on current hour
  const getTimeBasedGreeting = () => {
    const currentHour = new Date().getHours();
    
    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  // Render functions
  const renderServiceItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => navigateToSchedulePickup(item.title)}
      activeOpacity={0.7}
    >
      <View style={styles.serviceIconContainer}>
        <Text style={styles.serviceIcon}>{getIconText(item.icon)}</Text>
      </View>
      <Text style={styles.serviceTitle}>{item.title}</Text>
      <Text style={styles.serviceDescription}>{item.description}</Text>
    </TouchableOpacity>
  ), [navigateToSchedulePickup]);

  const renderPickupItem = useCallback(({ item }) => (
    <TouchableOpacity 
      style={styles.pickupCard}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('PickupDetails', { pickupId: item.id })}
    >
      <View style={styles.pickupHeader}>
        <Text style={styles.pickupDate}>{item.date}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.pickupDetails}>
        <View style={styles.pickupDetailItem}>
          <Text style={styles.pickupDetailIcon}>⏰</Text>
          <Text style={styles.pickupDetailText}>{item.time}</Text>
        </View>
        <View style={styles.pickupDetailItem}>
          <Text style={styles.pickupDetailIcon}>🗑️</Text>
          <Text style={styles.pickupDetailText}>{item.type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ), [navigation]);

  // Helper function to get emoji for icons (since we're not using react-native-vector-icons)
  const getIconText = (iconName) => {
    switch (iconName) {
      case 'trash-can-outline': return '🗑️';
      case 'recycle': return '♻️';
      case 'laptop': return '💻';
      case 'leaf': return '🍃';
      case 'calendar-plus': return '📅';
      case 'map-marker': return '📍';
      case 'history': return '⏱️';
      case 'bell-outline': return '🔔';
      case 'calendar-remove': return '📅';
      default: return '📦';
    }
  };

  // Generate HTML for the map using WebView
  const generateMapHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <style>
            body, html, #map {
              height: 100%;
              margin: 0;
              padding: 0;
            }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            function initMap() {
              const location = {lat: ${currentLocation.latitude}, lng: ${currentLocation.longitude}};
              const map = new google.maps.Map(document.getElementById('map'), {
                center: location,
                zoom: 15,
                styles: [
                  {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [{"visibility": "off"}]
                  },
                  {
                    "featureType": "poi",
                    "stylers": [{"visibility": "simplified"}]
                  },
                  {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [{"visibility": "off"}]
                  },
                  {
                    "featureType": "transit",
                    "stylers": [{"visibility": "off"}]
                  }
                ]
              });
              
              // Custom marker with better design
              const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: 'Your Location',
                animation: google.maps.Animation.DROP,
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: "#4CAF50",
                  fillOpacity: 1,
                  strokeColor: "#FFFFFF",
                  strokeWeight: 2
                }
              });
              
              // Add a circle to show approximate service area
              const serviceCircle = new google.maps.Circle({
                strokeColor: "#4CAF50",
                strokeOpacity: 0.3,
                strokeWeight: 2,
                fillColor: "#4CAF50",
                fillOpacity: 0.1,
                map: map,
                center: location,
                radius: 500 // meters
              });
            }
          </script>
          <script src="https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap"
            async defer></script>
        </body>
      </html>
    `;
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#27ae60" barStyle="light-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{getTimeBasedGreeting()},</Text>
          <Text style={styles.userName}>{userName || 'Alex'}</Text>
        </View>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={navigateToNotifications}
          activeOpacity={0.7}
        >
          <Animated.View style={{transform: [{rotate: bellRotation}]}}>
            <Text style={styles.notificationIcon}>{getIconText('bell-outline')}</Text>
            {unreadCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
              </View>
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.bannerContainer}>
          <ImageBackground
            source={require('../../assets/banner.jpg')}
            style={styles.banner}
            imageStyle={{ borderRadius: 12 }}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Waste Management Simplified</Text>
              <Text style={styles.bannerSubtitle}>30% off on your first pickup!</Text>
              <TouchableOpacity 
                style={styles.bannerButton}
                onPress={() => navigateToSchedulePickup('All')}
                activeOpacity={0.8}
              >
                <Text style={styles.bannerButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.mapContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Location</Text>
            <TouchableOpacity onPress={openGoogleMapsApp} activeOpacity={0.7}>
              <Text style={styles.seeAllText}>Open in Maps</Text>
            </TouchableOpacity>
          </View>
          {locationPermissionGranted ? (
            <View style={styles.mapWrapper}>
              <WebView
                style={styles.map}
                originWhitelist={['*']}
                source={{ html: generateMapHTML() }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={false}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.enableLocationButton}
              onPress={() => getCurrentLocation()}
            >
              <Text style={styles.enableLocationText}>Enable Location Services</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <TouchableOpacity onPress={navigateToAllServices} activeOpacity={0.7}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={services}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.servicesList}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Pickups</Text>
          <TouchableOpacity onPress={navigateToAllPickups} activeOpacity={0.7}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {upcomingPickups.length > 0 ? (
          <FlatList
            data={upcomingPickups}
            renderItem={renderPickupItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.pickupsList}
          />
        ) : (
          <View style={styles.noPickupsContainer}>
            <Text style={styles.noPickupsIcon}>{getIconText('calendar-remove')}</Text>
            <Text style={styles.noPickupsText}>No upcoming pickups</Text>
            <TouchableOpacity 
              style={styles.scheduleNowButton}
              onPress={() => navigateToSchedulePickup('All')} 
              activeOpacity={0.7}
            >
              <Text style={styles.scheduleNowText}>Schedule Now</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigateToSchedulePickup('All')}
            activeOpacity={0.7}
          >
            <Text style={styles.quickActionIcon}>{getIconText('calendar-plus')}</Text>
            <Text style={styles.quickActionText}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('TrackTruckScreen')}
            activeOpacity={0.7}
          >
            <Text style={styles.quickActionIcon}>{getIconText('map-marker')}</Text>
            <Text style={styles.quickActionText}>Track</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('History')}
            activeOpacity={0.7}
          >
            <Text style={styles.quickActionIcon}>{getIconText('history')}</Text>
            <Text style={styles.quickActionText}>History</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#27ae60',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 4,
  },
  notificationButton: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: 22,
    color: 'white',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: 'white',
  },
  notificationCount: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  bannerContainer: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  banner: {
    height: 160,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  bannerContent: {
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  bannerButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
    elevation: 2,
  },
  bannerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  mapContainer: {
    marginBottom: 24,
  },
  mapWrapper: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  map: {
    height: 200,
    width: '100%',
  },
  enableLocationButton: {
    height: 200,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  enableLocationText: {
    color: '#27ae60',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  seeAllText: {
    color: '#27ae60',
    fontWeight: '600',
  },
  servicesList: {
    paddingBottom: 16,
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 160,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(39, 174, 96, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceIcon: {
    fontSize: 24,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    lineHeight: 16,
  },
  pickupsList: {
    marginBottom: 24,
  },
  pickupCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pickupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pickupDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  statusBadge: {
    backgroundColor: 'rgba(39, 174, 96, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  statusText: {
    color: '#27ae60',
    fontSize: 12,
    fontWeight: '600',
  },
  pickupDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickupDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickupDetailIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  pickupDetailText: {
    color: '#7f8c8d',
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickActionButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionIcon: {
    fontSize: 24,
    color: '#27ae60',
    marginBottom: 6,
  },
  quickActionText: {
    color: '#2c3e50',
    fontSize: 13,
    fontWeight: '500',
  },
  noPickupsContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  noPickupsIcon: {
    fontSize: 40,
    color: '#bdc3c7',
  },
  noPickupsText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 12,
    marginBottom: 16,
  },
  scheduleNowButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
  },
  scheduleNowText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HomeScreen;