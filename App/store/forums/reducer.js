import * as actionTypes from './actionTypes';
import {initialState} from './state';

export const forumReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FORUM_SET_FORUMS:
      return {
        ...state,
        forums: action.forums,
      };

    case actionTypes.FORUM_SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };

    default:
      return state;
  }
};
