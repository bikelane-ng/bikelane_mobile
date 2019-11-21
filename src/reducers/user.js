import * as constants from '../constants/ActionTypes';
import AsyncStorage from '@react-native-community/async-storage';

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case constants.AUTH_USER:
            return Object.assign({}, state, {
                isProcessing: true,
                error: undefined
            })
        case constants.AUTH_USER_SUCCESS:
            if (action.payload.token) {
                AsyncStorage.setItem(constants.TOKEN, action.payload.token);
                return {
                    ...state,
                    isProcessing: false,
                    isAuthenticated: true,
                    current: action.payload.user
                };
            }
        case constants.AUTH_USER_FAILURE:
            return Object.assign({}, state, {
                error: action.payload.status == 400 ? 'Invalid login credentials!' : `Login failed due to ${action.payload.status}`,
                isProcessing: false
            })
        case constants.REQUEST(constants.EDIT_USER):
            return Object.assign({}, state, {
                isProcessing: true,
                modified: false,
                error: undefined
            })
        case constants.REQUEST_SUCCESS(constants.EDIT_USER):
            return {
                ...state,
                isProcessing: false,
                modified: true
            }
        case constants.REQUEST_FAILURE(constants.EDIT_USER):
            return Object.assign({}, state, {
                error: 'An error occured while processing your request',
                modified: false,
                isProcessing: false
            })
        case constants.REQUEST(constants.USER_DATA):
            return Object.assign({}, state, {
                isProcessing: true,
                error: undefined
            })
        case constants.REQUEST_SUCCESS(constants.USER_DATA):
            return {
                ...state,
                credentials: action.payload.data,
                isProcessing: false
            }
        case constants.REQUEST_FAILURE(constants.USER_DATA):
            return Object.assign({}, state, {
                error: 'An error occured while processing your request',
                isProcessing: false
            })
        case constants.REQUEST(constants.ADD_CARD):
            return Object.assign({}, state, {
                card: false,
                error: undefined
            })
        case constants.REQUEST_SUCCESS(constants.ADD_CARD):
            return {
                ...state,
                card: true
            }
        case constants.REQUEST_FAILURE(constants.ADD_CARD):
            return Object.assign({}, state, {
                error: 'An error occured while processing your request',
                card: false
            })
        default:
            return state;
    }
}
