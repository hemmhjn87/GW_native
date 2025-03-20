import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen';
import SchedulePickupScreen from '../screens/SchedulePickupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MapScreen from '../screens/MapScreen';
import TrackTruckScreen from '../screens/TrackTruckScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for Home screen and its related screens
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TrackTruckScreen" component={TrackTruckScreen} /> 
    </Stack.Navigator>
  );
};

// Stack navigator for Schedule Pickup flow
const ScheduleStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SchedulePickupScreen" component={SchedulePickupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarLabel: 'My Orders',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="clipboard-list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SchedulePickup"
        component={ScheduleStack}
        options={{
          tabBarLabel: 'Schedule',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-clock" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;