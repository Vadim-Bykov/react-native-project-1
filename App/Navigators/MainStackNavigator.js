import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackNavigator} from './AuthStackNavigator';
import {SplashScreen} from '../Screens/StartScreen/SplashScreen';
import {useDispatch, useSelector} from 'react-redux';
import * as selectors from '../store/auth/selectors';
import * as thunks from '../store/auth/operations';
import {DrawerNavigator} from './DrawerNavigator/DrawerNavigator';
import {STACK_SCREEN_OPTIONS} from '../consts/consts';

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  const isAuth = useSelector(selectors.getIsAuth);
  const initialized = useSelector(selectors.getInitialized);
  const dispatch = useDispatch();

  useEffect(() => dispatch(thunks.authFireBase()), []);

  return (
    <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS} mode="modal">
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
