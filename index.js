/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import appServer from './mockServer';

window.server = appServer();

AppRegistry.registerComponent(appName, () => App);
