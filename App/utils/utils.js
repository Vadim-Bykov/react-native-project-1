export const extractErrorMessage = error => {
  let errorMessage = '';
  if (error.userInfo) {
    errorMessage = error.userInfo.message;
  } else if (error.message) {
    errorMessage = error.message;
  } else {
    errorMessage = 'An Error Occurred, Please Try Again Later!';
  }
  return errorMessage;
};
