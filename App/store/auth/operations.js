import * as actions from './actions';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

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
    }

    await dispatch(actions.setUser(auth().currentUser));

    dispatch(actions.setIsAuth(true));
    dispatch(actions.setIsFetching(false));
  } catch (error) {
    // if (error.code === 'auth/email-already-in-use') {
    //   dispatch(actions.setError('That email address is already in use!'));
    // }

    // if (error.code === 'auth/invalid-email') {
    //   dispatch(actions.setError('That email address is invalid!'));
    // }

    const errorText = error
      .toString()
      .match(/([\]\s]\b)[a-z\s]+/i)[0]
      .slice(1);
    dispatch(actions.setError(errorText));
    console.error(error);
    dispatch(actions.setIsFetching(false));
  }
};

export const signIn = userData => async dispatch => {
  try {
    dispatch(actions.setIsFetching(true));

    await auth().signInWithEmailAndPassword(userData.email, userData.password);

    await dispatch(actions.setUser(auth().currentUser));

    dispatch(actions.setIsAuth(true));
    dispatch(actions.setIsFetching(false));
  } catch (error) {
    console.error(error);
    dispatch(
      actions.setError(
        error
          .toString()
          .match(/([\]\s]\b)[a-z\s]+/i)[0]
          .slice(1),
      ),
    );
    dispatch(actions.setIsFetching(false));
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch(actions.setIsFetching(true));

    await auth().signOut();

    dispatch(actions.setUser({}));
    dispatch(actions.setIsAuth(false));
    dispatch(actions.setIsFetching(false));
  } catch (error) {
    dispatch(actions.setError('An Error Occurred, Please Try Again Later!'));
    console.error(error);

    dispatch(actions.setIsFetching(false));
  }
};

export const signInGoogle = () => async dispatch => {
  try {
    dispatch(actions.setIsFetching(true));

    const {idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    await auth().signInWithCredential(googleCredential);

    dispatch(actions.setUser(auth().currentUser));
    dispatch(actions.setIsAuth(true));
    dispatch(actions.setIsFetching(false));
  } catch (error) {
    dispatch(actions.setError('An Error Occurred, Please Try Again Later!'));
    console.error(error);

    dispatch(actions.setIsFetching(false));
  }
};

export const fetchUserData = () => async dispatch => {
  try {
    dispatch(actions.setIsFetching(true));

    const userData = await auth().currentUser;

    dispatch(actions.setUser(userData));
    dispatch(actions.setIsFetching(false));
  } catch (error) {
    dispatch(actions.setError('An Error Occurred, Please Try Again Later!'));
    console.error(error);
  }
};

// export const AuthFireBase = () => dispatch => {
//   const setUserAuth = user => {
//     user
//       ? dispatch(actions.setIsAuth(true)) && dispatch(actions.setUser(user))
//       : dispatch(actions.setIsAuth(false));
//   };

//   auth().onAuthStateChanged(setUserAuth);

//   dispatch(actions.setInitialized());
// };

// /([\]\s]\b)[a-z\s]+/i)
// /(\]\s)[a-z\s]+/gi
