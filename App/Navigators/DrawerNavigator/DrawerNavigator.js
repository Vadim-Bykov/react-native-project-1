import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {FavoriteScreen} from '../../Screens/FavoriteScreen/FavoriteScreen';
import {MoviesStackNavigator} from '../MoviesStackNavigator';
import {DrawerContent} from './components/DrawerContent';
import {ForumStackNavigator} from '../ForumStackNavigator';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={MoviesStackNavigator} />

      <Drawer.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerShown: true,
          headerLeft: () => null,
          headerTitle: 'Saved',
          headerStyle: {
            backgroundColor: '#F1F1F1',
            elevation: 0,
            width: '80%',
            alignSelf: 'center',
          },
          unmountOnBlur: true,
        }}
      />

      <Drawer.Screen name="Forum" component={ForumStackNavigator} />
    </Drawer.Navigator>
  );
};
