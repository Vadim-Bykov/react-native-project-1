import React, {useEffect} from 'react';
import {StatusBar, useWindowDimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackNavigator} from './AuthStackNavigator';
import {SplashScreen} from '../Screens/StartScreen/SplashScreen';
import {useDispatch, useSelector} from 'react-redux';
import * as selectors from '../store/auth/selectors';
import * as thunks from '../store/auth/operations';
import {DrawerNavigator} from './DrawerNavigator/DrawerNavigator';
import {STACK_SCREEN_OPTIONS} from '../consts/consts';
import {ErrorBoundary} from '../common/ErrorBoundary';
import {useTheme} from '@react-navigation/native';

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  const isAuth = useSelector(selectors.getIsAuth);
  const initialized = useSelector(selectors.getInitialized);
  const dispatch = useDispatch();

  useEffect(() => dispatch(thunks.authFireBase()), []);

  const {width, height} = useWindowDimensions();
  const {dark, colors, isFullScreen} = useTheme();

  return (
    <ErrorBoundary width={width} height={height}>
      <StatusBar
        hidden={isFullScreen}
        translucent={true}
        backgroundColor={!isAuth ? 'transparent' : colors.background}
        barStyle={!isAuth || dark ? 'default' : 'dark-content'}
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
