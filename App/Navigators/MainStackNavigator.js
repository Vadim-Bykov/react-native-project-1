import React, {useEffect} from 'react';
import {StatusBar, useWindowDimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackNavigator} from './AuthStackNavigator';
import {SplashScreen} from '../Screens/StartScreen/SplashScreen';
import {useDispatch, useSelector} from 'react-redux';
import * as selectors from '../store/auth/selectors';
import * as thunks from '../store/auth/operations';
import {DrawerNavigator} from './DrawerNavigator/DrawerNavigator';
import {DEFAULT_BG_COLOR, STACK_SCREEN_OPTIONS} from '../consts/consts';
import {ErrorBoundary} from '../common/ErrorBoundary';

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  const isAuth = useSelector(selectors.getIsAuth);
  const initialized = useSelector(selectors.getInitialized);
  const dispatch = useDispatch();

  useEffect(() => dispatch(thunks.authFireBase()), []);

  const {width, height} = useWindowDimensions();

  return (
    <ErrorBoundary width={width} height={height}>
      <StatusBar
        translucent={true}
        backgroundColor={isAuth ? DEFAULT_BG_COLOR : 'transparent'}
        barStyle={isAuth ? 'dark-content' : 'default'}
      />

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
    </ErrorBoundary>
  );
};
