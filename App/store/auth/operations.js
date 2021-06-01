import * as actions from './actions';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {extractErrorMessage} from '../../utils/utils';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId:
    '846892742605-1lgkes0r5amg8rji2e1b4g11sbq2trev.apps.googleusercontent.com',
});

// const setUserDataBase = (name, email, id) => {
//   firestore()
//     .collection('users')
//     .doc('92uKtxsIdK7DdhH6i4UL')
//     .update({
//       users: firestore.FieldValue.arrayUnion({
//         name,
//         email,
//         id,
//       }),
//     });
// };

const setUserDataBase = user => {
  firestore()
    .collection('users')
    .doc('92uKtxsIdK7DdhH6i4UL')
    .update({
      users: firestore.FieldValue.arrayUnion({
        name: user.displayName,
        email: user.email,
        id: user.uid,
      }),
    });
};

export const signUp = userData => async dispatch => {
  try {
    dispatch(actions.setIsFetching(true));

    const userCredentials = await auth().createUserWithEmailAndPassword(
      userData.email,
      userData.password,
    );

    if (userCredentials.user) {
      await userCredentials.user.updateProfile({
        displayName: userData.userName,
      });
    }

    const user = await auth().currentUser;

    dispatch(actions.setUser(user));

    console.log(user.displayName, user.email, user.uid);

    await setUserDataBase(user);
    // await setUserDataBase(userData.userName, user.email, user.uid);

    dispatch(actions.setIsAuth(true));
    dispatch(actions.setIsFetching(false));
  } catch (error) {
    console.error(error);

    dispatch(actions.setError(extractErrorMessage(error)));
    dispatch(actions.setIsFetching(false));
  }
};

export const signIn = userData => async dispatch => {
  try {
    dispatch(actions.setIsFetching(true));

    await auth().signInWithEmailAndPassword(userData.email, userData.password);

    await dispatch(actions.setUser(auth().currentUser));

    // await setUserDataBase(auth().currentUser);

    dispatch(actions.setIsAuth(true));
    dispatch(actions.setIsFetching(false));
  } catch (error) {
    console.error(error);

    dispatch(actions.setError(extractErrorMessage(error)));
    dispatch(actions.setIsFetching(false));
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch(actions.setIsFetching(true));

    await auth().signOut();

    dispatch(actions.setIsAuth(false));
    dispatch(actions.setUser(null));
    dispatch(actions.setIsFetching(false));
  } catch (error) {
    console.error(error);

    dispatch(actions.setError(extractErrorMessage(error)));
    dispatch(actions.setIsFetching(false));
  }
};

export const signInGoogle = () => async dispatch => {
  try {
    dispatch(actions.setIsFetching(true));

    const {idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    await auth().signInWithCredential(googleCredential);

    // await setUserDataBase(auth().currentUser);

    dispatch(actions.setUser(auth().currentUser));
    dispatch(actions.setIsAuth(true));
    dispatch(actions.setIsFetching(false));
  } catch (error) {
    console.error(error);

    dispatch(actions.setError(extractErrorMessage(error)));
    dispatch(actions.setIsFetching(false));
  }
};

export const authFireBase = () => async dispatch => {
  try {
    dispatch(actions.setIsFetching(true));
    const setUserAuth = user => {
      user
        ? dispatch(actions.setIsAuth(true)) && dispatch(actions.setUser(user))
        : dispatch(actions.setIsAuth(false));
    };

    await auth().onAuthStateChanged(setUserAuth);

    const user = await auth().currentUser;

    dispatch(actions.setUser(user));

    console.log(user.displayName, user.email, user.uid);

    dispatch(actions.setInitialized());
    dispatch(actions.setIsFetching(false));
  } catch (error) {
    console.error(error);

    dispatch(actions.setError(extractErrorMessage(error)));
    dispatch(actions.setIsFetching(false));
  }
};
