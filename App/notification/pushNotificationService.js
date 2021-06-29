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

    onNotification: notification => {
      notification.data.forumId &&
        dispatch(actions.setIsOnPressedNotification(true));
      // firebaseService.goToCreatedForum(notification.data.forumId);
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
