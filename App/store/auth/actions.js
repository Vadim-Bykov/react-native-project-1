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
