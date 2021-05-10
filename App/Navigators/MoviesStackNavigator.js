import React, {useEffect, useState} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {HomeScreen} from '../Screens/Home/HomeScreen';
import {STACK_SCREEN_OPTIONS} from '../consts/consts';
import {Icon} from 'react-native-elements';
import {HomeScreenProvider} from '../Screens/Home/HomeScreenProvider';
import {DetailsScreen} from '../Screens/Home/DetailsScreen';
import {goBack} from '@react-navigation/compat/lib/typescript/src/helpers';

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
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerTitle: false,
          headerTransparent: 1,
          headerBackImage: () => (
            <Icon type="ionicon" name="chevron-back" color="#fff" />
          ),
          headerLeftContainerStyle: {paddingLeft: 10},
          headerStatusBarHeight: 0,
          headerStyle: {height: 100},
        }}
      />
    </Stack.Navigator>
  );
};
