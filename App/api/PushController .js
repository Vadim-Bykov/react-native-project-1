import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {useNavigation} from '@react-navigation/core';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import * as selectors from '../store/auth/selectors';
import * as actions from '../store/auth/actions';
import * as firebaseService from './firebaseService';

export const pushForumNotification = async (title, message, data) => {
  PushNotification.localNotification({
    channelId: 'fcm_fallback_notification_channel',
    title, // (optional)
    message, // (required)
    playSound: true,
    soundName: 'default',
    userInteraction: true,
    userInfo: data,
  });
};

export const PushController = () => {
  const navigation = useNavigation();
  const user = useSelector(selectors.getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    user &&
      PushNotification.configure({
        onRegister: function (token) {
          console.log('TOKEN:', token);

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

        // (required) Called when a remote or local notification is opened or received
        onNotification: function (notification) {
          console.log('NOTIFICATION:', notification);
          navigation.navigate('Forum');
        },

        // Android only
        senderID: '1090501687137',

        popInitialNotification: true,
        requestPermissions: true,
      });
  }, [user]);

  return (
    <View>
      <Button
        onPress={() => pushForumNotification('Forum', 'Discretion')}
        title="Push"
      />
    </View>
  );
};
