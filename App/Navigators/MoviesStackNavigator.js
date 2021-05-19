import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_SCREEN_OPTIONS} from '../consts/consts';
import {Icon} from 'react-native-elements';
import {HomeScreenProvider} from '../Screens/Home/HomeScreenProvider';
import {DetailsScreen} from '../Screens/Home/DetailsScreen';
import {View} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {DrawerNavigator} from './DrawerNavigator/DrawerNavigator';

const Stack = createStackNavigator();

export const MoviesStackNavigator = ({navigation}) => {
  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS} mode="modal">
      <Stack.Screen
        name="Movies"
        component={HomeScreenProvider}
        options={{
          headerTransparent: true,
          headerBackground: () => (
            <View style={{flex: 1, backgroundColor: '#F1F1F1'}} />
          ),
          headerTitle: false,
          headerLeftContainerStyle: {paddingLeft: 20},
          headerRightContainerStyle: {paddingRight: 20},
          headerLeft: () => (
            <Icon name="menu" color="#000" onPress={openDrawer} />
          ),
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
          headerTransparent: true,
          headerBackImage: () => (
            <Icon type="ionicon" name="chevron-back" color="#fff" />
          ),
          headerLeftContainerStyle: {paddingLeft: 10},
          headerStatusBarHeight: 0,
          headerStyle: {height: 100},
        }}
      />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};
