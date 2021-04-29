import * as actions from './actions';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '846892742605-1lgkes0r5amg8rji2e1b4g11sbq2trev.apps.googleusercontent.com',
});

export const signUp = (userData, name) => async dispatch => {
  try {
    const userCredentials = await auth().createUserWithEmailAndPassword(
      userData.email,
      userData.password,
    );

    if (userCredentials.user) {
      await userCredentials.user.updateProfile({
        displayName: name,
      });
    }

    // await auth().currentUser.reload();
    await dispatch(actions.setUser(auth().currentUser));
    dispatch(actions.setIsAuth(true));
    console.log(auth().currentUser);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  }
};

export const signIn = userData => async dispatch => {
  try {
    await auth().signInWithEmailAndPassword(userData.email, userData.password);
    //   await auth().signInWithEmailAndPassword(
    //   'jane.doe@example.com',
    //   'SuperSecretPassword!',
    // );

    await dispatch(actions.setUser(auth().currentUser));

    dispatch(actions.setIsAuth(true));

    console.log(auth().currentUser);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.log('That email address is invalid!');
    }

    if (error.code === 'auth/wrong-password') {
      console.log('That password is invalid!');
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
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  await auth().signInWithCredential(googleCredential);

  dispatch(actions.setUser(auth().currentUser));
  dispatch(actions.setIsAuth(true));
};
