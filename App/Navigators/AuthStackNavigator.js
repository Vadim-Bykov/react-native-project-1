import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignInScreen} from '../Screens/SignIn/SignInScreen';
import {SignUpScreen} from '../Screens/SignUp/SignUpScreen';
import {Easing} from 'react-native';

const Stack = createStackNavigator();

export const AuthStackNavigator = () => {
  const config = {
    animation: 'timing',
    config: {
      duration: 300,
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
