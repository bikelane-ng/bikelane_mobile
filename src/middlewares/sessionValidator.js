import {RSAA} from 'redux-api-middleware';
import AsyncStorage from '@react-native-community/async-storage';
import * as constants from '../constants/ActionTypes';

export default store => next => action => {
  if (!store.getState().user.loggedIn) {
    return next(action);
  }

  const rsaa = action[RSAA];
  if (rsaa) {
    return AsyncStorage.getItem(constants.TOKEN)
      .then(token => {
        rsaa.headers = Object.assign({}, rsaa.headers, {
          Authorization: `Bearer ${token}` || undefined,
        });
        return action;
      })
      .then(next);
  }
  return next(action);
};
