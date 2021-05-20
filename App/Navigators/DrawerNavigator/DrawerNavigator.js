import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {FavoriteScreen} from '../../Screens/FavoriteScreen/FavoriteScreen';
import {MoviesStackNavigator} from '../MoviesStackNavigator';
import {DrawerContent} from './components/DrawerContent';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#5535E5',
        activeBackgroundColor: '#E9DCFB',
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={MoviesStackNavigator}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Drawer.Screen name="Favorite" component={FavoriteScreen} />
    </Drawer.Navigator>
  );
};
