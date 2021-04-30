import * as actions from './actions';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '846892742605-1lgkes0r5amg8rji2e1b4g11sbq2trev.apps.googleusercontent.com',
});

export const signUp = userData => async dispatch => {
  try {
    const userCredentials = await auth().createUserWithEmailAndPassword(
      userData.email,
      userData.password,
    );

    if (userCredentials.user) {
      await userCredentials.user.updateProfile({
        displayName: userData.userName,
      });
    }

    await dispatch(actions.setUser(auth().currentUser));
    dispatch(actions.setIsAuth(true));
    console.log(auth().currentUser);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
      dispatch(actions.setError('That email address is already in use!'));
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
      dispatch(actions.setError('That email address is invalid!'));
    }

    console.error(error);
  }
};

export const signIn = userData => async dispatch => {
  try {
    await auth().signInWithEmailAndPassword(userData.email, userData.password);

    await dispatch(actions.setUser(auth().currentUser));

    dispatch(actions.setIsAuth(true));

    console.log(auth().currentUser);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.log('That email address is invalid!');
      dispatch(actions.setError('That email address is invalid!'));
    }

    if (error.code === 'auth/wrong-password') {
      console.log('That password is invalid!');
      dispatch(actions.setError('That password is invalid!'));
    }

    console.error(error);
  }
};

export const logout = () => async dispatch => {
  try {
    await auth().signOut();
    dispatch(actions.setUser({}));
    dispatch(actions.setIsAuth(false));
    console.log('User signed out!');
  } catch (error) {
    console.error(error);
  }
};

export const signInGoogle = () => async dispatch => {
  try {
    const {idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    await auth().signInWithCredential(googleCredential);

    dispatch(actions.setUser(auth().currentUser));
    dispatch(actions.setIsAuth(true));
  } catch (error) {
    console.error(error);
  }
};

// export const AuthFireBase = () => async dispatch => {
//   // const user = useSelector(getUser);
//   await auth().onAuthStateChanged(onAuthStateChanged);

//   await function onAuthStateChanged(user) {
//     console.log(user);

//     dispatch(actions.setUser(user));
//     dispatch(actions.setIsAuth(false));
//   };
// };
