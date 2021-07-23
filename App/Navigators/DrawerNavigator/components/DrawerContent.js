import React, {useMemo} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import * as thunks from '../../../store/auth/operations';
import {
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_TRANSLUCENT_PURPLE,
} from '../../../consts/consts';
import {useTheme} from '@react-navigation/native';
import {Header} from './Header';
import {SwitchModeItem} from './SwitchModeItem';
import {ToggleFullScreenItem} from './ToggleFullScreenItem';

export const DrawerContent = props => {
  const {
    state: {routeNames, index},
    navigation,
  } = props;

  const dispatch = useDispatch();

  const {dark, colors, setTheme, isFullScreen, setIsFullScreen} = useTheme();

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
          labelStyle={styles.labelStyle}
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
          labelStyle={styles.labelStyle}
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
          labelStyle={styles.labelStyle}
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
          labelStyle={styles.labelStyle}
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
          labelStyle={styles.labelStyle}
          onPress={goToForumList}
        />

        <SwitchModeItem dark={dark} colorText={colorText} setTheme={setTheme} />

        <ToggleFullScreenItem
          colorText={colorText}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
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
        labelStyle={styles.labelStyle}
        onPress={logout}
      />
    </>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    fontWeight: 'bold',
    letterSpacing: 0.65,
  },
});
