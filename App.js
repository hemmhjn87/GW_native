// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
// Import your screens
import { app } from './config/firebase';

import HomeScreen from './src/screens/HomeScreen';
import SchedulePickupScreen from './src/screens/SchedulePickupScreen';
import TrackTruckScreen from './src/screens/TrackTruckScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for screens that need to be accessed from tabs
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}