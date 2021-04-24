import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {SignInScreen} from '../Screens/SignIn/SignInScreen';
import {SignUpScreen} from '../Screens/SignUp/SignUpScreen';
import {Easing} from 'react-native';

const Stack = createStackNavigator();

export const AuthStackNavigator = () => {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = {fontFamily: 'sans-serif-thin'};
  const config = {
    animation: 'timing',
    config: {
      duration: 400,
      easing: Easing.quad,
    },
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerTitle: false,
          headerTransparent: 1,
          headerTintColor: '#fff',
          transitionSpec: {open: config, close: config},
        }}
      />
    </Stack.Navigator>
  );
};
