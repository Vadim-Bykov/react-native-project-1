import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity,
} from 'react-native-global-props';

const customTextInputProps = {
  style: {
    fontFamily: 'sans-serif-light',
  },
};

const customTextProps = {
  style: {
    fontFamily: 'sans-serif-light',
  },
};

setCustomTextInput(customTextInputProps);
setCustomText(customTextProps);
