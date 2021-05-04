import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const useAuthentication = () => {
  const [authorized, setAuthorized] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  const setUserAuth = user => {
    user ? setAuthorized(true) : setAuthorized(false);
    // setIsLoading(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUserAuth);
    return subscriber;
  }, []);

  return authorized;
};

// import {useDispatch} from 'react-redux';
// import * as actions from '../../../store/auth/actions';

// export const useAuthentication = () => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   const dispatch = useDispatch();

//   const setUserAuth = user => {
//     if (user) {
//       setIsLoaded(true);
//       // dispatch(actions.setUser(user));
//       // dispatch(actions.setIsAuth(true));
//     } else {
//       setIsLoaded(false);
//     }

//     //  dispatch(actions.setInitialized(true));
//   };

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(setUserAuth);
//     return subscriber;
//   }, []);

//   return isLoaded;
// };

// export const AuthFireBase = () => {
//   const dispatch = useDispatch();

//   const setUserAuth = user => {
//     user
//       ? dispatch(actions.setIsAuth(true)) && dispatch(actions.setUser(user))
//       : dispatch(actions.setIsAuth(false));
//   };

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(setUserAuth);

//     return subscriber;
//   }, []);

//   return null;
// };
