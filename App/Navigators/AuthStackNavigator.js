import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignInScreen} from '../Screens/SignIn/SignInScreen';
import {SignUpScreen} from '../Screens/SignUp/SignUpScreen';

const Stack = createStackNavigator();

export const AuthStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{headerTitle: false, headerTransparent: 1}}
    />
  </Stack.Navigator>
);
