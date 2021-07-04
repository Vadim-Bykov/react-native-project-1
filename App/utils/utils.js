import {COMMON_ERROR_MESSAGE} from '../consts/consts';
import {Platform, ToastAndroid} from 'react-native';

export const extractErrorMessage = error => {
  let errorMessage = '';
  if (error.userInfo) {
    errorMessage = error.userInfo.message;
  } else if (error.message) {
    errorMessage = error.message;
  } else {
    errorMessage = COMMON_ERROR_MESSAGE;
  }
  return errorMessage;
};

export const sortByCreationTime = array =>
  array.sort((prev, next) => prev.creationTime - next.creationTime).reverse();

export const getLikeCount = (likes, isLikedMessage) => {
  let count = 0;
  if (isLikedMessage) {
    count = likes ? likes.count - 1 : 1;
  } else {
    count = likes ? likes.count + 1 : 1;
  }

  return count;
};

export const showToast = text =>
  Platform.OS === 'android' && ToastAndroid.show(text, ToastAndroid.SHORT);
