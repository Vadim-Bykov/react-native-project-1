/**
 * @format
 */

import {setCustomTextInput, setCustomText} from 'react-native-global-props';
import {customTextInputProps, customTextProps} from './App/consts/globalProps';
import {AppRegistry} from 'react-native';
import {App} from './App';
import {name as appName} from './app.json';

setCustomText(customTextProps);
setCustomTextInput(customTextInputProps);

AppRegistry.registerComponent(appName, () => App);
