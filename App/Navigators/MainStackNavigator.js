import React, {useEffect, useState} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {HomeScreen} from '../Screens/Home/HomeScreen';
import {AuthStackNavigator} from './AuthStackNavigator';
import {SplashScreen} from '../Screens/StartScreen/SplashScreen';
import {useAuthentication} from '../Screens/StartScreen/components/useAuthentication';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../store/auth/actions';
import * as selectors from '../store/auth/selectors';
import * as thunks from '../store/auth/operations';

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  const isAuth = useSelector(selectors.getIsAuth);
  const dispatch = useDispatch();

  const {authorized, userData, initializing} = useAuthentication();

  useEffect(() => {
    dispatch(actions.setIsAuth(authorized));
    dispatch(actions.setUser(userData));
  }, [authorized]);

  // const initialized = useSelector(selectors.getInitialized);
  // useEffect(() => dispatch(thunks.authFireBase()), []);

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
        cardStyle: {backgroundColor: 'transparent'},
        cardOverlayEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
      mode="modal">
      {initializing ? (
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
      ) : isAuth ? (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
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
