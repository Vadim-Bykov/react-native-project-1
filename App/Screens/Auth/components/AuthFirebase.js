import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import * as actions from '../../../store/auth/actions';

export const AuthFireBase = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUserFirebase] = useState();
  const dispatch = useDispatch();

  function onAuthStateChanged(user) {
    setUserFirebase(user);

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    dispatch(actions.setUser(user));
    user
      ? dispatch(actions.setIsAuth(true))
      : dispatch(actions.setIsAuth(false));
    return subscriber; // unsubscribe on unmount
  }, [user]);

  return null;
};
