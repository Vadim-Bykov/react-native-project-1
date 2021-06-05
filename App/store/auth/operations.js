import * as actions from './actions';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {extractErrorMessage} from '../../utils/utils';
import {setUserDataBase} from '../../api/firebaseService';

GoogleSignin.configure({
  webClientId:
    '846892742605-1lgkes0r5amg8rji2e1b4g11sbq2trev.apps.googleusercontent.com',
});

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

      const user = await auth().currentUser;

      await dispatch(setUserDataBase(user));

      dispatch(actions.setUser(user));
      dispatch(actions.setIsAuth(true));
      dispatch(actions.setIsFetching(false));
    }
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

    const user = await auth().currentUser;

    dispatch(actions.setUser(user));
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

    const user = await auth().currentUser;

    await dispatch(setUserDataBase(user));

    dispatch(actions.setUser(user));
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

    dispatch(actions.setInitialized());
    dispatch(actions.setIsFetching(false));
  } catch (error) {
    console.error(error);

    dispatch(actions.setError(extractErrorMessage(error)));
    dispatch(actions.setIsFetching(false));
  }
};
