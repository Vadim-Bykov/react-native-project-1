import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStackNavigator} from './MainStackNavigator';
import {useColorScheme, DefaultTheme, DarkTheme} from 'react-native';

export const AppNavigator = () => {
  const colorScheme = useColorScheme();
  console.log(colorScheme);
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <MainStackNavigator />
    </NavigationContainer>
  );
};
