/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import RNBootSplash from 'react-native-bootsplash';

AppRegistry.registerComponent(appName, () => App);

// Hide splash screen
RNBootSplash.hide({ fade: true });
