import React, {useEffect, useState} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {HomeScreen} from '../Screens/Home/HomeScreen';
import {STACK_SCREEN_OPTIONS} from '../consts/consts';
import {Icon} from 'react-native-elements';
import {HomeScreenProvider} from '../Screens/Home/HomeScreenProvider';

const Stack = createStackNavigator();

export const MoviesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS} mode="modal">
      <Stack.Screen
        name="Movies"
        component={HomeScreenProvider}
        options={{
          headerTransparent: 1,
          headerTitle: false,
          headerLeftContainerStyle: {paddingLeft: 20},
          headerRightContainerStyle: {paddingRight: 20},
          headerLeft: () => <Icon name="menu" color="#000" />,
          headerRight: () => (
            <Icon type="antdesign" name="search1" color="#000" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
