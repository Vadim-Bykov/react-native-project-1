import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {useDispatch} from 'react-redux';
import {getDataByRef} from '../../../api/firebaseService';
import {DEFAULT_AVATAR} from '../../../consts/consts';
import * as actions from '../../../store/auth/actions';

export const GuestMessage = ({item, messages, index}) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const extractUser = useCallback(user => {
    if (user.exists) {
      setUser(user.data());
    } else dispatch(actions.setError(COMMON_ERROR_MESSAGE));
  }, []);

  useEffect(() => {
    getDataByRef(item.userRef.path, extractUser, dispatch);
  }, []);

  const today =
    new Date(item.timeMessage).toLocaleDateString() ===
    new Date().toLocaleDateString();

  const showPhoto = true;
  // index === 0 ||
  // (index > 0 && item.userRef.path !== messages[index - 1].userRef.path);
  // index === 0 || (index > 0 && item.user.id !== messages[index - 1].user.id);
  console.log(item);

  const dateMessage = new Date(item.timeMessage).toLocaleDateString();

  return (
    <View style={[styles.container, showPhoto && styles.extraMargin]}>
      <Text>{today ? 'Today' : dateMessage}</Text>
      {showPhoto && user && (
        <Avatar
          rounded
          source={{
            uri: user.photoURL ? user.photoURL : DEFAULT_AVATAR,
            // uri: item.user.photoURL ? item.user.photoURL : DEFAULT_AVATAR,
          }}
        />
      )}
      <View style={[styles.withPhoto, !showPhoto && styles.withoutPhoto]}>
        <Text>{item.message}</Text>
        <Text style={styles.time}>
          {new Date(item.timeMessage)
            .toLocaleTimeString()
            .split(':')
            .slice(0, 2)
            .join(':')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 60,
    flexDirection: 'row',
    flexShrink: 1,
    marginTop: 2,
  },
  extraMargin: {marginTop: 10},
  withPhoto: {
    backgroundColor: '#EBEBEB',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    marginLeft: 5,
  },
  withoutPhoto: {
    borderTopLeftRadius: 10,
    marginLeft: 40,
  },
  time: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: '#696A6C',
  },
});
