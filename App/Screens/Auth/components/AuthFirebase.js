import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {getIsAuth, getUser} from '../../../store/auth/selectors';
import * as actions from '../../../store/auth/actions';

export const AuthFireBase = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUserFirebase] = useState();
  const dispatch = useDispatch();

  const userState = useSelector(getUser);
  console.log(userState);

  // const isAuth = useSelector(getIsAuth);
  // console.log(isAuth);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUserFirebase(user);

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    dispatch(actions.setUser(user));
    dispatch(actions.setIsAuth(!initializing));
    return subscriber; // unsubscribe on unmount
  }, [user]);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.displayName}</Text>
    </View>
  );
};
