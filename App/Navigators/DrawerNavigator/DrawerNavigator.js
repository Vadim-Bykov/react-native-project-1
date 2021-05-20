import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {FavoriteScreen} from '../../Screens/FavoriteScreen/FavoriteScreen';
import {MoviesStackNavigator} from '../MoviesStackNavigator';
import {DrawerContent} from './components/DrawerContent';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      // drawerContentOptions={{
      //   activeTintColor: '#5535E5',
      //   activeBackgroundColor: '#E9DCFB',
      // }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={MoviesStackNavigator}
        // options={{
        //   headerShown: true,
        // }}
      />
      <Drawer.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerShown: true,
          headerLeft: () => null,
          headerTitle: 'Saved',
          headerStyle: {backgroundColor: '#F1F1F1', elevation: 0},
          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
};
