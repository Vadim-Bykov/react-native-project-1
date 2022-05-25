import {Linking} from 'react-native';
import PushNotification from 'react-native-push-notification';
import * as firebaseService from '../api/firebaseService';
import * as actions from '../store/auth/actions';

export const localNotify = (title, description, forumId) => {
  PushNotification.localNotification({
    channelId: 'fcm_fallback_notification_channel',
    title,
    message: description,
    playSound: true,
    soundName: 'default',
    userInfo: {forumId},
  });
};

export const configurePushNotification = (userId, dispatch) => {
  PushNotification.configure({
    onRegister: token => {
      firebaseService.addUserToken(token.token, userId, dispatch);
    },

    onNotification(notification) {
      console.log({notification: notification.foreground});
      // notification.data.forumId &&
      //   dispatch(actions.setForumIdFromNotification(notification.data.forumId));
      if (notification.data.forumId) {
        console.log({notification, title: notification.title});
        // Linking.openURL(
        //   `rnproject://forum/${notification.data.forumId}/${notification.title}`,
        // );
        // Linking.openURL(`rnproject://details/634649`);
        Linking.openURL(`rnproject://saved`);
      }
    },

    onAction(notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);

      // process the action
    },

    onRegistrationError: err => {
      console.error(err);
      dispatch(actions.setError(err.message));
    },

    senderID: '1090501687137',

    popInitialNotification: true,
    requestPermissions: true,
  });
};
