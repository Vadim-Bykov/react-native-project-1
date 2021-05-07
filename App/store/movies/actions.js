import * as actionTypes from './actionTypes';

export const setGenres = genres => ({
  type: actionTypes.MOVIES_SET_GENRES,
  genres,
});
