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

export const forumsSubscriber = (observer, dispatch) => {
  return firestore()
    .collection('forums')
    .onSnapshot(observer, error => {
      if (error.code === 'firestore/permission-denied') return;
      console.error(error);
      dispatch(actions.setError(extractErrorMessage(error)));
    });
};

export const getDataByRef = (userRefPath, extractUser, dispatch) => {
  firestore()
    .doc(userRefPath)
    .get()
    .then(extractUser)
    .catch(error => {
      console.error(error);
      dispatch(actions.setError(extractErrorMessage(error)));
    });
};

export const messagesSubscriber = (observer, dispatch, id) => {
  return firestore()
    .collection('forums')
    .doc(id)
    .onSnapshot(observer, error => {
      if (error.code === 'firestore/permission-denied') return;
      console.error(error);
      dispatch(actions.setError(extractErrorMessage(error)));
    });
};

export const addForum = (forumName, description, userId, dispatch) => {
  firestore()
    .collection('forums')
    .add({
      title: forumName,
      description,
      userRef: firestore().doc(`users/${userId}`),
      creationTime: Date.now(),
    })
    .catch(error => {
      console.error(error);
      dispatch(actions.setError(extractErrorMessage(error)));
    });
};

export const addMessage = (forumId, message, user, dispatch) => {
  firestore()
    .collection('forums')
    .doc(forumId)
    .update({
      messages: firestore.FieldValue.arrayUnion({
        message,
        userRef: firestore().doc(`users/${user.uid}`),
        // user: {
        //   name: displayName,
        //   email,
        //   photoURL,
        //   id: uid,
        // },
        timeMessage: Date.now(),
      }),
    })
    .catch(error => {
      console.error(error);
      dispatch(setError(extractErrorMessage(error)));
    });
};
