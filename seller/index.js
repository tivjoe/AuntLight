/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import './app/public/Global';
import './app/public/Storage';
import {createSocket} from './app/public/Websocket'

createSocket();
AppRegistry.registerComponent(appName, () => App);
