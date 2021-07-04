import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {useDispatch} from 'react-redux';
import * as firebaseService from '../../../api/firebaseService';
import {DEFAULT_AVATAR} from '../../../consts/consts';
import * as actions from '../../../store/auth/actions';

export const OwnerMessage = React.memo(({item, messages, index}) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const extractUser = useCallback(user => {
    if (user.exists) {
      setUser(user.data());
    } else dispatch(actions.setError(COMMON_ERROR_MESSAGE));
  }, []);

  useEffect(() => {
    firebaseService
      .getDataByRef(item.userRef.path)
      .then(extractUser)
      .catch(error => {
        console.error(error);
        dispatch(actions.setError(extractErrorMessage(error)));
      });
  }, []);

  const getLocalDate = useCallback(
    creationTime => new Date(creationTime).toLocaleDateString(),
    [],
  );

  const today =
    new Date(item.creationTime).toLocaleDateString() ===
    new Date().toLocaleDateString();

  const showPhoto =
    index === 0 ||
    (index > 0 && item.userRef.path !== messages[index - 1].userRef.path);

  const dateMessage = getLocalDate(item.creationTime);
  const showDate =
    index === 0 ||
    (index > 0 &&
      dateMessage !== getLocalDate(messages[index - 1].creationTime));

  return (
    <>
      {showDate && (
        <View style={styles.date}>
          <Text>{today ? 'Today' : dateMessage}</Text>
        </View>
      )}
      <View View style={[styles.container, showPhoto && styles.extraMargin]}>
        {showPhoto && user && (
          <Avatar
            rounded
            source={{
              uri: user.photoURL ? user.photoURL : DEFAULT_AVATAR,
            }}
          />
        )}
        <View style={[styles.withPhoto, !showPhoto && styles.withoutPhoto]}>
          <Text>{item.message}</Text>
          <Text style={styles.time}>
            {new Date(item.creationTime)
              .toLocaleTimeString()
              .split(':')
              .slice(0, 2)
              .join(':')}
          </Text>
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  date: {
    marginVertical: 10,
    alignSelf: 'center',
  },
  container: {
    marginLeft: 20,
    marginRight: 60,
    flexDirection: 'row-reverse',
    flexShrink: 1,
    marginTop: 2,
  },
  extraMargin: {marginTop: 10},
  withPhoto: {
    backgroundColor: '#CDE6FF',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    marginRight: 5,
  },
  withoutPhoto: {
    borderTopLeftRadius: 10,
    marginRight: 40,
  },
  time: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: '#696A6C',
  },
});
