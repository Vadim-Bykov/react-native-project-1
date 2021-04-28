import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStackNavigator} from './AuthStackNavigator';

export const MainNavigator = () => (
  <NavigationContainer>
    <AuthStackNavigator />
  </NavigationContainer>
);
