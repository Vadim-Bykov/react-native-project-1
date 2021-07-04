import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {FavoriteScreen} from '../../Screens/FavoriteScreen/FavoriteScreen';
import {MoviesStackNavigator} from '../MoviesStackNavigator';
import {DrawerContent} from './components/DrawerContent';
import {ForumStackNavigator} from '../ForumStackNavigator';
import {COLOR_PURPLE, DEFAULT_BG_COLOR} from '../../consts/consts';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {TouchableOpacity, StyleSheet} from 'react-native';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={MoviesStackNavigator} />

      <Drawer.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTitleStyle: styles.favoriteScreenTitle,
          headerLeft: () => (
            <TouchableOpacity onPress={navigation.openDrawer}>
              <Icon name="menu" color={COLOR_PURPLE} />
            </TouchableOpacity>
          ),
          headerTitle: 'Saved',
          headerStyle: styles.favoriteScreenHeader,
          unmountOnBlur: true,
        })}
      />

      <Drawer.Screen name="Forums" component={ForumStackNavigator} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  favoriteScreenHeader: {
    backgroundColor: DEFAULT_BG_COLOR,
    elevation: 0,
    paddingLeft: 20,
  },
  favoriteScreenTitle: {
    color: COLOR_PURPLE,
    marginLeft: -20,
  },
});
