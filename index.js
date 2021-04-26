/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {App} from './App';
import {name as appName} from './app.json';
import {setCustomTextInput, setCustomText} from 'react-native-global-props';
import {commonTextStyle} from './App/commonStyles/textStyles';

setCustomText(commonTextStyle);
setCustomTextInput(commonTextStyle);

AppRegistry.registerComponent(appName, () => App);
