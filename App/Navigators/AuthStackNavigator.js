import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignInScreen} from '../Screens/Auth/SignInScreen';
import {SignUpScreen} from '../Screens/Auth/SignUpScreen';
import {COLOR_WHITE, STACK_SCREEN_OPTIONS} from '../consts/consts';
import {Icon} from 'react-native-elements';

const Stack = createStackNavigator();

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS} mode="modal">
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
          headerTransparent: true,
          headerBackImage: () => (
            <Icon type="ionicon" name="chevron-back" color={COLOR_WHITE} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
