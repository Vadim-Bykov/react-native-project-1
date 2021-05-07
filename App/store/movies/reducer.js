import * as actionTypes from './actionTypes';
import {initialState} from './state';

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MOVIES_SET_GENRES:
      return {
        ...state,
        genres: action.genres,
      };

    default:
      return state;
  }
};