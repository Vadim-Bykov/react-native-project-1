import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {FavoriteScreen} from '../../Screens/FavoriteScreen/FavoriteScreen';
import {MoviesStackNavigator} from '../MoviesStackNavigator';
import {DrawerContent} from './components/DrawerContent';
import {ForumStackNavigator} from '../ForumStackNavigator';
import {COLOR_PURPLE, DEFAULT_BG_COLOR} from '../../consts/consts';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {TouchableOpacity, StyleSheet, useWindowDimensions} from 'react-native';
import {ErrorBoundary} from '../../common/ErrorBoundary';
import {SavedMoviesScreen} from '../../Screens/SavedMovieList/SavedMoviesScreen';
import {InfinityMoviesScreen} from '../../Screens/InfinityList/InfinityMoviesScreen';

const HeaderMenu = ({navigation}) => (
  <TouchableOpacity onPress={navigation.openDrawer}>
    <Icon name="menu" color={COLOR_PURPLE} />
  </TouchableOpacity>
);

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const {width, height} = useWindowDimensions();

  return (
    <ErrorBoundary width={width} height={height}>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={MoviesStackNavigator} />

        <Drawer.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={({navigation}) => ({
            headerShown: true,
            headerTitleStyle: styles.favoriteScreenTitle,
            headerLeft: () => <HeaderMenu navigation={navigation} />,
            headerTitle: 'Favorite',
            headerStyle: styles.favoriteScreenHeader,
            unmountOnBlur: true,
          })}
        />

        <Drawer.Screen
          name="Saved"
          component={SavedMoviesScreen}
          options={({navigation}) => ({
            headerShown: true,
            headerTitleStyle: styles.favoriteScreenTitle,
            headerLeft: () => <HeaderMenu navigation={navigation} />,
            headerTitle: 'Saved movies',
            headerStyle: styles.favoriteScreenHeader,
          })}
        />

        <Drawer.Screen
          name="Infinity"
          component={InfinityMoviesScreen}
          options={({navigation}) => ({
            headerShown: true,
            headerTitleStyle: styles.favoriteScreenTitle,
            headerLeft: () => <HeaderMenu navigation={navigation} />,
            headerTitle: 'Infinity list',
            headerStyle: styles.favoriteScreenHeader,
          })}
        />

        <Drawer.Screen name="Forums" component={ForumStackNavigator} />
      </Drawer.Navigator>
    </ErrorBoundary>
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
