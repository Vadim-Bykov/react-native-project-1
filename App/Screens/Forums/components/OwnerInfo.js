import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {COMMON_ERROR_MESSAGE, DEFAULT_AVATAR} from '../../../consts/consts';
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
    } else dispatch(actions.setError(COMMON_ERROR_MESSAGE));
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
    <View style={styles.ownerInfo}>
      <Avatar
        rounded
        source={{
          uri: user.photoURL ? user.photoURL : DEFAULT_AVATAR,
        }}
      />

      <Text>{user.name}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  ownerInfo: {
    alignItems: 'flex-end',
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ownerName: {
    color: '#fff',
    fontSize: 20,
  },
});
