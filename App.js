import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainNavigator} from './App/Navigators/MainNavigator';

export const App = () => (
  <SafeAreaProvider>
    <MainNavigator />
  </SafeAreaProvider>
);
