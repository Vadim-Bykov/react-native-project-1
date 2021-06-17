import React, {useEffect} from 'react';
import {AppState} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {useNavigation} from '@react-navigation/core';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import * as selectors from '../store/auth/selectors';
import * as actions from '../store/auth/actions';
import * as firebaseService from './firebaseService';

export const pushForumNotification = (title, description, forumId) => {
  PushNotification.localNotification({
    channelId: 'fcm_fallback_notification_channel',
    title,
    message: description,
    playSound: true,
    soundName: 'default',
    userInteraction: true,
    userInfo: {forumId},
  });
};

export const PushController = () => {
  const navigation = useNavigation();
  const user = useSelector(selectors.getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    user &&
      PushNotification.configure({
        onRegister: token => {
          const userTokens = {
            tokens: firestore.FieldValue.arrayUnion(token.token),
          };

          firebaseService
            .updateDocument('users', user.uid, userTokens)
            .catch(error => {
              console.error(dispatch);
              dispatch(actions.setError(error));
            });
        },

        onNotification: notification => {
          notification.data.forumId &&
            firebaseService
              .getDocumentById('forums', notification.data.forumId)
              .then(forum => {
                if (forum.exists) {
                  navigation.navigate('Forum', {forum: forum.data()});
                }
              })
              .catch(error => {
                console.error(dispatch);
                dispatch(actions.setError(error));
              });
        },

        senderID: '1090501687137',

        popInitialNotification: true,
        requestPermissions: true,
      });
  }, [user]);

  return null;
};
