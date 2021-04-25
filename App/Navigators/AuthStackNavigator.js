import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {SignInScreen} from '../Screens/SignIn/SignInScreen';
import {SignUpScreen} from '../Screens/SignUp/SignUpScreen';

const Stack = createStackNavigator();

export const AuthStackNavigator = () => {
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
        gestureDirection: 'horizontal-inverted',
      }}
      mode="modal">
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
        }}
      />
    </Stack.Navigator>
  );
};
