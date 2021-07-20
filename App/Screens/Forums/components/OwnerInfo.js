import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Tooltip, Icon} from 'react-native-elements';
import {COLOR_PURPLE, DEFAULT_AVATAR} from '../../../consts/consts';
import {useDispatch} from 'react-redux';
import * as firebaseService from '../../../api/firebaseService';
import * as actions from '../../../store/auth/actions';
import {extractErrorMessage} from '../../../utils/utils';

export const OwnerInfo = React.memo(({userRefPath}) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const extractUser = useCallback(user => {
    if (user.exists) {
      setUser(user.data());
    }
  }, []);

  useEffect(() => {
    firebaseService
      .getDataByRef(userRefPath)
      .then(extractUser)
      .catch(error => {
        console.error(error);
        dispatch(actions.setError(extractErrorMessage(error)));
      });
  }, []);

  if (!user) return null;

  return (
    <Tooltip
      popover={
        <>
          <Text>Author: {user.name}</Text>
          <Text>Email: {user.email}</Text>
        </>
      }
      style={styles.ownerInfo}
      backgroundColor="#CDE6FF"
      width={200}
      height={50}>
      <Avatar
        rounded
        size="medium"
        source={{
          uri: user.photoURL ? user.photoURL : DEFAULT_AVATAR,
        }}>
        <Icon
          name="touch-app"
          color={COLOR_PURPLE}
          size={20}
          containerStyle={styles.icon}
        />
      </Avatar>

      {/* <Text>Author: {user.name}</Text> */}
    </Tooltip>
  );
});

const styles = StyleSheet.create({
  ownerInfo: {
    alignItems: 'flex-end',
    maxWidth: '45%',
  },

  icon: {
    position: 'absolute',
    right: -8,
    bottom: -8,
    transform: [{rotate: '-30deg'}],
  },
});
