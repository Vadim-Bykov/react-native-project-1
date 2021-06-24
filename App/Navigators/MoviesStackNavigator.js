import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_SCREEN_OPTIONS} from '../consts/consts';
import {Icon} from 'react-native-elements';
import {HomeScreen} from '../Screens/Home/HomeScreen';
import {DetailsScreen} from '../Screens/Home/DetailsScreen';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';

const Stack = createStackNavigator();

export const MoviesStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS} mode="modal">
      <Stack.Screen
        name="Movies"
        component={HomeScreen}
        options={{
          headerBackground: () => (
            <View style={{flex: 1, backgroundColor: '#F1F1F1'}} />
          ),
          headerTitle: false,
          headerTransparent: true,
          headerLeftContainerStyle: {paddingLeft: 20},
          headerRightContainerStyle: {paddingRight: 20},
          headerLeft: () => (
            <TouchableOpacity onPress={navigation.openDrawer}>
              <Icon name="menu" color="#8B5AB1" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Icon type="antdesign" name="search1" color="#8B5AB1" />
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
            <Icon type="ionicon" name="chevron-back" color="#8B5AB1" />
          ),
          headerLeftContainerStyle: {paddingLeft: 10},
          headerStatusBarHeight: 0,
          headerStyle: {height: 100},
        }}
      />
    </Stack.Navigator>
  );
};
