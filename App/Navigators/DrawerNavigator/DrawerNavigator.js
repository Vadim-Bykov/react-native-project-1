import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {FavoriteScreen} from '../../Screens/FavoriteScreen/FavoriteScreen';
import {MoviesStackNavigator} from '../MoviesStackNavigator';
import {DrawerContent} from './components/DrawerContent';
import {ForumStackNavigator} from '../ForumStackNavigator';
import {COLOR_PURPLE, COLOR_WHITE, DEFAULT_BG_COLOR} from '../../consts/consts';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {TouchableOpacity, StyleSheet, useWindowDimensions} from 'react-native';
import {ErrorBoundary} from '../../common/ErrorBoundary';
import {SavedMoviesScreen} from '../../Screens/SavedMovieList/SavedMoviesScreen';
import {InfinityMoviesScreen} from '../../Screens/InfinityList/InfinityMoviesScreen';
import {Header} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {PanResponderComponent} from '../../Screens/PanResponder/PanResponder';
import {PanResponderAnimated} from '../../Screens/PanResponder/PanResponderAnimated';
import {AnimatedScrollView} from '../../Screens/PanResponder/AnimatedScrollView';

const HeaderMenu = ({navigation}) => (
  <TouchableOpacity onPress={navigation.openDrawer}>
    <Icon name="menu" color={COLOR_PURPLE} />
  </TouchableOpacity>
);

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const {width, height} = useWindowDimensions();
  const {colors} = useTheme();

  return (
    <ErrorBoundary width={width} height={height}>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={MoviesStackNavigator} />

        <Drawer.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={({navigation}) => ({
            headerShown: true,
            unmountOnBlur: true,
            // headerTitleStyle: styles().savedScreenTitle,
            // headerLeft: () => <HeaderMenu navigation={navigation} />,
            // headerTitle: 'Favorite',
            // headerStyle: styles().savedScreenHeader,
            header: () => (
              <Header
                placement="left"
                containerStyle={styles().favoriteScreenHeader}
                leftComponent={{
                  icon: 'menu',
                  color: COLOR_WHITE,
                  onPress: navigation.openDrawer,
                }}
                centerComponent={{
                  text: 'Favorite',
                  style: {color: COLOR_WHITE},
                }}
                centerContainerStyle={{
                  justifyContent: 'center',
                }}
                backgroundColor="transparent"
                backgroundImage={{
                  uri: 'http://beeimg.com/images/m76498322992.jpg',
                }}
              />
            ),
          })}
        />

        <Drawer.Screen
          name="Saved"
          component={SavedMoviesScreen}
          options={({navigation}) => ({
            headerShown: true,
            headerTitleStyle: styles().savedScreenTitle,
            headerLeft: () => <HeaderMenu navigation={navigation} />,
            headerTitle: 'Saved movies',
            headerStyle: styles(colors.background).savedScreenHeader,
            unmountOnBlur: true,
          })}
        />

        <Drawer.Screen
          name="Infinity"
          component={InfinityMoviesScreen}
          options={({navigation}) => ({
            headerShown: true,
            headerTitleStyle: styles().savedScreenTitle,
            headerLeft: () => <HeaderMenu navigation={navigation} />,
            headerTitle: 'Infinity list',
            headerStyle: styles(colors.background).savedScreenHeader,
          })}
        />

        <Drawer.Screen name="Forums" component={ForumStackNavigator} />

        <Drawer.Screen
          name="PanResponder"
          component={AnimatedScrollView}
          // component={PanResponderAnimated}
          // component={PanResponderComponent}
          options={({navigation}) => ({
            headerShown: true,
            headerTitle: 'PanResponder',
            headerTitleStyle: styles().savedScreenTitle,
            headerLeft: () => <HeaderMenu navigation={navigation} />,
            headerStyle: styles(colors.background).savedScreenHeader,
          })}
        />
      </Drawer.Navigator>
    </ErrorBoundary>
  );
};

const styles = backgroundColor =>
  StyleSheet.create({
    favoriteScreenHeader: {
      paddingTop: 15,
      paddingHorizontal: 20,
    },
    savedScreenHeader: {
      backgroundColor,
      elevation: 0,
      paddingLeft: 20,
    },
    savedScreenTitle: {
      color: COLOR_PURPLE,
      marginLeft: -20,
    },
  });
