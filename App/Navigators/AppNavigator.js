import React, {useLayoutEffect, useState} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {MainStackNavigator} from './MainStackNavigator';
import {useColorScheme} from 'react-native';

export const AppNavigator = () => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useLayoutEffect(() => {
    setTheme(colorScheme);
  }, [colorScheme]);

  console.log(colorScheme);
  // console.log(DarkTheme);
  // console.log(DefaultTheme);
  console.log(theme);

  return (
    <NavigationContainer
      theme={
        theme === 'dark'
          ? {...DarkTheme, theme, setTheme}
          : {...DefaultTheme, theme, setTheme}
      }>
      <MainStackNavigator />
    </NavigationContainer>
  );
};
