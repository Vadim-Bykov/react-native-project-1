import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as thunks from '../../../store/auth/operations';
import * as selectors from '../../../store/auth/selectors';

export const DrawerContent = props => {
  const {
    state: {routeNames, index},
    navigation,
  } = props;
  const user = useSelector(selectors.getUser);

  const dispatch = useDispatch();

  const goToFavoritePage = () => navigation.navigate('Favorite');

  const logout = () => {
    navigation.closeDrawer();
    dispatch(thunks.logout());
  };

  return (
    <>
      {user ? (
        <>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>User name</Text>
              <Text>{user.displayName}</Text>
            </View>
            <Icon
              name="close"
              color="#6A6A6A"
              onPress={navigation.closeDrawer}
            />
          </View>

          <DrawerContentScrollView {...props}>
            {/* <DrawerItemList {...props} /> */}
            <DrawerItem
              label="Favorites"
              // focused={index === 1 ? true : false}
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
  headerTitle: {
    fontSize: 24,
  },
  labelStyle: {
    fontWeight: 'bold',
    letterSpacing: 0.65,
  },
});
