import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon, Avatar, Badge} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';
import * as selectors from '../../../store/auth/selectors';
import {COLOR_WHITE, DEFAULT_AVATAR} from '../../../consts/consts';

export const Header = ({colorText, closeDrawer}) => {
  const user = useSelector(selectors.getUser);
  const {isConnected} = useNetInfo();

  return (
    <>
      {user && (
        <View style={styles().header}>
          <View style={styles().userData}>
            <Avatar
              rounded
              size="medium"
              source={{
                uri: user.photoURL ? user.photoURL : DEFAULT_AVATAR,
              }}>
              <Badge
                value={
                  isConnected ? (
                    <Icon name="wifi-tethering" size={10} color={COLOR_WHITE} />
                  ) : (
                    <Icon
                      name="portable-wifi-off"
                      size={10}
                      color={COLOR_WHITE}
                    />
                  )
                }
                status={isConnected ? 'success' : 'error'}
                containerStyle={styles().isConnected}
              />
            </Avatar>

            <View style={styles().usernameBlock}>
              <Text style={styles(colorText).headerTitle}>Username</Text>
              <Text style={styles(colorText).displayName}>
                {user.displayName}
              </Text>
            </View>
          </View>

          <Icon name="close" color={colorText} onPress={closeDrawer} />
        </View>
      )}
    </>
  );
};

const styles = color =>
  StyleSheet.create({
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
      color,
    },
    displayName: {
      color,
    },
  });
