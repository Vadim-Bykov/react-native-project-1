import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {MainStackNavigator} from './MainStackNavigator';
import {useColorScheme} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {COLOR_BLACK, DEFAULT_BG_COLOR} from '../consts/consts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppNavigator = () => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useLayoutEffect(() => {
    setTheme(colorScheme);
  }, [colorScheme]);

  console.log(theme);
  // console.log(DarkTheme);
  // console.log(DefaultTheme);

  useEffect(async () => {
    try {
      const bool = await AsyncStorage.getItem('fullscreen');

      bool && setIsFullScreen(JSON.parse(bool));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      const color = theme === 'dark' ? COLOR_BLACK : DEFAULT_BG_COLOR;

      const isLightIcons = theme === 'dark' ? false : true;

      changeNavigationBarColor(color, isLightIcons, true);
    } catch (error) {
      console.error(`AsyncStorage Error: ${error}`);
    }
  }, [theme, isFullScreen]);

  return (
    <NavigationContainer
      theme={
        theme === 'dark'
          ? {...DarkTheme, setTheme, isFullScreen, setIsFullScreen}
          : {...DefaultTheme, setTheme, isFullScreen, setIsFullScreen}
      }>
      <MainStackNavigator />
    </NavigationContainer>
  );
};
