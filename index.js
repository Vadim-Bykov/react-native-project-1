/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {App} from './App';
import {name as appName} from './app.json';

import {
  setCustomTextInput,
  setCustomText,
  // setCustomView,
  //   setCustomImage,
  //   setCustomTouchableOpacity,
} from 'react-native-global-props';

const customTextInputProps = {
  style: {
    fontFamily: 'sans-serif-condensed',
  },
};

const customTextProps = {
  style: {
    fontFamily: 'sans-serif-condensed',
  },
};

setCustomTextInput(customTextInputProps);
setCustomText(customTextProps);

AppRegistry.registerComponent(appName, () => App);
