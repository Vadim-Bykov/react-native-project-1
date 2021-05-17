import * as actionTypes from './actionTypes';
import {initialState} from './state';

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SET_USER:
      return {
        ...state,
        user: action.userData,
      };

    case actionTypes.AUTH_SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.isAuth,
      };

    case actionTypes.AUTH_SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case actionTypes.AUTH_SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };

    case actionTypes.AUTH_SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};
