import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {useDispatch} from 'react-redux';
import * as firebaseService from '../../../api/firebaseService';
import {COMMON_ERROR_MESSAGE, DEFAULT_AVATAR} from '../../../consts/consts';
import * as actions from '../../../store/auth/actions';
import {MessageContent} from './MessageContetnt';

export const Message = React.memo(({item, messages, index, isOwner}) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const extractUser = useCallback(user => {
    if (user.exists) {
      setUser(user.data());
    } else {
      dispatch(
        actions.setError(
          `${COMMON_ERROR_MESSAGE} The user may not have been saved in the database`,
        ),
      );
    }
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
    index === messages.length - 1 ||
    (index < messages.length - 1 &&
      item.userRef.path !== messages[index + 1].userRef.path);

  const messageDate = getLocalDate(item.creationTime);

  const showDate =
    index === messages.length - 1 ||
    (index < messages.length - 1 &&
      messageDate !== getLocalDate(messages[index + 1].creationTime));

  return (
    <>
      <View
        style={[
          isOwner ? styles.ownerContainer : styles.container,
          showPhoto && styles.extraMargin,
        ]}>
        {showPhoto && (
          <Avatar
            rounded
            source={{
              uri: user && user.photoURL ? user.photoURL : DEFAULT_AVATAR,
            }}
          />
        )}

        <MessageContent item={item} isOwner={isOwner} showPhoto={showPhoto} />
      </View>

      {showDate && (
        <View style={styles.date}>
          <Text>{today ? 'Today' : messageDate}</Text>
        </View>
      )}
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
    flexDirection: 'row',
    flexShrink: 1,
    marginTop: 2,
  },
  ownerContainer: {
    marginLeft: 20,
    marginRight: 60,
    flexDirection: 'row-reverse',
    flexShrink: 1,
    marginTop: 2,
  },

  extraMargin: {
    marginTop: 10,
  },
});
