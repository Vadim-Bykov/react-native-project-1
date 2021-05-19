import React, {useEffect, useState} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {AuthStackNavigator} from './AuthStackNavigator';
import {SplashScreen} from '../Screens/StartScreen/SplashScreen';
import {useDispatch, useSelector} from 'react-redux';
import * as selectors from '../store/auth/selectors';
import * as thunks from '../store/auth/operations';
import {MoviesStackNavigator} from './MoviesStackNavigator';
import {DrawerNavigator} from './DrawerNavigator/DrawerNavigator';

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  const isAuth = useSelector(selectors.getIsAuth);
  const initialized = useSelector(selectors.getInitialized);
  const dispatch = useDispatch();

  useEffect(() => dispatch(thunks.authFireBase()), []);

  const config = {
    animation: 'timing',
    config: {
      duration: 200,
    },
  };

  return (
    <Stack.Navigator
      screenOptions={{
        transitionSpec: {open: config, close: config},
        // cardStyle: {backgroundColor: 'transparent'},
        cardOverlayEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
      mode="modal">
      {!initialized ? (
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
      ) : isAuth ? (
        <Stack.Screen
          name="Home"
          component={DrawerNavigator}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthStackNavigator}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};
