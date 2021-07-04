export const getUser = state => state.auth.user;
export const getIsAuth = state => state.auth.isAuth;
export const getIsFetching = state => state.auth.isFetching;
export const getErrorMessage = state => state.auth.errorMessage;
export const getInitialized = state => state.auth.initialized;
export const getForumIdFromNotification = state =>
  state.auth.forumIdFromNotification;
