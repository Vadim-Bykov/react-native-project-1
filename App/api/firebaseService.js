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
  firestore()
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

export const messagesSubscriber = (observer, dispatch, id) =>
  firestore()
    .collection('forums')
    .doc(id)
    .onSnapshot(observer, error => {
      console.log(error.code);
      if (error.code === 'firestore/permission-denied') return;
      console.error(error);
      dispatch(actions.setError(extractErrorMessage(error)));
    });
