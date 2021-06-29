import PushNotification from 'react-native-push-notification';
import * as firebaseService from '../api/firebaseService';

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

export const configurePushNotification = userId => {
  PushNotification.configure({
    onRegister: token => {
      firebaseService.addUserToken(token.token, userId);
    },

    onNotification: notification => {
      notification.data.forumId &&
        firebaseService.goToCreatedForum(notification.data.forumId);
    },

    senderID: '1090501687137',

    popInitialNotification: true,
    requestPermissions: true,
  });
};
