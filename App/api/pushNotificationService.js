import PushNotification from 'react-native-push-notification';

export const pushForumNotification = (title, description, forumId) => {
  PushNotification.localNotification({
    channelId: 'fcm_fallback_notification_channel',
    title,
    message: description,
    playSound: true,
    soundName: 'default',
    userInfo: {forumId},
  });
};

export const pushController = (addUserToken, goToCreatedForum) => {
  PushNotification.configure({
    onRegister: token => {
      addUserToken(token.token);
    },

    onNotification: notification => {
      notification.data.forumId && goToCreatedForum(notification.data.forumId);
    },

    senderID: '1090501687137',

    popInitialNotification: true,
    requestPermissions: true,
  });
};
