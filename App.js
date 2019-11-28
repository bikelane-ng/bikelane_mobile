/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';

import AppNavigator from './src/navigation';
import store from './src/store/createStore';
import { Provider } from 'react-redux';
import NavigationService from './src/navigation/NavigationService';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </Provider>
  );
};

export default App;
