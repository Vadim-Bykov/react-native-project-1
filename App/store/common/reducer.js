import * as actionTypes from './actionTypes';
import {initialState} from './state';

export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COMMON_SET_MODAL_VISIBLE:
      return {
        ...state,
        modalVisible: action.value
      }

    default:
      return state;
  }
};
