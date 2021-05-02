// import React, {useEffect} from 'react';
// import auth from '@react-native-firebase/auth';
// import {useDispatch} from 'react-redux';
// import * as actions from '../../../store/auth/actions';

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
