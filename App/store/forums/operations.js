import {extractErrorMessage} from '../../utils/utils';
import {setError, setIsFetching} from '../auth/actions';
import * as actions from './actions';
import firestore from '@react-native-firebase/firestore';

export const forumsSubscriber = () => dispatch =>
  firestore()
    .collection('forums')
    .onSnapshot(
      querySnapshot => {
        const forums = [];

        if (querySnapshot) {
          querySnapshot.empty &&
            dispatch(setError('The resource is empty. Please add a new forum'));
          querySnapshot.forEach(documentSnapshot => {
            forums.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
              date: new Date(documentSnapshot.data().time).toLocaleDateString(),
            });
          });
        }

        dispatch(actions.setForums(forums));
        dispatch(setIsFetching(false));
      },
      error => {
        if (error.code === 'firestore/permission-denied') return;
        console.error(error);
        dispatch(setError(extractErrorMessage(error)));
      },
    );

export const messagesSubscriber = id => dispatch => {
  dispatch(actions.setMessages([]));

  return firestore()
    .collection('forums')
    .doc(id)
    .onSnapshot(
      forum => {
        if (forum.exists) {
          forum.data().messages
            ? dispatch(actions.setMessages(forum.data().messages))
            : dispatch(actions.setMessages([]));
        }
      },
      error => {
        if (error.code === 'firestore/permission-denied') return;
        console.error(error);
        dispatch(setError(extractErrorMessage(error)));
      },
    );
};

// export const getDataByRef = (userRefPath, extractUser) => dispatch => {
//   firestore()
//     .doc(userRefPath)
//     .get()
//     .then(extractUser)
//     .catch(error => {
//       console.error(error);
//       dispatch(setError(extractErrorMessage(error)));
//     });
// };
