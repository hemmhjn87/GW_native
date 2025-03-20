import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import SplashScreen from '../screens/SplashScreen';

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initially false

  useEffect(() => {
    // Simulating checking stored login session
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <BottomTabNavigator />
      ) : (
        <AuthNavigator setIsAuthenticated={setIsAuthenticated} />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
