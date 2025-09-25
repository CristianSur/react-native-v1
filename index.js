/**
 * @format
 */

import 'react-native-gesture-handler'; // MUST be at the top
import 'react-native-reanimated';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
