import React, {useEffect, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Icon, Avatar, Badge} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as thunks from '../../../store/auth/operations';
import * as selectors from '../../../store/auth/selectors';
import {
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_TRANSLUCENT_PURPLE,
  COLOR_WHITE,
  DEFAULT_AVATAR,
} from '../../../consts/consts';
import {useNetInfo} from '@react-native-community/netinfo';

export const DrawerContent = props => {
  const {
    state: {routeNames, index},
    navigation,
  } = props;

  const user = useSelector(selectors.getUser);
  const dispatch = useDispatch();

  const {isConnected} = useNetInfo();

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
      {user ? (
        <>
          <View style={styles.header}>
            <View style={styles.userData}>
              <Avatar
                rounded
                size="medium"
                source={{
                  uri: user.photoURL ? user.photoURL : DEFAULT_AVATAR,
                }}>
                <Badge
                  value={
                    isConnected ? (
                      <Icon
                        name="wifi-tethering"
                        size={10}
                        color={COLOR_WHITE}
                      />
                    ) : (
                      <Icon
                        name="portable-wifi-off"
                        size={10}
                        color={COLOR_WHITE}
                      />
                    )
                  }
                  status={isConnected ? 'success' : 'error'}
                  containerStyle={styles.isConnected}
                />
              </Avatar>

              <View style={styles.usernameBlock}>
                <Text style={styles.headerTitle}>Username</Text>
                <Text>{user.displayName}</Text>
              </View>
            </View>

            <Icon
              name="close"
              color={COLOR_GRAY}
              onPress={navigation.closeDrawer}
            />
          </View>

          <DrawerContentScrollView {...props}>
            <DrawerItem
              label="Home"
              focused={routeNames[index] === 'Home' ? true : false}
              activeTintColor={COLOR_BLUE}
              activeBackgroundColor={COLOR_TRANSLUCENT_PURPLE}
              icon={({focused}) => (
                <Icon
                  type="font-awesome-5"
                  name="home"
                  color={focused ? COLOR_BLUE : COLOR_GRAY}
                />
              )}
              labelStyle={styles.labelStyle}
              onPress={goToHomePage}
            />

            <DrawerItem
              label="Favorites"
              focused={routeNames[index] === 'Favorite' ? true : false}
              activeTintColor={COLOR_BLUE}
              activeBackgroundColor={COLOR_TRANSLUCENT_PURPLE}
              icon={({focused}) => (
                <Icon
                  type="antdesign"
                  name="heart"
                  color={focused ? COLOR_BLUE : COLOR_GRAY}
                />
              )}
              labelStyle={styles.labelStyle}
              onPress={goToFavoritePage}
            />

            <DrawerItem
              label="Saved movies"
              focused={routeNames[index] === 'Saved'}
              activeTintColor={COLOR_BLUE}
              activeBackgroundColor={COLOR_TRANSLUCENT_PURPLE}
              icon={({focused}) => (
                <Icon
                  type="ionicons"
                  name="save"
                  color={focused ? COLOR_BLUE : COLOR_GRAY}
                />
              )}
              labelStyle={styles.labelStyle}
              onPress={goToSavedMovies}
            />

            <DrawerItem
              label="Infinity list"
              focused={routeNames[index] === 'Infinity'}
              activeTintColor={COLOR_BLUE}
              activeBackgroundColor={COLOR_TRANSLUCENT_PURPLE}
              icon={({focused}) => (
                <Icon
                  type="font-awesome-5"
                  name="infinity"
                  color={focused ? COLOR_BLUE : COLOR_GRAY}
                />
              )}
              labelStyle={styles.labelStyle}
              onPress={goToInfinityList}
            />

            <DrawerItem
              label="Forums"
              focused={routeNames[index] === 'Forums' ? true : false}
              activeTintColor={COLOR_BLUE}
              activeBackgroundColor={COLOR_TRANSLUCENT_PURPLE}
              icon={({focused}) => (
                <Icon
                  type="antdesign"
                  name="wechat"
                  color={focused ? COLOR_BLUE : COLOR_GRAY}
                />
              )}
              labelStyle={styles.labelStyle}
              onPress={goToForumList}
            />
          </DrawerContentScrollView>

          <DrawerItem
            label="Logout"
            icon={() => (
              <Icon
                type="material-community"
                name="logout-variant"
                color={COLOR_GRAY}
              />
            )}
            labelStyle={styles.labelStyle}
            onPress={logout}
          />
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  isConnected: {
    position: 'absolute',
    right: 0,
  },
  usernameBlock: {
    paddingBottom: 3,
    marginLeft: 5,
  },
  headerTitle: {
    fontSize: 24,
  },
  labelStyle: {
    fontWeight: 'bold',
    letterSpacing: 0.65,
  },
});
