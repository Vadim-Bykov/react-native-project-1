import * as actionTypes from './actionTypes';
import {initialState} from './state';

const authReducer = (state = initialState, action) => {
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

    default:
      return state;
  }
};

export default authReducer;
