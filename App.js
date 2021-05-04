import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {AppNavigator} from './App/Navigators/AppNavigator';
import store from './App/store/store';

export const App = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  </Provider>
);
