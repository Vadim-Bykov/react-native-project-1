import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useLayoutEffect} from 'react';
import {StatusBar} from 'react-native';
import {StyleSheet, Keyboard, AppState, Text, View, Switch} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import {useDispatch} from 'react-redux';
import {
  COLOR_GRAY,
  COLOR_GREEN,
  COLOR_ROSE_RED,
  COMMON_ERROR_MESSAGE,
} from '../../../consts/consts';
import {setError} from '../../../store/auth/actions';

export const ToggleFullScreenItem = React.memo(
  ({dark, colorText, isFullScreen, setIsFullScreen}) => {
    const dispatch = useDispatch();

    const hideNavBar = useCallback(() => {
      if (isFullScreen) {
        hideNavigationBar();
        //Refresh BarStyle after displaying keyboard
        StatusBar.setBarStyle(dark ? 'default' : 'dark-content');
      }
    }, [isFullScreen]);

    const showNavBar = useCallback(() => {
      if (isFullScreen) {
        showNavigationBar();
        //Refresh BarStyle after displaying keyboard
        StatusBar.setBarStyle(dark ? 'default' : 'dark-content');
      }
    }, [isFullScreen]);

    useLayoutEffect(hideNavBar, [isFullScreen]);

    useEffect(() => {
      Keyboard.addListener('keyboardDidHide', hideNavBar);
      Keyboard.addListener('keyboardDidShow', showNavBar);

      return () => {
        Keyboard.removeListener('keyboardDidHide', hideNavBar);
        Keyboard.removeListener('keyboardDidShow', showNavBar);
      };
    }, [isFullScreen]);

    const changeIsFullScreen = useCallback(() => {
      try {
        AsyncStorage.setItem('fullscreen', JSON.stringify(!isFullScreen));

        isFullScreen && showNavigationBar();

        setIsFullScreen(!isFullScreen);
      } catch (error) {
        dispatch(setError(`AsyncStorage Error: ${COMMON_ERROR_MESSAGE}`));
        console.error(`AsyncStorage Error: ${error}`);
      }
    }, [isFullScreen]);

    const handleAppState = useCallback(
      nextAppState => {
        if (isFullScreen && nextAppState === 'active') {
          hideNavigationBar();
          //Refresh BarStyle after background app
          StatusBar.setBarStyle(dark ? 'default' : 'dark-content');
        }
      },
      [isFullScreen, dark],
    );

    useEffect(() => {
      AppState.addEventListener('change', handleAppState);

      return () => {
        AppState.removeEventListener('change', handleAppState);
      };
    }, [isFullScreen, dark]);

    return (
      <View style={styles().modeItemContainer}>
        <Icon
          name={isFullScreen ? 'fullscreen-exit' : 'fullscreen'}
          color={isFullScreen ? COLOR_GREEN : COLOR_ROSE_RED}
        />

        <Text style={styles(colorText).modeText}>Fullscreen</Text>

        <Switch
          trackColor={{false: COLOR_GRAY, true: '#81b0ff'}}
          value={isFullScreen}
          onValueChange={changeIsFullScreen}
        />
      </View>
    );
  },
);

const styles = color =>
  StyleSheet.create({
    modeItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20,
      marginVertical: 10,
    },
    modeText: {
      color,
      fontWeight: 'bold',
      letterSpacing: 0.65,
      marginLeft: 30,
    },
  });
