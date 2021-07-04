import * as actions from '../store/auth/actions';
import {extractErrorMessage} from '../utils/utils';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {localNotify} from '../notification/pushNotificationService';

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

export const getDataByRef = userRefPath =>
  firestore()
    .doc(userRefPath)
    .get()
    .catch(error => Promise.reject(error));

const createLikeDocument = (collection, forumId, messageId) =>
  firestore()
    .collection(collection)
    .doc(messageId)
    .set({
      count: 0,
      forumId,
      messageId,
      usersId: [],
    })
    .catch(error => Promise.reject(error));

const addDocumentId = (collection, documentId, forumIdForLikeDoc) =>
  firestore()
    .collection(collection)
    .doc(documentId)
    .update({documentId})
    .then(
      () =>
        forumIdForLikeDoc &&
        createLikeDocument('likes', forumIdForLikeDoc, documentId),
    )
    .then(
      () =>
        forumIdForLikeDoc &&
        createLikeDocument('dislikes', forumIdForLikeDoc, documentId),
    )
    .catch(error => Promise.reject(error));

export const addForum = (forumName, description, userId) =>
  firestore()
    .collection('forums')
    .add({
      title: forumName,
      description,
      userRef: firestore().doc(`users/${userId}`),
      creationTime: Date.now(),
    })
    .then(forum => {
      addDocumentId('forums', forum.id);
      localNotify(forumName, description, forum.id);
    })
    .catch(error => Promise.reject(error));

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
    .then(message => addDocumentId('messages', message.id, forumId))
    .catch(error => Promise.reject(error));

export const removeDocument = (collection, documentId) =>
  firestore()
    .collection(collection)
    .doc(documentId)
    .delete()
    .catch(error => Promise.reject(error));

export const massDeleteDocs = async (collection, documentId, idField) => {
  try {
    const usersQuerySnapshot = await firestore()
      .collection(collection)
      .where(idField, '==', documentId)
      .get();

    const batch = firestore().batch();

    usersQuerySnapshot.forEach(documentSnapshot => {
      batch.delete(documentSnapshot.ref);
    });

    return batch.commit();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getDocumentById = (collection, documentId) =>
  firestore()
    .collection(collection)
    .doc(documentId)
    .get()
    .catch(error => Promise.reject(error));

export const updateLikeCount = async (
  {collection, messageId, forumId, count, userId, action},
  dispatch,
) => {
  try {
    const res = await firestore()
      .collection(collection)
      .doc(messageId)
      .update({
        count,
        forumId,
        messageId,
        usersId:
          action === 'add'
            ? firestore.FieldValue.arrayUnion(userId)
            : firestore.FieldValue.arrayRemove(userId),
      });

    return res;
  } catch (error) {
    console.error(error);
    dispatch(actions.setError(extractErrorMessage(error)));
  }
};

export const uploadUserPhoto = async (uri, fileName) => {
  try {
    const reference = storage().ref(fileName);

    await reference.putFile(uri);

    const photoURL = await reference.getDownloadURL();

    return photoURL;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const updateDocument = (collection, documentId, data) => {
  try {
    return firestore().collection(collection).doc(documentId).update(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addUserToken = (token, userId, dispatch) => {
  const userTokens = {
    tokens: firestore.FieldValue.arrayUnion(token),
  };

  try {
    getDocumentById('users', userId).then(document => {
      if (document.exists) {
        updateDocument('users', userId, userTokens).catch(error => {
          console.error(error);
          dispatch(actions.setError(extractErrorMessage(error)));
        });
      }
    });
  } catch (error) {
    console.error(error);
    dispatch(actions.setError(extractErrorMessage(error)));
  }
};
