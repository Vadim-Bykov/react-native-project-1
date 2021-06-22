import PushNotification from 'react-native-push-notification';
import firestore from '@react-native-firebase/firestore';
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

export const pushController = (
  addUserToken,
  goToCreatedForum,
  navigation,
  dispatch,
  updateDocument,
) => {
  PushNotification.configure({
    onRegister: token => {
      addUserToken(token.token);

      // const userTokens = {
      //   tokens: firestore.FieldValue.arrayUnion(token.token),
      // };

      // firebaseService
      //   .updateDocument('users', userId, userTokens)
      //   .catch(error => {
      //     console.error(dispatch);
      //     dispatch(actions.setError(error));
      //   });
    },

    onNotification: notification => {
      notification.data.forumId && goToCreatedForum(notification.data.forumId);

      // firebaseService
      //   .getDocumentById('forums', notification.data.forumId)
      //   .then(forum => {
      //     if (forum.exists) {
      //       navigation.navigate('Forum', {forum: forum.data()});
      //     }
      //   })
      //   .catch(error => {
      //     console.error(dispatch);
      //     dispatch(actions.setError(error));
      //   });
    },

    senderID: '1090501687137',

    popInitialNotification: true,
    requestPermissions: true,
  });
};
