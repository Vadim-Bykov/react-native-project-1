import * as actionTypes from './actionTypes';

export const setUser = userData => ({
  type: actionTypes.AUTH_SET_USER,
  userData,
});

export const setIsAuth = isAuth => ({
  type: actionTypes.AUTH_SET_IS_AUTH,
  isAuth,
});

export const setIsFetching = isFetching => ({
  type: actionTypes.AUTH_SET_IS_FETCHING,
  isFetching,
});

export const setError = errorMessage => ({
  type: actionTypes.AUTH_SET_ERROR_MESSAGE,
  errorMessage,
});

export const setInitialized = () => ({type: actionTypes.AUTH_SET_INITIALIZED});

export const setForumIdFromNotification = boolean => ({
  type: actionTypes.AUTH_IS_ON_PRESSED_NOTIFICATION,
  boolean,
});
