import React, {useCallback, useMemo} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import * as thunks from '../../../store/auth/operations';
import {
  COLOR_BLUE,
  COLOR_DARK_YELLOW,
  COLOR_GRAY,
  COLOR_TRANSLUCENT_PURPLE,
} from '../../../consts/consts';
import {useTheme} from '@react-navigation/native';
import {Switch} from 'react-native';
import {Header} from './Header';
import {ToastAndroid} from 'react-native';

export const DrawerContent = props => {
  const {
    state: {routeNames, index},
    navigation,
  } = props;

  const dispatch = useDispatch();

  const {dark, colors, setTheme} = useTheme();
  console.log('useTheme', dark, colors);

  const toggleTheme = useCallback(() => {
    setTheme(dark ? 'light' : 'dark');
    ToastAndroid.show(
      'The theme will be changed to default after closing app. If you want to change the theme permanently, please set it in settings device',
      ToastAndroid.LONG,
    );
  }, [dark]);

  const colorText = useMemo(() => (dark ? colors.text : COLOR_GRAY), [dark]);

  const goToFavoritePage = () => navigation.navigate('Favorite');
  const goToHomePage = () => navigation.navigate('Home');
  const goToForumList = () => navigation.navigate('Forums');
  const goToSavedMovies = () => navigation.navigate('Saved');
  const goToInfinityList = () => navigation.navigate('Infinity');

  const logout = () => {
    navigation.closeDrawer();
    dispatch(thunks.logout());
  };

  return (
    <>
      <Header colorText={colorText} closeDrawer={navigation.closeDrawer} />

      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Home"
          focused={routeNames[index] === 'Home' ? true : false}
          activeTintColor={COLOR_BLUE}
          inactiveTintColor={colorText}
          activeBackgroundColor={COLOR_TRANSLUCENT_PURPLE}
          icon={({focused}) => (
            <Icon
              type="font-awesome-5"
              name="home"
              color={focused ? COLOR_BLUE : colorText}
            />
          )}
          labelStyle={styles().labelStyle}
          onPress={goToHomePage}
        />

        <DrawerItem
          label="Favorites"
          focused={routeNames[index] === 'Favorite' ? true : false}
          activeTintColor={COLOR_BLUE}
          inactiveTintColor={colorText}
          activeBackgroundColor={COLOR_TRANSLUCENT_PURPLE}
          icon={({focused}) => (
            <Icon
              type="antdesign"
              name="heart"
              color={focused ? COLOR_BLUE : colorText}
            />
          )}
          labelStyle={styles().labelStyle}
          onPress={goToFavoritePage}
        />

        <DrawerItem
          label="Saved movies"
          focused={routeNames[index] === 'Saved'}
          activeTintColor={COLOR_BLUE}
          inactiveTintColor={colorText}
          activeBackgroundColor={COLOR_TRANSLUCENT_PURPLE}
          icon={({focused}) => (
            <Icon
              type="ionicons"
              name="save"
              color={focused ? COLOR_BLUE : colorText}
            />
          )}
          labelStyle={styles().labelStyle}
          onPress={goToSavedMovies}
        />

        <DrawerItem
          label="Infinity list"
          focused={routeNames[index] === 'Infinity'}
          activeTintColor={COLOR_BLUE}
          inactiveTintColor={colorText}
          activeBackgroundColor={COLOR_TRANSLUCENT_PURPLE}
          icon={({focused}) => (
            <Icon
              type="font-awesome-5"
              name="infinity"
              color={focused ? COLOR_BLUE : colorText}
            />
          )}
          labelStyle={styles().labelStyle}
          onPress={goToInfinityList}
        />

        <DrawerItem
          label="Forums"
          focused={routeNames[index] === 'Forums' ? true : false}
          activeTintColor={COLOR_BLUE}
          inactiveTintColor={colorText}
          activeBackgroundColor={COLOR_TRANSLUCENT_PURPLE}
          icon={({focused}) => (
            <Icon
              type="antdesign"
              name="wechat"
              color={focused ? COLOR_BLUE : colorText}
            />
          )}
          labelStyle={styles().labelStyle}
          onPress={goToForumList}
        />

        <View style={styles().modeItemContainer}>
          <Icon
            name={dark ? 'nights-stay' : 'wb-sunny'}
            color={COLOR_DARK_YELLOW}
          />

          <Text style={[styles().labelStyle, styles(colorText).modeText]}>
            {dark ? 'Dark' : 'Light'} mode
          </Text>

          <Switch
            trackColor={{false: '#FFEE82', true: '#81b0ff'}}
            thumbColor={COLOR_DARK_YELLOW}
            value={dark}
            onValueChange={toggleTheme}
          />
        </View>
      </DrawerContentScrollView>

      <DrawerItem
        label="Logout"
        inactiveTintColor={colorText}
        icon={() => (
          <Icon
            type="material-community"
            name="logout-variant"
            color={colorText}
          />
        )}
        labelStyle={styles().labelStyle}
        onPress={logout}
      />
    </>
  );
};

const styles = color =>
  StyleSheet.create({
    labelStyle: {
      fontWeight: 'bold',
      letterSpacing: 0.65,
    },
    modeItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20,
    },
    modeText: {
      color,
      marginLeft: 30,
    },
  });
