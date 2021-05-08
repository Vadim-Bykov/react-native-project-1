import * as actionTypes from './actionTypes';

export const setGenres = genres => ({
  type: actionTypes.MOVIES_SET_GENRES,
  genres,
});

export const setActiveGenre = id => ({
  type: actionTypes.MOVIES_SET_ACTIVE_GENRE,
  id,
});
