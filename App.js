import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {MainNavigator} from './App/Navigators/MainNavigator';
import store from './App/store/store';

export const App = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <MainNavigator />
    </SafeAreaProvider>
  </Provider>
);
