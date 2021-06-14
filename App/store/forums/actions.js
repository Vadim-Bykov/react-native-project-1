import * as actionTypes from './actionTypes';

export const setForums = forums => ({
  type: actionTypes.FORUM_SET_FORUMS,
  forums,
});

export const setMessages = messages => ({
  type: actionTypes.FORUM_SET_MESSAGES,
  messages,
});
