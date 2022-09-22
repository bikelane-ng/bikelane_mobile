import * as constants from '../constants/ActionTypes';
import AsyncStorage from '@react-native-community/async-storage';

export default function loginReducer(state = {}, action) {
  switch (action.type) {
    case constants.LOGIN:
      return Object.assign({}, state, {
        isProcessing: true,
        error: undefined,
      });
    case constants.LOGIN_SUCCESS:
      if (action.payload.token) {
        AsyncStorage.setItem(constants.TOKEN, action.payload.token);
        return {
          ...state,
          isProcessing: false,
          isAuthenticated: true,
          current: action.payload.user,
        };
      }
    case constants.LOGIN_FAILURE:
      return Object.assign({}, state, {
        error:
          action.payload.status == 400
            ? 'Invalid login credentials!'
            : `Login failed due to ${action.payload.status}`,
        isProcessing: false,
      });
    case constants.LOGOUT:
      return Object.assign({}, state, {});
    default:
      return state;
  }
}
