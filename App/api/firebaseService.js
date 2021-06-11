import * as actions from '../store/auth/actions';
import {extractErrorMessage} from '../utils/utils';
import firestore from '@react-native-firebase/firestore';

export const setUserDataBase = user => async dispatch => {
  firestore()
    .collection('users')
    .doc(user.uid)
    .set({
      name: user.displayName,
      email: user.email,
      id: user.uid,
      photoURL: user.photoURL,
    })
    .catch(error => {
      console.error(error);

      dispatch(actions.setError(extractErrorMessage(error)));
    });
};

export const forumsSubscriber = (observer, errorHandler) => {
  return firestore().collection('forums').onSnapshot(observer, errorHandler);
};

export const getDataByRef = userRefPath => firestore().doc(userRefPath).get();

const addDocumentId = (collection, documentId) =>
  firestore().collection(collection).doc(documentId).update({documentId});

export const addForum = (forumName, description, userId) =>
  firestore()
    .collection('forums')
    .add({
      title: forumName,
      description,
      userRef: firestore().doc(`users/${userId}`),
      creationTime: Date.now(),
    })
    .then(forum => addDocumentId('forums', forum.id));

export const messagesSubscriber = (observer, errorHandler, forumId) =>
  firestore()
    .collection('messages')
    .where('forumId', '==', forumId)
    .onSnapshot(observer, errorHandler);

export const addMessage = (forumId, message, userId) =>
  firestore()
    .collection('messages')
    .add({
      message,
      forumId,
      userRef: firestore().doc(`users/${userId}`),
      creationTime: Date.now(),
    })
    .then(message => addDocumentId('messages', message.id));

export const removeDocument = (collection, documentId) =>
  firestore().collection(collection).doc(documentId).delete();

export const massDeleteMessages = async forumId => {
  try {
    const usersQuerySnapshot = await firestore()
      .collection('messages')
      .where('forumId', '==', forumId)
      .get();

    const batch = firestore().batch();

    usersQuerySnapshot.forEach(documentSnapshot => {
      batch.delete(documentSnapshot.ref);
    });

    return batch.commit();
  } catch (error) {
    console.error(error);
  }
};

export const likeMessage = (
  collection,
  messageId,
  likesCount,
  dislikesCount,
) => {
  firestore().collection(collection).doc(messageId).update({});
};

// export const massDeleteUsers = forumId => {
//   const batch = firestore().batch();
//   return firestore()
//     .collection('messages')
//     .where('forumId', '==', forumId)
//     .get()
//     .then(usersQuerySnapshot =>
//       usersQuerySnapshot.forEach(documentSnapshot => {
//         batch.delete(documentSnapshot.ref);
//       }),
//     )
//     .then(() => batch.commit());
// };

// const addForumId = forumId =>
//   firestore().collection('forums').doc(forumId).update({forumId});

// export const messagesSubscriber = (observer, errorHandler, forumId) =>
//   firestore()
//     .collection('forums')
//     .doc(forumId)
//     .onSnapshot(observer, errorHandler);

// export const addMessage = (forumId, message, user) =>
//   firestore()
//     .collection('forums')
//     .doc(forumId)
//     .update({
//       messages: firestore.FieldValue.arrayUnion({
//         message,
//         userRef: firestore().doc(`users/${user.uid}`),
//         timeMessage: Date.now(),
//       }),
//     });

// export const forumsSubscriber = (observer, dispatch) => {
//   return firestore()
//     .collection('forums')
//     .onSnapshot(observer, error => {
//       if (error.code === 'firestore/permission-denied') return;
//       console.error(error);
//       dispatch(actions.setError(extractErrorMessage(error)));
//     });
// };

// export const getDataByRef = (userRefPath, extractUser, dispatch) => {
//   firestore()
//     .doc(userRefPath)
//     .get()
//     .then(extractUser)
//     .catch(error => {
//       console.error(error);
//       dispatch(actions.setError(extractErrorMessage(error)));
//     });
// };

// export const addForum = (forumName, description, userId, dispatch) => {
//   firestore()
//     .collection('forums')
//     .add({
//       title: forumName,
//       description,
//       userRef: firestore().doc(`users/${userId}`),
//       creationTime: Date.now(),
//     })
//     .catch(error => {
//       console.error(error);
//       dispatch(actions.setError(extractErrorMessage(error)));
//     });
// };

// export const messagesSubscriber = (observer, dispatch, id) => {
//   return firestore()
//     .collection('forums')
//     .doc(id)
//     .onSnapshot(observer, error => {
//       if (error.code === 'firestore/permission-denied') return;
//       console.error(error);
//       dispatch(actions.setError(extractErrorMessage(error)));
//     });
// };

// export const addMessage = (forumId, message, user, dispatch) => {
//   firestore()
//     .collection('forums')
//     .doc(forumId)
//     .update({
//       messages: firestore.FieldValue.arrayUnion({
//         message,
//         userRef: firestore().doc(`users/${user.uid}`),
//         // user: {
//         //   name: displayName,
//         //   email,
//         //   photoURL,
//         //   id: uid,
//         // },
//         timeMessage: Date.now(),
//       }),
//     })
//     .catch(error => {
//       console.error(error);
//       dispatch(setError(extractErrorMessage(error)));
//     });
// };
