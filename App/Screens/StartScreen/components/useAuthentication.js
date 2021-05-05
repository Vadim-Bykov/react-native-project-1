import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const useAuthentication = () => {
  const [initializing, setInitializing] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [userData, setUserData] = useState(null);

  const setUserAuth = user => {
    if (user) {
      setUserData(user);
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
    setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUserAuth);
    return subscriber;
  }, []);

  return {authorized, userData, initializing};
};
