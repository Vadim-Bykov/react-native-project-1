import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Icon, Avatar} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as thunks from '../../../store/auth/operations';
import * as selectors from '../../../store/auth/selectors';
import * as actions from '../../../store/auth/actions';
import {DEFAULT_AVATAR} from '../../../consts/consts';

export const DrawerContent = props => {
  const {
    state: {routeNames, index},
    navigation,
  } = props;

  const user = useSelector(selectors.getUser);

  const dispatch = useDispatch();

  const goToFavoritePage = () => {
    dispatch(actions.setIsFetching(true));
    navigation.navigate('Favorite');
  };
  const goToHomePage = () => navigation.navigate('Home');
  const goToForumList = () => navigation.navigate('Forums');

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
                }}
              />

              <View style={styles.usernameBlock}>
                <Text style={styles.headerTitle}>Username</Text>
                <Text>{user.displayName}</Text>
              </View>
            </View>

            <Icon
              name="close"
              color="#6A6A6A"
              onPress={navigation.closeDrawer}
            />
          </View>

          <DrawerContentScrollView {...props}>
            <DrawerItem
              label="Home"
              focused={routeNames[index] === 'Home' ? true : false}
              activeTintColor="#5535E5"
              activeBackgroundColor="#E9DCFB"
              icon={({focused}) => (
                <Icon
                  type="font-awesome-5"
                  name="home"
                  color={focused ? '#5535E5' : '#6A6A6A'}
                />
              )}
              labelStyle={styles.labelStyle}
              onPress={goToHomePage}
            />

            <DrawerItem
              label="Favorites"
              focused={routeNames[index] === 'Favorite' ? true : false}
              activeTintColor="#5535E5"
              activeBackgroundColor="#E9DCFB"
              icon={({focused}) => (
                <Icon
                  type="antdesign"
                  name="heart"
                  color={focused ? '#5535E5' : '#6A6A6A'}
                />
              )}
              labelStyle={styles.labelStyle}
              onPress={goToFavoritePage}
            />

            <DrawerItem
              label="Forums"
              focused={routeNames[index] === 'Forums' ? true : false}
              activeTintColor="#5535E5"
              activeBackgroundColor="#E9DCFB"
              icon={({focused}) => (
                <Icon
                  type="antdesign"
                  name="wechat"
                  color={focused ? '#5535E5' : '#6A6A6A'}
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
                color="#6A6A6A"
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
    marginBottom: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userData: {
    flexDirection: 'row',
    alignItems: 'center',
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
