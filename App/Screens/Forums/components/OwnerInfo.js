import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {COMMON_ERROR_MESSAGE, DEFAULT_AVATAR} from '../../../consts/consts';
// import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {getDataByRef} from '../../../api/firebaseService';
import * as actions from '../../../store/auth/actions';

export const OwnerInfo = React.memo(({userRefPath}) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const extractUser = useCallback(user => {
    if (user.exists) {
      setUser(user.data());
    } else dispatch(actions.setError(COMMON_ERROR_MESSAGE));
  }, []);

  useEffect(() => {
    getDataByRef(userRefPath, extractUser, dispatch);
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
